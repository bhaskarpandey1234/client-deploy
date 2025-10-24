<script>
  import { fade, fly } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { goto } from '$app/navigation';

  import { ALL_COUNTRIES, countriesForLanguage, byCode } from '$lib/data/geo.js';
  import { priceForCountry, formatCurrency } from '$lib/data/pricing.js';
  import { flagEmojiFrom } from '$lib/utils/flags.js';
  import { checkout, lang as siteLang } from '$lib/stores/checkout.js';

  $: lang = ($siteLang || 'EN').toUpperCase();

  let q = '';
  let selected = null;

  $: allowedCodes = countriesForLanguage(lang);
  $: countries = allowedCodes
    .map((code) => ALL_COUNTRIES.find((c) => c.code === code))
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name));

  $: filtered = q
    ? countries.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()))
    : countries;

  const localeForLang = (L) => {
    const x = (L || '').toUpperCase();
    if (x.startsWith('RS')) return 'sr-RS';
    if (x === 'HR') return 'hr-HR';
    if (x === 'RU') return 'ru-RU';
    if (x === 'IT') return 'it-IT';
    if (x === 'PL') return 'pl-PL';
    return 'en-GB';
  };

  function selectCountry(code) {
    selected = code;
    const info = priceForCountry(code);
    const locale = localeForLang(lang);
    checkout.set({
      lang,
      country: code,
      price: info ? { ...info, display: formatCurrency(info.amount, info.currency, locale) } : null
    });
  }

  function continueToPay() {
    if (!selected) return;
    goto(`/asteria/payment?lang=${encodeURIComponent(lang)}&country=${encodeURIComponent(selected)}`);
  }
</script>

<svelte:head>
  <title>Pricing • Asteria</title>
  <meta name="description" content="Select your billing country to see your price and pay securely." />
</svelte:head>

<section class="hero" in:fade>
  <h1 class="h1">Pricing</h1>
  <p class="sub">Select your billing country to see your price.</p>
</section>

