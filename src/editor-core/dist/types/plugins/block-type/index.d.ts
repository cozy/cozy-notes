import { EditorPlugin } from '../../types';
import { BlockTypePluginOptions } from './types';
declare const blockTypePlugin: (options?: BlockTypePluginOptions | undefined) => EditorPlugin;
export default blockTypePlugin;
export { pluginKey } from './pm-plugins/main';
export type { BlockTypeState } from './pm-plugins/main';
