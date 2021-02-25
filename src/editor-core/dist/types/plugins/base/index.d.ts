import { EditorPlugin } from '../../types';
import { ScrollGutterPluginOptions } from './pm-plugins/scroll-gutter';
import { InputTracking, BFreezeTracking } from '../../types/performance-tracking';
export interface BasePluginOptions {
    allowScrollGutter?: ScrollGutterPluginOptions;
    allowInlineCursorTarget?: boolean;
    inputTracking?: InputTracking;
    bFreezeTracking?: BFreezeTracking;
}
declare const basePlugin: (options?: BasePluginOptions | undefined) => EditorPlugin;
export default basePlugin;
