import React from 'react';
import { EditorView } from 'prosemirror-view';
import { Node as PMNode } from 'prosemirror-model';
import { PortalProviderAPI } from '../ui/PortalProvider';
import { EventDispatcher } from '../event-dispatcher';
import { ReactComponentProps, shouldUpdate, getPosHandler } from './types';
import ReactNodeView from './ReactNodeView';
/**
 * A ReactNodeView that handles React components sensitive
 * to selection changes.
 *
 * If the selection changes, it will attempt to re-render the
 * React component. Otherwise it does nothing.
 *
 * You can subclass `viewShouldUpdate` to include other
 * props that your component might want to consider before
 * entering the React lifecycle. These are usually props you
 * compare in `shouldComponentUpdate`.
 *
 * An example:
 *
 * ```
 * viewShouldUpdate(nextNode) {
 *   if (nextNode.attrs !== this.node.attrs) {
 *     return true;
 *   }
 *
 *   return super.viewShouldUpdate(nextNode);
 * }```
 */
export declare class SelectionBasedNodeView<P = ReactComponentProps> extends ReactNodeView<P> {
    private oldSelection;
    private selectionChangeState;
    pos: number | undefined;
    posEnd: number | undefined;
    constructor(node: PMNode, view: EditorView, getPos: getPosHandler, portalProviderAPI: PortalProviderAPI, eventDispatcher: EventDispatcher, reactComponentProps: P, reactComponent?: React.ComponentType<any>, hasContext?: boolean, viewShouldUpdate?: shouldUpdate);
    /**
     * Update current node's start and end positions.
     *
     * Prefer `this.pos` rather than getPos(), because calling getPos is
     * expensive, unless you know you're definitely going to render.
     */
    private updatePos;
    private getPositionsWithDefault;
    isNodeInsideSelection: (from: number, to: number, pos?: number | undefined, posEnd?: number | undefined) => boolean;
    isSelectionInsideNode: (from: number, to: number, pos?: number | undefined, posEnd?: number | undefined) => boolean;
    private isSelectedNode;
    insideSelection: () => boolean;
    viewShouldUpdate(_nextNode: PMNode): boolean;
    destroy(): void;
    private onSelectionChange;
}
