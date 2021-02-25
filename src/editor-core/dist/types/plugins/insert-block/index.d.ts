import { EditorPlugin } from '../../types';
export interface InsertBlockOptions {
    allowTables?: boolean;
    allowExpand?: boolean;
    insertMenuItems?: any;
    horizontalRuleEnabled?: boolean;
    nativeStatusSupported?: boolean;
    replacePlusMenuWithElementBrowser?: boolean;
    showElementBrowserLink?: boolean;
}
declare const insertBlockPlugin: (options?: InsertBlockOptions) => EditorPlugin;
export default insertBlockPlugin;
