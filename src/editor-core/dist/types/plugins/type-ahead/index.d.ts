import { EditorPlugin } from '../../types';
import { pluginKey as typeAheadPluginKey, PluginState as TypeAheadPluginState } from './pm-plugins/main';
declare const typeAheadPlugin: () => EditorPlugin;
export { typeAheadPluginKey };
export type { TypeAheadPluginState };
export default typeAheadPlugin;
