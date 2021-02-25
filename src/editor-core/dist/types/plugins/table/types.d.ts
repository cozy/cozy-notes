import { Node as PmNode } from 'prosemirror-model';
import { Transaction } from 'prosemirror-state';
import { Rect } from '@atlaskit/editor-tables/table-map';
import { DecorationSet } from 'prosemirror-view';
import { InjectedIntl } from 'react-intl';
import { TableLayout } from '@atlaskit/adf-schema';
import { INPUT_METHOD } from '../analytics/types/enums';
export declare enum SortOrder {
    ASC = "asc",
    DESC = "desc"
}
export declare const RESIZE_HANDLE_AREA_DECORATION_GAP = 30;
export declare type RowInsertPosition = 'TOP' | 'BOTTOM';
export declare type PermittedLayoutsDescriptor = TableLayout[] | 'all';
export declare type Cell = {
    pos: number;
    start: number;
    node: PmNode;
};
export declare type CellTransform = (cell: Cell) => (tr: Transaction) => Transaction;
export interface InsertRowOptions {
    index: number;
    moveCursorToInsertedRow: boolean;
}
export declare type InsertRowMethods = INPUT_METHOD.CONTEXT_MENU | INPUT_METHOD.BUTTON | INPUT_METHOD.SHORTCUT | INPUT_METHOD.KEYBOARD;
export interface PluginConfig {
    advanced?: boolean;
    allowBackgroundColor?: boolean;
    allowColumnResizing?: boolean;
    allowHeaderColumn?: boolean;
    allowHeaderRow?: boolean;
    allowMergeCells?: boolean;
    allowNumberColumn?: boolean;
    allowColumnSorting?: boolean;
    allowAddColumnWithCustomStep?: boolean;
    isHeaderRowRequired?: boolean;
    stickToolbarToBottom?: boolean;
    permittedLayouts?: PermittedLayoutsDescriptor;
    allowControls?: boolean;
    stickyHeaders?: boolean;
}
export interface ColumnResizingPluginState {
    resizeHandlePos: number | null;
    dragging: {
        startX: number;
        startWidth: number;
    } | null;
    lastClick: {
        x: number;
        y: number;
        time: number;
    } | null;
    lastColumnResizable?: boolean;
    dynamicTextSizing?: boolean;
}
export declare type CellColumnPositioning = Pick<Rect, 'right' | 'left'>;
export interface TableColumnOrdering {
    columnIndex: number;
    order: SortOrder;
}
export interface TablePluginState {
    editorHasFocus?: boolean;
    hoveredColumns: number[];
    hoveredRows: number[];
    pluginConfig: PluginConfig;
    isHeaderColumnEnabled: boolean;
    isHeaderRowEnabled: boolean;
    targetCellPosition?: number;
    tableNode?: PmNode;
    tableRef?: HTMLTableElement;
    tablePos?: number;
    tableWrapperTarget?: HTMLElement;
    isContextualMenuOpen?: boolean;
    isInDanger?: boolean;
    insertColumnButtonIndex?: number;
    insertRowButtonIndex?: number;
    isFullWidthModeEnabled?: boolean;
    layout?: TableLayout;
    ordering?: TableColumnOrdering;
    resizeHandleColumnIndex?: number;
}
export declare type TablePluginAction = {
    type: 'SET_EDITOR_FOCUS';
    data: {
        editorHasFocus: boolean;
    };
} | {
    type: 'TOGGLE_HEADER_ROW';
} | {
    type: 'TOGGLE_HEADER_COLUMN';
} | {
    type: 'SORT_TABLE';
    data: {
        ordering: TableColumnOrdering;
    };
} | {
    type: 'SET_TABLE_REF';
    data: {
        tableRef?: HTMLTableElement;
        tableNode?: PmNode;
        tableWrapperTarget?: HTMLElement;
        layout: TableLayout;
        isHeaderRowEnabled: boolean;
        isHeaderColumnEnabled: boolean;
    };
} | {
    type: 'HOVER_ROWS';
    data: {
        decorationSet: DecorationSet;
        hoveredRows: number[];
        isInDanger?: boolean;
    };
} | {
    type: 'HOVER_CELLS';
    data: {
        decorationSet: DecorationSet;
    };
} | {
    type: 'HOVER_COLUMNS';
    data: {
        decorationSet: DecorationSet;
        hoveredColumns: number[];
        isInDanger?: boolean;
    };
} | {
    type: 'HOVER_TABLE';
    data: {
        decorationSet: DecorationSet;
        hoveredRows: number[];
        hoveredColumns: number[];
        isInDanger?: boolean;
    };
} | {
    type: 'ADD_RESIZE_HANDLE_DECORATIONS';
    data: {
        decorationSet: DecorationSet;
        resizeHandleColumnIndex: number;
    };
} | {
    type: 'CLEAR_HOVER_SELECTION';
    data: {
        decorationSet: DecorationSet;
    };
} | {
    type: 'SHOW_RESIZE_HANDLE_LINE';
    data: {
        decorationSet: DecorationSet;
    };
} | {
    type: 'HIDE_RESIZE_HANDLE_LINE';
    data: {
        decorationSet: DecorationSet;
    };
} | {
    type: 'SET_TARGET_CELL_POSITION';
    data: {
        targetCellPosition?: number;
    };
} | {
    type: 'SELECT_COLUMN';
    data: {
        targetCellPosition: number;
        decorationSet: DecorationSet;
    };
} | {
    type: 'SET_TABLE_LAYOUT';
    data: {
        layout: TableLayout;
    };
} | {
    type: 'SHOW_INSERT_ROW_BUTTON';
    data: {
        insertRowButtonIndex: number;
    };
} | {
    type: 'SHOW_INSERT_COLUMN_BUTTON';
    data: {
        insertColumnButtonIndex: number;
    };
} | {
    type: 'HIDE_INSERT_COLUMN_OR_ROW_BUTTON';
} | {
    type: 'TOGGLE_CONTEXTUAL_MENU';
};
export declare type ColumnResizingPluginAction = {
    type: 'SET_RESIZE_HANDLE_POSITION';
    data: {
        resizeHandlePos: number | null;
    };
} | {
    type: 'STOP_RESIZING';
} | {
    type: 'SET_DRAGGING';
    data: {
        dragging: {
            startX: number;
            startWidth: number;
        } | null;
    };
} | {
    type: 'SET_LAST_CLICK';
    data: {
        lastClick: {
            x: number;
            y: number;
            time: number;
        } | null;
    };
};
export declare enum TableDecorations {
    ALL_CONTROLS_HOVER = "CONTROLS_HOVER",
    ROW_CONTROLS_HOVER = "ROW_CONTROLS_HOVER",
    COLUMN_CONTROLS_HOVER = "COLUMN_CONTROLS_HOVER",
    TABLE_CONTROLS_HOVER = "TABLE_CONTROLS_HOVER",
    CELL_CONTROLS_HOVER = "CELL_CONTROLS_HOVER",
    COLUMN_CONTROLS_DECORATIONS = "COLUMN_CONTROLS_DECORATIONS",
    COLUMN_SELECTED = "COLUMN_SELECTED",
    COLUMN_RESIZING_HANDLE = "COLUMN_RESIZING_HANDLE",
    COLUMN_RESIZING_HANDLE_LINE = "COLUMN_RESIZING_HANDLE_LINE",
    LAST_CELL_ELEMENT = "LAST_CELL_ELEMENT"
}
export declare const TableCssClassName: {
    COLUMN_CONTROLS: string;
    COLUMN_CONTROLS_DECORATIONS: string;
    COLUMN_SELECTED: string;
    ROW_CONTROLS_WRAPPER: string;
    ROW_CONTROLS: string;
    ROW_CONTROLS_INNER: string;
    ROW_CONTROLS_BUTTON_WRAP: string;
    ROW_CONTROLS_BUTTON: string;
    CONTROLS_BUTTON: string;
    CONTROLS_BUTTON_ICON: string;
    CONTROLS_INSERT_BUTTON: string;
    CONTROLS_INSERT_BUTTON_INNER: string;
    CONTROLS_INSERT_BUTTON_WRAP: string;
    CONTROLS_INSERT_LINE: string;
    CONTROLS_BUTTON_OVERLAY: string;
    LAYOUT_BUTTON: string;
    CONTROLS_INSERT_MARKER: string;
    CONTROLS_INSERT_COLUMN: string;
    CONTROLS_INSERT_ROW: string;
    CONTROLS_DELETE_BUTTON_WRAP: string;
    CONTROLS_DELETE_BUTTON: string;
    CONTROLS_FLOATING_BUTTON_COLUMN: string;
    CONTROLS_FLOATING_BUTTON_ROW: string;
    CORNER_CONTROLS: string;
    CORNER_CONTROLS_INSERT_ROW_MARKER: string;
    CORNER_CONTROLS_INSERT_COLUMN_MARKER: string;
    CONTROLS_CORNER_BUTTON: string;
    NUMBERED_COLUMN: string;
    NUMBERED_COLUMN_BUTTON: string;
    HOVERED_COLUMN: string;
    HOVERED_ROW: string;
    HOVERED_TABLE: string;
    HOVERED_CELL: string;
    HOVERED_CELL_IN_DANGER: string;
    HOVERED_CELL_ACTIVE: string;
    HOVERED_CELL_WARNING: string;
    HOVERED_DELETE_BUTTON: string;
    WITH_CONTROLS: string;
    RESIZING_PLUGIN: string;
    RESIZE_CURSOR: string;
    IS_RESIZING: string;
    RESIZE_HANDLE: string;
    RESIZE_HANDLE_DECORATION: string;
    CONTEXTUAL_SUBMENU: string;
    CONTEXTUAL_MENU_BUTTON_WRAP: string;
    CONTEXTUAL_MENU_BUTTON: string;
    CONTEXTUAL_MENU_ICON: string;
    SELECTED_CELL: string;
    NODEVIEW_WRAPPER: string;
    TABLE_SELECTED: string;
    TABLE_CELL: string;
    TABLE_HEADER_CELL: string;
    TABLE_STICKY: string;
    TOP_LEFT_CELL: string;
    LAST_ITEM_IN_CELL: string;
    WITH_RESIZE_LINE: string;
    TABLE_CONTAINER: string;
    TABLE_NODE_WRAPPER: string;
    TABLE_LEFT_SHADOW: string;
    TABLE_RIGHT_SHADOW: string;
    TABLE_STICKY_SHADOW: string;
    TABLE_STICKY_WRAPPER: string;
    TABLE_CELL_NODEVIEW_CONTENT_DOM: string;
};
export interface ToolbarMenuConfig {
    allowHeaderRow?: boolean;
    allowHeaderColumn?: boolean;
    allowNumberColumn?: boolean;
}
export interface ToolbarMenuState {
    isHeaderRowEnabled?: boolean;
    isHeaderColumnEnabled?: boolean;
    isNumberColumnEnabled?: boolean;
}
export interface ToolbarMenuContext {
    formatMessage: InjectedIntl['formatMessage'];
}
