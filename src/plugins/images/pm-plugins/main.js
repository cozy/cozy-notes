import { Plugin } from 'prosemirror-state'
import { isPastedFile } from '@atlaskit/editor-core/utils/clipboard'
import { isDroppedFile } from '@atlaskit/editor-core/utils/drag-drop'
import { canInsertMedia, isMediaSelected } from '../utils'
import { insertExternalImage, startImageUpload } from './commands'
import { stateKey } from './plugin-key'
import ServiceClient from 'lib/collab/stack-client'
import CozyClient from 'cozy-client/dist/CozyClient'

const createDOMHandler = (pred, eventName) => (view, event) => {
  if (!pred(event)) {
    return false
  }

  event.preventDefault()
  event.stopPropagation()
  startImageUpload(event)(view.state, view.dispatch)
  return true
}

const getNewActiveUpload = (tr, pluginState) => {
  const meta = tr.getMeta(stateKey)

  if (meta && meta.name === 'START_UPLOAD') {
    return {
      event: meta.event
    }
  }

  return pluginState.activeUpload
}

export const createPlugin = ({ dispatch, providerFactory }, callback) => {
  let uploadHandler
  return new Plugin({
    state: {
      init(_config, state) {
        return {
          active: false,
          enabled: canInsertMedia(state),
          hidden: !state.schema.nodes.media || !state.schema.nodes.mediaSingle
        }
      },

      apply(tr, pluginState, _oldState, newState) {
        const newActive = isMediaSelected(newState)
        const newEnabled = canInsertMedia(newState)
        const newActiveUpload = getNewActiveUpload(tr, pluginState)
        if (
          newActive !== pluginState.active ||
          newEnabled !== pluginState.enabled ||
          newActiveUpload !== pluginState.activeUpload
        ) {
          const newPluginState = {
            ...pluginState,
            active: newActive,
            enabled: newEnabled,
            activeUpload: newActiveUpload
          }
          dispatch(stateKey, newPluginState)
          return newPluginState
        }

        return pluginState
      }
    },
    key: stateKey,
    view: () => {
      const handleProvider = async (name, provider) => {
        if (name !== 'CozyImageUploadProvider' || !provider) {
          return
        }

        try {
          uploadHandler = await provider
        } catch (e) {
          uploadHandler = undefined
        }
      }
      providerFactory.subscribe('CozyImageUploadProvider', (name, provider) => {
        return handleProvider(name, provider)
      })
      return {
        update(view, prevState) {
          const { state: editorState } = view
          const currentState = stateKey.getState(editorState) // if we've add a new upload to the state, execute the uploadHandler

          const oldState = stateKey.getState(prevState)
          if (
            currentState.activeUpload !== oldState.activeUpload &&
            currentState.activeUpload &&
            uploadHandler
          ) {
            uploadHandler(currentState.activeUpload.event, options => {
              const fromDom = CozyClient.fromDOM()
              const serviceClient = new ServiceClient({
                userId: 'cozy.localhost34',
                userName: 'cozy.localhost34',
                cozyClient: fromDom
              })

              const getBlob = () => {
                return new Promise(resolve => {
                  const file = window.document.querySelector([
                    '[data-file-input]'
                  ]).files[0]
                  const reader = new window.FileReader()

                  reader.readAsDataURL(file)

                  reader.onloadend = () => resolve(reader.result)
                })
              }

              getBlob().then(result => {
                serviceClient
                  .postImage(
                    Math.random(),
                    'a48c026755d28bff57d9307d4802a4a8',
                    result
                  )
                  .then(server => {
                    insertExternalImage({
                      ...options,
                      src: `http://cozy.localhost:8080${server.data.links.medium}`
                    })(view.state, view.dispatch)
                  })
              })
            })
          }
        },

        destroy() {
          providerFactory.unsubscribe('CozyImageUploadProvider', handleProvider)
        }
      }
    },
    props: {
      handleDOMEvents: {
        drop: createDOMHandler(isDroppedFile, 'atlassian.editor.image.drop'),
        paste: createDOMHandler(isPastedFile, 'atlassian.editor.image.paste')
      }
    }
  })
}
