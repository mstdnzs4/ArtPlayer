var art = new Artplayer({
    container: '.artplayer-app',
    url: '/assets/sample/video.mp4',
    autoSize: true,
    fullscreen: true,
    fullscreenWeb: true,
    plugins: [
        artplayerPluginAds({
            // The ads video url
            url: '/assets/sample/test1.mp4',

            // The ads poster url
            poster: '/assets/sample/test.png',

            // The must-watch seconds of the video
            played: 5,

            // Whether to preload the video
            preload: true,
        }),
    ],
});

// Ads is clicked
art.on('artplayerPluginAds:click', () => {
    console.info('Ads is clicked');
});

// Ads is skipped
art.on('artplayerPluginAds:skip', () => {
    console.info('Ads is skipped');
});
