// Service Worker — Pre-caches the entire image sequence so subsequent visits
// serve frames from Cache Storage with zero network latency.

const CACHE_NAME = "sequence-cache-v1";
const FRAME_COUNT = 82;

// Build the list of all assets to pre-cache
const SEQUENCE_URLS = [];
for (let i = 0; i < FRAME_COUNT; i++) {
  const num = i.toString().padStart(3, "0");
  SEQUENCE_URLS.push(`/sequence/frame_${num}_delay-0.066s.webp`);
}
SEQUENCE_URLS.push("/sequence/frame_hero.webp");

// On install: download and cache every frame
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(SEQUENCE_URLS))
      .then(() => self.skipWaiting())
  );
});

// On activate: clean up old caches if the version changes
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

// On fetch: serve from cache first, fall back to network
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Only intercept requests for sequence images
  if (url.pathname.startsWith("/sequence/")) {
    event.respondWith(
      caches
        .match(event.request)
        .then((cached) => cached || fetch(event.request))
    );
  }
});
