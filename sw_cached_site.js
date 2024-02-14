const cacheName = "v2";

self.addEventListener("install", (event) => {
  console.log("Service Worker: Installed");
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activated");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("Service Worker: Clearing Old Cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  console.log("Service Worker: Fetching");
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const cloneResponse = response.clone();
        caches.open(cacheName).then((cache) => {
          cache.put(event.request, cloneResponse);
        });
        return response;
      })
      .catch((error) =>
        caches.match(error.request).then((response) => response)
      )
  );
});
