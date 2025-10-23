import { getStore } from "@netlify/blobs";

export default async (req) => {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");
  if (!token) return new Response("Missing token", { status: 400 });

  const store = getStore({ name: "readings" });
  const readingId = await store.get(`token:${token}`);
  if (!readingId) return new Response("Invalid link", { status: 404 });

  const record = await store.getJSON(`reading:${readingId}`);
  if (!record?.paid) {
    return new Response("<h1>Payment required</h1><p>This link isn't active yet.</p>", {
      status: 402,
      headers: { "Content-Type": "text/html; charset=utf-8" }
    });
  }

  const { category, inputs, fullText, createdAt } = record;

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${category} Reading — Asteria</title>
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;line-height:1.6;margin:0;background:#0b0d10;color:#f4f6f8}
    main{max-width:740px;margin:40px auto;padding:24px;background:#11151a;border-radius:14px;border:1px solid #1f2630}
    h1{margin:0 0 8px;font-size:28px;color:#7c6cff}
    .meta{opacity:.8;font-size:14px;margin-bottom:20px}
    .card{padding:16px;border:1px solid #283040;border-radius:10px;background:#0f1318;margin:16px 0}
    pre{white-space:pre-wrap;font-family:inherit;margin:0}
  </style>
</head>
<body>
  <main>
    <h1>${category[0].toUpperCase() + category.slice(1)} — Full Reading</h1>
    <div class="meta">For: ${inputs.name || "Seeker"} • ${new Date(createdAt).toLocaleString()}</div>
    <div class="card">
      <strong>Question:</strong> ${inputs.question || "—"}
    </div>
    <h2>Reading</h2>
    <pre>${escapeHtml(fullText)}</pre>
  </main>
</body>
</html>`;
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
};

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
