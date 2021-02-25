import { EditorPlugin } from '../../types';
import { TextColorPluginConfig, pluginKey as textColorPluginKey, TextColorPluginState } from './pm-plugins/main';
declare const textColorPlugin: (textColorConfig?: boolean | TextColorPluginConfig | undefined) => EditorPlugin;
export { textColorPluginKey };
export type { TextColorPluginState };
export default textColorPlugin;
