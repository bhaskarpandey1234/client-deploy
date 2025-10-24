<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { goto } from '$app/navigation';
  import { lang as siteLang } from '$lib/stores/checkout.js';

  import { ALL_COUNTRIES, countriesForLanguage, byCode } from '$lib/data/geo.js';
  import {
    oneTimePrice, subscriptionPrice,
    paymentLinkForOneTime, paymentLinkForSubscription,
    formatCurrency, SUBSCRIPTION
  } from '$lib/data/pricing';

  import { flagEmojiFrom } from '$lib/utils/flags.js';
  import { checkout } from '$lib/stores/checkout.js';
  import { t, localeForLang } from '$lib/i18n/pricing.js';

  // language (site-wide)
  $: L = $siteLang;
  $: lang = ($siteLang || 'EN').toUpperCase();

  // country selection (required to show exact prices)
  let q = '';
  let selected: string | null = null; // country code

  $: allowedCodes = countriesForLanguage(lang);
  $: countries = allowedCodes
    .map((code) => ALL_COUNTRIES.find((c) => c.code === code))
    .filter(Boolean)
    .sort((a, b) => (a?.name || '').localeCompare(b?.name || ''));

  $: filtered = q ? countries.filter((c) => c?.name.toLowerCase().includes(q.toLowerCase())) : countries;

  // Plan state
  let includeChat = true;                 // Type 2 by default
  let cycle: 'MONTHLY' | 'ANNUAL' = 'MONTHLY';                  // Subscription tab (MONTHLY | ANNUAL)
  const fmt = (amt: number, cur: string) => formatCurrency(amt, cur, localeForLang(lang));

  $: priceOneTime = selected ? oneTimePrice(selected, { includeChat }) : null;
  $: priceOneTimeNoChat = selected ? oneTimePrice(selected, { includeChat: false }) : null;
  $: priceOneTimeWithChat = selected ? oneTimePrice(selected, { includeChat: true }) : null;

  $: priceSub = selected ? subscriptionPrice(selected, cycle) : null;

  function chooseCountry(code: string) {
    selected = code;
    // stash partial checkout context
    checkout.set({
      lang,
      country: code,
      plan: includeChat ? 'ONE_TIME_WITH_CHAT' : 'ONE_TIME_NO_CHAT',
      cycle: null,
      price: priceOneTime ? { ...priceOneTime, display: fmt(priceOneTime.amount, priceOneTime.currency) } : null
    });
  }

  function continueOneTime() {
    if (!selected || !priceOneTime) return;
    checkout.set({
      lang, country: selected,
      plan: includeChat ? 'ONE_TIME_WITH_CHAT' : 'ONE_TIME_NO_CHAT',
      cycle: null,
      price: { ...priceOneTime, display: fmt(priceOneTime.amount, priceOneTime.currency) }
    });
    const url = new URL('/asteria/payment', window.location.origin);
    url.searchParams.set('tier', 'one-time');
    url.searchParams.set('chat', includeChat ? '1' : '0');
    url.searchParams.set('country', selected);
    url.searchParams.set('lang', lang);
    goto(url.pathname + url.search);
  }

  function continueSubscription() {
    if (!selected || !priceSub) return;
    checkout.set({
      lang, country: selected,
      plan: 'SUBSCRIPTION', cycle,
      price: { ...priceSub, display: fmt(priceSub.amount, priceSub.currency) }
    });
    const url = new URL('/asteria/payment', window.location.origin);
    url.searchParams.set('tier', 'subscription');
    url.searchParams.set('cycle', cycle.toLowerCase());
    url.searchParams.set('country', selected);
    url.searchParams.set('lang', lang);
    goto(url.pathname + url.search);
  }
</script>

<svelte:head>
  <title>{t(L,'hero.title')} • Asteria</title>
  <meta name="description" content="Choose between one‑time reading (with or without chat) or subscription (monthly/annual)." />
</svelte:head>

<section class="hero" in:fade>
  <h1 class="h1">{t(L,'hero.title')}</h1>
  <p class="sub">{t(L,'hero.sub')}</p>
</section>

