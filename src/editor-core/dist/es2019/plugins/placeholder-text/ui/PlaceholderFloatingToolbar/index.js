import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import PanelTextInput from '../../../../ui/PanelTextInput';
import FloatingToolbar, { handlePositionCalculatedWith, getOffsetParent, getNearestNonTextNode } from '../../../../ui/FloatingToolbar';
export const messages = defineMessages({
  placeholderTextPlaceholder: {
    id: 'fabric.editor.placeholderTextPlaceholder',
    defaultMessage: 'Add placeholder text',
    description: ''
  }
});

class PlaceholderFloatingToolbar extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleSubmit", value => {
      if (value) {
        this.props.insertPlaceholder(value);
        this.props.setFocusInEditor();
      } else {
        this.props.hidePlaceholderFloatingToolbar();
      }
    });

    _defineProperty(this, "handleBlur", () => {
      this.props.hidePlaceholderFloatingToolbar();
    });
  }

  render() {
    const {
      getNodeFromPos,
      showInsertPanelAt,
      editorViewDOM,
      popupsMountPoint,
      getFixedCoordinatesFromPos,
      popupsBoundariesElement,
      intl: {
        formatMessage
      }
    } = this.props;
    const target = getNodeFromPos(showInsertPanelAt);
    const offsetParent = getOffsetParent(editorViewDOM, popupsMountPoint);

    const getFixedCoordinates = () => getFixedCoordinatesFromPos(showInsertPanelAt);

    const handlePositionCalculated = handlePositionCalculatedWith(offsetParent, target, getFixedCoordinates);
    return /*#__PURE__*/React.createElement(FloatingToolbar, {
      target: getNearestNonTextNode(target),
      onPositionCalculated: handlePositionCalculated,
      popupsMountPoint: popupsMountPoint,
      popupsBoundariesElement: popupsBoundariesElement,
      fitHeight: 32,
      offset: [0, 12]
    }, /*#__PURE__*/React.createElement(PanelTextInput, {
      placeholder: formatMessage(messages.placeholderTextPlaceholder),
      onSubmit: this.handleSubmit,
      onBlur: this.handleBlur,
      autoFocus: true,
      width: 300
    }));
  }

}

export default injectIntl(PlaceholderFloatingToolbar);