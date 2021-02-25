import { Plugin, Transaction } from 'prosemirror-state';
import { Dispatch } from '../../event-dispatcher';
import { FindReplacePluginState } from './types';
export declare const initialState: FindReplacePluginState;
export declare const createCommand: <A = import("./actions").FindReplaceAction>(action: A | ((state: Readonly<import("prosemirror-state").EditorState<any>>) => false | A), transform?: ((tr: Transaction<any>, state: import("prosemirror-state").EditorState<any>) => Transaction<any>) | undefined) => import("../..").Command, getPluginState: (state: import("prosemirror-state").EditorState<any>) => FindReplacePluginState, createPluginState: (dispatch: Dispatch<any>, initialState: FindReplacePluginState | ((state: import("prosemirror-state").EditorState<any>) => FindReplacePluginState)) => import("prosemirror-state").StateField<FindReplacePluginState, import("prosemirror-model").Schema<any, any>>;
export declare const createPlugin: (dispatch: Dispatch) => Plugin<any, import("prosemirror-model").Schema<any, any>>;
