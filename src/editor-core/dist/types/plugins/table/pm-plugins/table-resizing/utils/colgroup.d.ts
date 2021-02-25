import { Node as PmNode } from 'prosemirror-model';
declare type Col = Array<string | {
    [name: string]: string;
}>;
export declare const generateColgroup: (table: PmNode) => Col[];
export declare const insertColgroupFromNode: (tableRef: HTMLTableElement, table: PmNode) => HTMLCollection;
export declare const hasTableBeenResized: (table: PmNode) => boolean;
export {};
