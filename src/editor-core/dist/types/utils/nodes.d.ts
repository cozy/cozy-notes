import { Transaction, EditorState } from 'prosemirror-state';
import { Node as PMNode, Fragment } from 'prosemirror-model';
/**
 * Finds all top level nodes affected by the transaction
 * Uses from/to positions in transaction's steps to work out which nodes will
 * be changed by the transaction
 */
export declare const findChangedNodesFromTransaction: (tr: Transaction) => PMNode[];
export declare const validNode: (node: PMNode) => boolean;
/** Validates prosemirror nodes, and returns true only if all nodes are valid */
export declare const validateNodes: (nodes: PMNode[]) => boolean;
export declare const isNodeTypeParagraph: (node: PMNode | undefined | null) => boolean;
export declare enum SelectedState {
    selectedInRange = 0,
    selectedInside = 1
}
/**
 * Returns if the current selection from achor-head is selecting the node.
 * If the node is not selected then null is returned.
 * If the node is selected then an enum is returned that describes weather the node
 * is fully selected by a range or if the "inside" of the node has been selected or clicked.
 */
export declare const isNodeSelectedOrInRange: (anchorPosition: number, headPosition: number, nodePosition: number, nodeSize: number) => SelectedState | null;
/**
 * Checks if a particular node fragment is supported in the parent
 * @param state EditorState
 * @param fragment The fragment to be checked for
 */
export declare const isSupportedInParent: (state: EditorState, fragment: Fragment) => boolean;
