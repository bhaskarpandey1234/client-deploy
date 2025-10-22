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

  const whatItIsContent = "Mayan astrology, as we practice it, is a respectful modern synthesis centered on the Tzolk'in—the 260‑day matrix formed by 20 day‑signs (archetypes) × 13 tones (tempo). Your birth date maps to a day‑sign that describes posture and motive, and a tone that describes pacing and how momentum builds. We may reference the solar Haab (365‑day) calendar and the 52‑year Calendar Round for context, but our operating cadence comes from the Tzolk'in.\n\nWe read three lenses: (1) Day‑sign archetype—your default stance and strengths; (2) Tone (1–13)—how you initiate, iterate, and integrate; and (3) the trecena, the 13‑day wave you're moving through now, which colors short‑term timing. We translate these into decision language—constraints to respect, levers to apply, and sequences that reduce drag.\n\nOur calculations default to a widely used GMT correlation and adjust for your local date and time zone. The goal is not reenactment or fate‑telling; it's a clear, secular brief you can use for launches, creative sprints, negotiations, and resets. Pattern over prophecy; clarity over drama.";

  const whyItHelpsItems = [
    "Strategic clarity—turn cycle lore into a one‑page decision brief.",
    "Rhythm‑aware timing—identify Initiate · Iterate · Reveal windows.",
    "Partnership intelligence—complementary vs. catalytic day‑signs and tones.",
    "Premium synthesis—day‑sign × tone × trecena expressed as cues you can act on.",
    "Rituals that scale—tiny practices (dawn focus, midday check, night reset)."
  ];

  const whatYouGetItems = [
    "Your day‑sign and tone profile with concise strengths/edges.",
    "Current trecena notes and two upcoming windows (start / steady / share).",
    "A 3–6 month timing map anchored to the 260‑day cycle.",
    "Compatibility & collaboration cues for key relationships or teams.",
    "A minimalist ritual kit: sunrise focus, mid‑wave check, night reset."
  ];

  const mayanFaqs = [
    {
      question: "Is this historically exact Mayan astrology?",
      answer: "No. It's a respectful modern synthesis inspired by the Tzolk'in and related timing ideas. We use the rhythm for practical clarity, not reenactment."
    },
    {
      question: "Which correlation do you use to compute dates?",
      answer: "We default to a widely used GMT correlation and can accommodate others if your lineage prefers a different constant."
    },
    {
      question: "Do I need my birth time?",
      answer: "No. Birth time is not required. We use your location to resolve local date boundaries around midnight."
    },
    {
      question: "What is a trecena?",
      answer: "A 13‑day wave anchored by a specific day‑sign. It's a useful lens for short‑term timing and momentum."
    },
    {
      question: "Is this predictive?",
      answer: "No. We translate cyclic patterns into context, timing, and next steps so you can choose with confidence."
    },
    {
      question: "I'm born near midnight—could my day‑sign shift?",
      answer: "Rarely. We check your local date/time zone to ensure the correct mapping and note edge cases clearly."
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
		title="Mayan Astrology"
		logoImage="/mayan.png"
		buttonText="REVEAL YOUR MAYAN SIGN"
		description="Discover your day-sign, tone, and trecena"
		onButtonClick={handleCastShells}
	/>

		<div class="info-wrapper">
			<WhatItIs title="What it is" subtitle="260 days, distilled for decisions." content={whatItIsContent} />
			<WhyItHelps title="Why it helps" subtitle="Because rhythm drives outcomes." items={whyItHelpsItems} />
		</div>


	<!-- Shell Collection -->
	<!-- <ShellCollection 
		title="Mayan Collection"
		{shells}
	/> -->

	<!-- How Shell Casting Works -->
	<HowShellCastingWorks 
		title="How Mayan Astrology Works"
		videoPlaceholderImage="/closeup.jpg"
		{infoCards}
		onPlayClick={handlePlayVideo}
	/>

	<WhatYouGet title="What you get" subtitle="Day‑sign & tone—at a glance." items={whatYouGetItems} />

	<!-- FAQ -->
	<FAQ title="FAQ" faqs={mayanFaqs} />

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
