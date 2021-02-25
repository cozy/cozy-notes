import React from 'react';
import PropTypes from 'prop-types';
import { EditorView } from 'prosemirror-view';
import { IntlShape } from 'react-intl';
import { Transformer, ExtensionProvider } from '@atlaskit/editor-common';
import EditorActions from './actions';
import { EditorProps } from './types/editor-props';
import { EventDispatcher } from './event-dispatcher';
import { FireAnalyticsCallback } from './plugins/analytics';
import { QuickInsertProvider } from './plugins/quick-insert/types';
export type { AllowedBlockTypes, Command, CommandDispatch, DomAtPos, EditorAppearance, EditorAppearanceComponentProps, EditorConfig, EditorInstance, EditorPlugin, EditorProps, ExtensionProvidersProp, ExtensionConfig, FeedbackInfo, MarkConfig, MessageDescriptor, NodeConfig, NodeViewConfig, PMPlugin, PMPluginCreateConfig, PMPluginFactory, PMPluginFactoryParams, PluginsOptions, ReactComponents, ToolbarUIComponentFactory, ToolbarUiComponentFactoryParams, UIComponentFactory, UiComponentFactoryParams, } from './types';
declare type Context = {
    editorActions?: EditorActions;
    intl: IntlShape;
};
declare type State = {
    extensionProvider?: ExtensionProvider;
    quickInsertProvider?: Promise<QuickInsertProvider>;
};
export default class Editor extends React.Component<EditorProps, State> {
    static defaultProps: EditorProps;
    static contextTypes: {
        editorActions: PropTypes.Requireable<any>;
        intl: IntlShape;
    };
    private providerFactory;
    private editorActions;
    private createAnalyticsEvent?;
    constructor(props: EditorProps, context: Context);
    componentDidMount(): void;
    componentDidUpdate(prevProps: EditorProps): void;
    componentWillUnmount(): void;
    prepareExtensionProvider: (extensionProviders?: (ExtensionProvider<any> | Promise<ExtensionProvider<any>>)[] | ((editorActions?: EditorActions<any> | undefined) => (ExtensionProvider<any> | Promise<ExtensionProvider<any>>)[]) | undefined) => ExtensionProvider<any> | undefined;
    prepareQuickInsertProvider: (extensionProvider?: ExtensionProvider<any> | undefined, quickInsert?: boolean | {
        provider: Promise<QuickInsertProvider>;
    } | undefined) => Promise<QuickInsertProvider> | undefined;
    onEditorCreated(instance: {
        view: EditorView;
        eventDispatcher: EventDispatcher;
        transformer?: Transformer<string>;
    }): void;
    private deprecationWarnings;
    onEditorDestroyed(_instance: {
        view: EditorView;
        transformer?: Transformer<string>;
    }): void;
    private registerEditorForActions;
    private unregisterEditorFromActions;
    private handleProviders;
    private getBaseFontSize;
    handleSave: (view: EditorView) => void;
    handleAnalyticsEvent: FireAnalyticsCallback;
    render(): JSX.Element;
}
