import { NodeView } from 'prosemirror-view';
import { EventDispatcher } from '../../../event-dispatcher';
import { getPosHandler } from '../../../nodeviews';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
export declare const decisionItemNodeView: (portalProviderAPI: PortalProviderAPI, eventDispatcher: EventDispatcher) => (node: any, view: any, getPos: getPosHandler) => NodeView;
