import { PureComponent } from 'react';
export declare type Coordinates = {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
};
export interface Props {
    zIndex?: number;
    className?: string;
    containerRef?: (node: HTMLElement) => void;
    target?: HTMLElement;
    popupsMountPoint?: HTMLElement;
    popupsBoundariesElement?: HTMLElement;
    offset?: number[];
    fitWidth?: number;
    fitHeight?: number;
    alignX?: 'left' | 'center' | 'right';
    alignY?: 'bottom' | 'top';
    onPositionCalculated?: (position: Coordinates) => any;
}
export { handlePositionCalculatedWith, getOffsetParent, getNearestNonTextNode, } from './utils';
export default class FloatingToolbar extends PureComponent<Props, any> {
    render(): JSX.Element | null;
}
