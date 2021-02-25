import { EditorState, Transaction } from 'prosemirror-state';
import { Command, CommandDispatch } from '../../types';
import { DateType } from './types';
import { INPUT_METHOD } from '../analytics';
export declare const createDate: () => (insert: (node: Node | Object | string, opts?: any) => Transaction, state: EditorState) => Transaction;
/** Delete the date and close the datepicker */
export declare const deleteDate: () => (state: EditorState, dispatch: (tr: Transaction) => void) => boolean;
/** Focus input */
export declare const focusDateInput: () => (state: EditorState, dispatch: CommandDispatch | undefined) => boolean;
export declare const insertDate: (date?: DateType | undefined, inputMethod?: INPUT_METHOD.INSERT_MENU | INPUT_METHOD.TOOLBAR | undefined, commitMethod?: INPUT_METHOD.KEYBOARD | INPUT_METHOD.PICKER | undefined, enterPressed?: boolean) => (state: EditorState, dispatch: (tr: Transaction) => void) => boolean;
export declare const setDatePickerAt: (showDatePickerAt: number | null) => (state: EditorState, dispatch: (tr: Transaction) => void) => boolean;
export declare const closeDatePicker: () => Command;
export declare const closeDatePickerWithAnalytics: ({ date, }: {
    date?: DateType | undefined;
}) => Command;
export declare const openDatePicker: () => Command;
