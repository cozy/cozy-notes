import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { ResolvedPos, MarkType, Mark, Fragment } from 'prosemirror-model';
import { Command, HigherOrderCommand } from '../types/command';
declare type Predicate = (state: EditorState, view?: EditorView) => boolean;
declare const filter: (predicates: Predicate[] | Predicate, cmd: Command) => Command;
declare const isEmptySelectionAtStart: (state: EditorState) => boolean;
declare const isEmptySelectionAtEnd: (state: EditorState) => boolean;
declare const isFirstChildOfParent: (state: EditorState) => boolean;
/**
 * Creates a filter that checks if the node at a given number of parents above the current
 * selection is of the correct node type.
 * @param nodeType The node type to compare the nth parent against
 * @param depthAway How many levels above the current node to check against. 0 refers to
 * the current selection's parent, which will be the containing node when the selection
 * is usually inside the text content.
 */
declare const isNthParentOfType: (nodeType: string, depthAway: number) => (state: EditorState, view?: EditorView<any> | undefined) => boolean;
declare function findCutBefore($pos: ResolvedPos): ResolvedPos | null;
declare const applyMarkOnRange: (from: number, to: number, removeMark: boolean, mark: Mark, tr: Transaction) => Transaction<any>;
/**
 * A wrapper over the default toggleMark, except when we have a selection
 * we only toggle marks on text nodes rather than inline nodes.
 * @param markType
 * @param attrs
 */
declare const toggleMark: (markType: MarkType, attrs?: {
    [key: string]: any;
} | undefined) => Command;
declare const withScrollIntoView: HigherOrderCommand;
export declare type WalkNode = {
    $pos: ResolvedPos;
    foundNode: boolean;
};
/**
 * Walk forwards from a position until we encounter the (inside) start of
 * the next node, or reach the end of the document.
 *
 * @param $startPos Position to start walking from.
 */
declare const walkNextNode: ($startPos: ResolvedPos) => WalkNode;
/**
 * Walk backwards from a position until we encounter the (inside) end of
 * the previous node, or reach the start of the document.
 *
 * @param $startPos Position to start walking from.
 */
declare const walkPrevNode: ($startPos: ResolvedPos) => WalkNode;
/**
 * Insert content, delete a range and create a new selection
 * This function automatically handles the mapping of positions for insertion and deletion.
 * The new selection is handled as a function since it may not always be necessary to resolve a position to the transactions mapping
 *
 * @param getSelectionResolvedPos get the resolved position to create a new selection
 * @param insertions content to insert at the specified position
 * @param deletions the ranges to delete
 */
declare const insertContentDeleteRange: (tr: Transaction, getSelectionResolvedPos: (tr: Transaction) => ResolvedPos, insertions: [Fragment, number][], deletions: [number, number][]) => void;
declare const selectNode: (pos: number) => Command;
export { filter, isEmptySelectionAtStart, isEmptySelectionAtEnd, isFirstChildOfParent, isNthParentOfType, findCutBefore, toggleMark, applyMarkOnRange, withScrollIntoView, walkNextNode, walkPrevNode, insertContentDeleteRange, selectNode, };
export type { Predicate, };