<section class="wrap two">
  <!-- Column A: Country selection -->
  <div class="panel col" in:fade>
    <label class="search">
      <span class="sr">Search</span>
      <input
        placeholder={t(L,'countrySearch')}
        bind:value={q}
        inputmode="search"
        aria-label={t(L,'countrySearch')}
      />
      {#if q}
        <button class="clear" aria-label="Clear" on:click={() => q=''}>×</button>
      {/if}
    </label>

    <div class="grid">
      {#each filtered as c (c?.code)}
        {#if c}
          <button
            class="card {selected === c.code ? 'is-selected' : ''}"
            in:fly={{ y: 8, duration: 180 }}
            aria-pressed={selected === c.code}
            on:click={() => chooseCountry(c.code)}
          >
            <header class="card__head">
              <div class="flag" aria-hidden="true">{flagEmojiFrom(c.code)}</div>
              <h3 class="card__title">{c.name}</h3>
            </header>
          </button>
        {/if}
      {/each}
      {#if filtered.length === 0}
        <p class="empty">{t(L,'empty', q)}</p>
      {/if}
    </div>

    <p class="fine">{t(L,'footnote')}</p>
  </div>

  <!-- Column B: Plans -->
  <aside class="panel col" in:fade>
    <!-- One-time block (Type 1/2 toggle) -->
    <section class="block">
      <header class="block__head">
        <h2 class="h2">{t(L,'oneTime.title')}</h2>
      </header>

      <label class="toggle">
        <input type="checkbox" bind:checked={includeChat} />
        <span>{t(L,'oneTime.toggle')}</span>
      </label>

      <div class="pricebox">
        {#if selected && priceOneTime}
          <div class="price">{fmt(priceOneTime.amount, priceOneTime.currency)}</div>
          <div class="note">
            {includeChat ? t(L,'oneTime.withChat') : t(L,'oneTime.noChat')}
          </div>
        {:else}
          <div class="placeholder">{t(L,'actions.selectCountryFirst')}</div>
        {/if}
      </div>

      <button class="btn" disabled={!selected || !priceOneTime} on:click={continueOneTime}>
        {t(L,'actions.continue')}
      </button>

      {#if selected && priceOneTimeWithChat && priceOneTimeNoChat}
        <div class="compare">
          <div><strong>{t(L,'oneTime.withChat')}</strong> — {fmt(priceOneTimeWithChat.amount, priceOneTimeWithChat.currency)}</div>
          <div><strong>{t(L,'oneTime.noChat')}</strong> — {fmt(priceOneTimeNoChat.amount, priceOneTimeNoChat.currency)}</div>
        </div>
      {/if}
    </section>

    <!-- Subscription block (Type 3) -->
    <section class="block">
      <header class="block__head">
        <h2 class="h2">{t(L,'subscription.title')}</h2>
        <div class="seg">
          <button class="seg__btn" aria-pressed={cycle==='MONTHLY'} on:click={() => cycle='MONTHLY'}>{t(L,'subscription.monthly')}</button>
          <button class="seg__btn" aria-pressed={cycle==='ANNUAL'}  on:click={() => cycle='ANNUAL'}>{t(L,'subscription.annual')}</button>
          <span class="seg__pill" style="--i:{cycle==='ANNUAL'?1:0}"></span>
        </div>
      </header>

      <ul class="features">
        <li>{t(L,'subscription.includes', SUBSCRIPTION.INCLUDED_CHAT_HOURS)}</li>
        <li>{cycle==='MONTHLY' ? t(L,'subscription.billedMonthly') : t(L,'subscription.billedAnnually')}</li>
      </ul>

      <div class="pricebox">
        {#if selected && priceSub}
          <div class="price">{fmt(priceSub.amount, priceSub.currency)}</div>
          <div class="note">{cycle==='MONTHLY' ? t(L,'subscription.monthly') : t(L,'subscription.annual')}</div>
        {:else}
          <div class="placeholder">{t(L,'actions.selectCountryFirst')}</div>
        {/if}
      </div>

      <button class="btn" disabled={!selected || !priceSub} on:click={continueSubscription}>
        {t(L,'actions.continue')}
      </button>
    </section>
  </aside>
</section>

<!-- Mobile sticky context -->
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
  .two{display:grid;grid-template-columns:1fr;gap:1rem;margin-bottom:2rem}
  @media (min-width:980px){.two{grid-template-columns:1.2fr 1fr}}

  .panel{
    background:linear-gradient(180deg,var(--surface),var(--surface-2));
    border:1px solid var(--border); border-radius:20px; padding:1rem;
    box-shadow:0 10px 24px rgba(0,0,0,.35);
  }
  .col{min-height:200px}

  /* Country list */
  .search{position:relative}
  .search input{width:100%;background:#0f1424;border:1px solid var(--border);border-radius:12px;color:var(--text);padding:.55rem .9rem}
  .clear{position:absolute;right:.2rem;top:50%;transform:translateY(-50%);background:transparent;border:0;color:var(--muted);font-size:1.1rem;cursor:pointer;padding:.35rem .6rem;border-radius:8px}

  .grid{display:grid;grid-template-columns:1fr;gap:.75rem;margin-top:.6rem}
  @media (min-width:560px){.grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
  @media (min-width:1000px){.grid{grid-template-columns:repeat(3,minmax(0,1fr))}}

  .card{background:#121a2c;border:1px solid var(--border);border-radius:16px;padding:.8rem;transition:transform 150ms ease,box-shadow 150ms ease,border-color 150ms ease;cursor:pointer;font:inherit;text-align:left;color:var(--text)}
  .card:hover{transform:translateY(-2px);box-shadow:0 0 0 4px var(--ring),0 12px 28px rgba(0,0,0,.35);border-color:#31406a}
  .card.is-selected{box-shadow:0 0 0 4px var(--ring);border-color:#3a4874}
  .card__head{display:flex;align-items:center;gap:.6rem}
  .flag{font-size:1.25rem}
  .card__title{font-size:1rem;margin:0;color:var(--text)}
  .empty{color:var(--muted);padding:.6rem}
  .fine{color:var(--muted);margin-top:.6rem;font-size:.9rem}

  /* Plans */
  .block{border-top:1px solid var(--border);padding-top:.75rem;margin-top:.75rem}
  .block:first-child{border-top:0;padding-top:0;margin-top:0}
  .block__head{display:flex;align-items:center;justify-content:space-between;gap:.6rem;margin-bottom:.35rem}
  .h2{font-size:1.1rem;margin:0}

  .toggle{display:flex;align-items:center;gap:.5rem;margin:.4rem 0 .2rem}
  .toggle input{width:18px;height:18px}

  .pricebox{
    background:#0e1322;border:1px solid var(--border);border-radius:12px;
    padding:.75rem;margin:.4rem 0 .6rem; display:grid; gap:.2rem;
  }
  .price{font-size:1.4rem;font-weight:800}
  .note{color:var(--muted)}
  .placeholder{color:var(--muted)}

  .compare{color:var(--muted);font-size:.92rem;display:grid;gap:.2rem;margin-top:.35rem}

  .features{color:var(--muted);margin:.2rem 0 .5rem;padding-left:1.1rem}
  .features li{margin:.1rem 0}

  .seg{position:relative;display:inline-grid;grid-auto-flow:column;gap:.35rem;padding:.3rem;background:#0f1424;border:1px solid var(--border);border-radius:999px}
  .seg__btn{position:relative;z-index:1;padding:.35rem .7rem;border-radius:999px;background:transparent;color:var(--text);border:0;cursor:pointer;font:inherit}
  .seg__btn[aria-pressed="true"]{color:#0a0c11;font-weight:800}
  .seg__pill{position:absolute;z-index:0;top:4px;bottom:4px;left:4px;width:calc(50% - 8px);border-radius:999px;background:linear-gradient(90deg,var(--gold),#ffe59a);transform:translateX(calc(var(--i) * (100% + .35rem)));transition:transform 180ms ease}

  .btn{display:inline-block;width:100%;border-radius:12px;border:1px solid #3b2a00;background:linear-gradient(180deg,var(--gold),var(--gold-2));color:#0a0c11;font-weight:800;padding:.7rem 1rem;cursor:pointer}
  .btn[disabled]{opacity:.6;cursor:not-allowed}

  .sticky{position:sticky;bottom:0;inset-inline:0;display:none;align-items:center;justify-content:center;background:linear-gradient(180deg,rgba(14,16,25,.3),rgba(14,16,25,.95));padding:.5rem .75rem;border-top:1px solid var(--border);backdrop-filter:blur(6px)}
  @media (max-width:820px){.sticky{display:flex}}
  .sticky__text{font-weight:700}

  .sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}
  @media (prefers-reduced-motion:reduce){.seg__pill,.card,.btn{transition:none!important}}
</style>
