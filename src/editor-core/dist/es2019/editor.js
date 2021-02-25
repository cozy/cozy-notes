import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { intlShape, IntlProvider } from 'react-intl'
import memoizeOne from 'memoize-one'
import { name, version } from './version-wrapper'
import {
  ProviderFactory,
  BaseTheme,
  getAnalyticsAppearance,
  WithCreateAnalyticsEvent,
  startMeasure,
  stopMeasure,
  clearMeasure,
  measureTTI,
  combineExtensionProviders,
  WidthProvider
} from '@atlaskit/editor-common'
import { akEditorFullPageDefaultFontSize } from '@atlaskit/editor-shared-styles'
import { FabricEditorAnalyticsContext } from '@atlaskit/analytics-namespaced-context'
import { getUiComponent } from './create-editor'
import EditorActions from './actions'
import { ReactEditorView } from './create-editor'
import EditorContext from './ui/EditorContext'
import { PortalProvider, PortalRenderer } from './ui/PortalProvider'
import { nextMajorVersion } from './version-wrapper'
import { ContextAdapter } from './nodeviews/context-adapter'
import measurements from './utils/performance/measure-enum'
import {
  combineQuickInsertProviders,
  extensionProviderToQuickInsertProvider
} from './utils/extensions'
import {
  fireAnalyticsEvent,
  EVENT_TYPE,
  ACTION_SUBJECT,
  ACTION
} from './plugins/analytics'
import ErrorBoundary from './create-editor/ErrorBoundary'
const WidthProviderFullHeight = styled(WidthProvider)`
  height: 100%;
`
export default class Editor extends React.Component {
  constructor(props, context) {
    super(props)

    _defineProperty(
      this,
      'prepareExtensionProvider',
      memoizeOne(extensionProviders => {
        if (!extensionProviders) {
          return
        }

        if (typeof extensionProviders === 'function') {
          return combineExtensionProviders(
            extensionProviders(this.editorActions)
          )
        }

        return combineExtensionProviders(extensionProviders)
      })
    )

    _defineProperty(
      this,
      'prepareQuickInsertProvider',
      (extensionProvider, quickInsert) => {
        const quickInsertProvider =
          quickInsert &&
          typeof quickInsert !== 'boolean' &&
          quickInsert.provider
        const extensionQuickInsertProvider =
          extensionProvider &&
          extensionProviderToQuickInsertProvider(
            extensionProvider,
            this.editorActions,
            this.createAnalyticsEvent
          )
        return quickInsertProvider && extensionQuickInsertProvider
          ? combineQuickInsertProviders([
              quickInsertProvider,
              extensionQuickInsertProvider
            ])
          : quickInsertProvider || extensionQuickInsertProvider
      }
    )

    _defineProperty(this, 'handleSave', view => {
      if (!this.props.onSave) {
        return
      }

      return this.props.onSave(view)
    })

    _defineProperty(this, 'handleAnalyticsEvent', data =>
      fireAnalyticsEvent(this.createAnalyticsEvent)(data)
    )

    this.providerFactory = new ProviderFactory()
    this.deprecationWarnings(props)
    this.onEditorCreated = this.onEditorCreated.bind(this)
    this.onEditorDestroyed = this.onEditorDestroyed.bind(this)
    this.editorActions = (context || {}).editorActions || new EditorActions()
    startMeasure(measurements.EDITOR_MOUNTED)

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
                attributes: {
                  tti,
                  ttiFromInvocation,
                  canceled
                },
                eventType: EVENT_TYPE.OPERATIONAL
              }
            })
          }
        },
        props.performanceTracking.ttiTracking.ttiIdleThreshold,
        props.performanceTracking.ttiTracking.ttiCancelTimeout
      )
    }

    const _extensionProvider = this.prepareExtensionProvider(
      props.extensionProviders
    )

    const _quickInsertProvider = this.prepareQuickInsertProvider(
      _extensionProvider,
      props.quickInsert
    )

    this.state = {
      extensionProvider: _extensionProvider,
      quickInsertProvider: _quickInsertProvider
    }
  }

  componentDidMount() {
    stopMeasure(measurements.EDITOR_MOUNTED, (duration, startTime) => {
      if (this.createAnalyticsEvent) {
        const fireMounted = objectId => {
          fireAnalyticsEvent(this.createAnalyticsEvent)({
            payload: {
              action: ACTION.EDITOR_MOUNTED,
              actionSubject: ACTION_SUBJECT.EDITOR,
              attributes: {
                duration,
                startTime,
                objectId
              },
              eventType: EVENT_TYPE.OPERATIONAL
            }
          })
        }

        Promise.resolve(this.props.contextIdentifierProvider).then(p => {
          fireMounted(p === null || p === void 0 ? void 0 : p.objectId)
        }, fireMounted)
      }
    })
    this.handleProviders(this.props)
  }

  componentDidUpdate(prevProps) {
    const { extensionProviders, quickInsert } = this.props

    if (
      (extensionProviders &&
        extensionProviders !== prevProps.extensionProviders) || // Though this will introduce some performance regression related to quick insert
      // loading but we can remove it soon when Forge will move to new API.
      // quickInsert={Promise.resolve(consumerQuickInsert)} is one of the main reason behind this performance issue.
      (quickInsert && quickInsert !== prevProps.quickInsert)
    ) {
      const extensionProvider = this.prepareExtensionProvider(
        extensionProviders
      )
      const quickInsertProvider = this.prepareQuickInsertProvider(
        extensionProvider,
        quickInsert
      )
      this.setState(
        {
          extensionProvider,
          quickInsertProvider
        },
        () => this.handleProviders(this.props)
      )
      return
    }

    this.handleProviders(this.props)
  }

  componentWillUnmount() {
    this.unregisterEditorFromActions()
    this.providerFactory.destroy()
    clearMeasure(measurements.EDITOR_MOUNTED)
  }

  onEditorCreated(instance) {
    this.registerEditorForActions(
      instance.view,
      instance.eventDispatcher,
      instance.transformer
    )

    if (this.props.onEditorReady) {
      this.props.onEditorReady(this.editorActions)
    }
  }

  deprecationWarnings(props) {
    const nextVersion = nextMajorVersion()
    const deprecatedProperties = {
      allowTasksAndDecisions: {
        message:
          'To allow tasks and decisions use taskDecisionProvider – <Editor taskDecisionProvider={{ provider }} />',
        type: 'removed'
      },
      allowConfluenceInlineComment: {
        message:
          'To integrate inline comments use experimental annotationProvider – <Editor annotationProviders={{ provider }} />',
        type: 'removed'
      },
      transactionTracking: {
        message:
          'Deprecated. To enable transaction tracking use performanceTracking prop instead: performanceTracking={{ transactionTracking: { enabled: true } }}',
        type: 'removed'
      }
    }
    Object.keys(deprecatedProperties).forEach(property => {
      if (props.hasOwnProperty(property)) {
        const meta = deprecatedProperties[property]
        const type = meta.type || 'enabled by default' // eslint-disable-next-line no-console

        console.warn(
          `${property} property is deprecated. ${meta.message ||
            ''} [Will be ${type} in editor-core@${nextVersion}]`
        )
      }
    })

    if (
      props.hasOwnProperty('allowTables') &&
      typeof props.allowTables !== 'boolean' &&
      (!props.allowTables || !props.allowTables.advanced)
    ) {
      // eslint-disable-next-line no-console
      console.warn(
        `Advanced table options are deprecated (except isHeaderRowRequired) to continue using advanced table features use - <Editor allowTables={{ advanced: true }} /> [Will be changed in editor-core@${nextVersion}]`
      )
    }
  }

  onEditorDestroyed(_instance) {
    this.unregisterEditorFromActions()

    if (this.props.onDestroy) {
      this.props.onDestroy()
    }
  }

  registerEditorForActions(editorView, eventDispatcher, contentTransformer) {
    this.editorActions._privateRegisterEditor(
      editorView,
      eventDispatcher,
      contentTransformer
    )
  }

  unregisterEditorFromActions() {
    if (this.editorActions) {
      this.editorActions._privateUnregisterEditor()
    }
  }

  handleProviders(props) {
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
      UNSAFE_cards
    } = props
    const { extensionProvider, quickInsertProvider } = this.state
    this.providerFactory.setProvider('emojiProvider', emojiProvider)
    this.providerFactory.setProvider('mentionProvider', mentionProvider)
    this.providerFactory.setProvider(
      'taskDecisionProvider',
      taskDecisionProvider
    )
    this.providerFactory.setProvider(
      'contextIdentifierProvider',
      contextIdentifierProvider
    )
    this.providerFactory.setProvider('mediaProvider', media && media.provider)
    this.providerFactory.setProvider(
      'imageUploadProvider',
      legacyImageUploadProvider
    )
    this.providerFactory.setProvider(
      'collabEditProvider',
      collabEdit && collabEdit.provider
        ? collabEdit.provider
        : collabEditProvider
    )
    this.providerFactory.setProvider('activityProvider', activityProvider)
    this.providerFactory.setProvider('searchProvider', searchProvider)
    this.providerFactory.setProvider('presenceProvider', presenceProvider)
    this.providerFactory.setProvider('macroProvider', macroProvider)

    if (UNSAFE_cards && UNSAFE_cards.provider) {
      this.providerFactory.setProvider('cardProvider', UNSAFE_cards.provider)
    }

    this.providerFactory.setProvider(
      'autoformattingProvider',
      autoformattingProvider
    )

    if (extensionProvider) {
      this.providerFactory.setProvider(
        'extensionProvider',
        Promise.resolve(extensionProvider)
      )
    }

    if (quickInsertProvider) {
      this.providerFactory.setProvider(
        'quickInsertProvider',
        quickInsertProvider
      )
    }
  }

  getBaseFontSize() {
    return !this.props.allowDynamicTextSizing &&
      !['comment', 'chromeless', 'mobile'].includes(this.props.appearance)
      ? akEditorFullPageDefaultFontSize
      : undefined
  }

  render() {
    const Component = getUiComponent(this.props.appearance)
    const overriddenEditorProps = {
      ...this.props,
      onSave: this.props.onSave ? this.handleSave : undefined,
      // noop all analytic events, even if a handler is still passed.
      analyticsHandler: undefined
    }
    const editor = /*#__PURE__*/ React.createElement(
      FabricEditorAnalyticsContext,
      {
        data: {
          packageName: name,
          packageVersion: version,
          componentName: 'editorCore',
          appearance: getAnalyticsAppearance(this.props.appearance)
        }
      },
      /*#__PURE__*/ React.createElement(WithCreateAnalyticsEvent, {
        render: createAnalyticsEvent =>
          (this.createAnalyticsEvent = createAnalyticsEvent) &&
          /*#__PURE__*/ React.createElement(
            ErrorBoundary,
            {
              createAnalyticsEvent: createAnalyticsEvent,
              contextIdentifierProvider: this.props.contextIdentifierProvider
            },
            /*#__PURE__*/ React.createElement(
              WidthProviderFullHeight,
              null,
              /*#__PURE__*/ React.createElement(
                EditorContext,
                {
                  editorActions: this.editorActions
                },
                /*#__PURE__*/ React.createElement(
                  ContextAdapter,
                  null,
                  /*#__PURE__*/ React.createElement(PortalProvider, {
                    onAnalyticsEvent: this.handleAnalyticsEvent,
                    useAnalyticsContext: this.props.UNSAFE_useAnalyticsContext,
                    render: portalProviderAPI =>
                      /*#__PURE__*/ React.createElement(
                        React.Fragment,
                        null,
                        /*#__PURE__*/ React.createElement(ReactEditorView, {
                          editorProps: overriddenEditorProps,
                          createAnalyticsEvent: createAnalyticsEvent,
                          portalProviderAPI: portalProviderAPI,
                          providerFactory: this.providerFactory,
                          onEditorCreated: this.onEditorCreated,
                          onEditorDestroyed: this.onEditorDestroyed,
                          allowAnalyticsGASV3: this.props.allowAnalyticsGASV3,
                          disabled: this.props.disabled,
                          render: ({
                            editor,
                            view,
                            eventDispatcher,
                            config,
                            dispatchAnalyticsEvent
                          }) =>
                            /*#__PURE__*/ React.createElement(
                              BaseTheme,
                              {
                                dynamicTextSizing:
                                  this.props.allowDynamicTextSizing &&
                                  this.props.appearance !== 'full-width',
                                baseFontSize: this.getBaseFontSize()
                              },
                              /*#__PURE__*/ React.createElement(Component, {
                                appearance: this.props.appearance,
                                disabled: this.props.disabled,
                                editorActions: this.editorActions,
                                editorDOMElement: editor,
                                editorView: view,
                                providerFactory: this.providerFactory,
                                eventDispatcher: eventDispatcher,
                                dispatchAnalyticsEvent: dispatchAnalyticsEvent,
                                maxHeight: this.props.maxHeight,
                                onSave: this.props.onSave
                                  ? this.handleSave
                                  : undefined,
                                onCancel: this.props.onCancel,
                                popupsMountPoint: this.props.popupsMountPoint,
                                popupsBoundariesElement: this.props
                                  .popupsBoundariesElement,
                                popupsScrollableElement: this.props
                                  .popupsScrollableElement,
                                contentComponents: config.contentComponents,
                                primaryToolbarComponents:
                                  config.primaryToolbarComponents,
                                primaryToolbarIconBefore: this.props
                                  .primaryToolbarIconBefore,
                                secondaryToolbarComponents:
                                  config.secondaryToolbarComponents,
                                insertMenuItems: this.props.insertMenuItems,
                                customContentComponents: this.props
                                  .contentComponents,
                                customPrimaryToolbarComponents: this.props
                                  .primaryToolbarComponents,
                                customSecondaryToolbarComponents: this.props
                                  .secondaryToolbarComponents,
                                contextPanel: this.props.contextPanel,
                                collabEdit: this.props.collabEdit,
                                allowAnnotation: !!this.props
                                  .annotationProviders
                              })
                            )
                        }),
                        /*#__PURE__*/ React.createElement(PortalRenderer, {
                          portalProviderAPI: portalProviderAPI
                        })
                      )
                  })
                )
              )
            )
          )
      })
    )
    return this.context.intl
      ? editor
      : /*#__PURE__*/ React.createElement(
          IntlProvider,
          {
            locale: 'en'
          },
          editor
        )
  }
}

_defineProperty(Editor, 'defaultProps', {
  appearance: 'comment',
  disabled: false,
  extensionHandlers: {},
  allowHelpDialog: true,
  allowNewInsertionBehaviour: true,
  quickInsert: true
})

_defineProperty(Editor, 'contextTypes', {
  editorActions: PropTypes.object,
  intl: intlShape
})
