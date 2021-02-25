import _extends from "@babel/runtime/helpers/extends";
import React, { memo, useCallback, useEffect, useMemo } from 'react';
import memoizeOne from 'memoize-one';
import styled, { ThemeProvider, css } from 'styled-components';
import { AutoSizer } from 'react-virtualized/dist/commonjs/AutoSizer';
import { Collection } from 'react-virtualized/dist/commonjs/Collection';
import Item from '@atlaskit/item';
import { B100, N20, N200 } from '@atlaskit/theme/colors';
import Tooltip from '@atlaskit/tooltip';
import { withAnalyticsContext } from '@atlaskit/analytics-next';
import { ACTION, ACTION_SUBJECT, EVENT_TYPE, fireAnalyticsEvent } from '../../../../plugins/analytics';
import IconFallback from '../../../../plugins/quick-insert/assets/fallback';
import { ItemIcon } from '../../../../plugins/type-ahead/ui/TypeAheadItemsList';
import { Shortcut } from '../../../styles';
import { ELEMENT_ITEM_HEIGHT, ELEMENT_LIST_PADDING, GRID_SIZE, SCROLLBAR_THUMB_COLOR, SCROLLBAR_TRACK_COLOR, SCROLLBAR_WIDTH } from '../../constants';
import useContainerWidth from '../../hooks/use-container-width';
import useFocus from '../../hooks/use-focus';
import { Modes } from '../../types';
import cellSizeAndPositionGetter from './cellSizeAndPositionGetter';
import EmptyState from './EmptyState';
import { getColumnCount } from './utils';

function ElementList({
  items,
  mode,
  selectedItemIndex,
  focusedItemIndex,
  setColumnCount,
  createAnalyticsEvent,
  ...props
}) {
  const {
    containerWidth,
    ContainerWidthMonitor
  } = useContainerWidth();
  const fullMode = mode === Modes.full;
  useEffect(() => {
    /**
     * More of an optimization condition.
     * Initially the containerWidths are reported 0 twice.
     **/
    if (fullMode && containerWidth > 0) {
      setColumnCount(getColumnCount(containerWidth));
    }
  }, [fullMode, containerWidth, setColumnCount]);
  const onExternalLinkClick = useCallback(() => {
    fireAnalyticsEvent(createAnalyticsEvent)({
      payload: {
        action: ACTION.VISITED,
        actionSubject: ACTION_SUBJECT.SMART_LINK,
        eventType: EVENT_TYPE.TRACK
      }
    });
  }, [createAnalyticsEvent]);
  const theme = useMemo(() => ({
    '@atlaskit-shared-theme/item': getStyles(mode)
  }), [mode]);
  const cellRenderer = useMemo(() => ({
    index,
    key,
    style
  }) => {
    if (items[index] == null) {
      return;
    }

    return /*#__PURE__*/React.createElement(ElementItemWrapper, {
      style: style,
      key: key,
      className: "element-item-wrapper"
    }, /*#__PURE__*/React.createElement(MemoizedElementItem, _extends({
      inlineMode: !fullMode,
      index: index,
      item: items[index],
      selected: selectedItemIndex === index,
      focus: focusedItemIndex === index
    }, props)));
  }, [items, fullMode, selectedItemIndex, focusedItemIndex, props]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ContainerWidthMonitor, null), !items.length ? /*#__PURE__*/React.createElement(EmptyState, {
    onExternalLinkClick: onExternalLinkClick
  }) : /*#__PURE__*/React.createElement(ElementItemsWrapper, {
    "data-testid": "element-items"
  }, /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: theme
  }, /*#__PURE__*/React.createElement(React.Fragment, null, containerWidth > 0 && /*#__PURE__*/React.createElement(AutoSizer, {
    disableWidth: true
  }, ({
    height
  }) => /*#__PURE__*/React.createElement(Collection, {
    cellCount: items.length,
    cellRenderer: cellRenderer,
    cellSizeAndPositionGetter: cellSizeAndPositionGetter(containerWidth),
    height: height,
    width: containerWidth - ELEMENT_LIST_PADDING * 2 // containerWidth - padding on Left/Right (for focus outline)
    ,
    key: containerWidth // Refresh Collection on WidthObserver value change.
    ,
    scrollToCell: selectedItemIndex
  }))))));
}

const getStyles = memoizeOne(mode => {
  return { ...(mode === Modes.full && {
      '-ms-flex': 'auto',
      position: 'relative',
      boxSizing: 'border-box'
    }),
    height: {
      default: ELEMENT_ITEM_HEIGHT
    },
    padding: {
      default: {
        top: GRID_SIZE * 1.5,
        right: GRID_SIZE * 1.5,
        bottom: GRID_SIZE * 1.5,
        left: GRID_SIZE * 1.5
      }
    },
    borderRadius: GRID_SIZE / 2,
    selected: {
      background: N20
    },
    hover: {
      background: 'rgb(244, 245, 247)'
    },
    beforeItemSpacing: {
      default: GRID_SIZE * 1.5
    }
  };
});
const MemoizedElementItem = /*#__PURE__*/memo(ElementItem);
MemoizedElementItem.displayName = 'MemoizedElementItem';

