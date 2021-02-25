import { EditorPlugin } from '../../types';
import { PluginConfig } from './types';
interface TablePluginOptions {
    tableOptions: PluginConfig;
    dynamicSizingEnabled?: boolean;
    breakoutEnabled?: boolean;
    allowContextualMenu?: boolean;
    fullWidthEnabled?: boolean;
    wasFullWidthEnabled?: boolean;
}
declare const tablesPlugin: (options?: TablePluginOptions | undefined) => EditorPlugin;
export default tablesPlugin;
