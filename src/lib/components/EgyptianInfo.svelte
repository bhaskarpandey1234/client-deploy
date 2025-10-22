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

  const whatItIsContent = "Egyptian astrology, as we practice it, is a decan‑based framework translated for modern decisions. In temple star clocks, the sky was organized into 36 decans—ten‑day intervals that kept ritual time and marked turning points. Asteria uses this cadence alongside the mythic language of key deities as clear archetypes: strategy, protection, renewal, intelligence, justice, craft, and care. Rather than reenacting antiquity, we work with the spirit of the system—cycle awareness—expressed in clean, contemporary language.\n\nYour profile combines three lenses: (1) a guiding deity archetype that frames posture and motive; (2) your decan cadence (a ten‑day rhythm that hints at when to initiate, consolidate, or reveal); and (3) a simple solar/lunar emphasis around your date (daylight push vs. night‑mind integration). We then add current windows that mirror the decans—where momentum builds, where patience compounds, and where small rituals restore edge. The result is not prophecy but a precise brief: context, leverage, sequencing, and an elegant next move.\n\nThis is a respectful, secular synthesis informed by decanal timing. We honor popular twelve‑deity \"Egyptian zodiac\" mappings when useful, and go deeper with ten‑day decans for nuance. The aim is practical clarity you can use in launches, collaborations, and recovery.";

  const whyItHelpsItems = [
    "Strategic clarity—turn cycle lore into a one‑page decision brief.",
    "Decan pacing—identify initiate · integrate · reveal windows.",
    "Partnership intelligence—complementary vs. catalytic archetypes, explained cleanly.",
    "Premium synthesis—deity archetype × decan cadence × solar/lunar tone.",
    "Rituals that scale—tiny practices to anchor attention without theatrics."
  ];

  const whatYouGetItems = [
    "Your guiding archetype with a concise strengths/edge profile.",
    "Your birth‑decan and nearby neighbors for nuance (±10 days).",
    "Timing windows for the next 3–6 months mapped to decan rhythm.",
    "Compatibility notes (complementary, catalytic, tender pairings) and collaboration cues.",
    "A minimalist ritual kit: dawn focus, mid‑cycle check, and night reset."
  ];

  const egyptianFaqs = [
    {
      question: "Is this historically exact Egyptian astrology?",
      answer: "No. It's a respectful modern synthesis inspired by decans and temple star clocks. We avoid reenactment; we use the rhythm for practical clarity."
    },
    {
      question: "Do you use the twelve‑deity 'Egyptian zodiac'?",
      answer: "We reference it as a familiar doorway and add depth with the 36 decans (ten‑day intervals). You'll see both where useful."
    },
    {
      question: "Do I need my birth time?",
      answer: "Not required. Birth time lets us add a simple day/night emphasis and refine nuance, but the core reading works with date alone."
    },
    {
      question: "Is this fortune‑telling?",
      answer: "No. We don't predict fate. We translate cyclic patterns into context, timing, and next steps."
    },
    {
      question: "What if my birthday sits on a decan boundary?",
      answer: "We show the primary decan and the neighbor on either side. Boundary births receive notes for both, with clear cues on how to test them."
    },
    {
      question: "How does this differ from Western astrology?",
      answer: "Western uses sign and aspect geometry across twelve houses; our Egyptian track emphasizes ten‑day decans and deity archetypes for timing and posture. Many clients use both."
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
		title="Egyptian Astrology"
		logoImage="/egyptian.png"
		buttonText="GET YOUR READING"
		description="Discover your deity archetype and decan rhythm"
		onButtonClick={handleCastShells}
	/>

		<div class="info-wrapper">
			<WhatItIs title="What it is" subtitle="Decans, distilled for decisions." content={whatItIsContent} />
			<WhyItHelps title="Why it helps" subtitle="Because the right window changes the outcome." items={whyItHelpsItems} />
		</div>


	<!-- Shell Collection -->
	<!-- <ShellCollection 
		title="Egyptian Collection"
		{shells}
	/> -->

	<!-- How Shell Casting Works -->
	<HowShellCastingWorks 
		title="How Egyptian Astrology Works"
		videoPlaceholderImage="/closeup.jpg"
		{infoCards}
		onPlayClick={handlePlayVideo}
	/>

	<WhatYouGet title="What you get" subtitle="Your archetype and birth‑decan at a glance." items={whatYouGetItems} />

	<!-- FAQ -->
	<FAQ title="FAQ" faqs={egyptianFaqs} />

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
