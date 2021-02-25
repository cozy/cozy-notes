import { Node as PMNode, NodeType } from 'prosemirror-model';
import { Transaction } from 'prosemirror-state';
export declare function isDocumentNode(node: PMNode | null | undefined): boolean;
export declare function isListNode(node: PMNode | null | undefined): boolean;
export declare function isParagraphNode(node: PMNode | null | undefined): boolean;
export declare function isListItemNode(node: PMNode | null | undefined): boolean;
export declare function isBulletList(node: PMNode | null | undefined): boolean;
export declare function isListNodeValidContent(node: PMNode): boolean;
export declare enum JoinDirection {
    LEFT = 1,
    RIGHT = -1
}
declare type JoinSiblingListsProps = {
    tr: Transaction;
    direction?: JoinDirection;
    forceListType?: NodeType;
};
declare type ListsJoined = {
    orderedList: number;
    bulletList: number;
    [key: string]: number;
};
export declare const joinSiblingLists: ({ tr, direction, forceListType, }: JoinSiblingListsProps) => ListsJoined;
export {};
