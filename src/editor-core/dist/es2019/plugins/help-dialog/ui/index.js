import _defineProperty from '@babel/runtime/helpers/defineProperty'
import _extends from '@babel/runtime/helpers/extends'
import React from 'react'
import { injectIntl, defineMessages, FormattedMessage } from 'react-intl'
import { browser } from '@atlaskit/editor-common'
import CrossIcon from '@atlaskit/icon/glyph/cross'
import Modal, { ModalTransition } from '@atlaskit/modal-dialog'
import {
  Header,
  Footer,
  ContentWrapper,
  Line,
  Content,
  ColumnRight,
  ColumnLeft,
  Row,
  CodeSm,
  CodeMd,
  CodeLg,
  Title
} from './styles'
import * as keymaps from '../../../keymaps'
import ToolbarButton from '../../../ui/ToolbarButton'
import { toolbarMessages as textFormattingMessages } from '../../text-formatting/ui/ToolbarTextFormatting/toolbar-messages'
import { toolbarMessages as advancedTextFormattingMessages } from '../../text-formatting/ui/ToolbarAdvancedTextFormatting/toolbar-messages'
import { messages as listMessages } from '../../lists/messages'
import { messages as insertBlockMessages } from '../../insert-block/ui/ToolbarInsertBlock/messages'
import { messages as blockTypeMessages } from '../../block-type/messages'
import { closeHelpCommand } from '../commands'
import { annotationMessages } from '../../annotation/toolbar'
const messages = defineMessages({
  editorHelp: {
    id: 'fabric.editor.editorHelp',
    defaultMessage: 'Editor help',
    description: 'Title of editor help dialog.'
  },
  helpDialogTips: {
    id: 'fabric.editor.helpDialogTips',
    defaultMessage: 'Press {keyMap} to quickly open this dialog at any time',
    description: 'Hint about how to open a dialog quickly using a shortcut.'
  },
  keyboardShortcuts: {
    id: 'fabric.editor.keyboardShortcuts',
    defaultMessage: 'Keyboard shortcuts',
    description: ''
  },
  markdown: {
    id: 'fabric.editor.markdown',
    defaultMessage: 'Markdown',
    description: 'It is a name of popular markup language.'
  },
  undo: {
    id: 'fabric.editor.undo',
    defaultMessage: 'Undo',
    description: ''
  },
  redo: {
    id: 'fabric.editor.redo',
    defaultMessage: 'Redo',
    description: ''
  },
  pastePlainText: {
    id: 'fabric.editor.pastePlainText',
    defaultMessage: 'Paste plain text',
    description: ''
  },
  altText: {
    id: 'fabric.editor.altText',
    defaultMessage: 'Alt text',
    description: 'Alternative text for image.'
  },
  closeHelpDialog: {
    id: 'fabric.editor.closeHelpDialog',
    defaultMessage: 'Close help dialog',
    description: ''
  },
  // TODO: Move it inside quick insert plugin
  quickInsert: {
    id: 'fabric.editor.quickInsert',
    defaultMessage: 'Quick insert',
    description: 'Name of a feature, which let you insert items quickly.'
  }
})
const AkModalDialog = Modal
export const formatting = ({ formatMessage }) => [
  {
    name: formatMessage(textFormattingMessages.bold),
    type: 'strong',
    keymap: () => keymaps.toggleBold,
    autoFormatting: () =>
      /*#__PURE__*/ React.createElement(
        'span',
        null,
        /*#__PURE__*/ React.createElement(
          CodeLg,
          null,
          '**',
          /*#__PURE__*/ React.createElement(
            FormattedMessage,
            textFormattingMessages.bold
          ),
          '**'
        )
      )
  },
  {
    name: formatMessage(textFormattingMessages.italic),
    type: 'em',
    keymap: () => keymaps.toggleItalic,
    autoFormatting: () =>
      /*#__PURE__*/ React.createElement(
        'span',
        null,
        /*#__PURE__*/ React.createElement(
          CodeLg,
          null,
          '*',
          /*#__PURE__*/ React.createElement(
            FormattedMessage,
            textFormattingMessages.italic
          ),
          '*'
        )
      )
  },
  {
    name: formatMessage(advancedTextFormattingMessages.underline),
    type: 'underline',
    keymap: () => keymaps.toggleUnderline
  },
  {
    name: formatMessage(advancedTextFormattingMessages.strike),
    type: 'strike',
    keymap: () => keymaps.toggleStrikethrough,
    autoFormatting: () =>
      /*#__PURE__*/ React.createElement(
        'span',
        null,
        /*#__PURE__*/ React.createElement(
          CodeLg,
          null,
          '~~',
          /*#__PURE__*/ React.createElement(
            FormattedMessage,
            advancedTextFormattingMessages.strike
          ),
          '~~'
        )
      )
  },
  {
    name: formatMessage(blockTypeMessages.heading1),
    type: 'heading',
    keymap: () => keymaps.toggleHeading1,
    autoFormatting: () =>
      /*#__PURE__*/ React.createElement(
        'span',
        null,
        /*#__PURE__*/ React.createElement(CodeSm, null, '#'),
        ' ',
        /*#__PURE__*/ React.createElement(CodeLg, null, 'Space')
      )
  },
  {
    name: formatMessage(blockTypeMessages.heading2),
    type: 'heading',
    keymap: () => keymaps.toggleHeading2,
    autoFormatting: () =>
      /*#__PURE__*/ React.createElement(
        'span',
        null,
        /*#__PURE__*/ React.createElement(CodeLg, null, '##'),
        ' ',
        /*#__PURE__*/ React.createElement(CodeLg, null, 'Space')
      )
  },
  {
    name: formatMessage(blockTypeMessages.heading3),
    type: 'heading',
    keymap: () => keymaps.toggleHeading3,
    autoFormatting: () =>
      /*#__PURE__*/ React.createElement(
        'span',
        null,
        /*#__PURE__*/ React.createElement(CodeLg, null, '###'),
        ' ',
        /*#__PURE__*/ React.createElement(CodeLg, null, 'Space')
      )
  },
  {
    name: formatMessage(blockTypeMessages.heading4),
    type: 'heading',
    keymap: () => keymaps.toggleHeading4,
    autoFormatting: () =>
      /*#__PURE__*/ React.createElement(
        'span',
        null,
        /*#__PURE__*/ React.createElement(CodeLg, null, '####'),
        ' ',
        /*#__PURE__*/ React.createElement(CodeLg, null, 'Space')
      )
  },
  {
    name: formatMessage(blockTypeMessages.heading5),
    type: 'heading',
    keymap: () => keymaps.toggleHeading5,
    autoFormatting: () =>
      /*#__PURE__*/ React.createElement(
        'span',
        null,
        /*#__PURE__*/ React.createElement(CodeLg, null, '#####'),
        ' ',
        /*#__PURE__*/ React.createElement(CodeLg, null, 'Space')
      )
  },
  {
    name: formatMessage(blockTypeMessages.heading6),
    type: 'heading',
    keymap: () => keymaps.toggleHeading6,
    autoFormatting: () =>
      /*#__PURE__*/ React.createElement(
        'span',
        null,
        /*#__PURE__*/ React.createElement(CodeLg, null, '######'),
        ' ',
        /*#__PURE__*/ React.createElement(CodeLg, null, 'Space')
      )
  },
  {
    name: formatMessage(blockTypeMessages.normal),
    type: 'paragraph',
    keymap: () => keymaps.setNormalText
  },
  {
    name: formatMessage(listMessages.orderedList),
    type: 'orderedList',
    keymap: () => keymaps.toggleOrderedList,
    autoFormatting: () =>
      /*#__PURE__*/ React.createElement(
        'span',
        null,
        /*#__PURE__*/ React.createElement(CodeSm, null, '1.'),
        ' ',
        /*#__PURE__*/ React.createElement(CodeLg, null, 'Space')
      )
  },
  {
    name: formatMessage(listMessages.unorderedList),
    type: 'bulletList',
    keymap: () => keymaps.toggleBulletList,
    autoFormatting: () =>
      /*#__PURE__*/ React.createElement(
        'span',
        null,
        /*#__PURE__*/ React.createElement(CodeSm, null, '*'),
        ' ',
        /*#__PURE__*/ React.createElement(CodeLg, null, 'Space')
      )
  },
  {
    name: formatMessage(blockTypeMessages.blockquote),
    type: 'blockquote',
    keymap: () => keymaps.toggleBlockQuote,
    autoFormatting: () =>
      /*#__PURE__*/ React.createElement(
        'span',
        null,
        /*#__PURE__*/ React.createElement(CodeLg, null, '>'),
        ' ',
        /*#__PURE__*/ React.createElement(CodeLg, null, 'Space')
      )
  },
  {
    name: formatMessage(blockTypeMessages.codeblock),
    type: 'codeBlock',
    autoFormatting: () =>
      /*#__PURE__*/ React.createElement(
        'span',
        null,
        /*#__PURE__*/ React.createElement(CodeLg, null, '```')
      )
  },
  {
    name: formatMessage(insertBlockMessages.horizontalRule),
    type: 'rule',
    keymap: () => keymaps.insertRule,
    autoFormatting: () =>
      /*#__PURE__*/ React.createElement(
        'span',
        null,
        /*#__PURE__*/ React.createElement(CodeLg, null, '---')
      )
  },
  {
    name: formatMessage(insertBlockMessages.link),
    type: 'link',
    keymap: () => keymaps.addLink,
    autoFormatting: () =>
      /*#__PURE__*/ React.createElement(
        'span',
        null,
        /*#__PURE__*/ React.createElement(
          CodeLg,
          null,
          '[',
          /*#__PURE__*/ React.createElement(
            FormattedMessage,
            insertBlockMessages.link
          ),
          '](http://a.com)'
        )
      )
  },
  {
    name: formatMessage(advancedTextFormattingMessages.code),
    type: 'code',
    keymap: () => keymaps.toggleCode,
    autoFormatting: () =>
      /*#__PURE__*/ React.createElement(
        'span',
        null,
        /*#__PURE__*/ React.createElement(
          CodeLg,
          null,
          '`',
          /*#__PURE__*/ React.createElement(
            FormattedMessage,
            advancedTextFormattingMessages.code
          ),
          '`'
        )
      )
  },
  {
    name: formatMessage(insertBlockMessages.action),
    type: 'taskItem',
    autoFormatting: () =>
      /*#__PURE__*/ React.createElement(
        'span',
        null,
        /*#__PURE__*/ React.createElement(CodeSm, null, '[]'),
        ' ',
        /*#__PURE__*/ React.createElement(CodeLg, null, 'Space')
      )
  },
  {
    name: formatMessage(insertBlockMessages.decision),
    type: 'decisionItem',
    autoFormatting: () =>
      /*#__PURE__*/ React.createElement(
        'span',
        null,
        /*#__PURE__*/ React.createElement(CodeSm, null, '<>'),
        ' ',
        /*#__PURE__*/ React.createElement(CodeLg, null, 'Space')
      )
  },
  {
    name: formatMessage(insertBlockMessages.emoji),
    type: 'emoji',
    autoFormatting: () =>
      /*#__PURE__*/ React.createElement(
        'span',
        null,
        /*#__PURE__*/ React.createElement(CodeLg, null, ':')
      )
  },
  {
    name: formatMessage(insertBlockMessages.mention),
    type: 'mention',
    autoFormatting: () =>
      /*#__PURE__*/ React.createElement(
        'span',
        null,
        /*#__PURE__*/ React.createElement(CodeLg, null, '@')
      )
  }
]
const shortcutNamesWithoutKeymap = ['emoji', 'mention', 'quickInsert']

