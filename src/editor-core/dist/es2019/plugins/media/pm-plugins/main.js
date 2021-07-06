import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React from 'react'
import ReactDOM from 'react-dom'
import { NodeSelection, Plugin } from 'prosemirror-state'
import { insertPoint } from 'prosemirror-transform'
import { Decoration, DecorationSet } from 'prosemirror-view'
import { ErrorReporter } from '@atlaskit/editor-common'
import assert from 'assert'
import { findDomRefAtPos, isNodeSelection } from 'prosemirror-utils'
import { insertMediaSingleNode, isMediaSingle } from '../utils/media-single'
import DropPlaceholder from '../ui/Media/DropPlaceholder'
import { insertMediaGroupNode } from '../utils/media-files'
import { removeMediaNode, splitMediaGroup } from '../utils/media-common'
import * as helpers from '../commands/helpers'
import { updateMediaNodeAttrs } from '../commands/helpers'
import { stateKey } from './plugin-key'
import PickerFacade from '../picker-facade'
import { INPUT_METHOD } from '../../analytics/types'
import { isImage } from '../utils/is-image'
export { stateKey } from './plugin-key'

const createDropPlaceholder = allowDropLine => {
  const dropPlaceholder = document.createElement('div')

  if (allowDropLine) {
    ReactDOM.render(
      /*#__PURE__*/ React.createElement(DropPlaceholder, {
        type: 'single'
      }),
      dropPlaceholder
    )
  } else {
    ReactDOM.render(
      /*#__PURE__*/ React.createElement(DropPlaceholder),
      dropPlaceholder
    )
  }

  return dropPlaceholder
}

