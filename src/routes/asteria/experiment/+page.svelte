    <script lang="ts">
    // path inside /static — adjust if you put the image elsewhere
    const heroImage = '/hero_img.png';
    </script>

    <section class="hero" aria-label="Hero">
    <!-- Background image spans entire hero -->
    <img class="hero__bg" src={heroImage} alt="A person at a table with candles" />

    <!-- gradient overlay to darken the right area for text readability -->
    <div class="hero__gradient" aria-hidden="true"></div>

    <!-- content sits above the image -->
    <div class="hero__content">
        <h1 class="hero__title">Not a chatbot. A 60-second ritual.</h1>
        <p class="hero__subtitle">
        Turn your question into a clear plan—personal, specific, and calm.
        </p>

        <div class="hero__actions">
        <button class="btn btn--primary">Start Your Ritual</button>
        <button class="btn btn--outline">Watch 20s Demo</button>
        </div>
    </div>
    </section>

    <style>
    :global(html, body) {
        margin: 0;
        padding: 0;
    }

    .hero {
        position: relative;
        width: 100%;
        height: clamp(420px, 52vh, 660px); /* responsive height */
        overflow: hidden;
        display: flex;
        align-items: center;
        /* optional page background similar to screenshot (dark textured) */
        background-color: #071019;
    }

    /* background image fills the whole hero area */
    .hero__bg {
        position: absolute;
        inset: 0; /* top:0; right:0; bottom:0; left:0 */
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center left; /* keep left subject visible */
        z-index: 0;
        transform-origin: center;
    }

    /* gradient overlay to darken the right side where text sits */
    .hero__gradient {
        position: absolute;
        inset: 0;
        z-index: 1;
        background: linear-gradient(
        90deg,
        rgba(7, 8, 12, 0.12) 0%,
        rgba(7, 8, 12, 0.4) 40%,
        rgba(7, 8, 12, 0.85) 100%
        );
        pointer-events: none;
    }

    /* content container aligned to the right and above the image */
    .hero__content {
        position: relative;
        z-index: 2;
        margin-left: auto; /* push to right side */
        width: min(64rem, 55%); /* control how far left content reaches */
        padding: 2.5rem 4rem;
        color: #fff;
        text-align: right; /* matches screenshot where text is flush-right */
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
    }

    /* large serif title; you can add a font import in app.html for a nicer font */
    .hero__title {
        margin: 0;
        font-family: "Playfair Display", ui-serif, Georgia, "Times New Roman", serif;
        font-weight: 400;
        color: #fff;
        line-height: 0.95;
        /* scale nicely on different sizes */
        font-size: clamp(2.6rem, 6vw, 6.2rem);
        letter-spacing: -0.02em;
    }

    .hero__subtitle {
        margin: 0;
        max-width: 40ch;
        margin-inline-start: auto; /* keep subtitle narrower on the right */
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
        font-size: clamp(1rem, 1.25vw, 1.25rem);
        color: #e6e6e6;
    }

    .hero__actions {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        margin-top: 0.5rem;
    }

    .btn {
        cursor: pointer;
        border: none;
        padding: 0.85rem 1.3rem;
        border-radius: 28px;
        font-weight: 600;
        font-size: 0.98rem;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
    }

    .btn--primary {
        background: #f1b92d; /* warm yellow */
        color: #0c0c0c;
        box-shadow: 0 6px 16px rgba(241,185,45,0.18);
    }

    .btn--primary:hover {
        transform: translateY(-2px);
    }

    .btn--outline {
        background: transparent;
        color: #fff;
        border: 1.5px solid rgba(255,255,255,0.55);
    }

    .btn--outline:hover {
        background: rgba(255,255,255,0.04);
    }

    /* Responsive: on small screens stack and center */
    @media (max-width: 880px) {
        .hero__content {
        width: 92%;
        padding: 1.5rem;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        }
        .hero__subtitle {
        margin-inline-start: 0;
        max-width: 70ch;
        }
        .hero__actions {
        justify-content: center;
        flex-wrap: wrap;
        }
    }
    </style>