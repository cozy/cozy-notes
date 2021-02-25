import { NodeView } from 'prosemirror-view';
import { ProviderFactory } from '@atlaskit/editor-common';
import { EventDispatcher } from '../../../event-dispatcher';
import { getPosHandler } from '../../../nodeviews';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
export interface Props {
    providerFactory: ProviderFactory;
}
export declare function taskItemNodeViewFactory(portalProviderAPI: PortalProviderAPI, eventDispatcher: EventDispatcher, providerFactory: ProviderFactory): (node: any, view: any, getPos: getPosHandler) => NodeView;
