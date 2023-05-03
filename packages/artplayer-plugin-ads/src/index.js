export default function artplayerPluginAds(option) {
    return (art) => {
        const {
            template: { $player },
            constructor: {
                utils: { append, setStyles },
            },
        } = art;

        let $ads = null;
        let $video = null;
        let blobUrl = null;
        let playing = false;
        let currentTime = 0;
        let duration = 0;

        function skip() {
            pause();
            art.play();
            setStyles($ads, { display: 'none' });
            art.emit('artplayerPluginAds:skip');
        }

        async function play() {
            setStyles($ads, { display: null });

            if (art.playing) art.pause();

            try {
                playing = true;
                await $video.play();
            } catch (error) {
                $video.muted = true;
                $video.play();
            }

            art.emit('artplayerPluginAds:play');
        }

        function pause() {
            playing = false;
            $video.pause();
            art.emit('artplayerPluginAds:pause');
        }

        function update() {
            currentTime = $video.currentTime;
            duration = $video.duration;
            art.emit('artplayerPluginAds:update');
        }

        function createAds() {
            const $ads = append($player, '<div></div>');

            setStyles($ads, {
                position: 'absolute',
                zIndex: '150',
                inset: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                backgroundColor: '#000',
            });

            return $ads;
        }

        function createVideo($ads) {
            const $video = append(
                $ads,
                `<video src="${blobUrl || option.url}" poster="${blobUrl ? '' : option.poster}" loop playsInline />`,
            );

            setStyles($video, {
                width: '100%',
                height: '100%',
                objectFit: 'contain',
            });

            art.proxy($video, 'error', skip);
            art.proxy($video, 'canplay', play);
            art.proxy($video, 'timeupdate', update);
            art.proxy($video, 'click', () => {
                playing ? pause() : play();
                art.emit('artplayerPluginAds:click');
            });

            return $video;
        }

        function init() {
            if ($ads || !option.url) return;
            art.pause();
            $ads = createAds();
            $video = createVideo($ads);
            art.emit('artplayerPluginAds:mounted');
        }

        art.on('ready', () => {
            art.once('play', init);
            art.once('video:timeupdate', init);
        });

        if (option.preload) {
            (async function preload() {
                const blob = await (await fetch(option.url)).blob();
                blobUrl = URL.createObjectURL(blob);
                art.emit('artplayerPluginAds:preload', blobUrl);
            })();
        }

        return {
            name: 'artplayerPluginAds',
            skip,
            pause,
            play,
            get playing() {
                return playing;
            },
            get currentTime() {
                return currentTime;
            },
            get duration() {
                return duration;
            },
            get $ads() {
                return $ads;
            },
            get $video() {
                return $video;
            },
        };
    };
}

artplayerPluginAds.env = process.env.NODE_ENV;
artplayerPluginAds.version = process.env.APP_VER;
artplayerPluginAds.build = process.env.BUILD_DATE;

if (typeof window !== 'undefined') {
    window['artplayerPluginAds'] = artplayerPluginAds;
}
