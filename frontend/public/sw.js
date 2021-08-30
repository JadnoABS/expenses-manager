//self.addEventListener('install', (event) => {
  //event.waitUntil(
    //caches.open('sw-cache').then((cache) => {
      //return cache.addAll([
        //'/',
        //'/src/handlers/profile.js',
        //'/src/handlers/expenses.js',
        //'/src/handlers/login.js',
        //'/src/handlers/registration.js',
        //'/src/app.js',
        //'/stylesheets/main.css',
        //'/stylesheets/landing.css',
        //'/stylesheets/index.css',
        //'/stylesheets/background.css',
        //'/stylesheets/background/background1.jpg',
        //'/stylesheets/background/background2.jpg',
        //'/stylesheets/background/background3.jpg',
        //'/stylesheets/background/background4.jpg',
        //'/stylesheets/background/background5.jpg',
      //])
    //})
  //)
//});

//self.addEventListener('fetch', (event) => {
  //event.respondWith(
    //caches.match(event.request).then((response) => {
      //return response || fetch(event.request);
    //})
  //);
//});

self.addEventListener("install", function(event) {
  event.waitUntil(preLoad());
});

var preLoad = function(){
  console.log("Installing web app");
  return caches.open("offline").then(function(cache) {
    console.log("caching index and important routes");
    return cache.addAll([
        '/',
        '/src/handlers/profile.js',
        '/src/handlers/expenses.js',
        '/src/handlers/login.js',
        '/src/handlers/registration.js',
        '/src/app.js',
        '/stylesheets/main.css',
        '/stylesheets/landing.css',
        '/stylesheets/index.css',
        '/stylesheets/background.css',
        '/stylesheets/background/background1.jpg',
        '/stylesheets/background/background2.jpg',
        '/stylesheets/background/background3.jpg',
        '/stylesheets/background/background4.jpg',
        '/stylesheets/background/background5.jpg',
      ]);
  });
};

self.addEventListener("fetch", function(event) {
  event.respondWith(checkResponse(event.request).catch(function() {
    return returnFromCache(event.request);
  }));
  event.waitUntil(addToCache(event.request));
});

var checkResponse = function(request){
  return new Promise(function(fulfill, reject) {
    fetch(request).then(function(response){
      if(response.status !== 404) {
        fulfill(response);
      } else {
        reject();
      }
    }, reject);
  });
};

var addToCache = function(request){
  return caches.open("offline").then(function (cache) {
    return fetch(request).then(function (response) {
      console.log(response.url + " was cached");
      return cache.put(request, response);
    });
  });
};

var returnFromCache = function(request){
  return caches.open("offline").then(function (cache) {
    return cache.match(request).then(function (matching) {
     if(!matching || matching.status == 404) {
       return cache.match("offline.html");
     } else {
       return matching;
     }
    });
  });
};
