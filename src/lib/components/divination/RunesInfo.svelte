<script lang="ts">
  import { goto } from '$app/navigation';
  import FAQ from "../FAQ.svelte";
  import FooterMain from "../FooterMain.svelte";
  import HeaderAsteria from "../HeaderAsteria.svelte";
  import HeroSection from "../HeroSection.svelte";
  import ShellCollection from "../ShellCollection.svelte";
  import HowShellCastingWorks from "../HowShellCastingWorks.svelte";
  import WhatItIs from "../WhatItIs.svelte";
  import WhyItHelps from "../WhyItHelps.svelte";
  import WhatYouGet from "../WhatYouGet.svelte";
  import Testimonials from "../Testimonials.svelte";

  const whatItIsContent = "Runes are an early Germanic symbol system used today as a precise frame for reflection and decision‑making. We work with the Elder Futhark—24 symbols that each articulate an archetype: movement and resources, will and vitality, thresholds and protection, signal and insight, and more. In a reading, you draw one or more runes and interpret their relationship to your question. Orientation may be used in some lineages as a nuance; Asteria treats it as a qualifier, not a verdict.\n\nOur method is strategic, not superstitious. The cast becomes a map: constraints, leverage, timing, and the most elegant next move. Single‑rune pulls sharpen the brief; three‑rune spreads reveal past‑now‑next dynamics; five‑rune layouts surface strategy and risk. The tactile ritual—selecting, placing, and pausing—slows cognition just enough to surface values. The outcome is not prophecy but context you can use to decide with confidence.";

  const whyItHelpsItems = [
    "Clarity under uncertainty—turns a complex question into a legible pattern.",
    "Decision language—insight expressed as strengths, cautions, and next moves.",
    "Timing awareness—where momentum builds vs. where patience compounds.",
    "Leadership‑ready—grounded, neutral language you can share with teams.",
    "Repeatable practice—consistent structure you can revisit across projects."
  ];

  const whatYouGetItems = [
    "A one‑page brief of your question, spread, and the core pattern at play.",
    "Strengths, blind spots, and leverage points tied to each drawn rune.",
    "Action cues for now/next/avoid and a light timing window (weeks to quarter).",
    "Reflection prompts and a minimalist focus ritual (optional).",
    "Reference card for the runes used, with premium visual motifs (no text in image)."
  ];

  const runesFaqs = [
    {
      question: "Which runic alphabet do you use?",
      answer: "The Elder Futhark (24 symbols). We do not use a blank rune."
    },
    {
      question: "Is this predictive?",
      answer: "No. We do not forecast fate. We translate patterns into practical context for decision‑making."
    },
    {
      question: "Do reversals (merkstave) matter?",
      answer: "Some lineages include orientation as nuance. We treat it as a gentle qualifier only—clarifying tone, not declaring doom."
    },
    {
      question: "How often should I consult runes?",
      answer: "Weekly for momentum, or as needed for key decisions. Daily single pulls are useful for focus."
    },
    {
      question: "Do I need prior knowledge?",
      answer: "No. We provide clean summaries. If you have your own lineage, you can layer it in."
    },
    {
      question: "Is this a religious practice?",
      answer: "We present a respectful, secular approach to a historical symbol system; it is not offered as religious authority."
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
		title="Runes"
		logoImage="/runes.png"
		buttonText="DRAW YOUR RUNES"
		description="A 24‑symbol system for decisive clarity—pattern over prophecy"
		onButtonClick={handleCastShells}
	/>

		<div class="info-wrapper">
			<WhatItIs title="What it is" subtitle="Archetypes, not absolutes." content={whatItIsContent} />
			<WhyItHelps title="Why it helps" subtitle="Clarity under uncertainty." items={whyItHelpsItems} />
			<WhatYouGet title="What you get" subtitle="A one‑page brief you can act on." items={whatYouGetItems} />
		</div>


	<!-- Shell Collection -->
	<ShellCollection 
		title="Runes Collection"
		{shells}
	/>

	<!-- How Shell Casting Works -->
	<HowShellCastingWorks 
		title="How Runes Works"
		videoPlaceholderImage="/closeup.jpg"
		{infoCards}
		onPlayClick={handlePlayVideo}
	/>

	<!-- FAQ -->
	<FAQ title="FAQ" faqs={runesFaqs} />

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

</style>
