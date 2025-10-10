<header class="header">
  <div class="container">
    <div class="footer-lang">
    <select class="lang-selector">
      <option value="en">English</option>
      <option value="es">Español</option>
      <option value="fr">Français</option>
    </select>
  </div>
    <div class="logo">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" stroke="currentColor" stroke-width="2"/>
        <path d="M16 8l4 8-4 8-4-8z" fill="currentColor"/>
        <circle cx="16" cy="16" r="3" fill="currentColor"/>
      </svg>
      <span class="logo-text">Asteria</span>
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
    background: rgba(var(--bg-rgb), 0.95);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(var(--border-rgb), 0.1);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 2rem;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--text);
  }

  .logo svg {
    color: var(--accent);
  }

  .logo-text {
    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: -0.025em;
  }

  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }
  }
  .footer-lang {
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 10;
  }

  .lang-selector {
    padding: 8px;
    font-size: 0.9rem;
  }
  .lang-selector {
    padding: 8px 12px;
    background: var(--bg);
    border: 1px solid #ffffff22;
    border-radius: 8px;
    color: var(--ink);
    font-size: 13px;
    cursor: pointer;
  }
</style>
