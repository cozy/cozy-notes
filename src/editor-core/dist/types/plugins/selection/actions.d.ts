import { Selection } from 'prosemirror-state';
import { DecorationSet } from 'prosemirror-view';
import { RelativeSelectionPos } from './types';
export declare enum SelectionActionTypes {
    SET_DECORATIONS = "SET_DECORATIONS",
    SET_RELATIVE_SELECTION = "SET_RELATIVE_SELECTION"
}
export interface SetDecorations {
    type: SelectionActionTypes.SET_DECORATIONS;
    decorationSet: DecorationSet;
    selection: Selection;
}
export interface SetRelativeSelection {
    type: SelectionActionTypes.SET_RELATIVE_SELECTION;
    selectionRelativeToNode?: RelativeSelectionPos;
}
export declare type SelectionAction = SetDecorations | SetRelativeSelection;
