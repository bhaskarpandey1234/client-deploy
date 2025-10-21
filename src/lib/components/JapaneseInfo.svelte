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

  const whatItIsContent = "Japanese astrology, as we practice it, is a decision‑literate read of Nine Star Ki (Kyūsei Kigaku)—a matrix of nine \"stars\" mapped to the Five Elements (Wood, Fire, Earth, Metal, Water) and yin–yang cycles. From your birth year and month (and optionally day) we derive three lenses: a Year number (principal posture), a Month number (style/operating mode), and a Day number (surface tempo). These sit inside 9‑year, 9‑month, and 9‑day rhythms.\n\nThe system uses a solar year that turns around Setsubun (early February), so January and early‑February births are often counted with the previous year—we adjust for your location and time zone. We translate the pattern into operating language: constraints to respect, leverage to apply, and sequencing that reduces drag. Rather than forecast destiny, we map windows—initiate, iterate, reveal, recover—and the element interactions that shape chemistry in teams and partnerships.\n\nWe default to standard Nine Star Ki calculations and, where helpful, add gentle day‑level cues (monthly star in transit, optional Rokuyō flags) without theatrics. The outcome is a clear, premium brief you can use to time launches, negotiate, plan creative sprints, or reset routines.";

  const whyItHelpsItems = [
    "Strategic clarity—turn a complex profile into a one‑page decision brief.",
    "Rhythm‑aware timing—identify initiate · iterate · reveal · recover windows.",
    "Partnership intelligence—element interactions that clarify chemistry and roles.",
    "Premium synthesis—Year · Month · Day numbers expressed as strengths, cautions, and cues.",
    "Rituals that scale—tiny practices that anchor attention without superstition."
  ];

  const whatYouGetItems = [
    "Your Year/Month/Day numbers with concise strengths/edges and signature pace.",
    "A 3–6 month timing map anchored to nine‑year and nine‑month cycles.",
    "Compatibility & collaboration cues (productive vs. frictional element dynamics).",
    "Daily/weekly micro‑cues with Now · Next · Avoid actions.",
    "Boundary notes for Setsubun/month edges and a minimalist ritual kit (dawn/midday/night)."
  ];

  const japaneseFaqs = [
    {
      question: "Which system do you use?",
      answer: "Nine Star Ki (Kyūsei Kigaku), framed as a modern, secular decision tool. We avoid reenactment and focus on clarity and timing."
    },
    {
      question: "Do I need my birth time?",
      answer: "No. Year and month are sufficient; day adds nuance. Time is only relevant for rare boundary cases around local midnight."
    },
    {
      question: "I was born in January or early February—what then?",
      answer: "Nine Star Ki's year turns at Setsubun (around Feb 3–4). Our tool assigns your year correctly based on location and time zone."
    },
    {
      question: "Is this predictive?",
      answer: "No. We translate cyclic patterns into context and timing so you can choose with confidence."
    },
    {
      question: "How often should I check?",
      answer: "Monthly for planning; weekly for rhythm checks. Avoid recasting the same question repeatedly—act, then revisit."
    },
    {
      question: "How does this relate to Chinese or Western astrology?",
      answer: "It's complementary. Many clients pair Nine Star Ki (rhythm/element tone) with Chinese Zodiac (year animal) and Western (psychology/transits)."
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
		title="Japanese"
		logoImage="/japanese.png"
		buttonText="GET YOUR READING"
		description="Discover your Year, Month, and Day numbers"
		onButtonClick={handleCastShells}
	/>

		<div class="info-wrapper">
			<WhatItIs title="What it is" subtitle="Nine Star Ki, distilled for decisions." content={whatItIsContent} />
			<WhyItHelps title="Why it helps" subtitle="Because rhythm changes outcomes." items={whyItHelpsItems} />
			<WhatYouGet title="What you get" subtitle="Year · Month · Day—at a glance." items={whatYouGetItems} />
		</div>


	<!-- Shell Collection -->
	<ShellCollection 
		title="Japanese Collection"
		{shells}
	/>

	<!-- How Shell Casting Works -->
	<HowShellCastingWorks 
		title="How Japanese Works"
		videoPlaceholderImage="/closeup.jpg"
		{infoCards}
		onPlayClick={handlePlayVideo}
	/>

	<!-- FAQ -->
	<FAQ title="FAQ" faqs={japaneseFaqs} />

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
