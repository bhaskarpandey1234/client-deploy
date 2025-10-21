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

  const whatItIsContent = "Palmistry—chiromancy—is a structured study of the hands as a living map of tendencies, attention, and pacing. Asteria uses a modern, non‑predictive method. We examine: hand shape and proportions (strategy and tempo), mount tone and texture (resource emphasis), finger set and flexibility (communication and drive), and the major lines—Life, Head, Heart, and Fate—with their depth, continuity, branches, and intersections. We read both hands: the dominant hand for current expression under choice and pressure; the non‑dominant as a baseline pattern. Lines evolve with use; change is part of the evidence.\n\nYour question frames the reading. We translate features into a decision design: where you hold tension versus flow, how you process complexity, what motivates commitment, and what drains momentum. Ambiguities (breaks, islands, crossings) are treated as nuance about pacing and context—never doom. Timing is expressed as relative windows (near, mid, long) grounded in the stability or volatility of features, not fixed dates. The result is a concise brief you can apply to launches, roles, communication, and recovery routines.\n\nPattern over prophecy; clarity over drama.";

  const whyItHelpsItems = [
    "Strategic clarity fast—turn complex cues into a one‑page brief.",
    "Actionable language—strengths, cautions, and concrete next moves.",
    "Timing intelligence—windows for go / steady / pause based on feature stability.",
    "Stakeholder insight—finger set and court‑style roles guide collaboration.",
    "Repeatable method—photographic baselines let you track change over time."
  ];

  const whatYouGetItems = [
    "A calibrated scan of hand shape, mounts, finger set, and the major lines (Life, Head, Heart, Fate).",
    "Strengths, blind spots, and leverage points tied to your question.",
    "Now / Next / Avoid actions with timing windows (weeks, quarter, season).",
    "Collaboration cues (communication style, decision pace, recovery needs).",
    "A minimalist daily ritual and a photographic baseline to revisit."
  ];

  const palmistryFaqs = [
    {
      question: "Which hand do you read?",
      answer: "Both. The dominant hand reflects current expression under choice and pressure; the non‑dominant shows baseline tendencies."
    },
    {
      question: "Do lines predict lifespan?",
      answer: "No. The Life line describes vitality, recovery, and pacing—not length of life."
    },
    {
      question: "Do hands change?",
      answer: "Yes. Skin tone, line depth, and small branches can evolve with stress, use, and recovery—change is meaningful signal."
    },
    {
      question: "Is this fortune‑telling?",
      answer: "No. We translate pattern into context and timing so you can decide with confidence."
    },
    {
      question: "Can you read from photos?",
      answer: "Yes. Clear, natural‑light photos of both hands (palms and backs) allow a solid reading; in‑person adds texture and warmth."
    },
    {
      question: "Medical or legal advice?",
      answer: "Palmistry is a reflective tool, not a substitute for medical, legal, or financial counsel."
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
		title="Palmistry"
		logoImage="/palmistry.png"
		buttonText="GET YOUR READING"
		description="Your hands, as a living brief—pattern, not prophecy"
		onButtonClick={handleCastShells}
	/>

		<div class="info-wrapper">
			<WhatItIs title="What it is" subtitle="Your hands, as a living brief." content={whatItIsContent} />
			<WhyItHelps title="Why it helps" subtitle="Because timing changes outcomes." items={whyItHelpsItems} />
			<WhatYouGet title="What you get" subtitle="A one‑page hand map for decisions." items={whatYouGetItems} />
		</div>


	<!-- Shell Collection -->
	<ShellCollection 
		title="Palmistry Collection"
		{shells}
	/>

	<!-- How Shell Casting Works -->
	<HowShellCastingWorks 
		title="How Palmistry Works"
		videoPlaceholderImage="/closeup.jpg"
		{infoCards}
		onPlayClick={handlePlayVideo}
	/>

	<!-- FAQ -->
	<FAQ title="FAQ" faqs={palmistryFaqs} />

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
