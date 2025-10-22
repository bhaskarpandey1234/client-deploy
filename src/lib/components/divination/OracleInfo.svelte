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

  const whatItIsContent = "Oracle cards are a modular symbol system designed for focused reflection and decision‑making. Unlike Tarot, each deck defines its own language—archetypes, seasons, elements, prompts. Asteria works only with curated decks whose structure is transparent and actionable. We group cards into functional roles: anchor (identity/posture), energy (conditions and timing), and guidance (levers and next moves).\n\nThe method is strategic, not superstitious. You set a precise prompt; we select an appropriate spread (single for a headline; three for context‑constraint‑leverage; five for a strategy map). Card orientation, if used by the deck, is treated as tone—internalization, delay, or overuse—never doom. We layer soft timing windows (roughly 2–12 weeks) and relationship/role considerations when relevant. The result is an elegant brief: strengths to lean into, cautions to respect, and a sequence that reduces drag.\n\nOracle cards here are operating language. They slow the moment so patterns surface and choices become cleaner.";

  const whyItHelpsItems = [
    "Clarity under ambiguity—turn a noisy question into a legible pattern.",
    "Actionable language—insight expressed as strengths, cautions, and next moves.",
    "Timing you can plan against—short windows mapped to your horizon.",
    "Deck‑aware method—fits the question instead of forcing a template.",
    "Repeatable structure—consistent spreads for comparable decisions over time."
  ];

  const whatYouGetItems = [
    "A one‑page brief of your question, spread, and the core pattern at play.",
    "Card‑by‑card analysis distilled into leverage points and risks.",
    "Now / Next / Avoid actions with a 2–12 week horizon.",
    "Compatibility and collaboration notes when relationships are in scope.",
    "Reflection prompts and a minimalist ritual to anchor intent."
  ];

  const oracleFaqs = [
    {
      question: "Oracle vs. Tarot—what's the difference?",
      answer: "Tarot is a fixed 78‑card framework; oracle decks are modular and author‑defined. We choose decks with clear structure for decision use."
    },
    {
      question: "Do reversals matter?",
      answer: "If the deck supports orientation, we read it as tone (internal, delayed, over‑amped)—not as negative fate."
    },
    {
      question: "How many decks do you use?",
      answer: "Usually one per question for coherence; occasionally a cross‑check card from a second deck for contrast."
    },
    {
      question: "Is this predictive?",
      answer: "No. We translate pattern into practical context and timing so you can decide with confidence."
    },
    {
      question: "How often should I read?",
      answer: "Weekly for momentum, or ahead of key decisions. Avoid repeated pulls on the same question in a short window."
    },
    {
      question: "Can I use my own deck?",
      answer: "Yes. We can read with your deck if the structure is clear, and we'll map its language to our brief."
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
		title="Oracle Cards"
		logoImage="/oracle.png"
		buttonText="DRAW YOUR CARDS"
		description="Your deck, distilled for decisions—pattern over prophecy"
		onButtonClick={handleCastShells}
	/>

		<div class="info-wrapper">
			<WhatItIs title="What it is" subtitle="Your deck, distilled for decisions." content={whatItIsContent} />
			<WhyItHelps title="Why it helps" subtitle="Because sequencing changes outcomes." items={whyItHelpsItems} />
		</div>


	<!-- Shell Collection -->
	<!-- <ShellCollection 
		title="Oracle Card Collection"
		{shells}
	/> -->

	<!-- How Shell Casting Works -->
	<HowShellCastingWorks 
		title="How Oracle Card Works"
		videoPlaceholderImage="/closeup.jpg"
		{infoCards}
		onPlayClick={handlePlayVideo}
	/>

	<WhatYouGet title="What you get" subtitle="A one‑page brief you can act on." items={whatYouGetItems} />

	<!-- FAQ -->
	<FAQ title="FAQ" faqs={oracleFaqs} />

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
