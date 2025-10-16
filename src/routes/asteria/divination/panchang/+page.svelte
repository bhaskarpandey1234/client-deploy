<script>
  import '$lib/styles/tokens.css';
  import HeaderAsteria from '$lib/components/HeaderAsteria.svelte';
  import CompatibilityWidget from '$lib/components/CompatibilityWidget.svelte';
  import FooterMain from '$lib/components/FooterMain.svelte';
</script>

<HeaderAsteria />

<div class="page">
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

  .widget-section {
    padding: 48px 24px;
  }
</style>
