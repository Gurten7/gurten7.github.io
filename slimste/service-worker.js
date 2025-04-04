// ✅ service-worker.js
const cacheName = 'slimste-kameraad-v2';
const assets = [
  './index.html',
  './?view=edit',
  './?view=display',
  './manifest.json',
  './manifest-edit.json',
  './manifest-display.json',
  './icon-192.png',
  './icon-512.png',
  './timer-sound.mp3',
  './timer-sound-end.mp3',
  './Sound-finale.mp3',
  './DSK.png'
];

// ✅ Cache bestanden bij installatie
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(assets))
  );
  self.skipWaiting();
});

// ✅ Oude cache opruimen bij activatie
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== cacheName).map(k => caches.delete(k))
      );
    })
  );
  self.clients.claim();
});

// ✅ Gebruik cache bij verzoeken
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
