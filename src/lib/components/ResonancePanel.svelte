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
    font-size: 40px;
    line-height: 48px;
    text-align: center;
    margin-bottom: 48px;
  }
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    max-width: 1120px;
    margin: 0 auto 24px;
  }
  .stat-card {
    background: var(--glass);
    backdrop-filter: blur(20px);
    border: 1px solid #ffffff1f;
    border-radius: var(--radius);
    padding: 32px;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .stat-value {
    font-size: 48px;
    font-weight: 700;
    color: var(--clarity);
    line-height: 1;
  }
  .stat-label {
    font-size: 18px;
    font-weight: 600;
    color: var(--ink);
  }
  .stat-description {
    font-size: 14px;
    color: var(--muted);
  }
  .methodology {
    font-size: 12px;
    color: var(--muted);
    text-align: center;
    max-width: 800px;
    margin: 24px auto 0;
    font-style: italic;
  }
  @media (max-width: 768px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }
  }
</style>

