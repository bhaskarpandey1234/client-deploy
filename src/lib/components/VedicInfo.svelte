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

  const whatItIsContent = "Vedic astrology—Jyotiṣa—is a sidereal, timing‑forward framework we translate into a clean decision brief. It works with 12 rāśi (signs), 27 nakṣatra (lunar mansions), the graha set (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, plus lunar nodes), and 12 houses that map life areas. Two tools drive timing: daśā periods (seasonal emphasis, e.g., Vimśottarī) and gochar (transits). Your chart is calculated from birth date, place, and time; when time is unknown, we provide a Moon‑based reading and flag confidence levels. We default to a standard sidereal ayanāṃśa (Lahiri); other options are available on request.\n\nAsteria reads the pattern as operating language—constraints to respect, leverage to apply, and sequencing that reduces drag. We synthesize Lagna (rising), Moon sign and nakṣatra, key yogas (meaningful combinations), current daśā/bhukti, and major transits (e.g., Jupiter/Saturn shifts, eclipses) into practical cues you can schedule. The aim isn't prophecy. It's clear context for launches, negotiations, creative sprints, and recovery—delivered in precise, modern terms.";

  const whyItHelpsItems = [
    "Strategic clarity—turn a complex chart into a one‑page brief.",
    "Rhythm‑aware timing—daśā seasons and transit windows you can plan against.",
    "Partnership intelligence—element/house overlays for roles and chemistry.",
    "Premium synthesis—Lagna · Moon/nakṣatra · yogas · daśā/gochar.",
    "Rituals that scale—tiny practices to anchor intent without superstition."
  ];

  const whatYouGetItems = [
    "Your Lagna (rising), Moon sign, and birth nakṣatra with concise strengths/edges.",
    "House‑by‑house snapshot of priorities for work, money, relationships, creativity, health.",
    "Daśā/bhukti timeline for the next 6–18 months with Initiate · Iterate · Reveal · Recover windows.",
    "Transit radar (Jupiter, Saturn, nodes, eclipse seasons) with Now · Next · Avoid actions.",
    "Compatibility/collaboration notes and a minimalist ritual kit (dawn focus / night reset)."
  ];

  const vedicFaqs = [
    {
      question: "Do you use tropical or sidereal?",
      answer: "Sidereal by default (Lahiri ayanāṃśa). We can compute other ayanāṃśas on request."
    },
    {
      question: "What if I don't know my birth time?",
      answer: "We can do a Moon‑based chart and provide confidence ranges. For critical decisions we recommend a rectification session."
    },
    {
      question: "Is this predictive?",
      answer: "No. We translate cyclic patterns into context and timing so you can choose with confidence."
    },
    {
      question: "Which daśā system do you use?",
      answer: "Vimśottarī by default; we may reference alternatives when they add clarity."
    },
    {
      question: "How often should I check?",
      answer: "Monthly for planning; quarterly for strategy; weekly for rhythm checks."
    },
    {
      question: "Does this replace therapy, legal, or medical advice?",
      answer: "No. It's a context tool—use it to time and frame actions, not to replace professional care."
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
		title="Vedic"
		logoImage="/vedic.png"
		buttonText="GET YOUR CHART"
		description="Sidereal clarity, modern brief—timing you can trust"
		onButtonClick={handleCastShells}
	/>

		<div class="info-wrapper">
			<WhatItIs title="What it is" subtitle="Sidereal clarity, modern brief." content={whatItIsContent} />
			<WhyItHelps title="Why it helps" subtitle="Because rhythm changes outcomes." items={whyItHelpsItems} />
			<WhatYouGet title="What you get" subtitle="Your Lagna and nakṣatra at a glance." items={whatYouGetItems} />
		</div>


	<!-- Shell Collection -->
	<ShellCollection 
		title="Vedic Collection"
		{shells}
	/>

	<!-- How Shell Casting Works -->
	<HowShellCastingWorks 
		title="How Vedic Works"
		videoPlaceholderImage="/closeup.jpg"
		{infoCards}
		onPlayClick={handlePlayVideo}
	/>

	<!-- FAQ -->
	<FAQ title="FAQ" faqs={vedicFaqs} />

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
