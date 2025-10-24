# Paywall Integration Setup Guide

## Overview
This paywall system allows users to:
1. Fill out a reading form (with required email)
2. See a 1-2 sentence summary
3. Pay via Stripe Checkout to unlock the full reading
4. Receive a unique tokenized link via email
5. View the full reading on a separate page

## Architecture
- **Frontend**: Svelte pages with form submission
- **Backend**: Netlify Functions for API endpoints
- **Storage**: Netlify Blobs for readings and tokens
- **Payment**: Stripe Checkout + Webhooks
- **Email**: Resend API

## Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and fill in:

```bash
# Stripe (get from https://dashboard.stripe.com)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID=price_...

# Resend (get from https://resend.com)
RESEND_API_KEY=re_...
FROM_EMAIL=Asteria <readings@yourdomain.com>

# Site URL
SITE_URL=https://asteria-guide.netlify.app
```

### 3. Stripe Setup

#### Create a Product & Price
1. Go to https://dashboard.stripe.com/products
2. Create a new product (e.g., "Runes Reading")
3. Set a price (e.g., $9.99)
4. Copy the `price_...` ID to `STRIPE_PRICE_ID`

#### Setup Webhook
1. Go to https://dashboard.stripe.com/webhooks
2. Add endpoint: `https://YOUR_DOMAIN/webhooks/stripe`
3. Subscribe to event: `checkout.session.completed`
4. Copy the signing secret to `STRIPE_WEBHOOK_SECRET`

### 4. Resend Setup
1. Sign up at https://resend.com
2. Verify your sending domain
3. Create an API key
4. Add to `RESEND_API_KEY`

### 5. Deploy to Netlify
```bash
npm run build
```

Set environment variables in Netlify:
- Site Settings → Environment Variables
- Add all variables from `.env`

## File Structure

```
netlify/functions/
├── create-reading.js          # Generate & store reading, return summary
├── create-checkout-session.js # Create Stripe payment session
├── stripe-webhook.js          # Handle payment completion, send email
└── reading.js                 # Serve unlocked reading page

src/server/
└── generateReading.js         # Server-side reading generation logic

src/routes/asteria/
├── thanks/+page.svelte        # Post-payment thank you page
└── divination/runes/experience/+page.svelte  # Updated with paywall
```

## Flow

### User Journey
1. User fills form with email (required)
2. Clicks "Get reading summary"
3. Backend generates full reading, stores it, returns summary only
4. User sees summary + "Pay to unlock" button
5. Clicks button → redirected to Stripe Checkout
6. Completes payment
7. Stripe webhook fires → marks reading as paid → sends email with unlock link
8. User clicks link → sees full reading on separate page

### API Endpoints
- `POST /.netlify/functions/create-reading` - Generate reading
- `POST /.netlify/functions/create-checkout-session` - Start payment
- `POST /webhooks/stripe` - Stripe webhook (fulfillment)
- `GET /reading/{token}` - View unlocked reading

## Testing Locally

### 1. Start Dev Server
```bash
netlify dev
```

### 2. Test Stripe Webhooks
In a separate terminal:
```bash
stripe listen --forward-to localhost:8888/webhooks/stripe
```

Use test card: `4242 4242 4242 4242`

## Extending to Other Categories

### Add Palmistry/I-Ching
1. Update `src/server/generateReading.js`:
   ```js
   case 'palmistry':
     return generatePalmistryReading(inputs);
   ```

2. Copy the runes experience page pattern:
   - Add email field
   - Change `category: 'palmistry'`
   - Call same API endpoints

3. (Optional) Add category-specific pricing:
   ```bash
   STRIPE_PRICE_ID_PALMISTRY=price_...
   ```

## Security Notes
- Readings are stored server-side only
- Tokens are 64-character random hex (unguessable)
- Payment verification via Stripe webhook signature
- Email required for all readings

## Troubleshooting

### "Email is required" error
- Ensure email field has `required` attribute
- Check email is being sent in API call

### Webhook not firing
- Verify webhook URL in Stripe dashboard
- Check `STRIPE_WEBHOOK_SECRET` is correct
- Use `stripe listen` for local testing

### Email not received
- Check spam folder
- Verify `FROM_EMAIL` domain is verified in Resend
- Check Netlify function logs

### Reading not unlocking
- Verify payment completed in Stripe dashboard
- Check webhook fired successfully
- Verify token in URL matches stored token

## Support
For issues, check:
- Netlify function logs
- Stripe dashboard events
- Browser console for frontend errors
