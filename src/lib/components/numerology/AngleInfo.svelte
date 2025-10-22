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

  const whatItIsContent = "Angel numbers are repeating or striking number patterns—111, 222, 1212, 1234—that many people notice at meaningful moments. At Asteria, we treat them as elegant pattern prompts: brief signals to pause, check context, and choose with precision. Instead of declaring fate, we map number families to decision language. Ones cue focus and initiation; twos—partnership and alignment; threes—expression and drafting; fours—structure and due diligence; fives—change and optionality; sixes—care and stewardship; sevens—analysis and reflection; eights—results and resources; nines—closure and release; zero—reset and potential. Repetition amplifies tone; mirrored sequences hint at mutuality; ladders (1234) suggest staged action.\n\nIn practice, you record what you saw and where (clock, receipt, mileage), then we translate it into a clean brief: strengths to lean into, cautions to respect, and a Now/Next/Avoid sequence. Time-of-day and timing windows (2–12 weeks) help execution. The point isn't to chase signs—it's to use attention wisely. Angel numbers become a shared language for timing, pacing, and accountability—premium, secular, and practical.";

  const whyItHelpsItems = [
    "Clarity on demand—turns a fleeting pattern into a decision cue.",
    "Sequencing you can execute—Now · Next · Avoid instead of vague advice.",
    "Shared language for teams—aligns focus, care, and pace without hype.",
    "Timing you can plan against—short windows that respect real constraints.",
    "Repeatable practice—log, interpret, act, review."
  ];

  const whatYouGetItems = [
    "A live decoder for core families (0–9), repeats (111–999), mirrors (121, 1221), and ladders (123, 1234).",
    "Plain‑language themes with strengths, cautions, and leverage points.",
    "Action cues for work/relationships/creativity mapped to 2–12 week windows.",
    "Patterns dashboard to spot streaks and blind spots over time.",
    "Journaling prompts and a minimalist ritual for focus and review."
  ];

  const angelFaqs = [
    {
      question: "Is this predictive?",
      answer: "No. We don't forecast fate. We use number patterns as attention triggers that translate into practical context and timing."
    },
    {
      question: "What if I rarely see patterns?",
      answer: "Use manual prompts (set a two‑hour check). The value is in reflection and execution, not in volume."
    },
    {
      question: "Are certain numbers \"good\" or \"bad\"?",
      answer: "We avoid superstition. Each family carries strengths and cautions; context decides the move."
    },
    {
      question: "What about 11, 22, 33 (master tones)?",
      answer: "We treat doubles as emphasis—clarity (11), build (22), synthesis (33)—without fatalism."
    },
    {
      question: "Does time or place matter?",
      answer: "Sometimes. We log time-of-day and context to tailor actions (e.g., 444 near a contract ≠ 444 during training)."
    },
    {
      question: "Can teams use this?",
      answer: "Yes. It becomes a lightweight check‑in language—clean, respectful, and outcome‑oriented."
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
		title="Angel Numbers"
		logoImage="/angle.png"
		buttonText="DECODE YOUR NUMBERS"
		description="From pattern to plan in minutes—signals, not superstition"
		onButtonClick={handleCastShells}
	/>

		<div class="info-wrapper">
			<WhatItIs title="What it is" subtitle="Signals, not superstition." content={whatItIsContent} />
			<WhyItHelps title="Why it helps" subtitle="Because attention is scarce." items={whyItHelpsItems} />
		</div>


	<!-- Shell Collection -->
	<!-- <ShellCollection 
		title="Angel Numbers Collection"
		{shells}
	/> -->

	<!-- How Shell Casting Works -->
	<HowShellCastingWorks 
		title="How Angel Numbers Works"
		videoPlaceholderImage="/closeup.jpg"
		{infoCards}
		onPlayClick={handlePlayVideo}
	/>

	<WhatYouGet title="What you get" subtitle="A live decoder for 0–9 and repeats." items={whatYouGetItems} />

	<!-- FAQ -->
	<FAQ title="FAQ" faqs={angelFaqs} />

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
