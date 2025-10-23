import { json } from '@sveltejs/kit';
import { listAllReadings, deleteReading, deleteToken } from '$lib/server/storage.js';

export async function POST() {
  const all = await listAllReadings();
  let removed = 0;

  for (const r of all) {
    if (r.expiresAt && Date.now() > Date.parse(r.expiresAt)) {
      await deleteReading(r.id);
      if (r.unlockToken) await deleteToken(r.unlockToken);
      removed++;
    }
  }

  return json({ ok: true, removed });
}
