<script>
  import FooterMain from '$lib/components/FooterMain.svelte';
  import { onMount } from 'svelte';

  const steps = [
    { title: 'Prepare & consent', text: 'Good light; hands clean; ensure the querent is comfortable and consents.' },
    { title: 'Choose hand & posture', text: 'Dominant for current patterns; non‑dominant for potentials. Relaxed, palm open.' },
    { title: 'Observe hand & mounts', text: 'Shape, fingers, thumb, and prominence near Venus/Jupiter/Saturn/Apollo/Mercury.' },
    { title: 'Trace major lines', text: 'Life, Head, Heart—continuity, breaks, forks, and clarity.' },
    { title: 'Study minor lines & marks', text: 'Fate, Apollo, Mercury, intuition; islands, stars, chains, crosses.' },
    { title: 'Synthesize', text: 'Relate features to the querent's question; note practical guidance.' }
  ];

  let stepsOpen = true;
  let name = '', email = '', question = '';
  let hand = 'dominant', focus = '';
  let showPaywall = false, readingId = '', summary = '';

  onMount(() => {
    try {
      const saved = localStorage.getItem('asteria.steps.open.palmistry');
      if (saved !== null) stepsOpen = saved === '1';
    } catch {}
  });

  function toggleSteps() {
    stepsOpen = !stepsOpen;
    try {
      localStorage.setItem('asteria.steps.open.palmistry', stepsOpen ? '1' : '0');
    } catch {}
  }

  async function compute(e) {
    e.preventDefault();
    if (!email.trim()) {
      alert('Email is required');
      return;
    }

    const inputs = { name, email, question, hand, focus };
    const res = await fetch('/api/create-reading', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category: 'palmistry', inputs })
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.error || 'Failed to create reading');
      return;
    }

    readingId = data.readingId;
    summary = data.summary;
    showPaywall = true;
  }

  async function unlockReading() {
    if (!readingId) return;
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ readingId })
    });
    const data = await res.json();
    if (!res.ok) { alert(data.error || 'Failed to start checkout'); return; }
    window.location.href = data.url;
  }
</script>

<header class="exp-hero">
  <h1>Palmistry Experience</h1>
  <p class="sub">Insight through the hand. Start below; open the steps any time for guidance.</p>
  <div class="cta-row">
    <a class="btn" href="#experience-form">Start now</a>
    <a class="link" href="/asteria/divination/palmistry/information">What is palmistry?</a>
  </div>
</header>

