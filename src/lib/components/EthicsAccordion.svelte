<script lang="ts">
  // Ethics & Transparency Accordion
  let openIndex = 0;

  const items = [
    {
      title: "How we handle your data",
      content: "We store only what's necessary for your reading (birth details if provided, question content). No data is sold. Readings are encrypted. You can request deletion anytime via email."
    },
    {
      title: "AI & Human collaboration",
      content: "Readings use AI trained on traditional divination systems combined with astrological timing. No human sees your personal data. The system is audited quarterly for bias and fairness."
    },
    {
      title: "Refund policy",
      content: "If your reading doesn't resonate, email us within 24 hours for a full refund, no questions asked. We also offer a free second reading if the first feels off."
    },
    {
      title: "Our philosophical stance",
      content: "We view this as a clarity tool, not deterministic prediction. Readings offer perspective, not absolute truth. You maintain full agency. We encourage critical thinking and real-world testing."
    }
  ];

  function toggle(index: number) {
    openIndex = openIndex === index ? -1 : index;
  }
</script>

<section class="section">
  <h2 class="section-title">Ethics & Transparency</h2>
  <div class="accordion">
    {#each items as item, i}
      <div class="accordion-item">
        <button 
          class="accordion-header" 
          class:open={openIndex === i}
          on:click={() => toggle(i)}
          aria-expanded={openIndex === i}
        >
          <span>{item.title}</span>
          <span class="chevron">{openIndex === i ? '−' : '+'}</span>
        </button>
        {#if openIndex === i}
          <div class="accordion-content">
            <p>{item.content}</p>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</section>

<style>
  .section-title {
    font-size: 40px;
    line-height: 48px;
    text-align: center;
    margin-bottom: 48px;
  }
  .accordion {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .accordion-item {
    background: var(--glass);
    backdrop-filter: blur(20px);
    border: 1px solid #ffffff1f;
    border-radius: 12px;
    overflow: hidden;
  }
  .accordion-header {
    width: 100%;
    padding: 20px 24px;
    background: transparent;
    border: none;
    color: var(--ink);
    font-size: 18px;
    font-weight: 600;
    text-align: left;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background 0.2s;
  }
  .accordion-header:hover {
    background: rgba(255,255,255,0.05);
  }
  .chevron {
    font-size: 24px;
    transition: transform 0.22s cubic-bezier(0.17, 0.84, 0.44, 1);
  }
  .accordion-header.open .chevron {
    transform: rotate(90deg);
  }
  .accordion-content {
    padding: 0 24px 24px;
    animation: slideDown 0.22s cubic-bezier(0.17, 0.84, 0.44, 1);
  }
  .accordion-content p {
    margin: 0;
    color: var(--muted);
    line-height: 1.6;
  }
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>

