<script lang="ts">
    interface Shell {
      id: string;
      name: string;
      image: string;
    }
  
    export let title: string = 'Shell Collection';
    export let shells: Shell[] = [];
  </script>
  
  <section class="shell-collection">
    <h2 class="section-title">{title}</h2>
    <div class="shells-grid">
      {#each shells as shell (shell.id)}
        <div class="shell-card">
          <img src={shell.image || "/placeholder.svg"} alt={shell.name} class="shell-image" />
          <p class="shell-name">{shell.name}</p>
        </div>
      {/each}
    </div>
  </section>
  
  <style>
    .shell-collection {
      padding: 4rem 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
  
    .section-title {
      font-size: 2rem;
      font-weight: 700;
      color: white;
      margin-bottom: 3rem;
      letter-spacing: 1px;
    }
  
    .shells-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 3.5rem;
      margin-bottom: 2rem;
    }
  
    .shell-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
      transition: transform 0.3s ease;
    }
  
    .shell-card:hover {
      transform: translateY(-5px);
    }
  
    .shell-image {
      width: 140px;
      height: 140px;
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
  
    @media (max-width: 768px) {
      .shells-grid {
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 1rem;
      }
  
      .shell-image {
        width: 100px;
        height: 100px;
      }
  
      .section-title {
        font-size: 1.5rem;
      }
    }
  </style>
  