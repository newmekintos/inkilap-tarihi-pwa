const CACHE_VERSION = 'v4.0'; // Network-first strategy + auto-update fix
const CACHE_NAME = `inkilap-tarihi-${CACHE_VERSION}`;

// Files that should use network-first (HTML, CSS, JS)
const networkFirstUrls = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './content.js'
];

// Files that can use cache-first (images, manifest)
const cacheFirstUrls = [
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './favicon.ico'
];

const urlsToCache = [...networkFirstUrls, ...cacheFirstUrls];

// Listen for SKIP_WAITING message
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('📨 Received SKIP_WAITING message');
    self.skipWaiting();
  }
});

// Install event - cache files
self.addEventListener('install', (event) => {
  console.log('🔄 Service Worker installing... Version:', CACHE_VERSION);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('✅ Cache opened:', CACHE_NAME);
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('✅ All files cached!');
      })
  );
  // Auto-skip waiting for immediate activation
  self.skipWaiting();
});

// Helper function to check if URL should use network-first
function shouldUseNetworkFirst(url) {
  return networkFirstUrls.some(pattern => url.includes(pattern.replace('./', '')));
}

// Fetch event - Smart caching strategy
self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  
  // Network-first strategy for HTML, CSS, JS
  if (shouldUseNetworkFirst(url)) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone and cache the response
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          console.log('📡 Network-first:', event.request.url);
          return response;
        })
        .catch(() => {
          // Network failed, try cache
          console.log('💾 Network failed, using cache:', event.request.url);
          return caches.match(event.request);
        })
    );
  } 
  // Cache-first strategy for images and static files
  else {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            console.log('💾 Cache-first:', event.request.url);
            return response;
          }
          return fetch(event.request).then((response) => {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
            return response;
          });
        })
    );
  }
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker activating... Version:', CACHE_VERSION);
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      console.log('📦 Found caches:', cacheNames);
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      console.log('✅ Service Worker activated! Current version:', CACHE_VERSION);
      console.log('🔄 Claiming all clients...');
      return self.clients.claim();
    })
  );
});