const MEDIA_RESOLVED_STATES = ['ready', 'error', 'cancelled']
export class MediaPluginStateImplementation {
  constructor(_state, options, reactContext, mediaOptions, _dispatch) {
    _defineProperty(this, 'allowsUploads', false)

    _defineProperty(this, 'ignoreLinks', false)

    _defineProperty(this, 'waitForMediaUpload', true)

    _defineProperty(this, 'allUploadsFinished', true)

    _defineProperty(this, 'showDropzone', false)

    _defineProperty(this, 'layout', 'center')

    _defineProperty(this, 'mediaNodes', [])

    _defineProperty(this, 'mediaGroupNodes', {})

    _defineProperty(this, 'mobileUploadComplete', {})

    _defineProperty(this, 'pendingTask', Promise.resolve(null))

    _defineProperty(this, 'destroyed', false)

    _defineProperty(this, 'removeOnCloseListener', () => {})

    _defineProperty(this, 'onPopupToogleCallback', () => {})

    _defineProperty(this, 'pickers', [])

    _defineProperty(this, 'pickerPromises', [])

    _defineProperty(
      this,
      'onContextIdentifierProvider',
      async (_name, provider) => {
        if (provider) {
          this.contextIdentifierProvider = await provider
        }
      }
    )

    _defineProperty(this, 'setMediaProvider', async mediaProvider => {
      if (!mediaProvider) {
        this.destroyPickers()
        this.allowsUploads = false

        if (!this.destroyed) {
          this.view.dispatch(
            this.view.state.tr.setMeta(stateKey, {
              allowsUploads: this.allowsUploads
            })
          )
        }

        return
      } // TODO disable (not destroy!) pickers until mediaProvider is resolved

      try {
        this.mediaProvider = await mediaProvider // TODO [MS-2038]: remove once context api is removed
        // We want to re assign the view and upload configs if they are missing for backwards compatibility
        // as currently integrators can pass context || mediaClientConfig

        if (!this.mediaProvider.viewMediaClientConfig) {
          const viewMediaClientConfig = this.mediaProvider.viewMediaClientConfig

          if (viewMediaClientConfig) {
            this.mediaProvider.viewMediaClientConfig = viewMediaClientConfig
          }
        }

        assert(
          this.mediaProvider.viewMediaClientConfig,
          `MediaProvider promise did not resolve to a valid instance of MediaProvider - ${this.mediaProvider}`
        )
      } catch (err) {
        const wrappedError = new Error(
          `Media functionality disabled due to rejected provider: ${err.message}`
        )
        this.errorReporter.captureException(wrappedError)
        this.destroyPickers()
        this.allowsUploads = false

        if (!this.destroyed) {
          this.view.dispatch(
            this.view.state.tr.setMeta(stateKey, {
              allowsUploads: this.allowsUploads
            })
          )
        }

        return
      }

      this.mediaClientConfig = this.mediaProvider.viewMediaClientConfig
      this.allowsUploads = !!this.mediaProvider.uploadMediaClientConfig
      const { view, allowsUploads } = this // make sure editable DOM node is mounted

      if (!this.destroyed && view.dom.parentNode) {
        // make PM plugin aware of the state change to update UI during 'apply' hook
        view.dispatch(
          view.state.tr.setMeta(stateKey, {
            allowsUploads
          })
        )
      }

      if (this.allowsUploads) {
        this.uploadMediaClientConfig = this.mediaProvider.uploadMediaClientConfig

        if (this.mediaProvider.uploadParams && this.uploadMediaClientConfig) {
          await this.initPickers(
            this.mediaProvider.uploadParams,
            PickerFacade,
            this.reactContext
          )
        } else {
          this.destroyPickers()
        }
      } else {
        this.destroyPickers()
      }
    })

    _defineProperty(this, 'getMediaOptions', () => this.options)

    _defineProperty(
      this,
      'hasUserAuthProvider',
      () =>
        !!this.uploadMediaClientConfig &&
        !!this.uploadMediaClientConfig.userAuthProvider
    )

    _defineProperty(
      this,
      'insertFile',
      (mediaState, onMediaStateChanged, pickerType) => {
        const mediaStateWithContext = {
          ...mediaState,
          contextId: this.contextIdentifierProvider
            ? this.contextIdentifierProvider.objectId
            : undefined
        }
        const collection = this.collectionFromProvider()

        if (collection === undefined) {
          return
        }

        if (
          this.mediaOptions &&
          this.mediaOptions.allowMarkingUploadsAsIncomplete
        ) {
          this.mobileUploadComplete[mediaStateWithContext.id] = false
        } // We need to dispatch the change to event dispatcher only for successful files

        if (mediaState.status !== 'error') {
          this.updateAndDispatch({
            allUploadsFinished: false
          })
        }

        if (
          isMediaSingle(
            this.view.state.schema,
            mediaStateWithContext.fileMimeType
          )
        ) {
          insertMediaSingleNode(
            this.view,
            mediaStateWithContext,
            this.getInputMethod(pickerType),
            collection,
            this.mediaOptions && this.mediaOptions.alignLeftOnInsert
          )
        } else {
          insertMediaGroupNode(
            this.view,
            [mediaStateWithContext],
            collection,
            this.getInputMethod(pickerType)
          )
        } // do events when media state changes

        onMediaStateChanged(this.handleMediaState) // handle waiting for upload complete

        const isEndState = state =>
          state.status && MEDIA_RESOLVED_STATES.indexOf(state.status) !== -1

        if (!isEndState(mediaStateWithContext)) {
          // Chain the previous promise with a new one for this media item
          this.addPendingTask(
            new Promise(resolve => {
              onMediaStateChanged(newState => {
                // When media item reaches its final state, remove listener and resolve
                if (isEndState(newState)) {
                  resolve(newState)
                }
              })
            })
          )
          this.pendingTask.then(() => {
            this.updateAndDispatch({
              allUploadsFinished: true
            })
          })
        } // refocus the view

        const { view } = this

        if (!view.hasFocus()) {
          view.focus()
        }
      }
    )

    _defineProperty(this, 'addPendingTask', promise => {
      const currentPendingTask = this.pendingTask

      const pendingPromise = () => currentPendingTask

      this.pendingTask = promise.then(pendingPromise, pendingPromise)
    })

    _defineProperty(this, 'splitMediaGroup', () => splitMediaGroup(this.view))

    _defineProperty(this, 'onPopupPickerClose', () => {
      this.onPopupToogleCallback(false)
    })

    _defineProperty(this, 'shouldUseMediaPickerPopup', () => {
      if (
        !this.mediaOptions ||
        (this.mediaOptions &&
          this.mediaOptions.useMediaPickerPopup === undefined)
      ) {
        return this.hasUserAuthProvider()
      }

      return !!this.mediaOptions.useMediaPickerPopup
    })

    _defineProperty(this, 'showMediaPicker', () => {
      if (this.openMediaPickerBrowser && !this.shouldUseMediaPickerPopup()) {
        return this.openMediaPickerBrowser()
      }

      if (!this.popupPicker) {
        return
      }

      this.popupPicker.show()
      this.onPopupToogleCallback(true)
    })

    _defineProperty(this, 'setBrowseFn', browseFn => {
      this.openMediaPickerBrowser = browseFn
    })

    _defineProperty(this, 'onPopupToggle', onPopupToogleCallback => {
      this.onPopupToogleCallback = onPopupToogleCallback
    })

    _defineProperty(this, 'waitForPendingTasks', (timeout, lastTask) => {
      if (lastTask && this.pendingTask === lastTask) {
        return lastTask
      }

      const chainedPromise = this.pendingTask.then(() =>
        // Call ourselves to make sure that no new pending tasks have been
        // added before the current promise has resolved.
        this.waitForPendingTasks(undefined, this.pendingTask)
      )

      if (!timeout) {
        return chainedPromise
      }

      let rejectTimeout
      const timeoutPromise = new Promise((_resolve, reject) => {
        rejectTimeout = window.setTimeout(
          () =>
            reject(
              new Error(`Media operations did not finish in ${timeout} ms`)
            ),
          timeout
        )
      })
      return Promise.race([
        timeoutPromise,
        chainedPromise.then(value => {
          clearTimeout(rejectTimeout)
          return value
        })
      ])
    })

    _defineProperty(this, 'handleMediaNodeRemoval', (node, getPos) => {
      let getNode = node

      if (!getNode) {
        getNode = this.view.state.doc.nodeAt(getPos())
      }

      removeMediaNode(this.view, getNode, getPos)
    })

    _defineProperty(this, 'handleMediaNodeMount', (node, getPos) => {
      this.mediaNodes.unshift({
        node,
        getPos
      })
    })

    _defineProperty(this, 'handleMediaNodeUnmount', oldNode => {
      this.mediaNodes = this.mediaNodes.filter(({ node }) => oldNode !== node)
    })

    _defineProperty(this, 'findMediaNode', id => {
      return helpers.findMediaSingleNode(this, id)
    })

    _defineProperty(this, 'destroyAllPickers', pickers => {
      pickers.forEach(picker => picker.destroy())
      this.pickers.splice(0, this.pickers.length)
    })

    _defineProperty(this, 'destroyPickers', () => {
      const { pickers, pickerPromises } = this // If pickerPromises and pickers are the same length
      // All pickers have resolved and we safely destroy them
      // Otherwise wait for them to resolve then destroy.

      if (pickerPromises.length === pickers.length) {
        this.destroyAllPickers(this.pickers)
      } else {
        Promise.all(pickerPromises).then(resolvedPickers =>
          this.destroyAllPickers(resolvedPickers)
        )
      }

      this.popupPicker = undefined
      this.customPicker = undefined
    })

    _defineProperty(this, 'getInputMethod', pickerType => {
      switch (pickerType) {
        case 'popup':
          return INPUT_METHOD.PICKER_CLOUD

        case 'clipboard':
          return INPUT_METHOD.CLIPBOARD

        case 'dropzone':
          return INPUT_METHOD.DRAG_AND_DROP
      }

      return
    })

    _defineProperty(
      this,
      'updateMediaNodeAttrs',
      (id, attrs, isMediaSingle) => {
        const { view } = this

        if (!view) {
          return
        }

        return updateMediaNodeAttrs(
          id,
          attrs,
          isMediaSingle
        )(view.state, view.dispatch)
      }
    )

    _defineProperty(this, 'handleMediaState', state => {
      switch (state.status) {
        case 'error':
          const { uploadErrorHandler } = this.options

          if (uploadErrorHandler) {
            uploadErrorHandler(state)
          }

          break

        case 'mobile-upload-end':
          const attrs = {
            id: state.publicId || state.id
          }

          if (typeof state.collection === 'string') {
            attrs.collection = state.collection
          }

          this.updateMediaNodeAttrs(
            state.id,
            attrs,
            isMediaSingle(this.view.state.schema, state.fileMimeType)
          ) // mark mobile upload as complete

          this.mobileUploadComplete[attrs.id] = true
          delete this.mediaGroupNodes[state.id]
          break
      }
    })

    _defineProperty(this, 'isMobileUploadCompleted', mediaId =>
      helpers.isMobileUploadCompleted(this, mediaId)
    )

    _defineProperty(this, 'removeNodeById', state => {
      const { id } = state
      const mediaNodeWithPos = helpers.findMediaNode(
        this,
        id,
        isImage(state.fileMimeType)
      )

      if (mediaNodeWithPos) {
        removeMediaNode(
          this.view,
          mediaNodeWithPos.node,
          mediaNodeWithPos.getPos
        )
      }
    })

    _defineProperty(this, 'removeSelectedMediaContainer', () => {
      const { view } = this
      const selectedNode = this.selectedMediaContainerNode()

      if (!selectedNode) {
        return false
      }

      let { from } = view.state.selection
      removeMediaNode(view, selectedNode.firstChild, () => from + 1)
      return true
    })

    _defineProperty(this, 'selectedMediaContainerNode', () => {
      const { selection, schema } = this.view.state

      if (
        selection instanceof NodeSelection &&
        (selection.node.type === schema.nodes.mediaSingle ||
          selection.node.type === schema.nodes.mediaGroup)
      ) {
        return selection.node
      }

      return
    })

    _defineProperty(this, 'handleDrag', dragState => {
      const isActive = dragState === 'enter'

      if (this.showDropzone === isActive) {
        return
      }

      this.showDropzone = isActive
      const { dispatch, state } = this.view // Trigger state change to be able to pick it up in the decorations handler

      dispatch(state.tr)
    })

    this.reactContext = reactContext
    this.options = options
    this.mediaOptions = mediaOptions
    this.dispatch = _dispatch
    this.waitForMediaUpload =
      options.waitForMediaUpload === undefined
        ? true
        : options.waitForMediaUpload
    const { nodes } = _state.schema
    assert(
      nodes.media && (nodes.mediaGroup || nodes.mediaSingle),
      'Editor: unable to init media plugin - media or mediaGroup/mediaSingle node absent in schema'
    )
    options.providerFactory.subscribe('mediaProvider', (_name, provider) =>
      this.setMediaProvider(provider)
    )
    options.providerFactory.subscribe(
      'contextIdentifierProvider',
      this.onContextIdentifierProvider
    )
    this.errorReporter = options.errorReporter || new ErrorReporter()
  }

