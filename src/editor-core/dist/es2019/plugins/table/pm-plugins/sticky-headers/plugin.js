import { Plugin } from 'prosemirror-state'
import { TableRowNodeView } from './nodeviews/tableRow'
import { pluginKey } from './plugin-key'
import { createPluginState } from './plugin-state'
export const createPlugin = (
  dispatch,
  eventDispatcher,
  initialState = () => []
) => {
  return new Plugin({
    state: createPluginState(dispatch, initialState),
    key: pluginKey,
    props: {
      nodeViews: {
        tableRow: (node, view, getPos) => {
          return new TableRowNodeView(node, view, getPos, eventDispatcher)
        }
      }
    }
  })
}
