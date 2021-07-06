import { PluginKey, Plugin } from 'prosemirror-state'
import { keydownHandler } from 'prosemirror-keymap'
import { filter } from '../../../utils/commands'
import { typeAheadPluginKey } from '../../../plugins/type-ahead'
import { isSelectionEndOfParagraph } from '../../../utils'
export const newlinePreserveMarksKey = new PluginKey(
  'newlinePreserveMarksPlugin'
)

const isSelectionAligned = state =>
  !!state.selection.$to.parent.marks.find(
    m => m.type === state.schema.marks.alignment
  )

const isTypeaheadNotDisplaying = state =>
  !typeAheadPluginKey.getState(state).active

const splitBlockPreservingMarks = (state, dispatch) => {
  if (dispatch) {
    dispatch(state.tr.split(state.tr.mapping.map(state.selection.$from.pos), 1))
  }

  return true
}

export default () =>
  new Plugin({
    key: newlinePreserveMarksKey,
    props: {
      handleKeyDown: keydownHandler({
        Enter: filter(
          [
            isSelectionEndOfParagraph,
            isSelectionAligned,
            isTypeaheadNotDisplaying
          ],
          splitBlockPreservingMarks
        )
      })
    }
  })
