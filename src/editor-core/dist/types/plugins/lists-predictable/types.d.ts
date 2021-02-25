import { DecorationSet } from 'prosemirror-view';
export declare const MAX_NESTED_LIST_INDENTATION = 6;
export interface ListsPluginState {
    bulletListActive: boolean;
    bulletListDisabled: boolean;
    orderedListActive: boolean;
    orderedListDisabled: boolean;
    decorationSet: DecorationSet;
}
