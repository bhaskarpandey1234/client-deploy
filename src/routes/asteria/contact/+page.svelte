<script>
  import { fade, fly } from 'svelte/transition';
  import { enhance } from '$app/forms';

  let b2c = { sent: false, message: '', errors: {}, values: {} };
  let b2b = { sent: false, message: '', errors: {}, values: {} };

  const onEnhanceB2C = () => {
    return async ({ result }) => {
      if (result.type === 'failure') {
        b2c = { sent: false, message: '', errors: result.data.errors || {}, values: result.data.values || {} };
      } else if (result.type === 'success') {
        b2c = { sent: true, message: result.data.message || 'Thanks! We\'ll be in touch shortly.', errors: {}, values: {} };
      }
    };
  };

  const onEnhanceB2B = () => {
    return async ({ result }) => {
      if (result.type === 'failure') {
        b2b = { sent: false, message: '', errors: result.data.errors || {}, values: result.data.values || {} };
      } else if (result.type === 'success') {
        b2b = { sent: true, message: result.data.message || 'Thanks! We\'ll be in touch shortly.', errors: {}, values: {} };
      }
    };
  };

  const v = (obj, key, fallback = '') => (obj?.values?.[key] ?? fallback);
</script>

<svelte:head>
  <title>Contact • Asteria</title>
  <meta name="description" content="Contact Asteria for support (B2C) or partnerships & press (B2B)." />
</svelte:head>

<section class="hero" in:fade>
  <h1 class="h1">Contact</h1>
  <p class="sub">Choose the right lane below and we'll get back to you quickly.</p>
</section>

