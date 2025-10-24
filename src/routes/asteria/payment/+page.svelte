<script lang="ts">
  import { fade } from 'svelte/transition';
  import { page } from '$app/stores';
  import { byCode } from '$lib/data/geo.js';
  import {
    oneTimePrice, subscriptionPrice,
    paymentLinkForOneTime, paymentLinkForSubscription,
    formatCurrency
  } from '$lib/data/pricing';
  import { checkout } from '$lib/stores/checkout.js';
  import { lang as siteLang } from '$lib/stores/checkout.js';
  import { localeForLang } from '$lib/i18n/pricing.js';

  $: lang = ($page.url.searchParams.get('lang') || $siteLang || 'EN').toUpperCase();
  $: tier = ($page.url.searchParams.get('tier') || 'one-time').toLowerCase(); // 'one-time' | 'subscription'
  $: chat = ($page.url.searchParams.get('chat') || '1') === '1';               // for one-time
  $: cycle = ($page.url.searchParams.get('cycle') || 'monthly').toUpperCase(); // for subscription

  $: country = ($page.url.searchParams.get('country') || ($checkout?.country || '')).toUpperCase();
  $: info = byCode(country);

  const fmt = (amt: number, cur: string) => formatCurrency(amt, cur, localeForLang(lang));

  $: price =
    tier === 'subscription'
      ? subscriptionPrice(country, cycle as 'MONTHLY'|'ANNUAL')
      : oneTimePrice(country, { includeChat: chat });

  $: display = price ? fmt(price.amount, price.currency) : null;

  $: payUrl =
    tier === 'subscription'
      ? paymentLinkForSubscription(country, cycle as 'MONTHLY'|'ANNUAL')
      : paymentLinkForOneTime(country, { includeChat: chat });
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
        <div><div class="k">Plan</div>
          <div class="v">
            {#if tier === 'subscription'}
              Subscription — {cycle === 'ANNUAL' ? 'Annual' : 'Monthly'}
            {:else}
              One‑time — {chat ? 'Reading + 10‑min chat' : 'Reading only'}
            {/if}
          </div>
        </div>
        <div><div class="k">Price</div><div class="v">{display}</div></div>
      </div>

      <a class="cta" href={payUrl} rel="noopener noreferrer" target="_blank">Pay securely</a>
      <p class="muted">You'll complete your payment on our secure checkout. We'll email the receipt immediately.</p>
    </div>
  {:else}
    <p class="err">Missing details. Please return to <a href="/asteria/pricing">Pricing</a>.</p>
  {/if}
</section>

<style>
  .wrap { max-width: 820px; margin: 2rem auto 4rem; padding: 0 1rem; color: var(--text); }
  .h1 { font-size: clamp(1.9rem, 3.4vw, 2.4rem); margin-bottom: 1rem; text-align: left; }
  .panel { background: linear-gradient(180deg, var(--surface), var(--surface-2));
    border: 1px solid var(--border); border-radius: 20px; padding: 1rem; }
  .row { display: grid; gap: .75rem; grid-template-columns: 1fr; margin-bottom: .8rem; }
  @media (min-width: 640px) { .row { grid-template-columns: repeat(4, 1fr); } }
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
