import { Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { PMPluginFactoryParams } from '../../../types';
import { DispatchAnalyticsEvent } from '../../analytics/types/dispatch-analytics-event';
import { ACTION } from '../../analytics/types/enums';
export declare const createPlugin: ({ dispatchAnalyticsEvent, }: PMPluginFactoryParams) => Plugin<any, any>;
export declare const sendClipboardAnalytics: (view: EditorView, dispatchAnalyticsEvent: DispatchAnalyticsEvent, action: ACTION.CUT | ACTION.COPIED) => boolean;
