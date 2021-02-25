import React from 'react';
import { Component } from 'react';
import styled from 'styled-components';
import ButtonGroup from '@atlaskit/button/button-group';
import { themed } from '@atlaskit/theme/components';
import { borderRadius, gridSize } from '@atlaskit/theme/constants';
import { DN70 } from '@atlaskit/theme/colors';
import { compareArrays, shallowEqual } from '../utils';
import Button from './Button';
import Dropdown from './Dropdown';
import Select from './Select';
import Separator from './Separator';
import Input from './Input';
const akGridSize = gridSize();
const ToolbarContainer = styled.div`
  background-color: ${themed({
  light: 'white',
  dark: DN70
})};
  border-radius: ${borderRadius()}px;
  box-shadow: 0 0 1px rgba(9, 30, 66, 0.31),
    0 4px 8px -2px rgba(9, 30, 66, 0.25);
  padding: ${akGridSize / 2}px ${akGridSize}px;
  display: flex;
  line-height: 1;
  box-sizing: border-box;
  ${props => props.hasCompactLeftPadding ? `padding-left: ${akGridSize / 2}px` : ''};
  & > div {
    align-items: center;
  }
`;

function makeSameType(_a, _b) {
  return true;
}

const compareItemWithKeys = (leftItem, rightItem, excludedKeys = []) => Object.keys(leftItem).filter(key => excludedKeys.indexOf(key) === -1).every(key => leftItem[key] instanceof Object ? shallowEqual(leftItem[key], rightItem[key]) : leftItem[key] === rightItem[key]);

export const isSameItem = (leftItem, rightItem) => {
  if (leftItem.type !== rightItem.type) {
    return false;
  }

  switch (leftItem.type) {
    case 'button':
      // Need to typecast `rightItem as typeof leftItem` otherwise we will
      // have to put the `type !==` inside each case.
      return compareItemWithKeys(leftItem, rightItem, ['type', 'onClick', 'onMouseEnter', 'onMouseLeave']);

    case 'input':
      return compareItemWithKeys(leftItem, rightItem, ['type', 'onSubmit', 'onBlur']);

    case 'select':
      if (makeSameType(leftItem, rightItem) && Array.isArray(leftItem.options) && Array.isArray(rightItem.options) && !compareArrays(leftItem.options, rightItem.options, (left, right) => compareItemWithKeys(left, right))) {
        return false;
      }

      return compareItemWithKeys(leftItem, rightItem, ['type', 'onChange', 'options']);

    case 'dropdown':
      if (makeSameType(leftItem, rightItem) && Array.isArray(leftItem.options) && Array.isArray(rightItem.options) && !compareArrays(leftItem.options, rightItem.options, (left, right) => compareItemWithKeys(left, right, ['onClick']))) {
        return false;
      }

      return compareItemWithKeys(leftItem, rightItem, ['type', 'options']);

    case 'custom':
      return false;

    case 'separator':
      return compareItemWithKeys(leftItem, rightItem);
  }

  return true;
};
export const areSameItems = (leftArr, rightArr) => {
  if (leftArr === undefined && rightArr === undefined) {
    return true;
  }

  if (leftArr === undefined || rightArr === undefined) {
    return false;
  }

  if (leftArr.length !== rightArr.length) {
    return false;
  }

  return leftArr.every((item, index) => isSameItem(rightArr[index], item));
};
export default class Toolbar extends Component {
  render() {
    const {
      items,
      dispatchAnalyticsEvent,
      dispatchCommand,
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
      className,
      editorView
    } = this.props;

    if (!items || !items.length) {
      return null;
    } // Select has left padding of 4px to the border, everything else 8px


    const firstElementIsSelect = items[0].type === 'select';
    return /*#__PURE__*/React.createElement(ToolbarContainer, {
      "aria-label": "Floating Toolbar",
      hasCompactLeftPadding: firstElementIsSelect,
      className: className
    }, /*#__PURE__*/React.createElement(ButtonGroup, null, items.filter(item => !item.hidden).map((item, idx) => {
      switch (item.type) {
        case 'button':
          const ButtonIcon = item.icon;
          return /*#__PURE__*/React.createElement(Button, {
            className: item.className,
            key: idx,
            title: item.title,
            href: item.href,
            icon: item.icon ? /*#__PURE__*/React.createElement(ButtonIcon, {
              label: item.title
            }) : undefined,
            appearance: item.appearance,
            target: item.target,
            onClick: () => dispatchCommand(item.onClick),
            onMouseEnter: () => dispatchCommand(item.onMouseEnter),
            onMouseLeave: () => dispatchCommand(item.onMouseLeave),
            selected: item.selected,
            disabled: item.disabled,
            tooltipContent: item.tooltipContent,
            testId: item.testId,
            hideTooltipOnClick: item.hideTooltipOnClick
          }, item.showTitle && item.title);

        case 'input':
          return /*#__PURE__*/React.createElement(Input, {
            key: idx,
            mountPoint: popupsMountPoint,
            boundariesElement: popupsBoundariesElement,
            defaultValue: item.defaultValue,
            placeholder: item.placeholder,
            onSubmit: value => dispatchCommand(item.onSubmit(value)),
            onBlur: value => dispatchCommand(item.onBlur(value))
          });

        case 'custom':
          {
            return item.render(editorView, idx, dispatchAnalyticsEvent);
          }

        case 'dropdown':
          const DropdownIcon = item.icon;
          return /*#__PURE__*/React.createElement(Dropdown, {
            key: idx,
            title: item.title,
            icon: DropdownIcon && /*#__PURE__*/React.createElement(DropdownIcon, {
              label: item.title
            }),
            dispatchCommand: dispatchCommand,
            options: item.options,
            disabled: item.disabled,
            tooltip: item.tooltip,
            hideExpandIcon: item.hideExpandIcon,
            mountPoint: popupsMountPoint,
            boundariesElement: popupsBoundariesElement,
            scrollableElement: popupsScrollableElement
          });

        case 'select':
          return /*#__PURE__*/React.createElement(Select, {
            key: idx,
            dispatchCommand: dispatchCommand,
            options: item.options,
            hideExpandIcon: item.hideExpandIcon,
            mountPoint: popupsMountPoint,
            boundariesElement: popupsBoundariesElement,
            scrollableElement: popupsScrollableElement,
            defaultValue: item.defaultValue,
            placeholder: item.placeholder,
            onChange: selected => dispatchCommand(item.onChange(selected)),
            filterOption: item.filterOption
          });

        case 'separator':
          return /*#__PURE__*/React.createElement(Separator, {
            key: idx
          });
      }
    })));
  }

  shouldComponentUpdate(nextProps) {
    return this.props.node.type !== nextProps.node.type || !areSameItems(this.props.items, nextProps.items);
  }

}