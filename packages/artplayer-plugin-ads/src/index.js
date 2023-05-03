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
        let $control = null;
        let blobUrl = null;
        let playing = false;

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

            art.proxy($video, 'error', skip);
            art.proxy($video, 'canplay', play);
            art.proxy($video, 'timeupdate', update);
            art.proxy($video, 'click', () => {
                playing ? pause() : play();
                art.emit('artplayerPluginAds:click');
            });

            return $video;
        }

        function createControl($ads) {
            const $control = append($ads, `<div>5</div>`);

            setStyles($control, {
                position: 'absolute',
                zIndex: 10,
                right: '0px',
                bottom: '30px',
                lineHeight: 1,
                padding: '5px 8px',
                border: '1px solid #fff',
                backgroundColor: '#000',
                borderRight: 'none',
                fontSize: '15px',
                opacity: '0.5',
            });

            art.events.hover(
                $control,
                () => {
                    setStyles($control, {
                        opacity: '1',
                    });
                },
                () => {
                    setStyles($control, {
                        opacity: '0.5',
                    });
                },
            );

            return $control;
        }

        function init() {
            if ($ads || !option.url) return;
            art.pause();
            $ads = createAds();
            $video = createVideo($ads);
            $control = createControl($ads);
            art.emit('artplayerPluginAds:mounted', { $ads, $video, $control });

            if (option.mounted) {
                option.mounted.call(art.plugins.artplayerPluginAds, $ads, $video, $control);
            }
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
            get $ads() {
                return $ads;
            },
            get $video() {
                return $video;
            },
            get $control() {
                return $control;
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
