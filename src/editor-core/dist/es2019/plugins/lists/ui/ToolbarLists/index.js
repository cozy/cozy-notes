import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import { PureComponent } from 'react';
import { injectIntl } from 'react-intl';
import BulletListIcon from '@atlaskit/icon/glyph/editor/bullet-list';
import NumberListIcon from '@atlaskit/icon/glyph/editor/number-list';
import ExpandIcon from '@atlaskit/icon/glyph/chevron-down';
import { toggleBulletList as toggleBulletListKeymap, toggleOrderedList as toggleOrderedListKeymap, tooltip, ToolTipContent } from '../../../../keymaps';
import ToolbarButton from '../../../../ui/ToolbarButton';
import DropdownMenu from '../../../../ui/DropdownMenu';
import { ButtonGroup, Separator, Wrapper, ExpandIconWrapper, Shortcut } from '../../../../ui/styles';
import { toggleBulletList, toggleOrderedList } from '../../commands';
import { messages } from '../../messages';
import { INPUT_METHOD } from '../../../analytics';

class ToolbarLists extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      isDropdownOpen: false
    });

    _defineProperty(this, "onOpenChange", attrs => {
      this.setState({
        isDropdownOpen: attrs.isDropdownOpen
      });
    });

    _defineProperty(this, "handleTriggerClick", () => {
      this.onOpenChange({
        isDropdownOpen: !this.state.isDropdownOpen
      });
    });

    _defineProperty(this, "createItems", () => {
      const {
        bulletListDisabled,
        orderedListDisabled,
        bulletListActive,
        orderedListActive,
        intl: {
          formatMessage
        }
      } = this.props;
      const labelUnorderedList = formatMessage(messages.unorderedList);
      const labelOrderedList = formatMessage(messages.orderedList);
      let items = [{
        key: 'unorderedList',
        content: labelUnorderedList,
        value: {
          name: 'bullet_list'
        },
        isDisabled: bulletListDisabled,
        isActive: Boolean(bulletListActive),
        elemAfter: /*#__PURE__*/React.createElement(Shortcut, null, tooltip(toggleBulletListKeymap))
      }, {
        key: 'orderedList',
        content: labelOrderedList,
        value: {
          name: 'ordered_list'
        },
        isDisabled: orderedListDisabled,
        isActive: Boolean(orderedListActive),
        elemAfter: /*#__PURE__*/React.createElement(Shortcut, null, tooltip(toggleOrderedListKeymap))
      }];
      return [{
        items
      }];
    });

    _defineProperty(this, "handleBulletListClick", () => {
      if (!this.props.bulletListDisabled) {
        if (toggleBulletList(this.props.editorView, INPUT_METHOD.TOOLBAR)) {
          return true;
        }
      }

      return false;
    });

    _defineProperty(this, "handleOrderedListClick", () => {
      if (!this.props.orderedListDisabled) {
        if (toggleOrderedList(this.props.editorView, INPUT_METHOD.TOOLBAR)) {
          return true;
        }
      }

      return false;
    });

    _defineProperty(this, "onItemActivated", ({
      item
    }) => {
      this.setState({
        isDropdownOpen: false
      });

      switch (item.value.name) {
        case 'bullet_list':
          this.handleBulletListClick();
          break;

        case 'ordered_list':
          this.handleOrderedListClick();
          break;
      }
    });
  }

  render() {
    const {
      disabled,
      isSmall,
      isReducedSpacing,
      isSeparator,
      bulletListActive,
      bulletListDisabled,
      orderedListActive,
      orderedListDisabled,
      intl: {
        formatMessage
      }
    } = this.props;
    const {
      isDropdownOpen
    } = this.state;

    if (!isSmall) {
      const labelUnorderedList = formatMessage(messages.unorderedList);
      const labelOrderedList = formatMessage(messages.orderedList);
      return /*#__PURE__*/React.createElement(ButtonGroup, {
        width: isReducedSpacing ? 'small' : 'large'
      }, /*#__PURE__*/React.createElement(ToolbarButton, {
        spacing: isReducedSpacing ? 'none' : 'default',
        onClick: this.handleBulletListClick,
        selected: bulletListActive,
        disabled: bulletListDisabled || disabled,
        title: /*#__PURE__*/React.createElement(ToolTipContent, {
          description: labelUnorderedList,
          keymap: toggleBulletListKeymap
        }),
        iconBefore: /*#__PURE__*/React.createElement(BulletListIcon, {
          label: labelUnorderedList
        })
      }), /*#__PURE__*/React.createElement(ToolbarButton, {
        spacing: isReducedSpacing ? 'none' : 'default',
        onClick: this.handleOrderedListClick,
        selected: orderedListActive,
        disabled: orderedListDisabled || disabled,
        title: /*#__PURE__*/React.createElement(ToolTipContent, {
          description: labelOrderedList,
          keymap: toggleOrderedListKeymap
        }),
        iconBefore: /*#__PURE__*/React.createElement(NumberListIcon, {
          label: labelOrderedList
        })
      }), isSeparator && /*#__PURE__*/React.createElement(Separator, null));
    } else {
      const items = this.createItems();
      const {
        popupsMountPoint,
        popupsBoundariesElement,
        popupsScrollableElement
      } = this.props;
      const labelLists = formatMessage(messages.lists);
      return /*#__PURE__*/React.createElement(Wrapper, null, /*#__PURE__*/React.createElement(DropdownMenu, {
        items: items,
        onItemActivated: this.onItemActivated,
        mountTo: popupsMountPoint,
        boundariesElement: popupsBoundariesElement,
        scrollableElement: popupsScrollableElement,
        isOpen: isDropdownOpen,
        onOpenChange: this.onOpenChange,
        fitHeight: 188,
        fitWidth: 175
      }, /*#__PURE__*/React.createElement(ToolbarButton, {
        spacing: isReducedSpacing ? 'none' : 'default',
        selected: bulletListActive || orderedListActive,
        disabled: disabled,
        onClick: this.handleTriggerClick,
        title: labelLists,
        iconBefore: /*#__PURE__*/React.createElement(Wrapper, null, /*#__PURE__*/React.createElement(BulletListIcon, {
          label: labelLists
        }), /*#__PURE__*/React.createElement(ExpandIconWrapper, null, /*#__PURE__*/React.createElement(ExpandIcon, {
          label: labelLists
        })))
      })), isSeparator && /*#__PURE__*/React.createElement(Separator, null));
    }
  }

}

export default injectIntl(ToolbarLists);