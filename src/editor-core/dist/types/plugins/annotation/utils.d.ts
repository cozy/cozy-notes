import { ResolvedPos, Mark, Node, Slice } from 'prosemirror-model';
import { EditorState, Selection, PluginKey, TextSelection, AllSelection } from 'prosemirror-state';
import { Decoration } from 'prosemirror-view';
import { AnnotationInfo, AnnotationSelectionType } from './types';
import { InlineCommentPluginState } from './pm-plugins/types';
import { INPUT_METHOD } from '../analytics';
import { AnalyticsEventPayloadCallback } from '../analytics/utils';
/**
 * Finds the marks in the nodes to the left and right.
 * @param $pos Position to center search around
 */
export declare const surroundingMarks: ($pos: ResolvedPos) => Mark<any>[][];
/**
 * Finds annotation marks, and returns their IDs.
 * @param marks Array of marks to search in
 */
export declare const filterAnnotationIds: (marks: Array<Mark>) => Array<string>;
/**
 * Re-orders the annotation array based on the order in the document.
 *
 * This places the marks that do not appear in the surrounding nodes
 * higher in the list. That is, the inner-most one appears first.
 *
 * Undo, for example, can re-order annotation marks in the document.
 * @param annotations annotation metadata
 * @param $from location to look around (usually the selection)
 */
export declare const reorderAnnotations: (annotations: Array<AnnotationInfo>, $from: ResolvedPos) => void;
export declare const getAllAnnotations: (doc: Node) => string[];
export declare const getSelectionStartRect: () => ClientRect | null;
export declare const addDraftDecoration: (start: number, end: number) => Decoration<{
    [key: string]: any;
} & import("prosemirror-view").InlineDecorationSpec>;
export declare const getAnnotationViewKey: (annotations: AnnotationInfo[]) => string;
export declare const findAnnotationsInSelection: (selection: Selection, doc: Node) => AnnotationInfo[];
/**
 * get selection from position to apply new comment for
 * @return bookmarked positions if they exists, otherwise current selection positions
 */
export declare function getSelectionPositions(editorState: EditorState, inlineCommentState: InlineCommentPluginState): Selection;
export declare const inlineCommentPluginKey: PluginKey<any, any>;
export declare const getPluginState: (state: EditorState) => InlineCommentPluginState;
/**
 * get payload for the open/close analytics event
 */
export declare const getDraftCommandAnalyticsPayload: (drafting: boolean, inputMethod: INPUT_METHOD.TOOLBAR | INPUT_METHOD.SHORTCUT) => AnalyticsEventPayloadCallback;
export declare const isSelectionValid: (state: EditorState) => AnnotationSelectionType;
export declare const hasInvalidNodes: (state: EditorState) => boolean;
/**
 * Checks if any of the nodes in a given selection are completely whitespace
 * This is to conform to Confluence annotation specifications
 */
export declare function hasWhitespaceNode(selection: TextSelection | AllSelection): boolean;
export declare function hasAnnotationMark(node: Node, state: EditorState): boolean;
export declare function annotationExists(annotationId: string, state: EditorState): boolean;
export declare function containsAnyAnnotations(slice: Slice, state: EditorState): boolean;
export declare function stripNonExistingAnnotations(slice: Slice, state: EditorState): false | undefined;
