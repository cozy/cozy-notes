import { EditorView } from 'prosemirror-view';
import { Transaction } from 'prosemirror-state';
import { BlockMenuItem } from '../../plugins/insert-block/ui/ToolbarInsertBlock/create-items';
import { MenuItem } from '../DropdownMenu/types';
export declare type Category = {
    title: string;
    name: string;
};
export declare enum Modes {
    full = "full",
    inline = "inline"
}
export declare type SelectedItemProps = {
    selectedItemIndex: number;
    focusedItemIndex?: number;
};
export declare type IntlMessage = {
    id: string;
    description: string;
    defaultMessage: string;
};
export interface InsertMenuProps {
    dropdownItems: BlockMenuItem[];
    editorView: EditorView;
    toggleVisiblity: () => void;
    onInsert: OnInsert;
}
export declare type OnInsert = ({ item }: {
    item: MenuItem;
}) => Transaction;
export declare type SvgGetterParams = {
    name: string;
    content: string;
};
