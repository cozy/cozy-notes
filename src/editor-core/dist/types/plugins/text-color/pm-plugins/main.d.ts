import { EditorState, Plugin, PluginKey, Transaction } from 'prosemirror-state';
import { Dispatch } from '../../../event-dispatcher';
import { PaletteColor } from '../../../ui/ColorPalette/Palettes/type';
export { DEFAULT_COLOR } from '../utils/color';
export declare type TextColorPluginState = {
    palette: Array<PaletteColor>;
    paletteExpanded?: Array<PaletteColor>;
    defaultColor: string;
    disabled?: boolean;
    color: string | null;
};
export declare type ActionHandlerParams = {
    dispatch: Dispatch;
    pluginState: TextColorPluginState;
    tr: Transaction;
    params?: {
        color?: string;
        disabled?: boolean;
    };
};
export declare type TextColorDefaultColor = {
    color: string;
    label: string;
};
export interface TextColorPluginConfig {
    defaultColor?: TextColorDefaultColor;
    EXPERIMENTAL_allowMoreTextColors?: boolean;
}
export declare function createInitialPluginState(editorState: EditorState, pluginConfig?: TextColorPluginConfig): TextColorPluginState;
export declare enum ACTIONS {
    RESET_COLOR = 0,
    SET_COLOR = 1,
    DISABLE = 2
}
export declare const pluginKey: PluginKey<any, any>;
export declare function createPlugin(dispatch: Dispatch, pluginConfig?: TextColorPluginConfig): Plugin;
