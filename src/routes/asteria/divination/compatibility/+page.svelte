<script>
  import '$lib/styles/tokens.css';
  import HeaderAsteria from '$lib/components/HeaderAsteria.svelte';
  import FooterMain from '$lib/components/FooterMain.svelte';
  import HowItWorksVideo from '$lib/components/HowItWorksVideo.svelte';
  import SocialProof from '$lib/components/SocialProof.svelte';
  import { goto } from '$app/navigation';

  const panchangSteps = [
    {
      title: "Enter Birth Details",
      description: "Provide birth date and time for both individuals to calculate Nakshatra positions.",
      icon: "📅"
    },
    {
      title: "Analyze Compatibility",
      description: "Our system checks Gana, Nadi, and other Vedic factors for relationship harmony.",
      icon: "⭐"
    },
    {
      title: "Get Your Results",
      description: "Receive detailed compatibility score and insights based on ancient Vedic principles.",
      icon: "💫"
    }
  ];
</script>

<HeaderAsteria />

<div class="page">
  <div class="hero-section">
    <h1 class="h1">Panchang Compatibility</h1>
    <p class="sub">Discover your compatibility through Vedic astrology and Nakshatra matching</p>
  </div>

  <div class="info-section">
    <div class="card">
      <!-- <h2>What is Panchang Compatibility?</h2>
      <p>Panchang compatibility uses ancient Vedic astrology principles to assess relationship harmony based on birth stars (Nakshatras).</p>
      
      <h3>Key Factors We Analyze:</h3>
      <ul>
        <li><strong>Gana (Nature):</strong> Compatibility of temperaments - Deva, Manushya, or Rakshasa</li>
        <li><strong>Nadi (Health):</strong> Ensures genetic and health compatibility</li>
        <li><strong>Nakshatra:</strong> Birth star positions and their harmonious alignment</li>
      </ul> -->

      <!-- <p>Get instant compatibility insights based on birth date and time.</p> -->
       <h2>Add image here</h2>
    </div>

    <div class="cta-section">
      <button class="ready-btn" on:click={() => goto('/asteria/divination/panchang')}>
        Check Compatibility
      </button>
    </div>
  </div>

  <HowItWorksVideo 
    title="How Panchang Compatibility Works"
    placeholderIcon="🌙"
    placeholderText="Panchang Compatibility Demo"
    placeholderSubtext="Interactive demo available above"
    steps={panchangSteps}
  />

  <SocialProof variant="both" />

  <FooterMain />
</div>

<style>
  .page {
    min-height: 100vh;
    padding-top: 80px;
    background: var(--bg);
  }

  .hero-section {
    padding: 48px 24px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .info-section {
    padding: 48px 24px;
    max-width: 800px;
    margin: 0 auto;
  }

  .card {
    background: var(--panel);
    border: 1px solid #ffffff1f;
    border-radius: 16px;
    padding: 32px;
    margin-bottom: 32px;
  }

  .card h2 {
    text-align: center;
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0 0 16px 0;
    color: var(--ink);
  }

  .card h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 24px 0 12px 0;
    color: var(--ink);
  }

  .card p {
    color: var(--muted);
    line-height: 1.6;
    margin-bottom: 16px;
  }

  .card ul {
    list-style: none;
    padding: 0;
    margin: 16px 0;
  }

  .card li {
    padding: 12px 0;
    border-bottom: 1px solid #ffffff1f;
    color: var(--muted);
  }

  .card li:last-child {
    border-bottom: none;
  }

  .cta-section {
    text-align: center;
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
