import { ContextIdentifierProvider, ProviderFactory } from '@atlaskit/editor-common';
import { PluginKey, Plugin, EditorState } from 'prosemirror-state';
import { Dispatch } from '../../../event-dispatcher';
export declare const stateKey: PluginKey<any, any>;
export interface PluginState {
    contextIdentifierProvider?: ContextIdentifierProvider;
}
export declare const getContextIdentifier: (state?: EditorState<any> | undefined) => ContextIdentifierProvider | undefined;
declare const _default: (dispatch: Dispatch, providerFactory?: ProviderFactory | undefined) => Plugin<any, any>;
export default _default;
