import React from 'react';
import AttachmentIcon from '@atlaskit/icon/glyph/editor/attachment';
import ToolbarButton from '../../../../ui/ToolbarButton';
import WithPluginState from '../../../../ui/WithPluginState';

const onClickMediaButton = pluginState => () => {
  pluginState.showMediaPicker();
  return true;
};

const ToolbarMedia = ({
  editorView,
  eventDispatcher,
  pluginKey,
  isDisabled,
  isReducedSpacing
}) => /*#__PURE__*/React.createElement(WithPluginState, {
  editorView: editorView,
  eventDispatcher: eventDispatcher,
  plugins: {
    mediaPlugin: pluginKey
  },
  render: ({
    mediaPlugin
  }) => {
    if (!mediaPlugin.allowsUploads) {
      return null;
    }

    return /*#__PURE__*/React.createElement(ToolbarButton, {
      onClick: onClickMediaButton(mediaPlugin),
      disabled: isDisabled,
      title: "Files & images",
      spacing: isReducedSpacing ? 'none' : 'default',
      iconBefore: /*#__PURE__*/React.createElement(AttachmentIcon, {
        label: "Files & images"
      })
    });
  }
});

export default ToolbarMedia;