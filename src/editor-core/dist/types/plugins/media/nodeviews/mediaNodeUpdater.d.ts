import { MediaADFAttrs } from '@atlaskit/adf-schema';
import { MediaProvider } from '@atlaskit/editor-common';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { ContextIdentifierProvider } from '@atlaskit/editor-common';
import { DispatchAnalyticsEvent } from '../../analytics';
import { MediaOptions } from '../types';
import { ProsemirrorGetPosHandler } from '../../../nodeviews';
export declare type RemoteDimensions = {
    id: string;
    height: number;
    width: number;
};
export interface MediaNodeUpdaterProps {
    view: EditorView;
    node: PMNode;
    mediaProvider?: Promise<MediaProvider>;
    contextIdentifierProvider?: Promise<ContextIdentifierProvider>;
    isMediaSingle: boolean;
    mediaOptions?: MediaOptions;
    dispatchAnalyticsEvent?: DispatchAnalyticsEvent;
}
export declare class MediaNodeUpdater {
    props: MediaNodeUpdaterProps;
    constructor(props: MediaNodeUpdaterProps);
    isMediaBlobUrl(): boolean;
    updateContextId: () => Promise<void>;
    hasFileAttributesDefined: () => string | false | 0 | null | undefined;
    updateFileAttrs: (isMediaSingle?: boolean) => Promise<void>;
    getAttrs: () => MediaADFAttrs | undefined;
    getObjectId: () => Promise<string | undefined>;
    uploadExternalMedia: (getPos: ProsemirrorGetPosHandler) => Promise<void>;
    getNodeContextId: () => string | undefined;
    updateDimensions: (dimensions: RemoteDimensions) => void;
    getRemoteDimensions(): Promise<false | RemoteDimensions>;
    hasDifferentContextId: () => Promise<boolean>;
    isNodeFromDifferentCollection: () => Promise<boolean>;
    handleExternalMedia(getPos: ProsemirrorGetPosHandler): Promise<void>;
    copyNodeFromBlobUrl: (getPos: ProsemirrorGetPosHandler) => Promise<void>;
    copyNode: () => Promise<void>;
}
