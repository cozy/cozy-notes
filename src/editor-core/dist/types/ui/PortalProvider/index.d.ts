import React from 'react';
import { EventDispatcher } from '../../event-dispatcher';
import { FireAnalyticsCallback } from '../../plugins/analytics/fire-analytics-event';
export declare type PortalProviderProps = {
    render: (portalProviderAPI: PortalProviderAPI) => React.ReactChild | JSX.Element | null;
    onAnalyticsEvent?: FireAnalyticsCallback;
    useAnalyticsContext?: boolean;
};
export declare type Portals = Map<HTMLElement, React.ReactChild>;
export declare type PortalRendererState = {
    portals: Portals;
};
declare type MountedPortal = {
    children: () => React.ReactChild | null;
    hasReactContext: boolean;
};
export declare class PortalProviderAPI extends EventDispatcher {
    portals: Map<HTMLElement, MountedPortal>;
    context: any;
    onAnalyticsEvent?: FireAnalyticsCallback;
    useAnalyticsContext?: boolean;
    constructor(onAnalyticsEvent?: FireAnalyticsCallback, analyticsContext?: boolean);
    setContext: (context: any) => void;
    render(children: () => React.ReactChild | JSX.Element | null, container: HTMLElement, hasReactContext?: boolean): void;
    forceUpdate(): void;
    remove(container: HTMLElement): void;
}
export declare class PortalProvider extends React.Component<PortalProviderProps> {
    static displayName: string;
    portalProviderAPI: PortalProviderAPI;
    constructor(props: PortalProviderProps);
    render(): string | number | JSX.Element | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | null;
    componentDidUpdate(): void;
}
export declare class PortalRenderer extends React.Component<{
    portalProviderAPI: PortalProviderAPI;
}, PortalRendererState> {
    constructor(props: {
        portalProviderAPI: PortalProviderAPI;
    });
    handleUpdate: (portals: Portals) => void;
    render(): JSX.Element;
}
export {};
