<script lang="ts">
  let name = '';
  let email = '';
  let message = '';
  let submitted = false;

  function handleSubmit() {
    submitted = true;
  }
</script>

<div class="contact-page">
  <h1>Contact Us</h1>
  <p class="subtitle">We'd love to hear from you</p>
  
  {#if !submitted}
    <form on:submit|preventDefault={handleSubmit} class="contact-form">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" bind:value={name} required />
      </div>
      
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" bind:value={email} required />
      </div>
      
      <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" bind:value={message} rows="6" required></textarea>
      </div>
      
      <button type="submit" class="submit-btn">Send Message</button>
    </form>
  {:else}
    <div class="success-message">
      <h2>Thank you for reaching out!</h2>
      <p>We'll get back to you soon.</p>
    </div>
  {/if}
</div>

<style>
  .contact-page {
    min-height: 100vh;
    padding: 120px 24px 80px;
    max-width: 600px;
    margin: 0 auto;
  }

  h1 {
    font-size: 3rem;
    text-align: center;
    background: linear-gradient(90deg, var(--destiny, #9C6CFF), var(--clarity, #30D5C8));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 16px;
  }

  .subtitle {
    text-align: center;
    color: var(--ink, #EDEBFF);
    opacity: 0.7;
    margin-bottom: 48px;
  }

  .contact-form {
    background: var(--panel, rgba(20, 17, 39, 0.98));
    border: 1px solid #ffffff1f;
    border-radius: 16px;
    padding: 32px;
  }

  .form-group {
    margin-bottom: 24px;
  }

  label {
    display: block;
    color: var(--ink, #EDEBFF);
    margin-bottom: 8px;
    font-weight: 500;
  }

  input, textarea {
    width: 100%;
    padding: 12px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid #ffffff22;
    border-radius: 8px;
    color: var(--ink, #EDEBFF);
    font-size: 15px;
  }

  input:focus, textarea:focus {
    outline: none;
    border-color: var(--clarity, #30D5C8);
  }

  .submit-btn {
    width: 100%;
    padding: 14px;
    background: linear-gradient(90deg, var(--destiny, #9C6CFF), var(--clarity, #30D5C8));
    border: none;
    border-radius: 8px;
    color: white;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .submit-btn:hover {
    transform: translateY(-2px);
  }

  .success-message {
    text-align: center;
    padding: 48px;
    background: var(--panel, rgba(20, 17, 39, 0.98));
    border: 1px solid #ffffff1f;
    border-radius: 16px;
  }

  .success-message h2 {
    color: var(--clarity, #30D5C8);
    margin-bottom: 16px;
  }

  .success-message p {
    color: var(--ink, #EDEBFF);
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
    
    .contact-form {
      padding: 24px;
    }
  }
</style>
