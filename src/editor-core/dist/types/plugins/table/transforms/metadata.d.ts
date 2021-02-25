import { Transaction } from 'prosemirror-state';
declare type TableProblems = 'NEGATIVE_ROWSPAN' | 'REMOVE_EMPTY_ROWS' | 'REMOVE_EMPTY_COLUMNS' | 'EMPTY_TABLE' | 'FIX_ROWSPANS' | 'COLWIDTHS_BEFORE_UPDATE' | 'COLWIDTHS_AFTER_UPDATE';
export declare type TableMetaData = {
    type: 'MERGE_CELLS';
    problem?: TableProblems;
} | {
    type: 'DELETE_ROWS';
    problem?: TableProblems;
} | {
    type: 'DELETE_COLUMNS';
    problem?: TableProblems;
} | {
    type: 'UPDATE_COLUMN_WIDTHS';
    data: {
        colwidths: number[];
        colspan: number;
    };
    problem?: TableProblems;
};
export declare const setMeta: (meta: TableMetaData) => (tr: Transaction) => Transaction;
export {};
