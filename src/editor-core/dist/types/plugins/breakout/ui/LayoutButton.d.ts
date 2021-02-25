import React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { EditorView } from 'prosemirror-view';
import { Node as PMNode } from 'prosemirror-model';
interface Props {
    editorView: EditorView;
    mountPoint?: HTMLElement;
    node: PMNode | null;
    boundariesElement?: HTMLElement;
    scrollableElement?: HTMLElement;
    handleClick?: Function;
}
declare const _default: React.ComponentClass<Props, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<Props & InjectedIntlProps>;
};
export default _default;
