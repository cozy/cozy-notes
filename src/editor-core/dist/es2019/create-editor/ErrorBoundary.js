import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React from 'react'
import { ACTION, ACTION_SUBJECT, EVENT_TYPE } from '../plugins/analytics'
import { editorAnalyticsChannel } from '../plugins/analytics/consts'
export default class ErrorBoundary extends React.Component {
  constructor(...args) {
    super(...args)

    _defineProperty(this, 'state', {
      error: undefined
    })

    _defineProperty(this, 'fireAnalytics', analyticsErrorPayload => {
      const { createAnalyticsEvent } = this.props
      this.getProductName()
        .then(product => {
          if (createAnalyticsEvent) {
            createAnalyticsEvent({
              action: ACTION.EDITOR_CRASHED,
              actionSubject: ACTION_SUBJECT.EDITOR,
              eventType: EVENT_TYPE.OPERATIONAL,
              attributes: {
                product,
                browserInfo:
                  window && window.navigator && window.navigator.userAgent
                    ? window.navigator.userAgent
                    : 'unknown',
                ...analyticsErrorPayload
              }
            }).fire(editorAnalyticsChannel)
          } else {
            // eslint-disable-next-line no-console
            console.error(
              'Editor Error Boundary: Missing `createAnalyticsEvent` prop.',
              {
                channel: editorAnalyticsChannel,
                product,
                error: analyticsErrorPayload
              }
            )
          }
        })
        .catch(e => {
          // eslint-disable-next-line no-console
          console.error(
            'Failed to resolve product name from contextIdentifierProvider.',
            e
          )
        })
    })

    _defineProperty(this, 'getProductName', async () => {
      const { contextIdentifierProvider } = this.props

      if (contextIdentifierProvider) {
        const context = await contextIdentifierProvider

        if (context.product) {
          return context.product
        }
      }

      return 'atlaskit'
    })
  }

  componentDidCatch(error, errorInfo) {
    // Log the error
    this.fireAnalytics({
      error: error.toString(),
      errorInfo
    }) // Update state to allow a re-render to attempt graceful recovery (in the event that
    // the error was caused by a race condition or is intermittent)

    this.setState(
      {
        error
      },
      () => {
        if (this.props.rethrow) {
          // Now that a re-render has occured, we re-throw to allow product error boundaries
          // to catch and handle the error too.
          //
          // Note that when rethrowing inside a error boundary, the stack trace
          // from a higher error boundary's componentDidCatch.info param will reset
          // to this component, instead of the original component which threw it.
          throw error
        }
      }
    )
  }

  render() {
    return this.props.children
  }
}

_defineProperty(ErrorBoundary, 'defaultProps', {
  rethrow: true
})
