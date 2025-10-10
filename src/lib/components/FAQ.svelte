<script lang="ts">
  // FAQ Section with schema-ready Q&A
  let openIndex = -1;

  const faqs = [
    {
      question: "How is this different from a chatbot?",
      answer: "Instead of back-and-forth conversation, you complete a focused 60-second ritual. The result is a structured reading with testable insights, not generic chat responses."
    },
    {
      question: "What if the reading doesn't resonate?",
      answer: "Email us within 24 hours for a full refund or a free second reading. No questions asked. About 94% of readings are kept."
    },
    {
      question: "Do I need to provide birth details?",
      answer: "Optional. Birth time/location adds astrological timing precision, but many readings work well with just your question and intention."
    },
    {
      question: "How long does it take?",
      answer: "The ritual itself is 60 seconds. Your reading appears instantly. Optional: return in 7 days for a check-in reading."
    },
    {
      question: "How we handle your data",
      answer: "We store only what's necessary for your reading (birth details if provided, question content). No data is sold. Readings are encrypted. You can request deletion anytime via email."
    },
    {
      question: "AI & Human collaboration",
      answer: "Readings use AI trained on traditional divination systems combined with astrological timing. No human sees your personal data. The system is audited quarterly for bias and fairness."
    },
    {
      question: "Refund policy",
      answer: "If your reading doesn't resonate, email us within 24 hours for a full refund, no questions asked. We also offer a free second reading if the first feels off."
    },
    {
      question: "Our philosophical stance",
      answer: "We view this as a clarity tool, not deterministic prediction. Readings offer perspective, not absolute truth. You maintain full agency. We encourage critical thinking and real-world testing."
    },
    {
      question: "Can I use this on mobile?",
      answer: "Yes! Asteria works as a progressive web app. Install it to your home screen for an app-like experience on any device."
    }
  ];

  function toggle(index: number) {
    openIndex = openIndex === index ? -1 : index;
  }
</script>

<section class="section">
  <h2 class="section-title">Frequently Asked Questions</h2>
  <div class="faq-grid">
    {#each faqs as faq, i}
      <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <button 
          class="faq-question" 
          class:open={openIndex === i}
          on:click={() => toggle(i)}
          aria-expanded={openIndex === i}
          itemprop="name"
        >
          <span>{faq.question}</span>
          <span class="chevron">{openIndex === i ? '−' : '+'}</span>
        </button>
        {#if openIndex === i}
          <div class="faq-answer" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <p itemprop="text">{faq.answer}</p>
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
  .faq-grid {
    max-width: 900px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  .faq-item {
    background: var(--glass);
    backdrop-filter: blur(20px);
    border: 1px solid #ffffff1f;
    border-radius: 12px;
    overflow: hidden;
  }
  .faq-question {
    width: 100%;
    padding: 20px;
    background: transparent;
    border: none;
    color: var(--ink);
    font-size: 16px;
    font-weight: 600;
    text-align: left;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    transition: background 0.2s;
  }
  .faq-question:hover {
    background: rgba(255,255,255,0.05);
  }
  .chevron {
    font-size: 20px;
    flex-shrink: 0;
    transition: transform 0.22s cubic-bezier(0.17, 0.84, 0.44, 1);
  }
  .faq-question.open .chevron {
    transform: rotate(90deg);
  }
  .faq-answer {
    padding: 0 20px 20px;
    animation: slideDown 0.22s cubic-bezier(0.17, 0.84, 0.44, 1);
  }
  .faq-answer p {
    margin: 0;
    color: var(--muted);
    line-height: 1.6;
    font-size: 15px;
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
  @media (max-width: 768px) {
    .faq-grid {
      grid-template-columns: 1fr;
    }
  }
</style>

