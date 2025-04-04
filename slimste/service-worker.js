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


// ✅ manifest-edit.json
// Plaats dit in slimste/manifest-edit.json
/*
{
  "name": "Slimste Kameraad Edit",
  "short_name": "Edit",
  "start_url": "/slimste/?view=edit",
  "display": "standalone",
  "theme_color": "#650409",
  "background_color": "#650409",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
*/


// ✅ manifest-display.json
// Plaats dit in slimste/manifest-display.json
/*
{
  "name": "Slimste Kameraad Display",
  "short_name": "Display",
  "start_url": "/slimste/?view=display",
  "display": "standalone",
  "theme_color": "#650409",
  "background_color": "#650409",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
*/
