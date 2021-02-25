import { Node as PMNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import { ProviderFactory } from '@atlaskit/editor-common';
import { ReactNodeView, getPosHandler } from '../../../nodeviews';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import { EmojiPluginOptions } from '../types';
import { EventDispatcher } from '../../../event-dispatcher';
export interface Props {
    providerFactory: ProviderFactory;
    options?: EmojiPluginOptions;
}
export declare class EmojiNodeView extends ReactNodeView<Props> {
    createDomRef(): HTMLElement;
    render(props: Props): JSX.Element;
}
export default function emojiNodeView(portalProviderAPI: PortalProviderAPI, eventDispatcher: EventDispatcher, providerFactory: ProviderFactory, options?: EmojiPluginOptions): (node: PMNode, view: EditorView, getPos: getPosHandler) => NodeView;
