/**
 * rin.contact — PWA Service Worker
 *
 * Strategies:
 *   - /_next/static/*, /images/*:  cache-first (content-hashed, immutable)
 *   - navigation requests:          network-first, fallback to cache
 *   - everything else:              network-only (API, sitemap, etc.)
 *
 * Caches are versioned so old ones get cleaned on activation.
 */
const CACHE = "rin-v2";
const SHELL_CACHE = "rin-shell-v2";
const PAGE_CACHE = "rin-pages-v2";

// NOTE: "/" is intentionally NOT in this cache-first list. The homepage changes
// often, so it is served network-first (see fetch handler). Precaching it
// cache-first meant returning visitors got a stale shell and never saw new work.
const SHELL_URLS = [
  "/site.webmanifest",
  "/logo.svg",
  "/favicon.ico",
  "/favicon-16x16.png",
  "/favicon-32x32.png",
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
  "/apple-touch-icon.png",
];

// ─── Install ────────────────────────────────────────────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) =>
      Promise.allSettled(
        SHELL_URLS.map((url) =>
          fetch(url)
            .then((r) => {
              if (r.ok) cache.put(url, r);
            })
            .catch(() => {})
        )
      )
    )
  );
  self.skipWaiting();
});

// ─── Activate — remove stale caches ────────────────────────────────
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== CACHE && k !== SHELL_CACHE && k !== PAGE_CACHE)
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

// ─── Fetch ─────────────────────────────────────────────────────────
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin GET requests
  if (url.origin !== self.location.origin || request.method !== "GET") return;

  // Cache-first: content-hassed static assets
  if (url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/images/")) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Cache-first: shell assets (favicons, manifest, logo)
  if (SHELL_URLS.includes(url.pathname)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Network-first: page navigations
  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }

  // Everything else (API, sitemap, etc.) — pass through
});

// ─── Strategies ────────────────────────────────────────────────────

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const res = await fetch(request);
    if (res.ok) {
      const cache = await caches.open(CACHE);
      cache.put(request, res.clone());
    }
    return res;
  } catch {
    return caches.match(request);
  }
}

async function networkFirst(request) {
  try {
    const res = await fetch(request);
    if (res.ok) {
      const cache = await caches.open(PAGE_CACHE);
      cache.put(request, res.clone());
    }
    return res;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    // Offline fallback — show cached homepage
    return caches.match("/");
  }
}
