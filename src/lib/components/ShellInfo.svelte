<script lang="ts">
  import { goto } from '$app/navigation';
  import FAQ from "./FAQ.svelte";
  import FooterMain from "./FooterMain.svelte";
  import HeaderAsteria from "./HeaderAsteria.svelte";
  import HeroSection from "./HeroSection.svelte";
  import ShellCollection from "./ShellCollection.svelte";
  import HowShellCastingWorks from "./HowShellCastingWorks.svelte";
  import WhatItIs from "./WhatItIs.svelte";
  import WhyItHelps from "./WhyItHelps.svelte";
  import WhatYouGet from "./WhatYouGet.svelte";
  import Testimonials from "./Testimonials.svelte";

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

  const shellFaqs = [
    {
      question: "Which shells do you use?",
      answer: "A respectfully sourced, non‑living set: spiral, bivalve, scallop, cowrie, and conch forms. We avoid dyed/novelty pieces to keep signals clean."
    },
    {
      question: "How does a reading work?",
      answer: "You frame a clear question. We cast 3–7 shells onto a neutral cloth with subtle lanes (roles/resources/relationships) and interpret position, orientation, and proximity."
    },
    {
      question: "Is this predictive?",
      answer: "No. We translate patterns into practical context so you can decide with confidence."
    },
    {
      question: "Do orientations matter?",
      answer: "Yes—as qualifiers. Opening toward you can imply invitation; away can suggest privacy or pacing. It informs tone, not doom."
    },
    {
      question: "How often should I consult shells?",
      answer: "Weekly for momentum or ahead of key decisions. Single‑shell pulls are useful for daily focus."
    },
    {
      question: "Ethics & sourcing?",
      answer: "We use non‑living, responsibly sourced shells. Treat them as instruments, not trophies; return or replace respectfully if damaged."
    }
  ];

	interface Shell {
		id: string;
		name: string;
		image: string;
	}

	interface Testimonial {
		id: string;
		name: string;
		role: string;
		text: string;
	}

	interface InfoCard {
		id: string;
        image:string;
		title: string;
		description: string;

	}

	const shells: Shell[] = [
		{ id: '1', name: 'Cowrie', image: '/cowrie.jpg' },
		{ id: '2', name: 'Conch', image: '/corch.jpg' },
		{ id: '3', name: 'Scallop', image: '/scallop.jpg' },
		{ id: '4', name: 'Clam', image: '/clam.jpg' },
		{ id: '5', name: 'Limpet', image: '/limpet.jpg' },
		{ id: '6', name: 'Olive', image: '/olive.jpg' },
		{ id: '7', name: 'Auger', image: '/auger.jpg' },
		{ id: '8', name: 'Turban', image: '/turban.jpg' },
		{ id: '9', name: 'Sundial', image: '/sundial.jpg' },
		{ id: '10', name: 'Top', image: '/top.jpg' },
		{ id: '11', name: 'Star', image: '/star.jpg' },
		{ id: '12', name: 'Moon', image: '/moon.jpg' }
	];

	const infoCards: InfoCard[] = [
		{
			id: '1',
            image:'🐚',
			title: 'Cast the Shells',
			description: 'Set your intention and cast the shells with mindful focus. Let the universe guide your reading.'
		},
		{
			id: '2',
            image:'✨',
			title: 'Read the Pattern',
			description: 'Interpret the shells that have fallen. Each position and shell carries profound meaning.'
		},
		{
			id: '3',
            image:'🔮',
			title: 'Receive Guidance',
			description: 'Gain clarity and wisdom from the ancient practice of shell casting divination.'
		}
	];

	const testimonials: Testimonial[] = [
		{
			id: '1',
			name: 'Sarah Chen',
			role: 'Spiritual Seeker',
			text: 'The shell casting has been incredibly accurate. I found clarity when I needed it most.'
		},
		{
			id: '2',
			name: 'Marcus Rodriguez',
			role: 'Life Coach',
			text: 'I use Panchang with my clients. It provides a unique perspective and opens meaningful conversations.'
		},
		{
			id: '3',
			name: 'Aisha Patel',
			role: 'Wellness Practitioner',
			text: 'The collection is beautiful and the guidance is profound. Highly recommended for anyone seeking clarity.'
		},
		{
			id: '4',
			name: 'David Kim',
			role: 'Meditation Teacher',
			text: 'Shell casting has become part of my daily practice. The insights are always relevant and helpful.'
		}
	];

	function handleCastShells(): void {
		goto('/asteria/divination/conchomancy/experience');
	}

	function handlePlayVideo(): void {
		console.log('Play video clicked');
		// Add your video play logic here
	}
