import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React from 'react'
import styled from 'styled-components'
import { createParagraphAtEnd } from '../../../commands'
const ClickArea = styled.div`
  flex-grow: 1;
`
ClickArea.displayName = 'ClickArea'
export default class ClickAreaInline extends React.Component {
  constructor(...args) {
    super(...args)

    _defineProperty(this, 'handleClick', event => {
      const { editorView } = this.props

      if (editorView) {
        if (createParagraphAtEnd()(editorView.state, editorView.dispatch)) {
          editorView.focus()
          event.stopPropagation()
        }
      }
    })
  }

  render() {
    return /*#__PURE__*/ React.createElement(ClickArea, {
      onClick: this.handleClick
    })
  }
}