<section class="two">
  <div class="panel" in:fade>
    <label class="search">
      <span class="sr">Filter countries</span>
      <input
        placeholder="Search country…"
        bind:value={q}
        inputmode="search"
        aria-label="Filter countries"
      />
      {#if q}
        <button class="clear" aria-label="Clear" on:click={() => q=''}>&times;</button>
      {/if}
    </label>

    <div class="grid">
      {#each filtered as c (c.code)}
        <article
          class="card {selected === c.code ? 'is-selected' : ''}"
          in:fly={{ y: 8, duration: 180 }}
          animate:flip
          role="button"
          aria-pressed={selected === c.code}
          tabindex="0"
          on:click={() => selectCountry(c.code)}
          on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && selectCountry(c.code)}
        >
          <header class="card__head">
            <div class="flag" aria-hidden="true">{flagEmojiFrom(c.code)}</div>
            <h3 class="card__title">{c.name}</h3>
          </header>

          {#if priceForCountry(c.code)}
            {#key `${c.code}-${lang}`}
              <p class="price" in:fade>
                {formatCurrency(priceForCountry(c.code).amount, priceForCountry(c.code).currency, localeForLang(lang))}
              </p>
            {/key}
          {:else}
            <p class="price price--na">TBA</p>
          {/if}

          <button class="ghost">Select</button>
        </article>
      {/each}

      {#if filtered.length === 0}
        <p class="empty">No countries match "{q}".</p>
      {/if}
    </div>
    <p class="fine">Prices include VAT where applicable. Your card's billing country must match your selection.</p>
  </div>

  <aside class="panel side" in:fade>
    <h2 class="h2">Summary</h2>
    <div class="summary">
      <div><div class="k">Language</div><div class="v">{lang}</div></div>
      <div><div class="k">Billing Country</div><div class="v">{selected ? byCode(selected)?.name : '—'}</div></div>
      <div>
        <div class="k">Price</div>
        <div class="v">
          {#if selected && priceForCountry(selected)}
            {formatCurrency(
              priceForCountry(selected).amount,
              priceForCountry(selected).currency,
              localeForLang(lang)
            )}
          {:else} — {/if}
        </div>
      </div>
    </div>

    <button class="cta" disabled={!selected} on:click={continueToPay}>
      Continue to checkout
    </button>

    <p class="muted">We'll show this same price on the payment page.</p>
  </aside>
</section>

{#if selected}
  <div class="sticky" role="region" aria-live="polite">
    <div class="sticky__price">
      {#if priceForCountry(selected)}
        {formatCurrency(
          priceForCountry(selected).amount,
          priceForCountry(selected).currency,
          localeForLang(lang)
        )}
      {/if}
      <span class="sep">•</span>
      <span>{byCode(selected)?.name}</span>
    </div>
    <button class="cta cta--sm" on:click={continueToPay}>Continue</button>
  </div>
{/if}

<style>
  :global(:root){--bg:#0e1019;--surface:#111624;--surface-2:#0c111f;--border:#262c43;--muted:#9ea6bf;--text:#e8edf7;--gold:#f5c64f;--gold-2:#f1b53c;--ring:rgba(245,198,79,.35)}
  .hero{text-align:center;padding:2rem 1rem 1rem}
  .h1{font-size:clamp(1.9rem,3.4vw,2.6rem);font-weight:600;margin:0 0 .25rem}
  .sub{color:var(--muted);margin:0}
  .two{display:grid;grid-template-columns:1fr;gap:1rem;max-width:1200px;margin:0 auto 3rem;padding:0 1rem}
  @media (min-width:980px){.two{grid-template-columns:1.65fr .95fr;align-items:start}}
  .panel{background:linear-gradient(180deg,var(--surface),var(--surface-2));border:1px solid var(--border);border-radius:20px;padding:1rem;box-shadow:0 10px 24px rgba(0,0,0,.35)}
  .search{position:relative;margin-bottom:.6rem}
  .search input{width:100%;background:#0f1424;border:1px solid var(--border);border-radius:12px;color:var(--text);padding:.55rem .9rem}
  .clear{position:absolute;right:.2rem;top:50%;transform:translateY(-50%);background:transparent;border:0;color:var(--muted);font-size:1.1rem;cursor:pointer;padding:.35rem .6rem;border-radius:8px}
  .grid{display:grid;grid-template-columns:1fr;gap:.75rem;margin-top:.5rem}
  @media (min-width:560px){.grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
  @media (min-width:1000px){.grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
  .card{position:relative;background:#121a2c;border:1px solid var(--border);border-radius:16px;padding:.9rem;transition:transform 150ms ease,box-shadow 150ms ease,border-color 150ms ease}
  .card:hover{transform:translateY(-2px);box-shadow:0 0 0 4px var(--ring),0 12px 28px rgba(0,0,0,.35);border-color:#31406a}
  .card.is-selected{box-shadow:0 0 0 4px var(--ring);border-color:#3a4874}
  .card__head{display:flex;align-items:center;gap:.6rem}
  .flag{font-size:1.25rem}
  .card__title{font-size:1rem;margin:0}
  .price{font-size:1.25rem;font-weight:700;margin:.35rem 0 .7rem}
  .price--na{color:var(--muted)}
  .ghost{width:100%;padding:.55rem .8rem;border-radius:10px;border:1px solid var(--border);background:#0f1424;color:var(--text);cursor:pointer}
  .empty{color:var(--muted);padding:.6rem}
  .fine{color:var(--muted);margin-top:.6rem;font-size:.9rem}
  .side{position:sticky;top:1rem}
  .h2{font-size:1.1rem;margin:0 0 .6rem;color:var(--text)}
  .summary{display:grid;gap:.6rem;grid-template-columns:1fr 1fr 1fr;background:#0e1322;border:1px solid var(--border);border-radius:12px;padding:.75rem}
  @media (max-width:640px){.summary{grid-template-columns:1fr}}
  .k{color:var(--muted);font-size:.85rem}
  .v{font-weight:600}
  .cta{margin-top:.8rem;width:100%;padding:.7rem 1rem;border-radius:12px;border:1px solid #3b2a00;background:linear-gradient(180deg,var(--gold),var(--gold-2));color:#0a0c11;font-weight:800;cursor:pointer}
  .cta[disabled]{opacity:.6;cursor:not-allowed}
  .muted{color:var(--muted);margin-top:.45rem}
  .sticky{position:sticky;bottom:0;inset-inline:0;display:none;align-items:center;justify-content:space-between;gap:.6rem;background:linear-gradient(180deg,rgba(14,16,25,.3),rgba(14,16,25,.95));padding:.5rem .75rem;border-top:1px solid var(--border);backdrop-filter:blur(6px)}
  @media (max-width:820px){.sticky{display:flex}}
  .sticky__price{color:var(--text);font-weight:700}
  .sep{opacity:.5;margin:0 .4rem}
  .cta--sm{width:auto;padding:.55rem 1rem}
  .sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}
  @media (prefers-reduced-motion:reduce){.card,.cta{transition:none!important}}
</style>
