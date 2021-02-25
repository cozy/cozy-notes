import { PluginKey } from 'prosemirror-state';
import { EditorPlugin, FeedbackInfo } from '../../types';
export declare const pluginKey: PluginKey<any, any>;
export declare const openFeedbackDialog: (feedbackInfo?: FeedbackInfo | undefined) => Promise<unknown>;
declare const feedbackDialog: (feedbackInfo: FeedbackInfo) => EditorPlugin;
export default feedbackDialog;
