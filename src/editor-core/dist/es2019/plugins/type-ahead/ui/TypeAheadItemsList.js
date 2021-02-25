import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Item, { ItemGroup, itemThemeNamespace } from '@atlaskit/item';
import { themed } from '@atlaskit/theme/components';
import { borderRadius } from '@atlaskit/theme/constants';
import * as colors from '@atlaskit/theme/colors';
import { Shortcut } from '../../../ui/styles';
import IconFallback from '../../quick-insert/assets/fallback';
const hidden = {
  overflow: 'hidden'
};
const itemTheme = {
  [itemThemeNamespace]: {
    padding: {
      default: {
        bottom: 12,
        left: 12,
        right: 12,
        top: 12
      }
    },
    beforeItemSpacing: {
      default: () => 12
    },
    borderRadius: () => 0,
    hover: {
      // background: colors.transparent, transparent is not a thing
      text: colors.text,
      secondaryText: colors.N200
    },
    selected: {
      background: themed({
        light: colors.N20,
        dark: colors.DN70
      }),
      text: themed({
        light: colors.N800,
        dark: colors.DN600
      }),
      secondaryText: themed({
        light: colors.N200,
        dark: colors.DN300
      })
    }
  }
};
export const ItemIcon = styled.div`
  width: 40px;
  height: 40px;
  overflow: hidden;
  border: 1px solid rgba(223, 225, 229, 0.5); /* N60 at 50% */
  border-radius: ${borderRadius()}px;
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;

  div {
    width: 40px;
    height: 40px;
  }
`;
const ItemBody = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  line-height: 1.4;
`;
const ItemText = styled.div`
  white-space: initial;
  .item-description {
    font-size: 11.67px;
    color: ${colors.N200};
    margin-top: 4px;
  }
`;
const ItemAfter = styled.div`
  flex: 0 0 auto;
`;

const fallbackIcon = label => {
  return /*#__PURE__*/React.createElement(IconFallback, {
    label: label
  });
};

export function scrollIntoViewIfNeeded(element) {
  const {
    offsetTop,
    offsetHeight,
    offsetParent
  } = element;
  const {
    offsetHeight: offsetParentHeight,
    scrollTop
  } = offsetParent;
  const direction = offsetTop + offsetHeight > offsetParentHeight + scrollTop ? 1 : scrollTop > offsetTop ? -1 : 0;

  if (direction !== 0 && offsetParent) {
    offsetParent.scrollTop = direction === 1 ? offsetTop + offsetHeight - offsetParentHeight : offsetTop;
  }
}
export function TypeAheadItemsList({
  items,
  currentIndex,
  insertByIndex,
  setCurrentIndex
}) {
  if (!Array.isArray(items)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: itemTheme
  }, /*#__PURE__*/React.createElement(ItemGroup, null, items.map((item, index) => /*#__PURE__*/React.createElement(TypeAheadItemComponent, {
    key: item.key || item.title,
    item: item,
    index: index,
    currentIndex: currentIndex,
    insertByIndex: insertByIndex,
    setCurrentIndex: setCurrentIndex
  }))));
}
export class TypeAheadItemComponent extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      ref: null
    });

    _defineProperty(this, "insertByIndex", () => {
      this.props.insertByIndex(this.props.index);
    });

    _defineProperty(this, "setCurrentIndex", () => {
      if (!this.isSelected(this.props)) {
        this.props.setCurrentIndex(this.props.index);
      }
    });

    _defineProperty(this, "handleRef", ref => {
      let hasRef = ref => ref && ref.ref;

      this.setState({
        ref: hasRef(ref) ? ref.ref : ref
      });
    });
  }

  shouldComponentUpdate(nextProps) {
    return this.isSelected(this.props) !== this.isSelected(nextProps);
  }

  isSelected(props) {
    return props.index === props.currentIndex;
  }

  componentDidUpdate() {
    const ref = this.state.ref;

    if (this.props.index === this.props.currentIndex && ref) {
      scrollIntoViewIfNeeded(ref);
    }
  }

  render() {
    const {
      item
    } = this.props;
    return item.render ? /*#__PURE__*/React.createElement("div", {
      onMouseMove: this.setCurrentIndex,
      ref: this.handleRef,
      style: hidden
    }, /*#__PURE__*/React.createElement(item.render, {
      onClick: this.insertByIndex,
      onHover: this.setCurrentIndex,
      isSelected: this.isSelected(this.props)
    })) : /*#__PURE__*/React.createElement(Item, {
      onClick: this.insertByIndex,
      onMouseMove: this.setCurrentIndex,
      elemBefore: /*#__PURE__*/React.createElement(ItemIcon, null, item.icon ? item.icon() : fallbackIcon(item.title)),
      isSelected: this.isSelected(this.props),
      "aria-describedby": item.title,
      ref: this.handleRef
    }, /*#__PURE__*/React.createElement(ItemBody, null, /*#__PURE__*/React.createElement(ItemText, null, /*#__PURE__*/React.createElement("div", {
      className: "item-title"
    }, item.title), item.description && /*#__PURE__*/React.createElement("div", {
      className: "item-description"
    }, item.description)), /*#__PURE__*/React.createElement(ItemAfter, null, item.keyshortcut && /*#__PURE__*/React.createElement(Shortcut, null, item.keyshortcut))));
  }

}