import { Component } from 'react';
import { DropdownOptionT } from './types';
export declare const menuItemDimensions: {
    width: number;
    height: number;
};
export declare const itemSpacing: number;
export interface Props {
    hide: Function;
    dispatchCommand: Function;
    items: Array<DropdownOptionT<Function>>;
}
export default class Dropdown extends Component<Props> {
    render(): JSX.Element;
    private renderSelected;
}
