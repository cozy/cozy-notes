import React from 'react';
import styled from 'styled-components';
import Button from '@atlaskit/button';
import Emoji from '@atlaskit/icon/glyph/editor/emoji';
import { Popup, WithProviders } from '@atlaskit/editor-common';
import { EmojiPicker } from '@atlaskit/emoji';
import Tooltip from '@atlaskit/tooltip'; // helps adjusts position of popup

const EmojiPickerButtonWrapper = styled.div`
  position: relative;
`;
export const EmojiPickerButton = props => {
  const buttonRef = React.useRef(null);
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const updateEmoji = emoji => {
    setIsPopupOpen(false);
    props.onChange && props.onChange(emoji);
  };

  const renderPicker = providers => {
    if (!providers.emojiProvider) {
      return null;
    }

    return /*#__PURE__*/React.createElement(EmojiPicker, {
      emojiProvider: providers.emojiProvider,
      onSelection: updateEmoji,
      onPickerRef: () => {}
    });
  };

  const renderPopup = () => {
    if (!buttonRef.current || !isPopupOpen) {
      return;
    }

    return /*#__PURE__*/React.createElement(Popup, {
      target: buttonRef.current,
      mountTo: buttonRef.current.parentElement,
      fitHeight: 350,
      fitWidth: 350,
      offset: [0, 10]
    }, /*#__PURE__*/React.createElement(WithProviders, {
      providers: ['emojiProvider'],
      providerFactory: props.providerFactory,
      renderNode: renderPicker
    }));
  };

  const title = props.title || '';
  return /*#__PURE__*/React.createElement(EmojiPickerButtonWrapper, null, /*#__PURE__*/React.createElement(Tooltip, {
    content: title,
    position: "top"
  }, /*#__PURE__*/React.createElement(Button, {
    appearance: 'subtle',
    key: props.idx,
    style: {
      padding: 0,
      margin: 0,
      display: 'flex',
      height: '24px',
      width: '24px'
    },
    onClick: togglePopup,
    ref: buttonRef,
    isSelected: props.isSelected,
    iconBefore: /*#__PURE__*/React.createElement(Emoji, {
      label: "emoji"
    })
  })), renderPopup());
};