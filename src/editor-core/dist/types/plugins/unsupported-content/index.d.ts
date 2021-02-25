import { PluginKey } from 'prosemirror-state';
import { EditorPlugin } from '../../types';
export declare const pluginKey: PluginKey<any, any>;
declare const unsupportedContentPlugin: () => EditorPlugin;
export default unsupportedContentPlugin;
