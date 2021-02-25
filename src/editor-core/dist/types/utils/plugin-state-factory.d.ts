import { EditorState, StateField, PluginKey, Transaction } from 'prosemirror-state';
import { Dispatch } from '../event-dispatcher';
import { Command } from '../types';
export declare type Reducer<PluginState, Action> = (state: PluginState, action: Action) => PluginState;
declare type MapState<PluginState> = (tr: Transaction, pluginState: PluginState) => PluginState;
declare type Plugin<PluginState, Action, InitialState extends PluginState> = {
    createPluginState: (dispatch: Dispatch, initialState: InitialState | ((state: EditorState) => InitialState)) => StateField<PluginState>;
    createCommand: <A = Action>(action: A | ((state: Readonly<EditorState>) => A | false), transform?: (tr: Transaction, state: EditorState) => Transaction) => Command;
    getPluginState: (state: EditorState) => PluginState;
};
export declare function pluginFactory<PluginState, Action, InitialState extends PluginState>(pluginKey: PluginKey, reducer: Reducer<PluginState, Action>, options?: {
    mapping?: MapState<PluginState>;
    onDocChanged?: MapState<PluginState>;
    onSelectionChanged?: MapState<PluginState>;
}): Plugin<PluginState, Action, InitialState>;
export {};
