self.addEventListener('install', function (event) {
  console.log('Install SW... ', event);
  event.waitUntil(
    caches.open('static').then(function (cache) {
      console.log('[Service Worker] precaching App Shell');
      cache.addAll([
        '/',
        '/_next/static/chunks/pages/index.js',
        '/_next/static/chunks/pages/_app.js',
        '/_next/static/chunks/pages/places.js',
        '/_next/static/chunks/0.js',
        '/_next/static/chunks/amp.js',
        '/_next/static/chunks/main.js',
        '/_next/static/chunks/polyfills.js',
        '/_next/static/chunks/webpack.js',
        '/_next/static/chunks/react-refresh.js',
        '/_next/static/css/0ae6a231fe7b16baf6fc.css',
        '/_next/static/css/3edea7b8b16704e6843d.css',
        '/_next/static/css/d57f188072ddebd26c7f.css',
        '/_next/static/css/f29231f16697c1de6551.css',
        '/_next/static/chunks/webpack-50bee04d1dc61f8adf5b.js'
      ]);
    })
  );
});

self.addEventListener('activate', function (event) {
  console.log('Activate SW... ', event);
  return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request).then(function (res) {
        return caches.open('dynamic').then(function (cache) {
          cache.put(event.request.url, res.clone());
          return res;
        });
      });
    })
  );
});
