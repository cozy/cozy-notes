import { EditorState, Plugin, PluginKey, Transaction } from 'prosemirror-state';
import { DecorationSet } from 'prosemirror-view';
export declare const pluginKey: PluginKey<any, any>;
export declare const getDecorations: (state: EditorState) => DecorationSet;
export declare const handleDocOrSelectionChanged: (tr: Transaction, decorationSet: DecorationSet, oldState: EditorState) => DecorationSet;
export declare const createPlugin: () => Plugin<any, any>;
