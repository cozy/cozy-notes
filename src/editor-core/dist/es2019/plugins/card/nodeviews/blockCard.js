import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React from 'react'
import { Card as SmartCard } from '@atlaskit/smart-card'
import { UnsupportedBlock, browser } from '@atlaskit/editor-common'
import PropTypes from 'prop-types'
import rafSchedule from 'raf-schd'
import { Card } from './genericCard'
import { ReactNodeView } from '../../../nodeviews/'
import { registerCard } from '../pm-plugins/actions'
import { findOverflowScrollParent } from '@atlaskit/editor-common'
export class BlockCardComponent extends React.PureComponent {
  constructor(...args) {
    super(...args)

    _defineProperty(this, 'onClick', () => {})

    _defineProperty(this, 'onResolve', data => {
      const { getPos, view } = this.props

      if (!getPos || typeof getPos === 'boolean') {
        return
      }

      const { title, url } = data // don't dispatch immediately since we might be in the middle of
      // rendering a nodeview

      rafSchedule(() =>
        view.dispatch(
          registerCard({
            title,
            url,
            pos: getPos()
          })(view.state.tr)
        )
      )()
    })

    _defineProperty(this, 'gapCursorSpan', () => {
      // Don't render in EdgeHTMl version <= 18 (Edge version 44)
      // as it forces the edit popup to render 24px lower than it should
      if (browser.ie && browser.ie_version < 79) {
        return
      } // render an empty span afterwards to get around Webkit bug
      // that puts caret in next editable text element

      return /*#__PURE__*/ React.createElement('span', {
        contentEditable: true
      })
    })
  }

  UNSAFE_componentWillMount() {
    const { view } = this.props
    const scrollContainer = findOverflowScrollParent(view.dom)
    this.scrollContainer = scrollContainer || undefined
  }

  render() {
    const { node, cardContext, platform } = this.props
    const { url, data } = node.attrs
    const cardInner = /*#__PURE__*/ React.createElement(
      React.Fragment,
      null,
      /*#__PURE__*/ React.createElement(SmartCard, {
        key: url,
        url: url,
        data: data,
        container: this.scrollContainer,
        appearance: 'block',
        onClick: this.onClick,
        onResolve: this.onResolve,
        showActions: platform === 'web',
        platform: platform
      }),
      this.gapCursorSpan()
    ) // [WS-2307]: we only render card wrapped into a Provider when the value is ready,
    // otherwise if we got data, we can render the card directly since it doesn't need the Provider

    return /*#__PURE__*/ React.createElement(
      'div',
      null,
      cardContext && cardContext.value
        ? /*#__PURE__*/ React.createElement(
            cardContext.Provider,
            {
              value: cardContext.value
            },
            cardInner
          )
        : data
        ? cardInner
        : null
    )
  }
}

_defineProperty(BlockCardComponent, 'contextTypes', {
  contextAdapter: PropTypes.object
})

const WrappedBlockCard = Card(BlockCardComponent, UnsupportedBlock)
export class BlockCard extends ReactNodeView {
  createDomRef() {
    const domRef = document.createElement('div')

    if (browser.chrome && this.reactComponentProps.platform !== 'mobile') {
      // workaround Chrome bug in https://product-fabric.atlassian.net/browse/ED-5379
      // see also: https://github.com/ProseMirror/prosemirror/issues/884
      domRef.contentEditable = 'true'
      domRef.setAttribute('spellcheck', 'false')
    }

    return domRef
  }

  render() {
    return /*#__PURE__*/ React.createElement(WrappedBlockCard, {
      node: this.node,
      view: this.view,
      getPos: this.getPos,
      platform: this.reactComponentProps.platform
    })
  }
}
