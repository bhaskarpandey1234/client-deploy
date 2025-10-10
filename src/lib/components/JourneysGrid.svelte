<script lang="ts">
  // Journeys Grid - 4 tiles showing different journey types
  const journeys = [
    {
      title: "Love",
      color: "var(--love)",
      bullets: [
        "Timing windows for connection",
        "Red flags and green lights",
        "Communication patterns"
      ]
    },
    {
      title: "Career",
      color: "var(--career)",
      bullets: [
        "Decision timing and pivots",
        "Negotiation advantages",
        "Recognition cycles"
      ]
    },
    {
      title: "Destiny",
      color: "var(--destiny)",
      bullets: [
        "Life path clarity",
        "Purpose alignment",
        "Major transition guidance"
      ]
    },
    {
      title: "Clarity",
      color: "var(--clarity)",
      bullets: [
        "Breaking mental loops",
        "Perspective shifts",
        "Decision confidence"
      ]
    }
  ];
</script>

<section class="section">
  <h2 class="section-title">Choose Your Journey</h2>
  <div class="journeys-grid">
    {#each journeys as journey}
      <div class="journey-card" style="--accent:{journey.color}">
        <h3 class="journey-title">{journey.title}</h3>
        <ul class="journey-bullets">
          {#each journey.bullets as bullet}
            <li>{bullet}</li>
          {/each}
        </ul>
        <a href="/journey/{journey.title.toLowerCase()}" class="journey-link">
          Explore modalities →
        </a>
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
  .journeys-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    max-width: 1120px;
    margin: 0 auto;
  }
  .journey-card {
    background: var(--glass);
    backdrop-filter: blur(20px);
    border: 2px solid;
    border-color: var(--accent);
    border-radius: var(--radius);
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-shadow: 0 0 24px var(--accent, rgba(255,255,255,0.1));
  }
  .journey-title {
    font-size: 28px;
    line-height: 36px;
    margin: 0;
    color: var(--accent);
  }
  .journey-bullets {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
  }
  .journey-bullets li {
    padding-left: 20px;
    position: relative;
  }
  .journey-bullets li::before {
    content: "•";
    position: absolute;
    left: 0;
    color: var(--accent);
  }
  .journey-link {
    color: var(--accent);
    text-decoration: none;
    font-weight: 600;
    transition: transform 0.2s;
    align-self: flex-start;
  }
  .journey-link:hover {
    transform: translateX(4px);
  }
  @media (max-width: 768px) {
    .journeys-grid {
      grid-template-columns: 1fr;
    }
  }
</style>

