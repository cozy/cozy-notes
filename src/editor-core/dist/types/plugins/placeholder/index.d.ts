import { Plugin, PluginKey, EditorState } from 'prosemirror-state';
import { DecorationSet } from 'prosemirror-view';
import { EditorPlugin } from '../../types';
export declare const pluginKey: PluginKey<any, any>;
export declare function createPlaceholderDecoration(editorState: EditorState, placeholderText: string, pos?: number): DecorationSet;
export declare function createPlugin(defaultPlaceholderText?: string, placeholderHints?: string[], bracketPlaceholderText?: string): Plugin | undefined;
export interface PlaceholderPluginOptions {
    placeholder?: string;
    placeholderHints?: string[];
    placeholderBracketHint?: string;
}
declare const placeholderPlugin: (options?: PlaceholderPluginOptions | undefined) => EditorPlugin;
export default placeholderPlugin;