const otherFormatting = ({ formatMessage }) => [
  {
    name: formatMessage(advancedTextFormattingMessages.clearFormatting),
    type: 'clearFormatting',
    keymap: () => keymaps.clearFormatting
  },
  {
    name: formatMessage(messages.undo),
    type: 'undo',
    keymap: () => keymaps.undo
  },
  {
    name: formatMessage(messages.redo),
    type: 'redo',
    keymap: () => keymaps.redo
  },
  {
    name: formatMessage(messages.pastePlainText),
    type: 'paste',
    keymap: () => keymaps.pastePlainText
  },
  {
    name: formatMessage(annotationMessages.createComment),
    type: 'annotation',
    keymap: () => keymaps.addInlineComment
  }
]

const imageAutoFormat = {
  name: 'Image',
  type: 'image',
  autoFormatting: () =>
    /*#__PURE__*/ React.createElement(
      'span',
      null,
      /*#__PURE__*/ React.createElement(
        CodeLg,
        null,
        '![',
        /*#__PURE__*/ React.createElement(FormattedMessage, messages.altText),
        '](http://www.image.com)'
      )
    )
}

const quickInsertAutoFormat = ({ formatMessage }) => ({
  name: formatMessage(messages.quickInsert),
  type: 'quickInsert',
  autoFormatting: () =>
    /*#__PURE__*/ React.createElement(
      'span',
      null,
      /*#__PURE__*/ React.createElement(CodeLg, null, '/')
    )
})

