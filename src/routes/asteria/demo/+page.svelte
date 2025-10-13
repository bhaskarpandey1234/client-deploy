<script>
  import '$lib/styles/tokens.css';
  import SettingsBar from '$lib/components/SettingsBar.svelte';
  import ShellCast from '$lib/components/ShellCast.svelte';
  import ShellSVG from '$lib/components/ShellSVG.svelte';
  import LuckyWindow from '$lib/components/LuckyWindow.svelte';
  import HowItWorksVideo from '$lib/components/HowItWorksVideo.svelte';
  import SocialProof from '$lib/components/SocialProof.svelte';
  import { lunarInfo } from '$lib/lunar';
  import FooterMain from '$lib/components/FooterMain.svelte'

  const shells = ['cowrie', 'conch', 'scallop', 'clam', 'limpet', 'olive', 'auger', 'turban', 'sundial', 'top', 'star', 'moon'];
  let showLucky = false;
  let lunar = lunarInfo();

  function toggleLucky() {
    showLucky = !showLucky;
  }

  function handleImageError(img) {
    img.style.display = 'none';
    const placeholder = img.nextElementSibling;
    if (placeholder) placeholder.hidden = false;
  }
</script>

<div class="demo-page">
  <!-- Hero Image -->
  <div class="hero-image card">
    <img 
      src="/images/shell-casting-hero.jpg" 
      alt="Shell Casting Ritual" 
      on:error={handleImageError}
    />
    <div class="image-placeholder" hidden>
      <span aria-hidden="true" style="font-size: 96px;">🐚</span>
      <p>Sacred Shell Casting</p>
    </div>
  </div>

  <div class="section">
    <h1 class="h1">Shell Casting</h1>
    <p class="sub">Experience the sound and haptic feedback of shell casting with elegant SVG icons.</p>
    
    
    
    <SettingsBar />
    
    <ShellCast />
    
    <div class="demo-controls">
      <button class="btn" on:click={toggleLucky}>
        {showLucky ? 'Hide' : 'Show'} Lucky Window
      </button>
      <div class="lunar-display">
        Current Moon: {lunar.phase} ({Math.round(lunar.fraction * 100)}%)
      </div>
    </div>
    
    <div class="lucky-demo" style="position: relative; height: 200px; margin: 24px 0;">
      <LuckyWindow visible={showLucky} size={120} />
      <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: -1; opacity: 0.3;">
        Demo Area
      </div>
    </div>
    
    <div class="shells-grid">
      <h3 class="h3">Shell Collection</h3>
      <div class="grid">
        {#each shells as shell}
          <div class="shell-card card">
            <ShellSVG id={shell} size={32} />
            <span style="text-transform: capitalize; margin-top: 8px;">{shell}</span>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- How It Works with Video -->
  <HowItWorksVideo />

  <!-- Social Proof -->
  <SocialProof variant="both" />
  <FooterMain />
</div>

<style>
  .demo-page {
    min-height: 100vh;
    padding-top: 80px;
  }

  .hero-image {
    margin: 32px 0;
    overflow: hidden;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
  }

  .hero-image img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: var(--radius);
  }

  .image-placeholder {
    aspect-ratio: 16/9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--panel);
    color: var(--muted);
    text-align: center;
  }

  .image-placeholder p {
    font-size: 18px;
    margin-top: 16px;
  }

  .shells-grid {
    margin-top: 48px;
  }

  .shells-grid .grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 16px;
    margin-top: 16px;
  }

  .shell-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    text-align: center;
    font-size: 14px;
  }

  .demo-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    margin: 24px 0;
  }

  .lunar-display {
    font-size: 14px;
    color: var(--muted);
    text-align: center;
  }

  .lucky-demo {
    border: 1px dashed var(--muted);
    border-radius: 12px;
    background: var(--glass);
  }
</style>