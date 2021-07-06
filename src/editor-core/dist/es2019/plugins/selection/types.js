import { PluginKey } from 'prosemirror-state'
export const selectionPluginKey = new PluginKey('selection')
export const gapCursorPluginKey = new PluginKey('gapCursorPlugin')
export let RelativeSelectionPos
;(function(RelativeSelectionPos) {
  RelativeSelectionPos['Before'] = 'Before'
  RelativeSelectionPos['Start'] = 'Start'
  RelativeSelectionPos['Inside'] = 'Inside'
  RelativeSelectionPos['End'] = 'End'
})(RelativeSelectionPos || (RelativeSelectionPos = {}))

export let SelectionDirection
;(function(SelectionDirection) {
  SelectionDirection[(SelectionDirection['Before'] = -1)] = 'Before'
  SelectionDirection[(SelectionDirection['After'] = 1)] = 'After'
})(SelectionDirection || (SelectionDirection = {}))
