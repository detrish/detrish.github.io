importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox) {
    console.log('Workbox berhasil dimuat');
    workbox.precaching.precacheAndRoute([
        { url: '/', revision: '1' },
        { url: '/index.html', revision: '1' },
        { url: '/manifest.json', revision: '1' },
        { url: '/nav.html', revision: '1' },
        { url: '/push.js', revision: '1' },
        { url: '/css/materialize.min.css', revision: '1' },
        { url: '/js/materialize.min.js', revision: '1' },
        { url: '/asset/logo.png', revision: '1' },
        { url: '/asset/icon.png', revision: '1' },
        { url: '/js/script.js', revision: '1' },
        { url: '/js/nav.js', revision: '1' },
        { url: '/js/api.js', revision: '1' },
        { url: '/js/jquery-3.5.1.min.js', revision: '1' },
        { url: '/js/idb.js', revision: '1' },
        { url: '/js/db.js', revision: '1' },
        { url: '/js/pushSW.js', revision: '1' },
        { url: '/js/regisSW.js', revision: '1' },
    ]);

    workbox.routing.registerRoute(
        new RegExp('/pages/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'pages'
        })
    );

    workbox.routing.registerRoute(
        /^https:\/\/api\.football\-data\.org\/v2/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'premier-api',
        })
    );

    workbox.routing.registerRoute(
        /^https:\/\/fonts\.googleapis\.com/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'assets-api',
        })
    );

    workbox.routing.registerRoute(
        /.*(?:png|gif|jpg|jpeg|svg)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'image',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200]
                }),
                new workbox.expiration.Plugin({
                    maxEntries: 100,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
            ]
        })
    );

    workbox.routing.registerRoute(
        /\.(?:js)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'js',
        })
    );

} else {
  console.log('Workbox gagal dimuat');
}


//Push Notification
self.addEventListener('push', function (event) {
  let body;

  if (event.data) {
      body = event.data.text();
  } else {
      body = 'Push Dengan Message Berhasil Untuk Premier League News';
  }

  let options = {
      body: body,
      icon: 'icon.png',
      vibrate: [100, 50, 100],
      data: {
          dataOfArrival: Date.now(),
          primaryKey: 1
      }
  };
  event.waitUntil(
      self.registration.showNotification('Push Notification', options)
  );

});