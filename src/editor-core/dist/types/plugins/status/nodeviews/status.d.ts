import React from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import { InjectedIntlProps } from 'react-intl';
import { Color, StatusStyle } from '@atlaskit/status/element';
import { EventDispatcher } from '../../../event-dispatcher';
import { getPosHandler, ReactNodeView } from '../../../nodeviews';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import { StatusPluginOptions } from '../types';
export interface StyledStatusProps {
    placeholderStyle: boolean;
}
export declare const StyledStatus: import("styled-components").StyledComponentClass<React.ClassAttributes<HTMLSpanElement> & React.HTMLAttributes<HTMLSpanElement> & StyledStatusProps, any, React.ClassAttributes<HTMLSpanElement> & React.HTMLAttributes<HTMLSpanElement> & StyledStatusProps>;
export interface ContainerProps {
    view: EditorView;
    text?: string;
    color: Color;
    style?: StatusStyle;
    localId?: string;
    eventDispatcher?: EventDispatcher;
}
export declare const IntlStatusContainerView: React.ComponentClass<ContainerProps, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<ContainerProps & InjectedIntlProps>;
};
export interface Props {
    options?: StatusPluginOptions;
}
export declare class StatusNodeView extends ReactNodeView<Props> {
    createDomRef(): HTMLElement;
    setDomAttrs(node: PMNode, element: HTMLElement): void;
    render(props: Props): JSX.Element;
}
export default function statusNodeView(portalProviderAPI: PortalProviderAPI, eventDispatcher: EventDispatcher, options?: StatusPluginOptions): (node: PMNode, view: EditorView, getPos: getPosHandler) => NodeView;
