import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React from 'react'
import styled from 'styled-components'
import { clickAreaClickHandler } from '../click-area-helper'
const ClickWrapper = styled.div`
  flex-grow: 1;
  height: 100%;
`
ClickWrapper.displayName = 'ClickWrapper'
export default class ClickAreaBlock extends React.Component {
  constructor(...args) {
    super(...args)

    _defineProperty(this, 'handleClick', event => {
      const { editorView: view } = this.props

      if (!view) {
        return
      }

      clickAreaClickHandler(view, event)
    })
  }

  render() {
    return /*#__PURE__*/ React.createElement(
      ClickWrapper,
      {
        onClick: this.handleClick
      },
      this.props.children
    )
  }
}
