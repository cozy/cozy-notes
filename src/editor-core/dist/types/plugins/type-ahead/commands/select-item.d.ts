import { EditorState } from 'prosemirror-state';
import { Command } from '../../../types';
import { SelectItemMode, TypeAheadHandler, TypeAheadItem } from '../types';
export declare const selectCurrentItem: (mode?: SelectItemMode) => Command;
export declare const selectSingleItemOrDismiss: (mode?: SelectItemMode) => Command;
export declare const selectByIndex: (index: number) => Command;
export declare const selectItem: (handler: TypeAheadHandler, item: TypeAheadItem, mode?: SelectItemMode) => Command;
export declare const insertFallbackCommand: (start: number, end: number) => Command;
export declare const withTypeAheadQueryMarkPosition: (state: EditorState, cb: (start: number, end: number) => boolean) => boolean;
