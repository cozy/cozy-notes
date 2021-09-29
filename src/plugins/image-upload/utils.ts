import { EditorState, NodeSelection, TextSelection } from 'prosemirror-state'
import { Schema, Node } from 'prosemirror-model'
import { EditorView } from 'prosemirror-view'

export const isMediaSelected = (state: EditorState): boolean => {
  const { media } = state.schema.nodes

  return (
    state.selection instanceof NodeSelection &&
    state.selection.node.type === media
  )
}

export const canInsertMedia = (state: EditorState): boolean => {
  const { mediaSingle } = state.schema.nodes
  const { $to } = state.selection

  if (mediaSingle) {
    for (let d = $to.depth; d >= 0; d--) {
      const index = $to.index(d)
      if ($to.node(d).canReplaceWith(index, index, mediaSingle)) {
        return true
      }
    }
  }
  return false
}

export const createExternalMediaNode = (
  url: string,
  schema: Schema
): Node | null => {
  const { media, mediaSingle } = schema.nodes
  if (!media || !mediaSingle) {
    return null
  }

  const mediaNode = media.createChecked({
    type: 'external',
    url
  })
  return mediaSingle.createChecked({}, mediaNode)
}

export const setSelectionAtDropPoint = (
  { clientX, clientY }: DragEvent,
  view: EditorView
): void =>
  view.dispatch(
    view.state.tr.setSelection(
      TextSelection.create(
        view.state.doc,
        view.posAtCoords({ left: clientX, top: clientY })?.pos || 0
      )
    )
  )
