import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import Button from '@atlaskit/button/custom-theme-button';
import { akEditorMenuZIndex } from '@atlaskit/editor-shared-styles';
import ExpandIcon from '@atlaskit/icon/glyph/chevron-down';
import EditorBackgroundColorIcon from '@atlaskit/icon/glyph/editor/background-color';
import ColorPalette from '../../../../ui/ColorPalette';
import { textColorPalette as originalTextColors } from '../../../../ui/ColorPalette/Palettes/textColorPalette';
import Dropdown from '../../../../ui/Dropdown';
import { ExpandIconWrapper, MenuWrapper, Separator, TriggerWrapper } from '../../../../ui/styles';
import ToolbarButton from '../../../../ui/ToolbarButton';
import { ACTION, ACTION_SUBJECT, ACTION_SUBJECT_ID, EVENT_TYPE } from '../../../analytics';
import * as commands from '../../commands/change-color';
import { EditorTextColorIcon } from './icon';
import { disabledRainbow, rainbow, ShowMoreWrapper, TextColorIconBar, TextColorIconWrapper } from './styles';
const EXPERIMENT_NAME = 'editor.toolbarTextColor.moreColors';
const EXPERIMENT_GROUP_CONTROL = 'control';
const EXPERIMENT_GROUP_SUBJECT = 'subject';
export const messages = defineMessages({
  textColor: {
    id: 'fabric.editor.textColor',
    defaultMessage: 'Text color',
    description: ''
  },
  moreColors: {
    id: 'fabric.editor.textColor.moreColors',
    defaultMessage: 'More colors',
    description: 'More colors'
  },
  lessColors: {
    id: 'fabric.editor.textColor.lessColors',
    defaultMessage: 'Fewer colors',
    description: 'Fewer colors'
  }
});

