import React, { PureComponent } from 'react';
import { EditorView } from 'prosemirror-view';
import { InjectedIntlProps } from 'react-intl';
export interface Props {
    editorView?: EditorView;
    isDisabled?: boolean;
    isReducedSpacing?: boolean;
}
export interface State {
    disabled: boolean;
}
export declare class ToolbarTask extends PureComponent<Props & InjectedIntlProps, State> {
    state: State;
    render(): JSX.Element;
    private handleInsertTask;
}
declare const _default: React.ComponentClass<Props, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<Props & InjectedIntlProps>;
};
export default _default;
