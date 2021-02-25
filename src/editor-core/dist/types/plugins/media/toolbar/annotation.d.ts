import React from 'react';
import { MediaClientConfig } from '@atlaskit/media-core';
import { EditorView } from 'prosemirror-view';
import { InjectedIntl } from 'react-intl';
import { MediaPluginState } from '../pm-plugins/types';
declare type AnnotationToolbarProps = {
    viewMediaClientConfig: MediaClientConfig;
    id: string;
    collection?: string;
    intl: InjectedIntl;
    view?: EditorView;
};
export declare class AnnotationToolbar extends React.Component<AnnotationToolbarProps> {
    state: {
        isImage: boolean;
    };
    componentDidMount(): Promise<void>;
    checkIsImage(): Promise<void>;
    componentDidUpdate(prevProps: AnnotationToolbarProps): void;
    onClickAnnotation: () => void;
    render(): JSX.Element | null;
}
export declare const renderAnnotationButton: (pluginState: MediaPluginState, intl: InjectedIntl) => (view?: EditorView<any> | undefined, idx?: number | undefined) => JSX.Element | null;
export {};
