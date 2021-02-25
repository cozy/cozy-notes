import React from 'react';
import PropTypes from 'prop-types';
import { ProviderFactory } from '@atlaskit/editor-common';
import { SmartCardProps } from './genericCard';
import { ReactComponentProps } from '../../../nodeviews';
import ReactNodeView from '../../../nodeviews/ReactNodeView';
export interface InlineCardNodeViewProps extends ReactComponentProps {
    providerFactory?: ProviderFactory;
}
export declare class InlineCardComponent extends React.PureComponent<SmartCardProps> {
    private scrollContainer?;
    private onClick;
    static contextTypes: {
        contextAdapter: PropTypes.Requireable<any>;
    };
    UNSAFE_componentWillMount(): void;
    onResolve: (data: {
        url?: string | undefined;
        title?: string | undefined;
    }) => void;
    render(): JSX.Element | null;
}
export declare class InlineCard extends ReactNodeView {
    render(): JSX.Element;
}
