import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React from 'react'
import PropTypes from 'prop-types'
import { startMeasure, stopMeasure } from '@atlaskit/editor-common'
import { createDispatch } from '../../event-dispatcher'
import { ACTION, ACTION_SUBJECT, EVENT_TYPE } from '../../plugins/analytics'
import { analyticsEventKey } from '../../plugins/analytics/consts'
import { analyticsPluginKey } from '../../plugins/analytics/plugin-key'
import { getParticipantsCount } from '../../plugins/collab-edit/get-participants-count'
const DEFAULT_SAMPLING_RATE = 100
const DEFAULT_SLOW_THRESHOLD = 4

/**
 * Wraps component in a high order component that watches state changes of given plugins
 * and passes those states to the wrapped component.
 *
 * Example:
 * <WithPluginState
 *   eventDispatcher={eventDispatcher}
 *   editorView={editorView}
 *   plugins={{
 *     hyperlink: hyperlinkPluginKey
 *   }}
 *   render={renderComponent}
 * />
 *
 * renderComponent: ({ hyperlink }) => React.Component;
 */
export default class WithPluginState extends React.Component {
  constructor(props, context) {
    super(props)

    _defineProperty(this, 'listeners', {})

    _defineProperty(this, 'debounce', null)

    _defineProperty(this, 'notAppliedState', {})

    _defineProperty(this, 'isSubscribed', false)

    _defineProperty(this, 'callsCount', 0)

    _defineProperty(this, 'state', {})

    _defineProperty(
      this,
      'handlePluginStateChange',
      (
        propName,
        pluginName,
        performanceOptions,
        skipEqualityCheck
      ) => pluginState => {
        // skipEqualityCheck is being used for old plugins since they are mutating plugin state instead of creating a new one
        if (this.state[propName] !== pluginState || skipEqualityCheck) {
          this.updateState({
            stateSubset: {
              [propName]: pluginState
            },
            pluginName,
            performanceOptions
          })
        }
      }
    )

    _defineProperty(
      this,
      'updateState',
      ({ stateSubset, pluginName, performanceOptions }) => {
        this.notAppliedState = { ...this.notAppliedState, ...stateSubset }

        if (this.debounce) {
          window.clearTimeout(this.debounce)
        }

        this.debounce = window.setTimeout(() => {
          const measure = `🦉${pluginName}::WithPluginState`
          performanceOptions.trackingEnabled && startMeasure(measure)
          this.setState(this.notAppliedState, () => {
            performanceOptions.trackingEnabled &&
              stopMeasure(measure, duration => {
                // Each WithPluginState component will fire analytics event no more than once every `samplingLimit` times
                if (
                  ++this.callsCount % performanceOptions.samplingRate === 0 &&
                  duration > performanceOptions.slowThreshold
                ) {
                  const editorView = this.getEditorView()
                  this.dispatchAnalyticsEvent({
                    action: ACTION.WITH_PLUGIN_STATE_CALLED,
                    actionSubject: ACTION_SUBJECT.EDITOR,
                    eventType: EVENT_TYPE.OPERATIONAL,
                    attributes: {
                      plugin: pluginName,
                      duration,
                      participants: getParticipantsCount(
                        editorView && editorView.state
                      )
                    }
                  })
                }
              })
          })
          this.debounce = null
          this.notAppliedState = {}
        }, 0)
      }
    )

    _defineProperty(this, 'dispatchAnalyticsEvent', payload => {
      const eventDispatcher = this.getEventDispatcher()

      if (eventDispatcher) {
        const dispatch = createDispatch(eventDispatcher)
        dispatch(analyticsEventKey, {
          payload
        })
      }
    })

    _defineProperty(this, 'onContextUpdate', () => {
      this.subscribe(this.props)
    })

    this.state = this.getPluginsStates(
      props.plugins,
      this.getEditorView(props, context)
    )
  }

  getEditorView(maybeProps, maybeContext) {
    const props = maybeProps || this.props
    const context = maybeContext || this.context
    return (
      props.editorView ||
      (context &&
        context.editorActions &&
        context.editorActions._privateGetEditorView()) ||
      (context &&
        context.editorSharedConfig &&
        context.editorSharedConfig.editorView)
    )
  }

