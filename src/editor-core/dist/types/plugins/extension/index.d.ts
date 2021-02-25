import { ExtensionHandlers } from '@atlaskit/editor-common/extensions';
import { EditorPlugin } from '../../types';
import { LongPressSelectionPluginOptions } from '../selection/types';
interface ExtensionPluginOptions extends LongPressSelectionPluginOptions {
    allowAutoSave?: boolean;
    allowLocalIdGeneration?: boolean;
    breakoutEnabled?: boolean;
    extensionHandlers?: ExtensionHandlers;
    stickToolbarToBottom?: boolean;
}
declare const extensionPlugin: (options?: ExtensionPluginOptions) => EditorPlugin;
export default extensionPlugin;
