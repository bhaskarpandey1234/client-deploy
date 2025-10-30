<section class="section">
  <div class="grid">
    <div class="card" style="padding:24px">
      <h3 class="h3">Intention</h3>
      <p>Set your question and optional birth details.</p>
    </div>
    <div class="card" style="padding:24px">
      <h3 class="h3">Seal</h3>
      <p>Place your palm to seal the ritual.</p>
    </div>
    <div class="card" style="padding:24px">
      <h3 class="h3">Guidance</h3>
      <p>Get specific, testable lines with a personal sigil.</p>
    </div>
  </div>
</section>

<style>
  /* Keep desktop values exactly as provided */
  .section {
    /* prevent accidental horizontal overflow on small screens while not affecting desktop layout */
    overflow-x: hidden;
    box-sizing: border-box;
    width: 100%;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    width: 100%;
    box-sizing: border-box;
  }

  .card {
    border-radius: 23.75px;
    border: 1.188px solid rgba(255, 255, 255, 0.12);
    background: #FAEECE;
    backdrop-filter: blur(11.875px);
    box-sizing: border-box;
  }

  .card h3 {
    color: #2A2A2A;
    font-family: Inter;
    font-size: 32.775px;
    font-style: normal;
    font-weight: 700;
    line-height: 42.75px;
    margin: 0 0 8px 0;
  }

  .card p {
    color: #2A2A2A;
    font-family: var(--font-family-Font-1, Inter);
    font-size: 17.575px;
    font-style: normal;
    font-weight: var(--font-weight-400, 400);
    line-height: 28.5px;
    margin: 0;
  }

  /* ================================
     RESPONSIVE OVERRIDES
     Only the following media queries — desktop (>=1201px) left unchanged.
     Use max-width:1200px, 768px, 480px as requested.
     ================================ */

  /* <= 1200px: switch to single column, reduce gap — tablet / small laptop */
  @media (max-width: 1200px) {
    .grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    /* slightly reduce card padding to fit smaller viewports (keeps original desktop padding untouched) */
    .card {
      /* prefer to let inline style still apply; provide a sensible override */
      padding: 20px;
    }

    /* scale headings and body text proportionally */
    .card h3 {
      font-size: 28px;
      line-height: 38px;
    }

    .card p {
      font-size: 16px;
      line-height: 26px;
    }
  }

  /* <= 768px: tighter spacing for tablets & large phones */
  @media (max-width: 768px) {
    .grid {
      gap: 12px;
    }

    .card {
      padding: 18px;
    }

    .card h3 {
      font-size: 26px;
      line-height: 34px;
    }

    .card p {
      font-size: 15px;
      line-height: 24px;
    }
  }

  /* <= 480px: phones — ensure no horizontal scroll, stack nicely, readable sizes */
  @media (max-width: 480px) {
    .grid {
      gap: 12px;
    }

    .card {
      padding: 16px;
    }

    .card h3 {
      font-size: 22px;
      line-height: 30px;
    }

    .card p {
      font-size: 14px;
      line-height: 22px;
    }

    /* keep content within viewport and avoid overflow from long words */
    .card,
    .card h3,
    .card p {
      word-wrap: break-word;
      overflow-wrap: anywhere;
    }
  }

  /* Re-assert original desktop rules for >= 1201px so nothing above accidentally overrides them.
     These are identical to the "desktop" styles you provided above.
  */
  @media (min-width: 1201px) {
    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }

    .card {
      border-radius: 23.75px;
      border: 1.188px solid rgba(255, 255, 255, 0.12);
      background: #FAEECE;
      backdrop-filter: blur(11.875px);
      box-sizing: border-box;
    }

    .card h3 {
      color: #2A2A2A;
      font-family: Inter;
      font-size: 32.775px;
      font-style: normal;
      font-weight: 700;
      line-height: 42.75px;
      margin: 0 0 8px 0;
    }

    .card p {
      color: #2A2A2A;
      font-family: var(--font-family-Font-1, Inter);
      font-size: 17.575px;
      font-style: normal;
      font-weight: var(--font-weight-400, 400);
      line-height: 28.5px;
      margin: 0;
    }
  }
</style>
