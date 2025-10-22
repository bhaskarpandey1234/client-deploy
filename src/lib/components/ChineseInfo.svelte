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

  const whatItIsContent = "The Chinese Zodiac—Shēngxiào—is a 12‑animal cycle that maps time as a living pattern. Each lunar year is paired with one of five elements (Wood, Fire, Earth, Metal, Water) and a yin/yang tone, creating a 60‑year rhythm. Your \"year animal\" is the doorway, but the signature is the triad of Animal + Element + Polarity. Together they sketch temperament, pacing, and the kinds of conditions that help you thrive.\n\nAsteria approaches this tradition as a design language for decisions. We translate classical pairings into contemporary prompts: where your energy runs clean, where friction becomes growth, and when to act or wait. Rather than predicting fate, we reveal context—so you can choose with clarity. Use it to time launches, map roles and partnerships, or simply understand why certain seasons feel charged while others invite rest. The result is a clear, elegant read on your current cycle and the moves that harmonize with it.";

  const whyItHelpsItems = [
    "Clarity under pressure: a fast pattern read when the stakes are high.",
    "Timing that respects the lunar rhythm—daylight and night cycles matter.",
    "Partnership chemistry: who amplifies you, who challenges you, and how to work together.",
    "Premium synthesis: Animal × Element × Yin/Yang expressed as strengths, cautions, and cues.",
    "Ritual‑friendly: small, sustainable practices to anchor intention."
  ];

  const whatYouGetItems = [
    "Your Year Animal, Element, and Yin/Yang profile—the triad at a glance.",
    "Strengths, blind spots, and signature pace (move/merge/rest).",
    "Timing windows for the next 3–6 months (favorable, neutral, challenging) with suggested moves.",
    "Compatibility map: key allies, creative foils, and collaboration advice.",
    "Monthly pulse notes and a minimalist ritual to ground the theme."
  ];

  const chineseFaqs = [
    {
      question: "How is my sign determined?",
      answer: "By your lunar‑year of birth. Because Lunar New Year shifts between late January and mid‑February, Asteria converts your Gregorian date automatically to the correct lunar year."
    },
    {
      question: "What about Elements and Yin/Yang?",
      answer: "Each year carries one of five elements and a yin or yang tone. This pairing colors the animal's expression (e.g., Wood adds growth and flexibility; Metal adds edge and precision)."
    },
    {
      question: "Is this fortune‑telling?",
      answer: "No. We don't forecast destiny. We translate cyclic patterns into practical context so you can decide with confidence."
    },
    {
      question: "I was born in late January—am I the previous animal?",
      answer: "Possibly. If your birthday falls before that year's Lunar New Year, your animal is usually the previous one. Our tool checks this for you."
    },
    {
      question: "Does time of day matter?",
      answer: "Some lineages use an hour animal for nuance. Where available, Asteria adds this as a soft modifier—never as a label."
    },
    {
      question: "How does this differ from Western astrology?",
      answer: "Chinese astrology keys to a lunar year cycle with 12 animals plus Five Elements and yin/yang; Western centers the Sun's position by month. Many clients use both for a fuller view."
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
		title="Chinese Zodiac"
		logoImage="/chinese.png"
		buttonText="GET YOUR READING"
		description="Discover your animal, element, and yin/yang signature"
		onButtonClick={handleCastShells}
	/>

		<div class="info-wrapper">
			<WhatItIs title="What it is" subtitle="Time, designed as a 12‑animal cycle." content={whatItIsContent} />
			<WhyItHelps title="Why it helps" subtitle="Because timing decides outcomes." items={whyItHelpsItems} />
		</div>


	<!-- Shell Collection -->
	<!-- <ShellCollection 
		title="Chinese Zodiac Collection"
		{shells}
	/> -->

	<!-- How Shell Casting Works -->
	<HowShellCastingWorks 
		title="How Chinese Zodiac Works"
		videoPlaceholderImage="/closeup.jpg"
		{infoCards}
		onPlayClick={handlePlayVideo}
	/>

	<WhatYouGet title="What you get" subtitle="Your triad, strengths, cautions, and timing windows." items={whatYouGetItems} />

	<!-- FAQ -->
	<FAQ title="FAQ" faqs={chineseFaqs} />

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
