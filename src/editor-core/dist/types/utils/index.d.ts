import { MarkType, Node, NodeType, ResolvedPos, Schema, Slice } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { EditorState, Selection, TextSelection, Transaction } from 'prosemirror-state';
import { JSONDocNode, JSONNode } from '@atlaskit/editor-json-transformer';
export { isEmptyParagraph, hasVisibleContent, isNodeEmpty, isEmptyDocument, processRawValue, getStepRange, findFarthestParentNode, isSelectionEndOfParagraph, nodesBetweenChanged, getNodesCount, } from './document';
export { cascadeCommands, getEditorValueWithMedia } from './action';
export { isMarkAllowedInRange, isMarkExcluded, removeBlockMarks, sanitiseSelectionMarksForWrapping, sanitiseMarksInSelection, } from './mark';
export { isNodeTypeParagraph } from './nodes';
export { isChromeWithSelectionBug, normaliseNestedLayout, setNodeSelection, setAllSelection, setGapCursorSelection, setCellSelection, setTextSelection, isValidPosition, } from './selection';
export type { JSONDocNode, JSONNode };
export { containsClassName } from './dom';
export declare function canMoveUp(state: EditorState): boolean;
export declare function canMoveDown(state: EditorState): boolean;
export declare function isSelectionInsideLastNodeInDocument(selection: Selection): boolean;
export declare function getCursor(selection: Selection): ResolvedPos | undefined;
/**
 * Check if a mark is allowed at the current selection / cursor based on a given state.
 * This method looks at both the currently active marks on the transaction, as well as
 * the node and marks at the current selection to determine if the given mark type is
 * allowed.
 */
export declare function isMarkTypeAllowedInCurrentSelection(markType: MarkType, state: EditorState): boolean;
export declare function createSliceWithContent(content: string, state: EditorState): Slice<any>;
/**
 * Determines if content inside a selection can be joined with the next block.
 * We need this check since the built-in method for "joinDown" will join a orderedList with bulletList.
 */
export declare function canJoinDown(selection: Selection, doc: any, nodeType: NodeType): boolean;
export declare function checkNodeDown(selection: Selection, doc: Node, filter: (node: Node) => boolean): boolean;
/**
 * Determines if content inside a selection can be joined with the previous block.
 * We need this check since the built-in method for "joinUp" will join a orderedList with bulletList.
 */
export declare function canJoinUp(selection: Selection, doc: any, nodeType: NodeType): boolean;
/**
 * Finds all "selection-groups" within a range. A selection group is based on ancestors.
 *
 * Example:
 * Given the following document and selection ({<} = start of selection and {>} = end)
 *  doc
 *    blockquote
 *      ul
 *        li
 *        li{<}
 *        li
 *     p
 *     p{>}
 *
 * The output will be two selection-groups. One within the ul and one with the two paragraphs.
 */
export declare function getGroupsInRange(doc: Node, $from: ResolvedPos, $to: ResolvedPos, isNodeValid?: (node: Node) => boolean): Array<{
    $from: ResolvedPos;
    $to: ResolvedPos;
}>;
/**
 * Traverse the document until an "ancestor" is found. Any nestable block can be an ancestor.
 */
export declare function findAncestorPosition(doc: Node, pos: ResolvedPos): any;
/**
 * Determine if two positions have a common ancestor.
 */
export declare function hasCommonAncestor(doc: Node, $from: ResolvedPos, $to: ResolvedPos): boolean;
/**
 * Takes a selection $from and $to and lift all text nodes from their parents to document-level
 */
export declare function liftSelection(tr: Transaction, doc: Node, $from: ResolvedPos, $to: ResolvedPos): {
    tr: Transaction<any>;
    $from: ResolvedPos<any>;
    $to: ResolvedPos<any>;
};
/**
 * Lift nodes in block to one level above.
 */
export declare function liftSiblingNodes(view: EditorView): void;
/**
 * Lift sibling nodes to document-level and select them.
 */
