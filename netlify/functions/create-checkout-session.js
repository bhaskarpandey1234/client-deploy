import Stripe from "stripe";
import { getStore } from "@netlify/blobs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const priceMap = {
  runes:     process.env.STRIPE_PRICE_ID_RUNES || process.env.STRIPE_PRICE_ID,
  palmistry: process.env.STRIPE_PRICE_ID_PALMISTRY || process.env.STRIPE_PRICE_ID,
  iching:    process.env.STRIPE_PRICE_ID_ICHING || process.env.STRIPE_PRICE_ID,
};

const SITE_URL = process.env.SITE_URL;

export default async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const { readingId } = await req.json();

  const store = getStore({ name: "readings" });
  const record = await store.getJSON(`reading:${readingId}`);
  if (!record) return new Response(JSON.stringify({ error: "Reading not found" }), { status: 404 });

  const priceId = priceMap[record.category];
  if (!priceId) return new Response(JSON.stringify({ error: "No price configured" }), { status: 500 });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: record.inputs.email,
    metadata: { readingId, category: record.category },
    success_url: `${SITE_URL}/asteria/thanks?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE_URL}/asteria/divination/${record.category}/experience?canceled=1`
  });

  return new Response(JSON.stringify({ url: session.url }), {
    headers: { "Content-Type": "application/json" }
  });
};
