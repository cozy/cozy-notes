import React from 'react'
import { NodeSelection, Plugin, TextSelection } from 'prosemirror-state'
import { placeholder } from '@atlaskit/adf-schema'
import WithPluginState from '../../ui/WithPluginState'
import { isNodeEmpty } from '../../utils'
import { FakeTextCursorSelection } from '../fake-text-cursor/cursor'
import PlaceholderFloatingToolbar from './ui/PlaceholderFloatingToolbar'
import {
  hidePlaceholderFloatingToolbar,
  insertPlaceholderTextAtSelection
} from './actions'
import { PlaceholderTextNodeView } from './placeholder-text-nodeview'
import { pluginKey } from './plugin-key'
export function createPlugin(dispatch, options) {
  const allowInserting = !!options.allowInserting
  return new Plugin({
    key: pluginKey,
    state: {
      init: () => ({
        showInsertPanelAt: null,
        allowInserting
      }),
      apply: (tr, state) => {
        const meta = tr.getMeta(pluginKey)

        if (meta && meta.showInsertPanelAt !== undefined) {
          const newState = {
            showInsertPanelAt: meta.showInsertPanelAt,
            allowInserting
          }
          dispatch(pluginKey, newState)
          return newState
        } else if (state.showInsertPanelAt) {
          const newState = {
            showInsertPanelAt: tr.mapping.map(state.showInsertPanelAt),
            allowInserting
          }
          dispatch(pluginKey, newState)
          return newState
        }

        return state
      }
    },

    appendTransaction(transactions, oldState, newState) {
      if (transactions.some(txn => txn.docChanged)) {
        const didPlaceholderExistBeforeTxn =
          oldState.selection.$head.nodeAfter ===
          newState.selection.$head.nodeAfter
        const adjacentNode = newState.selection.$head.nodeAfter
        const adjacentNodePos = newState.selection.$head.pos
        const placeholderNodeType = newState.schema.nodes.placeholder

        if (
          adjacentNode &&
          adjacentNode.type === placeholderNodeType &&
          didPlaceholderExistBeforeTxn
        ) {
          // Check that cursor has moved forward in the document **and** that there is content before the cursor
          const wasContentAdded =
            oldState.selection.$head.pos < newState.selection.$head.pos &&
            !isNodeEmpty(newState.selection.$head.nodeBefore)

          if (wasContentAdded) {
            const { $from, $to } = NodeSelection.create(
              newState.doc,
              adjacentNodePos
            )
            return newState.tr.deleteRange($from.pos, $to.pos)
          }
        }
      } // Handle Fake Text Cursor for Floating Toolbar

      if (
        !pluginKey.getState(oldState).showInsertPanelAt &&
        pluginKey.getState(newState).showInsertPanelAt
      ) {
        return newState.tr.setSelection(
          new FakeTextCursorSelection(newState.selection.$from)
        )
      }

      if (
        pluginKey.getState(oldState).showInsertPanelAt &&
        !pluginKey.getState(newState).showInsertPanelAt
      ) {
        if (newState.selection instanceof FakeTextCursorSelection) {
          return newState.tr.setSelection(
            new TextSelection(newState.selection.$from)
          )
        }
      }

      return
    },

    props: {
      nodeViews: {
        placeholder: (node, view, getPos) =>
          new PlaceholderTextNodeView(node, view, getPos)
      }
    }
  })
}

const placeholderTextPlugin = options => ({
  name: 'placeholderText',

  nodes() {
    return [
      {
        name: 'placeholder',
        node: placeholder
      }
    ]
  },

  pmPlugins() {
    return [
      {
        name: 'placeholderText',
        plugin: ({ dispatch }) => createPlugin(dispatch, options)
      }
    ]
  },

  contentComponent({ editorView, popupsMountPoint, popupsBoundariesElement }) {
    const insertPlaceholderText = value =>
      insertPlaceholderTextAtSelection(value)(
        editorView.state,
        editorView.dispatch
      )

    const hidePlaceholderToolbar = () =>
      hidePlaceholderFloatingToolbar(editorView.state, editorView.dispatch)

    const getNodeFromPos = pos => editorView.domAtPos(pos).node

    const getFixedCoordinatesFromPos = pos => editorView.coordsAtPos(pos)

    const setFocusInEditor = () => editorView.focus()

    return /*#__PURE__*/ React.createElement(WithPluginState, {
      plugins: {
        placeholderTextState: pluginKey
      },
      render: ({ placeholderTextState = {} }) => {
        if (placeholderTextState.showInsertPanelAt) {
          return /*#__PURE__*/ React.createElement(PlaceholderFloatingToolbar, {
            editorViewDOM: editorView.dom,
            popupsMountPoint: popupsMountPoint,
            popupsBoundariesElement: popupsBoundariesElement,
            getFixedCoordinatesFromPos: getFixedCoordinatesFromPos,
            getNodeFromPos: getNodeFromPos,
            hidePlaceholderFloatingToolbar: hidePlaceholderToolbar,
            showInsertPanelAt: placeholderTextState.showInsertPanelAt,
            insertPlaceholder: insertPlaceholderText,
            setFocusInEditor: setFocusInEditor
          })
        }

        return null
      }
    })
  }
})

export default placeholderTextPlugin
