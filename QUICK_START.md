# Paywall Quick Start

## 🚀 Get Running in 5 Steps

### 1. Install
```bash
npm install
```

### 2. Environment Variables
Create `.env` with:
```bash
STRIPE_SECRET_KEY=sk_test_YOUR_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET
STRIPE_PRICE_ID=price_YOUR_PRICE
RESEND_API_KEY=re_YOUR_KEY
FROM_EMAIL=readings@yourdomain.com
SITE_URL=http://localhost:8888
```

### 3. Test Locally
```bash
# Terminal 1
netlify dev

# Terminal 2 (for webhook testing)
stripe listen --forward-to localhost:8888/webhooks/stripe
```

### 4. Test Flow
1. Go to http://localhost:8888/asteria/divination/runes/experience
2. Fill form with email
3. Click "Get reading summary"
4. Click "Pay to unlock"
5. Use test card: `4242 4242 4242 4242`
6. Check email for unlock link

### 5. Deploy
```bash
npm run build
```

Add environment variables in Netlify dashboard, then deploy.

## 📋 Checklist

**Stripe Setup:**
- [ ] Create product & price
- [ ] Copy `price_...` ID
- [ ] Add webhook endpoint
- [ ] Copy webhook secret

**Resend Setup:**
- [ ] Sign up & verify domain
- [ ] Create API key
- [ ] Set FROM_EMAIL

**Netlify Setup:**
- [ ] Add all environment variables
- [ ] Deploy site
- [ ] Test production webhook

## 🔗 Key URLs
- Stripe Dashboard: https://dashboard.stripe.com
- Resend Dashboard: https://resend.com/dashboard
- Netlify Functions: https://app.netlify.com/sites/YOUR_SITE/functions

## 💡 Quick Tips
- Use Stripe test mode during development
- Check Netlify function logs for debugging
- Webhook secret is different for test vs live mode
- Email domain must be verified in Resend
