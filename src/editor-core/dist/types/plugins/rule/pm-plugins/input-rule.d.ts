import { Schema } from 'prosemirror-model';
import { EditorState, Plugin, Transaction } from 'prosemirror-state';
import { INPUT_METHOD } from '../../analytics';
export declare const createHorizontalRule: (state: EditorState, start: number, end: number, inputMethod: INPUT_METHOD.QUICK_INSERT | INPUT_METHOD.TOOLBAR | INPUT_METHOD.INSERT_MENU | INPUT_METHOD.FORMATTING | INPUT_METHOD.SHORTCUT) => Transaction<any> | null;
export declare function inputRulePlugin(schema: Schema): Plugin | undefined;
export default inputRulePlugin;
