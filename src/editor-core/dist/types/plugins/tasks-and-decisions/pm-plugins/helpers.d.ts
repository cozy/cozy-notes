import { Node, NodeType, ResolvedPos } from 'prosemirror-model';
import { EditorState, Selection, Transaction } from 'prosemirror-state';
export declare const isInsideTaskOrDecisionItem: (state: EditorState) => boolean;
export declare const isActionOrDecisionList: (node: Node) => boolean;
export declare const isActionOrDecisionItem: (node: Node) => boolean;
export declare const isInsideTask: (state: EditorState) => boolean;
export declare const isTable: (node?: Node<any> | null | undefined) => Boolean;
/**
 * Creates a NodeRange around the given taskItem and the following
 * ("nested") taskList, if one exists.
 */
export declare const getBlockRange: ($from: ResolvedPos, $to: ResolvedPos) => import("prosemirror-model").NodeRange<any> | null | undefined;
/**
 * Finds the distance between the current $from and the root of the taskList.
 */
export declare const getCurrentIndentLevel: (selection: Selection) => number | null;
/**
 * Walk outwards from a position until we encounter the (inside) start of
 * the next node, or reach the end of the document.
 *
 * @param $startPos Position to start walking from.
 */
export declare const walkOut: ($startPos: ResolvedPos) => ResolvedPos;
/**
 * Finds the height of a tree-like structure, given any position inside it.
 *
 * Traverses from the top of the tree to all leaf nodes, and returns the length
 * of the longest path.
 *
 * This means you can use it with things like taskList, which
 * do not nest themselves inside taskItems but rather as adjacent children.
 *
 * @param $pos Any position inside the tree.
 * @param types The node types to consider traversable
 */
export declare const subtreeHeight: ($from: ResolvedPos, $to: ResolvedPos, types: NodeType[]) => number;
/**
 * Returns `true` if the taskItem or decisionItem has no text.
 */
export declare const isEmptyTaskDecision: (state: EditorState) => boolean;
/**
 * Lifts a taskItem and any directly following taskList
 * (taskItem and its "nested children") out one level.
 *
 * @param tr Transaction to base steps on
 * @param $from Start of range you want to lift
 * @param $to End of range you want to lift (can be same as `$from`)
 */
export declare const liftBlock: (tr: Transaction, $from: ResolvedPos, $to: ResolvedPos) => Transaction | null;
