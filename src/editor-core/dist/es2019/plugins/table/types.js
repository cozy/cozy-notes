import { tableCellSelector, tableHeaderSelector, tablePrefixSelector } from '@atlaskit/adf-schema';
import { TableSharedCssClassName } from '@atlaskit/editor-common';
export let SortOrder;

(function (SortOrder) {
  SortOrder["ASC"] = "asc";
  SortOrder["DESC"] = "desc";
})(SortOrder || (SortOrder = {}));

export const RESIZE_HANDLE_AREA_DECORATION_GAP = 30;
export let TableDecorations;

(function (TableDecorations) {
  TableDecorations["ALL_CONTROLS_HOVER"] = "CONTROLS_HOVER";
  TableDecorations["ROW_CONTROLS_HOVER"] = "ROW_CONTROLS_HOVER";
  TableDecorations["COLUMN_CONTROLS_HOVER"] = "COLUMN_CONTROLS_HOVER";
  TableDecorations["TABLE_CONTROLS_HOVER"] = "TABLE_CONTROLS_HOVER";
  TableDecorations["CELL_CONTROLS_HOVER"] = "CELL_CONTROLS_HOVER";
  TableDecorations["COLUMN_CONTROLS_DECORATIONS"] = "COLUMN_CONTROLS_DECORATIONS";
  TableDecorations["COLUMN_SELECTED"] = "COLUMN_SELECTED";
  TableDecorations["COLUMN_RESIZING_HANDLE"] = "COLUMN_RESIZING_HANDLE";
  TableDecorations["COLUMN_RESIZING_HANDLE_LINE"] = "COLUMN_RESIZING_HANDLE_LINE";
  TableDecorations["LAST_CELL_ELEMENT"] = "LAST_CELL_ELEMENT";
})(TableDecorations || (TableDecorations = {}));

export const TableCssClassName = { ...TableSharedCssClassName,
  COLUMN_CONTROLS: `${tablePrefixSelector}-column-controls`,
  COLUMN_CONTROLS_DECORATIONS: `${tablePrefixSelector}-column-controls-decoration`,
  COLUMN_SELECTED: `${tablePrefixSelector}-column__selected`,
  ROW_CONTROLS_WRAPPER: `${tablePrefixSelector}-row-controls-wrapper`,
  ROW_CONTROLS: `${tablePrefixSelector}-row-controls`,
  ROW_CONTROLS_INNER: `${tablePrefixSelector}-row-controls__inner`,
  ROW_CONTROLS_BUTTON_WRAP: `${tablePrefixSelector}-row-controls__button-wrap`,
  ROW_CONTROLS_BUTTON: `${tablePrefixSelector}-row-controls__button`,
  CONTROLS_BUTTON: `${tablePrefixSelector}-controls__button`,
  CONTROLS_BUTTON_ICON: `${tablePrefixSelector}-controls__button-icon`,
  CONTROLS_INSERT_BUTTON: `${tablePrefixSelector}-controls__insert-button`,
  CONTROLS_INSERT_BUTTON_INNER: `${tablePrefixSelector}-controls__insert-button-inner`,
  CONTROLS_INSERT_BUTTON_WRAP: `${tablePrefixSelector}-controls__insert-button-wrap`,
  CONTROLS_INSERT_LINE: `${tablePrefixSelector}-controls__insert-line`,
  CONTROLS_BUTTON_OVERLAY: `${tablePrefixSelector}-controls__button-overlay`,
  LAYOUT_BUTTON: `${tablePrefixSelector}-layout-button`,
  CONTROLS_INSERT_MARKER: `${tablePrefixSelector}-controls__insert-marker`,
  CONTROLS_INSERT_COLUMN: `${tablePrefixSelector}-controls__insert-column`,
  CONTROLS_INSERT_ROW: `${tablePrefixSelector}-controls__insert-row`,
  CONTROLS_DELETE_BUTTON_WRAP: `${tablePrefixSelector}-controls__delete-button-wrap`,
  CONTROLS_DELETE_BUTTON: `${tablePrefixSelector}-controls__delete-button`,
  CONTROLS_FLOATING_BUTTON_COLUMN: `${tablePrefixSelector}-controls-floating__button-column`,
  CONTROLS_FLOATING_BUTTON_ROW: `${tablePrefixSelector}-controls-floating__button-row`,
  CORNER_CONTROLS: `${tablePrefixSelector}-corner-controls`,
  CORNER_CONTROLS_INSERT_ROW_MARKER: `${tablePrefixSelector}-corner-controls__insert-row-marker`,
  CORNER_CONTROLS_INSERT_COLUMN_MARKER: `${tablePrefixSelector}-corner-controls__insert-column-marker`,
  CONTROLS_CORNER_BUTTON: `${tablePrefixSelector}-corner-button`,
  NUMBERED_COLUMN: `${tablePrefixSelector}-numbered-column`,
  NUMBERED_COLUMN_BUTTON: `${tablePrefixSelector}-numbered-column__button`,
  HOVERED_COLUMN: `${tablePrefixSelector}-hovered-column`,
  HOVERED_ROW: `${tablePrefixSelector}-hovered-row`,
  HOVERED_TABLE: `${tablePrefixSelector}-hovered-table`,
  HOVERED_CELL: `${tablePrefixSelector}-hovered-cell`,
  HOVERED_CELL_IN_DANGER: 'danger',
  HOVERED_CELL_ACTIVE: 'active',
  HOVERED_CELL_WARNING: `${tablePrefixSelector}-hovered-cell__warning`,
  HOVERED_DELETE_BUTTON: `${tablePrefixSelector}-hovered-delete-button`,
  WITH_CONTROLS: `${tablePrefixSelector}-with-controls`,
  RESIZING_PLUGIN: `${tablePrefixSelector}-resizing-plugin`,
  RESIZE_CURSOR: `${tablePrefixSelector}-resize-cursor`,
  IS_RESIZING: `${tablePrefixSelector}-is-resizing`,
  RESIZE_HANDLE: `${tablePrefixSelector}-resize-handle`,
  RESIZE_HANDLE_DECORATION: `${tablePrefixSelector}-resize-decoration`,
  CONTEXTUAL_SUBMENU: `${tablePrefixSelector}-contextual-submenu`,
  CONTEXTUAL_MENU_BUTTON_WRAP: `${tablePrefixSelector}-contextual-menu-button-wrap`,
  CONTEXTUAL_MENU_BUTTON: `${tablePrefixSelector}-contextual-menu-button`,
  CONTEXTUAL_MENU_ICON: `${tablePrefixSelector}-contextual-submenu-icon`,
  // come from prosemirror-table
  SELECTED_CELL: 'selectedCell',
  // defined in ReactNodeView based on PM node name
  NODEVIEW_WRAPPER: 'tableView-content-wrap',
  TABLE_SELECTED: `${tablePrefixSelector}-table__selected`,
  TABLE_CELL: tableCellSelector,
  TABLE_HEADER_CELL: tableHeaderSelector,
  TABLE_STICKY: `${tablePrefixSelector}-sticky`,
  TOP_LEFT_CELL: 'table > tbody > tr:nth-child(2) > td:nth-child(1)',
  LAST_ITEM_IN_CELL: `${tablePrefixSelector}-last-item-in-cell`,
  WITH_RESIZE_LINE: `${tablePrefixSelector}-column-resize-line`
};