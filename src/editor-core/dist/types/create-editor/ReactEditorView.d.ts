/// <reference types="react-intl" />
import React from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'prosemirror-state';
import { DirectEditorProps, EditorView } from 'prosemirror-view';
import { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';
import { ErrorReporter, ProviderFactory, Transformer } from '@atlaskit/editor-common';
import { Dispatch, EventDispatcher } from '../event-dispatcher';
import { AnalyticsEventPayload, DispatchAnalyticsEvent, FULL_WIDTH_MODE } from '../plugins/analytics';
import { EditorAppearance, EditorConfig, EditorReactContext, EditorPlugin, EditorProps } from '../types';
import { PortalProviderAPI } from '../ui/PortalProvider';
import { SEVERITY } from '@atlaskit/editor-common';
export interface EditorViewProps {
    editorProps: EditorProps;
    createAnalyticsEvent?: CreateUIAnalyticsEvent;
    providerFactory: ProviderFactory;
    portalProviderAPI: PortalProviderAPI;
    allowAnalyticsGASV3?: boolean;
    disabled?: boolean;
    render?: (props: {
        editor: JSX.Element;
        view?: EditorView;
        config: EditorConfig;
        eventDispatcher: EventDispatcher;
        transformer?: Transformer<string>;
        dispatchAnalyticsEvent: DispatchAnalyticsEvent;
    }) => JSX.Element;
    onEditorCreated: (instance: {
        view: EditorView;
        config: EditorConfig;
        eventDispatcher: EventDispatcher;
        transformer?: Transformer<string>;
    }) => void;
    onEditorDestroyed: (instance: {
        view: EditorView;
        config: EditorConfig;
        eventDispatcher: EventDispatcher;
        transformer?: Transformer<string>;
    }) => void;
}
export default class ReactEditorView<T = {}> extends React.Component<EditorViewProps & T, {}, EditorReactContext> {
    view?: EditorView;
    eventDispatcher: EventDispatcher;
    contentTransformer?: Transformer<string>;
    config: EditorConfig;
    editorState: EditorState;
    errorReporter: ErrorReporter;
    dispatch: Dispatch;
    analyticsEventHandler: (payloadChannel: {
        payload: AnalyticsEventPayload;
        channel?: string;
    }) => void;
    proseMirrorRenderedSeverity?: SEVERITY;
    static contextTypes: {
        getAtlaskitAnalyticsEventHandlers: PropTypes.Requireable<any>;
        intl: ReactIntl.IntlShape;
    };
    private canDispatchTransactions;
    private focusTimeoutId;
    private pluginPerformanceObserver;
    private onPluginObservation;
    get transactionTrackingProp(): import("../types/performance-tracking").TransactionTracking;
    get transactionTrackingOptions(): {
        samplingRate?: number | undefined;
        slowThreshold?: number | undefined;
        outlierThreshold?: number | undefined;
        outlierFactor?: number | undefined;
    };
    private getPluginNames;
    private countNodes;
    constructor(props: EditorViewProps & T, context: EditorReactContext);
    UNSAFE_componentWillReceiveProps(nextProps: EditorViewProps): void;
    formatFullWidthAppearance: (appearance: EditorAppearance | undefined) => FULL_WIDTH_MODE;
    reconfigureState: (props: EditorViewProps) => void;
    /**
     * Deactivate analytics event handler, if exist any.
     */
    deactivateAnalytics(): void;
    /**
     * Create analytics event handler, if createAnalyticsEvent exist
     * @param createAnalyticsEvent
     */
    activateAnalytics(createAnalyticsEvent?: CreateUIAnalyticsEvent): void;
    componentDidMount(): void;
    /**
     * Clean up any non-PM resources when the editor is unmounted
     */
    componentWillUnmount(): void;
    getPlugins(editorProps: EditorProps, prevEditorProps?: EditorProps, createAnalyticsEvent?: CreateUIAnalyticsEvent): EditorPlugin[];
    createEditorState: (options: {
        props: EditorViewProps;
        context: EditorReactContext;
        replaceDoc?: boolean;
    }) => EditorState<any>;
    private onEditorViewStateUpdated;
    private dispatchTransaction;
    getDirectEditorProps: (state?: EditorState<any> | undefined) => DirectEditorProps;
    createEditorView: (node: HTMLDivElement) => void;
    handleEditorViewRef: (node: HTMLDivElement) => void;
    dispatchAnalyticsEvent: (payload: AnalyticsEventPayload) => void;
    private editor;
    render(): JSX.Element;
}
