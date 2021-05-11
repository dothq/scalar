if ('serviceWorker' in navigator) {
    navigator
        .serviceWorker
        .register(
            'sw.js'
        )

        .then((_) => {
            console.log(`Service Worker registered.`);
        });
}