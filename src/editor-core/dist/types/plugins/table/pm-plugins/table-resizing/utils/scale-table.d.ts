import { Node as PMNode } from 'prosemirror-model';
import { DomAtPos } from '../../../../../types';
import { ResizeState } from '../utils/types';
export interface ScaleOptions {
    node: PMNode;
    prevNode: PMNode;
    start: number;
    containerWidth?: number;
    previousContainerWidth?: number;
    parentWidth?: number;
    layoutChanged?: boolean;
    dynamicTextSizing?: boolean;
    isBreakoutEnabled?: boolean;
    isFullWidthModeEnabled?: boolean;
}
export declare const scale: (tableRef: HTMLTableElement, options: ScaleOptions, domAtPos: DomAtPos) => ResizeState | undefined;
export declare const scaleWithParent: (tableRef: HTMLTableElement, parentWidth: number, table: PMNode, start: number, domAtPos: DomAtPos) => ResizeState;
