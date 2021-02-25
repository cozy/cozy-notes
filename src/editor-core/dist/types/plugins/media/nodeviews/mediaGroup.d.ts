import { ContextIdentifierProvider, MediaProvider, ProviderFactory } from '@atlaskit/editor-common';
import { Identifier } from '@atlaskit/media-client';
import { MediaClientConfig } from '@atlaskit/media-core';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import React from 'react';
import { EventDispatcher } from '../../../event-dispatcher';
import { getPosHandler } from '../../../nodeviews/';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import { MediaOptions } from '../types';
export declare type MediaGroupProps = {
    forwardRef?: (ref: HTMLElement) => void;
    node: PMNode;
    view: EditorView;
    getPos: () => number;
    disabled?: boolean;
    allowLazyLoading?: boolean;
    mediaProvider: Promise<MediaProvider>;
    contextIdentifierProvider?: Promise<ContextIdentifierProvider>;
    isCopyPasteEnabled?: boolean;
    anchorPos: number;
    headPos: number;
    mediaOptions: MediaOptions;
};
export interface MediaGroupState {
    viewMediaClientConfig?: MediaClientConfig;
}
export default class MediaGroup extends React.Component<MediaGroupProps, MediaGroupState> {
    static displayName: string;
    private mediaPluginState;
    private mediaNodes;
    state: MediaGroupState;
    constructor(props: MediaGroupProps);
    componentDidMount(): void;
    private updateNodeAttrs;
    UNSAFE_componentWillReceiveProps(props: MediaGroupProps): void;
    shouldComponentUpdate(nextProps: MediaGroupProps): boolean;
    updateMediaClientConfig(): void;
    setMediaItems: (props: MediaGroupProps) => void;
    getIdentifier: (item: PMNode) => Identifier;
    isNodeSelected: (nodePos: number) => boolean;
    renderChildNodes: () => JSX.Element;
    render(): JSX.Element;
}
export declare const ReactMediaGroupNode: (portalProviderAPI: PortalProviderAPI, eventDispatcher: EventDispatcher, providerFactory: ProviderFactory, mediaOptions?: MediaOptions) => (node: PMNode, view: EditorView, getPos: getPosHandler) => NodeView;
