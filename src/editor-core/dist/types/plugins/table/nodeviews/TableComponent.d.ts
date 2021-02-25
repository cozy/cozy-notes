import React from 'react';
import { Node as PmNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { WidthPluginState } from '../../width';
import { RowStickyState, StickyPluginState } from '../pm-plugins/sticky-headers';
import { ColumnResizingPluginState, TablePluginState } from '../types';
import { Props } from './types';
export interface ComponentProps extends Props {
    view: EditorView;
    node: PmNode;
    allowColumnResizing: boolean;
    contentDOM: (element: HTMLElement | undefined) => void;
    containerWidth: WidthPluginState;
    pluginState: TablePluginState;
    tableResizingPluginState?: ColumnResizingPluginState;
    width: number;
}
interface TableState {
    scroll: number;
    tableContainerWidth: string;
    parentWidth?: number;
    isLoading: boolean;
    stickyHeader?: RowStickyState;
}
declare class TableComponent extends React.Component<ComponentProps, TableState> {
    static displayName: string;
    state: TableState;
    private wrapper?;
    private table?;
    private frameId?;
    private node?;
    private containerWidth?;
    private layoutSize?;
    constructor(props: ComponentProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: ComponentProps): void;
    onStickyState: (state: StickyPluginState) => void;
    render(): JSX.Element;
    private getMarginLeft;
    private handleScroll;
    private handleTableResizing;
    private scaleTable;
    private handleAutoSize;
    private handleWindowResize;
    private updateTableContainerWidth;
    private getParentNodeWidth;
    private updateParentWidth;
    private tableNodeLayoutSize;
    private scaleTableDebounced;
    private handleTableResizingDebounced;
    private handleScrollDebounced;
    private handleAutoSizeDebounced;
    private handleWindowResizeDebounced;
}
export default TableComponent;
