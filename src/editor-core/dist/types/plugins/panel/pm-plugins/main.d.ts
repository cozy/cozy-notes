import { EditorState, Plugin } from 'prosemirror-state';
import { ProviderFactory } from '@atlaskit/editor-common';
import { Command } from '../../../types';
import { PanelPluginOptions } from '../types';
import { Dispatch } from '../../../event-dispatcher';
export declare type PanelState = {
    element?: HTMLElement;
    activePanelType?: string;
    activePanelColor?: string;
    activePanelIcon?: string;
    toolbarVisible?: boolean;
};
export declare type PanelOptions = {
    color?: string;
    emoji?: string;
};
export declare const getPluginState: (state: EditorState) => PanelState;
export declare const setPluginState: (stateProps: PanelState) => Command;
export declare type PanelStateSubscriber = (state: PanelState) => any;
export declare const createPlugin: (dispatch: Dispatch, providerFactory: ProviderFactory, pluginOptions: PanelPluginOptions) => Plugin<any, any>;
