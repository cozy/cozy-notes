import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React from 'react'
import { PureComponent } from 'react'
import ToolbarButton from '../../ToolbarButton'

class AlignmentButton extends PureComponent {
  constructor(...args) {
    super(...args)

    _defineProperty(this, 'onClick', e => {
      const { onClick, value } = this.props
      e.preventDefault()
      onClick(value)
    })
  }

  render() {
    const { label, isSelected, content } = this.props
    return /*#__PURE__*/ React.createElement(ToolbarButton, {
      disabled: false,
      selected: isSelected,
      title: label,
      'aria-label': label,
      onClick: this.onClick,
      iconBefore: content
    })
  }
}

export default AlignmentButton
