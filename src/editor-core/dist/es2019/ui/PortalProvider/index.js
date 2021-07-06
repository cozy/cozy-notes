import _defineProperty from '@babel/runtime/helpers/defineProperty'

var _class, _temp

import React from 'react'
import {
  createPortal,
  unstable_renderSubtreeIntoContainer,
  unmountComponentAtNode
} from 'react-dom'
import PropTypes from 'prop-types'
import { default as AnalyticsReactContext } from '@atlaskit/analytics-next-stable-react-context'
import { EventDispatcher } from '../../event-dispatcher'
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  EVENT_TYPE
} from '../../plugins/analytics/types/enums'
export class PortalProviderAPI extends EventDispatcher {
  constructor(onAnalyticsEvent, analyticsContext) {
    super()

    _defineProperty(this, 'portals', new Map())

    _defineProperty(this, 'setContext', context => {
      this.context = context
    })

    this.onAnalyticsEvent = onAnalyticsEvent
    this.useAnalyticsContext = analyticsContext
  }

  render(children, container, hasReactContext = false) {
    this.portals.set(container, {
      children,
      hasReactContext
    })
    const wrappedChildren = this.useAnalyticsContext
      ? /*#__PURE__*/ React.createElement(
          AnalyticsContextWrapper,
          null,
          children()
        )
      : children()
    unstable_renderSubtreeIntoContainer(
      this.context,
      wrappedChildren,
      container
    )
  } // TODO: until https://product-fabric.atlassian.net/browse/ED-5013
  // we (unfortunately) need to re-render to pass down any updated context.
  // selectively do this for nodeviews that opt-in via `hasReactContext`

  forceUpdate() {
    this.portals.forEach((portal, container) => {
      if (!portal.hasReactContext && !this.useAnalyticsContext) {
        return
      }

      const wrappedChildren = this.useAnalyticsContext
        ? /*#__PURE__*/ React.createElement(
            AnalyticsContextWrapper,
            null,
            portal.children()
          )
        : portal.children()
      unstable_renderSubtreeIntoContainer(
        this.context,
        wrappedChildren,
        container
      )
    })
  }

  remove(container) {
    this.portals.delete(container) // There is a race condition that can happen caused by Prosemirror vs React,
    // where Prosemirror removes the container from the DOM before React gets
    // around to removing the child from the container
    // This will throw a NotFoundError: The node to be removed is not a child of this node
    // Both Prosemirror and React remove the elements asynchronously, and in edge
    // cases Prosemirror beats React

    try {
      unmountComponentAtNode(container)
    } catch (error) {
      if (this.onAnalyticsEvent) {
        this.onAnalyticsEvent({
          payload: {
            action: ACTION.FAILED_TO_UNMOUNT,
            actionSubject: ACTION_SUBJECT.EDITOR,
            actionSubjectId: ACTION_SUBJECT_ID.REACT_NODE_VIEW,
            attributes: {
              error,
              domNodes: {
                container: container ? container.className : undefined,
                child: container.firstElementChild
                  ? container.firstElementChild.className
                  : undefined
              }
            },
            eventType: EVENT_TYPE.OPERATIONAL
          }
        })
      }
    }
  }
}
export class PortalProvider extends React.Component {
  constructor(props) {
    super(props)
    this.portalProviderAPI = new PortalProviderAPI(
      props.onAnalyticsEvent,
      props.useAnalyticsContext
    )
  }

  render() {
    return this.props.render(this.portalProviderAPI)
  }

  componentDidUpdate() {
    this.portalProviderAPI.forceUpdate()
  }
}

_defineProperty(PortalProvider, 'displayName', 'PortalProvider')

export class PortalRenderer extends React.Component {
  constructor(props) {
    super(props)

    _defineProperty(this, 'handleUpdate', portals =>
      this.setState({
        portals
      })
    )

    props.portalProviderAPI.setContext(this)
    props.portalProviderAPI.on('update', this.handleUpdate)
    this.state = {
      portals: new Map()
    }
  }

  render() {
    const { portals } = this.state
    return /*#__PURE__*/ React.createElement(
      React.Fragment,
      null,
      Array.from(portals.entries()).map(([container, children]) =>
        /*#__PURE__*/ createPortal(children, container)
      )
    )
  }
}
/**
 * Wrapper to re-provide modern analytics context to ReactNodeViews.
 */

const dummyAnalyticsContext = {
  getAtlaskitAnalyticsContext() {},

  getAtlaskitAnalyticsEventHandlers() {}
}
const AnalyticsContextWrapper =
  ((_temp = _class = class AnalyticsContextWrapper extends React.Component {
    render() {
      const { value } = this.context.contextAdapter.analytics || {
        value: dummyAnalyticsContext
      }
      return /*#__PURE__*/ React.createElement(
        AnalyticsReactContext.Provider,
        {
          value: value
        },
        this.props.children
      )
    }
  }),
  _defineProperty(_class, 'contextTypes', {
    contextAdapter: PropTypes.object
  }),
  _temp)
