import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import DropList from '@atlaskit/droplist';
import Item, { ItemGroup } from '@atlaskit/item';
import Tooltip from '@atlaskit/tooltip';
import { Popup } from '@atlaskit/editor-common';
import { akEditorFloatingPanelZIndex } from '@atlaskit/editor-shared-styles';
import withOuterListeners from '../with-outer-listeners';
const Wrapper = styled.div`
  /* tooltip in ToolbarButton is display:block */
  & > div > div {
    display: flex;
  }
`;
const DropListWithOutsideListeners = withOuterListeners(DropList);
/**
 * Hack for item to imitate old dropdown-menu selected styles
 */

const ItemWrapper = styled.div`
  ${props => props.isSelected ? '&& > span, && > span:hover { background: #6c798f; color: #fff; }' : ''};
`;
const ItemContentWrapper = styled.span`
  ${props => props.hasElemBefore ? 'margin-left: 8px;' : ''};
`;
/**
 * Wrapper around @atlaskit/droplist which uses Popup and Portal to render
 * dropdown-menu outside of "overflow: hidden" containers when needed.
 *
 * Also it controls popper's placement.
 */

export default class DropdownMenuWrapper extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      popupPlacement: ['bottom', 'left']
    });

    _defineProperty(this, "handleRef", target => {
      this.setState({
        target: target || undefined
      });
    });

    _defineProperty(this, "updatePopupPlacement", placement => {
      this.setState({
        popupPlacement: placement
      });
    });

    _defineProperty(this, "handleClose", () => {
      if (this.props.onOpenChange) {
        this.props.onOpenChange({
          isOpen: false
        });
      }
    });
  }

  renderItem(item) {
    const {
      onItemActivated,
      onMouseEnter,
      onMouseLeave
    } = this.props; // onClick and value.name are the action indicators in the handlers
    // If neither are present, don't wrap in an Item.

    if (!item.onClick && !item.value && !item.value.name) {
      return /*#__PURE__*/React.createElement("span", {
        key: String(item.content)
      }, item.content);
    }

    const dropListItem = /*#__PURE__*/React.createElement(ItemWrapper, {
      key: item.key || item.content,
      isSelected: item.isActive
    }, /*#__PURE__*/React.createElement(Item, {
      elemBefore: item.elemBefore,
      elemAfter: item.elemAfter,
      isDisabled: item.isDisabled,
      onClick: () => onItemActivated && onItemActivated({
        item
      }),
      onMouseEnter: () => onMouseEnter && onMouseEnter({
        item
      }),
      onMouseLeave: () => onMouseLeave && onMouseLeave({
        item
      }),
      className: item.className
    }, /*#__PURE__*/React.createElement(ItemContentWrapper, {
      hasElemBefore: !!item.elemBefore
    }, item.content)));

    if (item.tooltipDescription) {
      return /*#__PURE__*/React.createElement(Tooltip, {
        key: item.key || item.content,
        content: item.tooltipDescription,
        position: item.tooltipPosition
      }, dropListItem);
    }

    return dropListItem;
  }

  renderDropdownMenu() {
    const {
      target,
      popupPlacement
    } = this.state;
    const {
      items,
      mountTo,
      boundariesElement,
      scrollableElement,
      offset,
      fitHeight,
      fitWidth,
      isOpen,
      zIndex
    } = this.props;
    return /*#__PURE__*/React.createElement(Popup, {
      target: isOpen ? target : undefined,
      mountTo: mountTo,
      boundariesElement: boundariesElement,
      scrollableElement: scrollableElement,
      onPlacementChanged: this.updatePopupPlacement,
      fitHeight: fitHeight,
      fitWidth: fitWidth,
      zIndex: zIndex || akEditorFloatingPanelZIndex,
      offset: offset
    }, /*#__PURE__*/React.createElement(DropListWithOutsideListeners, {
      isOpen: true,
      appearance: "tall",
      position: popupPlacement.join(' '),
      shouldFlip: false,
      shouldFitContainer: true,
      isTriggerNotTabbable: true,
      handleClickOutside: this.handleClose,
      handleEscapeKeydown: this.handleClose
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: 0,
        minWidth: fitWidth || 0
      }
    }), items.map((group, index) => /*#__PURE__*/React.createElement(ItemGroup, {
      key: index
    }, group.items.map(item => this.renderItem(item))))));
  }

  render() {
    const {
      children,
      isOpen
    } = this.props;
    return /*#__PURE__*/React.createElement(Wrapper, null, /*#__PURE__*/React.createElement("div", {
      ref: this.handleRef
    }, children), isOpen ? this.renderDropdownMenu() : null);
  }

}