<script>
  export let data;
  const cap = (s) => s ? s[0].toUpperCase() + s.slice(1) : s;
  const expiresOn = data.expiresAt ? new Date(data.expiresAt).toLocaleString('en-US', { dateStyle: 'medium' }) : null;
</script>

<svelte:head>
  <title>{cap(data.category)} — Full Reading</title>
  <meta name="robots" content="noindex" />
  <meta http-equiv="Cache-Control" content="no-store, max-age=0, must-revalidate" />
  <meta name="referrer" content="no-referrer" />
</svelte:head>

<main class="wrap">
  <h1>{cap(data.category)} — Full Reading</h1>
  <div class="meta">For: {data.inputs.name} • {new Date(data.createdAt).toLocaleString()}</div>
  {#if expiresOn}
    <div class="expiry">Link expires: {expiresOn}</div>
  {/if}
  <div class="card"><strong>Question:</strong> {data.inputs.question}</div>
  <h2>Reading</h2>
  <pre>{data.fullText}</pre>
</main>

<style>
  .wrap{max-width:740px;margin:40px auto;padding:24px;background:#11151a;border-radius:14px;border:1px solid #1f2630;color:#f4f6f8;font-family:system-ui,sans-serif}
  .meta{opacity:.8;font-size:14px;margin-bottom:8px}
  .expiry{opacity:.7;font-size:13px;margin-bottom:20px;color:#ffb4b4}
  .card{padding:16px;border:1px solid #283040;border-radius:10px;background:#0f1318;margin-bottom:12px}
  pre{white-space:pre-wrap}
</style>
