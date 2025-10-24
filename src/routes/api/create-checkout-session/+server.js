import { json } from '@sveltejs/kit';
import { getReading } from '$lib/server/storage.js';

// Mock Stripe integration for development
// In production, this would use real Stripe API
const priceMap = {
  runes: process.env.STRIPE_PRICE_ID_RUNES || 'price_runes_dev',
  palmistry: process.env.STRIPE_PRICE_ID_PALMISTRY || 'price_palmistry_dev',
  iching: process.env.STRIPE_PRICE_ID_ICHING || 'price_iching_dev',
};

const SITE_URL = process.env.SITE_URL || process.env.URL || 'http://localhost:5173';

export async function POST({ request }) {
  try {
    const { readingId } = await request.json();
    
    if (!readingId) {
      return json({ error: 'Reading ID is required' }, { status: 400 });
    }

    // Get the reading from storage
    const record = await getReading(readingId);
    if (!record) {
      return json({ error: 'Reading not found' }, { status: 404 });
    }

    const priceId = priceMap[record.category];
    if (!priceId) {
      return json({ error: 'No price configured for this category' }, { status: 500 });
    }

    // For development, return a mock checkout URL
    // In production, this would create a real Stripe checkout session
    const mockCheckoutUrl = `${SITE_URL}/asteria/thanks?session_id=mock_session_${readingId}&reading_id=${readingId}`;
    
    return json({ url: mockCheckoutUrl });
    
  } catch (error) {
    console.error('Checkout session creation error:', error);
    return json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
