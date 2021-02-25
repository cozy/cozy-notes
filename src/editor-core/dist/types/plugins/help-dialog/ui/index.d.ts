import React from 'react';
import { InjectedIntl, InjectedIntlProps } from 'react-intl';
import { Schema } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import * as keymaps from '../../../keymaps';
export interface Format {
    name: string;
    type: string;
    keymap?: Function;
    autoFormatting?: Function;
    imageEnabled?: boolean;
}
export declare const formatting: (intl: InjectedIntl) => Format[];
export declare const getSupportedFormatting: (schema: Schema, intl: InjectedIntl, imageEnabled?: boolean | undefined, quickInsertEnabled?: boolean | undefined) => Format[];
export declare const getComponentFromKeymap: (keymap: keymaps.Keymap) => JSX.Element;
export interface Props {
    editorView: EditorView;
    isVisible: boolean;
    imageEnabled?: boolean;
    quickInsertEnabled?: boolean;
}
declare const _default: React.ComponentClass<Props, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<Props & InjectedIntlProps>;
};
export default _default;
