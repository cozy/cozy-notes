import { Plugin, PluginKey } from 'prosemirror-state';
import { EditorPlugin } from '../../types';
export declare const pluginKey: PluginKey<any, any>;
export declare function createPlugin(): Plugin | undefined;
declare const clearMarksOnChangeToEmptyDocumentPlugin: () => EditorPlugin;
export default clearMarksOnChangeToEmptyDocumentPlugin;
