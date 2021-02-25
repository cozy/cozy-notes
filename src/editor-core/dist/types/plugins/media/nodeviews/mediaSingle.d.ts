import { Component } from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView, Decoration } from 'prosemirror-view';
import { RichMediaLayout as MediaSingleLayout } from '@atlaskit/adf-schema';
import { ProviderFactory, ContextIdentifierProvider } from '@atlaskit/editor-common';
import { CardEvent } from '@atlaskit/media-card';
import { MediaClientConfig } from '@atlaskit/media-core';
import { getPosHandler, ForwardRef, ReactNodeView } from '../../../nodeviews/';
import { EventDispatcher } from '../../../event-dispatcher';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import { MediaOptions } from '../types';
import { MediaSingleNodeProps, MediaSingleNodeViewProps } from './types';
import { MediaNodeUpdater } from './mediaNodeUpdater';
import { DispatchAnalyticsEvent } from '../../analytics';
export interface MediaSingleNodeState {
    width?: number;
    height?: number;
    viewMediaClientConfig?: MediaClientConfig;
    contextIdentifierProvider?: ContextIdentifierProvider;
    isCopying: boolean;
}
export default class MediaSingleNode extends Component<MediaSingleNodeProps, MediaSingleNodeState> {
    static defaultProps: Partial<MediaSingleNodeProps>;
    static displayName: string;
    state: MediaSingleNodeState;
    createMediaNodeUpdater: (props: MediaSingleNodeProps) => MediaNodeUpdater;
    UNSAFE_componentWillReceiveProps(nextProps: MediaSingleNodeProps): void;
    setViewMediaClientConfig: (props: MediaSingleNodeProps) => Promise<void>;
    updateMediaNodeAttributes: (props: MediaSingleNodeProps) => Promise<void>;
    componentDidMount(): Promise<void>;
    selectMediaSingle: ({ event }: CardEvent) => void;
    updateSize: (width: number | null, layout: MediaSingleLayout) => void;
    forwardInnerRef: (elem: HTMLElement) => void;
    render(): JSX.Element;
    private getLineLength;
}
declare class MediaSingleNodeView extends ReactNodeView<MediaSingleNodeViewProps> {
    lastOffsetLeft: number;
    forceViewUpdate: boolean;
    selectionType: number | null;
    createDomRef(): HTMLElement;
    getContentDOM(): {
        dom: HTMLDivElement;
    };
    viewShouldUpdate(nextNode: PMNode): boolean;
    checkAndUpdateSelectionType: () => import("../../../utils/nodes").SelectedState | null;
    isNodeSelected: () => boolean;
    getNodeMediaId(node: PMNode): string | undefined;
    update(node: PMNode, decorations: Decoration[], isValidUpdate?: (currentNode: PMNode, newNode: PMNode) => boolean): boolean;
    render(props: MediaSingleNodeViewProps, forwardRef?: ForwardRef): JSX.Element;
    ignoreMutation(): boolean;
}
export declare const ReactMediaSingleNode: (portalProviderAPI: PortalProviderAPI, eventDispatcher: EventDispatcher, providerFactory: ProviderFactory, dispatchAnalyticsEvent?: DispatchAnalyticsEvent | undefined, mediaOptions?: MediaOptions) => (node: PMNode, view: EditorView, getPos: getPosHandler) => MediaSingleNodeView;
export {};
