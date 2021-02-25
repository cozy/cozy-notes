import { Plugin, PluginKey } from 'prosemirror-state';
import { Dispatch } from '../../event-dispatcher';
import { EditorPlugin } from '../../types';
export declare const pluginKey: PluginKey<any, any>;
export declare type WidthPluginState = {
    width: number;
    lineLength?: number;
};
export declare function createPlugin(dispatch: Dispatch<WidthPluginState>): Plugin | undefined;
declare const widthPlugin: () => EditorPlugin;
export default widthPlugin;
