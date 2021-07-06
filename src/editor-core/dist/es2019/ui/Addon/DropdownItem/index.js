import React from 'react'
import { DropdownItem } from './styles'

const DropdownItemWrapper = props =>
  /*#__PURE__*/ React.createElement(
    DropdownItem,
    {
      onClick: () =>
        props.onClick &&
        props.onClick({
          actionOnClick: props.actionOnClick,
          renderOnClick: props.renderOnClick
        })
    },
    /*#__PURE__*/ React.createElement('span', null, props.icon),
    props.children
  )

export default DropdownItemWrapper
