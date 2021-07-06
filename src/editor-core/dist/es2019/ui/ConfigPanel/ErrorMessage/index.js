import React from 'react'
import EmptyState from '@atlaskit/empty-state'
import { defineMessages, injectIntl } from 'react-intl'
import ErrorImage from './ErrorImage'
const messages = defineMessages({
  configFailedToLoad: {
    id: 'fabric.editor.configFailedToLoad',
    defaultMessage: 'Failed to load',
    description: 'Displayed when the config panel fails to load fields'
  }
})

const ConfigPanelErrorMessage = ({ errorMessage, intl }) => {
  return /*#__PURE__*/ React.createElement(EmptyState, {
    header: intl.formatMessage(messages.configFailedToLoad),
    description: errorMessage,
    renderImage: () => /*#__PURE__*/ React.createElement(ErrorImage, null),
    size: 'narrow',
    imageHeight: 80
  })
}

export default injectIntl(ConfigPanelErrorMessage)
