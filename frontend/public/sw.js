self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('sw-cache').then((cache) => {
      return cache.addAll([
        'src/handlers/login.js',
        'src/handlers/expenses.js',
        'src/handlers/profile.js',
        'src/handlers/registration.js',
        'src/app.js',
        'stylesheets/main.css',
        'stylesheets/landing.css',
        'stylesheets/index.css',
        'stylesheets/background.css',
        'stylesheets/background/background1.jpg',
        'stylesheets/background/background2.jpg',
        'stylesheets/background/background3.jpg',
        'stylesheets/background/background4.jpg',
        'stylesheets/background/background5.jpg',
      ])
    })
  )
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
