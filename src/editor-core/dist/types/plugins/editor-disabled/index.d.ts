import { Plugin, PluginKey } from 'prosemirror-state';
import { EditorPlugin } from '../../types';
import { Dispatch } from '../../event-dispatcher';
export declare const pluginKey: PluginKey<any, any>;
export declare type EditorDisabledPluginState = {
    editorDisabled: boolean;
};
export declare function createPlugin(dispatch: Dispatch<EditorDisabledPluginState>): Plugin | undefined;
declare const editorDisabledPlugin: () => EditorPlugin;
export default editorDisabledPlugin;
