import { Plugin } from 'prosemirror-state'
import DateNodeView from '../nodeviews/date'
import { ReactNodeView } from '../../../nodeviews'
import { pluginFactory } from '../../../utils/plugin-state-factory'
import { reducer, mapping, onSelectionChanged } from './utils'
import { pluginKey } from './plugin-key'
const { createPluginState, getPluginState } = pluginFactory(
  pluginKey,
  reducer,
  {
    mapping,
    onSelectionChanged
  }
)

const createPlugin = ({ dispatch, portalProviderAPI, eventDispatcher }) => {
  const newPluginState = {
    showDatePickerAt: null,
    isNew: false,
    isDateEmpty: false,
    focusDateInput: false
  }
  return new Plugin({
    state: createPluginState(dispatch, newPluginState),
    key: pluginKey,
    props: {
      nodeViews: {
        date: ReactNodeView.fromComponent(
          DateNodeView,
          portalProviderAPI,
          eventDispatcher
        )
      }
    }
  })
}

export { getPluginState }
export default createPlugin
