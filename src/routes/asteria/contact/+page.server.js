import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s || '').trim());
const esc = (s) =>
  String(s || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

async function sendEmail({ to, subject, html, text }) {
  const apiKey = env.RESEND_API_KEY;
  const from = env.RESEND_FROM || 'Asteria <no-reply@yourdomain.tld>';

  if (!apiKey) {
    console.warn('[contact] RESEND_API_KEY missing — printing email instead:\n', { to, subject, text });
    return { ok: true, id: 'dev-preview' };
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ from, to: Array.isArray(to) ? to : [to], subject, html, text })
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    console.error('[contact] Resend error:', res.status, body);
    return { ok: false, status: res.status, body };
  }

  const data = await res.json().catch(() => ({}));
  return { ok: true, id: data?.id || 'sent' };
}

function parse(formData, keys) {
  const out = {};
  for (const k of keys) out[k] = (formData.get(k) || '').toString().trim();
  return out;
}

export const actions = {
  b2c: async ({ request }) => {
    const fd = await request.formData();

    if (fd.get('nickname')) {
      return { success: true, message: 'Thanks! We\'ll be in touch shortly.' };
    }

    const values = parse(fd, ['name', 'email', 'topic', 'message']);
    const errors = {};

    if (!values.name) errors.name = 'Please enter your name.';
    if (!isEmail(values.email)) errors.email = 'Please enter a valid email address.';
    if (!values.message || values.message.length < 10) errors.message = 'Please include a few more details (10+ characters).';

    if (Object.keys(errors).length) {
      return fail(400, { errors, values });
    }

    const to = env.SUPPORT_EMAIL || 'support@example.com';
    const subject = `B2C Support • ${values.topic || 'General'} — ${values.name}`;
    const text =
`B2C Support Request
Name: ${values.name}
Email: ${values.email}
Topic: ${values.topic}

Message:
${values.message}`;

    const html =
`<h2>B2C Support Request</h2>
<p><strong>Name:</strong> ${esc(values.name)}<br/>
<strong>Email:</strong> ${esc(values.email)}<br/>
<strong>Topic:</strong> ${esc(values.topic || 'General')}</p>
<p><strong>Message:</strong><br/>${esc(values.message).replaceAll('\n', '<br/>')}</p>`;

    const sent = await sendEmail({ to, subject, html, text });
    if (!sent.ok) return fail(500, { errors: { _server: 'We could not send your message. Please try email instead.' }, values });

    return { success: true, message: 'Thanks! Your message was sent to support.' };
  },

  b2b: async ({ request }) => {
    const fd = await request.formData();

    if (fd.get('website')) {
      return { success: true, message: 'Thanks! We\'ll be in touch shortly.' };
    }

    const values = parse(fd, ['name', 'email', 'company', 'country', 'topic', 'message']);
    const errors = {};

    if (!values.name) errors.name = 'Please enter your name.';
    if (!isEmail(values.email)) errors.email = 'Please enter a valid work email.';
    if (!values.company) errors.company = 'Please enter your company.';
    if (!values.message || values.message.length < 20) errors.message = 'Please include a bit more context (20+ characters).';

    if (Object.keys(errors).length) {
      return fail(400, { errors, values });
    }

    const to = env.PARTNERS_EMAIL || 'partners@example.com';
    const subject = `B2B ${values.topic || 'Partnership'} — ${values.company} (${values.name})`;
    const text =
`B2B Inquiry
Name: ${values.name}
Email: ${values.email}
Company: ${values.company}
Country: ${values.country || '-'}
Topic: ${values.topic}

Message:
${values.message}`;

    const html =
`<h2>B2B Inquiry</h2>
<p><strong>Name:</strong> ${esc(values.name)}<br/>
<strong>Email:</strong> ${esc(values.email)}<br/>
<strong>Company:</strong> ${esc(values.company)}<br/>
<strong>Country:</strong> ${esc(values.country || '-')}<br/>
<strong>Topic:</strong> ${esc(values.topic || 'Partnership')}</p>
<p><strong>Message:</strong><br/>${esc(values.message).replaceAll('\n', '<br/>')}</p>`;

    const sent = await sendEmail({ to, subject, html, text });
    if (!sent.ok) return fail(500, { errors: { _server: 'We could not send your message. Please try email instead.' }, values });

    return { success: true, message: 'Thanks! Your inquiry was sent to our partnerships team.' };
  }
};
