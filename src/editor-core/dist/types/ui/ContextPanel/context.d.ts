import React from 'react';
export declare type ContextPanelContext = {
    width: number;
    broadcastWidth: (width: number) => void;
};
declare const Provider: React.Provider<ContextPanelContext>, Consumer: React.Consumer<ContextPanelContext>;
export declare type ContextPanelProviderState = {
    width?: number;
};
export declare class ContextPanelWidthProvider extends React.Component<any, ContextPanelProviderState> {
    state: {
        width: number;
    };
    constructor(props: any);
    broadcastSidebarWidth: (width: number) => void;
    render(): JSX.Element;
}
export { Provider as ContextPanelProvider, Consumer as ContextPanelConsumer };
