import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React from 'react'
import PropTypes from 'prop-types'
import { Fragment } from 'prosemirror-model'
import {
  setSelectedCardAppearance,
  changeSelectedCardToLink
} from '../pm-plugins/doc'
import { isSupportedInParent } from '../../../utils/nodes'
import Dropdown from '../../floating-toolbar/ui/Dropdown'
import nodeNames from '../../../messages'
import { messages } from '../messages'
export class LinkToolbarAppearance extends React.Component {
  constructor(...args) {
    super(...args)

    _defineProperty(this, 'renderDropdown', (view, cardContext) => {
      const {
        url,
        intl,
        currentAppearance,
        editorState,
        allowEmbeds,
        platform
      } = this.props
      const preview =
        allowEmbeds &&
        cardContext &&
        url &&
        cardContext.extractors.getPreview(url, platform)
      const embedOption = allowEmbeds &&
        preview && {
          title: intl.formatMessage(messages.embed),
          onClick: setSelectedCardAppearance('embed'),
          selected: currentAppearance === 'embed',
          hidden: false,
          testId: 'embed-appearance'
        }
      const options = [
        {
          title: intl.formatMessage(messages.url),
          onClick: () =>
            changeSelectedCardToLink(
              url,
              url,
              true
            )(
              editorState,
              view === null || view === void 0 ? void 0 : view.dispatch
            ),
          selected: !currentAppearance,
          testId: 'url-appearance'
        },
        {
          title: intl.formatMessage(messages.inline),
          onClick: setSelectedCardAppearance('inline'),
          selected: currentAppearance === 'inline',
          hidden: false,
          testId: 'inline-appearance'
        },
        {
          title: intl.formatMessage(messages.block),
          onClick: setSelectedCardAppearance('block'),
          selected: currentAppearance === 'block',
          hidden: false,
          testId: 'block-appearance'
        }
      ]
      const title = intl.formatMessage(
        currentAppearance ? messages[currentAppearance] : messages.url
      )

      const dispatchCommand = fn => {
        fn && fn(editorState, view && view.dispatch)
      }

      const isDropdownDisabled =
        currentAppearance === 'inline' &&
        !isSupportedInParent(
          editorState,
          Fragment.from(editorState.schema.nodes.blockCard.createChecked({}))
        )

      if (embedOption) {
        options.push(embedOption)
      }

      return /*#__PURE__*/ React.createElement(Dropdown, {
        key: 'link-toolbar',
        buttonTestId: 'link-toolbar-appearance-button',
        title: title,
        dispatchCommand: dispatchCommand,
        options: options,
        disabled: isDropdownDisabled,
        tooltip: isDropdownDisabled
          ? parentNodeName(editorState, intl)
          : undefined
      })
    })
  }

  render() {
    const cardContext = this.context.contextAdapter
      ? this.context.contextAdapter.card
      : undefined
    const { editorView } = this.props
    return this.renderDropdown(editorView, cardContext && cardContext.value)
  }
}

_defineProperty(LinkToolbarAppearance, 'contextTypes', {
  contextAdapter: PropTypes.object
})

const parentNodeName = (state, intl) => {
  try {
    const parentNode = state.selection.$from.node(-1)
    const parentName = intl.formatMessage(nodeNames[parentNode.type.name])
    const tooltip = intl.formatMessage(messages.blockCardUnavailable, {
      node: parentName
    })
    return tooltip
  } catch (e) {
    return intl.formatMessage(messages.blockCardUnavailable, {
      node: intl.formatMessage(nodeNames.defaultBlockNode)
    })
  }
}
