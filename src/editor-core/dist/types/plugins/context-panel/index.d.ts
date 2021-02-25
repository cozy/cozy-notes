import React from 'react';
import { PluginKey, EditorState } from 'prosemirror-state';
import { EditorPlugin } from '../../types';
import { ContextPanelHandler } from './types';
export declare const pluginKey: PluginKey<any, any>;
export declare type ContextPanelPluginState = {
    handlers: ContextPanelHandler[];
    contents: React.ReactNode[];
};
export declare function getPluginState(state: EditorState): any;
declare const contextPanelPlugin: () => EditorPlugin;
export default contextPanelPlugin;
