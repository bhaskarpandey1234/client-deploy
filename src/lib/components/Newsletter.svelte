<script lang="ts">
  let email = '';
  let consent = false;
  let submitted = false;

  function handleSubmit(e: Event) {
    e.preventDefault();
    if (!consent) {
      alert('Please consent to receive emails');
      return;
    }
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    submitted = true;
    setTimeout(() => {
      submitted = false;
      email = '';
      consent = false;
    }, 3000);
  }
</script>

<section class="section newsletter-section">
  <div class="newsletter-card card">
    <h2 class="newsletter-title">Stay in the Loop</h2>
    <p class="newsletter-description">
      Monthly insights, timing tips, and community stories. No spam, unsubscribe anytime.
    </p>
    
    {#if submitted}
      <div class="success-message">
        ✓ Thanks! Check your email to confirm.
      </div>
    {:else}
      <form class="newsletter-form" on:submit={handleSubmit}>
        <input 
          type="email" 
          placeholder="your@email.com" 
          bind:value={email}
          required
          class="newsletter-input"
        />
        <button type="submit" class="btn primary">Subscribe</button>
      </form>
      <label class="consent-label">
        <input type="checkbox" bind:checked={consent} required />
        <span>I consent to receive occasional emails from Asteria</span>
      </label>
    {/if}
  </div>
</section>

<style>
  .newsletter-section {
    padding: 64px 24px;
  }
  .newsletter-card {
    max-width: 700px;
    margin: 0 auto;
    padding: 48px;
    text-align: center;
    border-radius: 20px;
border: var(--stroke-weight-1, 1px) solid rgba(255, 255, 255, 0.12);
background: #FAEECE;
backdrop-filter: blur(10px);
  }
  .newsletter-title {
    font-size: 32px;
    line-height: 40px;
    margin: 0 0 12px;
    color: #2A2A2A;
text-align: center;
font-family: Inter;
font-size: 31.6px;
font-style: normal;
font-weight: 700;
line-height: var(--font-size-40, 40px); /* 126.582% */
  }
  .newsletter-description {
    font-size: 16px;
    color: var(--muted);
    margin: 0 0 24px;
    color: #2A2A2A;
text-align: center;

/* asteria-guide.netlify.app/Inter/Regular */
font-family: var(--font-family-Font-1, Inter);
font-size: 14.9px;
font-style: normal;
font-weight: var(--font-weight-400, 400);
line-height: var(--line-height-24, 24px); /* 161.074% */
  }
  .newsletter-form {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
  }
  .newsletter-input {
    flex: 1;
    padding: 12px 16px;
    background: var(--panel);
    border: 1px solid #ffffff22;
    border-radius: 12px;
    color: var(--ink);
    font-size: 16px;
  }
  .newsletter-input:focus {
    outline: none;
    border-color: var(--clarity);
  }
  .btn.primary {
    background: var(--destiny);
    color: #fff;
    font-weight: 600;
    padding: 12px 24px;
    border-radius: 12px;
border: var(--stroke-weight-1, 1px) solid rgba(255, 255, 255, 0.13);
background: #EDB92E;
color: #0B0D14;
text-align: center;

/* asteria-guide.netlify.app/Semantic/Button */
font-family: Inter;
font-size: 13.3px;
font-style: normal;
font-weight: var(--font-weight-700, 700);
line-height: normal;
  }
  .consent-label {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 13px;
    color: var(--muted);
    cursor: pointer;

    color: #2A2A2A;
text-align: center;

/* asteria-guide.netlify.app/Semantic/Label */
font-family: var(--font-family-Font-1, Inter);
font-size: 12.2px;
font-style: normal;
font-weight: var(--font-weight-400, 400);
line-height: var(--line-height-19_5, 19.5px); /* 159.836% */
  }
  .consent-label input {
    cursor: pointer;
  }
  .success-message {
    padding: 20px;
    background: var(--good);
    color: var(--bg);
    border-radius: 12px;
    font-weight: 600;
  }
  @media (max-width: 768px) {
    .newsletter-card {
      padding: 32px 24px;
    }
    .newsletter-form {
      flex-direction: column;
    }
  }
</style>

