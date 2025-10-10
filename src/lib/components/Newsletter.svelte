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
  }
  .newsletter-title {
    font-size: 32px;
    line-height: 40px;
    margin: 0 0 12px;
  }
  .newsletter-description {
    font-size: 16px;
    color: var(--muted);
    margin: 0 0 24px;
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
  }
  .consent-label {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 13px;
    color: var(--muted);
    cursor: pointer;
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

