<script lang="ts">
  let isHovering = $state(false);
</script>

<div class="hero-content">
  <div class="hero-image">
    <img src="/hero_img.png" alt="Mystical woman with candles" />
  </div>
  <div class="hero-text">
    <h1 class="hero-title">Not a chatbot.  A </h1>
    <h1 class="hero-title2">60-second ritual.</h1>
    <p class="hero-subtitle">Turn your question into a clear plan—personal, specific, and calm.</p>
    <div class="hero-buttons">
      <button class="btn btn-primary" type="button">Start Your Ritual</button>
      <button class="btn btn-secondary" type="button">Watch 20s Demo</button>
    </div>
  </div>
</div>

<style>
  /* ---------------------------
     Base (desktop-neutral initial state)
     --------------------------- */
  .hero-content {
    padding: 4%;
    max-width: 1200px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
    overflow-x: hidden;
  }

  .hero-image {
    position: relative;
    margin-left: -252px;
    display: flex;
    justify-content: center;
    width: 1912px;
    height: 496px;
  }

  .hero-image img {
    max-width: 100%;
    height: auto;
    border-radius: 1rem;
    display: block;
  }

  .hero-text {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    position:absolute;
    top: 195px;
    right: 120px;
  }

  .hero-title {
    margin: 0;
    font-family: "Playfair Display";
    font-size: 101.913px;
    font-style: normal;
    font-weight: 400;
    line-height: 107.421px;
    color: #FFF;
  }
  .hero-title2 {
    font-family: "Playfair Display";
    font-size: 101.913px;
    font-style: normal;
    font-weight: 400;
    line-height: 107.421px;
    margin: 0px;
    margin-left: -40px;
    letter-spacing: 2px;
    color: #FFF;
  }

  .hero-subtitle {
    color: #FFF;
    font-family: Inter;
    font-size: 25.423px;
    font-style: normal;
    font-weight: 400;
    line-height: 40px;
    margin: 0;
    margin-left: -10px;
  }

  .hero-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 40px;
    margin-left: 295px;
  }

  .btn {
    padding: 0.75rem 1.5rem;
    border-radius: 2rem;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Geist', sans-serif;
  }

  .btn-primary {
    background-color: #fbbf24;
    color: #1f2937;
  }

  .btn-primary:hover {
    background-color: #f59e0b;
    transform: translateY(-2px);
  }

  .btn-secondary {
    background-color: transparent;
    color: #f8fafc;
    border: 2px solid #f8fafc;
  }

  .btn-secondary:hover {
    background-color: rgba(248, 250, 252, 0.1);
    transform: translateY(-2px);
  }

  /* ---------------------------
     Responsive overrides (only for smaller screens)
     These will NOT affect desktop (>=1201px) because desktop rules below reapply exact original values.
     --------------------------- */

  @media (max-width: 1200px) {
    .hero-content {
      /* switch to one-column layout under 1200px */
      padding: 2rem;
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .hero-text {
      position: static;
      padding: 2rem;
      right: auto;
      top: auto;
    }

    .hero-image {
      margin-left: 0;
      width: 150%;
      height: auto;
    }

    .hero-title, .hero-title2 {
      font-size: 60px;
      line-height: 70px;
      margin-left: 0;
      align-content: center;
    }

    .hero-subtitle {
      font-size: 20px;
      line-height: 32px;
      margin-left: 0;
    }

    .hero-buttons {
      margin-left: 0;
      margin-top: 24px;
      justify-content: flex-start;
    }
  }

  @media (max-width: 768px) {
    .hero-content {
      padding: 2rem 1rem;
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .hero-title {
      font-size: 32px;
      line-height: 38px;
    }

    .hero-title2 {
      font-size: 32px;
      line-height: 38px;
      margin-top: -10px;
    }

    .hero-subtitle {
      font-size: 18px;
      line-height: 28px;
    }
  }

  @media (max-width: 480px) {
    .hero-title {
      font-size: 28px;
      line-height: 34px;
    }

    .hero-title2 {
      font-size: 28px;
      line-height: 34px;
      margin-top: -8px;
    }

    .hero-subtitle {
      font-size: 16px;
      line-height: 24px;
    }

    .hero-buttons {
      flex-direction: column;
      width: 100%;
      margin-left: 0;
      margin-top: 16px;
    }

    .btn {
      width: 100%;
      justify-content: center;
    }
  }

  /* ---------------------------
     Re-assert exact DESKTOP rules at the end so nothing earlier overrides them.
     These match your original desktop UI exactly.
     --------------------------- */
  @media (min-width: 1201px) {
    .hero-content {
      padding: 4%;
      max-width: 1200px;
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: center;
      overflow-x: hidden;
    }

    .hero-text {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      position:absolute;
      top: 195px;
      right: 120px;
    }

    .hero-title {
      margin: 0;
      font-family: "Playfair Display";
      font-size: 101.913px;
      font-style: normal;
      font-weight: 400;
      line-height: 107.421px;
      color: #FFF;
    }
    .hero-title2 {
      font-family: "Playfair Display";
      font-size: 101.913px;
      font-style: normal;
      font-weight: 400;
      line-height: 107.421px;
      margin: 0px;
      margin-left: -40px;
      letter-spacing: 2px;
      color: #FFF;
    }

    .hero-subtitle {
      color: #FFF;
      font-family: Inter;
      font-size: 25.423px;
      font-style: normal;
      font-weight: 400;
      line-height: 40px;
      margin: 0;
      margin-left: -10px;
    }

    .hero-buttons {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      margin-top: 40px;
      margin-left: 295px;
    }

    .hero-image {
      position: relative;
      margin-left: -252px;
      display: flex;
      justify-content: center;
      width: 1912px;
      height: 496px;
    }

    .hero-image img {
      max-width: 100%;
      height: auto;
      border-radius: 1rem;
    }
  }
</style>