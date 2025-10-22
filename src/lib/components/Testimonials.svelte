<script lang="ts">
    interface Testimonial {
      id: string;
      name: string;
      role: string;
      text: string;
    }
  
    export let title: string = 'Trusted by Seekers Worldwide';
    export let testimonials: Testimonial[] = [];
  </script>
  
  <section class="testimonials">
    <h2 class="section-title">{title}</h2>
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
  
  <style>
    .testimonials {
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
      background-color: #0B0D14;
    }
  
    .testimonial-avatar p {
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
  
    @media (max-width: 768px) {
      .testimonials-grid {
        grid-template-columns: 1fr;
      }
  
      .section-title {
        font-size: 1.5rem;
      }
    }
  </style>
  