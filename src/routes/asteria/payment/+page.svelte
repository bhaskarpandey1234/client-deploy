<script>
  import { fade } from 'svelte/transition';
  import { page } from '$app/stores';
  import { byCode } from '$lib/data/geo.js';
  import { priceForCountry, paymentLinkFor, formatCurrency } from '$lib/data/pricing.js';
  import { checkout, lang as siteLang } from '$lib/stores/checkout.js';

  $: lang = ($page.url.searchParams.get('lang') || $siteLang || 'EN').toUpperCase();
  $: country = ($page.url.searchParams.get('country') || ($checkout?.country || '')).toUpperCase();
  $: info = byCode(country);

  const localeForLang = (L) => {
    const x = (L || '').toUpperCase();
    if (x.startsWith('RS')) return 'sr-RS';
    if (x === 'HR') return 'hr-HR';
    if (x === 'RU') return 'ru-RU';
    if (x === 'IT') return 'it-IT';
    if (x === 'PL') return 'pl-PL';
    return 'en-GB';
  };

  $: price = priceForCountry(country);
  $: display = price ? formatCurrency(price.amount, price.currency, localeForLang(lang)) : null;
  $: payUrl = paymentLinkFor(country);
</script>

<svelte:head>
  <title>Payment • Asteria</title>
</svelte:head>

<section class="wrap" in:fade>
  <h1 class="h1">Payment</h1>

  {#if info && price}
    <div class="panel">
      <div class="row">
        <div><div class="k">Language</div><div class="v">{lang}</div></div>
        <div><div class="k">Billing Country</div><div class="v">{info.name}</div></div>
        <div><div class="k">Price</div><div class="v">{display}</div></div>
      </div>

      <a class="cta" href={payUrl} rel="noopener noreferrer" target="_blank">Pay securely</a>
      <p class="muted">You'll complete your payment on our secure checkout. We'll email the receipt immediately.</p>
    </div>
  {:else}
    <p class="err">Country or price unavailable. Please return to <a href="/asteria/pricing">Pricing</a>.</p>
  {/if}
</section>

<style>
  .wrap { max-width: 820px; margin: 2rem auto 4rem; padding: 0 1rem; color: var(--text); }
  .h1 { font-size: clamp(1.9rem, 3.4vw, 2.4rem); margin-bottom: 1rem; text-align: left; }
  .panel { background: linear-gradient(180deg, var(--surface), var(--surface-2));
    border: 1px solid var(--border); border-radius: 20px; padding: 1rem; }
  .row { display: grid; gap: .75rem; grid-template-columns: 1fr; margin-bottom: .8rem; }
  @media (min-width: 640px) { .row { grid-template-columns: repeat(3, 1fr); } }
  .k { color: var(--muted); font-size: .85rem; }
  .v { font-weight: 700; }
  .cta {
    display: inline-block; text-align: center;
    padding: .7rem 1rem; border-radius: 12px;
    border: 1px solid #3b2a00; background: linear-gradient(180deg, var(--gold), var(--gold-2));
    color: #0a0c11; font-weight: 800; text-decoration: none;
  }
  .muted { color: var(--muted); margin-top: .6rem; }
  .err a { color: var(--gold); }
</style>
