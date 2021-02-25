import { Node as PMNode } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { ContextIdentifierProvider, ProviderFactory } from '@atlaskit/editor-common';
import { Dispatch, EventDispatcher } from '../../../event-dispatcher';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
export interface TaskDecisionPluginState {
    currentTaskDecisionItem: PMNode | undefined;
    contextIdentifierProvider?: ContextIdentifierProvider;
}
export declare function createPlugin(portalProviderAPI: PortalProviderAPI, eventDispatcher: EventDispatcher, providerFactory: ProviderFactory, dispatch: Dispatch, useLongPressSelection?: boolean): Plugin<any, any>;
