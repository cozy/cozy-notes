import { Component } from 'react';
import { EditorView } from 'prosemirror-view';
export interface Props {
    editorView: EditorView;
    tableRef: HTMLTableElement;
    selectRow: (row: number, expand: boolean) => void;
    hoverRows: (rows: number[], danger?: boolean) => void;
    hoveredRows?: number[];
    isInDanger?: boolean;
    isResizing?: boolean;
    insertRowButtonIndex?: number;
    stickyTop?: number;
}
export default class RowControls extends Component<Props> {
    render(): JSX.Element | null;
    private clearHoverSelection;
}
