import { PluginKey, EditorState, Transaction } from 'prosemirror-state';
import { CustomAutoformatState, CustomAutoformatAction } from './types';
export declare const pluginKey: PluginKey<any, any>;
export declare const getPluginState: (editorState: EditorState) => CustomAutoformatState | undefined;
export declare const autoformatAction: (tr: Transaction, action: CustomAutoformatAction) => Transaction;
