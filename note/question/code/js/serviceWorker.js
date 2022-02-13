self.addEventListener('install', event => {
  console.log('sw: installing');
  self.skipWaiting();
  event.waitUntil(
    caches.open('static-v1')
      .then(cache => {
        cache.addAll([
          '/images/elements.png'
        ])
      })
  );
});

self.addEventListener('activate', event => {
  console.log('sw: has been activated');
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.pathname === '/images/elements.png') {
    event.respondWith(caches.match('/images/1632045784451-300a4665-4696-4d6d-94dc-f6bfcd02b254.png'));
  }
})

self.addEventListener('message', e => {
  e.source.postMessage(`SW回应：${e.data}，时间戳：${Date.now()}`);
})