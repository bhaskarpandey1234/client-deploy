<script lang="ts">
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    product: [
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Journeys', href: '/journeys' },
      { label: 'Install App', href: '/install' }
    ],
    company: [
      { label: 'About', href: '/about' },
      { label: 'Ethics', href: '/ethics' },
      { label: 'Press', href: '/press' },
      { label: 'Contact', href: '/contact' }
    ],
    legal: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Refunds', href: '/refunds' },
      { label: 'Data Request', href: '/data-request' }
    ],
    support: [
      { label: 'FAQ', href: '#faq' },
      { label: 'Email Support', href: 'mailto:support@asteriaguide.com' },
      { label: 'Community', href: '/community' },
      { label: 'Status', href: '/status' }
    ]
  };
</script>

<footer class="footer">
  <div class="footer-content">
    <div class="footer-grid">
      <div class="footer-col">
        <h3 class="footer-heading">Product</h3>
        <ul class="footer-links">
          {#each footerLinks.product as link}
            <li><a href={link.href}>{link.label}</a></li>
          {/each}
        </ul>
      </div>
      <div class="footer-col">
        <h3 class="footer-heading">Company</h3>
        <ul class="footer-links">
          {#each footerLinks.company as link}
            <li><a href={link.href}>{link.label}</a></li>
          {/each}
        </ul>
      </div>
      <div class="footer-col">
        <h3 class="footer-heading">Legal</h3>
        <ul class="footer-links">
          {#each footerLinks.legal as link}
            <li><a href={link.href}>{link.label}</a></li>
          {/each}
        </ul>
      </div>
      <div class="footer-col">
        <h3 class="footer-heading">Support</h3>
        <ul class="footer-links">
          {#each footerLinks.support as link}
            <li><a href={link.href}>{link.label}</a></li>
          {/each}
        </ul>
      </div>
    </div>
    
    <div class="footer-bottom">
      <div class="footer-legal">
        <p>&copy; {currentYear} Asteria Guide. All rights reserved.</p>
      </div>
      <div class="footer-social">
        <a href="https://twitter.com" aria-label="Twitter">𝕏</a>
        <a href="https://instagram.com" aria-label="Instagram">📷</a>
        <a href="https://tiktok.com" aria-label="TikTok">🎵</a>
      </div>
      
    </div>
  </div>
</footer>

<style>
  .footer {
    background: var(--panel);
    border-top: 1px solid #ffffff1f;
    padding: 80px 24px 40px;
  }
  .footer-content {
    max-width: 1120px;
    margin: 0 auto;
  }
  .footer-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 48px;
    margin-bottom: 64px;
  }
  .footer-heading {
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0 0 16px;
    color: var(--ink);
  }
  .footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .footer-links a {
    color: var(--muted);
    text-decoration: none;
    font-size: 14px;
    transition: color 0.2s;
  }
  .footer-links a:hover {
    color: var(--ink);
  }
  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 32px;
    border-top: 1px solid #ffffff1f;
    gap: 24px;
  }
  .footer-legal p {
    margin: 0;
    font-size: 13px;
    color: var(--muted);
  }
  .footer-social {
    display: flex;
    gap: 20px;
  }
  .footer-social a {
    font-size: 20px;
    text-decoration: none;
    transition: transform 0.2s;
  }
  .footer-social a:hover {
    transform: translateY(-2px);
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
  @media (max-width: 768px) {
    .footer-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 32px;
    }
    .footer-bottom {
      flex-direction: column;
      text-align: center;
    }
  }
</style>