class ToolbarTextColor extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      isOpen: false,
      isShowingMoreColors: false
    });

    _defineProperty(this, "changeColor", color => commands.changeColor(color)(this.props.editorView.state, this.props.editorView.dispatch));

    _defineProperty(this, "changeTextColor", (color, disabled) => {
      if (!disabled) {
        const {
          pluginState: {
            palette,
            paletteExpanded,
            defaultColor
          }
        } = this.props;
        const {
          isShowingMoreColors
        } = this.state; // we store color names in analytics

        const swatch = (paletteExpanded || palette).find(sw => sw.value === color);
        const isNewColor = color !== defaultColor && !originalTextColors.some(col => col.value === color);
        this.dispatchAnalyticsEvent(this.buildExperimentalAnalyticsSelectColor({
          color: (swatch ? swatch.label : color).toLowerCase(),
          isShowingMoreColors,
          isNewColor
        }));
        this.handleOpenChange({
          isOpen: false,
          logCloseEvent: false
        });
        return this.changeColor(color);
      }

      return false;
    });

    _defineProperty(this, "toggleOpen", () => {
      this.handleOpenChange({
        isOpen: !this.state.isOpen,
        logCloseEvent: true
      });
    });

    _defineProperty(this, "handleOpenChange", ({
      isOpen,
      logCloseEvent
    }) => {
      const {
        pluginState: {
          palette,
          color
        }
      } = this.props;
      const {
        isShowingMoreColors
      } = this.state; // pre-expand if a non-standard colour has been selected

      const isExtendedPaletteSelected = !palette.find(swatch => swatch.value === color);
      this.setState({
        isOpen,
        isShowingMoreColors: isExtendedPaletteSelected || isShowingMoreColors
      });

      if (logCloseEvent) {
        this.dispatchAnalyticsEvent(this.buildExperimentalAnalyticsPalette(isOpen ? ACTION.OPENED : ACTION.CLOSED, {
          isShowingMoreColors: isExtendedPaletteSelected || isShowingMoreColors,
          noSelect: isOpen === false
        }));
      }
    });

    _defineProperty(this, "hide", e => {
      const {
        isOpen,
        isShowingMoreColors
      } = this.state;

      if (e.defaultPrevented) {
        // This should be handled by stopping propogation, but as an additional safety net
        // we ignore handled events for the purpose of hiding the popup.
        return;
      }

      if (isOpen === true) {
        this.dispatchAnalyticsEvent(this.buildExperimentalAnalyticsPalette(ACTION.CLOSED, {
          isShowingMoreColors,
          noSelect: true
        }));
        this.setState({
          isOpen: false
        });
      }
    });

    _defineProperty(this, "handleShowMoreToggle", e => {
      // Prevent the event from bubbling up and triggering the hide handler.
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      this.setState(state => {
        this.dispatchAnalyticsEvent(this.buildExperimentalAnalyticsShowMore(state.isShowingMoreColors ? ACTION.CLOSED : ACTION.OPENED, {
          showMoreButton: !state.isShowingMoreColors,
          showLessButton: state.isShowingMoreColors
        }));
        return {
          isShowingMoreColors: !state.isShowingMoreColors
        };
      });
    });
  }

  render() {
    const {
      isOpen,
      isShowingMoreColors
    } = this.state;
    const {
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
      isReducedSpacing,
      pluginState,
      pluginState: {
        paletteExpanded
      },
      intl: {
        formatMessage
      },
      showMoreColorsToggle,
      disabled
    } = this.props;
    const labelTextColor = formatMessage(messages.textColor);
    const palette = isShowingMoreColors && paletteExpanded ? paletteExpanded : pluginState.palette;
    let fitWidth;

    if (document.body.clientWidth <= 740) {
      // This was originally hard-coded, but moved here to a const
      // My guess is it's based off (width of button * columns) + left/right padding
      // 240 = (32 * 7) + (8 + 8)
      // Not sure where the extra 2px comes from
      fitWidth = 242;
    }

    return /*#__PURE__*/React.createElement(MenuWrapper, null, /*#__PURE__*/React.createElement(Dropdown, {
      mountTo: popupsMountPoint,
      boundariesElement: popupsBoundariesElement,
      scrollableElement: popupsScrollableElement,
      isOpen: isOpen && !pluginState.disabled,
      handleClickOutside: this.hide,
      handleEscapeKeydown: this.hide,
      zIndex: akEditorMenuZIndex,
      fitWidth: fitWidth,
      trigger: /*#__PURE__*/React.createElement(ToolbarButton, {
        spacing: isReducedSpacing ? 'none' : 'default',
        disabled: disabled || pluginState.disabled,
        selected: isOpen,
        "aria-label": labelTextColor,
        title: labelTextColor,
        onClick: this.toggleOpen,
        iconBefore: /*#__PURE__*/React.createElement(TriggerWrapper, null, /*#__PURE__*/React.createElement(TextColorIconWrapper, null, /*#__PURE__*/React.createElement(EditorTextColorIcon, null), /*#__PURE__*/React.createElement(TextColorIconBar, {
          selectedColor: pluginState.color !== pluginState.defaultColor && pluginState.color,
          gradientColors: pluginState.disabled ? disabledRainbow : rainbow
        })), /*#__PURE__*/React.createElement(ExpandIconWrapper, null, /*#__PURE__*/React.createElement(ExpandIcon, {
          label: labelTextColor
        })))
      })
    }, /*#__PURE__*/React.createElement(ColorPalette, {
      palette: palette,
      onClick: color => this.changeTextColor(color, pluginState.disabled),
      selectedColor: pluginState.color
    }), showMoreColorsToggle && /*#__PURE__*/React.createElement(ShowMoreWrapper, null, /*#__PURE__*/React.createElement(Button, {
      appearance: "subtle",
      onClick: this.handleShowMoreToggle,
      iconBefore: /*#__PURE__*/React.createElement(EditorBackgroundColorIcon, {
        label: ""
      })
    }, formatMessage(isShowingMoreColors ? messages.lessColors : messages.moreColors)))), /*#__PURE__*/React.createElement(Separator, null));
  }

  getCommonExperimentalAnalyticsAttributes() {
    const {
      showMoreColorsToggle
    } = this.props;
    return {
      experiment: EXPERIMENT_NAME,
      experimentGroup: showMoreColorsToggle ? EXPERIMENT_GROUP_SUBJECT : EXPERIMENT_GROUP_CONTROL
    };
  }

  buildExperimentalAnalyticsPalette(action, data) {
    return {
      action,
      actionSubject: ACTION_SUBJECT.TOOLBAR,
      actionSubjectId: ACTION_SUBJECT_ID.FORMAT_COLOR,
      eventType: EVENT_TYPE.TRACK,
      attributes: { ...this.getCommonExperimentalAnalyticsAttributes(),
        ...data
      }
    };
  }

  buildExperimentalAnalyticsShowMore(action, data) {
    return {
      action,
      actionSubject: ACTION_SUBJECT.TOOLBAR,
      actionSubjectId: ACTION_SUBJECT_ID.FORMAT_COLOR,
      eventType: EVENT_TYPE.TRACK,
      attributes: { ...this.getCommonExperimentalAnalyticsAttributes(),
        ...data
      }
    };
  }

  buildExperimentalAnalyticsSelectColor(data) {
    return {
      action: ACTION.FORMATTED,
      actionSubject: ACTION_SUBJECT.TEXT,
      actionSubjectId: ACTION_SUBJECT_ID.FORMAT_COLOR,
      eventType: EVENT_TYPE.TRACK,
      attributes: { ...this.getCommonExperimentalAnalyticsAttributes(),
        ...data
      }
    };
  }

  dispatchAnalyticsEvent(payload) {
    const {
      dispatchAnalyticsEvent
    } = this.props;

    if (dispatchAnalyticsEvent) {
      dispatchAnalyticsEvent(payload);
    }
  }

}

export default injectIntl(ToolbarTextColor);