export const getSupportedFormatting = (
  schema,
  intl,
  imageEnabled,
  quickInsertEnabled
) => {
  const supportedBySchema = formatting(intl).filter(
    format => schema.nodes[format.type] || schema.marks[format.type]
  )
  return [
    ...supportedBySchema,
    ...(imageEnabled ? [imageAutoFormat] : []),
    ...(quickInsertEnabled ? [quickInsertAutoFormat(intl)] : []),
    ...otherFormatting(intl)
  ]
}
export const getComponentFromKeymap = keymap => {
  let shortcut = keymap[browser.mac ? 'mac' : 'windows']

  if (browser.mac) {
    shortcut = shortcut.replace('Alt', 'Opt')
  }

  const keyParts = shortcut.replace(/\-(?=.)/g, ' + ').split(' ')
  return /*#__PURE__*/ React.createElement(
    'span',
    null,
    keyParts.map((part, index) => {
      if (part === '+') {
        return /*#__PURE__*/ React.createElement(
          'span',
          {
            key: `${shortcut}-${index}`
          },
          ' + '
        )
      } else if (part === 'Cmd') {
        return /*#__PURE__*/ React.createElement(
          CodeSm,
          {
            key: `${shortcut}-${index}`
          },
          '\u2318'
        )
      } else if (
        ['ctrl', 'alt', 'opt', 'shift'].indexOf(part.toLowerCase()) >= 0
      ) {
        return /*#__PURE__*/ React.createElement(
          CodeMd,
          {
            key: `${shortcut}-${index}`
          },
          part
        )
      }

      return /*#__PURE__*/ React.createElement(
        CodeSm,
        {
          key: `${shortcut}-${index}`
        },
        part.toUpperCase()
      )
    })
  )
}
const ModalHeader = injectIntl(
  ({ onClose, showKeyline, intl: { formatMessage } }) =>
    /*#__PURE__*/ React.createElement(
      Header,
      {
        showKeyline: showKeyline
      },
      /*#__PURE__*/ React.createElement(FormattedMessage, messages.editorHelp),
      /*#__PURE__*/ React.createElement(
        'div',
        null,
        /*#__PURE__*/ React.createElement(ToolbarButton, {
          onClick: onClose,
          title: formatMessage(messages.closeHelpDialog),
          spacing: 'compact',
          iconBefore: /*#__PURE__*/ React.createElement(CrossIcon, {
            label: formatMessage(messages.closeHelpDialog),
            size: 'medium'
          })
        })
      )
    )
)

