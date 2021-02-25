import { Component } from 'react';
import { EditorView } from 'prosemirror-view';
export interface Props {
    editorView: EditorView;
    tableRef?: HTMLTableElement;
    isInDanger?: boolean;
    isResizing?: boolean;
    hoveredRows?: number[];
    isHeaderColumnEnabled?: boolean;
    isHeaderRowEnabled?: boolean;
    stickyTop?: number;
}
export default class CornerControls extends Component<Props, any> {
    render(): JSX.Element | null;
    private isActive;
    private clearHoverSelection;
    private selectTable;
    private hoverTable;
}
