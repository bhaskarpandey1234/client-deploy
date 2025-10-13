<script lang="ts">
  import { page } from '$app/stores';
  
  let mobileMenuOpen = false;
  let divinationOpen = false;

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  function toggleDivination() {
    divinationOpen = !divinationOpen;
  }

  function closeMobileMenu() {
    mobileMenuOpen = false;
    divinationOpen = false;
  }
</script>

<nav class="navigation">
  <div class="nav-container">
    <a href="/asteria" class="logo">Asteria</a>
    
    <button class="mobile-toggle" on:click={toggleMobileMenu} aria-label="Toggle menu">
      {mobileMenuOpen ? '✕' : '☰'}
    </button>

    <div class="nav-menu" class:open={mobileMenuOpen}>
      <a href="/asteria/astrology" class="nav-link" on:click={closeMobileMenu}>
        Astrology
      </a>
      
      <a href="/asteria/numerology" class="nav-link" on:click={closeMobileMenu}>
        Numerology
      </a>
      
      <div class="nav-dropdown">
        <button class="nav-link dropdown-toggle" on:click={toggleDivination}>
          Divination
          <span class="arrow">{divinationOpen ? '▲' : '▼'}</span>
        </button>
        {#if divinationOpen}
          <div class="dropdown-menu">
            <a href="/asteria/demo" class="dropdown-item" on:click={closeMobileMenu}>
              Shell Casting
            </a>
          </div>
        {/if}
      </div>

      <a href="/asteria#pricing" class="btn-nav" on:click={closeMobileMenu}>
        Get Started
      </a>
    </div>
  </div>
</nav>

<style>
  .navigation {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: var(--bg);
    border-bottom: 1px solid #ffffff1f;
    backdrop-filter: blur(20px);
  }

  .nav-container {
    max-width: 1120px;
    margin: 0 auto;
    padding: 16px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    font-size: 24px;
    font-weight: 700;
    color: var(--ink);
    text-decoration: none;
    background: linear-gradient(90deg, var(--destiny), var(--clarity));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .mobile-toggle {
    display: none;
    background: none;
    border: none;
    color: var(--ink);
    font-size: 24px;
    cursor: pointer;
    padding: 8px;
  }

  .nav-menu {
    display: flex;
    align-items: center;
    gap: 32px;
  }

  .nav-link {
    color: var(--ink);
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
    color: var(--clarity);
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
    background: var(--panel);
    border: 1px solid #ffffff1f;
    border-radius: 12px;
    padding: 8px;
    min-width: 180px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }

  .dropdown-item {
    display: block;
    padding: 12px 16px;
    color: var(--ink);
    text-decoration: none;
    font-size: 14px;
    border-radius: 8px;
    transition: background 0.2s;
  }

  .dropdown-item:hover {
    background: var(--glass);
  }

  .btn-nav {
    padding: 10px 20px;
    background: var(--destiny);
    color: #fff;
    border-radius: 12px;
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    transition: transform 0.2s;
  }

  .btn-nav:hover {
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    .mobile-toggle {
      display: block;
    }

    .nav-menu {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: var(--panel);
      border-bottom: 1px solid #ffffff1f;
      flex-direction: column;
      align-items: stretch;
      gap: 0;
      padding: 16px;
      display: none;
    }

    .nav-menu.open {
      display: flex;
    }

    .nav-link {
      padding: 12px 16px;
      width: 100%;
      justify-content: space-between;
    }

    .dropdown-menu {
      position: static;
      margin-top: 8px;
      margin-left: 16px;
      box-shadow: none;
    }

    .btn-nav {
      margin-top: 8px;
      text-align: center;
    }
  }
</style>

