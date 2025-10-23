import { json } from '@sveltejs/kit';
import { getReading, setReading, deleteReading, deleteToken, setToken, listAllReadings, setEmailLatest, getEmailLatest } from '$lib/server/storage.js';
import { env } from '$env/dynamic/private';
import crypto from 'node:crypto';

function auth(request) {
  const h = request.headers.get('authorization') || '';
  const token = h.startsWith('Bearer ') ? h.slice(7) : '';
  return token && token === env.ADMIN_API_KEY;
}

function sha256(s) {
  return crypto.createHash('sha256').update(s).digest('hex');
}

function isExpired(rec) {
  return rec.expiresAt && Date.now() > Date.parse(rec.expiresAt);
}

function looksLikeEmail(s) {
  return typeof s === 'string' && s.includes('@') && s.includes('.') && s.length <= 254;
}

export async function GET({ request, url }) {
  if (!auth(request)) return json({ error: 'Unauthorized' }, { status: 401 });

  const id = url.searchParams.get('id');

  if (id) {
    const rec = await getReading(id);
    if (!rec) return json({ error: 'Not found' }, { status: 404 });
    const { fullText, ...meta } = rec;
    return json({ ok: true, meta });
  }

  const items = await listAllReadings();
  const summary = items.map(r => ({
    id: r.id,
    category: r.category,
    email: r.inputs?.email,
    paid: r.paid,
    createdAt: r.createdAt,
    expiresAt: r.expiresAt
  }));

  return json({ ok: true, items: summary });
}

export async function DELETE({ request, url }) {
  if (!auth(request)) return json({ error: 'Unauthorized' }, { status: 401 });

  const id = url.searchParams.get('id');
  if (!id) return json({ error: 'id required' }, { status: 400 });

  const rec = await getReading(id);
  if (!rec) return json({ ok: true, deleted: 0 });

  if (rec.unlockToken) await deleteToken(rec.unlockToken);
  await deleteReading(id);

  return json({ ok: true, deleted: 1 });
}

export async function POST({ request }) {
  if (!auth(request)) return json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json().catch(() => ({}));

  if (body.action === 'retarget') {
    const readingId = (body.id || '').trim();
    const newEmail = (body.newEmail || '').trim();
    const rotate = body.rotateToken !== false;
    const sendNow = body.send !== false;
    const extendDays = Number.isFinite(Number(body.extendDays)) ? parseInt(body.extendDays, 10) : 0;

    if (!readingId) return json({ error: 'id required' }, { status: 400 });
    if (!looksLikeEmail(newEmail)) return json({ error: 'valid newEmail required' }, { status: 400 });

    const record = await getReading(readingId);
    if (!record) return json({ error: 'reading not found' }, { status: 404 });

    const expired = isExpired(record);
    if (expired && extendDays <= 0) {
      return json({ error: 'reading is expired; provide extendDays to revive' }, { status: 410 });
    }

    if (extendDays > 0) {
      const nowMs = Date.now();
      const base = Math.max(nowMs, record.expiresAt ? Date.parse(record.expiresAt) : nowMs);
      record.expiresAt = new Date(base + extendDays * 24 * 60 * 60 * 1000).toISOString();
    }

    let rotated = false;
    if (rotate) {
      const oldToken = record.unlockToken;
      const newToken = crypto.randomBytes(32).toString('hex');
      record.unlockToken = newToken;
      await setToken(newToken, readingId);
      if (oldToken) await deleteToken(oldToken);
      rotated = true;
    }

    const oldEmailLower = (record.inputs?.email || '').toLowerCase();
    const newEmailLower = newEmail.toLowerCase();
    record.inputs = { ...(record.inputs || {}), email: newEmail };

    await setEmailLatest(sha256(newEmailLower), readingId);
    if (oldEmailLower && oldEmailLower !== newEmailLower) {
      const oldKey = sha256(oldEmailLower);
      const current = await getEmailLatest(oldKey);
      if (current === readingId) await setEmailLatest(oldKey, null);
    }

    await setReading(record);

    let sent = false;
    if (sendNow && record.paid && !isExpired(record)) {
      console.log(`[Admin] Would send email to ${newEmail} with token ${record.unlockToken}`);
      sent = true;
    }

    return json({
      ok: true,
      id: readingId,
      email: newEmail,
      rotated,
      sent,
      expiresAt: record.expiresAt
    });
  }

  return json({ error: 'Unknown action' }, { status: 400 });
}
