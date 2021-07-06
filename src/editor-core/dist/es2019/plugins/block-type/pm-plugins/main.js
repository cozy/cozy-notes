import { Plugin, PluginKey } from 'prosemirror-state'
import { browser } from '@atlaskit/editor-common'
import {
  NORMAL_TEXT,
  HEADING_1,
  HEADING_2,
  HEADING_3,
  HEADING_4,
  HEADING_5,
  HEADING_6,
  BLOCK_QUOTE,
  CODE_BLOCK,
  PANEL,
  OTHER,
  TEXT_BLOCK_TYPES,
  WRAPPER_BLOCK_TYPES,
  HEADINGS_BY_LEVEL
} from '../types'
import { areBlockTypesDisabled } from '../../../utils'
import {
  setHeadingWithAnalytics,
  setNormalTextWithAnalytics
} from '../commands'
import { INPUT_METHOD } from '../../analytics'
import { HEADING_KEYS } from '../../../keymaps/consts'

const blockTypeForNode = (node, schema) => {
  if (node.type === schema.nodes.heading) {
    const maybeNode = HEADINGS_BY_LEVEL[node.attrs['level']]

    if (maybeNode) {
      return maybeNode
    }
  } else if (node.type === schema.nodes.paragraph) {
    return NORMAL_TEXT
  }

  return OTHER
}

const isBlockTypeSchemaSupported = (blockType, state) => {
  switch (blockType) {
    case NORMAL_TEXT:
      return !!state.schema.nodes.paragraph

    case HEADING_1:
    case HEADING_2:
    case HEADING_3:
    case HEADING_4:
    case HEADING_5:
    case HEADING_6:
      return !!state.schema.nodes.heading

    case BLOCK_QUOTE:
      return !!state.schema.nodes.blockquote

    case CODE_BLOCK:
      return !!state.schema.nodes.codeBlock

    case PANEL:
      return !!state.schema.nodes.panel
  }

  return
}

const detectBlockType = (availableBlockTypes, state) => {
  // Before a document is loaded, there is no selection.
  if (!state.selection) {
    return NORMAL_TEXT
  }

  let blockType
  const { $from, $to } = state.selection
  state.doc.nodesBetween($from.pos, $to.pos, node => {
    const nodeBlockType = availableBlockTypes.filter(
      blockType => blockType === blockTypeForNode(node, state.schema)
    )

    if (nodeBlockType.length > 0) {
      if (!blockType) {
        blockType = nodeBlockType[0]
      } else if (blockType !== OTHER && blockType !== nodeBlockType[0]) {
        blockType = OTHER
      }
    }
  })
  return blockType || OTHER
}

const autoformatHeading = (headingLevel, view) => {
  if (headingLevel === 0) {
    setNormalTextWithAnalytics(INPUT_METHOD.FORMATTING)(
      view.state,
      view.dispatch
    )
  } else {
    setHeadingWithAnalytics(headingLevel, INPUT_METHOD.FORMATTING)(
      view.state,
      view.dispatch
    )
  }

  return true
}

export const pluginKey = new PluginKey('blockTypePlugin')
export const createPlugin = (dispatch, lastNodeMustBeParagraph) => {
  let altKeyLocation = 0
  return new Plugin({
    appendTransaction(_transactions, _oldState, newState) {
      if (lastNodeMustBeParagraph) {
        const pos = newState.doc.resolve(newState.doc.content.size - 1)
        const lastNode = pos.node(1)
        const { paragraph } = newState.schema.nodes

        if (lastNode && lastNode.isBlock && lastNode.type !== paragraph) {
          return newState.tr
            .insert(
              newState.doc.content.size,
              newState.schema.nodes.paragraph.create()
            )
            .setMeta('addToHistory', false)
        }
      }
    },

    state: {
      init(_config, state) {
        const availableBlockTypes = TEXT_BLOCK_TYPES.filter(blockType =>
          isBlockTypeSchemaSupported(blockType, state)
        )
        const availableWrapperBlockTypes = WRAPPER_BLOCK_TYPES.filter(
          blockType => isBlockTypeSchemaSupported(blockType, state)
        )
        return {
          currentBlockType: detectBlockType(availableBlockTypes, state),
          blockTypesDisabled: areBlockTypesDisabled(state),
          availableBlockTypes,
          availableWrapperBlockTypes
        }
      },

      apply(_tr, oldPluginState, _oldState, newState) {
        const newPluginState = {
          ...oldPluginState,
          currentBlockType: detectBlockType(
            oldPluginState.availableBlockTypes,
            newState
          ),
          blockTypesDisabled: areBlockTypesDisabled(newState)
        }

        if (
          newPluginState.currentBlockType !== oldPluginState.currentBlockType ||
          newPluginState.blockTypesDisabled !==
            oldPluginState.blockTypesDisabled
        ) {
          dispatch(pluginKey, newPluginState)
        }

        return newPluginState
      }
    },
    key: pluginKey,
    props: {
      /**
       * As we only want the left alt key to work for headings shortcuts on Windows
       * we can't use prosemirror-keymap and need to handle these shortcuts specially
       * Shortcut on Mac: Cmd-Opt-{heading level}
       * Shortcut on Windows: Ctrl-LeftAlt-{heading level}
       */
      handleKeyDown: (view, event) => {
        const headingLevel = HEADING_KEYS.indexOf(event.keyCode)

        if (headingLevel > -1 && event.altKey) {
          if (browser.mac && event.metaKey) {
            return autoformatHeading(headingLevel, view)
          } else if (
            !browser.mac &&
            event.ctrlKey &&
            altKeyLocation !== event.DOM_KEY_LOCATION_RIGHT
          ) {
            return autoformatHeading(headingLevel, view)
          }
        } else if (event.key === 'Alt') {
          // event.location is for the current key only; when a user hits Ctrl-Alt-1 the
          // location refers to the location of the '1' key
          // We store the location of the Alt key when it is hit to check against later
          altKeyLocation = event.location
        } else if (!event.altKey) {
          altKeyLocation = 0
        }

        return false
      }
    }
  })
}
