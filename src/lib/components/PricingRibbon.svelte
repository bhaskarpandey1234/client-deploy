<script lang="ts">
  // Pricing Ribbon - horizontal pricing cards
  const pricingOptions = [
    {
      title: "Full Reading",
      price: "$10",
      features: [
        "10+ specific insights",
        "Personal sigil",
        "7-day check-in",
        "24h refund guarantee"
      ],
      cta: "Get Reading"
    },
    {
      title: "With Timing",
      price: "$13",
      features: [
        "Everything in Full",
        "Lucky dates & times",
        "Avoid windows",
        "Moon phase guidance"
      ],
      cta: "Add Timing"
    },
    {
      title: "Deep Dive",
      price: "$29",
      features: [
        "Everything + Timing",
        "Extended analysis",
        "Voice notes option",
        "Priority support"
      ],
      cta: "Go Deep"
    }
  ];
</script>

<section class="section pricing-section">
  <h2 class="section-title">Simple, Transparent Pricing</h2>
  <div class="pricing-ribbon">
    {#each pricingOptions as option}
      <div class="pricing-card">
        <h3 class="pricing-title">{option.title}</h3>
        <div class="pricing-price">{option.price}</div>
        <ul class="pricing-features">
          {#each option.features as feature}
            <li>{feature}</li>
          {/each}
        </ul>
        <button class="btn primary">{option.cta}</button>
      </div>
    {/each}
  </div>
  <div class="trust-line">
    <span>🔒 Secure checkout</span>
    <span>↩️ 24h refund</span>
    <span>💳 All payment methods</span>
  </div>
</section>

<style>
  .pricing-section { padding: 96px 24px; }
  .section-title {
    font-size: 40px;
    line-height: 48px;
    text-align: center;
    margin-bottom: 48px;
  }
  .pricing-ribbon {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    max-width: 1120px;
    margin: 0 auto 24px;
  }
  .pricing-card {
    background: var(--glass);
    backdrop-filter: blur(20px);
    border: 1px solid #ffffff1f;
    border-radius: var(--radius);
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .pricing-title {
    font-size: 24px;
    line-height: 32px;
    margin: 0;
  }
  .pricing-price {
    font-size: 40px;
    font-weight: 700;
    color: var(--destiny);
  }
  .pricing-features {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
  }
  .pricing-features li {
    padding-left: 20px;
    position: relative;
    font-size: 14px;
  }
  .pricing-features li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: var(--good);
  }
  .btn.primary {
    background: var(--destiny);
    color: #fff;
    font-weight: 600;
  }
  .trust-line {
    display: flex;
    justify-content: center;
    gap: 32px;
    font-size: 14px;
    opacity: 0.8;
    margin-top: 24px;
  }
  @media (max-width: 768px) {
    .pricing-ribbon {
      grid-template-columns: 1fr;
    }
  }
</style>

