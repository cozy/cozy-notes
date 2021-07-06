import { defineMessages } from 'react-intl'
import RemoveIcon from '@atlaskit/icon/glyph/editor/remove'
import CopyIcon from '@atlaskit/icon/glyph/copy'
import {
  createLanguageList,
  DEFAULT_LANGUAGES,
  getLanguageIdentifier
} from '@atlaskit/adf-schema'
import { findDomRefAtPos } from 'prosemirror-utils'
import {
  removeCodeBlock,
  changeLanguage,
  copyContentToClipboard,
  resetCopiedState
} from './actions'
import commonMessages from '../../messages'
import { hoverDecoration } from '../base/pm-plugins/decoration'
import { pluginKey } from './plugin-key'
import { findCodeBlock } from './utils'
export const messages = defineMessages({
  selectLanguage: {
    id: 'fabric.editor.selectLanguage',
    defaultMessage: 'Select language',
    description:
      'Code blocks display software code. A prompt to select the software language the code is written in.'
  }
})
const languageList = createLanguageList(DEFAULT_LANGUAGES)
export const getToolbarConfig = (allowCopyToClipboard = false) => (
  state,
  { formatMessage }
) => {
  const codeBlockState = pluginKey.getState(state)

  if (codeBlockState === undefined) {
    return
  }

  const { pos } = codeBlockState

  if (pos === null) {
    return
  }

  if (state.doc.nodeAt(pos)) {
    const node = findCodeBlock(state)
    const language =
      node && node.node.attrs ? node.node.attrs.language : undefined
    const options = [
      {
        label: '(None)',
        value: '',
        alias: ['none']
      }
    ].concat(
      languageList.map(lang => ({
        label: lang.name,
        value: getLanguageIdentifier(lang),
        alias: lang.alias
      }))
    )
    const languageSelect = {
      type: 'select',
      onChange: option => changeLanguage(option.value),
      defaultValue: language
        ? options.find(option => option.value === language)
        : undefined,
      placeholder: formatMessage(messages.selectLanguage),
      options,
      filterOption: languageListFilter
    }
    const separator = {
      type: 'separator'
    }
    const nodeType = state.schema.nodes.codeBlock
    const deleteButton = {
      type: 'button',
      appearance: 'danger',
      icon: RemoveIcon,
      onMouseEnter: hoverDecoration(nodeType, true),
      onMouseLeave: hoverDecoration(nodeType, false),
      onClick: removeCodeBlock,
      title: formatMessage(commonMessages.remove)
    }
    let copyToClipboardItems = []

    if (allowCopyToClipboard) {
      const copyToClipboardButton = {
        type: 'button',
        appearance: 'subtle',
        icon: CopyIcon,
        onClick: copyContentToClipboard,
        title: formatMessage(
          codeBlockState.contentCopied
            ? commonMessages.copiedToClipboard
            : commonMessages.copyToClipboard
        ),
        onMouseLeave: resetCopiedState,
        hideTooltipOnClick: false,
        disabled: codeBlockState.isNodeSelected
      }
      copyToClipboardItems = [copyToClipboardButton, separator]
    }

    return {
      title: 'CodeBlock floating controls',
      getDomRef: view => findDomRefAtPos(pos, view.domAtPos.bind(view)),
      nodeType,
      items: [languageSelect, separator, ...copyToClipboardItems, deleteButton]
    }
  }

  return
}
/**
 * Filters language list based on both name and alias properties.
 */

export const languageListFilter = (option, rawInput) => {
  const { data } = option
  const searchString = rawInput.toLowerCase()
  return (
    data.label.toLowerCase().includes(searchString) ||
    data.alias.some(alias => alias.toLowerCase() === searchString)
  )
}
