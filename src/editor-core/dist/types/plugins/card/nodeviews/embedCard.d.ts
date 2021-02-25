import React from 'react';
import { Node as PMNode } from 'prosemirror-model';
import PropTypes from 'prop-types';
import { SmartCardProps, CardNodeViewProps } from './genericCard';
import { RichMediaLayout } from '@atlaskit/adf-schema';
import { SelectionBasedNodeView } from '../../../nodeviews/';
import { DispatchAnalyticsEvent } from '../../../plugins/analytics';
declare type EmbedCardState = {
    hasPreview: boolean;
};
export declare class EmbedCardComponent extends React.PureComponent<SmartCardProps, EmbedCardState> {
    private scrollContainer?;
    onClick: () => void;
    static contextTypes: {
        contextAdapter: PropTypes.Requireable<any>;
    };
    state: {
        hasPreview: boolean;
    };
    UNSAFE_componentWillMount(): void;
    onResolve: (data: {
        url?: string | undefined;
        title?: string | undefined;
    }) => void;
    updateSize: (width: number | null, layout: RichMediaLayout) => true | undefined;
    private getLineLength;
    render(): JSX.Element;
}
export interface EmbedCardNodeViewProps extends CardNodeViewProps {
    allowResizing?: boolean;
    fullWidthMode?: boolean;
    dispatchAnalyticsEvent: DispatchAnalyticsEvent;
}
export declare class EmbedCard extends SelectionBasedNodeView<EmbedCardNodeViewProps> {
    viewShouldUpdate(nextNode: PMNode): boolean;
    createDomRef(): HTMLElement;
    render(): JSX.Element;
}
export {};
