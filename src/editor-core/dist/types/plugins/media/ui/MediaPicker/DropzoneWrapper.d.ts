import { MediaPluginState } from '../../pm-plugins/types';
import { MediaFeatureFlags } from '@atlaskit/media-common/mediaFeatureFlags';
declare type Props = {
    mediaState: MediaPluginState;
    isActive: boolean;
    featureFlags?: MediaFeatureFlags;
};
export declare const DropzoneWrapper: ({ mediaState, isActive, featureFlags, }: Props) => JSX.Element;
export {};
