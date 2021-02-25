import React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { EditorView } from 'prosemirror-view';
export interface Props {
    editorView: EditorView;
    bulletListActive?: boolean;
    bulletListDisabled?: boolean;
    orderedListActive?: boolean;
    orderedListDisabled?: boolean;
    disabled?: boolean;
    isSmall?: boolean;
    isSeparator?: boolean;
    isReducedSpacing?: boolean;
    popupsMountPoint?: HTMLElement;
    popupsBoundariesElement?: HTMLElement;
    popupsScrollableElement?: HTMLElement;
}
export interface State {
    isDropdownOpen: boolean;
}
declare const _default: React.ComponentClass<Props, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<Props & InjectedIntlProps>;
};
export default _default;
