import React from 'react';
import { EditorView } from 'prosemirror-view';
import { InjectedIntlProps } from 'react-intl';
import { TextFormattingState } from '../../pm-plugins/main';
export interface Props {
    editorView: EditorView;
    textFormattingState: TextFormattingState;
    disabled?: boolean;
    isReducedSpacing?: boolean;
}
declare const _default: React.ComponentClass<Props, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<Props & InjectedIntlProps>;
};
export default _default;
