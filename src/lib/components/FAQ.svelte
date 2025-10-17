<script lang="ts">
  export let title = "Frequently Asked Questions";
  export let faqs: Array<{question: string; answer: string}> = [];
  
  let openIndex = -1;

  function toggle(index: number) {
    openIndex = openIndex === index ? -1 : index;
  }
</script>

<section class="section">
  <h2 class="section-title">{title}</h2>
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
    color: white;
  }
  .faq-grid {
    max-width: 900px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  .faq-item {
    /* background: var(--glass); */
    background: #FAEECE;
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
    /* color: var(--ink); */
    color: black;
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

