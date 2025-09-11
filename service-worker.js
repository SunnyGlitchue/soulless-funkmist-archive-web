self.addEventListener('install', (event) => {
  console.log('Service Worker installed');
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  console.log('Fetch event for:', event.request.url);
});
