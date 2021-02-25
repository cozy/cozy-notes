import React from 'react';
import { EditorView } from 'prosemirror-view';
import { InjectedIntlProps } from 'react-intl';
import { ClearFormattingState } from '../../pm-plugins/clear-formatting';
import { TextFormattingState } from '../../pm-plugins/main';
export interface Props {
    isDisabled?: boolean;
    editorView: EditorView;
    textFormattingState?: TextFormattingState;
    clearFormattingState?: ClearFormattingState;
    popupsMountPoint?: HTMLElement;
    popupsBoundariesElement?: HTMLElement;
    popupsScrollableElement?: HTMLElement;
    isReducedSpacing?: boolean;
}
export interface State {
    isOpen?: boolean;
}
declare const _default: React.ComponentClass<Props, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<Props & InjectedIntlProps>;
};
export default _default;
