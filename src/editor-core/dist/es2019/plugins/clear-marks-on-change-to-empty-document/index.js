import { Plugin, PluginKey } from 'prosemirror-state'
import { isEmptyDocument } from '../../utils'
export const pluginKey = new PluginKey(
  'clearMarksOnChangeToEmptyDocumentPlugin'
)
export function createPlugin() {
  return new Plugin({
    key: pluginKey,
    appendTransaction: (_transactions, oldState, newState) => {
      // ED-2973: When a user clears the editor's content, remove the current active marks
      if (!isEmptyDocument(oldState.doc) && isEmptyDocument(newState.doc)) {
        return newState.tr.setStoredMarks([])
      }

      return
    }
  })
}

const clearMarksOnChangeToEmptyDocumentPlugin = () => ({
  name: 'clearMarksOnEmptyDoc',

  pmPlugins() {
    return [
      {
        name: 'clearMarksOnChange',
        plugin: createPlugin
      }
    ]
  }
})

export default clearMarksOnChangeToEmptyDocumentPlugin
