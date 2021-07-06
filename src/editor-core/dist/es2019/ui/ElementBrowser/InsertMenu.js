import React, { useState, useCallback } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Item, { itemThemeNamespace } from '@atlaskit/item' // AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points

import { borderRadius } from '@atlaskit/theme'
import { themed } from '@atlaskit/theme/components'
import { DN50, N0, N30A, N60A } from '@atlaskit/theme/colors'
import {
  IconCode,
  IconDate,
  IconDecision,
  IconDivider,
  IconExpand,
  IconPanel,
  IconQuote,
  IconStatus
} from '../../plugins/quick-insert/assets'
import withOuterListeners from '../with-outer-listeners'
import WithPluginState from '../WithPluginState'
import { pluginKey } from '../../plugins/quick-insert/plugin-key'
import {
  getFeaturedQuickInsertItems,
  searchQuickInsertItems
} from '../../plugins/quick-insert/search'
import { insertItem } from '../../plugins/quick-insert/commands'
import ElementBrowser from './components/ElementBrowserLoader'
import { ELEMENT_ITEM_HEIGHT } from './constants'

const InsertMenu = ({
  editorView,
  dropdownItems,
  onInsert,
  toggleVisiblity
}) => {
  const [itemCount, setItemCount] = useState(0)
  const transform = useCallback(
    item => ({
      title: item.content,
      description: item.tooltipDescription,
      keyshortcut: item.shortcut,
      icon: () =>
        getSvgIconForItem({
          name: item.value.name,
          content: item.content
        }) || item.elemBefore,
      action: () =>
        onInsert({
          item
        }),
      // "insertInsertMenuItem" expects these 2 properties.
      onClick: item.onClick,
      value: item.value
    }),
    [onInsert]
  )
  const quickInsertDropdownItems = dropdownItems.map(transform)
  const viewMoreItem = quickInsertDropdownItems.pop()
  const onInsertItem = useCallback(
    item => {
      toggleVisiblity()

      if (!editorView.hasFocus()) {
        editorView.focus()
      }

      insertItem(item)(editorView.state, editorView.dispatch)
    },
    [editorView, toggleVisiblity]
  )
  const getItems = useCallback(
    quickInsertState => (query, category) => {
      let result

      if (query) {
        result = searchQuickInsertItems(quickInsertState, {})(query, category)
      } else {
        result = quickInsertDropdownItems.concat(
          getFeaturedQuickInsertItems(quickInsertState, {})()
        )
      }

      setItemCount(result.length)
      return result
    },
    [quickInsertDropdownItems]
  )
  const render = useCallback(
    ({ quickInsertState }) =>
      /*#__PURE__*/ React.createElement(
        ElementBrowserWrapper,
        {
          handleClickOutside: toggleVisiblity,
          handleEscapeKeydown: toggleVisiblity
        },
        /*#__PURE__*/ React.createElement(ElementBrowser, {
          mode: 'inline',
          getItems: getItems(quickInsertState),
          onInsertItem: onInsertItem,
          showSearch: true,
          showCategories: false, // On page resize we want the InlineElementBrowser to show updated tools/overflow items
          key: quickInsertDropdownItems.length
        })
      ),
    [getItems, onInsertItem, quickInsertDropdownItems.length, toggleVisiblity]
  )
  return /*#__PURE__*/ React.createElement(
    InsertMenuWrapper,
    {
      itemCount: itemCount
    },
    /*#__PURE__*/ React.createElement(WithPluginState, {
      plugins: {
        quickInsertState: pluginKey
      },
      render: render
    }),
    itemCount > 0 &&
      viewMoreItem &&
      /*#__PURE__*/ React.createElement(ViewMore, {
        item: viewMoreItem
      })
  )
}

const ViewMore = ({ item }) => {
  const onKeyPress = useCallback(
    e => {
      const SPACE_KEY = 32
      const ENTER_KEY = 13

      if (e.which === ENTER_KEY || e.which === SPACE_KEY) {
        // @ts-ignore We manually transformed "view more" to a quickInsert item
        // action would always toggle the ModalElementBrowser
        item.action()
      }
    },
    [item]
  )
  return /*#__PURE__*/ React.createElement(
    ThemeProvider,
    {
      theme: viewMoreItemTheme
    },
    /*#__PURE__*/ React.createElement(
      Item,
      {
        onClick: item.action,
        elemBefore: /*#__PURE__*/ React.createElement(
          ItemBefore,
          null,
          item.icon()
        ),
        'aria-describedby': item.title,
        'data-testid': 'view-more-elements-item',
        onKeyPress: onKeyPress
      },
      item.title
    )
  )
}

const getSvgIconForItem = ({ name, content }) => {
  const Icon = {
    codeblock: IconCode,
    panel: IconPanel,
    blockquote: IconQuote,
    decision: IconDecision,
    horizontalrule: IconDivider,
    expand: IconExpand,
    date: IconDate,
    status: IconStatus
  }[name]
  return Icon
    ? /*#__PURE__*/ React.createElement(Icon, {
        label: content
      })
    : undefined
}

const getInsertMenuHeight = ({ itemCount }) => {
  // Figure based on visuals to exclude the searchbar, padding/margin, and the ViewMore item.
  const EXTRA_SPACE_EXCLUDING_ELEMENTLIST = 112

  if (itemCount > 0 && itemCount < 6) {
    return itemCount * ELEMENT_ITEM_HEIGHT + EXTRA_SPACE_EXCLUDING_ELEMENTLIST
  }

  return 560 // For showing 6 Elements.
}

const InsertMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  height: ${getInsertMenuHeight}px;
  background-color: ${themed({
    light: N0,
    dark: DN50
  })()};
  border-radius: ${borderRadius()}px;
  box-shadow: 0 0 0 1px ${N30A}, 0 2px 1px ${N30A}, 0 0 20px -6px ${N60A};
`
const ItemBefore = styled.div`
  width: 40px;
  height: 40px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`
const PADDING_LEFT = 12
const HEIGHT = 40
const viewMoreItemTheme = {
  [itemThemeNamespace]: {
    padding: {
      default: {
        left: PADDING_LEFT
      }
    },
    height: HEIGHT
  }
}
const FlexWrapper = styled.div`
  display: flex;
  flex: 1;
  box-sizing: border-box;
  overflow: hidden;
`
const ElementBrowserWrapper = withOuterListeners(FlexWrapper)
export default InsertMenu
