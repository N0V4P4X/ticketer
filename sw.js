const CACHE = 'cat-ticket-v11';
const FILES = [
  '/',
'/index.html',
'/CAT_Logo.jpg',
'/manifest.json',
'/icon-192.png',
'/icon-512.png',
'/icon-180.png',
'/favicon.svg',
'/favicon.ico',
'/icon-96x96.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES))
  );
  // Take over immediately, don't wait for old worker to die
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  // Delete all old caches
  e.waitUntil(
    caches.keys().then(keys =>
    Promise.all(
      keys.filter(k => k !== CACHE).map(k => caches.delete(k))
    )
    )
  );
  // Take control of all open tabs immediately
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