  updateElement() {
    let newElement
    const selectedContainer = this.selectedMediaContainerNode()
    const { mediaSingle } = this.view.state.schema.nodes

    if (selectedContainer && selectedContainer.type === mediaSingle) {
      newElement = this.getDomElement(this.view.domAtPos.bind(this.view))
    }

    if (this.element !== newElement) {
      this.element = newElement
    }
  }

  getDomElement(domAtPos) {
    const { selection, schema } = this.view.state

    if (!(selection instanceof NodeSelection)) {
      return
    }

    if (selection.node.type !== schema.nodes.mediaSingle) {
      return
    }

    const node = findDomRefAtPos(selection.from, domAtPos)

    if (node) {
      if (!node.childNodes.length) {
        return node.parentNode
      }

      const target = node.querySelector('.wrapper') || node
      return target
    }

    return
  }
  /**
   * we insert a new file by inserting a initial state for that file.
   *
   * called when we insert a new file via the picker (connected via pickerfacade)
   */

  setView(view) {
    this.view = view
  }
  /**
   * Called from React UI Component when user clicks on "Delete" icon
   * inside of it
   */

  destroy() {
    if (this.destroyed) {
      return
    }

    this.destroyed = true
    const { mediaNodes } = this
    mediaNodes.splice(0, mediaNodes.length)
    this.removeOnCloseListener()
    this.destroyPickers()
  }

