import { Node as PMNode, ResolvedPos, Slice, Schema } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { ProsemirrorGetPosHandler } from '../../../nodeviews';
import { MediaState } from '../types';
import { MediaADFAttrs } from '@atlaskit/adf-schema';
export declare const isMediaBlobUrlFromAttrs: (attrs: MediaADFAttrs) => boolean;
export declare const posOfMediaGroupNearby: (state: EditorState) => number | undefined;
export declare const isSelectionNonMediaBlockNode: (state: EditorState) => boolean;
export declare const isSelectionMediaSingleNode: (state: EditorState) => boolean;
export declare const posOfPrecedingMediaGroup: (state: EditorState) => number | undefined;
/**
 * Determine whether the cursor is inside empty paragraph
 * or the selection is the entire paragraph
 */
export declare const isInsidePotentialEmptyParagraph: (state: EditorState) => boolean;
export declare const posOfMediaGroupBelow: (state: EditorState, $pos: ResolvedPos, prepend?: boolean) => number | undefined;
export declare const posOfParentMediaGroup: (state: EditorState, $pos?: ResolvedPos<any> | undefined, prepend?: boolean) => number | undefined;
/**
 * The function will return the position after current selection where mediaGroup can be inserted.
 */
export declare function endPositionForMedia(state: EditorState, resolvedPos: ResolvedPos): number;
export declare const removeMediaNode: (view: EditorView, node: PMNode, getPos: ProsemirrorGetPosHandler) => void;
export declare const splitMediaGroup: (view: EditorView) => boolean;
export declare const copyOptionalAttrsFromMediaState: (mediaState: MediaState, node: PMNode) => void;
export declare const transformSliceToCorrectMediaWrapper: (slice: Slice, schema: Schema) => Slice<any>;
/**
 * Given a html string, we attempt to hoist any nested `<img>` tags,
 * not wrapped by a `<div>` as ProseMirror no-op's on those scenarios.
 * @param html
 */
export declare const unwrapNestedMediaElements: (html: string) => string;
export declare const getMediaNodeFromSelection: (state: EditorState) => PMNode | null;
