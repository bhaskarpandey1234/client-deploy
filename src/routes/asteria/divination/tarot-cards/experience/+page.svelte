<script>
  import '$lib/styles/tokens.css';
  import HeaderAsteria from '$lib/components/HeaderAsteria.svelte';
  import TarotApp from '$lib/tarot/TarotApp.svelte';
  import FooterMain from '$lib/components/FooterMain.svelte';
</script>

<HeaderAsteria />

<div class="page">
  <div class="tarot-section">
    <TarotApp />
  </div>
  <FooterMain />
</div>

<style>
  .page {
    min-height: 100vh;
    padding-top: 80px;
    background: var(--bg);
  }

  .tarot-section {
    padding: 24px;
    background: var(--panel);
  }
</style>
