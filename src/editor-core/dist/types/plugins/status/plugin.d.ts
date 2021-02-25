import { Plugin } from 'prosemirror-state';
import { Dispatch, EventDispatcher } from '../../event-dispatcher';
import { PortalProviderAPI } from '../../ui/PortalProvider';
import { StatusPluginOptions } from './types';
export { pluginKey, pluginKeyName } from './plugin-key';
export type { StatusState, StatusType } from './types';
declare const createPlugin: (dispatch: Dispatch, portalProviderAPI: PortalProviderAPI, eventDispatcher: EventDispatcher, options?: StatusPluginOptions | undefined) => Plugin<any, any>;
export default createPlugin;
