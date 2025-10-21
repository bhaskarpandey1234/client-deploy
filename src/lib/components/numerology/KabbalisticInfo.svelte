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

  const whatItIsContent = "Kabbalistic numerology, as we practice it, is a modern, secular read of Hebrew gematria—the practice of assigning numbers to letters to study pattern. We work primarily with Mispar Hechrechi (standard values Aleph=1 … Tav=400) and use Mispar Katan (digit reduction) to read tone and pacing. Where helpful, we note final‑letter variants (Mispar Gadol) and document the differences. For non‑Hebrew names we create a careful transliteration and, when sensible, test 1–2 alternatives so you can see trade‑offs.\n\nWe translate totals into operating language: the compound sum frames the story‑arc, the single‑digit root sets tone, and recurring letter clusters flag leverage and friction. Birth dates add a second lens—the day number and reduced full date; optionally we record the Hebrew calendar date for seasonal color, without religious claims. We do not compute or evaluate sacred/divine names; respect is non‑negotiable.\n\nThe output is a clean decision brief—constraints to respect, leverage to apply, and a sequence that reduces drag (Now / Next / Avoid). Use it to name a product, choose a professional handle, plan a launch window, or tune communication. Pattern over prophecy; clarity over drama.";

  const whyItHelpsItems = [
    "Strategic clarity—turn symbolic math into a one‑page decision brief.",
    "Name as handle—how you initiate and are received under pressure.",
    "Compound nuance—surface leverage and risk inside the total.",
    "Timing awareness—short windows keyed to 1–9 cycles.",
    "Premium care—transliteration, culture, and ethics handled explicitly."
  ];

  const whatYouGetItems = [
    "Name profile: standard total + single‑digit root + compound read; key letter clusters and tonal cues.",
    "Birth‑date profile: day number, reduced full‑date, and personal cycle highlights (1–9).",
    "Action plan: Now · Next · Avoid with 2–12 week timing windows.",
    "Compatibility notes (complementary vs. catalytic numbers) for partners/teams.",
    "Optional: transliteration alternatives or spelling/nickname variants—trade‑offs, not prescriptions."
  ];

  const kabbalisticFaqs = [
    {
      question: "Which gematria system do you use?",
      answer: "Mispar Hechrechi by default, with Mispar Katan for reduction. Where useful, we note Mispar Gadol (final letters) and explain the effect."
    },
    {
      question: "Do I need a Hebrew spelling?",
      answer: "If you have one, great. If not, we create a respectful transliteration and may test 1–2 sensible variants so you can compare."
    },
    {
      question: "Is this predictive?",
      answer: "No. We translate pattern into context and timing so you can choose with confidence."
    },
    {
      question: "Can this change my fate if I change my name?",
      answer: "We treat spelling and aliases as design choices that shift emphasis and perception, not destiny edits."
    },
    {
      question: "Do you analyze sacred names or verses?",
      answer: "No. We avoid divine names and sacred texts. This is a respectful, secular practice."
    },
    {
      question: "How does this differ from Chaldean/Pythagorean systems?",
      answer: "Different letter values and priorities. We can show complements and differences if helpful."
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
		title="Kabbalistic"
		logoImage="/kabbalistic.png"
		buttonText="GET YOUR READING"
		description="Gematria, distilled for decisions—pattern, not prophecy"
		onButtonClick={handleCastShells}
	/>

		<div class="info-wrapper">
			<WhatItIs title="What it is" subtitle="Gematria, distilled for decisions." content={whatItIsContent} />
			<WhyItHelps title="Why it helps" subtitle="Because names carry signal." items={whyItHelpsItems} />
			<WhatYouGet title="What you get" subtitle="Your name's root and compound—at a glance." items={whatYouGetItems} />
		</div>


	<!-- Shell Collection -->
	<ShellCollection 
		title="Kabbalistic Collection"
		{shells}
	/>

	<!-- How Shell Casting Works -->
	<HowShellCastingWorks 
		title="How Kabbalistic Works"
		videoPlaceholderImage="/closeup.jpg"
		{infoCards}
		onPlayClick={handlePlayVideo}
	/>

	<!-- FAQ -->
	<FAQ title="FAQ" faqs={kabbalisticFaqs} />

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
