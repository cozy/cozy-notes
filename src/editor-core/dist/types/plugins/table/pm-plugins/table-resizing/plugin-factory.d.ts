import { Transaction } from 'prosemirror-state';
import { ColumnResizingPluginState } from '../../types';
export declare const createCommand: <A = import("../../types").ColumnResizingPluginAction>(action: A | ((state: Readonly<import("prosemirror-state").EditorState<any>>) => false | A), transform?: ((tr: Transaction<any>, state: import("prosemirror-state").EditorState<any>) => Transaction<any>) | undefined) => import("../../../..").Command;
export declare const createPluginState: (dispatch: import("../../../../event-dispatcher").Dispatch<any>, initialState: ColumnResizingPluginState | ((state: import("prosemirror-state").EditorState<any>) => ColumnResizingPluginState)) => import("prosemirror-state").StateField<ColumnResizingPluginState, import("prosemirror-model").Schema<any, any>>;
export declare const getPluginState: (state: import("prosemirror-state").EditorState<any>) => ColumnResizingPluginState;
