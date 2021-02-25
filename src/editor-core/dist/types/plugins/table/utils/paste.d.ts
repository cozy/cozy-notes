import { Fragment, Node as PMNode, Schema, Slice } from 'prosemirror-model';
export declare const unwrapContentFromTable: (maybeTable: PMNode) => PMNode | PMNode[];
export declare const removeTableFromFirstChild: (node: PMNode, i: number) => PMNode | PMNode[];
export declare const removeTableFromLastChild: (node: PMNode, i: number, fragment: Fragment) => PMNode | PMNode[];
/**
 * When we copy from a table cell with a hardBreak at the end,
 * the slice generated will come with a hardBreak outside of the table.
 * This code will look for that pattern and fix it.
 */
export declare const transformSliceToFixHardBreakProblemOnCopyFromCell: (slice: Slice, schema: Schema) => Slice;
export declare const transformSliceToRemoveOpenTable: (slice: Slice, schema: Schema) => Slice;
export declare const transformSliceToCorrectEmptyTableCells: (slice: Slice, schema: Schema) => Slice;
