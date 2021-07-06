import { collab } from 'prosemirror-collab'
import { createPlugin, pluginKey } from './plugin'
export { CollabProvider } from './provider'
import { sendTransaction } from './events/send-transaction'
import { addSynchronyErrorAnalytics } from './analytics'
export { pluginKey }

const providerBuilder = collabEditProviderPromise => async (
  codeToExecute,
  onError
) => {
  try {
    const provider = await collabEditProviderPromise

    if (provider) {
      return codeToExecute(provider)
    }
  } catch (err) {
    if (onError) {
      onError(err)
    } else {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  }
}

const collabEditPlugin = options => {
  let providerResolver = () => {}

  const collabEditProviderPromise = new Promise(_providerResolver => {
    providerResolver = _providerResolver
  })
  const executeProviderCode = providerBuilder(collabEditProviderPromise)
  return {
    name: 'collabEdit',

    pmPlugins() {
      const { useNativePlugin = false, userId = null } = options || {}
      return [
        ...(useNativePlugin
          ? [
              {
                name: 'pmCollab',
                plugin: () =>
                  collab({
                    clientID: userId
                  })
              }
            ]
          : []),
        {
          name: 'collab',
          plugin: ({ dispatch, providerFactory }) => {
            providerFactory &&
              providerFactory.subscribe(
                'collabEditProvider',
                (_name, providerPromise) => {
                  if (providerPromise) {
                    providerPromise.then(provider => providerResolver(provider))
                  }
                }
              )
            return createPlugin(
              dispatch,
              providerFactory,
              executeProviderCode,
              options
            )
          }
        }
      ]
    },

    onEditorViewStateUpdated(props) {
      const addErrorAnalytics = addSynchronyErrorAnalytics(
        props.newEditorState,
        props.newEditorState.tr
      )
      executeProviderCode(sendTransaction(props), addErrorAnalytics)
    }
  }
}

export default collabEditPlugin
