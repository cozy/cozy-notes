import { ResizeState } from './types';
export declare const growColumn: (state: ResizeState, colIndex: number, amount: number, selectedColumns?: number[] | undefined) => ResizeState;
export declare const shrinkColumn: (state: ResizeState, colIndex: number, amount: number, selectedColumns?: number[] | undefined) => ResizeState;
export declare function reduceSpace(state: ResizeState, amount: number, ignoreCols?: number[]): ResizeState;
