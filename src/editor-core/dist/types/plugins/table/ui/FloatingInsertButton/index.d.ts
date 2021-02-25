import React from 'react';
import { Node as PmNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { InjectedIntlProps } from 'react-intl';
export interface Props {
    editorView: EditorView;
    tableRef?: HTMLElement;
    tableNode?: PmNode;
    insertColumnButtonIndex?: number;
    insertRowButtonIndex?: number;
    isHeaderColumnEnabled?: boolean;
    isHeaderRowEnabled?: boolean;
    mountPoint?: HTMLElement;
    boundariesElement?: HTMLElement;
    scrollableElement?: HTMLElement;
    hasStickyHeaders?: boolean;
}
declare const _default: React.ComponentClass<Props, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<Props & InjectedIntlProps>;
};
export default _default;
