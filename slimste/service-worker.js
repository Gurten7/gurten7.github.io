const cacheName = 'slimste-kameraad-v1';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://raw.githubusercontent.com/Gurten7/Timer-ppt/main/audio/timer-sound-end.mp3',
  'https://raw.githubusercontent.com/Gurten7/Timer-ppt/main/audio/Sound-finale.mp3'
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
