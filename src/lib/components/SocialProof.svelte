<script lang="ts">
  // Social Proof component with testimonials and stats
  export let variant: 'testimonials' | 'stats' | 'both' = 'both';

  const testimonials = [
    {
      name: "Sarah Chen",
      avatar: "👤",
      quote: "The shell casting felt deeply personal. The timing was eerily accurate - within 3 days everything aligned exactly as predicted.",
      role: "Creative Director",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      avatar: "👤", 
      quote: "I was skeptical but the insights were so specific. It helped me make a career decision I'd been struggling with for months.",
      role: "Software Engineer",
      rating: 5
    },
    {
      name: "Elena Kowalski",
      avatar: "👤",
      quote: "The ritual aspect makes it feel intentional, not like scrolling a feed. Each reading feels crafted just for me.",
      role: "Yoga Instructor",
      rating: 5
    },
    {
      name: "David Kim",
      avatar: "👤",
      quote: "Best $10 I've spent. The lucky timing windows alone paid for themselves when I closed a deal on the exact day suggested.",
      role: "Sales Manager",
      rating: 5
    }
  ];

  const stats = [
    { value: "4.8/5", label: "Average Rating", sublabel: "From 2,341 readings" },
    { value: "87%", label: "Accuracy Rate", sublabel: "Self-reported outcomes" },
    { value: "2,314", label: "This Week", sublabel: "Active rituals" },
    { value: "< 2 min", label: "Avg. Time", sublabel: "From question to insight" }
  ];

  function renderStars(rating: number) {
    return '⭐'.repeat(rating);
  }
</script>

<section class="social-proof">
  <h2 class="section-title">Trusted by Seekers Worldwide</h2>

  {#if variant === 'stats' || variant === 'both'}
    <div class="stats-row">
      {#each stats as stat}
        <div class="stat-item">
          <div class="stat-value">{stat.value}</div>
          <div class="stat-label">{stat.label}</div>
          <div class="stat-sublabel">{stat.sublabel}</div>
        </div>
      {/each}
    </div>
  {/if}

  {#if variant === 'testimonials' || variant === 'both'}
    <div class="testimonials-grid">
      {#each testimonials as testimonial}
        <div class="testimonial-card card">
          <div class="testimonial-header">
            <div class="avatar">{testimonial.avatar}</div>
            <div class="user-info">
              <div class="user-name">{testimonial.name}</div>
              <div class="user-role">{testimonial.role}</div>
            </div>
          </div>
          <div class="rating">{renderStars(testimonial.rating)}</div>
          <p class="quote">"{testimonial.quote}"</p>
        </div>
      {/each}
    </div>
  {/if}

  <div class="trust-badges">
    <div class="badge">🔒 Encrypted Readings</div>
    <!-- <div class="badge">↩️ 24h Refund Policy</div> -->
    <div class="badge">🌙 Traditional Methods</div>
    <div class="badge">✨ AI-Enhanced</div>
  </div>
</section>

<style>
  .social-proof {
    padding: 64px 24px;
    max-width: 1120px;
    margin: 0 auto;
  }

  .section-title {
    font-size: 40px;
    line-height: 48px;
    text-align: center;
    margin-bottom: 48px;
    color: var(--ink);
  }

  .stats-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    margin-bottom: 64px;
  }

  .stat-item {
    text-align: center;
    padding: 24px;
    background: var(--glass);
    backdrop-filter: blur(20px);
    border: 1px solid #ffffff1f;
    border-radius: var(--radius);
  }

  .stat-value {
    font-size: 36px;
    font-weight: 700;
    color: var(--clarity);
    line-height: 1;
    margin-bottom: 8px;
  }

  .stat-label {
    font-size: 16px;
    font-weight: 600;
    color: var(--ink);
    margin-bottom: 4px;
  }

  .stat-sublabel {
    font-size: 13px;
    color: var(--muted);
  }

  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    margin-bottom: 48px;
  }

  .testimonial-card {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .testimonial-header {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--panel);
    display: grid;
    place-items: center;
    font-size: 24px;
    flex-shrink: 0;
  }

  .user-info {
    flex: 1;
  }

  .user-name {
    font-weight: 600;
    color: var(--ink);
    font-size: 15px;
  }

  .user-role {
    font-size: 13px;
    color: var(--muted);
  }

  .rating {
    font-size: 14px;
    line-height: 1;
  }

  .quote {
    font-size: 15px;
    line-height: 1.6;
    color: var(--muted);
    margin: 0;
    font-style: italic;
  }

  .trust-badges {
    display: flex;
    justify-content: center;
    gap: 24px;
    flex-wrap: wrap;
  }

  .badge {
    padding: 8px 16px;
    background: var(--panel);
    border: 1px solid #ffffff22;
    border-radius: 20px;
    font-size: 14px;
    color: var(--ink);
  }

  @media (max-width: 768px) {
    .stats-row {
      grid-template-columns: repeat(2, 1fr);
    }

    .testimonials-grid {
      grid-template-columns: 1fr;
    }

    .trust-badges {
      gap: 12px;
    }
  }
</style>

