import React from 'react';
import { ClipboardConfig, BrowserConfig, DropzoneConfig } from '@atlaskit/media-picker/types';
import { MediaClientConfig } from '@atlaskit/media-core';
import PickerFacade from '../../picker-facade';
import { MediaPluginState } from '../../pm-plugins/types';
export interface ChildrenProps {
    config: ClipboardConfig | BrowserConfig | DropzoneConfig;
    mediaClientConfig: MediaClientConfig;
    pickerFacadeInstance: PickerFacade;
}
export declare type Props = {
    mediaState: MediaPluginState;
    analyticsName: string;
    children: (props: ChildrenProps) => React.ReactNode;
};
declare type State = {
    config?: ClipboardConfig | BrowserConfig | DropzoneConfig;
    mediaClientConfig?: MediaClientConfig;
    pickerFacadeInstance?: PickerFacade;
};
export default class PickerFacadeProvider extends React.Component<Props, State> {
    state: State;
    private handleMediaProvider;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): {} | null | undefined;
}
export {};
