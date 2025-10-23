import Stripe from "stripe";
import { Resend } from "resend";
import { getStore } from "@netlify/blobs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);
const SITE_URL = process.env.SITE_URL;

export default async (req) => {
  const signature = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const readingId = session.metadata?.readingId;

    if (readingId) {
      const store = getStore({ name: "readings" });
      const key = `reading:${readingId}`;
      const record = await store.getJSON(key);

      if (record && !record.paid) {
        const { unlockToken, inputs, category, summary } = record;

        record.paid = true;
        record.paidAt = new Date().toISOString();
        await store.setJSON(key, record);

        const unlockUrl = `${SITE_URL}/reading/${unlockToken}`;
        const html = `
          <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:20px">
            <h2>Your ${category} reading is ready</h2>
            <p><strong>Question:</strong> ${inputs.question || "—"}</p>
            <p><strong>Summary:</strong> ${summary}</p>
            <p>Click to view your full personalized reading:</p>
            <p><a href="${unlockUrl}" style="display:inline-block;padding:12px 24px;background:#7c6cff;color:#fff;text-decoration:none;border-radius:8px">View Full Reading</a></p>
            <p style="margin-top:20px;color:#666;font-size:14px">Or copy this link: ${unlockUrl}</p>
            <p style="margin-top:30px">With gratitude,<br/>Asteria Guide</p>
          </div>
        `;
        await resend.emails.send({
          from: process.env.FROM_EMAIL,
          to: inputs.email,
          subject: `Your ${category} reading`,
          html
        });
      }
    }
  }

  return new Response("ok");
};
