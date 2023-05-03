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

            // When the ads is mounted
            mounted($ads, $video) {
                // Skip the ads
                // this.skip();

                // Play the ads
                // this.play();

                // Pause the ads
                // this.pause();

                // Whether the ads is playing
                // this.playing;
            }
        }),
    ],
});

// Skip the ads
// art.plugins.artplayerPluginAds.skip();

// Play the ads
// art.plugins.artplayerPluginAds.play();

// Pause the ads
// art.plugins.artplayerPluginAds.pause();

// Whether the ads is playing
// art.plugins.artplayerPluginAds.playing;

// When the ads is clicked
art.on('artplayerPluginAds:click', () => {
    console.info('Ads is clicked');
});

// When the ads is skipped
art.on('artplayerPluginAds:skip', () => {
    console.info('Ads is skipped');
});

// When the ads is play
art.on('artplayerPluginAds:play', () => {
    console.info('Ads is play');
});

// When the ads is pause
art.on('artplayerPluginAds:pause', () => {
    console.info('Ads is pause');
});

// When the ads is update
art.on('artplayerPluginAds:update', (args) => {
    console.info('Ads is update', args);
});

// When the ads is mounted
art.on('artplayerPluginAds:mounted', (args) => {
    console.info('Ads is mounted', args);
});

// When the ads is preload
art.on('artplayerPluginAds:preload', (args) => {
    console.info('Ads is preload', args);
});