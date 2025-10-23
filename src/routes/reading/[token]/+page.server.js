import { getReading, getReadingIdByToken, deleteReading, deleteToken } from '$lib/server/storage.js';
import { error } from '@sveltejs/kit';

export const prerender = false;

export async function load({ params, setHeaders }) {
  const token = params.token;
  const id = await getReadingIdByToken(token);
  if (!id) throw error(404, 'Invalid link');

  const rec = await getReading(id);
  if (!rec) throw error(404, 'Not found');

  const expired = rec.expiresAt && Date.now() > Date.parse(rec.expiresAt);
  if (expired) {
    await deleteReading(id);
    await deleteToken(token);
    throw error(410, 'This link has expired');
  }

  if (!rec.paid) {
    throw error(402, 'Payment required');
  }

  setHeaders({
    'Cache-Control': 'no-store, max-age=0, must-revalidate',
    'Referrer-Policy': 'no-referrer',
    'X-Content-Type-Options': 'nosniff'
  });

  return {
    category: rec.category,
    inputs: { name: rec.inputs.name || 'Seeker', question: rec.inputs.question || '—' },
    createdAt: rec.createdAt,
    fullText: rec.fullText,
    expiresAt: rec.expiresAt
  };
}
