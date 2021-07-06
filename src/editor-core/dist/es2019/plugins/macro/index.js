import { Plugin } from 'prosemirror-state'
import { setMacroProvider } from './actions'
import { pluginKey } from './plugin-key'
export {
  insertMacroFromMacroBrowser,
  resolveMacro,
  runMacroAutoConvert,
  setMacroProvider
} from './actions'
export const createPlugin = (dispatch, providerFactory) =>
  new Plugin({
    state: {
      init: () => ({
        macroProvider: null
      }),

      apply(tr, state) {
        const meta = tr.getMeta(pluginKey)

        if (meta) {
          const newState = { ...state, ...meta }
          dispatch(pluginKey, newState)
          return newState
        }

        return state
      }
    },
    key: pluginKey,
    view: view => {
      const handleProvider = (_name, provider) =>
        provider && setMacroProvider(provider)(view) // make sure editable DOM node is mounted

      if (view.dom.parentNode) {
        providerFactory.subscribe('macroProvider', handleProvider)
      }

      return {
        destroy() {
          providerFactory.unsubscribe('macroProvider', handleProvider)
        }
      }
    }
  })

const macroPlugin = () => ({
  name: 'macro',

  pmPlugins() {
    return [
      {
        name: 'macro',
        plugin: ({ dispatch, providerFactory }) =>
          createPlugin(dispatch, providerFactory)
      }
    ]
  }
})

export default macroPlugin
