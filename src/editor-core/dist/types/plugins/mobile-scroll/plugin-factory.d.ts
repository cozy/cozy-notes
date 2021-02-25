import { PluginKey } from 'prosemirror-state';
import { MobileScrollPluginState } from './types';
import { MobileScrollAction } from './actions';
export declare const mobileScrollPluginKey: PluginKey<any, any>;
export declare const createPluginState: (dispatch: import("../../event-dispatcher").Dispatch<any>, initialState: MobileScrollPluginState | ((state: import("prosemirror-state").EditorState<any>) => MobileScrollPluginState)) => import("prosemirror-state").StateField<MobileScrollPluginState, import("prosemirror-model").Schema<any, any>>, getPluginState: (state: import("prosemirror-state").EditorState<any>) => MobileScrollPluginState, createCommand: <A = MobileScrollAction>(action: A | ((state: Readonly<import("prosemirror-state").EditorState<any>>) => false | A), transform?: ((tr: import("prosemirror-state").Transaction<any>, state: import("prosemirror-state").EditorState<any>) => import("prosemirror-state").Transaction<any>) | undefined) => import("../..").Command;
