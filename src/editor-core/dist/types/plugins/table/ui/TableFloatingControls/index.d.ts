import { Component } from 'react';
import { Selection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { RowStickyState } from '../../pm-plugins/sticky-headers';
import { TableColumnOrdering } from '../../types';
export interface Props {
    editorView: EditorView;
    selection?: Selection;
    tableRef?: HTMLTableElement;
    tableActive?: boolean;
    isInDanger?: boolean;
    isResizing?: boolean;
    isHeaderRowEnabled?: boolean;
    isHeaderColumnEnabled?: boolean;
    isNumberColumnEnabled?: boolean;
    hasHeaderRow?: boolean;
    tableHeight?: number;
    headerRowHeight?: number;
    hoveredRows?: number[];
    ordering?: TableColumnOrdering;
    stickyHeader?: RowStickyState;
}
export default class TableFloatingControls extends Component<Props> {
    static displayName: string;
    shouldComponentUpdate(nextProps: Props): boolean;
    render(): JSX.Element | null;
    private selectRow;
    private hoverRows;
}
