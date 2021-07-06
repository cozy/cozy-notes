import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import LinkIcon from '@atlaskit/icon/glyph/editor/link'
import OpenIcon from '@atlaskit/icon/glyph/shortcut'
import { isSafeUrl } from '@atlaskit/adf-schema'
import { checkMediaType } from '../utils/check-media-type'
import ToolbarButton from '../../floating-toolbar/ui/Button'
import Separator from '../../floating-toolbar/ui/Separator'
import { linkToolbarMessages, linkMessages } from '../../../messages'
import { ToolTipContent, addLink } from '../../../keymaps'
import { stateKey } from '../pm-plugins/plugin-key'
import { currentMediaNode } from '../utils/current-media-node'
// need this wrapper, need to have 4px between items.
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 4px;
`
export const LinkToolbarAppearance = ({
  editorState,
  mediaLinkingState,
  intl,
  showSeparatorLeft,
  onAddLink,
  onEditLink,
  onOpenLink
}) => {
  const [showLinkingControls, setShowLinkingControls] = useState(false)
  useEffect(() => {
    var _stateKey$getState

    setShowLinkingControls(false)
    const mediaNode = currentMediaNode(editorState)

    if (!mediaNode) {
      return
    }

    const mediaClientConfig =
      (_stateKey$getState = stateKey.getState(editorState)) === null ||
      _stateKey$getState === void 0
        ? void 0
        : _stateKey$getState.mediaClientConfig

    if (!mediaClientConfig) {
      return
    }

    checkMediaType(mediaNode, mediaClientConfig).then(mediaType => {
      if (mediaType === 'external' || mediaType === 'image') {
        setShowLinkingControls(true)
      }
    })
  }, [editorState])

  if (!showLinkingControls) {
    return null
  }

  if (mediaLinkingState && mediaLinkingState.editable) {
    const isValidUrl = isSafeUrl(mediaLinkingState.link)
    const title = intl.formatMessage(linkToolbarMessages.editLink)
    const linkTitle = intl.formatMessage(
      isValidUrl ? linkMessages.openLink : linkToolbarMessages.unableToOpenLink
    )
    return /*#__PURE__*/ React.createElement(
      React.Fragment,
      null,
      showSeparatorLeft &&
        /*#__PURE__*/ React.createElement(
          Wrapper,
          null,
          /*#__PURE__*/ React.createElement(Separator, null)
        ),
      /*#__PURE__*/ React.createElement(
        Wrapper,
        null,
        /*#__PURE__*/ React.createElement(
          ToolbarButton,
          {
            onClick: onEditLink,
            title: title,
            tooltipContent: /*#__PURE__*/ React.createElement(ToolTipContent, {
              description: title,
              keymap: addLink
            })
          },
          title
        )
      ),
      /*#__PURE__*/ React.createElement(
        Wrapper,
        null,
        /*#__PURE__*/ React.createElement(Separator, null)
      ),
      /*#__PURE__*/ React.createElement(ToolbarButton, {
        target: '_blank',
        href: isValidUrl ? mediaLinkingState.link : undefined,
        disabled: !isValidUrl,
        onClick: onOpenLink,
        title: linkTitle,
        icon: /*#__PURE__*/ React.createElement(OpenIcon, {
          label: linkTitle
        }),
        className: 'hyperlink-open-link'
      })
    )
  } else {
    const title = intl.formatMessage(linkToolbarMessages.addLink)
    return /*#__PURE__*/ React.createElement(
      React.Fragment,
      null,
      showSeparatorLeft &&
        /*#__PURE__*/ React.createElement(
          Wrapper,
          null,
          /*#__PURE__*/ React.createElement(Separator, null)
        ),
      /*#__PURE__*/ React.createElement(ToolbarButton, {
        testId: 'add-link-button',
        onClick: onAddLink,
        title: title,
        tooltipContent: /*#__PURE__*/ React.createElement(ToolTipContent, {
          description: title,
          keymap: addLink
        }),
        icon: /*#__PURE__*/ React.createElement(LinkIcon, {
          label: title
        })
      })
    )
  }
}
