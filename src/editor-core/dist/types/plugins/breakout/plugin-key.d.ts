import { EditorState, PluginKey } from 'prosemirror-state';
import { BreakoutPluginState } from './types';
export declare const pluginKey: PluginKey<any, any>;
export declare const getPluginState: (state: EditorState) => BreakoutPluginState;
