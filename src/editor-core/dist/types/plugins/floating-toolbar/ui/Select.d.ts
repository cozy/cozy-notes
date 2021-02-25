import { Component } from 'react';
import { ValueType } from '@atlaskit/select';
export interface RenderOptionsPropsT<T> {
    hide: () => void;
    dispatchCommand: (command: T) => void;
}
export interface SelectOption<T = unknown> {
    value: string;
    label: string;
    selected?: boolean;
    disabled?: boolean;
    hidden?: boolean;
    data?: T;
}
export interface Props {
    hideExpandIcon?: boolean;
    options: SelectOption[];
    dispatchCommand: (command: Function) => void;
    mountPoint?: HTMLElement;
    boundariesElement?: HTMLElement;
    scrollableElement?: HTMLElement;
    defaultValue?: SelectOption;
    placeholder?: string;
    onChange?: (change: ValueType<SelectOption>) => void;
    width?: number;
    filterOption?: ((option: SelectOption, rawInput: string) => boolean) | null;
}
export interface State {
    isOpen: boolean;
}
export default class Search extends Component<Props, State> {
    state: State;
    render(): JSX.Element;
}
