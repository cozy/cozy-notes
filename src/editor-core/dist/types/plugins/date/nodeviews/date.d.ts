import React from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { InjectedIntlProps } from 'react-intl';
export interface Props {
    children?: React.ReactNode;
    view: EditorView;
    node: PMNode;
}
declare const _default: React.ComponentClass<Props, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<Props & InjectedIntlProps>;
};
export default _default;
