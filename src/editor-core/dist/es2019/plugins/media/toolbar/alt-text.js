import React from 'react';
import { openMediaAltTextMenu } from '../pm-plugins/alt-text/commands';
import { ToolTipContent, addAltText } from '../../../keymaps';
import { messages } from '../pm-plugins/alt-text/messages';
import AltTextEdit from '../pm-plugins/alt-text/ui/AltTextEdit';
import { CONTAINER_WIDTH_IN_PX } from '../pm-plugins/alt-text/ui/AltTextEdit';
import { getMediaNodeFromSelection } from '../utils/media-common';
import { ClassNames } from '../pm-plugins/alt-text/style';
export const altTextButton = (intl, state) => {
  const mediaNode = getMediaNodeFromSelection(state);
  const message = mediaNode && mediaNode.attrs.alt ? messages.editAltText : messages.altText;
  const title = intl.formatMessage(message);
  return {
    title,
    type: 'button',
    onClick: openMediaAltTextMenu,
    showTitle: true,
    testId: 'alt-text-edit-button',
    tooltipContent: /*#__PURE__*/React.createElement(ToolTipContent, {
      description: title,
      keymap: addAltText
    })
  };
};
export const altTextEditComponent = options => {
  return {
    type: 'custom',
    render: (view, idx) => {
      if (!view) {
        return null;
      }

      const mediaNode = getMediaNodeFromSelection(view.state);

      if (!mediaNode) {
        return null;
      }

      return /*#__PURE__*/React.createElement(AltTextEdit, {
        view: view,
        key: idx,
        value: mediaNode.attrs.alt,
        altTextValidator: options && options.altTextValidator
      });
    }
  };
};
export const getAltTextToolbar = (toolbarBaseConfig, options) => {
  return { ...toolbarBaseConfig,
    width: CONTAINER_WIDTH_IN_PX,
    className: ClassNames.FLOATING_TOOLBAR_COMPONENT,
    items: [altTextEditComponent(options)]
  };
};