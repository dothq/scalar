self.addEventListener('fetch', function (event) {
    console.log(event.request.url);
});

self.addEventListener('updatefound', function (event) {
    window.location.reload();
});