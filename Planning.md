# PWA workshop

## Content
- What is a PWA
- Demo (this can be achieved)
- Famous examples (Twitter, Ali express, Trivago, Washington Post...)
- Code
  - Minimum req vs 'all the way'
  - Service worker | Manifest
    - Caching strategies
  - 
    - Important fields (3)

## Demo

[iDRR PWA v2](https://pwa.s24.net/)

## Questions Studio 24

**Whats possible now? What are the limitations at present? What might be possible in the future?**
- Caniuse
- Memory of devices (aim for 50 MB max)
- Push notification
- Future
    - Background Sync (Already in Chrome, demo van Jake?)
    - [demo](https://www.youtube.com/watch?v=oiVyIT7ljC0)
    - Web Push Notifications


**Why would someone use a PWA over a native app, given the answers to my initial questions? (Why should we make a PWA instead a native app)**
- No knowledge needed of specific languages (except latest JS...)
- Faster development (why)
  - Just a regular website with a SW & manifest
- Existing website can be reused (website of serviceworker?)
- No need for the android/iOS store (client & company)

**How much control do we have over local storage/cache? How does the browser decide to clear it?**
- The Cache API is the cache storage available in serviceworker.
- Browser clearing (From O'Reilly)
    - In addition to a storage limit per site (also known as an origin), most browsers will also set a size limit for their entire cache. When the cache passes this limit, the browser will delete the caches of the site accessed the longest time ago (also known as the least recently used).
    - Browsers will never delete only part of your site’s cache. Either your site’s entire cache will be deleted or none of it will be. This ensures your site never has an unpredictable partial cache.
- Localstorage is not really SW specific
- ServiceWorker file expiration header very short (1 to 10 minutes)

[https://developers.google.com/web/fundamentals/web-app-manifest/](https://developers.google.com/web/fundamentals/web-app-manifest/)

## Sources

[https://serviceworke.rs](https://serviceworke.rs)

```javascript
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful');
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
```