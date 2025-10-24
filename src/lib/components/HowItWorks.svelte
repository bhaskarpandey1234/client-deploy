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
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  @media (max-width: 1024px) {
    .grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }

  @media (max-width: 768px) {
    .grid {
      gap: 12px;
    }
  }

  .card{
    border-radius: 23.75px;
    border: 1.188px solid rgba(255, 255, 255, 0.12);
    background: #FAEECE;
    backdrop-filter: blur(11.875px);
  }

  @media (max-width: 768px) {
    .card {
      padding: 20px !important;
    }
  }

  @media (max-width: 480px) {
    .card {
      padding: 16px !important;
    }
  }
  .card h3{
    color: #2A2A2A;
    font-family: Inter;
    font-size: 32.775px;
    font-style: normal;
    font-weight: 700;
    line-height: 42.75px;
  }

  @media (max-width: 768px) {
    .card h3 {
      font-size: 26px;
      line-height: 34px;
    }
  }

  @media (max-width: 480px) {
    .card h3 {
      font-size: 22px;
      line-height: 30px;
    }
  }

  .card p{
    color: #2A2A2A;
    font-family: var(--font-family-Font-1, Inter);
    font-size: 17.575px;
    font-style: normal;
    font-weight: var(--font-weight-400, 400);
    line-height: 28.5px;
  }

  @media (max-width: 768px) {
    .card p {
      font-size: 15px;
      line-height: 24px;
    }
  }

  @media (max-width: 480px) {
    .card p {
      font-size: 14px;
      line-height: 22px;
    }
  }
</style>