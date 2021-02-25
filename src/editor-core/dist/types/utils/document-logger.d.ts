import { Node as PMNode } from 'prosemirror-model';
export declare type SimplifiedNode = {
    type: string;
    pos: number;
    nodeSize: number;
    marks?: string[];
    content?: SimplifiedNode[];
};
export declare const getDocStructure: (doc: PMNode) => SimplifiedNode | string;
