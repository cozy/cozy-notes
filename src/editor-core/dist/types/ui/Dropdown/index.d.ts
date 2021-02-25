import React from 'react';
import { PureComponent } from 'react';
export interface Props {
    mountTo?: HTMLElement;
    boundariesElement?: HTMLElement;
    scrollableElement?: HTMLElement;
    trigger: React.ReactElement<any>;
    isOpen?: boolean;
    onOpenChange?: (attrs: any) => void;
    fitWidth?: number;
    fitHeight?: number;
    zIndex?: number;
}
export interface State {
    target?: HTMLElement;
    popupPlacement: [string, string];
}
/**
 * Wrapper around @atlaskit/droplist which uses Popup and Portal to render
 * droplist outside of "overflow: hidden" containers when needed.
 *
 * Also it controls popper's placement.
 */
export declare class Dropdown extends PureComponent<Props, State> {
    constructor(props: Props);
    private handleRef;
    private updatePopupPlacement;
    private renderDropdown;
    render(): JSX.Element;
}
declare const DropdownWithOuterListeners: React.ComponentClass<Props & import("../with-outer-listeners").WithOutsideClickProps, any>;
export default DropdownWithOuterListeners;
