<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { lang, setLang, LANGS } from '$lib/stores/checkout';
  import { slide, fade } from 'svelte/transition';

  let astrologyOpen = false;
  let numerologyOpen = false;
  let divinationOpen = false;
  let langOpen = false; // For desktop language dropdown
  let mobileMenuOpen = false; // For mobile drawer
  let mobileAstrologyOpen = false;
  let mobileNumerologyOpen = false;
  let mobileDivinationOpen = false;
  let mobileLangOpen = false;

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

  function toggleLang() {
    langOpen = !langOpen;
  }

  function closeLang() {
    langOpen = false;
  }

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  function closeMobileMenu() {
    mobileMenuOpen = false;
    mobileAstrologyOpen = false;
    mobileNumerologyOpen = false;
    mobileDivinationOpen = false;
    mobileLangOpen = false;
  }

  function toggleMobileAstrology() {
    mobileAstrologyOpen = !mobileAstrologyOpen;
    mobileNumerologyOpen = false;
    mobileDivinationOpen = false;
  }

  function toggleMobileNumerology() {
    mobileNumerologyOpen = !mobileNumerologyOpen;
    mobileAstrologyOpen = false;
    mobileDivinationOpen = false;
  }

  function toggleMobileDivination() {
    mobileDivinationOpen = !mobileDivinationOpen;
    mobileAstrologyOpen = false;
    mobileNumerologyOpen = false;
  }

  function toggleMobileLang() {
    mobileLangOpen = !mobileLangOpen;
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
    langOpen = false;
    mobileMenuOpen = false;
    const u = new URL($page.url);
    u.searchParams.set('lang', L);
    await goto(u.pathname + u.search + u.hash, { replaceState: true, noScroll: true, keepFocus: true });
  }

  // Lock body scroll when mobile menu opens
  $: if (typeof document !== 'undefined') document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
</script>

