var app = "news-app-"
var version = 'v1'
var cacheList = [
    '/',
    './index.html',
    './favicon.ico',
    './main.css',
    './main.js',
    './assets/images/newspaper-144.png',
    './assets/images/newspaper-152.png',
    './assets/images/newspaper-512.png'
]


self.addEventListener('install' ,function(event){
    event.waitUntil(
        caches.open(app+version).then(function(cache){
            cache.addAll(cacheList)
        })
    )
});

self.addEventListener('fetch', event =>{
    var req = event.request;
    var url = new URL(req.url)
    if(url.origin == location.origin){
        event.respondWith(cacheFirst(req));
    }else{
        return event.respondWith(netFirst(req))
    }
})
async function cacheFirst(request){
    
    let  cache = await caches.match(request);
    return cache || fetch(request) 
    
}
async function netFirst(req){
    const dynamicCache = await caches.open('v1-dynamic');
    try {
      const networkResponse = await fetch(req);
      dynamicCache.put(req, networkResponse.clone());
      return networkResponse;
    } catch (err) {
      const cacheResponse = await caches.match(req);
      return cacheResponse;
    }     
}