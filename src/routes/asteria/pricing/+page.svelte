<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { goto } from '$app/navigation';
  import { lang as siteLang } from '$lib/stores/checkout.js';

  import { ALL_COUNTRIES, countriesForLanguage, byCode } from '$lib/data/geo.js';
  import {
    oneTimePrice, subscriptionPrice,
    formatCurrency, SUBSCRIPTION
  } from '$lib/data/pricing.js';

  import { flagEmojiFrom } from '$lib/utils/flags.js';
  import { checkout } from '$lib/stores/checkout.js';
  import { t, localeForLang } from '$lib/i18n/pricing.js';

  // === Language (global) ===
  $: L = $siteLang;
  $: lang = ($siteLang || 'EN').toUpperCase();
  const fmt = (amt: number, cur: string) => formatCurrency(amt, cur, localeForLang(lang));

  // === Step 1: plan selection ===
  // Keep Type 2 (one‑time + 10‑min chat) as default selection as per your original requirement.
  let plan: 'one-time' | 'subscription' = 'one-time';
  let includeChat = true;        // One-time: Type 2 by default (toggle off => Type 1)
  let cycle: 'MONTHLY' | 'ANNUAL' = 'MONTHLY';

  // === Step 2: country selection ===
  let q = '';
  let selected: string | null = null; // country code

  $: allowedCodes = countriesForLanguage(lang);
  $: countries = allowedCodes
    .map((code) => ALL_COUNTRIES.find((c) => c.code === code))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
    .sort((a, b) => a.name.localeCompare(b.name));

  $: filtered = q ? countries.filter((c) => c.name.toLowerCase().includes(q.toLowerCase())) : countries;

  // === Derived prices (only computed when country selected) ===
  $: priceOneTime = selected ? oneTimePrice(selected, { includeChat }) : null;
  $: priceSub     = selected ? subscriptionPrice(selected, cycle)     : null;

  function pickPlan(kind: 'one-time' | 'subscription') {
    plan = kind;
  }

  function pickCountry(code: string) {
    selected = code;
    // Cache context for payment page
    checkout.set({
      lang,
      country: code,
      plan: plan === 'one-time'
        ? (includeChat ? 'ONE_TIME_WITH_CHAT' : 'ONE_TIME_NO_CHAT')
        : 'SUBSCRIPTION',
      cycle: plan === 'subscription' ? cycle : null,
      price: plan === 'one-time' && priceOneTime
        ? { ...priceOneTime, display: fmt(priceOneTime.amount, priceOneTime.currency) }
        : plan === 'subscription' && priceSub
          ? { ...priceSub, display: fmt(priceSub.amount, priceSub.currency) }
          : null
    });
  }

  function continueToPay() {
    if (!selected) return;

    const u = new URL('/asteria/payment', window.location.origin);
    u.searchParams.set('country', selected);
    u.searchParams.set('lang', lang);

    if (plan === 'one-time') {
      u.searchParams.set('tier', 'one-time');
      u.searchParams.set('chat', includeChat ? '1' : '0');
    } else {
      u.searchParams.set('tier', 'subscription');
      u.searchParams.set('cycle', cycle.toLowerCase());
    }
    goto(u.pathname + u.search);
  }
</script>

<svelte:head>
  <title>{t(L,'hero.title')} • Asteria</title>
  <meta name="description" content="Choose your plan first, then your billing country, and checkout securely." />
</svelte:head>

<section class="hero" in:fade>
  <h1 class="h1">{t(L,'hero.title')}</h1>
  <p class="sub">{t(L,'hero.sub')}</p>
</section>

