import React from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { ProviderFactory } from '@atlaskit/editor-common';
import { Context as SmartCardContext, CardPlatform } from '@atlaskit/smart-card';
import { getPosHandler, ReactComponentProps } from '../../../nodeviews';
import { EventDispatcher } from '../../../event-dispatcher';
import { DispatchAnalyticsEvent } from '../../../plugins/analytics';
export declare type EditorContext<T> = React.Context<T> & {
    value: T;
};
export interface CardNodeViewProps extends ReactComponentProps {
    providerFactory?: ProviderFactory;
    platform?: CardPlatform;
    eventDispatcher?: EventDispatcher<any>;
}
export interface CardProps extends CardNodeViewProps {
    children?: React.ReactNode;
    node: PMNode;
    view: EditorView;
    getPos: getPosHandler;
    dispatchAnalyticsEvent?: DispatchAnalyticsEvent;
    isMobile?: boolean;
    eventDispatcher?: EventDispatcher<any>;
    allowResizing?: boolean;
    fullWidthMode?: boolean;
}
export interface SmartCardProps extends CardProps {
    cardContext?: EditorContext<typeof SmartCardContext>;
}
export declare function Card(SmartCardComponent: React.ComponentType<SmartCardProps>, UnsupportedComponent: React.ComponentType): React.ComponentType<CardProps>;
