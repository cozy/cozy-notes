import { KeyboardEvent, PureComponent } from 'react';
import { FocusEvent } from 'react';
export interface Props {
    autoFocus?: boolean | FocusOptions;
    defaultValue?: string;
    onChange?: (value: string) => void;
    onSubmit?: (value: string) => void;
    onCancel?: (e: KeyboardEvent) => void;
    placeholder?: string;
    onMouseDown?: Function;
    onKeyDown?: (e: KeyboardEvent<any>) => void;
    onUndo?: Function;
    onRedo?: Function;
    onBlur?: Function;
    width?: number;
    maxLength?: number;
    testId?: string;
    ariaLabel?: string;
}
export interface State {
    value?: string;
}
export default class PanelTextInput extends PureComponent<Props, State> {
    private input?;
    private focusTimeoutId;
    constructor(props: Props);
    UNSAFE_componentWillReceiveProps(nextProps: Props): void;
    componentWillUnmount(): void;
    onMouseDown: () => void;
    onBlur: (e: FocusEvent<any>) => void;
    render(): JSX.Element;
    focus(): void;
    private handleChange;
    private handleKeydown;
    private isUndoEvent;
    private isRedoEvent;
    private handleRef;
}
