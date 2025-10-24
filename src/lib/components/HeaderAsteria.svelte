<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { lang, setLang, LANGS } from '$lib/stores/checkout.js';

  let astrologyOpen = false;
  let numerologyOpen = false;
  let divinationOpen = false;

  function toggleAstrology() {
    astrologyOpen = !astrologyOpen;
    numerologyOpen = false;
    divinationOpen = false;
  }

  function toggleNumerology() {
    numerologyOpen = !numerologyOpen;
    astrologyOpen = false;
    divinationOpen = false;
  }

  function toggleDivination() {
    divinationOpen = !divinationOpen;
    astrologyOpen = false;
    numerologyOpen = false;
  }

  function closeAllDropdowns() {
    astrologyOpen = false;
    numerologyOpen = false;
    divinationOpen = false;
  }

  function withLang(href: string) {
    try {
      const base = typeof window !== 'undefined' ? window.location.origin : 'https://example.com';
      const u = new URL(href, base);
      u.searchParams.set('lang', $lang || 'EN');
      return u.pathname + u.search + u.hash;
    } catch { return href; }
  }

  async function chooseLang(L: string) {
    setLang(L);
    const u = new URL($page.url);
    u.searchParams.set('lang', L);
    await goto(u.pathname + u.search + u.hash, { replaceState: true, noScroll: true, keepFocus: true });
  }
</script>

