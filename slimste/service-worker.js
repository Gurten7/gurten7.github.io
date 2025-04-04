const cacheName = 'slimste-kameraad-v1';
const assets = [
  './index',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './timer-sound.mp3',
  './timer-sound-end.mp3',
  './Sound-finale.mp3'
];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(assets))
  );
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(res => res || fetch(evt.request))
  );
});