<section class="wrap two">
  <article class="panel block" in:fly={{ y: 10, duration: 180 }}>
    <header class="block__head">
      <div class="badge">B2C • Customer Support</div>
      <h2 class="h2">Questions, payments, or account help</h2>
      <p class="muted">
        Prefer email? <a class="link" href="mailto:support@asteria.guide">support@asteria.guide</a>
      </p>
    </header>

    {#if b2c.sent}
      <div class="success" role="status" aria-live="polite">{b2c.message}</div>
    {:else}
      <form method="POST" action="?/b2c" use:enhance={onEnhanceB2C} class="form" novalidate>
        <input type="text" name="nickname" class="hp" tabindex="-1" autocomplete="off" />

        <div class="row">
          <label class="field">
            <span>Name</span>
            <input
              name="name"
              placeholder="Your name"
              value={v(b2c, 'name')}
              aria-invalid={!!b2c.errors?.name}
              aria-describedby="b2c-name-err"
              required
            />
            {#if b2c.errors?.name}<div id="b2c-name-err" class="err">{b2c.errors.name}</div>{/if}
          </label>

          <label class="field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={v(b2c, 'email')}
              aria-invalid={!!b2c.errors?.email}
              aria-describedby="b2c-email-err"
              required
            />
            {#if b2c.errors?.email}<div id="b2c-email-err" class="err">{b2c.errors.email}</div>{/if}
          </label>
        </div>

        <label class="field">
          <span>Topic</span>
          <select name="topic" value={v(b2c, 'topic', 'General question')}>
            <option>General question</option>
            <option>Payment issue</option>
            <option>Technical issue</option>
            <option>Account access</option>
            <option>Refunds</option>
            <option>Other</option>
          </select>
        </label>

        <label class="field">
          <span>Message</span>
          <textarea
            name="message"
            rows="6"
            placeholder="How can we help?"
            aria-invalid={!!b2c.errors?.message}
            aria-describedby="b2c-message-err"
            required
          >{v(b2c, 'message')}</textarea>
          {#if b2c.errors?.message}<div id="b2c-message-err" class="err">{b2c.errors.message}</div>{/if}
        </label>

        <div class="actions">
          <button class="btn" type="submit">Send to support</button>
          <a class="btn ghost" href="mailto:support@asteria.guide">Email instead</a>
        </div>
      </form>
    {/if}
  </article>

  <article class="panel block" in:fly={{ y: 10, duration: 220 }}>
    <header class="block__head">
      <div class="badge">B2B • Partnerships &amp; Press</div>
      <h2 class="h2">Collaborations, integration, or media</h2>
      <p class="muted">
        Prefer email? <a class="link" href="mailto:partners@asteria.guide">partners@asteria.guide</a>
      </p>
    </header>

    {#if b2b.sent}
      <div class="success" role="status" aria-live="polite">{b2b.message}</div>
    {:else}
      <form method="POST" action="?/b2b" use:enhance={onEnhanceB2B} class="form" novalidate>
        <input type="text" name="website" class="hp" tabindex="-1" autocomplete="off" />

        <div class="row">
          <label class="field">
            <span>Full name</span>
            <input
              name="name"
              placeholder="Your name"
              value={v(b2b, 'name')}
              aria-invalid={!!b2b.errors?.name}
              aria-describedby="b2b-name-err"
              required
            />
            {#if b2b.errors?.name}<div id="b2b-name-err" class="err">{b2b.errors.name}</div>{/if}
          </label>

          <label class="field">
            <span>Work email</span>
            <input
              type="email"
              name="email"
              placeholder="you@company.com"
              value={v(b2b, 'email')}
              aria-invalid={!!b2b.errors?.email}
              aria-describedby="b2b-email-err"
              required
            />
            {#if b2b.errors?.email}<div id="b2b-email-err" class="err">{b2b.errors.email}</div>{/if}
          </label>
        </div>

        <div class="row">
          <label class="field">
            <span>Company</span>
            <input
              name="company"
              placeholder="Company name"
              value={v(b2b, 'company')}
              aria-invalid={!!b2b.errors?.company}
              aria-describedby="b2b-company-err"
              required
            />
            {#if b2b.errors?.company}<div id="b2b-company-err" class="err">{b2b.errors.company}</div>{/if}
          </label>

          <label class="field">
            <span>Country</span>
            <input
              name="country"
              placeholder="e.g., United Kingdom"
              value={v(b2b, 'country')}
            />
          </label>
        </div>

        <label class="field">
          <span>Topic</span>
          <select name="topic" value={v(b2b, 'topic', 'Partnership')}>
            <option>Partnership</option>
            <option>Press</option>
            <option>API/Integration</option>
            <option>Speaking</option>
            <option>Other</option>
          </select>
        </label>

        <label class="field">
          <span>Message</span>
          <textarea
            name="message"
            rows="8"
            placeholder="Describe your idea or request…"
            aria-invalid={!!b2b.errors?.message}
            aria-describedby="b2b-message-err"
            required
          >{v(b2b, 'message')}</textarea>
          {#if b2b.errors?.message}<div id="b2b-message-err" class="err">{b2b.errors.message}</div>{/if}
        </label>

        <div class="actions">
          <button class="btn" type="submit">Send inquiry</button>
          <a class="btn ghost" href="mailto:partners@asteria.guide">Email instead</a>
        </div>
      </form>
    {/if}
  </article>
</section>

<style>
  :global(:root){--bg:#0e1019;--surface:#111624;--surface-2:#0c111f;--border:#262c43;--muted:#9ea6bf;--text:#e8edf7;--gold:#f5c64f;--gold-2:#f1b53c;--ring:rgba(245,198,79,.35)}
  .hero{text-align:center;padding:2rem 1rem 1rem}
  .h1{font-size:clamp(1.9rem,3.4vw,2.6rem);font-weight:600;margin:0 0 .25rem}
  .sub{color:var(--muted);margin:0}
  .wrap{max-width:1200px;margin:0 auto 3rem;padding:0 1rem}
  .two{display:grid;grid-template-columns:1fr;gap:1rem}
  @media (min-width:980px){.two{grid-template-columns:1fr 1fr}}
  .panel{background:linear-gradient(180deg,var(--surface),var(--surface-2));border:1px solid var(--border);border-radius:20px;box-shadow:0 10px 24px rgba(0,0,0,.35)}
  .block{padding:1rem}
  .block__head{margin-bottom:.6rem}
  .badge{display:inline-block;font-size:.78rem;letter-spacing:.02em;color:#0a0c11;background:linear-gradient(180deg,var(--gold),var(--gold-2));border:1px solid #3b2a00;border-radius:999px;padding:.2rem .55rem;font-weight:800}
  .h2{font-size:1.15rem;margin:.35rem 0 .25rem}
  .muted{color:var(--muted);margin:0}
  .link{color:var(--gold);text-decoration:none}
  .link:hover{text-decoration:underline}
  .form{display:grid;gap:.6rem}
  .row{display:grid;gap:.6rem;grid-template-columns:1fr}
  @media (min-width:600px){.row{grid-template-columns:1fr 1fr}}
  .field{display:grid;gap:.25rem}
  .field>span{color:var(--muted);font-size:.9rem}
  input,select,textarea{width:100%;color:var(--text);background:#0f1424;border:1px solid var(--border);border-radius:12px;padding:.6rem .8rem;outline:none}
  textarea{resize:vertical}
  input:focus,select:focus,textarea:focus{border-color:#31406a;box-shadow:0 0 0 3px var(--ring)}
  .err{color:#ffb7b7;font-size:.85rem}
  .actions{display:flex;gap:.6rem;flex-wrap:wrap;margin-top:.4rem}
  .btn{display:inline-block;border-radius:12px;border:1px solid #3b2a00;background:linear-gradient(180deg,var(--gold),var(--gold-2));color:#0a0c11;font-weight:800;padding:.7rem 1rem;cursor:pointer;text-decoration:none}
  .btn.ghost{background:#0f1424;border:1px solid var(--border);color:var(--text)}
  .success{background:#0e1322;border:1px solid #2d3a61;border-radius:12px;padding:.8rem;color:#ccf5d2}
  .hp{position:absolute!important;left:-10000px!important;top:auto!important;width:1px!important;height:1px!important;overflow:hidden!important}
  @media (prefers-reduced-motion:reduce){.btn,input,select,textarea{transition:none!important}}
</style>
