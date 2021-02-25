import { Plugin } from 'prosemirror-state';
import { Dispatch, EventDispatcher } from '../../../event-dispatcher';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import { PluginConfig } from '../types';
export declare const createPlugin: (dispatch: Dispatch, portalProviderAPI: PortalProviderAPI, eventDispatcher: EventDispatcher, pluginConfig: PluginConfig, dynamicTextSizing?: boolean | undefined, breakoutEnabled?: boolean | undefined, fullWidthModeEnabled?: boolean | undefined, previousFullWidthModeEnabled?: boolean | undefined) => Plugin<any, import("prosemirror-model").Schema<any, any>>;
