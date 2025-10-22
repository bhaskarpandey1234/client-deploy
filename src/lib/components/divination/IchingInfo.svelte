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

  const whatItIsContent = "The Yijing (I‑Ching) is a 64‑pattern system for reading change. Each pattern—called a hexagram—is built from two trigrams stacked into six lines. In practice you pose a focused question, cast six lines (traditionally with coins or yarrow stalks), and receive: a primary hexagram that names the current posture, any changing lines that show where movement is already happening, and a relating hexagram that frames direction.\n\nAsteria treats the text as operating language—constraints to respect, leverage to apply, and a sequence that reduces drag. We map Judgment, Image, and the relevant line statements into a concise brief: what is stable, what wants to move, what to test next, and where timing and alliances change the odds. The cast is not an omen; it is a structured conversation with change.\n\nWe default to the three‑coin method for speed and reproducibility; the yarrow‑stalk method is available for ceremonial depth. Readings are secular and decision‑literate: pattern over prophecy, clarity over drama. The goal is elegant guidance you can apply to launches, negotiations, creative work, or recovery routines—without jargon.";

  const whyItHelpsItems = [
    "Strategic clarity—turn ambiguity into a one‑page decision brief.",
    "Sequencing you can execute—now / next / avoid.",
    "Timing intelligence—short windows that respect real constraints.",
    "Stakeholder insight—roles and frictions mapped via Image/lines.",
    "Repeatable practice—same spread, comparable results over time."
  ];

  const whatYouGetItems = [
    "Your Primary Hexagram with a plain‑language theme and posture.",
    "Changing‑line analysis prioritized into strengths, risks, and levers.",
    "Relating Hexagram as direction (what's emerging / where to aim).",
    "Action cues: Now · Next · Avoid, with a 2–12 week timing horizon.",
    "Compatibility/collaboration notes and a minimalist ritual (optional)."
  ];

  const ichingFaqs = [
    {
      question: "Is this predictive?",
      answer: "No. We translate pattern into practical context and timing so you can choose with confidence."
    },
    {
      question: "Coins or yarrow—what's the difference?",
      answer: "Coins are fast and reproducible; yarrow stalks are slower and more ceremonial. Both are valid; the method doesn't change the integrity of the brief."
    },
    {
      question: "What do changing lines mean?",
      answer: "They indicate where movement or pressure already exists. We weigh each line, then synthesize it into actions and cautions."
    },
    {
      question: "How often should I consult the Yijing?",
      answer: "Use it for key decisions or a weekly focus. Avoid repeated casts on the same question in a short window—act, then revisit."
    },
    {
      question: "Do I need to study the classic text first?",
      answer: "No. We provide clear, modern language and cite the relevant passages for depth."
    },
    {
      question: "Does this replace professional advice?",
      answer: "No. It's a context tool—not medical, legal, or financial counsel."
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

	function handleIching(): void {
		goto('/asteria/divination/i-ching/experience');
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
		title="I Ching"
		logoImage="/iching.png"
		buttonText="CAST YOUR HEXAGRAM"
		description="Change, made legible—pattern over prophecy"
		onButtonClick={handleIching}
	/>

		<div class="info-wrapper">
			<WhatItIs title="What it is" subtitle="Change, made legible." content={whatItIsContent} />
			<WhyItHelps title="Why it helps" subtitle="Because sequencing changes outcomes." items={whyItHelpsItems} />
		</div>


	<!-- Shell Collection -->
	<!-- <ShellCollection 
		title="I Ching Collection"
		{shells}
	/> -->

	<!-- How Shell Casting Works -->
	<HowShellCastingWorks 
		title="How I Ching Works"
		videoPlaceholderImage="/closeup.jpg"
		{infoCards}
		onPlayClick={handlePlayVideo}
	/>

	<WhatYouGet title="What you get" subtitle="Primary · Lines · Relating—distilled." items={whatYouGetItems} />

	<!-- FAQ -->
	<FAQ title="FAQ" faqs={ichingFaqs} />

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
