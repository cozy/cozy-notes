import React from 'react'
import { blockquote, hardBreak, heading } from '@atlaskit/adf-schema'
import { createPlugin, pluginKey } from './pm-plugins/main'
import keymapPlugin from './pm-plugins/keymap'
import inputRulePlugin from './pm-plugins/input-rule'
import ToolbarBlockType from './ui/ToolbarBlockType'
import WithPluginState from '../../ui/WithPluginState'
import { setBlockTypeWithAnalytics } from './commands'
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  addAnalytics,
  EVENT_TYPE,
  INPUT_METHOD
} from '../analytics'
import * as keymaps from '../../keymaps'
import { IconHeading, IconQuote } from '../quick-insert/assets'
import { messages } from './messages'
import { ToolbarSize } from '../../ui/Toolbar/types'

const headingPluginOptions = ({ formatMessage }, isAllowed) => {
  if (!isAllowed) {
    return []
  }

  return Array.from(
    {
      length: 6
    },
    (_v, idx) => {
      const level = idx + 1
      const descriptionDescriptor = messages[`heading${level}Description`]
      const keyshortcut = keymaps.tooltip(keymaps[`toggleHeading${level}`])
      const id = `heading${level}`
      return {
        id,
        title: formatMessage(messages[id]),
        description: formatMessage(descriptionDescriptor),
        priority: 1300,
        keywords: [`h${level}`],
        keyshortcut,
        icon: () =>
          /*#__PURE__*/ React.createElement(IconHeading, {
            level: level,
            label: formatMessage(descriptionDescriptor)
          }),

        action(insert, state) {
          const tr = insert(
            state.schema.nodes.heading.createChecked({
              level
            })
          )
          return addAnalytics(state, tr, {
            action: ACTION.FORMATTED,
            actionSubject: ACTION_SUBJECT.TEXT,
            eventType: EVENT_TYPE.TRACK,
            actionSubjectId: ACTION_SUBJECT_ID.FORMAT_HEADING,
            attributes: {
              inputMethod: INPUT_METHOD.QUICK_INSERT,
              newHeadingLevel: level
            }
          })
        }
      }
    }
  )
}

const blockquotePluginOptions = ({ formatMessage }, isAllowed) => {
  if (!isAllowed) {
    return []
  }

  return [
    {
      id: 'blockquote',
      title: formatMessage(messages.blockquote),
      description: formatMessage(messages.blockquoteDescription),
      priority: 1300,
      keyshortcut: keymaps.tooltip(keymaps.toggleBlockQuote),
      icon: () =>
        /*#__PURE__*/ React.createElement(IconQuote, {
          label: formatMessage(messages.blockquote)
        }),

      action(insert, state) {
        const tr = insert(
          state.schema.nodes.blockquote.createChecked(
            {},
            state.schema.nodes.paragraph.createChecked()
          )
        )
        return addAnalytics(state, tr, {
          action: ACTION.FORMATTED,
          actionSubject: ACTION_SUBJECT.TEXT,
          eventType: EVENT_TYPE.TRACK,
          actionSubjectId: ACTION_SUBJECT_ID.FORMAT_BLOCK_QUOTE,
          attributes: {
            inputMethod: INPUT_METHOD.QUICK_INSERT
          }
        })
      }
    }
  ]
}

const blockTypePlugin = options => ({
  name: 'blockType',

  nodes() {
    const nodes = [
      {
        name: 'heading',
        node: heading
      },
      {
        name: 'blockquote',
        node: blockquote
      },
      {
        name: 'hardBreak',
        node: hardBreak
      }
    ]

    if (options && options.allowBlockType) {
      const exclude = options.allowBlockType.exclude
        ? options.allowBlockType.exclude
        : []
      return nodes.filter(node => exclude.indexOf(node.name) === -1)
    }

    return nodes
  },

  pmPlugins() {
    return [
      {
        name: 'blockType',
        plugin: ({ dispatch }) =>
          createPlugin(dispatch, options && options.lastNodeMustBeParagraph)
      },
      {
        name: 'blockTypeInputRule',
        plugin: ({ schema }) => inputRulePlugin(schema)
      }, // Needs to be lower priority than editor-tables.tableEditing
      // plugin as it is currently swallowing right/down arrow events inside tables
      {
        name: 'blockTypeKeyMap',
        plugin: ({ schema }) => keymapPlugin(schema)
      }
    ]
  },

  primaryToolbarComponent({
    editorView,
    popupsMountPoint,
    popupsBoundariesElement,
    popupsScrollableElement,
    toolbarSize,
    disabled,
    isToolbarReducedSpacing,
    eventDispatcher
  }) {
    const isSmall = toolbarSize < ToolbarSize.XL

    const boundSetBlockType = name =>
      setBlockTypeWithAnalytics(name, INPUT_METHOD.TOOLBAR)(
        editorView.state,
        editorView.dispatch
      )

    return /*#__PURE__*/ React.createElement(WithPluginState, {
      editorView: editorView,
      eventDispatcher: eventDispatcher,
      plugins: {
        pluginState: pluginKey
      },
      render: ({ pluginState }) => {
        return /*#__PURE__*/ React.createElement(ToolbarBlockType, {
          isSmall: isSmall,
          isDisabled: disabled,
          isReducedSpacing: isToolbarReducedSpacing,
          setBlockType: boundSetBlockType,
          pluginState: pluginState,
          popupsMountPoint: popupsMountPoint,
          popupsBoundariesElement: popupsBoundariesElement,
          popupsScrollableElement: popupsScrollableElement
        })
      }
    })
  },

  pluginsOptions: {
    quickInsert: intl => {
      const exclude =
        options && options.allowBlockType && options.allowBlockType.exclude
          ? options.allowBlockType.exclude
          : []
      return [
        ...blockquotePluginOptions(intl, exclude.indexOf('blockquote') === -1),
        ...headingPluginOptions(intl, exclude.indexOf('heading') === -1)
      ]
    }
  }
})

export default blockTypePlugin
export { pluginKey } from './pm-plugins/main'
