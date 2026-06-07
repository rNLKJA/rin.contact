// rin.contact service worker — caches static assets for offline + repeat-visit speed
// Versioned: bump CACHE name when precache list changes to trigger clean reinstall.
const CACHE = "rin-contact-v2";
const PRECACHE = [
  "/",
  "/logo.svg",
  "/site.webmanifest",
  "/favicon.ico",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) =>
      // addAll rejects entirely if any single request fails — use individual
      // add() calls wrapped in allSettled so one flaky resource doesn't
      // block the whole install.
      Promise.allSettled(
        PRECACHE.map((url) =>
          cache.add(url).catch((err) => {
            console.debug(`[sw] precache skip: ${url} — ${err.message}`);
          })
        )
      )
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return;

  e.respondWith(
    caches.match(e.request).then((cached) => {
      const fetched = fetch(e.request).then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE).then((cache) => cache.put(e.request, clone));
        }
        return response;
      });
      return cached || fetched;
    })
  );
});