</script>
	<HeaderAsteria/>

<div class="panchang-container">
	<!-- Header -->
	<!-- <header class="header">
		<div class="header-content">
			<div class="logo">Panchang</div>
			<nav class="nav-menu">
				<a href="#design">Design</a>
				<a href="#learning">Learning</a>
				<a href="#events">Events</a>
				<a href="#tools">Tools</a>
			</nav>
		</div>
	</header> -->

	<!-- Hero Section -->
	<HeroSection 
		title="Shell Casting"
		logoImage="/shell.png"
		buttonText="CAST SHELLS"
		description="Discover the ancient wisdom of shell casting divination"
		onButtonClick={handleCastShells}
	/>

		<div class="info-wrapper">
				<WhatItIs subtitle="A maritime pattern language." content={whatItIsContent} />
			<WhyItHelps subtitle="Because timing shapes outcomes." items={whyItHelpsItems} />
		</div>


	<!-- Shell Collection -->
	<ShellCollection 
		title="Shell Collection"
		{shells}
	/>

				<WhatYouGet subtitle="Your cast, distilled to Now · Next · Avoid." items={whatYouGetItems} />


	<!-- How Shell Casting Works -->
	<HowShellCastingWorks 
		title="How Shell Casting Works"
		videoPlaceholderImage="/closeup.jpg"
		{infoCards}
		onPlayClick={handlePlayVideo}
	/>

	<!-- FAQ -->
	<FAQ title="Frequently Asked Questions" faqs={shellFaqs} />

	<!-- Conchomancy Info -->

	<!-- Testimonials -->
	<Testimonials 
		title="Trusted by Seekers Worldwide"
		{testimonials}
	/>

	<!-- Footer -->
	 <FooterMain/>
	<!-- <footer class="footer">
		<div class="footer-content">
			<div class="footer-column">
				<h4>Products</h4>
				<ul>
					<li><a href="#shells">Shells</a></li>
					<li><a href="#guides">Guides</a></li>
					<li><a href="#readings">Readings</a></li>
				</ul>
			</div>
			<div class="footer-column">
				<h4>Company</h4>
				<ul>
					<li><a href="#about">About</a></li>
					<li><a href="#blog">Blog</a></li>
					<li><a href="#careers">Careers</a></li>
				</ul>
			</div>
			<div class="footer-column">
				<h4>Legal</h4>
				<ul>
					<li><a href="#privacy">Privacy</a></li>
					<li><a href="#terms">Terms</a></li>
					<li><a href="#cookies">Cookies</a></li>
				</ul>
			</div>
			<div class="footer-column">
				<h4>Support</h4>
				<ul>
					<li><a href="#help">Help</a></li>
					<li><a href="#contact">Contact</a></li>
					<li><a href="#faq">FAQ</a></li>
				</ul>
			</div>
		</div>
		<div class="footer-bottom">
			<p>&copy; 2025 Panchang. All rights reserved.</p>
		</div>
	</footer> -->
</div>

<style lang="css">
	:global(body) {
		margin: 0;
		padding: 0;
		color: #e8e4d9;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		overflow-x: hidden;
	}

	:global(body::before) {
		content: '';
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: 
			radial-gradient(2px 2px at 20px 30px, #eee, rgba(0, 0, 0, 0)),
			radial-gradient(2px 2px at 60px 70px, #fff, rgba(0, 0, 0, 0)),
			radial-gradient(1px 1px at 50px 50px, #ddd, rgba(0, 0, 0, 0)),
			radial-gradient(1px 1px at 130px 80px, #fff, rgba(0, 0, 0, 0)),
			radial-gradient(2px 2px at 90px 10px, #eee, rgba(0, 0, 0, 0));
		background-repeat: repeat;
		background-size: 200px 200px;
		pointer-events: none;
		opacity: 0.3;
		z-index: 0;
	}

	.panchang-container {
		position: relative;
		z-index: 1;
		min-height: 100vh;
		background: linear-gradient(rgba(11, 13, 20, 0.7), rgba(11, 13, 20, 0.7)), url('/bg.jpg');
background-size: cover;
background-position: center;
background-attachment: fixed;

		/* background-image: url('/bg.jpg');
		background-size: cover;
		background-position: center;
		background-attachment: fixed; */
	}

	.panchang-container :global(.header) {
		z-index: 1000 !important;
	}

	.info-box {
		background: rgba(237, 234, 226, 0.10);
		border: 1px solid rgba(0, 255, 255, 0.2);
		border-radius: 8px;
		padding: 1rem;
		color: #b8b4a9;
		font-size: 0.95rem;
		line-height: 1.6;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
		max-width: 75%;
	}

</style>
