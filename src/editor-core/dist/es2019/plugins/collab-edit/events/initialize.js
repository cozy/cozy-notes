import { Step } from 'prosemirror-transform'
import memoizeOne from 'memoize-one'
import { subscribe } from './handlers'
import { pluginKey } from '../plugin-key'

const initCollab = (collabEditProvider, view) => {
  collabEditProvider.initialize(
    () => view.state,
    json => Step.fromJSON(view.state.schema, json)
  )
}

const initCollabMemo = memoizeOne(initCollab)
export const initialize = ({ options, providerFactory, view }) => provider => {
  let cleanup
  const pluginState = pluginKey.getState(view.state)

  if (pluginState.isReady && cleanup) {
    cleanup()
  }

  cleanup = subscribe(view, provider, options, providerFactory) // Initialize provider

  /**
   * We only want to initialise once, if we reload/reconfigure this plugin
   * We dont want to re-init collab, it would break existing sessions
   */

  initCollabMemo(provider, view)
  return cleanup
}
