# Deployment Checklist

## Pre-Deployment

### 1. Dependencies
- [ ] Run `npm install`
- [ ] Verify all packages installed successfully
- [ ] Check for any peer dependency warnings

### 2. Local Testing
- [ ] Start local dev server: `netlify dev`
- [ ] Test form submission with email
- [ ] Verify summary displays correctly
- [ ] Test Stripe Checkout flow (use test mode)
- [ ] Verify webhook fires locally: `stripe listen --forward-to localhost:8888/webhooks/stripe`
- [ ] Check email delivery (test mode)
- [ ] Verify unlock link works
- [ ] Test with different spreads (single, three, norn, five)

### 3. Stripe Configuration
- [ ] Create product in Stripe dashboard
- [ ] Create price and copy `price_...` ID
- [ ] Set up webhook endpoint (will update URL after deploy)
- [ ] Subscribe to `checkout.session.completed` event
- [ ] Copy webhook signing secret
- [ ] Test with Stripe test card: `4242 4242 4242 4242`

### 4. Resend Configuration
- [ ] Sign up for Resend account
- [ ] Verify sending domain
- [ ] Create API key
- [ ] Test email sending
- [ ] Verify emails not going to spam

## Deployment

### 5. Environment Variables (Netlify)
Go to: Site Settings → Environment Variables

- [ ] `STRIPE_SECRET_KEY` = `sk_test_...` (or `sk_live_...` for production)
- [ ] `STRIPE_WEBHOOK_SECRET` = `whsec_...`
- [ ] `STRIPE_PRICE_ID` = `price_...`
- [ ] `RESEND_API_KEY` = `re_...`
- [ ] `FROM_EMAIL` = `Asteria <readings@yourdomain.com>`
- [ ] `SITE_URL` = `https://your-site.netlify.app`

### 6. Build & Deploy
- [ ] Run `npm run build` locally to verify
- [ ] Commit all changes to git
- [ ] Push to repository
- [ ] Trigger Netlify deploy
- [ ] Wait for build to complete
- [ ] Check build logs for errors

### 7. Post-Deploy Verification
- [ ] Visit deployed site
- [ ] Test runes experience page loads
- [ ] Submit form with test email
- [ ] Verify summary displays
- [ ] Click "Pay to unlock" button
- [ ] Complete test payment
- [ ] Check email received
- [ ] Click unlock link
- [ ] Verify full reading displays

### 8. Stripe Webhook Update
- [ ] Go to Stripe dashboard → Webhooks
- [ ] Update endpoint URL to production: `https://your-site.netlify.app/webhooks/stripe`
- [ ] Copy new webhook signing secret (if changed)
- [ ] Update `STRIPE_WEBHOOK_SECRET` in Netlify
- [ ] Test webhook with real payment

## Production Readiness

### 9. Switch to Live Mode
- [ ] Switch Stripe to live mode
- [ ] Create live product & price
- [ ] Update `STRIPE_SECRET_KEY` to `sk_live_...`
- [ ] Update `STRIPE_PRICE_ID` to live price ID
- [ ] Create live webhook endpoint
- [ ] Update `STRIPE_WEBHOOK_SECRET` to live secret
- [ ] Test with real payment (small amount)

### 10. Monitoring Setup
- [ ] Enable Netlify function logs
- [ ] Set up Stripe email notifications
- [ ] Configure Resend email notifications
- [ ] Test error scenarios:
  - [ ] Missing email
  - [ ] Invalid token
  - [ ] Unpaid reading access attempt

### 11. Documentation
- [ ] Update README with live site URL
- [ ] Document any custom configuration
- [ ] Share setup guide with team
- [ ] Document support process

## Post-Launch

### 12. First Week Monitoring
- [ ] Check function invocation counts
- [ ] Monitor error rates
- [ ] Verify email delivery rates
- [ ] Check payment success rates
- [ ] Review user feedback

### 13. Optimization
- [ ] Review function performance
- [ ] Check Blobs storage usage
- [ ] Optimize summary generation if needed
- [ ] A/B test pricing if desired

## Troubleshooting

### Common Issues
- [ ] **Webhook not firing**: Check URL, verify secret, check Stripe logs
- [ ] **Email not received**: Check spam, verify domain, check Resend logs
- [ ] **Reading not unlocking**: Verify payment completed, check webhook fired
- [ ] **Function errors**: Check Netlify logs, verify env vars

### Support Contacts
- Netlify Support: https://www.netlify.com/support/
- Stripe Support: https://support.stripe.com/
- Resend Support: https://resend.com/support

## Rollback Plan

### If Issues Occur
1. [ ] Revert to previous deployment in Netlify
2. [ ] Check error logs for root cause
3. [ ] Fix issues locally
4. [ ] Test thoroughly
5. [ ] Redeploy

### Emergency Contacts
- [ ] Document who to contact for urgent issues
- [ ] Set up alerting for critical errors
- [ ] Have rollback procedure ready

## Success Metrics

### Track These KPIs
- [ ] Summary views
- [ ] Payment button clicks
- [ ] Payment completion rate
- [ ] Email open rate
- [ ] Reading unlock rate
- [ ] Revenue per category

### Analytics Setup
- [ ] Add Google Analytics (optional)
- [ ] Track conversion funnel
- [ ] Monitor user drop-off points

## Security Checklist

- [ ] All secrets in environment variables (not in code)
- [ ] Webhook signature verification enabled
- [ ] HTTPS enforced
- [ ] Email validation on frontend and backend
- [ ] Token length sufficient (64 chars)
- [ ] No sensitive data in logs

## Performance Checklist

- [ ] Functions respond in < 2s
- [ ] Reading page loads in < 1s
- [ ] Email delivered in < 30s
- [ ] No memory leaks in functions
- [ ] Blobs storage within limits

## Compliance Checklist

- [ ] Privacy policy updated (email collection)
- [ ] Terms of service updated (payment terms)
- [ ] GDPR compliance (if EU users)
- [ ] Refund policy documented
- [ ] Customer support email set up

---

## Final Sign-Off

- [ ] All tests passing
- [ ] All environment variables set
- [ ] Monitoring in place
- [ ] Documentation complete
- [ ] Team trained
- [ ] Support process ready

**Deployed by**: _______________
**Date**: _______________
**Version**: _______________

---

## Quick Reference

### Test Card Numbers
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Requires Auth: `4000 0025 0000 3155`

### Important URLs
- Netlify Dashboard: https://app.netlify.com
- Stripe Dashboard: https://dashboard.stripe.com
- Resend Dashboard: https://resend.com/dashboard

### Key Commands
```bash
# Local dev
netlify dev

# Webhook testing
stripe listen --forward-to localhost:8888/webhooks/stripe

# Build
npm run build

# Deploy
git push origin main
```
