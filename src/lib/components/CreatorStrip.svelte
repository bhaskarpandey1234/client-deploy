<script lang="ts">
  // Creator Proof Strip - Carousel of creator avatars with quotes
  const creators = [
    { name: "Sarah Chen", avatar: "👤", quote: "Helped me see patterns I was missing" },
    { name: "Marcus Jones", avatar: "👤", quote: "More specific than any reading before" },
    { name: "Elena Rodriguez", avatar: "👤", quote: "The timing was eerily accurate" },
    { name: "David Kim", avatar: "👤", quote: "Actually testable and practical" },
    { name: "Priya Sharma", avatar: "👤", quote: "Felt deeply personalized" },
    { name: "Alex Taylor", avatar: "👤", quote: "Gave me clarity in 60 seconds" }
  ];
</script>

<section class="section creator-strip">
  <div class="carousel">
    {#each creators as creator}
      <div class="proof-item">
        <div class="avatar">{creator.avatar}</div>
        <div class="content">
          <div class="name">{creator.name}</div>
          <div class="quote">"{creator.quote}"</div>
        </div>
      </div>
    {/each}
  </div>
</section>

<style>
  .creator-strip { padding: 48px 24px; overflow: hidden; }
  .carousel {
    display: flex;
    gap: 24px;
    animation: scroll 24s linear infinite;
    width: fit-content;
  }
  .proof-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    background: var(--glass);
    backdrop-filter: blur(20px);
    border: 1px solid #ffffff1f;
    border-radius: 12px;
    white-space: nowrap;
    min-width: 280px;

    
  }
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--panel);
    display: grid;
    place-items: center;
    font-size: 20px;
    flex-shrink: 0;
  }
  .name {
    font-weight: 600;
    font-size: 14px;
    color: var(--ink);
  }
  .quote {
    font-size: 13px;
    color: var(--muted);
  }
  @keyframes scroll {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  .carousel:hover { animation-play-state: paused; }

  .proof-item{
    border-radius: 13.639px;
border: 1.137px solid rgba(255, 255, 255, 0.12);
background: #FAEECE;
backdrop-filter: blur(11.366071701049805px);
  }
  .name{
    color: #2A2A2A;
font-family: Inter;
font-size: 15.685px;
font-style: normal;
font-weight: 700;
line-height: 23.869px; /* 152.174% */
  }
  .quote{
    color: #2A2A2A;
font-family: var(--font-family-Font-1, Inter);
font-size: 13.867px;
font-style: normal;
font-weight: var(--font-weight-400, 400);
line-height: 22.164px; /* 159.836% */
  }
</style>

