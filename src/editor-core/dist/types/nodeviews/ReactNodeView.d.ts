import React from 'react';
import { NodeView, EditorView, Decoration } from 'prosemirror-view';
import { Node as PMNode } from 'prosemirror-model';
import { PortalProviderAPI } from '../ui/PortalProvider';
import { EventDispatcher } from '../event-dispatcher';
import { ReactComponentProps, shouldUpdate, getPosHandler, ForwardRef } from './types';
export default class ReactNodeView<P = ReactComponentProps> implements NodeView {
    private domRef?;
    private contentDOMWrapper?;
    private reactComponent?;
    private portalProviderAPI;
    private hasContext;
    private _viewShouldUpdate?;
    private eventDispatcher?;
    reactComponentProps: P;
    view: EditorView;
    getPos: getPosHandler;
    contentDOM: Node | undefined;
    node: PMNode;
    constructor(node: PMNode, view: EditorView, getPos: getPosHandler, portalProviderAPI: PortalProviderAPI, eventDispatcher: EventDispatcher, reactComponentProps?: P, reactComponent?: React.ComponentType<any>, hasContext?: boolean, viewShouldUpdate?: shouldUpdate);
    /**
     * This method exists to move initialization logic out of the constructor,
     * so object can be initialized properly before calling render first time.
     *
     * Example:
     * Instance properties get added to an object only after super call in
     * constructor, which leads to some methods being undefined during the
     * first render.
     */
    init(): this;
    private renderReactComponent;
    createDomRef(): HTMLElement;
    getContentDOM(): {
        dom: Node;
        contentDOM?: Node | null | undefined;
    } | undefined;
    handleRef: (node: HTMLElement | null) => void;
    private _handleRef;
    render(props: P, forwardRef?: ForwardRef): React.ReactElement<any> | null;
    update(node: PMNode, _decorations: Array<Decoration>, validUpdate?: (currentNode: PMNode, newNode: PMNode) => boolean): boolean;
    viewShouldUpdate(nextNode: PMNode): boolean;
    /**
     * Copies the attributes from a ProseMirror Node to a DOM node.
     * @param node The Prosemirror Node from which to source the attributes
     */
    setDomAttrs(node: PMNode, element: HTMLElement): void;
    get dom(): HTMLElement | undefined;
    destroy(): void;
    get performanceOptions(): {
        enabled: boolean;
        samplingRate: number;
        slowThreshold: number;
    };
    private dispatchAnalyticsEvent;
    static fromComponent(component: React.ComponentType<any>, portalProviderAPI: PortalProviderAPI, eventDispatcher: EventDispatcher, props?: ReactComponentProps, viewShouldUpdate?: (nextNode: PMNode) => boolean): (node: PMNode, view: EditorView, getPos: getPosHandler) => ReactNodeView<ReactComponentProps>;
}
