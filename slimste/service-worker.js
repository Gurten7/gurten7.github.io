const CACHE_NAME = "slimste-kameraad-v1";
const urlsToCache = [
  "/slimste/index.html",
  "/slimste/manifest.json",
  "/slimste/icon-192.png",
  "/slimste/icon-512.png",
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js",
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js",
  "https://raw.githubusercontent.com/Gurten7/Timer-ppt/main/timer-sound.mp3",
  "https://raw.githubusercontent.com/Gurten7/Timer-ppt/main/audio/timer-sound-end.mp3",
  "https://raw.githubusercontent.com/Gurten7/Timer-ppt/main/audio/Sound-finale.mp3"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
