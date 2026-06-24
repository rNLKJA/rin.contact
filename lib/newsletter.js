/**
 * newsletter.js — Provider-agnostic newsletter subscription
 *
 * Supports Buttondown, ConvertKit, Mailchimp, or a generic webhook
 * via environment variables. Returns { success, message } from subscribe().
 *
 * Provider  Env vars required
 * ───────── ─────────────────────────────────────────────────
 * buttondown  NEWSLETTER_BUTTONDOWN_API_KEY
 * convertkit  NEWSLETTER_CONVERTKIT_API_KEY + NEWSLETTER_CONVERTKIT_FORM_ID
 * mailchimp   NEWSLETTER_MAILCHIMP_API_KEY + NEWSLETTER_MAILCHIMP_LIST_ID + NEWSLETTER_MAILCHIMP_DC (data centre)
 * webhook     NEWSLETTER_WEBHOOK_URL
 * self-hosted VERCEL_KV_URL + VERCEL_KV_TOKEN (use Vercel KV as a mailing list)
 */

const PROVIDER = process.env.NEWSLETTER_PROVIDER || "";

/** Validate an email address. */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ─── Provider implementations ───────────────────────────────────────────────

async function subscribeButtondown(email) {
  const key = process.env.NEWSLETTER_BUTTONDOWN_API_KEY;
  if (!key) return { success: false, message: "Buttondown not configured." };
  const res = await fetch("https://api.buttondown.email/v1/subscribers", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Token ${key}` },
    // Buttondown renamed this field from `email` to `email_address`; sending the
    // old name made every subscription fail with a 400.
    body: JSON.stringify({ email_address: email }),
  });
  if (res.ok) return { success: true, message: "Subscribed. Check your inbox to confirm." };

  // Buttondown returns an array of error objects (or a single one). Never surface
  // the raw API payload to the reader; map it to a clean message.
  const body = await res.json().catch(() => null);
  const first = Array.isArray(body) ? body[0] : body;
  const code = first?.code || "";
  const detail = first?.detail || "";
  if (res.status === 409 || /exist|already/i.test(`${code} ${detail}`)) {
    return { success: true, message: "You are already subscribed." };
  }
  return { success: false, message: "Could not subscribe right now. Please try again shortly." };
}

async function subscribeConvertKit(email) {
  const key = process.env.NEWSLETTER_CONVERTKIT_API_KEY;
  const formId = process.env.NEWSLETTER_CONVERTKIT_FORM_ID;
  if (!key || !formId) return { success: false, message: "ConvertKit not configured." };
  const res = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ api_key: key, email }),
  });
  if (!res.ok) return { success: false, message: `ConvertKit error (${res.status})` };
  return { success: true, message: "Subscribed!" };
}

async function subscribeMailchimp(email) {
  const key = process.env.NEWSLETTER_MAILCHIMP_API_KEY;
  const listId = process.env.NEWSLETTER_MAILCHIMP_LIST_ID;
  const dc = process.env.NEWSLETTER_MAILCHIMP_DC;
  if (!key || !listId || !dc) return { success: false, message: "Mailchimp not configured." };
  const res = await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`, {
    method: "POST",
    headers: {
      Authorization: `apikey ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email_address: email, status: "subscribed" }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    return { success: false, message: body.detail || `Mailchimp error (${res.status})` };
  }
  return { success: true, message: "Subscribed!" };
}

async function subscribeWebhook(email) {
  const url = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!url) return { success: false, message: "Webhook not configured." };
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) return { success: false, message: `Webhook error (${res.status})` };
  return { success: true, message: "Subscribed!" };
}

/** Store subscriber in Vercel KV (self-hosted approach). */
async function subscribeSelfHosted(email) {
  try {
    const { kv } = require("@vercel/kv");
    const key = `subscriber:${email.replace(/[^a-z0-9]/gi, "_").toLowerCase()}`;
    await kv.set(key, { email, subscribedAt: new Date().toISOString() });
    return { success: true, message: "Subscribed!" };
  } catch {
    return { success: false, message: "KV store not available." };
  }
}

// ─── Dispatch ───────────────────────────────────────────────────────────────

const PROVIDERS = {
  buttondown: subscribeButtondown,
  convertkit: subscribeConvertKit,
  mailchimp: subscribeMailchimp,
  webhook: subscribeWebhook,
  "self-hosted": subscribeSelfHosted,
};

/**
 * Subscribe an email address to the configured newsletter provider.
 * @returns {{ success: boolean, message: string }}
 */
export async function subscribe(email) {
  if (!email || !isValidEmail(email)) {
    return { success: false, message: "Please provide a valid email address." };
  }

  const handler = PROVIDERS[PROVIDER];
  if (!handler) {
    // Defensive: never surface internal configuration details to a visitor.
    return {
      success: false,
      message: "The newsletter is not available right now. Please check back soon.",
    };
  }

  return handler(email);
}
