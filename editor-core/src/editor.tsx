import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { EditorView } from 'prosemirror-view';
import { intlShape, IntlShape, IntlProvider } from 'react-intl';
import memoizeOne from 'memoize-one';
import { name, version } from './version-wrapper';
import {
  ProviderFactory,
  Transformer,
  BaseTheme,
  getAnalyticsAppearance,
  WithCreateAnalyticsEvent,
  startMeasure,
  stopMeasure,
  clearMeasure,
  measureTTI,
  ExtensionProvider,
  combineExtensionProviders,
  WidthProvider,
  ContextIdentifierProvider,
} from '@atlaskit/editor-common';
import { akEditorFullPageDefaultFontSize } from '@atlaskit/editor-shared-styles';
import { FabricEditorAnalyticsContext } from '@atlaskit/analytics-namespaced-context';
import { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';

import { getUiComponent } from './create-editor';
import EditorActions from './actions';
import { EditorProps, ExtensionProvidersProp } from './types/editor-props';
import { ReactEditorView } from './create-editor';
import { EventDispatcher } from './event-dispatcher';
import EditorContext from './ui/EditorContext';
import { PortalProvider, PortalRenderer } from './ui/PortalProvider';
import { nextMajorVersion } from './version-wrapper';
import { ContextAdapter } from './nodeviews/context-adapter';
import measurements from './utils/performance/measure-enum';
import {
  combineQuickInsertProviders,
  extensionProviderToQuickInsertProvider,
} from './utils/extensions';
import {
  fireAnalyticsEvent,
  EVENT_TYPE,
  ACTION_SUBJECT,
  ACTION,
  FireAnalyticsCallback,
} from './plugins/analytics';
import ErrorBoundary from './create-editor/ErrorBoundary';
import {
  QuickInsertProvider,
  QuickInsertOptions,
} from './plugins/quick-insert/types';

export type {
  AllowedBlockTypes,
  Command,
  CommandDispatch,
  DomAtPos,
  EditorAppearance,
  EditorAppearanceComponentProps,
  EditorConfig,
  EditorInstance,
  EditorPlugin,
  EditorProps,
  ExtensionProvidersProp,
  ExtensionConfig,
  FeedbackInfo,
  MarkConfig,
  MessageDescriptor,
  NodeConfig,
  NodeViewConfig,
  PMPlugin,
  PMPluginCreateConfig,
  PMPluginFactory,
  PMPluginFactoryParams,
  PluginsOptions,
  ReactComponents,
  ToolbarUIComponentFactory,
  ToolbarUiComponentFactoryParams,
  UIComponentFactory,
  UiComponentFactoryParams,
} from './types';

type Context = {
  editorActions?: EditorActions;
  intl: IntlShape;
};

const WidthProviderFullHeight = styled(WidthProvider)`
  height: 100%;
`;

type State = {
  extensionProvider?: ExtensionProvider;
  quickInsertProvider?: Promise<QuickInsertProvider>;
};
export default class Editor extends React.Component<EditorProps, State> {
  static defaultProps: EditorProps = {
    appearance: 'comment',
    disabled: false,
    extensionHandlers: {},
    allowHelpDialog: true,
    allowNewInsertionBehaviour: true,
    quickInsert: true,
  };

  static contextTypes = {
    editorActions: PropTypes.object,
    intl: intlShape,
  };

  private providerFactory: ProviderFactory;
  private editorActions: EditorActions;
  private createAnalyticsEvent?: CreateUIAnalyticsEvent;

  constructor(props: EditorProps, context: Context) {
    super(props);
    this.providerFactory = new ProviderFactory();
    this.deprecationWarnings(props);
    this.onEditorCreated = this.onEditorCreated.bind(this);
    this.onEditorDestroyed = this.onEditorDestroyed.bind(this);
    this.editorActions = (context || {}).editorActions || new EditorActions();

    startMeasure(measurements.EDITOR_MOUNTED);
    if (
      props.performanceTracking &&
      props.performanceTracking.ttiTracking &&
      props.performanceTracking.ttiTracking.enabled
    ) {
      measureTTI(
        (tti, ttiFromInvocation, canceled) => {
          if (this.createAnalyticsEvent) {
            fireAnalyticsEvent(this.createAnalyticsEvent)({
              payload: {
                action: ACTION.EDITOR_TTI,
                actionSubject: ACTION_SUBJECT.EDITOR,
                attributes: { tti, ttiFromInvocation, canceled },
                eventType: EVENT_TYPE.OPERATIONAL,
              },
            });
          }
        },
        props.performanceTracking.ttiTracking.ttiIdleThreshold,
        props.performanceTracking.ttiTracking.ttiCancelTimeout,
      );
    }

    const extensionProvider = this.prepareExtensionProvider(
      props.extensionProviders,
    );

    const quickInsertProvider = this.prepareQuickInsertProvider(
      extensionProvider,
      props.quickInsert,
    );

    this.state = {
      extensionProvider,
      quickInsertProvider,
    };
  }

  componentDidMount() {
    stopMeasure(measurements.EDITOR_MOUNTED, (duration, startTime) => {
      if (this.createAnalyticsEvent) {
        const fireMounted = (objectId?: string) => {
          fireAnalyticsEvent(this.createAnalyticsEvent)({
            payload: {
              action: ACTION.EDITOR_MOUNTED,
              actionSubject: ACTION_SUBJECT.EDITOR,
              attributes: {
                duration,
                startTime,
                objectId,
              },
              eventType: EVENT_TYPE.OPERATIONAL,
            },
          });
        };

        Promise.resolve(this.props.contextIdentifierProvider).then(
          (p?: ContextIdentifierProvider) => {
            fireMounted(p?.objectId);
          },
          fireMounted,
        );
      }
    });
    this.handleProviders(this.props);
  }

  componentDidUpdate(prevProps: EditorProps) {
    const { extensionProviders, quickInsert } = this.props;
    if (
      (extensionProviders &&
        extensionProviders !== prevProps.extensionProviders) ||
      // Though this will introduce some performance regression related to quick insert
      // loading but we can remove it soon when Forge will move to new API.
      // quickInsert={Promise.resolve(consumerQuickInsert)} is one of the main reason behind this performance issue.
      (quickInsert && quickInsert !== prevProps.quickInsert)
    ) {
      const extensionProvider = this.prepareExtensionProvider(
        extensionProviders,
      );
      const quickInsertProvider = this.prepareQuickInsertProvider(
        extensionProvider,
        quickInsert,
      );

      this.setState(
        {
          extensionProvider,
          quickInsertProvider,
        },
        () => this.handleProviders(this.props),
      );
      return;
    }
    this.handleProviders(this.props);
  }

  componentWillUnmount() {
    this.unregisterEditorFromActions();
    this.providerFactory.destroy();
    clearMeasure(measurements.EDITOR_MOUNTED);
  }

  prepareExtensionProvider = memoizeOne(
    (extensionProviders?: ExtensionProvidersProp) => {
      if (!extensionProviders) {
        return;
      }

      if (typeof extensionProviders === 'function') {
        return combineExtensionProviders(
          extensionProviders(this.editorActions),
        );
      }

      return combineExtensionProviders(extensionProviders);
    },
  );

  prepareQuickInsertProvider = (
    extensionProvider?: ExtensionProvider,
    quickInsert?: QuickInsertOptions,
  ) => {
    const quickInsertProvider =
      quickInsert && typeof quickInsert !== 'boolean' && quickInsert.provider;

    const extensionQuickInsertProvider =
      extensionProvider &&
      extensionProviderToQuickInsertProvider(
        extensionProvider,
        this.editorActions,
        this.createAnalyticsEvent,
      );

    return quickInsertProvider && extensionQuickInsertProvider
      ? combineQuickInsertProviders([
          quickInsertProvider,
          extensionQuickInsertProvider,
        ])
      : quickInsertProvider || extensionQuickInsertProvider;
  };

  onEditorCreated(instance: {
    view: EditorView;
    eventDispatcher: EventDispatcher;
    transformer?: Transformer<string>;
  }) {
    this.registerEditorForActions(
      instance.view,
      instance.eventDispatcher,
      instance.transformer,
    );

    if (this.props.onEditorReady) {
      this.props.onEditorReady(this.editorActions);
    }
  }

  private deprecationWarnings(props: EditorProps) {
    const nextVersion = nextMajorVersion();
    const deprecatedProperties = {
      allowTasksAndDecisions: {
        message:
          'To allow tasks and decisions use taskDecisionProvider – <Editor taskDecisionProvider={{ provider }} />',
        type: 'removed',
      },

      allowConfluenceInlineComment: {
        message:
          'To integrate inline comments use experimental annotationProvider – <Editor annotationProviders={{ provider }} />',
        type: 'removed',
      },

      transactionTracking: {
        message:
          'Deprecated. To enable transaction tracking use performanceTracking prop instead: performanceTracking={{ transactionTracking: { enabled: true } }}',
        type: 'removed',
      },
    };

    (Object.keys(deprecatedProperties) as Array<
      keyof typeof deprecatedProperties
    >).forEach(property => {
      if (props.hasOwnProperty(property)) {
        const meta: { type?: string; message?: string } =
          deprecatedProperties[property];
        const type = meta.type || 'enabled by default';

        // eslint-disable-next-line no-console
        console.warn(
          `${property} property is deprecated. ${
            meta.message || ''
          } [Will be ${type} in editor-core@${nextVersion}]`,
        );
      }
    });

    if (
      props.hasOwnProperty('allowTables') &&
      typeof props.allowTables !== 'boolean' &&
      (!props.allowTables || !props.allowTables.advanced)
    ) {
      // eslint-disable-next-line no-console
      console.warn(
        `Advanced table options are deprecated (except isHeaderRowRequired) to continue using advanced table features use - <Editor allowTables={{ advanced: true }} /> [Will be changed in editor-core@${nextVersion}]`,
      );
    }
  }

  onEditorDestroyed(_instance: {
    view: EditorView;
    transformer?: Transformer<string>;
  }) {
    this.unregisterEditorFromActions();

    if (this.props.onDestroy) {
      this.props.onDestroy();
    }
  }

  private registerEditorForActions(
    editorView: EditorView,
    eventDispatcher: EventDispatcher,
    contentTransformer?: Transformer<string>,
  ) {
    this.editorActions._privateRegisterEditor(
      editorView,
      eventDispatcher,
      contentTransformer,
    );
  }

  private unregisterEditorFromActions() {
    if (this.editorActions) {
      this.editorActions._privateUnregisterEditor();
    }
  }

  private handleProviders(props: EditorProps) {
    const {
      emojiProvider,
      mentionProvider,
      taskDecisionProvider,
      contextIdentifierProvider,
      collabEditProvider,
      activityProvider,
      presenceProvider,
      macroProvider,
      legacyImageUploadProvider,
      media,
      collabEdit,
      autoformattingProvider,
      searchProvider,
      UNSAFE_cards,
    } = props;

    const { extensionProvider, quickInsertProvider } = this.state;

    this.providerFactory.setProvider('emojiProvider', emojiProvider);
    this.providerFactory.setProvider('mentionProvider', mentionProvider);
    this.providerFactory.setProvider(
      'taskDecisionProvider',
      taskDecisionProvider,
    );
    this.providerFactory.setProvider(
      'contextIdentifierProvider',
      contextIdentifierProvider,
    );

    this.providerFactory.setProvider('mediaProvider', media && media.provider);
    this.providerFactory.setProvider(
      'imageUploadProvider',
      legacyImageUploadProvider,
    );
    this.providerFactory.setProvider(
      'collabEditProvider',
      collabEdit && collabEdit.provider
        ? collabEdit.provider
        : collabEditProvider,
    );
    this.providerFactory.setProvider('activityProvider', activityProvider);
    this.providerFactory.setProvider('searchProvider', searchProvider);
    this.providerFactory.setProvider('presenceProvider', presenceProvider);
    this.providerFactory.setProvider('macroProvider', macroProvider);

    if (UNSAFE_cards && UNSAFE_cards.provider) {
      this.providerFactory.setProvider('cardProvider', UNSAFE_cards.provider);
    }

    this.providerFactory.setProvider(
      'autoformattingProvider',
      autoformattingProvider,
    );

    if (extensionProvider) {
      this.providerFactory.setProvider(
        'extensionProvider',
        Promise.resolve(extensionProvider),
      );
    }

    if (quickInsertProvider) {
      this.providerFactory.setProvider(
        'quickInsertProvider',
        quickInsertProvider,
      );
    }
  }

  private getBaseFontSize() {
    return !this.props.allowDynamicTextSizing &&
      !['comment', 'chromeless', 'mobile'].includes(this.props.appearance!)
      ? akEditorFullPageDefaultFontSize
      : undefined;
  }

  handleSave = (view: EditorView): void => {
    if (!this.props.onSave) {
      return;
    }

    return this.props.onSave(view);
  };

  handleAnalyticsEvent: FireAnalyticsCallback = data =>
    fireAnalyticsEvent(this.createAnalyticsEvent)(data);

  render() {
    const Component = getUiComponent(this.props.appearance!);

    const overriddenEditorProps = {
      ...this.props,
      onSave: this.props.onSave ? this.handleSave : undefined,
      // noop all analytic events, even if a handler is still passed.
      analyticsHandler: undefined,
    };

    const editor = (
      <FabricEditorAnalyticsContext
        data={{
          packageName: name,
          packageVersion: version,
          componentName: 'editorCore',
          appearance: getAnalyticsAppearance(this.props.appearance),
        }}
      >
        <WithCreateAnalyticsEvent
          render={createAnalyticsEvent =>
            (this.createAnalyticsEvent = createAnalyticsEvent) && (
              <ErrorBoundary
                createAnalyticsEvent={createAnalyticsEvent}
                contextIdentifierProvider={this.props.contextIdentifierProvider}
              >
                <WidthProviderFullHeight>
                  <EditorContext editorActions={this.editorActions}>
                    <ContextAdapter>
                      <PortalProvider
                        onAnalyticsEvent={this.handleAnalyticsEvent}
                        useAnalyticsContext={
                          this.props.UNSAFE_useAnalyticsContext
                        }
                        render={portalProviderAPI => (
                          <>
                            <ReactEditorView
                              editorProps={overriddenEditorProps}
                              createAnalyticsEvent={createAnalyticsEvent}
                              portalProviderAPI={portalProviderAPI}
                              providerFactory={this.providerFactory}
                              onEditorCreated={this.onEditorCreated}
                              onEditorDestroyed={this.onEditorDestroyed}
                              allowAnalyticsGASV3={
                                this.props.allowAnalyticsGASV3
                              }
                              disabled={this.props.disabled}
                              render={({
                                editor,
                                view,
                                eventDispatcher,
                                config,
                                dispatchAnalyticsEvent,
                              }) => (
                                <BaseTheme
                                  dynamicTextSizing={
                                    this.props.allowDynamicTextSizing &&
                                    this.props.appearance !== 'full-width'
                                  }
                                  baseFontSize={this.getBaseFontSize()}
                                >
                                  <Component
                                    appearance={this.props.appearance!}
                                    disabled={this.props.disabled}
                                    editorActions={this.editorActions}
                                    editorDOMElement={editor}
                                    editorView={view}
                                    providerFactory={this.providerFactory}
                                    eventDispatcher={eventDispatcher}
                                    dispatchAnalyticsEvent={
                                      dispatchAnalyticsEvent
                                    }
                                    maxHeight={this.props.maxHeight}
                                    onSave={
                                      this.props.onSave
                                        ? this.handleSave
                                        : undefined
                                    }
                                    onCancel={this.props.onCancel}
                                    popupsMountPoint={
                                      this.props.popupsMountPoint
                                    }
                                    popupsBoundariesElement={
                                      this.props.popupsBoundariesElement
                                    }
                                    popupsScrollableElement={
                                      this.props.popupsScrollableElement
                                    }
                                    contentComponents={config.contentComponents}
                                    primaryToolbarComponents={
                                      config.primaryToolbarComponents
                                    }
                                    primaryToolbarIconBefore={
                                      this.props.primaryToolbarIconBefore
                                    }
                                    secondaryToolbarComponents={
                                      config.secondaryToolbarComponents
                                    }
                                    insertMenuItems={this.props.insertMenuItems}
                                    customContentComponents={
                                      this.props.contentComponents
                                    }
                                    customPrimaryToolbarComponents={
                                      this.props.primaryToolbarComponents
                                    }
                                    customSecondaryToolbarComponents={
                                      this.props.secondaryToolbarComponents
                                    }
                                    contextPanel={this.props.contextPanel}
                                    collabEdit={this.props.collabEdit}
                                    allowAnnotation={
                                      !!this.props.annotationProviders
                                    }
                                  />
                                </BaseTheme>
                              )}
                            />
                            <PortalRenderer
                              portalProviderAPI={portalProviderAPI}
                            />
                          </>
                        )}
                      />
                    </ContextAdapter>
                  </EditorContext>
                </WidthProviderFullHeight>
              </ErrorBoundary>
            )
          }
        />
      </FabricEditorAnalyticsContext>
    );

    return this.context.intl ? (
      editor
    ) : (
      <IntlProvider locale="en">{editor}</IntlProvider>
    );
  }
}
