import { EditorState, Plugin } from 'prosemirror-state';
import { Dispatch } from '../../../event-dispatcher';
import { DispatchAnalyticsEvent } from '../../analytics';
import { SelectionPluginOptions, SelectionPluginState } from '../types';
export declare const getInitialState: (state: EditorState) => SelectionPluginState;
export declare const createPlugin: (dispatch: Dispatch, dispatchAnalyticsEvent: DispatchAnalyticsEvent, options?: SelectionPluginOptions) => Plugin<any, import("prosemirror-model").Schema<any, any>>;
