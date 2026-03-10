/**
 * POST /api/ping-indexnow
 *
 * Notifies the IndexNow network (Bing, Yandex) that rin.contact has updated.
 * Call this from your deployment pipeline (e.g. Vercel post-deploy hook) or manually.
 *
 * Usage:
 *   curl -X POST https://rin.contact/api/ping-indexnow
 *
 * Docs: https://www.indexnow.org/documentation
 */

const INDEXNOW_KEY     = "d4e8f2a1b7c3e9f5d2a8b1c6e7f0d3a9";
const INDEXNOW_HOST    = "rin.contact";
const INDEXNOW_KEY_URL = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;

const URLS = [
  `https://${INDEXNOW_HOST}/`,
  `https://${INDEXNOW_HOST}/sitemap.xml`,
];

// Bing's IndexNow endpoint (also notifies Yandex and other IndexNow members)
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host:        INDEXNOW_HOST,
        key:         INDEXNOW_KEY,
        keyLocation: INDEXNOW_KEY_URL,
        urlList:     URLS,
      }),
    });

    const status = response.status;

    // 200 = OK, 202 = Accepted (queued), both mean success
    if (status === 200 || status === 202) {
      return res.status(200).json({
        ok:     true,
        status,
        urls:   URLS,
        engine: "Bing / IndexNow network",
      });
    }

    return res.status(status).json({ ok: false, status });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}
