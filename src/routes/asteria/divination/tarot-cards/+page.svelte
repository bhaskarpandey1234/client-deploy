<script>
  import '$lib/styles/tokens.css';
  import HeaderAsteria from '$lib/components/HeaderAsteria.svelte';
  import FooterMain from '$lib/components/FooterMain.svelte';
  import HowItWorksVideo from '$lib/components/HowItWorksVideo.svelte';
  import SocialProof from '$lib/components/SocialProof.svelte';
  import { goto } from '$app/navigation';

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

  <div class="cta-section">
    <button class="ready-btn" on:click={() => goto('/asteria/divination/tarot-cards/experience')}>
      Ready to Play
    </button>
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

  .cta-section {
    padding: 48px 24px;
    text-align: center;
    background: var(--panel);
  }

  .ready-btn {
    background: linear-gradient(135deg, #c9a86a, #d4b87a);
    color: #0b0f14;
    font-size: 1.25rem;
    font-weight: 700;
    padding: 18px 48px;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 4px 20px rgba(201, 168, 106, 0.3);
  }

  .ready-btn:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 6px 28px rgba(201, 168, 106, 0.4);
  }

  .ready-btn:active {
    transform: translateY(0) scale(0.98);
  }
</style>