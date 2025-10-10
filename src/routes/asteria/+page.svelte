<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p> -->
<script lang="ts">
  import '$lib/styles/tokens.css';
  import Hero from '$lib/components/Hero.svelte';
  import CreatorStrip from '$lib/components/CreatorStrip.svelte';
  import QuizTeaser from '$lib/components/QuizTeaser.svelte';
  import HowItWorks from '$lib/components/HowItWorks.svelte';
  import TeaserDemo from '$lib/components/TeaserDemo.svelte';
  import JourneysGrid from '$lib/components/JourneysGrid.svelte';
  import PricingRibbon from '$lib/components/PricingRibbon.svelte';
  import ResonancePanel from '$lib/components/ResonancePanel.svelte';
  import EthicsAccordion from '$lib/components/EthicsAccordion.svelte';
  import FAQ from '$lib/components/FAQ.svelte';
  import InstallCTA from '$lib/components/InstallCTA.svelte';
  import Newsletter from '$lib/components/Newsletter.svelte';
  import FooterMain from '$lib/components/FooterMain.svelte';
</script>

<Hero />
<CreatorStrip />
<QuizTeaser />
<HowItWorks />
<TeaserDemo />
<JourneysGrid />
<ResonancePanel />
<!-- <PricingRibbon /> -->
<EthicsAccordion />
<FAQ />
<!-- <InstallCTA /> -->
<Newsletter />
<FooterMain />