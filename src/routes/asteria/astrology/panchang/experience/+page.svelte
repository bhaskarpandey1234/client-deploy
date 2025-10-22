<script>
  import '$lib/styles/tokens.css';
  import HeaderAsteria from '$lib/components/HeaderAsteria.svelte';
  import CompatibilityWidget from '$lib/components/CompatibilityWidget.svelte';
  import PanchangHero from '$lib/components/panchang/PanchangHero.svelte';
  import FooterMain from '$lib/components/FooterMain.svelte';

  let panchangData = null;

  function handleFetch(e) {
    const { date, tz, location, coords } = e.detail;
    // TODO: Call your panchang API here
    console.log('Fetch panchang:', { date, tz, location, coords });
    panchangData = { date, tz, location };
  }
</script>

<HeaderAsteria />

<div class="page">
  <div class="hero-section">
    <PanchangHero on:fetch={handleFetch} />
  </div>

  {#if panchangData}
    <div class="results-section">
      <p>Showing results for {panchangData.location} on {panchangData.date}</p>
    </div>
  {/if}

  <div class="widget-section">
    <CompatibilityWidget />
  </div>
  <FooterMain />
</div>

<style>
  .page {
    min-height: 100vh;
    padding-top: 80px;
    background: var(--bg);
  }

  .hero-section {
    padding: 24px;
  }

  .results-section {
    padding: 24px;
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    color: var(--muted);
  }

  .widget-section {
    padding: 48px 24px;
  }
</style>
