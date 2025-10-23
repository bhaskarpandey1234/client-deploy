import { json } from '@sveltejs/kit';
import { generateReading } from '$lib/server/generateReading.js';
import { setReading, setToken } from '$lib/server/storage.js';
import crypto from 'node:crypto';
import { env } from '$env/dynamic/private';

const TTL_DAYS = parseInt(env.READING_TTL_DAYS || '15', 10);

function summarize(text, maxChars = 320) {
  const sentences = (text.replace(/\s+/g, " ").match(/[^.!?]+[.!?]/g) || [text]).slice(0, 2);
  let s = sentences.join(" ").trim();
  if (s.length > maxChars) s = s.slice(0, maxChars - 1) + "…";
  return s;
}

export async function POST({ request }) {
  const { category, inputs } = await request.json();
  const email = (inputs?.email || "").trim();
  if (!email) return json({ error: "Email is required" }, { status: 400 });

  const fullText = await generateReading(category, inputs);
  const summary = summarize(fullText);
  const readingId = crypto.randomUUID();
  const unlockToken = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + TTL_DAYS * 24 * 60 * 60 * 1000).toISOString();

  const record = {
    id: readingId,
    category,
    inputs: { ...inputs, email },
    fullText,
    summary,
    paid: false,
    unlockToken,
    createdAt: new Date().toISOString(),
    expiresAt
  };

  await setReading(record);
  await setToken(unlockToken, readingId);

  return json({ readingId, summary });
}
