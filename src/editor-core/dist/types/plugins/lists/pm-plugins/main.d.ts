import { Plugin, PluginKey } from 'prosemirror-state';
import { Dispatch } from '../../../event-dispatcher';
export declare const pluginKey: PluginKey<any, any>;
export interface ListsPluginState {
    bulletListActive: boolean;
    bulletListDisabled: boolean;
    orderedListActive: boolean;
    orderedListDisabled: boolean;
}
export declare const createPlugin: (dispatch: Dispatch) => Plugin<any, any>;
