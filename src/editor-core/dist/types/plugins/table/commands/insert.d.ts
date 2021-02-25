import { Command } from '../../../types';
export declare const addColumnBefore: Command;
export declare const addColumnAfter: Command;
export declare const insertColumn: (column: number) => Command;
export declare const insertRow: (row: number, moveCursorToTheNewRow: boolean) => Command;
export declare const createTable: Command;
