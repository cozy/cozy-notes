import { Component, ReactElement } from 'react';
import { DropdownOptions } from './types';
export interface Props {
    title: string;
    icon?: ReactElement<any>;
    hideExpandIcon?: boolean;
    options: DropdownOptions<Function>;
    dispatchCommand: (command: Function) => void;
    mountPoint?: HTMLElement;
    boundariesElement?: HTMLElement;
    scrollableElement?: HTMLElement;
    disabled?: boolean;
    tooltip?: string;
    buttonTestId?: string;
}
export interface State {
    isOpen: boolean;
}
export default class Dropdown extends Component<Props, State> {
    state: State;
    render(): JSX.Element;
    private renderArrayOptions;
    private toggleOpen;
    private hide;
}
