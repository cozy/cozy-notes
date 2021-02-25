import { Node, Mark, MarkType, NodeType } from 'prosemirror-model';
import { SelectionRange, EditorState, Transaction } from 'prosemirror-state';
export declare const isMarkAllowedInRange: (doc: Node, ranges: Array<SelectionRange>, type: MarkType) => boolean;
export declare const isMarkExcluded: (type: MarkType, marks?: Mark<any>[] | null | undefined) => boolean;
export declare const removeBlockMarks: (state: EditorState, marks: Array<MarkType | undefined>) => Transaction | undefined;
/**
 * Removes marks from nodes in the current selection that are not supported
 */
export declare const sanitiseSelectionMarksForWrapping: (state: EditorState, newParentType?: NodeType<any> | undefined) => Transaction | undefined;
declare type NodesSanitized = Array<{
    node: Node;
    marksRemoved: Mark[];
}>;
export declare const sanitiseMarksInSelection: (tr: Transaction, newParentType?: NodeType<any> | undefined) => NodesSanitized;
export {};
