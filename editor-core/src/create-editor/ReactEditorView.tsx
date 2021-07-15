import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React from 'react'
import PropTypes from 'prop-types'
import { EditorState, Selection } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { intlShape } from 'react-intl'
import {
  browser,
  getAnalyticsEventSeverity,
  getResponseEndTime,
  measureRender,
  startMeasure,
  stopMeasure,
  shouldForceTracking
} from '@atlaskit/editor-common'
import { createDispatch, EventDispatcher } from '../event-dispatcher'
import { processRawValue } from '../utils'
import {
  findChangedNodesFromTransaction,
  validateNodes,
  validNode
} from '../utils/nodes'
import createPluginList from './create-plugins-list'
import {
  ACTION,
  ACTION_SUBJECT,
  EVENT_TYPE,
  FULL_WIDTH_MODE,
  getAnalyticsEventsFromTransaction,
  PLATFORMS
} from '../plugins/analytics'
import { fireAnalyticsEvent } from '../plugins/analytics/fire-analytics-event'
import {
  getEnabledFeatureFlagKeys,
  createFeatureFlagsFromProps
} from '../plugins/feature-flags-context/feature-flags-from-props'
import {
  createErrorReporter,
  createPMPlugins,
  processPluginsList
} from './create-editor'
import { getDocStructure } from '../utils/document-logger'
import { isFullPage } from '../utils/is-full-page'
import measurements from '../utils/performance/measure-enum'
import { getNodesCount } from '../utils/document'
import { analyticsEventKey } from '@atlaskit/editor-common'
import { createSchema } from './create-schema'
import { PluginPerformanceObserver } from '../utils/performance/plugin-performance-observer'
import { getParticipantsCount } from '../plugins/collab-edit/get-participants-count'
import { countNodes } from '../utils/count-nodes'
import { shouldTrackTransaction } from '../utils/performance/should-track-transaction'
import {
  PROSEMIRROR_RENDERED_NORMAL_SEVERITY_THRESHOLD,
  PROSEMIRROR_RENDERED_DEGRADED_SEVERITY_THRESHOLD
} from './consts'
import { getContextIdentifier } from '../plugins/base/pm-plugins/context-identifier'

function handleEditorFocus(view) {
  if (view.hasFocus()) {
    return
  }

  return window.setTimeout(() => {
    view.focus()
  }, 0)
}

export default class ReactEditorView extends React.Component {
  // ProseMirror is instantiated prior to the initial React render cycle,
  // so we allow transactions by default, to avoid discarding the initial one.
  // TODO: https://product-fabric.atlassian.net/browse/ED-8985
  get transactionTrackingProp() {
    const { editorProps } = this.props
    const { transactionTracking } = editorProps.performanceTracking
      ? editorProps.performanceTracking
      : editorProps
    return (
      transactionTracking || {
        enabled: false
      }
    )
  }

  get transactionTrackingOptions() {
    const { enabled, ...tracking } = this.transactionTrackingProp
    return enabled ? tracking : {}
  }

  getPluginNames() {
    return this.editorState.plugins.map(p => p.key)
  }

  countNodes() {
    return countNodes(this.editorState)
  }