function ElementItem({
  inlineMode,
  selected,
  item,
  index,
  onInsertItem,
  focus,
  setFocusedItemIndex
}) {
  const ref = useFocus(focus);
  /**
   * Note: props.onSelectItem(item) is not called here as the StatelessElementBrowser's
   * useEffect would trigger it on selectedItemIndex change. (Line 106-110)
   * This implementation was changed for keyboard/click selection to work with `onInsertItem`.
   */

  const onClick = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
    setFocusedItemIndex(index);

    if (inlineMode) {
      onInsertItem(item);
    }
  }, [index, inlineMode, item, onInsertItem, setFocusedItemIndex]);
  const onDoubleClick = useCallback(e => {
    if (inlineMode) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    setFocusedItemIndex(index);
    onInsertItem(item);
  }, [inlineMode, setFocusedItemIndex, index, onInsertItem, item]); // After tabbing we wanna select the item on enter/space key press from item level,
  // preventing the default top level component behavior.

  const onKeyPress = useCallback(e => {
    const SPACE_KEY = 32;
    const ENTER_KEY = 13;

    if (e.which === ENTER_KEY || e.which === SPACE_KEY) {
      e.preventDefault();
      e.stopPropagation();
      setFocusedItemIndex(index);
      onInsertItem(item);
    }
  }, [index, item, onInsertItem, setFocusedItemIndex]);
  const {
    icon,
    title,
    description,
    keyshortcut
  } = item;
  return /*#__PURE__*/React.createElement(Item, {
    onClick: onClick,
    onDoubleClick: onDoubleClick,
    elemBefore: /*#__PURE__*/React.createElement(ElementBefore, {
      icon: icon,
      title: title
    }),
    isSelected: selected,
    "aria-describedby": title,
    innerRef: ref,
    onKeyPress: onKeyPress,
    "data-testid": `element-item-${index}`,
    tabIndex: -1,
    style: inlineMode ? null : itemStyleOverrides
  }, /*#__PURE__*/React.createElement(ItemContent, {
    title: title,
    description: description,
    keyshortcut: keyshortcut
  }));
}
/**
 * Some properties (specified in 'BaseItem' packages/design-system/item/src/styled/Item.js) cannot be changed with
 * ThemeProvider as they are of higher specificity.
 *
 * Inline mode should use the existing Align-items:center value.
 */


const itemStyleOverrides = {
  alignItems: 'flex-start'
};
const ElementBefore = /*#__PURE__*/memo(({
  icon,
  title
}) => /*#__PURE__*/React.createElement(StyledItemIcon, null, icon ? icon() : /*#__PURE__*/React.createElement(IconFallback, {
  label: title
})));
const ItemContent = /*#__PURE__*/memo(({
  title,
  description,
  keyshortcut
}) => /*#__PURE__*/React.createElement(Tooltip, {
  content: description
}, /*#__PURE__*/React.createElement(ItemBody, {
  className: "item-body"
}, /*#__PURE__*/React.createElement(ItemText, null, /*#__PURE__*/React.createElement(ItemTitleWrapper, null, /*#__PURE__*/React.createElement(ItemTitle, null, title), /*#__PURE__*/React.createElement(ItemAfter, null, keyshortcut && /*#__PURE__*/React.createElement(Shortcut, null, keyshortcut))), description && /*#__PURE__*/React.createElement(ItemDescription, null, description)))));
const scrollbarStyle = css`
  ::-webkit-scrollbar {
    width: ${SCROLLBAR_WIDTH}px;
  }
  ::-webkit-scrollbar-track-piece {
    background: ${SCROLLBAR_TRACK_COLOR};
  }
  ::-webkit-scrollbar-thumb {
    background: ${SCROLLBAR_THUMB_COLOR};
  }

  /** Firefox **/
  scrollbar-color: ${SCROLLBAR_THUMB_COLOR} ${SCROLLBAR_TRACK_COLOR};

  -ms-overflow-style: -ms-autohiding-scrollbar;
`;
const ElementItemsWrapper = styled.div`
  flex: 1;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: hidden;
  padding: ${ELEMENT_LIST_PADDING}px; // For Focus outline

  .ReactVirtualized__Collection {
    ${scrollbarStyle};
    border-radius: 3px; // Standard border-radius across other components like Search or Item.
    outline: none;

    :focus {
      box-shadow: 0 0 0 ${ELEMENT_LIST_PADDING}px ${B100};
    }
  }
  .ReactVirtualized__Collection__innerScrollContainer {
    div[class='element-item-wrapper']:last-child {
      padding-bottom: 4px;
    }
  }
`;
const ElementItemWrapper = styled.div`
  /**
     * Since we are using "Item" component's content itself for description,
     * the height of description overflows the parent container padding/margin.
     * manually setting it to take 100% of parent.
     */
  span {
    span:nth-child(2) {
      max-height: 100%;
    }
  }
`;
const ItemBody = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  line-height: 1.4;
  width: 100%;

  margin-top: -2px; // Fixes the Item Icon and text's alignment issue
`;
/*
 * -webkit-line-clamp is also supported by firefox 🎉
 * https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/68#CSS
 */

const multilineStyle = css`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const ItemDescription = styled.p`
  ${multilineStyle};

  overflow: hidden;
  font-size: 11.67px;
  color: ${N200};
  margin-top: 2px;
`;
const ItemText = styled.div`
  width: inherit;
  white-space: initial;
`;
const ItemTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between; // Title and keyboardshortcut are rendered in the same block
`;
const ItemTitle = styled.p`
  width: 100%;
  overflow: hidden;

  white-space: nowrap;
  text-overflow: ellipsis;
`;
const ItemAfter = styled.div`
  flex: 0 0 auto;
`;
const StyledItemIcon = styled(ItemIcon)`
  img {
    height: 40px;
    width: 40px;
    object-fit: cover;
  }
`;
const MemoizedElementListWithAnalytics = /*#__PURE__*/memo(withAnalyticsContext({
  component: 'ElementList'
})(ElementList));
export default MemoizedElementListWithAnalytics;