<header class="header">
  <div class="container">
    <a href="/asteria" class="logo">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" stroke="currentColor" stroke-width="2"/>
        <path d="M16 8l4 8-4 8-4-8z" fill="currentColor"/>
        <circle cx="16" cy="16" r="3" fill="currentColor"/>
      </svg>
      <span class="logo-text">Asteria</span>
    </a>

    <nav class="nav-menu">
      <a href={withLang('/asteria/guides')} class="nav-link">Guides</a>
      
      <div class="nav-dropdown">
        <button class="nav-link dropdown-toggle" on:click={toggleAstrology}>
          Astrology
          <span class="arrow">{astrologyOpen ? '▲' : '▼'}</span>
        </button>
        {#if astrologyOpen}
          <div class="dropdown-menu">
            <a href={withLang('/asteria/astrology/celtic/information')} class="dropdown-item" on:click={closeAllDropdowns}>Celtic Tree Zodiac</a>
            <a href={withLang('/asteria/astrology/chinese-zodiac/information')} class="dropdown-item" on:click={closeAllDropdowns}>Chinese Zodiac</a>
            <a href={withLang('/asteria/astrology/egyptian/information')} class="dropdown-item" on:click={closeAllDropdowns}>Egyptian</a>
            <a href={withLang('/asteria/astrology/japanese/information')} class="dropdown-item" on:click={closeAllDropdowns}>Japanese</a>
            <a href={withLang('/asteria/astrology/mayan/information')} class="dropdown-item" on:click={closeAllDropdowns}>Mayan</a>
            <a href={withLang('/asteria/astrology/panchang/information')} class="dropdown-item" on:click={closeAllDropdowns}>Panchang</a>
            <a href={withLang('/asteria/astrology/vedic/information')} class="dropdown-item" on:click={closeAllDropdowns}>Vedic</a>
            <a href={withLang('/asteria/astrology/western/information')} class="dropdown-item" on:click={closeAllDropdowns}>Western</a>
          </div>
        {/if}
      </div>
      
      <div class="nav-dropdown">
        <button class="nav-link dropdown-toggle" on:click={toggleNumerology}>
          Numerology
          <span class="arrow">{numerologyOpen ? '▲' : '▼'}</span>
        </button>
        {#if numerologyOpen}
          <div class="dropdown-menu">
            <a href={withLang('/asteria/numerology/angle/information')} class="dropdown-item" on:click={closeAllDropdowns}>Angel Numbers</a>
            <a href={withLang('/asteria/numerology/chaldean/information')} class="dropdown-item" on:click={closeAllDropdowns}>Chaldean</a>
            <a href={withLang('/asteria/numerology/chinese/information')} class="dropdown-item" on:click={closeAllDropdowns}>Chinese</a>
            <a href={withLang('/asteria/numerology/kabbalistic/information')} class="dropdown-item" on:click={closeAllDropdowns}>Kabbalistic</a>
            <a href={withLang('/asteria/numerology/western/information')} class="dropdown-item" on:click={closeAllDropdowns}>Western</a>
          </div>
        {/if}
      </div>
      
      <div class="nav-dropdown">
        <button class="nav-link dropdown-toggle" on:click={toggleDivination}>
          Divination
          <span class="arrow">{divinationOpen ? '▲' : '▼'}</span>
        </button>
        {#if divinationOpen}
          <div class="dropdown-menu">
            <a href={withLang('/asteria/divination/conchomancy/information')} class="dropdown-item" on:click={closeAllDropdowns}>Conchomancy</a>
            <a href={withLang('/asteria/divination/i-ching/information')} class="dropdown-item" on:click={closeAllDropdowns}>I Ching</a>
            <a href={withLang('/asteria/divination/oracle/information')} class="dropdown-item" on:click={closeAllDropdowns}>Oracle Cards</a>
            <a href={withLang('/asteria/divination/palmistry/information')} class="dropdown-item" on:click={closeAllDropdowns}>Palmistry</a>
            <a href={withLang('/asteria/divination/runes/information')} class="dropdown-item" on:click={closeAllDropdowns}>Runes</a>
            <a href={withLang('/asteria/divination/tarot-cards/information')} class="dropdown-item" on:click={closeAllDropdowns}>Tarot Cards</a>
          </div>
        {/if}
      </div>

      <a href={withLang('/asteria/pricing')} class="nav-link">Pricing</a>
      <a href={withLang('/asteria/features')} class="nav-link">Features</a>
      <a href={withLang('/asteria/faq')} class="nav-link">FAQ</a>
      <a href={withLang('/asteria/contact')} class="nav-link">Contact</a>
    </nav>

    <div class="chips">
      {#each LANGS as L}
        <button class="chip" aria-pressed={L === $lang} on:click={() => chooseLang(L)}>
          {L === 'RU' ? 'РУ' : L === 'RS' ? 'RS/HR' : L === 'TR' ? 'TR' : L}
        </button>
      {/each}
      <span class="pill" style="--i:{Math.max(0, LANGS.indexOf($lang || 'EN'))}"></span>
    </div>
  </div>
</header>

<style>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: rgba(12, 10, 26, 0.95);
    background: var(--bg, rgba(12, 10, 26, 0.95));
    backdrop-filter: blur(20px);
    border-bottom: 1px solid #ffffff1f;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 16px 24px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 24px;
    position: relative;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: #EDEBFF;
    color: var(--ink, #EDEBFF);
    text-decoration: none;
  }

  .logo svg {
    color: #9C6CFF;
    color: var(--destiny, #9C6CFF);
  }

  .logo-text {
    font-size: 1.25rem;
    font-weight: 700;
    background: linear-gradient(90deg, #9C6CFF, #30D5C8);
    background: linear-gradient(90deg, var(--destiny, #9C6CFF), var(--clarity, #30D5C8));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }



  .nav-menu {
    display: flex;
    align-items: center;
    gap: 32px;
    justify-self: center;
  }

  .nav-link {
    color: #EDEBFF;
    color: var(--ink, #EDEBFF);
    text-decoration: none;
    font-size: 15px;
    font-weight: 500;
    transition: color 0.2s;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .nav-link:hover {
    color: #30D5C8;
    color: var(--clarity, #30D5C8);
  }

  .nav-dropdown {
    position: relative;
  }

  .dropdown-toggle {
    padding: 8px 0;
  }

  .arrow {
    font-size: 10px;
    margin-left: 4px;
    transition: transform 0.2s;
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 8px;
    background: rgba(20, 17, 39, 0.98);
    background: var(--panel, rgba(20, 17, 39, 0.98));
    border: 1px solid #ffffff1f;
    border-radius: 12px;
    padding: 8px;
    min-width: 180px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }

  .dropdown-item {
    display: block;
    padding: 12px 16px;
    color: #EDEBFF;
    color: var(--ink, #EDEBFF);
    text-decoration: none;
    font-size: 14px;
    border-radius: 8px;
    transition: background 0.2s;
  }

  .dropdown-item:hover {
    background: rgba(255, 255, 255, 0.06);
    background: var(--glass, rgba(255, 255, 255, 0.06));
  }

  .chips {
    justify-self: end;
    display: inline-grid;
    grid-auto-flow: column;
    gap: .35rem;
    padding: .3rem;
    background: #0f1424;
    border: 1px solid var(--border, #262c43);
    border-radius: 999px;
    position: relative;
  }

  .chip {
    position: relative;
    z-index: 1;
    padding: .35rem .7rem;
    border-radius: 999px;
    background: transparent;
    color: var(--ink, #EDEBFF);
    border: 0;
    cursor: pointer;
    font: inherit;
    font-size: 13px;
    white-space: nowrap;
  }

  .chip[aria-pressed="true"] {
    color: #0a0c11;
    font-weight: 800;
  }

  .pill {
    position: absolute;
    z-index: 0;
    top: 4px;
    bottom: 4px;
    left: 4px;
    width: calc(16.666% - 8px);
    border-radius: 999px;
    background: linear-gradient(90deg, var(--gold, #f5c64f), #ffe59a);
    transform: translateX(calc(var(--i) * (100% + .35rem)));
    transition: transform 180ms ease;
  }

  @media (max-width: 768px) {
    .container {
      padding: 16px;
    }

    .nav-menu {
      gap: 16px;
    }

    .dropdown-menu {
      position: static;
      margin-top: 8px;
      box-shadow: none;
    }

    .chips {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .pill {
      transition: none;
    }
  }
</style>