  constructor(_props, context) {
    super(_props, context)

    _defineProperty(this, 'canDispatchTransactions', true)

    _defineProperty(
      this,
      'pluginPerformanceObserver',
      new PluginPerformanceObserver(report =>
        this.onPluginObservation(report, this.editorState)
      )
        .withPlugins(() => this.getPluginNames())
        .withNodeCounts(() => this.countNodes())
        .withOptions(() => this.transactionTrackingOptions)
    )

    _defineProperty(this, 'onPluginObservation', (report, editorState) => {
      this.dispatchAnalyticsEvent({
        action: ACTION.TRANSACTION_DISPATCHED,
        actionSubject: ACTION_SUBJECT.EDITOR,
        eventType: EVENT_TYPE.OPERATIONAL,
        attributes: {
          report,
          participants: getParticipantsCount(editorState)
        }
      })
    })

    _defineProperty(this, 'formatFullWidthAppearance', appearance => {
      if (appearance === 'full-width') {
        return FULL_WIDTH_MODE.FULL_WIDTH
      }

      return FULL_WIDTH_MODE.FIXED_WIDTH
    })

    _defineProperty(this, 'reconfigureState', props => {
      if (!this.view) {
        return
      } // We cannot currently guarentee when all the portals will have re-rendered during a reconfigure
      // so we blur here to stop ProseMirror from trying to apply selection to detached nodes or
      // nodes that haven't been re-rendered to the document yet.

      if (this.view.dom instanceof HTMLElement && this.view.hasFocus()) {
        this.view.dom.blur()
      }

      this.config = processPluginsList(
        this.getPlugins(
          props.editorProps,
          this.props.editorProps,
          props.createAnalyticsEvent
        )
      )
      const state = this.editorState
      const plugins = createPMPlugins({
        schema: state.schema,
        dispatch: this.dispatch,
        errorReporter: this.errorReporter,
        editorConfig: this.config,
        eventDispatcher: this.eventDispatcher,
        providerFactory: props.providerFactory,
        portalProviderAPI: props.portalProviderAPI,
        reactContext: () => this.context,
        dispatchAnalyticsEvent: this.dispatchAnalyticsEvent,
        performanceTracking: props.editorProps.performanceTracking || {
          transactionTracking: this.transactionTrackingProp
        }
      })
      const newState = state.reconfigure({
        plugins
      }) // need to update the state first so when the view builds the nodeviews it is
      // using the latest plugins

      this.view.updateState(newState)
      return this.view.update({ ...this.view.props, state: newState })
    })

    _defineProperty(this, 'createEditorState', options => {
      if (this.view) {
        /**
         * There's presently a number of issues with changing the schema of a
         * editor inflight. A significant issue is that we lose the ability
         * to keep track of a user's history as the internal plugin state
         * keeps a list of Steps to undo/redo (which are tied to the schema).
         * Without a good way to do work around this, we prevent this for now.
         */
        // eslint-disable-next-line no-console
        console.warn(
          'The editor does not support changing the schema dynamically.'
        )
        return this.editorState
      }

      this.config = processPluginsList(
        this.getPlugins(
          options.props.editorProps,
          undefined,
          options.props.createAnalyticsEvent
        )
      )
      console.log('this.config', this.config)
      const schema = createSchema(this.config)
      const {
        contentTransformerProvider,
        defaultValue
      } = options.props.editorProps
      const plugins = createPMPlugins({
        schema,
        dispatch: this.dispatch,
        errorReporter: this.errorReporter,
        editorConfig: this.config,
        eventDispatcher: this.eventDispatcher,
        providerFactory: options.props.providerFactory,
        portalProviderAPI: this.props.portalProviderAPI,
        reactContext: () => options.context,
        dispatchAnalyticsEvent: this.dispatchAnalyticsEvent,
        performanceTracking: this.props.editorProps.performanceTracking || {
          transactionTracking: this.transactionTrackingProp
        }
      })
      console.log('plugins', plugins)
      this.contentTransformer = contentTransformerProvider
        ? contentTransformerProvider(schema)
        : undefined
      let doc

      if (options.replaceDoc) {
        doc = processRawValue(
          schema,
          defaultValue,
          options.props.providerFactory,
          options.props.editorProps.sanitizePrivateContent,
          this.contentTransformer,
          this.dispatchAnalyticsEvent
        )
      }

      let selection

      if (doc) {
        // ED-4759: Don't set selection at end for full-page editor - should be at start
        selection = isFullPage(options.props.editorProps.appearance)
          ? Selection.atStart(doc)
          : Selection.atEnd(doc)
      } // Workaround for ED-3507: When media node is the last element, scrollIntoView throws an error

      const patchedSelection = selection
        ? Selection.findFrom(selection.$head, -1, true) || undefined
        : undefined
      return EditorState.create({
        schema,
        plugins,
        doc,
        selection: patchedSelection
      })
    })

    _defineProperty(
      this,
      'onEditorViewStateUpdated',
      ({ transaction, oldEditorState, newEditorState }) => {
        const { enabled: trackinEnabled } = this.transactionTrackingProp
        this.config.onEditorViewStateUpdatedCallbacks.forEach(entry => {
          trackinEnabled &&
            startMeasure(`🦉 ${entry.pluginName}::onEditorViewStateUpdated`)
          entry.callback({
            transaction,
            oldEditorState,
            newEditorState
          })
          trackinEnabled &&
            stopMeasure(`🦉 ${entry.pluginName}::onEditorViewStateUpdated`)
        })
      }
    )

    _defineProperty(this, 'dispatchTransaction', transaction => {
      if (!this.view) {
        return
      }

      const shouldTrack = shouldTrackTransaction(this.transactionTrackingProp)
      shouldTrack && startMeasure(`🦉 ReactEditorView::dispatchTransaction`)
      const nodes = findChangedNodesFromTransaction(transaction)
      const changedNodesValid = validateNodes(nodes)

      if (changedNodesValid) {
        const oldEditorState = this.view.state // go ahead and update the state now we know the transaction is good

        shouldTrack && startMeasure(`🦉 EditorView::state::apply`)
        const editorState = this.view.state.apply(transaction)
        shouldTrack && stopMeasure(`🦉 EditorView::state::apply`)

        if (editorState === oldEditorState) {
          return
        }

        shouldTrack && startMeasure(`🦉 EditorView::updateState`)
        this.view.updateState(editorState)
        shouldTrack && stopMeasure(`🦉 EditorView::updateState`)
        shouldTrack && startMeasure(`🦉 EditorView::onEditorViewStateUpdated`)
        this.onEditorViewStateUpdated({
          transaction,
          oldEditorState,
          newEditorState: editorState
        })
        shouldTrack && stopMeasure(`🦉 EditorView::onEditorViewStateUpdated`)

        if (this.props.editorProps.onChange && transaction.docChanged) {
          const source = transaction.getMeta('isRemote') ? 'remote' : 'local'
          shouldTrack && startMeasure(`🦉 ReactEditorView::onChange`)
          this.props.editorProps.onChange(this.view, {
            source
          })
          shouldTrack && stopMeasure(`🦉 ReactEditorView::onChange`)
        }

        this.editorState = editorState
      } else {
        const invalidNodes = nodes
          .filter(node => !validNode(node))
          .map(node => getDocStructure(node))
        this.dispatchAnalyticsEvent({
          action: ACTION.DISPATCHED_INVALID_TRANSACTION,
          actionSubject: ACTION_SUBJECT.EDITOR,
          eventType: EVENT_TYPE.OPERATIONAL,
          attributes: {
            analyticsEventPayloads: getAnalyticsEventsFromTransaction(
              transaction
            ),
            invalidNodes
          }
        })
      }

      shouldTrack &&
        stopMeasure(`🦉 ReactEditorView::dispatchTransaction`, () => {})
    })

    _defineProperty(this, 'getDirectEditorProps', state => {
      return {
        state: state || this.editorState,
        dispatchTransaction: tr => {
          // Block stale transactions:
          // Prevent runtime exeptions from async transactions that would attempt to
          // update the DOM after React has unmounted the Editor.
          if (this.canDispatchTransactions) {
            this.dispatchTransaction(tr)
          }
        },
        // Disables the contentEditable attribute of the editor if the editor is disabled
        editable: _state => !this.props.editorProps.disabled,
        attributes: {
          'data-gramm': 'false'
        }
      }
    })

    _defineProperty(this, 'createEditorView', node => {
      measureRender(
        measurements.PROSEMIRROR_RENDERED,
        (duration, startTime) => {
          var _this$props$editorPro,
            _this$props$editorPro2,
            _proseMirrorRenderedT,
            _proseMirrorRenderedT2

          const proseMirrorRenderedTracking =
            (_this$props$editorPro = this.props.editorProps) === null ||
            _this$props$editorPro === void 0
              ? void 0
              : (_this$props$editorPro2 =
                  _this$props$editorPro.performanceTracking) === null ||
                _this$props$editorPro2 === void 0
              ? void 0
              : _this$props$editorPro2.proseMirrorRenderedTracking
          const forceSeverityTracking =
            typeof proseMirrorRenderedTracking === 'undefined' &&
            shouldForceTracking()
          this.proseMirrorRenderedSeverity =
            !!forceSeverityTracking ||
            (proseMirrorRenderedTracking === null ||
            proseMirrorRenderedTracking === void 0
              ? void 0
              : proseMirrorRenderedTracking.trackSeverity)
              ? getAnalyticsEventSeverity(
                  duration,
                  (_proseMirrorRenderedT =
                    proseMirrorRenderedTracking === null ||
                    proseMirrorRenderedTracking === void 0
                      ? void 0
                      : proseMirrorRenderedTracking.severityNormalThreshold) !==
                    null && _proseMirrorRenderedT !== void 0
                    ? _proseMirrorRenderedT
                    : PROSEMIRROR_RENDERED_NORMAL_SEVERITY_THRESHOLD,
                  (_proseMirrorRenderedT2 =
                    proseMirrorRenderedTracking === null ||
                    proseMirrorRenderedTracking === void 0
                      ? void 0
                      : proseMirrorRenderedTracking.severityDegradedThreshold) !==
                    null && _proseMirrorRenderedT2 !== void 0
                    ? _proseMirrorRenderedT2
                    : PROSEMIRROR_RENDERED_DEGRADED_SEVERITY_THRESHOLD
                )
              : undefined

          if (this.view) {
            var _getContextIdentifier

            this.dispatchAnalyticsEvent({
              action: ACTION.PROSEMIRROR_RENDERED,
              actionSubject: ACTION_SUBJECT.EDITOR,
              attributes: {
                duration,
                startTime,
                nodes: getNodesCount(this.view.state.doc),
                ttfb: getResponseEndTime(),
                severity: this.proseMirrorRenderedSeverity,
                objectId:
                  (_getContextIdentifier = getContextIdentifier(
                    this.editorState
                  )) === null || _getContextIdentifier === void 0
                    ? void 0
                    : _getContextIdentifier.objectId
              },
              eventType: EVENT_TYPE.OPERATIONAL
            })
          }
        }
      ) // Creates the editor-view from this.editorState. If an editor has been mounted
      // previously, this will contain the previous state of the editor.

      this.view = new EditorView(
        {
          mount: node
        },
        this.getDirectEditorProps()
      )
    })

    _defineProperty(this, 'handleEditorViewRef', node => {
      if (!this.view && node) {
        this.createEditorView(node)
        const view = this.view
        this.props.onEditorCreated({
          view,
          config: this.config,
          eventDispatcher: this.eventDispatcher,
          transformer: this.contentTransformer
        })

        if (
          this.props.editorProps.shouldFocus &&
          view.props.editable &&
          view.props.editable(view.state)
        ) {
          this.focusTimeoutId = handleEditorFocus(view)
        } // Force React to re-render so consumers get a reference to the editor view

        this.forceUpdate()
      } else if (this.view && !node) {
        // When the appearance is changed, React will call handleEditorViewRef with node === null
        // to destroy the old EditorView, before calling this method again with node === div to
        // create the new EditorView
        this.props.onEditorDestroyed({
          view: this.view,
          config: this.config,
          eventDispatcher: this.eventDispatcher,
          transformer: this.contentTransformer
        })
        this.view.destroy() // Destroys the dom node & all node views

        this.view = undefined
      }
    })

    _defineProperty(this, 'dispatchAnalyticsEvent', payload => {
      if (this.props.allowAnalyticsGASV3 && this.eventDispatcher) {
        const dispatch = createDispatch(this.eventDispatcher)
        dispatch(analyticsEventKey, {
          payload
        })
      }
    })

    _defineProperty(
      this,
      'editor',
      /*#__PURE__*/ React.createElement('div', {
        className: getUAPrefix(),
        key: 'ProseMirror',
        ref: this.handleEditorViewRef
      })
    )

    this.eventDispatcher = new EventDispatcher()
    this.dispatch = createDispatch(this.eventDispatcher)
    this.errorReporter = createErrorReporter(
      _props.editorProps.errorReporterHandler
    ) // This needs to be before initialising editorState because
    // we dispatch analytics events in plugin initialisation

    const { createAnalyticsEvent, allowAnalyticsGASV3 } = _props

    if (allowAnalyticsGASV3) {
      this.activateAnalytics(createAnalyticsEvent)
    }

    this.editorState = this.createEditorState({
      props: _props,
      context,
      replaceDoc: true
    })
    const featureFlags = createFeatureFlagsFromProps(this.props.editorProps)
    const featureFlagsEnabled = featureFlags
      ? getEnabledFeatureFlagKeys(featureFlags)
      : []
    this.dispatchAnalyticsEvent({
      action: ACTION.STARTED,
      actionSubject: ACTION_SUBJECT.EDITOR,
      attributes: {
        platform: PLATFORMS.WEB,
        featureFlags: featureFlagsEnabled
      },
      eventType: EVENT_TYPE.UI
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      this.view &&
      this.props.editorProps.disabled !== nextProps.editorProps.disabled
    ) {
      // Disables the contentEditable attribute of the editor if the editor is disabled
      this.view.setProps({
        editable: _state => !nextProps.editorProps.disabled
      })

      if (
        !nextProps.editorProps.disabled &&
        nextProps.editorProps.shouldFocus
      ) {
        this.focusTimeoutId = handleEditorFocus(this.view)
      }
    } // Activate or deactivate analytics if change property

    if (this.props.allowAnalyticsGASV3 !== nextProps.allowAnalyticsGASV3) {
      if (nextProps.allowAnalyticsGASV3) {
        this.activateAnalytics(nextProps.createAnalyticsEvent)
      } else {
        this.deactivateAnalytics()
      }
    } else {
      // Allow analytics is the same, check if we receive a new create analytics prop
      if (
        this.props.allowAnalyticsGASV3 &&
        nextProps.createAnalyticsEvent !== this.props.createAnalyticsEvent
      ) {
        this.deactivateAnalytics() // Deactivate the old one

        this.activateAnalytics(nextProps.createAnalyticsEvent) // Activate the new one
      }
    }

    const { appearance } = this.props.editorProps
    const { appearance: nextAppearance } = nextProps.editorProps

    if (nextAppearance !== appearance) {
      this.reconfigureState(nextProps)

      if (nextAppearance === 'full-width' || appearance === 'full-width') {
        this.dispatchAnalyticsEvent({
          action: ACTION.CHANGED_FULL_WIDTH_MODE,
          actionSubject: ACTION_SUBJECT.EDITOR,
          eventType: EVENT_TYPE.TRACK,
          attributes: {
            previousMode: this.formatFullWidthAppearance(appearance),
            newMode: this.formatFullWidthAppearance(nextAppearance)
          }
        })
      }
    }

    if (!this.transactionTrackingProp.enabled) {
      this.pluginPerformanceObserver.disconnect()
    }
  }

  /**
   * Deactivate analytics event handler, if exist any.
   */
  deactivateAnalytics() {
    if (this.analyticsEventHandler) {
      this.eventDispatcher.off(analyticsEventKey, this.analyticsEventHandler)
    }
  }
  /**
   * Create analytics event handler, if createAnalyticsEvent exist
   * @param createAnalyticsEvent
   */

  activateAnalytics(createAnalyticsEvent) {
    if (createAnalyticsEvent) {
      this.analyticsEventHandler = fireAnalyticsEvent(createAnalyticsEvent)
      this.eventDispatcher.on(analyticsEventKey, this.analyticsEventHandler)
    }
  }

  componentDidMount() {
    // Transaction dispatching is already enabled by default prior to
    // mounting, but we reset it here, just in case the editor view
    // instance is ever recycled (mounted again after unmounting) with
    // the same key.
    // Although storing mounted state is an anti-pattern in React,
    // we do so here so that we can intercept and abort asynchronous
    // ProseMirror transactions when a dismount is imminent.
    this.canDispatchTransactions = true

    if (this.transactionTrackingProp.enabled) {
      this.pluginPerformanceObserver.observe()
    }
  }
  /**
   * Clean up any non-PM resources when the editor is unmounted
   */

  componentWillUnmount() {
    // We can ignore any transactions from this point onwards.
    // This serves to avoid potential runtime exceptions which could arise
    // from an async dispatched transaction after it's unmounted.
    this.canDispatchTransactions = false
    this.eventDispatcher.destroy()
    clearTimeout(this.focusTimeoutId)
    this.pluginPerformanceObserver.disconnect()

    if (this.view) {
      // Destroy the state if the Editor is being unmounted
      const editorState = this.view.state
      editorState.plugins.forEach(plugin => {
        const state = plugin.getState(editorState)

        if (state && state.destroy) {
          state.destroy()
        }
      })
    } // this.view will be destroyed when React unmounts in handleEditorViewRef
  } // Helper to allow tests to inject plugins directly

  getPlugins(editorProps, prevEditorProps, createAnalyticsEvent) {
    return createPluginList(editorProps, prevEditorProps, createAnalyticsEvent)
  }
  render() {
    console.log('this.view', this.view)
    console.log('this.editor', this.editor)
    console.log('this.config', this.config)

    return this.props.render
      ? this.props.render({
          editor: this.editor,
          view: this.view,
          config: this.config,
          eventDispatcher: this.eventDispatcher,
          transformer: this.contentTransformer,
          dispatchAnalyticsEvent: this.dispatchAnalyticsEvent
        })
      : this.editor
  }
}

_defineProperty(ReactEditorView, 'contextTypes', {
  getAtlaskitAnalyticsEventHandlers: PropTypes.func,
  intl: intlShape
})

function getUAPrefix() {
  if (browser.chrome) {
    return 'ua-chrome'
  } else if (browser.ie) {
    return 'ua-ie'
  } else if (browser.gecko) {
    return 'ua-firefox'
  }

  return ''
}
