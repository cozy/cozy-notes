import { Node } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
import { InjectedIntl } from 'react-intl';
import { TypeAheadItem } from '@atlaskit/editor-common/provider-factory';
import { Dispatch } from '../../event-dispatcher';
export type { TypeAheadItem, TypeAheadItemRenderProps, } from '@atlaskit/editor-common/provider-factory';
export declare type SelectItemMode = 'shift-enter' | 'enter' | 'space' | 'selected' | 'tab';
export declare type TypeAheadInsert = (node?: Node | Object | string, opts?: {
    selectInlineNode?: boolean;
}) => Transaction;
export declare type TypeAheadSelectItem = (state: EditorState, item: TypeAheadItem, insert: TypeAheadInsert, meta: {
    mode: SelectItemMode;
}) => Transaction | false;
export declare type TypeAheadHandler = {
    trigger: string;
    customRegex?: string;
    headless?: boolean;
    forceSelect?: (query: string, items: Array<TypeAheadItem>) => boolean;
    getItems: (query: string, editorState: EditorState, intl: InjectedIntl, meta: {
        prevActive: boolean;
        queryChanged: boolean;
    }, tr: Transaction, dipatch: Dispatch) => Array<TypeAheadItem> | Promise<Array<TypeAheadItem>>;
    selectItem: TypeAheadSelectItem;
    dismiss?: (state: EditorState) => void;
    getHighlight?: (state: EditorState) => JSX.Element | null;
};
export declare type TypeAheadItemsLoader = null | {
    promise: Promise<Array<TypeAheadItem>>;
    cancel(): void;
};
