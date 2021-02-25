import { Component } from 'react';
import { EditorView } from 'prosemirror-view';
export interface Props {
    editorView: EditorView;
    tableRef: HTMLTableElement;
    tableActive?: boolean;
    hoverRows: (rows: number[], danger?: boolean) => void;
    hoveredRows?: number[];
    selectRow: (row: number, expand: boolean) => void;
    hasHeaderRow?: boolean;
    isInDanger?: boolean;
    isResizing?: boolean;
    stickyTop?: number;
}
export default class NumberColumn extends Component<Props, any> {
    render(): JSX.Element;
    private hoverRows;
    private selectRow;
    private clearHoverSelection;
    private getClassNames;
}
