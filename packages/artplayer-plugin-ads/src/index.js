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

        function skip() {
            pause();
            art.play();
            setStyles($ads, { display: 'none' });
            art.emit('artplayerPluginAds:skip');
        }

        async function play() {
            try {
                await $video.play();
            } catch (error) {
                $video.muted = true;
                $video.play();
            }
            art.emit('artplayerPluginAds:play');
        }

        function pause() {
            $video.pause();
            art.emit('artplayerPluginAds:pause');
        }

        function update() {
            art.emit('artplayerPluginAds:update', {
                currentTime: $video.currentTime,
                duration: $video.duration,
            });
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
            return $video;
        }

        function init() {
            if ($ads || !option.url) return;
            art.pause();
            $ads = createAds();
            $video = createVideo($ads);
            art.proxy($video, 'error', skip);
            art.proxy($video, 'ended', skip);
            art.proxy($video, 'canplay', play);
            art.proxy($video, 'timeupdate', update);
            art.proxy($video, 'click', () => art.emit('artplayerPluginAds:click'));
            art.proxy(document, 'visibilitychange', () => (document.hidden ? pause() : play()));
            art.emit('artplayerPluginAds:init', { $ads, $video });
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
