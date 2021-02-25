import { MediaPluginState } from '../../pm-plugins/types';
import { MediaFeatureFlags } from '@atlaskit/media-common/mediaFeatureFlags';
declare type Props = {
    mediaState: MediaPluginState;
    isOpen?: boolean;
    onBrowseFn: (browse: () => void) => void;
    featureFlags?: MediaFeatureFlags;
};
export declare const BrowserWrapper: ({ mediaState, isOpen, onBrowseFn, featureFlags, }: Props) => JSX.Element;
export {};
