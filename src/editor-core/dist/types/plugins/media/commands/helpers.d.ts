import { Command } from '../../../types/command';
import { MediaNodeWithPosHandler, MediaPluginState } from '../pm-plugins/types';
export declare const findMediaSingleNode: (mediaPluginState: MediaPluginState, id: string) => MediaNodeWithPosHandler | null;
export declare const findAllMediaSingleNodes: (mediaPluginState: MediaPluginState, id: string) => MediaNodeWithPosHandler[];
export declare const findMediaNode: (mediaPluginState: MediaPluginState, id: string, isMediaSingle: boolean) => MediaNodeWithPosHandler | null;
export declare const isMobileUploadCompleted: (mediaPluginState: MediaPluginState, mediaId: string) => boolean | undefined;
export declare const updateAllMediaNodesAttrs: (id: string, attrs: object, isMediaSingle: boolean) => Command;
export declare const updateMediaNodeAttrs: (id: string, attrs: object, isMediaSingle: boolean) => Command;
export declare const replaceExternalMedia: (pos: number, attrs: object) => Command;
