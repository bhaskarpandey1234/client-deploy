# Paywall Deployment Checklist

## Pre-Deployment

### 1. Environment Variables
Set in Netlify dashboard (Site Settings → Environment Variables):

```bash
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID=price_...
RESEND_API_KEY=re_...
FROM_EMAIL=Asteria <readings@yourdomain.com>
SITE_URL=https://asteria-guide.netlify.app
READING_TTL_DAYS=15
ADMIN_API_KEY=your-long-random-string
RESEND_MIN_GAP_MINUTES=5
RESEND_MAX_PER_DAY=3
```

### 2. Stripe Setup
- [ ] Create product & price in Stripe dashboard
- [ ] Copy `price_...` ID to `STRIPE_PRICE_ID`
- [ ] Add webhook: `https://YOUR_DOMAIN/webhooks/stripe`
- [ ] Subscribe to: `checkout.session.completed`
- [ ] Copy webhook signing secret to `STRIPE_WEBHOOK_SECRET`

### 3. Resend Setup
- [ ] Sign up at resend.com
- [ ] Verify sending domain
- [ ] Create API key
- [ ] Add to `RESEND_API_KEY`

## Deployment

### 4. Build & Deploy
```bash
npm install
npm run build
git push origin main
```

### 5. Post-Deploy Verification
- [ ] Visit site and test runes experience page
- [ ] Submit form with test email
- [ ] Verify summary displays (not full reading)
- [ ] Click "Pay to unlock"
- [ ] Complete test payment (card: 4242 4242 4242 4242)
- [ ] Check email received with unlock link
- [ ] Click link → verify full reading displays
- [ ] Check expiry date shown

### 6. Test Resend Feature
- [ ] Use "Resend my link" form
- [ ] Verify email received
- [ ] Try rapid resends → should hit rate limit

### 7. Test TTL
- [ ] Set `READING_TTL_DAYS=0` temporarily
- [ ] Create reading → should expire immediately
- [ ] Open link → should show "410 Link expired"
- [ ] Reset to `READING_TTL_DAYS=15`

### 8. Test Admin Endpoint
```bash
# List readings
curl -H "Authorization: Bearer YOUR_KEY" https://YOUR_DOMAIN/api/admin-readings

# Retarget email
curl -X POST https://YOUR_DOMAIN/api/admin-readings \
  -H "Authorization: Bearer YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"action":"retarget","id":"READING_ID","newEmail":"new@example.com"}'

# Delete reading
curl -X DELETE "https://YOUR_DOMAIN/api/admin-readings?id=READING_ID" \
  -H "Authorization: Bearer YOUR_KEY"
```

## Security Checklist

- [ ] All secrets in environment variables
- [ ] robots.txt blocks /reading/ URLs
- [ ] Security headers on reading page
- [ ] Webhook signature verification enabled
- [ ] Admin endpoint requires API key
- [ ] Email enumeration prevented (neutral responses)

## Production Readiness

- [ ] Switch Stripe to live mode
- [ ] Update webhook URL to production
- [ ] Test with real payment (small amount)
- [ ] Monitor Netlify function logs
- [ ] Check email delivery rates
- [ ] Verify cleanup job runs daily

## Monitoring

Track these metrics:
- Summary views
- Payment button clicks
- Conversion rate
- Email open rate
- Reading unlock rate
- Expired link attempts

## Rollback Plan

If issues occur:
1. Revert deployment in Netlify
2. Check function logs
3. Verify environment variables
4. Test locally with `npm run dev`
5. Redeploy after fixes

## Support

- Netlify logs: Site → Functions → Logs
- Stripe events: Dashboard → Developers → Events
- Resend logs: Dashboard → Logs
