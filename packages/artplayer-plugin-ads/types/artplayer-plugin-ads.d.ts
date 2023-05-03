import type Artplayer from 'artplayer';

export = artplayerPluginAds;
export as namespace artplayerPluginAds;

type Option = {
    /**
     * The ads video url
     */
    url: string;

    /**
     * The ads poster url
     */
    poster?: string;

    /**
     * Whether to preload the video
     */
    preload?: boolean;
};

type Ads = {
    name: 'artplayerPluginAds';

    /**
     * Skip the ads
     */
    skip: () => void;

    /**
     * Stop the ads
     */
    pause: () => void;

    /**
     * Play the ads
     */
    play: () => void;

    /**
     * Whether the ads is playing
     */
    playing: boolean;

    /**
     * The ads currentTime
     */
    currentTime: number;

    /**
     * The ads duration
     */
    duration: number;

    /**
     * The ads element
     */
    $ads: null | HTMLDivElement;

    /**
     * The video element
     */
    $video: null | HTMLVideoElement;
};

declare const artplayerPluginAds: (option: Option) => (art: Artplayer) => Ads;
