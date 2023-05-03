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
     * The must-watch duration of the video, in seconds
     */
    played?: number;

    /**
     * Whether to preload the video
     */
    preload?: boolean;

    /**
     * When the ads is mounted
     */
    mounted?(this: Ads, $ads: HTMLDivElement, $video: HTMLVideoElement): void;
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
     * The ads element
     */
    $ads: null | HTMLDivElement;

    /**
     * The video element
     */
    $video: null | HTMLVideoElement;

    /**
     * The control element
     */
    $control: null | HTMLDivElement;
};

declare const artplayerPluginAds: (option: Option) => (art: Artplayer) => Ads;
