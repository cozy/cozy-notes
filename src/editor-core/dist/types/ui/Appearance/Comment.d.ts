import React from 'react';
import { EditorAppearanceComponentProps } from '../../types';
import { InjectedIntlProps } from 'react-intl';
export interface CommentEditorProps {
    isMaxContentSizeReached?: boolean;
    maxHeight?: number;
}
export interface EditorAppearanceComponentState {
}
declare const _default: React.ComponentClass<EditorAppearanceComponentProps, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<EditorAppearanceComponentProps & InjectedIntlProps>;
};
export default _default;
