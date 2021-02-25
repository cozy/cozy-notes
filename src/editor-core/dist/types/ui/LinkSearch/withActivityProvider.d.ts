import React from 'react';
import { ActivityProvider } from '@atlaskit/activity-provider';
import { ProviderFactory, Providers } from '@atlaskit/editor-common';
export interface ExpandedActivityProviderProps {
    providerFactory: ProviderFactory;
}
export interface WithActivityProviderProps {
    activityProvider: ActivityProvider;
}
export default function withActivityProvider<Props>(WrappedComponent: React.ComponentType<Props & WithActivityProviderProps>): {
    new (props: Readonly<Pick<Props, Exclude<keyof Props, "activityProvider">> & ExpandedActivityProviderProps>): {
        renderNode: (providers: Providers) => JSX.Element;
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<Props, Exclude<keyof Props, "activityProvider">> & ExpandedActivityProviderProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<Pick<Props, Exclude<keyof Props, "activityProvider">> & ExpandedActivityProviderProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Pick<Props, Exclude<keyof Props, "activityProvider">> & ExpandedActivityProviderProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<Props, Exclude<keyof Props, "activityProvider">> & ExpandedActivityProviderProps>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Pick<Props, Exclude<keyof Props, "activityProvider">> & ExpandedActivityProviderProps>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Pick<Props, Exclude<keyof Props, "activityProvider">> & ExpandedActivityProviderProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<Props, Exclude<keyof Props, "activityProvider">> & ExpandedActivityProviderProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Pick<Props, Exclude<keyof Props, "activityProvider">> & ExpandedActivityProviderProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<Props, Exclude<keyof Props, "activityProvider">> & ExpandedActivityProviderProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    new (props: Pick<Props, Exclude<keyof Props, "activityProvider">> & ExpandedActivityProviderProps, context?: any): {
        renderNode: (providers: Providers) => JSX.Element;
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<Props, Exclude<keyof Props, "activityProvider">> & ExpandedActivityProviderProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<Pick<Props, Exclude<keyof Props, "activityProvider">> & ExpandedActivityProviderProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Pick<Props, Exclude<keyof Props, "activityProvider">> & ExpandedActivityProviderProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<Props, Exclude<keyof Props, "activityProvider">> & ExpandedActivityProviderProps>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Pick<Props, Exclude<keyof Props, "activityProvider">> & ExpandedActivityProviderProps>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Pick<Props, Exclude<keyof Props, "activityProvider">> & ExpandedActivityProviderProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<Props, Exclude<keyof Props, "activityProvider">> & ExpandedActivityProviderProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Pick<Props, Exclude<keyof Props, "activityProvider">> & ExpandedActivityProviderProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<Props, Exclude<keyof Props, "activityProvider">> & ExpandedActivityProviderProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    contextType?: React.Context<any> | undefined;
};
