<script lang="ts">
  // Resonance & Outcomes Panel - statistics display
  const stats = [
    {
      label: "Resonance Rate",
      value: "4.7/5",
      description: "Average user rating"
    },
    {
      label: "Outcomes Tracked",
      value: "12,341",
      description: "Verified within 30 days"
    },
    {
      label: "Rituals This Week",
      value: "2,314",
      description: "Active community"
    }
  ];
</script>

<section class="section">
  <h2 class="section-title">Real Results, Real People</h2>
  <div class="stats-grid">
    {#each stats as stat}
      <div class="stat-card">
        <div class="stat-value">{stat.value}</div>
        <div class="stat-label">{stat.label}</div>
        <div class="stat-description">{stat.description}</div>
      </div>
    {/each}
  </div>
  <p class="methodology">
    * Resonance measured through post-reading surveys. Outcomes tracked via optional 7-day check-ins. 
    Methodology available upon request.
  </p>
</section>

<style>
  .section-title {
    color: #FFF;
    text-align: center;
    font-family: "Playfair Display";
    font-size: 47.429px;
    font-style: normal;
    font-weight: 500;
    line-height: 56.914px;
    margin-bottom: 48px;
  }

  @media (max-width: 768px) {
    .section-title {
      font-size: 36px;
      line-height: 44px;
      margin-bottom: 32px;
    }
  }

  @media (max-width: 480px) {
    .section-title {
      font-size: 28px;
      line-height: 36px;
      margin-bottom: 24px;
    }
  }
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    max-width: 1120px;
    margin: 0 auto 24px;
  }

  @media (max-width: 768px) {
    .stats-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }
  .stat-card {
    border-radius: 23.714px;
    border: 1.186px solid rgba(255, 255, 255, 0.12);
    background: #FAEECE;
    backdrop-filter: blur(11.85714340209961px);
    padding: 32px;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  @media (max-width: 768px) {
    .stat-card {
      padding: 24px;
    }
  }

  @media (max-width: 480px) {
    .stat-card {
      padding: 20px;
    }
  }
  .stat-value {
    color: #2A2A2A;
    text-align: center;
    font-family: Inter;
    font-size: 49.326px;
    font-style: normal;
    font-weight: 700;
    line-height: 56.914px;
  }

  @media (max-width: 768px) {
    .stat-value {
      font-size: 40px;
      line-height: 48px;
    }
  }

  @media (max-width: 480px) {
    .stat-value {
      font-size: 36px;
      line-height: 44px;
    }
  }
  .stat-label {
    color: #2A2A2A;
    text-align: center;
    font-family: Inter;
    font-size: 20.987px;
    font-style: normal;
    font-weight: 700;
    line-height: 32.014px;
  }

  @media (max-width: 768px) {
    .stat-label {
      font-size: 18px;
      line-height: 28px;
    }
  }

  @media (max-width: 480px) {
    .stat-label {
      font-size: 16px;
      line-height: 24px;
    }
  }
  .stat-description {
    color: #2A2A2A;
    text-align: center;
    font-family: Inter;
    font-size: 15.533px;
    font-style: normal;
    font-weight: 400;
    line-height: 24.9px;
  }

  @media (max-width: 768px) {
    .stat-description {
      font-size: 14px;
      line-height: 22px;
    }
  }

  @media (max-width: 480px) {
    .stat-description {
      font-size: 13px;
      line-height: 20px;
    }
  }
  .methodology {
    font-size: 12px;
    color: var(--muted);
    text-align: center;
    max-width: 800px;
    margin: 24px auto 0;
    font-style: italic;
    padding: 0 16px;
  }

  @media (max-width: 768px) {
    .methodology {
      font-size: 11px;
    }
  }

  @media (max-width: 480px) {
    .methodology {
      font-size: 10px;
    }
  }
</style>

