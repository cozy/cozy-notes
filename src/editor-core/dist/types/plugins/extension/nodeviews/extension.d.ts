import { EditorView, NodeView } from 'prosemirror-view';
import { Node as PmNode } from 'prosemirror-model';
import { ProviderFactory, ExtensionHandlers } from '@atlaskit/editor-common';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import { getPosHandler } from '../../../nodeviews/';
import { EventDispatcher } from '../../../event-dispatcher';
export interface Props {
    node: PmNode;
    providerFactory: ProviderFactory;
    view: EditorView;
}
export default function ExtensionNodeView(portalProviderAPI: PortalProviderAPI, eventDispatcher: EventDispatcher, providerFactory: ProviderFactory, extensionHandlers: ExtensionHandlers): (node: PmNode, view: EditorView, getPos: getPosHandler) => NodeView;
