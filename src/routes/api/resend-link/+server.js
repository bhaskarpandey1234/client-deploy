import { json } from '@sveltejs/kit';
import { getReading, listAllReadings, setEmailLatest, getEmailLatest, getResendMeta, setResendMeta } from '$lib/server/storage.js';
import { env } from '$env/dynamic/private';
import crypto from 'node:crypto';

const MIN_GAP_MINUTES = parseInt(env.RESEND_MIN_GAP_MINUTES || '5', 10);
const MAX_PER_DAY = parseInt(env.RESEND_MAX_PER_DAY || '3', 10);

function sha256(s) {
  return crypto.createHash('sha256').update(s).digest('hex');
}

function isExpired(rec) {
  return rec.expiresAt && Date.now() > Date.parse(rec.expiresAt);
}

async function shouldThrottle(readingId) {
  const now = Date.now();
  const minGapMs = MIN_GAP_MINUTES * 60 * 1000;
  const today = new Date(); today.setUTCHours(0,0,0,0);
  const defaults = { count: 0, dayStart: today.toISOString(), lastTs: 0 };
  const meta = (await getResendMeta(readingId)) || defaults;

  if (Date.parse(meta.dayStart) !== today.getTime()) {
    meta.count = 0;
    meta.dayStart = today.toISOString();
  }

  const retryAfterMs = Math.max(0, (meta.lastTs || 0) + minGapMs - now);
  const throttled = retryAfterMs > 0 || meta.count >= MAX_PER_DAY;
  const retryAfterMinutes = Math.ceil(retryAfterMs / 60000);

  return { throttled, retryAfterMinutes, meta };
}

async function markResent(readingId) {
  const today = new Date(); today.setUTCHours(0,0,0,0);
  const defaults = { count: 0, dayStart: today.toISOString(), lastTs: 0 };
  const meta = (await getResendMeta(readingId)) || defaults;

  if (Date.parse(meta.dayStart) !== today.getTime()) {
    meta.count = 0;
    meta.dayStart = today.toISOString();
  }
  meta.count = (meta.count || 0) + 1;
  meta.lastTs = Date.now();

  await setResendMeta(readingId, meta);
}

export async function POST({ request }) {
  const body = await request.json().catch(() => ({}));
  const readingId = (body.readingId || '').trim();
  const emailInput = (body.email || '').trim();

  // Flow A: explicit readingId
  if (readingId) {
    const record = await getReading(readingId);
    if (!record) return json({ error: 'Reading not found' }, { status: 404 });

    if (emailInput) {
      const same = emailInput.toLowerCase() === (record.inputs?.email || '').toLowerCase();
      if (!same) return json({ error: 'Email mismatch for this reading' }, { status: 400 });
    }

    if (!record.paid) return json({ error: 'Payment pending for this reading' }, { status: 400 });
    if (isExpired(record)) return json({ error: 'Link expired' }, { status: 410 });

    const t = await shouldThrottle(record.id);
    if (t.throttled) return json({ error: 'Too many requests', retryAfterMinutes: t.retryAfterMinutes }, { status: 429 });

    // In dev, just log (no actual email)
    console.log(`[Resend] Would send email to ${record.inputs.email} with token ${record.unlockToken}`);
    await markResent(record.id);
    return json({ ok: true });
  }

  // Flow B: email-only (privacy preserving)
  if (emailInput) {
    const emailLower = emailInput.toLowerCase();
    const emailHash = sha256(emailLower);

    let latestId = await getEmailLatest(emailHash);
    let record = latestId ? await getReading(latestId) : null;

    if (!record) {
      const all = await listAllReadings();
      const eligible = all
        .filter(r => (r.inputs?.email || '').toLowerCase() === emailLower && r.paid && !isExpired(r))
        .sort((a,b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
      record = eligible[0] || null;
    }

    if (record) {
      const t = await shouldThrottle(record.id);
      if (!t.throttled) {
        console.log(`[Resend] Would send email to ${record.inputs.email} with token ${record.unlockToken}`);
        await markResent(record.id);
        await setEmailLatest(emailHash, record.id);
      }
    }

    return json({ ok: true, message: "If there's an eligible reading, we've sent the link to your email." });
  }

  return json({ error: 'Provide readingId or email' }, { status: 400 });
}
