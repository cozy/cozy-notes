import { Node as PMNode, ResolvedPos, NodeType, NodeRange } from 'prosemirror-model';
import { EditorState, Selection, Transaction } from 'prosemirror-state';
export declare const isPosInsideParagraph: ($pos: ResolvedPos) => boolean;
export declare const isPosInsideList: ($pos: ResolvedPos) => boolean;
export declare const isWrappingPossible: (nodeType: NodeType, selection: Selection) => boolean;
export declare const isInsideListItem: (state: EditorState) => boolean;
export declare const canJoinToPreviousListItem: (state: EditorState) => boolean;
export declare const selectionContainsList: (tr: Transaction) => PMNode | null;
export declare const numberNestedLists: (resolvedPos: ResolvedPos) => number;
export declare const getListItemAttributes: ($pos: ResolvedPos) => {
    indentLevel: number;
    itemIndex: number;
};
declare type NormalizeListItemsSelection = (props: {
    selection: Selection;
    doc: PMNode;
}) => Selection;
export declare const normalizeListItemsSelection: NormalizeListItemsSelection;
export declare const resolvePositionToStartOfListItem: ($pos: ResolvedPos) => ResolvedPos;
export declare const resolvePositionToEndOfListItem: ($pos: ResolvedPos) => ResolvedPos;
declare type CreateNodeRange = (props: {
    selection: Selection;
}) => NodeRange | null;
export declare const createListNodeRange: CreateNodeRange;
export declare const createListItemNodeRange: CreateNodeRange;
export {};
