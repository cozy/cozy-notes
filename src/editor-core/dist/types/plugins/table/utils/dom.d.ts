export declare const isCell: (node: HTMLElement | null) => boolean;
export declare const isCornerButton: (node: HTMLElement | null) => boolean;
export declare const isInsertRowButton: (node: HTMLElement | null) => boolean | HTMLElement | null;
export declare const getColumnOrRowIndex: (target: HTMLElement) => [number, number];
export declare const isColumnControlsDecorations: (node: HTMLElement | null) => boolean;
export declare const isRowControlsButton: (node: HTMLElement | null) => boolean;
export declare const isResizeHandleDecoration: (node: HTMLElement | null) => boolean;
export declare const isTableControlsButton: (node: HTMLElement | null) => boolean;
export declare const isTableContainerOrWrapper: (node: HTMLElement | null) => boolean;
export declare const getMousePositionHorizontalRelativeByElement: (mouseEvent: MouseEvent, gapInPixels?: number | undefined) => 'left' | 'right' | null;
export declare const getMousePositionVerticalRelativeByElement: (mouseEvent: MouseEvent) => 'top' | 'bottom' | null;
export declare const updateResizeHandles: (tableRef: HTMLElement | null | undefined) => void;
export declare const hasResizeHandler: ({ columnEndIndexTarget, target, }: {
    columnEndIndexTarget: number;
    target: HTMLElement;
}) => boolean;
