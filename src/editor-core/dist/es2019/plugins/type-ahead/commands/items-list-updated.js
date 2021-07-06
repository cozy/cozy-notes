import { ACTIONS } from '../pm-plugins/actions'
import { pluginKey } from '../pm-plugins/plugin-key'
export const itemsListUpdated = items => (state, dispatch) => {
  if (dispatch) {
    dispatch(
      state.tr.setMeta(pluginKey, {
        action: ACTIONS.ITEMS_LIST_UPDATED,
        items
      })
    )
  }

  return true
}
