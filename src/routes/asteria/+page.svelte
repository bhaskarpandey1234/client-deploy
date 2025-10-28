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
    import HeaderAsteria from '$lib/components/HeaderAsteria.svelte';

  const faqs = [
    {
      question: "How is this different from a chatbot?",
      answer: "Instead of back-and-forth conversation, you complete a focused 60-second ritual. The result is a structured reading with testable insights, not generic chat responses."
    },
    {
      question: "What if the reading doesn't resonate?",
      answer: "Email us within 24 hours for a full refund or a free second reading. No questions asked. About 94% of readings are kept."
    },
    {
      question: "Do I need to provide birth details?",
      answer: "Optional. Birth time/location adds astrological timing precision, but many readings work well with just your question and intention."
    },
    {
      question: "How long does it take?",
      answer: "The ritual itself is 60 seconds. Your reading appears instantly. Optional: return in 7 days for a check-in reading."
    },
    {
      question: "How we handle your data",
      answer: "We store only what's necessary for your reading (birth details if provided, question content). No data is sold. Readings are encrypted. You can request deletion anytime via email."
    },
    {
      question: "AI & Human collaboration",
      answer: "Readings use AI trained on traditional divination systems combined with astrological timing. No human sees your personal data. The system is audited quarterly for bias and fairness."
    },
    {
      question: "Refund policy",
      answer: "If your reading doesn't resonate, email us within 24 hours for a full refund, no questions asked. We also offer a free second reading if the first feels off."
    },
    {
      question: "Our philosophical stance",
      answer: "We view this as a clarity tool, not deterministic prediction. Readings offer perspective, not absolute truth. You maintain full agency. We encourage critical thinking and real-world testing."
    },
    {
      question: "Can I use this on mobile?",
      answer: "Yes! Asteria works as a progressive web app. Install it to your home screen for an app-like experience on any device."
    }
  ];
</script>
<div class="container">
<Hero />
<QuizTeaser />
<HowItWorks />
<!-- <TeaserDemo /> -->
<!-- JourneysGrid now shown inside QuizTeaser -->
<CreatorStrip />
<ResonancePanel />
<!-- <PricingRibbon /> -->
<!-- <EthicsAccordion /> -->
<!-- <FAQ {faqs} /> -->
<!-- <InstallCTA /> -->
<Newsletter />
<FooterMain />
</div>
<style>
  .container{
    /* background: url('/bg.jpg'); */
    background: linear-gradient(rgba(11, 13, 20, 0.7), rgba(11, 13, 20, 0.7)), url('/bg.jpg');
  }
</style>