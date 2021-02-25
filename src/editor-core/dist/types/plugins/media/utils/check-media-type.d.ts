import { Node as PMNode } from 'prosemirror-model';
import { MediaType } from '@atlaskit/media-client';
import { MediaClientConfig } from '@atlaskit/media-core';
export declare const checkMediaType: (mediaNode: PMNode, mediaClientConfig: MediaClientConfig) => Promise<MediaType | 'external' | undefined>;
