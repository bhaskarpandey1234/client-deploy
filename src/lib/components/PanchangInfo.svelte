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

  const whatItIsContent = "Panchang is a timing framework—an almanac of the day—used to read context before you act. Classic Panchang considers five limbs: Tithi (lunar day), Nakshatra (lunar mansion), Yoga (Sun–Moon blend), Karana (half‑step of a Tithi), and Vaar (weekday). These five describe mood, pace, and the kinds of actions that move cleanly. For practical planning we pair Panchang with Sunrise/Sunset, Choghadiya (quality segments across day and night), and two well‑known markers: Abhijit Muhurta (a brief midday \"green light\" around local solar noon) and Rahukalam (a caution window).\n\nAsteria treats Panchang as design language—not superstition. We translate the day's pattern into a concise brief: what to advance, what to stabilize, and what to defer. The emphasis is execution—timing windows you can put on a calendar, paired with clear cues for launches, negotiations, creative work, or recovery. Everything is localized to your location and time zone.\n\nThe result is context you can act on: a premium, secular read on momentum that respects lunar cadence and daylight boundaries.";

  const whyItHelpsItems = [
    "Strategic timing—short windows that reduce friction and improve hit rate.",
    "Operational clarity—favorable · neutral · challenging slots mapped to a schedule.",
    "Decision language—strengths, cautions, and next moves rather than vague advice.",
    "Stakeholder awareness—pair timing notes with roles and dependencies.",
    "Repeatable practice—daily glance, weekly plan, quarterly review."
  ];

  const whatYouGetItems = [
    "Today at a glance: Tithi, Nakshatra, Yoga, Karana, Vaar; Sunrise/Sunset.",
    "Day & Night Choghadiya bars with favorable/neutral/challenging segments.",
    "Abhijit Muhurta (midday green‑light) and Rahukalam/Yamagandam (caution) derived from local solar time.",
    "Action cues: Now · Next · Avoid for work, communication, travel, and launch windows (2–12 week horizon).",
    "Compatibility/coordination notes for teams across locations; minimalist ritual to anchor intent."
  ];

  const panchangFaqs = [
    {
      question: "What exactly is Panchang?",
      answer: "A five‑factor day map—Tithi, Nakshatra, Yoga, Karana, Vaar—used to understand mood and pacing before you choose timing."
    },
    {
      question: "Why do I need location and time zone?",
      answer: "Sunrise, sunset, and segment windows depend on place. We localize everything to your coordinates and offset."
    },
    {
      question: "What is Abhijit Muhurta?",
      answer: "A short auspicious window centered around local solar noon. We compute it from your location's solar time."
    },
    {
      question: "What is Rahukalam (and Yamagandam)?",
      answer: "Cautionary periods within the day. We flag them so you can pad risk or choose another slot."
    },
    {
      question: "How does Choghadiya help?",
      answer: "It divides day and night into quality segments so you can place tasks into supportive windows."
    },
    {
      question: "Is this fortune‑telling?",
      answer: "No. It's context for planning—pattern over prophecy."
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
		title="Panchang"
		logoImage="/panch_logo.png"
		buttonText="READ THE STARS"
		description="Five limbs, one clear brief—timing you can schedule"
		onButtonClick={handleCastShells}
	/>

		<div class="info-wrapper">
			<WhatItIs title="What it is" subtitle="Time, designed for decisions." content={whatItIsContent} />
			<WhyItHelps title="Why it helps" subtitle="Because timing decides outcomes." items={whyItHelpsItems} />
		</div>


	<!-- Shell Collection -->
	<!-- <ShellCollection 
		title="Panchang Collection"
		{shells}
	/> -->

	<!-- How Shell Casting Works -->
	<HowShellCastingWorks 
		title="How Panchang Works"
		videoPlaceholderImage="/closeup.jpg"
		{infoCards}
		onPlayClick={handlePlayVideo}
	/>

	<WhatYouGet title="What you get" subtitle="Today's Panchang, distilled." items={whatYouGetItems} />

	<!-- FAQ -->
	<FAQ title="FAQ" faqs={panchangFaqs} />

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
