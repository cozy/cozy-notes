import { CellColumnPositioning } from '../types';
export declare const hoverMergedCells: () => import("../../..").Command;
export declare const hoverColumns: (hoveredColumns: number[], isInDanger?: boolean | undefined) => import("../../..").Command;
export declare const hoverRows: (hoveredRows: number[], isInDanger?: boolean | undefined) => import("../../..").Command;
export declare const hoverTable: (isInDanger?: boolean | undefined) => import("../../..").Command;
export declare const clearHoverSelection: () => import("../../..").Command;
export declare const showResizeHandleLine: (cellColumnPositioning: CellColumnPositioning) => import("../../..").Command;
export declare const hideResizeHandleLine: () => import("../../..").Command;
