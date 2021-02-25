import { EditorPlugin, EditorProps } from '../../types';
import { LongPressSelectionPluginOptions } from '../selection/types';
interface ExpandPluginOptions extends LongPressSelectionPluginOptions {
    allowInsertion?: boolean;
}
declare const expandPlugin: (options?: ExpandPluginOptions) => EditorPlugin;
export default expandPlugin;
export type { ExpandPluginState } from './types';
export declare function isExpandInsertionEnabled({ allowExpand }: EditorProps): boolean;
export { pluginKey } from './pm-plugins/plugin-factory';
