<script lang="ts">
  import WhatItIs from './WhatItIs.svelte';
  import WhyItHelps from './WhyItHelps.svelte';
  import WhatYouGet from './WhatYouGet.svelte';

  const whatItIsContent = "Conchomancy is a shell‑casting practice we treat as a precise frame for reflection and timing. A curated set of shells—spiral, bivalve, scallop, cowrie and conch—stands in for clear archetypes: origin and return, threshold and protection, momentum and rhythm, value and exchange, signal and call. A reading begins with a focused question. You cast 3–7 shells onto a neutral cloth marked with discreet lanes for roles, resources, and relationships. We read position (center vs. edge), orientation (opening toward/away), proximity (clusters vs. outliers), and intersections with the lanes to surface the pattern at play.\n\nAsteria layers tide and lunar context as timing—not prediction. Ebb often favors review and consolidation; flood favors reach and reveal. From there, we translate the cast into a decision brief: constraints, leverage, sequencing, and the most elegant next move. It is not omen‑hunting. It is an elegant way to slow the moment, notice signal, and act with intent.";

  const whyItHelpsItems = [
    "Clarity under ambiguity—turn a complex question into a legible pattern.",
    "Actionable language—insight expressed as strengths, cautions, and next moves.",
    "Tide‑aware timing—ebb for refine, flood for reach—mapped to your horizon.",
    "Stakeholder awareness—how roles and resources want to flow together.",
    "Repeatable structure—consistent casts for comparable decisions over time."
  ];

  const whatYouGetItems = [
    "A one‑page brief of your question, cast diagram, and core pattern.",
    "Strengths, blind spots, and leverage points tied to each shell's landing.",
    "Now / Next / Avoid actions with a light timing window (weeks to quarter).",
    "Compatibility and co‑navigation notes when relationships are in scope.",
    "Reflection prompts and a minimalist tide ritual (optional)."
  ];
</script>

<div class="conchomancy-info">
  <WhatItIs content={whatItIsContent} />
  <WhyItHelps items={whyItHelpsItems} />
  <WhatYouGet items={whatYouGetItems} />
</div>

<style>
  .conchomancy-info {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;
  }
</style>
