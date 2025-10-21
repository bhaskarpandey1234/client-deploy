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

  const whatItIsContent = "Chinese numerology—our Asteria read—is a practical synthesis of three threads: (1) the Lo Shu 3×3 matrix (numbers 1–9 placed as a pattern), (2) the Five Elements lens used in many Feng‑Shui/Flying‑Star lineages (1=Water; 2,5,8=Earth; 3–4=Wood; 6–7=Metal; 9=Fire), and (3) sound symbolism (homophones) that shape cultural preferences (e.g., 8≈prosper, 6≈smooth, 9≈enduring; 4 can echo \"death\" in some dialects). We treat these as decision language—clarity for naming, timing, and placement—without superstition.\n\nYour profile blends a birth‑date signature (digital roots and Lo‑Shu counts), an element balance (which numbers/elements are emphasized or missing), and context‑aware number combinations for brands, rooms, or addresses. Repeats (888), ladders (1234), and mirrors (1221) are read as tone, not fate. Schools differ; we document the mapping we use and note alternatives where useful. The aim is elegant guidance you can execute—launch windows, collaboration cues, and small placement tweaks that reduce drag.";

  const whyItHelpsItems = [
    "Strategic clarity—turn number patterns into a one‑page decision brief.",
    "Naming & placement—context for brand handles, room numbering, and addresses.",
    "Timing you can plan against—short windows keyed to element emphasis and repeats.",
    "Partnership intelligence—complementary vs. catalytic element/number mixes.",
    "Premium synthesis—Lo Shu × Five Elements × sound symbolism, expressed cleanly."
  ];

  const whatYouGetItems = [
    "Birth‑date signature: day number, full‑date root, and Lo‑Shu grid counts.",
    "Element balance chart (Water/Wood/Fire/Earth/Metal) with strengths and gaps.",
    "Guidance on repeats, ladders, mirrors (e.g., 168, 888, 1314) in professional, personal, and space contexts.",
    "Action plan: Now · Next · Avoid with a 2–12‑week horizon.",
    "Optional: brand/name/room/phone number ideas with trade‑offs—not prescriptions."
  ];

  const chineseNumerologyFaqs = [
    {
      question: "Is 4 always inauspicious?",
      answer: "No. Meanings vary by dialect and context. We avoid fatalism; 4 can anchor structure in certain placements. We explain when and why."
    },
    {
      question: "Which mapping do you use for elements?",
      answer: "A Flying‑Star‑influenced mapping (1=Water; 2,5,8=Earth; 3–4=Wood; 6–7=Metal; 9=Fire). If your lineage differs, we'll note it."
    },
    {
      question: "Is this the same as Western or Chaldean numerology?",
      answer: "Different lens and letter values. We treat Chinese numerology as its own framework and can show where it complements other systems."
    },
    {
      question: "Do I need to change my address or phone?",
      answer: "Never required. We offer optional alternatives and ways to soften friction with layout, timing, or ritual."
    },
    {
      question: "What about popular codes like 520/1314?",
      answer: "We label modern homophone slang (e.g., 520≈\"I love you,\" 1314≈\"all life long\") as cultural flavor, secondary to core element logic."
    },
    {
      question: "Is this predictive?",
      answer: "No. It's context for timing and placement so you can decide with confidence."
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
		title="Chinese"
		logoImage="/chineseN.png"
		buttonText="GET YOUR READING"
		description="Lo Shu × Five Elements × Sound—pattern over prophecy"
		onButtonClick={handleCastShells}
	/>

		<div class="info-wrapper">
			<WhatItIs title="What it is" subtitle="Lo Shu × Five Elements × Sound." content={whatItIsContent} />
			<WhyItHelps title="Why it helps" subtitle="Because placement and timing shape outcomes." items={whyItHelpsItems} />
			<WhatYouGet title="What you get" subtitle="Your birth‑date signature at a glance." items={whatYouGetItems} />
		</div>


	<!-- Shell Collection -->
	<ShellCollection 
		title="Chinese Collection"
		{shells}
	/>

	<!-- How Shell Casting Works -->
	<HowShellCastingWorks 
		title="How Chinese Works"
		videoPlaceholderImage="/closeup.jpg"
		{infoCards}
		onPlayClick={handlePlayVideo}
	/>

	<!-- FAQ -->
	<FAQ title="FAQ" faqs={chineseNumerologyFaqs} />

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
