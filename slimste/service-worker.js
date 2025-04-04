const cacheName = 'slimste-kameraad-v1';
const assets = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './timer-sound.mp3',
  './timer-sound-end.mp3',
  './Sound-finale.mp3',
  './DSK.png',
  './style.css', // als je een aparte CSS gebruikt
  './script.js'  // als je een aparte JS gebruikt
];

// ✅ Caching tijdens installatie
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
  self.skipWaiting(); // activeer direct
});

// ✅ Activatie en oude cache verwijderen
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== cacheName).map(k => caches.delete(k))
      );
    })
  );
  self.clients.claim(); // neem controle over alle pagina’s
});

// ✅ Fetch handler
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => {
      return res || fetch(event.request);
    })
  );
});
