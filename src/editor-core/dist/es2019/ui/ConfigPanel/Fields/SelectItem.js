import React from 'react'
import Avatar from '@atlaskit/avatar'
import { gridSize } from '@atlaskit/theme/constants'
import styled from 'styled-components'
const ItemWrapper = styled.div`
  display: flex;
  align-items: center;

  small {
    margin: 0;
    display: block;
  }
`

const getIconSize = (context, description) => {
  if (context === 'value' || !description) {
    return 'xsmall'
  }

  return 'small'
}

export const formatOptionLabel = (
  { label, icon, description },
  { context }
) => {
  return /*#__PURE__*/ React.createElement(
    ItemWrapper,
    null,
    typeof icon === 'string'
      ? /*#__PURE__*/ React.createElement(Avatar, {
          src: icon,
          size: getIconSize(context, description),
          appearance: 'square'
        })
      : icon,
    /*#__PURE__*/ React.createElement(
      'div',
      {
        style: {
          paddingLeft: icon ? gridSize() : 0
        }
      },
      /*#__PURE__*/ React.createElement(
        'p',
        null,
        label,
        description &&
          context !== 'value' &&
          /*#__PURE__*/ React.createElement('small', null, description)
      )
    )
  )
}
