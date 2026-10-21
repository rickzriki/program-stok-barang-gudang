// Service worker Program Stok Barang Gudang.
// Hanya ikon & manifest yang di-cache; halaman dan data stok selalu dari jaringan
// supaya angka stok tidak pernah basi.
const CACHE = 'stok-gudang-v1';
const PRECACHE = ['/icon-192', '/icon-512', '/manifest.webmanifest'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/icon-') || url.pathname === '/manifest.webmanifest') {
    event.respondWith(caches.match(event.request).then((hit) => hit || fetch(event.request)));
    return;
  }
  event.respondWith(fetch(event.request));
});
