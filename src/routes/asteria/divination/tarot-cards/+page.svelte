<script>
  import '$lib/styles/tokens.css';
  import HeaderAsteria from '$lib/components/HeaderAsteria.svelte';
  import TarotApp from '$lib/tarot/TarotApp.svelte';
  import FooterMain from '$lib/components/FooterMain.svelte';
  import HowItWorksVideo from '$lib/components/HowItWorksVideo.svelte';
  import SocialProof from '$lib/components/SocialProof.svelte';

  // Tarot-specific steps
  const tarotSteps = [
    {
      title: "Choose Your Spread",
      description: "Select from Celtic Cross, Three Card Reading, or custom spreads tailored to your question.",
      icon: "🃏"
    },
    {
      title: "Shuffle & Draw",
      description: "Focus on your question as the deck shuffles. The cards that appear are meant for you.",
      icon: "✨"
    },
    {
      title: "Receive Insights",
      description: "Get detailed interpretations for each card position and their relationships to your situation.",
      icon: "🔮"
    }
  ];
</script>

<HeaderAsteria />

<div class="page">
  <!-- Hero Image -->
  <div class="hero-image card">
    <div class="image-placeholder">
      <p>add img here</p>
    </div>
  </div>

  <div class="hero-section">
    
    <div class="hero-content">
      <h1 class="h1">Tarot Cards</h1>
      <p class="sub">Discover insights through the ancient art of tarot reading with interactive 3D cards.</p>
    </div>
  </div>

  <div class="tarot-section">
    <TarotApp />
  </div>
 <!-- How It Works with Video -->
 <HowItWorksVideo 
   title="How Tarot Reading Works"
   placeholderIcon="🃏"
   placeholderText="Tarot Reading Video Demo"
   placeholderSubtext="Interactive demo available above"
   steps={tarotSteps}
 />

 <!-- Social Proof -->
 <SocialProof variant="both" />
  <FooterMain />
</div>

<style>
  .hero-image {
    margin: 32px 0;
    overflow: hidden;
    max-width: 500px;
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
  .page {
    min-height: 100vh;
    padding-top: 80px;
  }

  .hero-section {
    padding: 48px 24px;
    text-align: center;
    background: var(--bg);
  }

  .hero-content {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .tarot-section {
    padding: 24px;
    background: var(--panel);
  }
</style>