  getEventDispatcher(maybeProps) {
    const props = maybeProps || this.props
    return (
      props.eventDispatcher ||
      (this.context &&
        this.context.editorActions &&
        this.context.editorActions._privateGetEventDispatcher()) ||
      (this.context &&
        this.context.editorSharedConfig &&
        this.context.editorSharedConfig.eventDispatcher)
    )
  }

  getPluginsStates(plugins, editorView) {
    if (!editorView || !plugins) {
      return {}
    }

    return Object.keys(plugins).reduce((acc, propName) => {
      const pluginKey = plugins[propName]

      if (!pluginKey) {
        return acc
      }

      acc[propName] = pluginKey.getState(editorView.state)
      return acc
    }, {})
  }

  subscribe(props) {
    const plugins = props.plugins
    const eventDispatcher = this.getEventDispatcher(props)
    const editorView = this.getEditorView(props)

    if (!eventDispatcher || !editorView || this.isSubscribed) {
      return
    }

    const analyticsPlugin = analyticsPluginKey.getState(editorView.state)
    const uiTracking =
      analyticsPlugin && analyticsPlugin.performanceTracking
        ? analyticsPlugin.performanceTracking.uiTracking || {}
        : {}
    const trackingEnabled = uiTracking.enabled === true
    const samplingRate = uiTracking.samplingRate || DEFAULT_SAMPLING_RATE
    const slowThreshold = uiTracking.slowThreshold || DEFAULT_SLOW_THRESHOLD
    this.isSubscribed = true
    const pluginsStates = this.getPluginsStates(plugins, editorView)
    this.setState(pluginsStates)
    Object.keys(plugins).forEach(propName => {
      const pluginKey = plugins[propName]

      if (!pluginKey) {
        return
      }

      const pluginName = pluginKey.key
      const pluginState = pluginsStates[propName]
      const isPluginWithSubscribe = pluginState && pluginState.subscribe
      const handler = this.handlePluginStateChange(
        propName,
        pluginName,
        {
          samplingRate,
          slowThreshold,
          trackingEnabled
        },
        isPluginWithSubscribe
      )

      if (isPluginWithSubscribe) {
        pluginState.subscribe(handler)
      } else {
        eventDispatcher.on(pluginKey.key, handler)
      }

      this.listeners[pluginKey.key] = {
        handler,
        pluginKey
      }
    })
  }

  unsubscribe() {
    const eventDispatcher = this.getEventDispatcher()
    const editorView = this.getEditorView()

    if (!eventDispatcher || !editorView || !this.isSubscribed) {
      return
    }

    Object.keys(this.listeners).forEach(key => {
      const pluginState = this.listeners[key].pluginKey.getState(
        editorView.state
      )

      if (pluginState && pluginState.unsubscribe) {
        pluginState.unsubscribe(this.listeners[key].handler)
      } else {
        eventDispatcher.off(key, this.listeners[key].handler)
      }
    })
    this.listeners = []
  }

  subscribeToContextUpdates(context) {
    if (context && context.editorActions) {
      context.editorActions._privateSubscribe(this.onContextUpdate)
    }
  }

  unsubscribeFromContextUpdates(context) {
    if (context && context.editorActions) {
      context.editorActions._privateUnsubscribe(this.onContextUpdate)
    }
  }

  componentDidMount() {
    this.subscribe(this.props)
    this.subscribeToContextUpdates(this.context)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.isSubscribed) {
      this.subscribe(nextProps)
    }
  }

  componentWillUnmount() {
    if (this.debounce) {
      window.clearTimeout(this.debounce)
    }

    this.unsubscribeFromContextUpdates(this.context)
    this.unsubscribe()
  }

  render() {
    const { render } = this.props
    return render(this.state)
  }
}

_defineProperty(WithPluginState, 'displayName', 'WithPluginState')

_defineProperty(WithPluginState, 'contextTypes', {
  editorActions: PropTypes.object,
  editorSharedConfig: PropTypes.object
})
