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
};

declare const artplayerPluginAds: (option: Option) => (art: Artplayer) => Ads;
