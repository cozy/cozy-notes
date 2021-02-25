import { Transaction, EditorState } from 'prosemirror-state';
import { Slice } from 'prosemirror-model';
import { INPUT_METHOD } from '../../analytics';
export declare const replaceSelectedTable: (state: EditorState, content: string | Slice, inputMethod: INPUT_METHOD.KEYBOARD | INPUT_METHOD.CLIPBOARD) => Transaction;
