import { MediaClientConfig } from '@atlaskit/media-core';
import { FileIdentifier } from '@atlaskit/media-client';
import { Dimensions } from '@atlaskit/media-editor';
export declare const openMediaEditor: (pos: number, identifier: FileIdentifier) => import("../../..").Command;
export declare const closeMediaEditor: () => import("../../..").Command;
export declare const setMediaClientConfig: (mediaClientConfig?: MediaClientConfig | undefined) => import("../../..").Command;
export declare const uploadAnnotation: (newIdentifier: FileIdentifier, newDimensions: Dimensions) => import("../../..").Command;
