// rin.contact service worker
// ============================
// Self-destructs any old registration on install, then installs clean.
// Skips eager precaching — runtime caches successful GETs instead.
// No addAll, no precache list — nothing that can throw on a flaky dev-server response.
const CACHE = "rin-contact-v3";

self.addEventListener("install", () => {
  // Immediately activate — don't wait for old tabs to close
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  // Purge every older cache, regardless of name
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  // Take control of all clients immediately
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  // Only same-origin, non-API, non-dev-server requests
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return;
  // Don't cache Next.js dev HMR / hot-reload assets
  if (url.pathname.startsWith("/_next/")) return;

  e.respondWith(
    caches.match(e.request).then((cached) => {
      const fetched = fetch(e.request).then((response) => {
        if (response.ok && response.type === "basic") {
          const clone = response.clone();
          caches.open(CACHE).then((cache) => cache.put(e.request, clone));
        }
        return response;
      });
      return cached || fetched;
    })
  );
});
