import _extends from '@babel/runtime/helpers/extends'
import SearchIcon from '@atlaskit/icon/glyph/search'
import { N300 } from '@atlaskit/theme/colors'
import React, { useCallback, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import {
  AvatarStyle,
  CapitalizedStyle,
  MentionItemStyle,
  NameSectionStyle,
  RowStyle
} from './styles'
import { messages } from '../../messages'
export const INVITE_ITEM_DESCRIPTION = {
  id: 'invite-teammate'
}

const leftClick = event => {
  return (
    event.button === 0 &&
    !event.altKey &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.shiftKey
  )
}

const InviteItem = ({
  productName,
  onMount,
  onMouseEnter,
  onSelection,
  selected,
  userRole
}) => {
  const onSelected = useCallback(
    event => {
      if (leftClick(event) && onSelection) {
        event.preventDefault()
        onSelection(INVITE_ITEM_DESCRIPTION, event)
      }
    },
    [onSelection]
  )
  const onItemMouseEnter = useCallback(
    event => {
      if (onMouseEnter) {
        onMouseEnter(INVITE_ITEM_DESCRIPTION, event)
      }
    },
    [onMouseEnter]
  )
  useEffect(() => {
    if (onMount) {
      onMount()
    }
  }, [onMount])
  return /*#__PURE__*/ React.createElement(
    MentionItemStyle,
    {
      selected: selected,
      onMouseDown: onSelected,
      onMouseEnter: onItemMouseEnter,
      'data-id': INVITE_ITEM_DESCRIPTION.id
    },
    /*#__PURE__*/ React.createElement(
      RowStyle,
      null,
      /*#__PURE__*/ React.createElement(
        AvatarStyle,
        null,
        /*#__PURE__*/ React.createElement(SearchIcon, {
          label: 'search-icon',
          primaryColor: N300
        })
      ),
      /*#__PURE__*/ React.createElement(
        NameSectionStyle,
        null,
        /*#__PURE__*/ React.createElement(
          FormattedMessage,
          _extends({}, messages.inviteItemTitle, {
            values: {
              userRole: userRole || 'basic',
              productName: /*#__PURE__*/ React.createElement(
                CapitalizedStyle,
                null,
                productName
              )
            }
          })
        )
      )
    )
  )
}

export default InviteItem
