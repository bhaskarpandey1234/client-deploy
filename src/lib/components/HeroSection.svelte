<script lang="ts">
    export let title: string = 'Panchang';
    export let logoImage: string = '/panch_logo.png';
    export let buttonText: string = 'CAST SHELLS';
    export let description: string = 'Discover the ancient wisdom of shell casting divination';
    export let onButtonClick: () => void = () => {};
  </script>
  
  <section class="hero">
    <h1 class="hero-title">{title}</h1>
    <div class="orb-container">
      <img src={logoImage} alt={title} class="orb" />
    </div>
    <button class="cast-button" aria-label={buttonText} on:click={onButtonClick}>
      {buttonText}
    </button>
    <!-- <div class="info-box">
      <p>{description}</p>
    </div> -->
  </section>
  
  <style>
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
      /* animation: float 3s ease-in-out infinite; */
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
      /* box-shadow: 0 0 60px rgba(255, 165, 0, 0.6), 0 0 100px rgba(255, 100, 0, 0.3); */
      /* filter: drop-shadow(0 0 30px rgba(255, 165, 0, 0.4)); */
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
  
    @media (max-width: 768px) {
      .hero-title {
        font-size: 2.5rem;
      }
  
      .orb {
        width: 150px;
        height: 150px;
      }
    }
  </style>
  