<section class="wrap steps">

  <!-- =======================
       Step 1: Choose plan
  ======================== -->
  <h2 class="step-head">{t(L,'steps.choosePlan')}</h2>
  <div class="plans" in:fade>
    <!-- One-time card -->
    <article class="plan-card {plan === 'one-time' ? 'is-selected' : ''}" on:click={() => pickPlan('one-time')} on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && pickPlan('one-time')} tabindex="0" role="button" aria-pressed={plan==='one-time'}>
      <header class="plan-card__head">
        <div class="badge">1×</div>
        <h3 class="title">{t(L,'oneTime.title')}</h3>
      </header>
      <p class="muted">{t(L,'oneTime.withChat')} / {t(L,'oneTime.noChat')}</p>

      <div class="divider"></div>

      <label class="toggle">
        <input type="checkbox" bind:checked={includeChat} on:click={(e)=>e.stopPropagation()} />
        <span>{t(L,'oneTime.toggle')}</span>
      </label>

      <div class="hint">
        {#if selected && priceOneTime}
          <strong class="price">{fmt(priceOneTime.amount, priceOneTime.currency)}</strong>
          <span class="note">• {includeChat ? t(L,'oneTime.withChat') : t(L,'oneTime.noChat')}</span>
        {:else}
          <span class="note">{t(L,'actions.selectCountryFirst')}</span>
        {/if}
      </div>
    </article>

    <!-- Subscription card -->
    <article class="plan-card {plan === 'subscription' ? 'is-selected' : ''}" on:click={() => pickPlan('subscription')} on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && pickPlan('subscription')} tabindex="0" role="button" aria-pressed={plan==='subscription'}>
      <header class="plan-card__head">
        <div class="badge">∞</div>
        <h3 class="title">{t(L,'subscription.title')}</h3>
      </header>
      <p class="muted">{t(L,'subscription.includes', 15)}</p>

      <div class="divider"></div>

      <div class="seg" on:click={(e)=>e.stopPropagation()} on:keydown={(e)=>e.stopPropagation()} role="tablist" aria-label="Billing cycle" tabindex="0">
        <button class="seg__btn" on:click={() => cycle='MONTHLY'} role="tab" aria-selected={cycle==='MONTHLY'}>{t(L,'subscription.monthly')}</button>
        <button class="seg__btn" on:click={() => cycle='ANNUAL'} role="tab" aria-selected={cycle==='ANNUAL'}>{t(L,'subscription.annual')}</button>
        <span class="seg__pill" style="--i:{cycle==='ANNUAL'?1:0}"></span>
      </div>

      <div class="hint">
        {#if selected && priceSub}
          <strong class="price">{fmt(priceSub.amount, priceSub.currency)}</strong>
          <span class="note">• {cycle==='MONTHLY' ? t(L,'subscription.billedMonthly') : t(L,'subscription.billedAnnually')}</span>
        {:else}
          <span class="note">{t(L,'actions.selectCountryFirst')}</span>
        {/if}
      </div>
    </article>
  </div>

  <!-- =======================
       Step 2: Choose country
  ======================== -->
  <h2 class="step-head">{t(L,'steps.chooseCountry')}</h2>
  <div class="panel country" in:fade>
    <label class="search">
      <span class="sr">Search</span>
      <input
        placeholder={t(L,'countrySearch')}
        bind:value={q}
        inputmode="search"
        aria-label={t(L,'countrySearch')}
      />
      {#if q}<button class="clear" aria-label="Clear" on:click={() => q=''}>×</button>{/if}
    </label>

    <div class="grid">
      {#each filtered as c (c.code)}
        <button
          class="card {selected === c.code ? 'is-selected' : ''}"
          in:fly={{ y: 8, duration: 160 }}
          aria-pressed={selected === c.code}
          on:click={() => pickCountry(c.code)}
        >
          <header class="card__head">
            <div class="flag" aria-hidden="true">{flagEmojiFrom(c.code)}</div>
            <h3 class="card__title">{c.name}</h3>
          </header>
        </button>
      {/each}
      {#if filtered.length === 0}
        <p class="empty">{t(L,'empty', q)}</p>
      {/if}
    </div>

    <p class="fine">{t(L,'footnote')}</p>
  </div>

  <!-- =======================
       Step 3: Summary & Continue
  ======================== -->
  <h2 class="step-head">{t(L,'steps.summary')}</h2>
  <aside class="panel summary" in:fade>
    <div class="rows">
      <div><div class="k">{t(L,'summary.language')}</div><div class="v">{lang}</div></div>
      <div><div class="k">Plan</div>
        <div class="v">
          {#if plan === 'one-time'}
            {includeChat ? t(L,'oneTime.withChat') : t(L,'oneTime.noChat')}
          {:else}
            {t(L,'subscription.title')} — {cycle === 'ANNUAL' ? t(L,'subscription.annual') : t(L,'subscription.monthly')}
          {/if}
        </div>
      </div>
      <div><div class="k">{t(L,'summary.country')}</div><div class="v">{selected ? byCode(selected)?.name : '—'}</div></div>
      <div><div class="k">{t(L,'summary.price')}</div>
        <div class="v">
          {#if selected}
            {#if plan === 'one-time' && priceOneTime}
              {fmt(priceOneTime.amount, priceOneTime.currency)}
            {:else if plan === 'subscription' && priceSub}
              {fmt(priceSub.amount, priceSub.currency)}
            {:else}
              —
            {/if}
          {:else} —
          {/if}
        </div>
      </div>
    </div>

    <button
      class="btn"
      disabled={!selected || (plan === 'one-time' ? !priceOneTime : !priceSub)}
      on:click={continueToPay}
    >
      {t(L,'actions.continue')}
    </button>
  </aside>
</section>

<!-- (Optional) Mobile sticky context (country chosen) -->
{#if selected}
  <div class="sticky" role="region" aria-live="polite">
    <div class="sticky__text">{byCode(selected)?.name}</div>
  </div>
{/if}

<style>
  :global(:root){
    --bg:#0e1019; --surface:#111624; --surface-2:#0c111f; --border:#262c43;
    --muted:#9ea6bf; --text:#e8edf7; --gold:#f5c64f; --gold-2:#f1b53c; --ring:rgba(245,198,79,.35);
  }
  .hero{text-align:center;padding:2rem 1rem 1rem}
  .h1{font-size:clamp(1.9rem,3.4vw,2.6rem);font-weight:600;margin:0 0 .25rem}
  .sub{color:var(--muted);margin:0}

  .wrap{max-width:1200px;margin:0 auto;padding:0 1rem}
  .steps{display:grid;gap:.75rem;margin-bottom:2rem}

  .step-head{font-size:1.02rem;color:var(--muted);margin:.4rem 0 .1rem}

  /* Plan cards row */
  .plans{display:grid;grid-template-columns:1fr;gap:.75rem}
  @media (min-width:900px){ .plans{grid-template-columns:1fr 1fr} }

  .plan-card{
    background:linear-gradient(180deg,var(--surface),var(--surface-2));
    border:1px solid var(--border); border-radius:16px; padding:.85rem;
    box-shadow:0 10px 24px rgba(0,0,0,.35);
    cursor:pointer; transition:border-color 120ms ease, box-shadow 120ms ease, transform 120ms ease;
  }
  .plan-card:hover{ transform:translateY(-2px); border-color:#31406a; box-shadow:0 0 0 4px var(--ring),0 12px 28px rgba(0,0,0,.35); }
  .plan-card.is-selected{ border-color:#3a4874; box-shadow:0 0 0 4px var(--ring) }
  .plan-card__head{ display:flex; align-items:center; gap:.6rem }
  .badge{
    display:inline-grid; place-items:center; width:28px; height:28px; border-radius:999px;
    background:linear-gradient(180deg,var(--gold),var(--gold-2)); color:#0a0c11; font-weight:800; border:1px solid #3b2a00;
  }
  .title{ margin:0; font-size:1.05rem }
  .muted{ color:var(--muted); margin:.15rem 0 .25rem }

  .divider{ height:1px; background:var(--border); margin:.5rem 0 .5rem }

  .toggle{ display:flex; align-items:center; gap:.5rem; }
  .toggle input{ width:18px; height:18px }

  .seg{ position:relative; display:inline-grid; grid-auto-flow:column; gap:.35rem; padding:.3rem; background:#0f1424; border:1px solid var(--border); border-radius:999px }
  .seg__btn{ position:relative; z-index:1; padding:.35rem .7rem; border-radius:999px; background:transparent; color:var(--text); border:0; cursor:pointer; font:inherit }
  .seg__btn[aria-selected="true"]{ color:#0a0c11; font-weight:800 }
  .seg__pill{ position:absolute; z-index:0; top:4px; bottom:4px; left:4px; width:calc(50% - 8px); border-radius:999px; background:linear-gradient(90deg,var(--gold),#ffe59a); transform:translateX(calc(var(--i) * (100% + .35rem))); transition:transform 180ms ease }

  .hint{ margin-top:.45rem; display:flex; flex-wrap:wrap; gap:.4rem; align-items:center }
  .price{ font-size:1.25rem; font-weight:800 }
  .note{ color:var(--muted) }

  /* Country panel & grid */
  .panel{
    background:linear-gradient(180deg,var(--surface),var(--surface-2));
    border:1px solid var(--border); border-radius:16px; padding:.9rem;
    box-shadow:0 10px 24px rgba(0,0,0,.35);
  }
  .country .search{ position:relative }
  .country .search input{ width:100%; background:#0f1424; border:1px solid var(--border); border-radius:12px; color:var(--text); padding:.55rem .9rem }
  .clear{ position:absolute; right:.2rem; top:50%; transform:translateY(-50%); background:transparent; border:0; color:var(--muted); font-size:1.1rem; cursor:pointer; padding:.35rem .6rem; border-radius:8px }

  .grid{ display:grid; grid-template-columns:1fr; gap:.6rem; margin-top:.5rem }
  @media (min-width:560px){ .grid{ grid-template-columns:repeat(2,minmax(0,1fr)) } }
  @media (min-width:1000px){ .grid{ grid-template-columns:repeat(3,minmax(0,1fr)) } }

  .card{ 
    background:#121a2c; 
    border:1px solid var(--border); 
    border-radius:14px; 
    padding:.75rem; 
    transition:transform 120ms ease,box-shadow 120ms ease,border-color 120ms ease;
    color:var(--text);
  }
  .card:hover{ transform:translateY(-2px); box-shadow:0 0 0 4px var(--ring),0 12px 28px rgba(0,0,0,.35); border-color:#31406a }
  .card.is-selected{ box-shadow:0 0 0 4px var(--ring); border-color:#3a4874 }
  .card__head{ display:flex; align-items:center; gap:.6rem }
  .flag{ font-size:1.25rem }
  .card__title{ font-size:1rem; margin:0; color:var(--text) }
  .empty{ color:var(--muted); padding:.6rem; }
  .fine{ color:var(--muted); margin-top:.6rem; font-size:.9rem }

  /* Summary */
  .summary .rows{ display:grid; gap:.6rem; grid-template-columns:1fr; }
  @media (min-width:700px){ .summary .rows{ grid-template-columns:repeat(4,1fr) } }
  .k{ color:var(--muted); font-size:.85rem }
  .v{ font-weight:700 }
  .btn{ margin-top:.7rem; display:inline-block; width:100%; border-radius:12px; border:1px solid #3b2a00; background:linear-gradient(180deg,var(--gold),var(--gold-2)); color:#0a0c11; font-weight:800; padding:.7rem 1rem; cursor:pointer }
  .btn[disabled]{ opacity:.6; cursor:not-allowed }

  /* Mobile sticky country context */
  .sticky{ position:sticky; bottom:0; inset-inline:0; display:none; justify-content:center;
           background:linear-gradient(180deg,rgba(14,16,25,.3),rgba(14,16,25,.95));
           padding:.5rem .75rem; border-top:1px solid var(--border); backdrop-filter:blur(6px) }
  @media (max-width:820px){ .sticky{ display:flex } }
  .sticky__text{ font-weight:700 }

  .sr{ position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); border:0 }

  @media (prefers-reduced-motion:reduce){
    .seg__pill, .plan-card, .card, .btn { transition:none !important; }
  }
</style>