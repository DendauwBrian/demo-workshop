// The name of the cache
var CACHE = "demo-v0.0.3";

// The path needs to be where the projects resides in.
const BASE_PATH = "";

// Initial files to cache on first visit
var filesToCache = [`${BASE_PATH}/`, `${BASE_PATH}/index.html`, `${BASE_PATH}/offline.html`];

self.addEventListener("install", installEvent => {
  console.log("[ServiceWorker] installing");
  installEvent.waitUntil(
    caches
      .open(CACHE)
      .then(staticCache => {
        console.log(
          "[install] Caches opened, adding all core components to cache"
        );
        return staticCache.addAll(filesToCache);
      })
      .then(() => {
        console.log(
          "[install] All required resources have been cached, we're good!"
        );
        return self.skipWaiting();
      })
      .catch(error => {
        console.error("Error opening cache in install", error);
      })
  );
});

self.addEventListener("activate", function(event) {
  console.log("[Serviceworker] Actived");
  event.waitUntil(
    caches
      .keys()
      .then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName !== CACHE) {
              console.log("[ServiceWorker] Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(function() {
        console.log("[ServiceWorker] Claiming clients for version", CACHE);
        var temp = self.clients.claim();
        self.clients.matchAll().then(function(clients) {
          clients.forEach(function(client) {
            client.postMessage({
              msg: "refresh"
            });
          });
        });
        return temp;
      })
  );
});

self.addEventListener("fetch", function(event) {
  let request = event.request;
  event.respondWith(this.fromCache(request));
  event.waitUntil(this.updateCache(request));
});

function fromCache(request) {
  return caches
    .open(CACHE)
    .then(cache => {
      return cache.match(request).then(response => {
        return (
          response ||
          fetch(request).then(response => {
            cache.put(request, response.clone());
            return response;
          })
        );
      });
    })
    .catch(error => {
      return caches.match("/offline.html");
    });
}

function updateCache(request) {
  return caches.open(CACHE).then(function(cache) {
    return fetch(request).then(function(response) {
      return cache.put(request, response);
    });
  });
}
