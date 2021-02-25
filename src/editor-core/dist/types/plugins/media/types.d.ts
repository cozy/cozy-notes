import { EditorView } from 'prosemirror-view';
import { NodeType } from 'prosemirror-model';
import { ProviderFactory } from '@atlaskit/editor-common';
import { Providers } from '@atlaskit/editor-common/provider-factory';
import { FileIdentifier } from '@atlaskit/media-client';
import { MediaClientConfig } from '@atlaskit/media-core';
import { MediaFeatureFlags } from '@atlaskit/media-common';
import { UploadParams, MediaFile } from '@atlaskit/media-picker/types';
import { PlaceholderTextOptions } from '../../plugins/placeholder-text/types';
export declare type MediaStateStatus = 'unknown' | 'ready' | 'cancelled' | 'preview' | 'error' | 'mobile-upload-end';
export interface MediaOptions {
    provider?: Providers['mediaProvider'];
    allowMediaSingle?: boolean | MediaSingleOptions;
    allowMediaGroup?: boolean;
    customDropzoneContainer?: HTMLElement;
    customMediaPicker?: CustomMediaPicker;
    allowResizing?: boolean;
    allowResizingInTables?: boolean;
    allowAnnotation?: boolean;
    allowLinking?: boolean;
    allowLazyLoading?: boolean;
    allowBreakoutSnapPoints?: boolean;
    allowAdvancedToolBarOptions?: boolean;
    allowMediaSingleEditable?: boolean;
    allowRemoteDimensionsFetch?: boolean;
    allowDropzoneDropLine?: boolean;
    allowMarkingUploadsAsIncomplete?: boolean;
    fullWidthEnabled?: boolean;
    uploadErrorHandler?: (state: MediaState) => void;
    waitForMediaUpload?: boolean;
    isCopyPasteEnabled?: boolean;
    allowAltTextOnImages?: boolean;
    altTextValidator?: (value: string) => string[];
    useForgePlugins?: boolean;
    useMediaPickerPopup?: boolean;
    allowTemplatePlaceholders?: boolean | PlaceholderTextOptions;
    UNSAFE_allowImageCaptions?: boolean;
    alignLeftOnInsert?: boolean;
    featureFlags?: MediaFeatureFlags;
}
export interface MediaSingleOptions {
    disableLayout?: boolean;
}
export interface MediaState {
    id: string;
    status?: MediaStateStatus;
    fileName?: string;
    fileSize?: number;
    fileMimeType?: string;
    collection?: string;
    dimensions?: {
        width: number | undefined;
        height: number | undefined;
    };
    scaleFactor?: number;
    error?: {
        name: string;
        description: string;
    };
    /** still require to support Mobile */
    publicId?: string;
    contextId?: string;
}
export declare type Listener = (data: any) => void;
export interface CustomMediaPicker {
    on(event: string, cb: Listener): void;
    removeAllListeners(event: any): void;
    emit(event: string, data: any): void;
    destroy(): void;
    setUploadParams(uploadParams: UploadParams): void;
}
export declare type MobileUploadEndEventPayload = {
    readonly file: MediaFile & {
        readonly collectionName?: string;
        readonly publicId?: string;
    };
};
export declare type MediaEditorState = {
    mediaClientConfig?: MediaClientConfig;
    editor?: {
        pos: number;
        identifier: FileIdentifier;
    };
};
export declare type OpenMediaEditor = {
    type: 'open';
    pos: number;
    identifier: FileIdentifier;
};
export declare type UploadAnnotation = {
    type: 'upload';
    newIdentifier: FileIdentifier;
};
export declare type CloseMediaEditor = {
    type: 'close';
};
export declare type SetMediaMediaClientConfig = {
    type: 'setMediaClientConfig';
    mediaClientConfig?: MediaClientConfig;
};
export declare type MediaEditorAction = OpenMediaEditor | CloseMediaEditor | UploadAnnotation | SetMediaMediaClientConfig;
export declare type MediaToolbarBaseConfig = {
    title: string;
    getDomRef?: (view: EditorView) => HTMLElement | undefined;
    nodeType: NodeType | NodeType[];
};
export declare type MediaFloatingToolbarOptions = {
    providerFactory?: ProviderFactory;
    allowResizing?: boolean;
    allowAnnotation?: boolean;
    allowLinking?: boolean;
    allowAdvancedToolBarOptions?: boolean;
    allowResizingInTables?: boolean;
    allowAltTextOnImages?: boolean;
    altTextValidator?: (value: string) => string[];
};
