import React from 'react';
import { EditorView } from 'prosemirror-view';
import { InjectedIntlProps } from 'react-intl';
import { TableLayout } from '@atlaskit/adf-schema';
import { RowStickyState } from '../../pm-plugins/sticky-headers';
import { Node as PMNode } from 'prosemirror-model';
export interface Props {
    editorView: EditorView;
    tableNode?: PMNode;
    targetCellPosition: number;
    isContextualMenuOpen?: boolean;
    mountPoint?: HTMLElement;
    boundariesElement?: HTMLElement;
    scrollableElement?: HTMLElement;
    layout?: TableLayout;
    isNumberColumnEnabled?: boolean;
    stickyHeader?: RowStickyState;
}
declare const _default: React.ComponentClass<Props, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<Props & InjectedIntlProps>;
};
export default _default;
