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

            // Whether to preload the video
            preload: true,
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

// The ads currentTime
// art.plugins.artplayerPluginAds.currentTime;

// The ads duration
// art.plugins.artplayerPluginAds.duration;

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
art.on('artplayerPluginAds:update', () => {
    console.info('Ads is update');
});

// When the ads is mounted
art.on('artplayerPluginAds:mounted', () => {
    console.info('Ads is mounted');
});

// When the ads is preload
art.on('artplayerPluginAds:preload', (args) => {
    console.info('Ads is preload', args);
});