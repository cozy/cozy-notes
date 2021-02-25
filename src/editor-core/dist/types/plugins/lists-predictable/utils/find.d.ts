import { ResolvedPos, Node as PMNode } from 'prosemirror-model';
export declare function findFirstNestedList($pos: ResolvedPos): ResolvedPos | null;
export declare function findFirstParentListNode($pos: ResolvedPos): {
    pos: number;
    node: PMNode;
} | null;
export declare function findFirstParentListItemNode($pos: ResolvedPos): {
    pos: number;
    node: PMNode;
} | null;
export declare function findRootParentListNode($pos: ResolvedPos): ResolvedPos | null;
