import { Plugin, PluginKey } from 'prosemirror-state';
import { Dispatch } from '../../../event-dispatcher';
export declare type StateChangeHandler = (state: ClearFormattingState) => any;
export interface ClearFormattingState {
    formattingIsPresent?: boolean;
}
export declare const pluginKey: PluginKey<any, any>;
export declare const plugin: (dispatch: Dispatch) => Plugin<any, any>;
