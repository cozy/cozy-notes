import { ErrorReporter, ProviderFactory } from '@atlaskit/editor-common';
import { Plugin } from 'prosemirror-state';
import { Schema } from 'prosemirror-model';
import { EditorConfig } from './editor-config';
import { EditorReactContext } from '../types';
import { Dispatch, EventDispatcher } from '../event-dispatcher';
import { PortalProviderAPI } from '../ui/PortalProvider';
import { DispatchAnalyticsEvent } from '../plugins/analytics/types/dispatch-analytics-event';
import { EditorProps } from './editor-props';
export declare type PMPluginFactoryParams = {
    schema: Schema;
    dispatch: Dispatch;
    eventDispatcher: EventDispatcher;
    providerFactory: ProviderFactory;
    errorReporter?: ErrorReporter;
    portalProviderAPI: PortalProviderAPI;
    reactContext: () => EditorReactContext;
    dispatchAnalyticsEvent: DispatchAnalyticsEvent;
};
export declare type PMPluginCreateConfig = PMPluginFactoryParams & {
    editorConfig: EditorConfig;
    performanceTracking: EditorProps['performanceTracking'];
};
export declare type PMPluginFactory = (params: PMPluginFactoryParams) => Plugin | undefined;
export declare type PMPlugin = {
    name: string;
    plugin: PMPluginFactory;
};