  async initPickers(uploadParams, Picker, reactContext) {
    if (this.destroyed || !this.uploadMediaClientConfig) {
      return
    }

    const { errorReporter, pickers, pickerPromises } = this // create pickers if they don't exist, re-use otherwise

    if (!pickers.length) {
      const pickerFacadeConfig = {
        mediaClientConfig: this.uploadMediaClientConfig,
        errorReporter
      }
      const defaultPickerConfig = {
        uploadParams,
        proxyReactContext: reactContext(),
        useForgePlugins:
          (this.mediaOptions && this.mediaOptions.useForgePlugins) || false,
        featureFlags: this.mediaOptions && this.mediaOptions.featureFlags
      }

      if (this.options.customMediaPicker) {
        const customPicker = new Picker(
          'customMediaPicker',
          pickerFacadeConfig,
          this.options.customMediaPicker
        ).init()
        pickerPromises.push(customPicker)
        pickers.push((this.customPicker = await customPicker))
      } else if (this.shouldUseMediaPickerPopup()) {
        const popupPicker = new Picker(
          'popup',
          pickerFacadeConfig,
          defaultPickerConfig
        ).init()
        pickerPromises.push(popupPicker)
        pickers.push((this.popupPicker = await popupPicker))
        this.removeOnCloseListener = this.popupPicker.onClose(
          this.onPopupPickerClose
        )
      }

      pickers.forEach(picker => {
        picker.onNewMedia(this.insertFile)
      })
    } // set new upload params for the pickers

    pickers.forEach(picker => picker.setUploadParams(uploadParams))
  }

