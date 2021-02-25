import React from 'react';
import { PureComponent } from 'react';
export interface Props {
    text?: string;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}
export default class ChromeCollapsed extends PureComponent<Props, {}> {
    private input?;
    private focusHandler;
    private handleInputRef;
    render(): JSX.Element;
}
