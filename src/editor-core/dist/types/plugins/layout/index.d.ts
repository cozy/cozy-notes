import { EditorPlugin } from '../../types';
import { pluginKey } from './pm-plugins/plugin-key';
import { LayoutPluginOptions } from './types';
export { pluginKey };
declare const layoutPlugin: (options?: LayoutPluginOptions) => EditorPlugin;
export default layoutPlugin;
