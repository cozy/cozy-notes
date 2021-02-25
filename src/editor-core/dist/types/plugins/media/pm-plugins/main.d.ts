import { Node as PMNode, Schema } from 'prosemirror-model';
import { EditorState, Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { MediaClientConfig } from '@atlaskit/media-core';
import { RichMediaLayout as MediaSingleLayout } from '@atlaskit/adf-schema';
import { ContextIdentifierProvider, MediaProvider } from '@atlaskit/editor-common';
import { Dispatch } from '../../../event-dispatcher';
import { ProsemirrorGetPosHandler } from '../../../nodeviews';
import { MediaPluginOptions } from '../media-plugin-options';
import { MediaOptions, MediaState, MediaStateStatus } from '../types';
import PickerFacade, { MediaStateEventSubscriber } from '../picker-facade';
import { MediaNodeWithPosHandler, MediaPluginState } from './types';
export type { MediaState, MediaProvider, MediaStateStatus };
export { stateKey } from './plugin-key';
export declare class MediaPluginStateImplementation implements MediaPluginState {
    allowsUploads: boolean;
    mediaClientConfig?: MediaClientConfig;
    uploadMediaClientConfig?: MediaClientConfig;
    ignoreLinks: boolean;
    waitForMediaUpload: boolean;
    allUploadsFinished: boolean;
    showDropzone: boolean;
    element?: HTMLElement;
    layout: MediaSingleLayout;
    mediaNodes: MediaNodeWithPosHandler[];
    mediaGroupNodes: Record<string, any>;
    mobileUploadComplete: Record<string, boolean>;
    options: MediaPluginOptions;
    mediaProvider?: MediaProvider;
    private pendingTask;
    private view;
    private destroyed;
    private contextIdentifierProvider?;
    private errorReporter;
    private popupPicker?;
    private customPicker?;
    private removeOnCloseListener;
    private openMediaPickerBrowser?;
    private onPopupToogleCallback;
    private reactContext;
    pickers: PickerFacade[];
    pickerPromises: Array<Promise<PickerFacade>>;
    editingMediaSinglePos?: number;
    showEditingDialog?: boolean;
    mediaOptions?: MediaOptions;
    dispatch?: Dispatch;
    constructor(state: EditorState, options: MediaPluginOptions, reactContext: () => {}, mediaOptions?: MediaOptions, dispatch?: Dispatch);
    onContextIdentifierProvider: (_name: string, provider?: Promise<ContextIdentifierProvider> | undefined) => Promise<void>;
    setMediaProvider: (mediaProvider?: Promise<MediaProvider> | undefined) => Promise<void>;
    getMediaOptions: () => MediaPluginOptions;
    updateElement(): void;
    private hasUserAuthProvider;
    private getDomElement;
    /**
     * we insert a new file by inserting a initial state for that file.
     *
     * called when we insert a new file via the picker (connected via pickerfacade)
     */
    insertFile: (mediaState: MediaState, onMediaStateChanged: MediaStateEventSubscriber, pickerType?: string | undefined) => void;
    addPendingTask: (promise: Promise<any>) => void;
    splitMediaGroup: () => boolean;
    onPopupPickerClose: () => void;
    shouldUseMediaPickerPopup: () => boolean;
    showMediaPicker: () => void;
    setBrowseFn: (browseFn: () => void) => void;
    onPopupToggle: (onPopupToogleCallback: (isOpen: boolean) => void) => void;
    /**
     * Returns a promise that is resolved after all pending operations have been finished.
     * An optional timeout will cause the promise to reject if the operation takes too long
     *
     * NOTE: The promise will resolve even if some of the media have failed to process.
     */
    waitForPendingTasks: (timeout?: number | undefined, lastTask?: Promise<MediaState | null> | undefined) => Promise<MediaState | null>;
    setView(view: EditorView): void;
    /**
     * Called from React UI Component when user clicks on "Delete" icon
     * inside of it
     */
    handleMediaNodeRemoval: (node: PMNode | undefined, getPos: ProsemirrorGetPosHandler) => void;
    /**
     * Called from React UI Component on componentDidMount
     */
    handleMediaNodeMount: (node: PMNode, getPos: ProsemirrorGetPosHandler) => void;
    /**
     * Called from React UI Component on componentWillUnmount and UNSAFE_componentWillReceiveProps
     * when React component's underlying node property is replaced with a new node
     */
    handleMediaNodeUnmount: (oldNode: PMNode) => void;
    destroy(): void;
    findMediaNode: (id: string) => MediaNodeWithPosHandler | null;
    private destroyAllPickers;
    private destroyPickers;
    private initPickers;
    private getInputMethod;
    updateMediaNodeAttrs: (id: string, attrs: object, isMediaSingle: boolean) => boolean | undefined;
    private collectionFromProvider;
    private handleMediaState;
    isMobileUploadCompleted: (mediaId: string) => boolean | undefined;
    removeNodeById: (state: MediaState) => void;
    removeSelectedMediaContainer: () => boolean;
    selectedMediaContainerNode: () => PMNode | undefined;
    handleDrag: (dragState: 'enter' | 'leave') => void;
    updateAndDispatch(props: Partial<Pick<this, 'allowsUploads' | 'allUploadsFinished'>>): void;
}
export declare const getMediaPluginState: (state: EditorState) => MediaPluginState;
export declare const createPlugin: (_schema: Schema, options: MediaPluginOptions, reactContext: () => {}, dispatch?: Dispatch<any> | undefined, mediaOptions?: MediaOptions | undefined) => Plugin<any, any>;
