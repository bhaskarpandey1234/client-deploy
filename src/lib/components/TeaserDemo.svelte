<script lang="ts">
  // Live Teaser Demo (Free) - shows sample reading lines with paywall
  const sampleLines = [
    { label: "Timing", text: "Watch for a late-night message Thu–Sun — it clears the vibe." },
    { label: "Signal", text: "A 'J' or 'G' initial repeats. That's your green light." },
    { label: "Action", text: "Reply short. Let them suggest the plan." }
  ];
</script>

<section class="section">
  <div class="card teaser-demo">
    <div class="content-area">
      <h3 class="h3" style="margin-bottom:20px">Your Free Preview</h3>
      <div class="lines">
        {#each sampleLines as line}
          <div class="line-item">
            <span class="label">{line.label}</span>
            <p class="line-text">{line.text}</p>
          </div>
        {/each}
      </div>
    </div>
    <div class="preview-area">
      <div class="blurred-sigil">
        <div class="sigil-placeholder">[Blurred Sigil]</div>
      </div>
      <div class="blurred-chip">Personal Mantra</div>
    </div>
    <div class="cta-block">
      <a class="btn primary" href="/unlock">Unlock Full Reading — $10</a>
      <div class="trust-icons">
        <span>🔒 Secure</span>
        <span>↩️ 24h Refund</span>
        <span>⚡ Instant</span>
      </div>
    </div>
  </div>
</section>

<style>
  .teaser-demo {
    padding: 32px;
    max-width: 1120px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 32px;
    align-items: start;
  }
  .lines { display: flex; flex-direction: column; gap: 16px; }
  .line-item { display: flex; flex-direction: column; gap: 4px; }
  .label { 
    font-family: monospace; 
    font-size: 12px; 
    text-transform: uppercase; 
    opacity: 0.6; 
    letter-spacing: 0.5px;
  }
  .line-text { 
    font-size: 16px; 
    line-height: 24px; 
    margin: 0; 
    color: var(--ink);
  }
  .preview-area {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }
  .blurred-sigil {
    width: 100%;
    aspect-ratio: 1/1;
    max-width: 280px;
    background: var(--panel);
    border-radius: 12px;
    display: grid;
    place-items: center;
    filter: blur(8px);
    opacity: 0.5;
  }
  .blurred-chip {
    padding: 8px 16px;
    background: var(--glass);
    border-radius: 20px;
    font-size: 14px;
    filter: blur(4px);
  }
  .cta-block {
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding-top: 24px;
    border-top: 1px solid #ffffff1f;
  }
  .btn.primary {
    background: var(--destiny);
    color: #fff;
    font-weight: 600;
    padding: 16px 32px;
    font-size: 16px;
  }
  .trust-icons {
    display: flex;
    gap: 20px;
    font-size: 13px;
    opacity: 0.8;
  }
  @media (max-width: 768px) {
    .teaser-demo {
      grid-template-columns: 1fr;
    }
  }
</style>

