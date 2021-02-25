import { MediaPluginState } from '../../pm-plugins/types';
import { MediaFeatureFlags } from '@atlaskit/media-common/mediaFeatureFlags';
declare type Props = {
    mediaState: MediaPluginState;
    featureFlags?: MediaFeatureFlags;
};
export declare const ClipboardWrapper: ({ mediaState, featureFlags }: Props) => JSX.Element;
export {};
