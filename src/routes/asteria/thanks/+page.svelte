<script>
  import FooterMain from '$lib/components/FooterMain.svelte';
</script>

<div class="wrap">
  <main>
    <h1>Thank You!</h1>
    <p>Payment received. Your full reading link is on its way to <strong>your email</strong>.</p>
    <p>If you don't see it in a minute, check your spam folder.</p>
    <a href="/asteria" class="btn">Return to Asteria</a>
  </main>
</div>
<FooterMain/>

<style>
  .wrap { max-width: 680px; margin: 4rem auto; padding: 20px; font-family: system-ui; }
  main { background: #11151a; border: 1px solid #1f2630; border-radius: 14px; padding: 40px; text-align: center; }
  h1 { color: #7c6cff; margin: 0 0 20px; }
  p { color: #e9ecf1; line-height: 1.6; margin: 16px 0; }
  .btn { display: inline-block; margin-top: 20px; padding: 12px 24px; background: linear-gradient(135deg, #7c6cff, #38d9a9); color: #0c0d10; text-decoration: none; border-radius: 10px; font-weight: 600; }
  .btn:hover { transform: translateY(-1px); }
</style>
