import { EditorState, Plugin, PluginKey } from 'prosemirror-state';
import { Dispatch } from '../../../event-dispatcher';
import { AlignmentPluginState } from './types';
export declare function createInitialPluginState(editorState: EditorState, pluginConfig: AlignmentPluginState): AlignmentPluginState;
export declare const pluginKey: PluginKey<any, any>;
export declare function createPlugin(dispatch: Dispatch, pluginConfig: AlignmentPluginState): Plugin;
