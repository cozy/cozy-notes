import { Plugin } from 'prosemirror-state';
import { EditorPlugin } from '../../types/editor-plugin';
import { Dispatch } from '../../event-dispatcher';
import { PlaceholderTextOptions, PluginState } from './types';
export declare function createPlugin(dispatch: Dispatch<PluginState>, options: PlaceholderTextOptions): Plugin | undefined;
declare const placeholderTextPlugin: (options: PlaceholderTextOptions) => EditorPlugin;
export default placeholderTextPlugin;
