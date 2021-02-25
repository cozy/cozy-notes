import { Plugin } from 'prosemirror-state'
import { isPastedFile } from '@atlaskit/editor-core/utils/clipboard'
import { isDroppedFile } from '@atlaskit/editor-core/utils/drag-drop'
import { canInsertMedia, isMediaSelected } from '../utils'
import { insertExternalImage, startImageUpload } from './commands'
import { stateKey } from './plugin-key'

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

export const createPlugin = ({ dispatch, providerFactory }) => {
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
        console.error('name', name)
        console.error('provider', provider)
        if (name !== 'imageUploadProvider' || !provider) {
          return
        }

        try {
          uploadHandler = await provider
        } catch (e) {
          uploadHandler = undefined
        }
      }

      providerFactory.subscribe('imageUploadProvider', handleProvider)
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
            uploadHandler(currentState.activeUpload.event, options =>
              insertExternalImage(options)(view.state, view.dispatch)
            )
          }
        },

        destroy() {
          providerFactory.unsubscribe('imageUploadProvider', handleProvider)
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
