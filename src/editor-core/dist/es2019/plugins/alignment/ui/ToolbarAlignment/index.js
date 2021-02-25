import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import ExpandIcon from '@atlaskit/icon/glyph/chevron-down';
import ToolbarButton from '../../../../ui/ToolbarButton';
import Dropdown from '../../../../ui/Dropdown';
import { ExpandIconWrapper, Separator, TriggerWrapper, Wrapper } from './styles';
import Alignment from '../../../../ui/Alignment';
import { iconMap } from './icon-map';

class AlignmentToolbar extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      isOpen: false
    });

    _defineProperty(this, "changeAlignment", align => {
      this.toggleOpen();
      return this.props.changeAlignment(align);
    });

    _defineProperty(this, "toggleOpen", () => {
      this.handleOpenChange({
        isOpen: !this.state.isOpen
      });
    });

    _defineProperty(this, "handleOpenChange", ({
      isOpen
    }) => {
      this.setState({
        isOpen
      });
    });

    _defineProperty(this, "hide", () => {
      if (this.state.isOpen === true) {
        this.setState({
          isOpen: false
        });
      }
    });
  }

  render() {
    const {
      isOpen
    } = this.state;
    const {
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
      isReducedSpacing,
      pluginState,
      disabled
    } = this.props;
    return /*#__PURE__*/React.createElement(Wrapper, null, /*#__PURE__*/React.createElement(Dropdown, {
      mountTo: popupsMountPoint,
      boundariesElement: popupsBoundariesElement,
      scrollableElement: popupsScrollableElement,
      isOpen: this.state.isOpen,
      handleClickOutside: this.hide,
      handleEscapeKeydown: this.hide,
      fitWidth: 242,
      fitHeight: 80,
      trigger: /*#__PURE__*/React.createElement(ToolbarButton, {
        spacing: isReducedSpacing ? 'none' : 'default',
        disabled: disabled,
        selected: isOpen,
        title: "Text alignment",
        "aria-label": "Text alignment",
        className: "align-btn",
        onClick: this.toggleOpen,
        iconBefore: /*#__PURE__*/React.createElement(TriggerWrapper, null, iconMap[pluginState.align], /*#__PURE__*/React.createElement(ExpandIconWrapper, null, /*#__PURE__*/React.createElement(ExpandIcon, {
          label: 'Alignment'
        })))
      })
    }, /*#__PURE__*/React.createElement(Alignment, {
      onClick: align => this.changeAlignment(align),
      selectedAlignment: pluginState.align
    })), /*#__PURE__*/React.createElement(Separator, null));
  }

}

_defineProperty(AlignmentToolbar, "displayName", 'AlignmentToolbar');

export default AlignmentToolbar;