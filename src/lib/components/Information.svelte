<script lang="ts">
  import FAQ from "./FAQ.svelte";
import FooterMain from "./FooterMain.svelte";
import HeaderAsteria from "./HeaderAsteria.svelte";

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

	let isPlaying = false;

	function handlePlayClick(): void {
		isPlaying = !isPlaying;
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
	<section class="hero">
		<h1 class="hero-title">Panchang</h1>
		<div class="orb-container">
			<img src="/panch_logo.png" alt="image" class="orb" />
            
		</div>
		<button class="cast-button" aria-label="Cast Shells" onclick={() => {}}>CAST SHELLS</button>
		<div class="info-box">
			<p>Discover the ancient wisdom of shell casting divination</p>
		</div>
	</section>

	<!-- Shell Collection -->
	<section class="shell-collection">
		<h2 class="section-title">Shell Collection</h2>
		<div class="shells-grid">
			{#each shells as shell (shell.id)}
				<div class="shell-card">
					<img src={shell.image || "/placeholder.svg"} alt={shell.name} class="shell-image" />
					<p class="shell-name">{shell.name}</p>
				</div>
			{/each}
		</div>
	</section>

	<!-- How Shell Casting Works -->
	<section class="how-it-works">
		<h2 class="section-title">How Shell Casting Works</h2>
		<div class="video-container">
			<div class="video-placeholder">
				<button class="play-button" onclick={handlePlayClick} aria-label="Play video">
					<svg width="87" height="87" viewBox="0 0 87 87" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M43.5036 0.0595703C19.6513 0.0595703 0.3125 19.3984 0.3125 43.2506C0.3125 67.1029 19.6513 86.4417 43.5036 86.4417C67.3558 86.4417 86.6946 67.1029 86.6946 43.2506C86.6946 19.3984 67.3558 0.0595703 43.5036 0.0595703ZM64.1993 44.8127L31.806 63.5108C31.5288 63.6728 31.2157 63.7529 30.9062 63.7529C30.5966 63.7529 30.2835 63.6728 30.0064 63.5108C29.4485 63.1914 29.1065 62.5966 29.1065 61.9533V24.5453C29.1065 23.901 29.4485 23.3072 30.0064 22.9868C30.5606 22.6629 31.2517 22.6629 31.806 22.9868L64.1993 41.6814C64.7572 42.0089 65.0991 42.6028 65.0991 43.247C65.0991 43.8913 64.7572 44.4888 64.1993 44.8127Z" fill="#F3F3F3"/>
<path d="M32.7031 58.8356L59.6975 43.2508L32.7031 27.666V58.8356Z" fill="#F3F3F3"/>
</svg>

				</button>
			</div>
		</div>
		<div class="info-cards-grid">
			{#each infoCards as card (card.id)}
				<div class="info-card">
                    <h3>{@html card.image}</h3>
					<h3>{card.title}</h3>
					<p>{card.description}</p>
				</div>
			{/each}
		</div>
	</section>
	<!-- faq -->
	<FAQ/>
	<!-- Testimonials -->
	<section class="testimonials">
		<h2 class="section-title">Trusted by Seekers Worldwide</h2>
		<div class="testimonials-grid">
			{#each testimonials as testimonial (testimonial.id)}
				<div class="testimonial-card">
					<div style="display:flex; gap:10px;">
					<div class="testimonial-avatar"><p>👤</p></div>
					<div style="display: flex; flex-direction:column">
					<h3>{testimonial.name}</h3>
					<p class="testimonial-role">{testimonial.role}</p>
					</div>
					</div>
					<p>⭐⭐⭐⭐⭐</p>
					<p class="testimonial-text">{testimonial.text}</p>
				</div>
			{/each}
		</div>
	</section>

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

	 .header {
		background: rgba(10, 14, 39, 0.8);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid rgba(0, 255, 255, 0.1);
		padding: 1.5rem 2rem;
		position: sticky;
		top: 0;
		z-index: 100;
	}

	 .header-content {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	} 



	.nav-menu {
		display: flex;
		gap: 2rem;
	}

	.nav-menu a {
		color: #e8e4d9;
		text-decoration: none;
		font-size: 0.9rem;
		transition: color 0.3s ease;
	}

	.nav-menu a:hover {
		color: #00ffff;
	}

	/* Hero Section */
	.hero {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 4rem 2rem;
		text-align: center;
		min-height: 600px;
		margin-top: 65px;
	}

	.hero-title {
		font-size: 3.5rem;
		font-weight: 700;
		color: white;
		margin: 0 0 2rem 0;
		letter-spacing: 3px;
	}

	.orb-container {
		margin: 2rem 0;
		animation: float 3s ease-in-out infinite;
	}

	@keyframes float {
		0%, 100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-20px);
		}
	}

	.orb {
		width: 200px;
		height: 200px;
		border-radius: 50%;
		box-shadow: 0 0 60px rgba(255, 165, 0, 0.6), 0 0 100px rgba(255, 100, 0, 0.3);
		filter: drop-shadow(0 0 30px rgba(255, 165, 0, 0.4));
	}

	.cast-button {
		background: #EDB92E;
		color: #0a0e27;
		border: none;
		padding: 0.75rem 2rem;
		font-size: 0.9rem;
		font-weight: 700;
		border-radius: 50px;
		cursor: pointer;
		margin: 2rem 0;
		letter-spacing: 1px;
		transition: all 0.3s ease;
		box-shadow: 0 4px 15px rgba(255, 165, 0, 0.3);
	}

	.cast-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(255, 165, 0, 0.5);
	}

	.info-box {
		/* background: rgba(30, 40, 70, 0.6); */
		background: rgba(237, 234, 226, 0.10);
		border: 1px solid rgba(0, 255, 255, 0.2);
		border-radius: 8px;
		padding: 2rem;
		min-width: 60%;
		color: #b8b4a9;
		font-size: 0.95rem;
		line-height: 1.6;
		min-height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	/* Shell Collection */
	.shell-collection {
		padding: 4rem 2rem;
		max-width: 900px;
		margin: 0 auto;
	}

	.section-title {
		font-size: 2rem;
		font-weight: 700;
		color: white;
		/* text-align: center; */
		margin-bottom: 3rem;
		letter-spacing: 1px;
	}
    .how-it-works .section-title{
        text-align: center;
    }

	.shells-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.shell-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		cursor: pointer;
		transition: transform 0.3s ease;
	}

	.shell-card:hover {
		transform: translateY(-5px);
	}

	.shell-image {
		width: 120px;
		height: 120px;
		border-radius: 12px;
		object-fit: cover;
		border: 1px solid rgba(0, 255, 255, 0.2);
		transition: all 0.3s ease;
	}

	.shell-card:hover .shell-image {
		border-color: rgba(0, 255, 255, 0.5);
		box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
	}

	.shell-name {
		font-size: 0.85rem;
		color: #b8b4a9;
		margin: 0;
		text-align: center;
	}

	/* How It Works */
	.how-it-works {
		padding: 4rem 2rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	.video-container {
		margin: 3rem 0;
		display: flex;
		justify-content: center;
	}

	.video-placeholder {
		width: 100%;
		max-width: 600px;
		aspect-ratio: 16 / 9;
		background: linear-gradient(135deg, #1e2846cc, rgba(40, 50, 90, 0.8));
        background-image: url('/closeup.jpg'); 
		/* background: url('/closeup.jpg') lightgray 50% center/cover; */
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        /* background-color: lightgray; */
		/* border: 1px solid rgba(0, 255, 255, 0.2); */
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		overflow: hidden;
	}

	.video-placeholder::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: url('/placeholder.svg?height=400&width=600') center/cover;
		opacity: 0.3;
	}

	.play-button {
		background: none;
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform 0.3s ease;
		z-index: 2;
		position: relative;
	}

	.play-button:hover {
		transform: scale(1.1);
	}

	.info-cards-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
		margin-top: 3rem;
	}

	.info-card {
		background: linear-gradient(135deg, #FAEECE 0%, #e8dcc8 100%);
		color: #2a2a2a;
		padding: 2rem;
		border-radius: 12px;
		text-align: center;
		transition: all 0.3s ease;
	}

	.info-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	}

	.info-card h3 {
		font-size: 1.2rem;
		font-weight: 700;
		margin: 0 0 1rem 0;
		color: #1a1a1a;
	}

	.info-card p {
		font-size: 0.9rem;
		line-height: 1.6;
		margin: 0;
		color: #4a4a4a;
	}

	/* Testimonials */
	.testimonials {
		padding: 4rem 2rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	.testimonials-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(250px, 1fr));
		gap: 2rem;
	}

	.testimonial-card {
		background: linear-gradient(135deg, #f5e6d3 0%, #e8dcc8 100%);
		color: #2a2a2a;
		padding: 2rem;
		border-radius: 12px;
		/* text-align: center; */
		transition: all 0.3s ease;
		display: flex;
		flex-direction: column;
	}

	.testimonial-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	}

	.testimonial-avatar {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		/* background: linear-gradient(135deg, #00ffff, #0B0D14); */
		background-color: #0B0D14;
		/* margin: 0 auto 1rem; */
	}
	.testimonial-avatar p{
		text-align: center;
	}
	.testimonial-card h3 {
		font-size: 1rem;
		font-weight: 700;
		margin: 0 0 0.25rem 0;
		color: #1a1a1a;
	}

	.testimonial-role {
		font-size: 0.8rem;
		color: #666;
		margin: 0 0 1rem 0;
		font-weight: 500;
	}

	.testimonial-text {
		font-size: 0.9rem;
		line-height: 1.6;
		margin: 0;
		color: #4a4a4a;
	}

	/* Footer */
	.footer {
		background: rgba(10, 14, 39, 0.9);
		border-top: 1px solid rgba(0, 255, 255, 0.1);
		padding: 3rem 2rem 1rem;
		margin-top: 4rem;
	}

	.footer-content {
		max-width: 1200px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 2rem;
		margin-bottom: 2rem;
	}

	.footer-column h4 {
		color: #00ffff;
		font-size: 0.9rem;
		font-weight: 700;
		margin: 0 0 1rem 0;
		letter-spacing: 1px;
		text-transform: uppercase;
	}

	.footer-column ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.footer-column li {
		margin-bottom: 0.5rem;
	}

	.footer-column a {
		color: #b8b4a9;
		text-decoration: none;
		font-size: 0.85rem;
		transition: color 0.3s ease;
	}

	.footer-column a:hover {
		color: #00ffff;
	}

	.footer-bottom {
		text-align: center;
		padding-top: 2rem;
		border-top: 1px solid rgba(0, 255, 255, 0.1);
		color: #666;
		font-size: 0.8rem;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.hero-title {
			font-size: 2.5rem;
		}

		.orb {
			width: 150px;
			height: 150px;
		}

		.nav-menu {
			gap: 1rem;
			font-size: 0.8rem;
		}

		.shells-grid {
			grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
			gap: 1rem;
		}

		.shell-image {
			width: 100px;
			height: 100px;
		}

		.section-title {
			color:white;
			font-size: 1.5rem;
		}

		.info-cards-grid,
		.testimonials-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