  collectionFromProvider() {
    return (
      this.mediaProvider &&
      this.mediaProvider.uploadParams &&
      this.mediaProvider.uploadParams.collection
    )
  }

  updateAndDispatch(props) {
    // update plugin state
    Object.keys(props).forEach(_key => {
      const key = _key
      const value = props[key]

      if (value !== undefined) {
        this[key] = value
      }
    })

    if (this.dispatch) {
      this.dispatch(stateKey, { ...this })
    }
  }
}
export const getMediaPluginState = state => stateKey.getState(state)
export const createPlugin = (
  _schema,
  options,
  reactContext,
  dispatch,
  mediaOptions
) => {
  const dropPlaceholder = createDropPlaceholder(
    mediaOptions && mediaOptions.allowDropzoneDropLine
  )
  return new Plugin({
    state: {
      init(_config, state) {
        return new MediaPluginStateImplementation(
          state,
          options,
          reactContext,
          mediaOptions,
          dispatch
        )
      },

      apply(tr, pluginState) {
        // remap editing media single position if we're in collab
        if (typeof pluginState.editingMediaSinglePos === 'number') {
          pluginState.editingMediaSinglePos = tr.mapping.map(
            pluginState.editingMediaSinglePos
          )
        }

        const meta = tr.getMeta(stateKey)

        if (meta) {
          const { allowsUploads } = meta
          pluginState.updateAndDispatch({
            allowsUploads:
              typeof allowsUploads === 'undefined'
                ? pluginState.allowsUploads
                : allowsUploads
          })
        } // NOTE: We're not calling passing new state to the Editor, because we depend on the view.state reference
        //       throughout the lifetime of view. We injected the view into the plugin state, because we dispatch()
        //       transformations from within the plugin state (i.e. when adding a new file).

        return pluginState
      }
    },

    filterTransaction(transaction, state) {
      // Media node inside mediaSingle should not be selected
      // We are relying on plugins/media/nodeviews/mediaNodeView/media.tsx#selectMediaSingleFromCard
      // to set selection on correct mediaSingle node,
      // We don't use 'appendTransaction' because we would like to avoid have additional transactions
      // http://product-fabric.atlassian.net/browse/ED-10091
      return !(
        transaction.selectionSet &&
        isNodeSelection(transaction.selection) &&
        transaction.selection.node.type === state.schema.nodes.media &&
        transaction.selection.$anchor.parent.type ===
          state.schema.nodes.mediaSingle
      )
    },

    key: stateKey,
    view: view => {
      const pluginState = getMediaPluginState(view.state)
      pluginState.setView(view)
      pluginState.updateElement()
      return {
        update: () => {
          pluginState.updateElement()
        }
      }
    },
    props: {
      decorations: state => {
        const pluginState = getMediaPluginState(state)

        if (!pluginState.showDropzone) {
          return
        }

        const {
          schema,
          selection: { $anchor }
        } = state // When a media is already selected

        if (state.selection instanceof NodeSelection) {
          const node = state.selection.node

          if (node.type === schema.nodes.mediaSingle) {
            const deco = Decoration.node(
              state.selection.from,
              state.selection.to,
              {
                class: 'richMedia-selected'
              }
            )
            return DecorationSet.create(state.doc, [deco])
          }

          return
        }

        let pos = $anchor.pos

        if (
          $anchor.parent.type !== schema.nodes.paragraph &&
          $anchor.parent.type !== schema.nodes.codeBlock
        ) {
          pos = insertPoint(state.doc, pos, schema.nodes.mediaGroup)
        }

        if (pos === null || pos === undefined) {
          return
        }

        const dropPlaceholders = [
          Decoration.widget(pos, dropPlaceholder, {
            key: 'drop-placeholder'
          })
        ]
        return DecorationSet.create(state.doc, dropPlaceholders)
      },
      nodeViews: options.nodeViews,

      handleTextInput(view) {
        getMediaPluginState(view.state).splitMediaGroup()
        return false
      }
    }
  })
}