const ModalFooter = ({ showKeyline }) =>
  /*#__PURE__*/ React.createElement(
    Footer,
    {
      showKeyline: showKeyline
    },
    /*#__PURE__*/ React.createElement(
      FormattedMessage,
      _extends({}, messages.helpDialogTips, {
        values: {
          keyMap: getComponentFromKeymap(keymaps.openHelp)
        }
      })
    )
  )

class HelpDialog extends React.Component {
  constructor(...args) {
    super(...args)

    _defineProperty(this, 'formatting', [])

    _defineProperty(this, 'closeDialog', () => {
      const {
        state: { tr },
        dispatch
      } = this.props.editorView
      closeHelpCommand(tr, dispatch)
    })

    _defineProperty(this, 'handleEsc', e => {
      if (e.key === 'Escape' && this.props.isVisible) {
        this.closeDialog()
      }
    })
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleEsc)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEsc)
  }

  render() {
    const { editorView, intl, imageEnabled, quickInsertEnabled } = this.props
    this.formatting = getSupportedFormatting(
      editorView.state.schema,
      intl,
      imageEnabled,
      quickInsertEnabled
    )
    return /*#__PURE__*/ React.createElement(
      ModalTransition,
      null,
      this.props.isVisible
        ? /*#__PURE__*/ React.createElement(
            AkModalDialog,
            {
              width: 'large',
              onClose: this.closeDialog,
              components: {
                Header: ModalHeader,
                Footer: ModalFooter
              }
            },
            /*#__PURE__*/ React.createElement(
              ContentWrapper,
              null,
              /*#__PURE__*/ React.createElement(Line, null),
              /*#__PURE__*/ React.createElement(
                Content,
                null,
                /*#__PURE__*/ React.createElement(
                  ColumnLeft,
                  null,
                  /*#__PURE__*/ React.createElement(
                    Title,
                    null,
                    /*#__PURE__*/ React.createElement(
                      FormattedMessage,
                      messages.keyboardShortcuts
                    )
                  ),
                  /*#__PURE__*/ React.createElement(
                    'div',
                    null,
                    this.formatting
                      .filter(form => {
                        const keymap = form.keymap && form.keymap(this.props)
                        return keymap && keymap[browser.mac ? 'mac' : 'windows']
                      })
                      .map(form =>
                        /*#__PURE__*/ React.createElement(
                          Row,
                          {
                            key: `textFormatting-${form.name}`
                          },
                          /*#__PURE__*/ React.createElement(
                            'span',
                            null,
                            form.name
                          ),
                          getComponentFromKeymap(form.keymap())
                        )
                      ),
                    this.formatting
                      .filter(
                        form =>
                          shortcutNamesWithoutKeymap.indexOf(form.type) !== -1
                      )
                      .filter(form => form.autoFormatting)
                      .map(form =>
                        /*#__PURE__*/ React.createElement(
                          Row,
                          {
                            key: `autoFormatting-${form.name}`
                          },
                          /*#__PURE__*/ React.createElement(
                            'span',
                            null,
                            form.name
                          ),
                          form.autoFormatting()
                        )
                      )
                  )
                ),
                /*#__PURE__*/ React.createElement(Line, null),
                /*#__PURE__*/ React.createElement(
                  ColumnRight,
                  null,
                  /*#__PURE__*/ React.createElement(
                    Title,
                    null,
                    /*#__PURE__*/ React.createElement(
                      FormattedMessage,
                      messages.markdown
                    )
                  ),
                  /*#__PURE__*/ React.createElement(
                    'div',
                    null,
                    this.formatting
                      .filter(
                        form =>
                          shortcutNamesWithoutKeymap.indexOf(form.type) === -1
                      )
                      .map(
                        form =>
                          form.autoFormatting &&
                          /*#__PURE__*/ React.createElement(
                            Row,
                            {
                              key: `autoFormatting-${form.name}`
                            },
                            /*#__PURE__*/ React.createElement(
                              'span',
                              null,
                              form.name
                            ),
                            form.autoFormatting()
                          )
                      )
                  )
                )
              )
            )
          )
        : null
    )
  }
}

_defineProperty(HelpDialog, 'displayName', 'HelpDialog')

export default injectIntl(HelpDialog)
