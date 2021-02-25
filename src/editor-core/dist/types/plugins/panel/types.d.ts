import { PluginKey } from 'prosemirror-state';
import { LongPressSelectionPluginOptions } from '../selection/types';
export declare const pluginKey: PluginKey<any, any>;
export interface PanelPluginOptions extends LongPressSelectionPluginOptions, PanelPluginConfig {
}
export interface PanelPluginConfig {
    UNSAFE_allowCustomPanel?: boolean;
}
