import React from 'react';
import { ContextIdentifierProvider } from '@atlaskit/editor-common';
import { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';
export declare type ErrorBoundaryProps = {
    createAnalyticsEvent?: CreateUIAnalyticsEvent | undefined;
    contextIdentifierProvider?: Promise<ContextIdentifierProvider>;
    rethrow?: boolean;
    children: React.ReactNode;
};
export declare type ErrorBoundaryState = {
    error?: Error;
};
declare type AnalyticsErrorBoundaryErrorInfo = {
    componentStack: string;
};
declare type AnalyticsErrorBoundaryAttributes = {
    error: string;
    info?: AnalyticsErrorBoundaryErrorInfo;
    [key: string]: any;
};
export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    static defaultProps: {
        rethrow: boolean;
    };
    state: {
        error: undefined;
    };
    fireAnalytics: (analyticsErrorPayload: AnalyticsErrorBoundaryAttributes) => void;
    private getProductName;
    componentDidCatch(error: Error, errorInfo: AnalyticsErrorBoundaryErrorInfo): void;
    render(): React.ReactNode;
}
export {};