<div class="exp-grid">
  <section id="experience-form" class="exp-form" aria-label="Palmistry form">
    <div class="wrap">
      <form class="card form" on:submit={compute}>
        <div class="grid">
          <label class="field">
            <span>Name (optional)</span>
            <input type="text" bind:value={name} placeholder="Your name" autocomplete="name" />
          </label>

          <label class="field">
            <span>Email (required)</span>
            <input type="email" bind:value={email} placeholder="your@email.com" autocomplete="email" required />
          </label>

          <label class="field">
            <span>Question / Focus</span>
            <input type="text" bind:value={question} placeholder="What would you like insight on?" />
          </label>

          <label class="field">
            <span>Hand</span>
            <select bind:value={hand}>
              <option value="dominant">Dominant</option>
              <option value="non-dominant">Non‑dominant</option>
              <option value="both">Both</option>
            </select>
          </label>

          <label class="field">
            <span>Focus (optional)</span>
            <select bind:value={focus}>
              <option value="">General</option>
              <option value="relationships">Relationships</option>
              <option value="career">Career/Vocation</option>
              <option value="health">Health/Well‑being</option>
              <option value="purpose">Life purpose</option>
            </select>
          </label>
        </div>

        <div class="actions">
          <button class="btn primary" type="submit">Get reading summary</button>
        </div>
      </form>

      {#if showPaywall}
        <section class="card paywall" aria-live="polite">
          <h2>Your Reading Summary</h2>
          <p class="summary-text">{summary}</p>
          <button class="btn primary large" type="button" on:click={unlockReading}>Pay to unlock full reading</button>
          <p class="hint">The full personalized reading will be emailed to you after payment.</p>
        </section>
      {/if}
    </div>
  </section>

  <aside class="exp-steps" aria-label="How to read palms">
    <details class="steps-panel" bind:open={stepsOpen} on:toggle={toggleSteps}>
      <summary class="steps-summary">
        <span>How to Read Palms</span>
        <span class="hint">{stepsOpen ? 'Hide steps' : 'Need guidance?'}</span>
      </summary>
      <ol class="steps-list">
        {#each steps as step, i}
          <li class="step">
            <div class="step-badge">{String(i+1).padStart(2,'0')}</div>
            <div>
              <h4 class="step-title">{step.title}</h4>
              <p class="step-text">{step.text}</p>
            </div>
          </li>
        {/each}
      </ol>
    </details>
  </aside>
</div>
<FooterMain/>

<style>
  :root{--bg:#0c0d10;--card:#14161b;--soft:#1b1e24;--text:#e9ecf1;--muted:#b9c0cc;--brand:#7c6cff;--brand-2:#38d9a9;--ring:0 0 0 3px rgba(124,108,255,0.35);--shadow:0 10px 30px rgba(0,0,0,.35)}
  *{box-sizing:border-box}
  body{margin:0;background:radial-gradient(1200px 700px at 20% -10%,#1a1b23,#0b0c10 60%),var(--bg);color:var(--text)}
  .wrap{max-width:960px;margin:0 auto;padding:28px 20px 80px}
  .card{background:linear-gradient(180deg,var(--card),var(--soft));border:1px solid #1e222b;border-radius:14px;box-shadow:var(--shadow)}
  .form{padding:18px}
  .grid{display:grid;grid-template-columns:1fr;gap:14px}
  @media (min-width:760px){.grid{grid-template-columns:repeat(3,1fr)}}
  .field{display:flex;flex-direction:column;gap:6px}
  .field>span{font-weight:600;font-size:.95rem}
  input[type="text"],input[type="email"],select{width:100%;padding:12px;border-radius:10px;border:1px solid #232731;background:#0f1116;color:var(--text);outline:none;transition:box-shadow .15s ease,border-color .15s ease}
  input:focus,select:focus{box-shadow:var(--ring);border-color:#3a3f52}
  .actions{margin-top:12px;display:flex;gap:10px;flex-wrap:wrap}
  .btn{appearance:none;border:1px solid #2a3040;background:#11141b;color:var(--text);padding:10px 14px;border-radius:10px;cursor:pointer;font-weight:600;transition:transform .05s ease,box-shadow .15s ease,border-color .15s ease}
  .btn:hover{transform:translateY(-1px);border-color:#3d4458}
  .btn.primary{background:linear-gradient(135deg,var(--brand),var(--brand-2));border:none;color:#0c0d10}
  .paywall{margin-top:18px;padding:32px;text-align:center}
  .paywall h2{margin:0 0 16px;color:var(--brand)}
  .summary-text{font-size:1.1rem;line-height:1.7;margin:20px 0;color:var(--text)}
  .btn.large{padding:14px 28px;font-size:1.05rem}
  .paywall .hint{margin-top:16px;color:var(--muted);font-size:.9rem}
  .exp-hero{padding:48px 20px 12px;text-align:center;background:var(--bg)}
  .exp-hero h1{margin:0 0 6px;font-variant:small-caps;letter-spacing:.02em;font-size:28px}
  .exp-hero .sub{margin:0;color:var(--muted)}
  .cta-row{margin-top:14px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
  .exp-hero .btn{padding:10px 16px;border-radius:12px;text-decoration:none;font-weight:600;color:#0c0d10;background:linear-gradient(90deg,var(--brand),var(--brand-2))}
  .exp-hero .link{color:var(--muted);text-decoration:underline;text-underline-offset:3px}
  .exp-grid{display:grid;gap:24px;padding:20px;max-width:1200px;margin:0 auto 48px;grid-template-columns:1fr}
  .exp-form{order:1}
  .exp-steps{order:2}
  @media (min-width:1024px){.exp-grid{grid-template-columns:minmax(420px,1fr) minmax(280px,360px)}.exp-steps{position:sticky;top:96px}}
  .steps-summary{display:flex;justify-content:space-between;align-items:center;cursor:pointer;padding:12px 14px;border:1px solid #1e222b;border-radius:12px;background:#11141b;gap:12px}
  .steps-summary:hover{border-color:#3d4458}
  .steps-summary .hint{color:var(--muted);font-size:.9rem}
  .steps-list{margin:12px 0 0;padding:0;list-style:none}
  .step{display:grid;grid-template-columns:auto 1fr;gap:10px;padding:12px;border:1px solid #1e222b;border-radius:12px;background:#11141b;margin-top:10px}
  .step-badge{width:34px;height:28px;display:grid;place-items:center;border:1px solid #1e222b;border-radius:999px;font-size:12px;opacity:.85}
  .step-title{margin:0 0 4px;font-size:16px}
  .step-text{margin:0;color:var(--muted);line-height:1.55}
</style>
