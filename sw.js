/* Pose Flow Operator — offline service worker.
 *
 * Why this exists: the app is used during shoots, often on venue wifi or weak
 * signal. Everything it needs is ~2.8 MB, so we cache all of it and never
 * depend on the network once installed.
 *
 * Strategy:
 *   - Precache the shell + every pose sketch on install (paths are known).
 *   - Hashed JS/CSS filenames change every build, so those are cached at
 *     runtime on first load instead of being listed here.
 *   - Navigations are network-first (so a fresh deploy is picked up when
 *     online) falling back to the cached page (so it opens with no signal).
 *
 * Bump CACHE_VERSION on any change here to evict old caches.
 */

const CACHE_VERSION = "poseflow-v1";

/* Paths are relative to the SW scope (/posescan-simulator/). */
const PRECACHE_PATHS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
  "./vite.svg",
  "./poses/beauty/set1-seated/base1/step1.png",
  "./poses/beauty/set1-seated/base2/step1.png",
  "./poses/beauty/set1-seated/base3/step1.png",
  "./poses/beauty/set1-seated/base4/step1.png",
  "./poses/beauty/set2-standing/base1/step1.png",
  "./poses/beauty/set2-standing/base2/step1.png",
  "./poses/beauty/set3-wall/base1/step1.png",
  "./poses/beauty/set3-wall/base2/step1.png",
  "./poses/beauty/set4-table/base1/step1.png",
  "./poses/beauty/set5-box/base1/step1.png",
  "./poses/beauty/set5-box/base2/step1.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_VERSION);
      /* allSettled, not addAll: one missing asset must not abort the install
         and leave the app with no offline support at all. */
      await Promise.allSettled(
        PRECACHE_PATHS.map(async (path) => {
          const url = new URL(path, self.registration.scope).href;
          const res = await fetch(url, { cache: "reload" });
          if (res && res.ok) await cache.put(url, res);
        })
      );
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  /* Navigations: prefer the network so new deploys land, fall back to cache. */
  if (req.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(req);
          const cache = await caches.open(CACHE_VERSION);
          cache.put(new URL("./index.html", self.registration.scope).href, fresh.clone());
          return fresh;
        } catch {
          const cache = await caches.open(CACHE_VERSION);
          return (
            (await cache.match(new URL("./index.html", self.registration.scope).href)) ||
            (await cache.match(new URL("./", self.registration.scope).href)) ||
            Response.error()
          );
        }
      })()
    );
    return;
  }

  /* Everything else (hashed bundles, sketches, icons): cache-first. */
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_VERSION);
      const hit = await cache.match(req);
      if (hit) return hit;
      try {
        const res = await fetch(req);
        if (res && res.ok && res.type === "basic") cache.put(req, res.clone());
        return res;
      } catch {
        return hit || Response.error();
      }
    })()
  );
});
