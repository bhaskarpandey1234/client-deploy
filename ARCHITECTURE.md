# Paywall Architecture

## System Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ 1. Fill form + submit
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              /runes/experience (Svelte Page)                     │
│  • Collects: name, email*, question, spread, options            │
│  • Calls: create-reading API                                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ 2. POST { category, inputs }
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│         /.netlify/functions/create-reading                       │
│  • Generates full reading (server-side)                         │
│  • Creates readingId + unlockToken                              │
│  • Stores in Netlify Blobs                                      │
│  • Returns: { readingId, summary }                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ 3. Show summary only
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PAYWALL UI                                    │
│  ┌───────────────────────────────────────────────────┐          │
│  │  Your Reading Summary                             │          │
│  │  "Themes: wealth, journey, clarity..."            │          │
│  │                                                    │          │
│  │  [Pay to unlock full reading]                     │          │
│  └───────────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ 4. Click pay button
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│      /.netlify/functions/create-checkout-session                │
│  • Fetches reading from Blobs                                   │
│  • Creates Stripe Checkout Session                              │
│  • Returns: { url: "https://checkout.stripe.com/..." }         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ 5. Redirect to Stripe
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                  STRIPE CHECKOUT PAGE                            │
│  • Hosted by Stripe (PCI compliant)                             │
│  • User enters payment details                                  │
│  • Completes payment                                            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ 6. Payment success
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    STRIPE WEBHOOK                                │
│  Event: checkout.session.completed                              │
│  → POST /webhooks/stripe                                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ 7. Webhook payload
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│         /.netlify/functions/stripe-webhook                       │
│  • Verifies signature                                           │
│  • Marks reading as paid in Blobs                               │
│  • Sends email via Resend                                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ 8. Email sent
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      USER EMAIL                                  │
│  ┌───────────────────────────────────────────────────┐          │
│  │  Your runes reading is ready                      │          │
│  │                                                    │          │
│  │  Summary: "Themes: wealth, journey..."            │          │
│  │                                                    │          │
│  │  [View Full Reading]                              │          │
│  │  https://site.com/reading/abc123...               │          │
│  └───────────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ 9. Click link
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              /reading/{token} (Netlify Redirect)                │
│  → /.netlify/functions/reading?token={token}                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ 10. Validate token
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│            /.netlify/functions/reading                           │
│  • Looks up token → readingId                                   │
│  • Fetches reading from Blobs                                   │
│  • Checks paid status                                           │
│  • Returns HTML page with full reading                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ 11. Display full reading
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                  FULL READING PAGE                               │
│  ┌───────────────────────────────────────────────────┐          │
│  │  Runes — Full Reading                             │          │
│  │  For: John • 2024-01-15                           │          │
│  │                                                    │          │
│  │  Question: What should I focus on?                │          │
│  │                                                    │          │
│  │  Past: ᚠ Fehu (upright)                           │          │
│  │  Wealth, movable resources...                     │          │
│  │                                                    │          │
│  │  Present: ᚱ Raidho (upright)                      │          │
│  │  Travel or progress...                            │          │
│  │                                                    │          │
│  │  Guidance: ᛋ Sowilo (upright)                     │          │
│  │  Breakthrough energy...                           │          │
│  │                                                    │          │
│  │  Synthesis: Themes: wealth, journey, clarity...   │          │
│  └───────────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### Storage (Netlify Blobs)
```
Store: "readings"
├── reading:{uuid}
│   ├── id: "uuid"
│   ├── category: "runes"
│   ├── inputs: { name, email, question, ... }
│   ├── fullText: "Complete reading..."
│   ├── summary: "Short preview..."
│   ├── paid: false → true
│   ├── unlockToken: "64-char-hex"
│   └── createdAt: "2024-01-15T..."
│
└── token:{64-char-hex}
    └── value: "uuid" (readingId)
```

## API Endpoints

### 1. Create Reading
```
POST /.netlify/functions/create-reading
Body: { category: "runes", inputs: {...} }
Response: { readingId: "uuid", summary: "..." }
```

### 2. Create Checkout
```
POST /.netlify/functions/create-checkout-session
Body: { readingId: "uuid" }
Response: { url: "https://checkout.stripe.com/..." }
```

### 3. Stripe Webhook
```
POST /webhooks/stripe
Headers: stripe-signature
Body: Stripe event payload
Response: "ok"
```

### 4. View Reading
```
GET /reading/{token}
Response: HTML page (if paid) or 402 error
```

## Security Layers

```
┌─────────────────────────────────────────────────────────────┐
│  Layer 1: Server-Side Generation                            │
│  • Full reading never sent to client before payment         │
│  • Only summary exposed                                     │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  Layer 2: Cryptographic Tokens                              │
│  • 64-character random hex (2^256 possibilities)            │
│  • Unguessable, one-time use                                │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  Layer 3: Stripe Webhook Signature                          │
│  • Verifies webhook came from Stripe                        │
│  • Prevents fake payment notifications                      │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  Layer 4: Paid Status Check                                 │
│  • Reading function checks paid=true before serving         │
│  • Returns 402 if not paid                                  │
└─────────────────────────────────────────────────────────────┘
```

## Scalability

```
Component          | Scaling Strategy
─────────────────────────────────────────────────────────────
Frontend           | Static files on CDN (Netlify)
Functions          | Auto-scale per request (serverless)
Blobs Storage      | Managed by Netlify (auto-scale)
Stripe             | Handles millions of transactions
Resend             | Transactional email service (auto-scale)
```

## Error Handling

```
Error Scenario                    | Handling
─────────────────────────────────────────────────────────────
Email missing                     | Frontend validation + 400 error
Reading generation fails          | 500 error, user sees alert
Stripe API error                  | 500 error, user sees alert
Webhook signature invalid         | 400 error, logged
Email send fails                  | Logged, can retry manually
Token not found                   | 404 error page
Reading not paid                  | 402 error page
```

## Performance

```
Operation                | Expected Time
─────────────────────────────────────────────────────────────
Generate reading         | < 500ms
Create checkout session  | < 1s (Stripe API call)
Webhook processing       | < 2s (includes email send)
View reading page        | < 300ms (Blobs lookup + HTML render)
```

## Monitoring Points

```
Metric                           | Where to Check
─────────────────────────────────────────────────────────────
Function invocations             | Netlify dashboard
Function errors                  | Netlify function logs
Payment success rate             | Stripe dashboard
Email delivery rate              | Resend dashboard
Reading unlock rate              | Custom analytics (add later)
```

## Extension Points

### Add New Category (e.g., Palmistry)
```
1. src/server/generateReading.js
   └── Add case 'palmistry': return generatePalmistryReading(inputs)

2. Copy runes experience page
   └── Change category: 'palmistry'

3. (Optional) Add STRIPE_PRICE_ID_PALMISTRY env var
```

### Add Analytics
```
1. Track events:
   • reading_summary_viewed
   • payment_button_clicked
   • payment_completed
   • reading_unlocked

2. Send to analytics service (GA, Mixpanel, etc.)
```

### Add Refund Handling
```
1. Add webhook listener for charge.refunded
2. Mark reading as unpaid
3. (Optional) Invalidate token
```

---

**Architecture Pattern**: JAMstack + Serverless + Webhook Fulfillment

**Key Benefits**: 
- Secure (server-side generation)
- Scalable (serverless functions)
- Reliable (webhook-based fulfillment)
- Maintainable (clean separation of concerns)
