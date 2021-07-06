import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React from 'react'
import ChevronLeftLargeIcon from '@atlaskit/icon/glyph/chevron-left-large'
import EditorUnlinkIcon from '@atlaskit/icon/glyph/editor/unlink'
import PanelTextInput from '../../../ui/PanelTextInput'
import Button from '../../floating-toolbar/ui/Button'
import Separator from '../../floating-toolbar/ui/Separator'
import {
  Container,
  UrlInputWrapper
} from '../../../ui/LinkSearch/ToolbarComponents'
import RecentSearch from '../../../ui/LinkSearch'
import { linkToolbarMessages } from '../../../messages' // Common Translations will live here

import { defineMessages } from 'react-intl'
import { normalizeUrl } from '../../hyperlink/utils'
import styled from 'styled-components'
import { R400 } from '@atlaskit/theme/colors'
import { ErrorMessage } from '@atlaskit/editor-common'
import { INPUT_METHOD } from '../../analytics/types/enums'
export const mediaLinkToolbarMessages = defineMessages({
  backLink: {
    id: 'fabric.editor.backLink',
    defaultMessage: 'Go back',
    description: 'Go back from media linking toolbar to main toolbar'
  }
})
const ValidationWrapper = styled.section`
  display: flex;
  line-height: 0;
  padding: 12px 24px 12px 0;
  margin: 0 4px 0 32px;
  border-top: 1px solid ${R400};
  align-items: start;
  display: flex;
  flex-direction: column;
`
const ButtonWrapper = styled.span`
  padding: 4px 8px 4px 0px;
`
export class LinkAddToolbar extends React.PureComponent {
  constructor(...args) {
    super(...args)

    _defineProperty(this, 'state', {
      validationErrors: []
    })

    _defineProperty(this, 'handleSubmit', ({ url, inputMethod }) => {
      this.props.onSubmit(url, {
        inputMethod
      })
    })

    _defineProperty(this, 'handleOnBack', ({ url, inputMethod }) => {
      const { onBack } = this.props

      if (onBack) {
        onBack(url, {
          inputMethod
        })
      }
    })

    _defineProperty(this, 'handleCancel', () => {
      const { onCancel } = this.props

      if (onCancel) {
        onCancel()
      }
    })

    _defineProperty(this, 'handleUnlink', () => {
      const { onUnlink } = this.props

      if (onUnlink) {
        onUnlink()
      }
    })

    _defineProperty(this, 'handleOnBlur', options => {
      this.props.onBlur(options.url)
    })

    _defineProperty(
      this,
      'renderContainer',
      ({
        activityProvider,
        inputProps: { onChange, onKeyDown, onSubmit, value },
        currentInputMethod,
        renderRecentList
      }) => {
        const {
          intl: { formatMessage },
          displayUrl
        } = this.props

        const getPlaceholder = hasActivityProvider =>
          formatMessage(
            hasActivityProvider
              ? linkToolbarMessages.placeholder
              : linkToolbarMessages.linkPlaceholder
          )

        const formatLinkAddressText = formatMessage(
          mediaLinkToolbarMessages.backLink
        )
        const formatUnlinkText = formatMessage(linkToolbarMessages.unlink)
        const errorsList = this.state.validationErrors.map(function(
          error,
          index
        ) {
          return /*#__PURE__*/ React.createElement(
            ErrorMessage,
            {
              key: index
            },
            error
          )
        })
        return /*#__PURE__*/ React.createElement(
          'div',
          {
            className: 'recent-list'
          },
          /*#__PURE__*/ React.createElement(
            Container,
            {
              provider: !!activityProvider
            },
            /*#__PURE__*/ React.createElement(
              UrlInputWrapper,
              null,
              /*#__PURE__*/ React.createElement(
                ButtonWrapper,
                null,
                /*#__PURE__*/ React.createElement(Button, {
                  title: formatLinkAddressText,
                  icon: /*#__PURE__*/ React.createElement(
                    ChevronLeftLargeIcon,
                    {
                      label: formatLinkAddressText
                    }
                  ),
                  onClick: () =>
                    this.handleOnBack({
                      url: value,
                      inputMethod: currentInputMethod
                    })
                })
              ),
              /*#__PURE__*/ React.createElement(PanelTextInput, {
                testId: 'media-link-input',
                placeholder: getPlaceholder(!!activityProvider),
                autoFocus: true,
                onCancel: this.handleCancel,
                defaultValue: value,
                onSubmit: inputValue => {
                  const validationErrors = this.getValidationErrors(
                    inputValue,
                    currentInputMethod
                  )
                  this.setState({
                    validationErrors
                  })

                  if (!validationErrors.length) {
                    onSubmit()
                  }
                },
                onChange: value => {
                  this.setState({
                    validationErrors: []
                  })
                  onChange(value)
                },
                onKeyDown: onKeyDown
              }),
              normalizeUrl(displayUrl) &&
                /*#__PURE__*/ React.createElement(
                  React.Fragment,
                  null,
                  /*#__PURE__*/ React.createElement(Separator, null),
                  /*#__PURE__*/ React.createElement(Button, {
                    title: formatUnlinkText,
                    icon: /*#__PURE__*/ React.createElement(EditorUnlinkIcon, {
                      label: formatUnlinkText
                    }),
                    onClick: this.handleUnlink
                  })
                )
            ),
            !!errorsList.length &&
              /*#__PURE__*/ React.createElement(
                ValidationWrapper,
                null,
                errorsList
              ),
            renderRecentList()
          )
        )
      }
    )
  }

  getValidationErrors(value, inputMethod) {
    const {
      intl: { formatMessage }
    } = this.props // dont show validation errors if input method is typeahed, which means user selects from search list

    if (inputMethod === INPUT_METHOD.TYPEAHEAD) {
      return []
    }

    if (!value) {
      return [formatMessage(linkToolbarMessages.emptyLink)]
    } // if url can be normalized - we consider it is a valid url
    // also don't show validaition errors for empty values

    if (normalizeUrl(value)) {
      return []
    } else {
      return [formatMessage(linkToolbarMessages.invalidLink)]
    }
  }

  render() {
    const { providerFactory, displayUrl } = this.props
    return /*#__PURE__*/ React.createElement(RecentSearch, {
      defaultUrl: normalizeUrl(displayUrl),
      providerFactory: providerFactory,
      onSubmit: this.handleSubmit,
      onBlur: this.handleOnBlur,
      render: this.renderContainer
    })
  }
}
export default LinkAddToolbar