export declare function liftAndSelectSiblingNodes(view: EditorView): Transaction;
export declare function wrapIn(nodeType: NodeType, tr: Transaction, $from: ResolvedPos, $to: ResolvedPos): Transaction;
export declare function toJSON(node: Node): JSONDocNode;
/**
 * Repeating string for multiple times
 */
export declare function stringRepeat(text: string, length: number): string;
/**
 * A replacement for `Array.from` until it becomes widely implemented.
 */
export declare function arrayFrom(obj: any): any[];
export declare function whichTransitionEvent<TransitionEventName extends string>(): TransitionEventName | undefined;
/**
 * Function will check if changing block types: Paragraph, Heading is enabled.
 */
export declare function areBlockTypesDisabled(state: EditorState): boolean;
export declare const isTemporary: (id: string) => boolean;
export declare const isEmptyNode: (schema: Schema) => (node: Node) => boolean;
export declare const insideTable: (state: EditorState) => Boolean;
export declare const insideTableCell: (state: EditorState) => boolean;
export declare const isElementInTableCell: (element: HTMLElement | null) => HTMLElement | null;
export declare const isLastItemMediaGroup: (node: Node) => boolean;
export declare const isInLayoutColumn: (state: EditorState) => boolean;
export declare const isInListItem: (state: EditorState) => boolean;
export declare const hasOpenEnd: (slice: Slice) => boolean;
export declare function filterChildrenBetween(doc: Node, from: number, to: number, predicate: (node: Node, pos: number, parent: Node) => boolean | undefined): {
    node: Node;
    pos: number;
}[];
export declare function dedupe<T>(list?: T[], iteratee?: (p: T) => T[keyof T] | T): T[];
export declare const isTextSelection: (selection: Selection) => selection is TextSelection<any>;
/** Helper type for single arg function */
declare type Func<A, B> = (a: A) => B;
declare type FuncN<A extends any[], B> = (...args: A) => B;
/**
 * Compose 1 to n functions.
 * @param func first function
 * @param funcs additional functions
 */
export declare function compose<F1 extends Func<any, any>, FN extends Array<Func<any, any>>, R extends FN extends [] ? F1 : FN extends [Func<infer A, any>] ? (a: A) => ReturnType<F1> : FN extends [any, Func<infer A, any>] ? (a: A) => ReturnType<F1> : FN extends [any, any, Func<infer A, any>] ? (a: A) => ReturnType<F1> : FN extends [any, any, any, Func<infer A, any>] ? (a: A) => ReturnType<F1> : FN extends [any, any, any, any, Func<infer A, any>] ? (a: A) => ReturnType<F1> : Func<any, ReturnType<F1>>>(func: F1, ...funcs: FN): R;
export declare function pipe(): <R>(a: R) => R;
export declare function pipe<F extends Function>(f: F): F;
export declare function pipe<F1 extends FuncN<any, any>>(f1: F1): (...args: Parameters<F1>) => ReturnType<F1>;
export declare function pipe<F1 extends FuncN<any, any>, F2 extends Func<ReturnType<F1>, any>>(f1: F1, f2: F2): (...args: Parameters<F1>) => ReturnType<F2>;
export declare function pipe<F1 extends FuncN<any, any>, F2 extends Func<ReturnType<F1>, any>, F3 extends Func<ReturnType<F2>, any>>(f1: F1, f2: F2, f3: F3): (...args: Parameters<F1>) => ReturnType<F3>;
export declare function pipe<F1 extends FuncN<any, any>, F2 extends Func<ReturnType<F1>, any>, F3 extends Func<ReturnType<F2>, any>, FN extends Array<Func<any, any>>>(f1: F1, f2: F2, f3: F3, ...fn: FN): (...args: Parameters<F1>) => any;
export declare function shallowEqual(obj1?: any, obj2?: any): boolean;
export declare function sum<T>(arr: Array<T>, f: (val: T) => number): number;
export declare function nonNullable<T>(value: T): value is NonNullable<T>;
export { SetAttrsStep } from '@atlaskit/adf-schema/steps';