<svelte:window on:click={(e) => {
  if (e.target && e.target instanceof HTMLElement && !e.target.closest('.lang-dropdown')) {
    closeLang();
  }
}} />

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

    <!-- Desktop Language Dropdown -->
    <div class="lang-dropdown">
      <button class="lang-btn" on:click|stopPropagation={toggleLang} aria-expanded={langOpen}>
        <span class="globe-icon">🌐</span>
        <span>{$lang === 'RS' ? 'RS/HR' : $lang === 'TR' ? 'TR' : $lang}</span>
        <span class="arrow" class:open={langOpen}>▼</span>
      </button>
      {#if langOpen}
        <div class="lang-panel" transition:slide={{ duration: 150 }}>
          {#each LANGS as L}
            <button
              class="lang-option"
              class:active={L === $lang}
              on:click={() => chooseLang(L)}
            >
              {L === 'RS' ? 'RS/HR' : L === 'TR' ? 'TR' : L}
              {#if L === $lang}
                <span class="check">✓</span>
              {/if}
            </button>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Mobile Hamburger -->
    <button class="burger" on:click={toggleMobileMenu} aria-expanded={mobileMenuOpen} aria-controls="mobile-drawer">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="sr-only">Menu</span>
    </button>
  </div>

  <!-- Mobile Menu Backdrop -->
  {#if mobileMenuOpen}
    <div class="drawer-backdrop" on:click={closeMobileMenu} transition:fade={{ duration: 200 }}></div>
  {/if}

  <!-- Mobile Drawer -->
  {#if mobileMenuOpen}
    <aside class="drawer" id="mobile-drawer" transition:slide={{ duration: 400, axis: 'x' }} aria-hidden={!mobileMenuOpen}>
      <div class="drawer__inner">
        <button class="close" on:click={closeMobileMenu} aria-label="Close">✕</button>

        <!-- Mobile Navigation -->
        <nav class="mnav">
          <a href={withLang('/asteria/guides')} class="mlink" on:click={closeMobileMenu}>Guides</a>
          
          <div class="mobile-dropdown">
            <button class="mlink dropdown-btn" on:click={toggleMobileAstrology}>
              Astrology
              <span class="arrow">{mobileAstrologyOpen ? '▲' : '▼'}</span>
            </button>
            {#if mobileAstrologyOpen}
              <div class="mobile-submenu">
                <a href={withLang('/asteria/astrology/celtic/information')} class="mlink sub" on:click={closeMobileMenu}>Celtic Tree Zodiac</a>
                <a href={withLang('/asteria/astrology/chinese-zodiac/information')} class="mlink sub" on:click={closeMobileMenu}>Chinese Zodiac</a>
                <a href={withLang('/asteria/astrology/egyptian/information')} class="mlink sub" on:click={closeMobileMenu}>Egyptian</a>
                <a href={withLang('/asteria/astrology/japanese/information')} class="mlink sub" on:click={closeMobileMenu}>Japanese</a>
                <a href={withLang('/asteria/astrology/mayan/information')} class="mlink sub" on:click={closeMobileMenu}>Mayan</a>
                <a href={withLang('/asteria/astrology/panchang/information')} class="mlink sub" on:click={closeMobileMenu}>Panchang</a>
                <a href={withLang('/asteria/astrology/vedic/information')} class="mlink sub" on:click={closeMobileMenu}>Vedic</a>
                <a href={withLang('/asteria/astrology/western/information')} class="mlink sub" on:click={closeMobileMenu}>Western</a>
              </div>
            {/if}
          </div>
          
          <div class="mobile-dropdown">
            <button class="mlink dropdown-btn" on:click={toggleMobileNumerology}>
              Numerology
              <span class="arrow">{mobileNumerologyOpen ? '▲' : '▼'}</span>
            </button>
            {#if mobileNumerologyOpen}
              <div class="mobile-submenu">
                <a href={withLang('/asteria/numerology/angle/information')} class="mlink sub" on:click={closeMobileMenu}>Angel Numbers</a>
                <a href={withLang('/asteria/numerology/chaldean/information')} class="mlink sub" on:click={closeMobileMenu}>Chaldean</a>
                <a href={withLang('/asteria/numerology/chinese/information')} class="mlink sub" on:click={closeMobileMenu}>Chinese</a>
                <a href={withLang('/asteria/numerology/kabbalistic/information')} class="mlink sub" on:click={closeMobileMenu}>Kabbalistic</a>
                <a href={withLang('/asteria/numerology/western/information')} class="mlink sub" on:click={closeMobileMenu}>Western</a>
              </div>
            {/if}
          </div>
          
          <div class="mobile-dropdown">
            <button class="mlink dropdown-btn" on:click={toggleMobileDivination}>
              Divination
              <span class="arrow">{mobileDivinationOpen ? '▲' : '▼'}</span>
            </button>
            {#if mobileDivinationOpen}
              <div class="mobile-submenu">
                <a href={withLang('/asteria/divination/conchomancy/information')} class="mlink sub" on:click={closeMobileMenu}>Conchomancy</a>
                <a href={withLang('/asteria/divination/i-ching/information')} class="mlink sub" on:click={closeMobileMenu}>I Ching</a>
                <a href={withLang('/asteria/divination/oracle/information')} class="mlink sub" on:click={closeMobileMenu}>Oracle Cards</a>
                <a href={withLang('/asteria/divination/palmistry/information')} class="mlink sub" on:click={closeMobileMenu}>Palmistry</a>
                <a href={withLang('/asteria/divination/runes/information')} class="mlink sub" on:click={closeMobileMenu}>Runes</a>
                <a href={withLang('/asteria/divination/tarot-cards/information')} class="mlink sub" on:click={closeMobileMenu}>Tarot Cards</a>
              </div>
            {/if}
          </div>
          
          <a href={withLang('/asteria/pricing')} class="mlink" on:click={closeMobileMenu}>Pricing</a>
          <a href={withLang('/asteria/features')} class="mlink" on:click={closeMobileMenu}>Features</a>
          <a href={withLang('/asteria/faq')} class="mlink" on:click={closeMobileMenu}>FAQ</a>
          <a href={withLang('/asteria/contact')} class="mlink" on:click={closeMobileMenu}>Contact</a>
          
          <!-- Mobile Language Dropdown -->
          <div class="mobile-dropdown">
            <button class="mlink dropdown-btn" on:click={toggleMobileLang}>
              <span class="globe-icon">🌐</span>
              Language ({$lang === 'RS' ? 'RS/HR' : $lang === 'TR' ? 'TR' : $lang})
              <span class="arrow">{mobileLangOpen ? '▲' : '▼'}</span>
            </button>
            {#if mobileLangOpen}
              <div class="mobile-submenu">
                {#each LANGS as L}
                  <button
                    class="mlink sub lang-option"
                    class:active={L === $lang}
                    on:click={() => chooseLang(L)}
                  >
                    {L === 'RS' ? 'RS/HR' : L === 'TR' ? 'TR' : L}
                    {#if L === $lang}
                      <span class="check">✓</span>
                    {/if}
                  </button>
                {/each}
              </div>
            {/if}
          </div>
        </nav>
      </div>
    </aside>
  {/if}
</header>

<style>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
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
    grid-template-columns: auto 1fr auto auto;
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

  /* Desktop Language Dropdown */
  .lang-dropdown {
    position: relative;
  }

  .lang-btn {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem 0.8rem;
    background: #0f1424;
    border: 1px solid #262c43;
    border-radius: 10px;
    color: #EDEBFF;
    color: var(--ink, #EDEBFF);
    cursor: pointer;
    font: inherit;
    font-weight: 600;
    transition: all 0.2s ease;
    white-space: nowrap;
  }

  .lang-btn:hover {
    background: #1a2235;
    border-color: #9C6CFF;
    border-color: var(--destiny, #9C6CFF);
  }

  .globe-icon {
    font-size: 1.1rem;
    line-height: 1;
  }

  .arrow {
    font-size: 0.7rem;
    transition: transform 0.2s ease;
  }

  .arrow.open {
    transform: rotate(180deg);
  }

  .lang-panel {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    background: #141127;
    background: var(--panel, #141127);
    border: 1px solid #ffffff1f;
    border-radius: 12px;
    padding: 0.5rem;
    min-width: 120px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    z-index: 1003;
  }

  .lang-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.6rem 0.8rem;
    background: transparent;
    border: none;
    border-radius: 8px;
    color: #EDEBFF;
    color: var(--ink, #EDEBFF);
    cursor: pointer;
    font: inherit;
    font-weight: 600;
    text-align: left;
    transition: all 0.2s ease;
  }

  .lang-option:hover {
    background: rgba(255, 255, 255, 0.06);
    background: var(--glass, rgba(255, 255, 255, 0.06));
  }

  .lang-option.active {
    background: linear-gradient(135deg, #9C6CFF, #30D5C8);
    background: linear-gradient(135deg, var(--destiny, #9C6CFF), var(--clarity, #30D5C8));
    color: #0a0c11;
  }

  .check {
    font-size: 0.9rem;
    font-weight: 700;
  }

  /* Mobile Hamburger */
  .burger {
    border: 1px solid #262c43;
    background: #0f1424;
    color: #EDEBFF;
    color: var(--ink, #EDEBFF);
    border-radius: 10px;
    width: 42px;
    height: 42px;
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .burger:hover {
    background: #1a2235;
    border-color: #9C6CFF;
    border-color: var(--destiny, #9C6CFF);
  }

  .bar {
    display: block;
    width: 20px;
    height: 2px;
    background: #EDEBFF;
    background: var(--ink, #EDEBFF);
    transition: all 0.2s ease;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Mobile Drawer */
  .drawer-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1001;
    backdrop-filter: blur(2px);
  }

  .drawer {
    position: fixed;
    inset: 0 0 0 auto;
    width: min(90%, 380px);
    height: 90vh;
    z-index: 9999;
  }

  .drawer__inner {
    height: 100%;
    background: linear-gradient(180deg, #141127, #0f1424);
    background: linear-gradient(180deg, var(--panel, #141127), var(--bg, #0f1424));
    border-left: 1px solid #ffffff1f;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    padding-top: calc(1rem + env(safe-area-inset-top));
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    position: relative;
    z-index: 1003;
  }

  .close {
    align-self: flex-end;
    border: 1px solid #262c43;
    background: #0f1424;
    color: #EDEBFF;
    color: var(--ink, #EDEBFF);
    padding: 0.5rem 0.75rem;
    border-radius: 10px;
    margin-bottom: 1rem;
    cursor: pointer;
    font-size: 1.2rem;
    line-height: 1;
    transition: all 0.2s ease;
  }

  .close:hover {
    background: #1a2235;
    border-color: #9C6CFF;
    border-color: var(--destiny, #9C6CFF);
  }

  .mlink.sub.lang-option.active {
    background: linear-gradient(135deg, #9C6CFF, #30D5C8);
    background: linear-gradient(135deg, var(--destiny, #9C6CFF), var(--clarity, #30D5C8));
    color: #0a0c11;
    border-color: #3b2a00;
    box-shadow: 0 4px 12px rgba(156, 108, 255, 0.3);
  }

  /* Mobile Navigation */
  .mnav {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    margin-bottom: 1rem;
  }

  .mlink {
    padding: 0.75rem 0.85rem;
    border: 1px solid #262c43;
    border-radius: 12px;
    background: #0f1424;
    color: #EDEBFF;
    color: var(--ink, #EDEBFF);
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .mlink:hover {
    background: #1a2235;
    border-color: #9C6CFF;
    border-color: var(--destiny, #9C6CFF);
  }

  .mobile-dropdown {
    margin: 0.4rem 0;
  }

  .dropdown-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    text-align: left;
  }

  .mobile-submenu {
    margin-top: 0.4rem;
    padding-left: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .mlink.sub {
    font-size: 0.9rem;
    opacity: 0.9;
    margin: 0;
  }

  .mlink.sub.lang-option {
    display: flex;
    justify-content: space-between;
    align-items: center;
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

  @media (max-width: 999px) {
    .nav-menu {
      gap: 16px;
    }
    
    .nav-link {
      font-size: 14px;
    }
  }

  @media (max-width: 850px) {
    .container {
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .nav-menu {
      display: none;
    }

    .lang-dropdown {
      display: none;
    }

    .burger {
      display: flex;
    }

    .dropdown-menu {
      position: static;
      margin-top: 8px;
      box-shadow: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
</style>
