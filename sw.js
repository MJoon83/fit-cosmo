// Service Worker: legt die App-Dateien im Gerät ab, damit sie offline startet.
// WICHTIG: nach jeder Änderung an index.html die Versionsnummer hochzählen,
// sonst zeigt die installierte App weiter die alte Version.
const CACHE = 'fitcosmo-v3';

const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/favicon-32.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Zwei Strategien:
//
// 1. Die App selbst (index.html) immer zuerst aus dem Netz holen. So ist nach
//    einem Update sofort die neue Version da. Nur wenn kein Netz da ist,
//    kommt die zwischengespeicherte Fassung — die App startet also offline.
// 2. Alles andere (Icons, Manifest) aus dem Cache, im Hintergrund aktualisiert.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  const isApp = req.mode === 'navigate' || url.pathname.endsWith('/') || url.pathname.endsWith('/index.html');

  if (isApp) {
    e.respondWith(
      fetch(req)
        .then(res => {
          if (res && res.ok) caches.open(CACHE).then(c => c.put(req, res.clone()));
          return res;
        })
        .catch(() => caches.match(req).then(hit => hit || caches.match('./index.html')))
    );
    return;
  }

  e.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(req).then(hit => {
        const fresh = fetch(req)
          .then(res => {
            if (res && res.ok) cache.put(req, res.clone());
            return res;
          })
          .catch(() => hit);
        return hit || fresh;
      })
    )
  );
});
