import { getStore } from "@netlify/blobs";
import { generateReading } from "../../src/server/generateReading.js";
import crypto from "node:crypto";

function summarize(text, maxChars = 320) {
  const sentences = (text.replace(/\s+/g, " ").match(/[^.!?]+[.!?]/g) || [text]).slice(0, 2);
  let s = sentences.join(" ").trim();
  if (s.length > maxChars) s = s.slice(0, maxChars - 1) + "…";
  return s;
}

export default async (req, context) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const body = await req.json().catch(() => ({}));

  const { category, inputs } = body;
  const email = (inputs?.email || "").trim();
  if (!email) return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });

  const fullText = await generateReading(category, inputs);
  const summary = summarize(fullText);
  const readingId = crypto.randomUUID();
  const unlockToken = crypto.randomBytes(32).toString("hex");

  const store = getStore({ name: "readings" });
  const record = {
    id: readingId,
    category,
    inputs: { ...inputs, email },
    fullText,
    summary,
    paid: false,
    unlockToken,
    createdAt: new Date().toISOString()
  };

  await store.setJSON(`reading:${readingId}`, record);
  await store.set(`token:${unlockToken}`, readingId);

  return new Response(JSON.stringify({ readingId, summary }), {
    headers: { "Content-Type": "application/json" }
  });
};
