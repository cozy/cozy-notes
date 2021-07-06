import { RESOLVE_METHOD } from './../../analytics/types/inline-comment-events'
import { Plugin } from 'prosemirror-state'
import { AnnotationTypes } from '@atlaskit/adf-schema'
import { AnnotationNodeView } from '../nodeviews'
import {
  updateInlineCommentResolvedState,
  updateMouseState,
  clearDirtyMark,
  setInlineCommentsVisibility
} from '../commands'
import {
  getAllAnnotations,
  inlineCommentPluginKey,
  getPluginState
} from '../utils'
import { createPluginState } from './plugin-factory'

const fetchProviderStates = async (provider, annotationIds) => {
  const data = await provider.getState(annotationIds)
  let result = {}
  data.forEach(annotation => {
    if (annotation.annotationType === AnnotationTypes.INLINE_COMMENT) {
      result[annotation.id] = annotation.state.resolved
    }
  })
  return result
} // fetchState is unable to return a command as it's runs async and may dispatch at a later time
// Requires `editorView` instead of the decomposition as the async means state may end up stale

const fetchState = async (provider, annotationIds, editorView) => {
  if (!annotationIds || !annotationIds.length) {
    return
  }

  const inlineCommentStates = await fetchProviderStates(provider, annotationIds)

  if (editorView.dispatch) {
    updateInlineCommentResolvedState(inlineCommentStates)(
      editorView.state,
      editorView.dispatch
    )
  }
}

const initialState = (disallowOnWhitespace = false) => {
  return {
    annotations: {},
    selectedAnnotations: [],
    mouseData: {
      isSelecting: false
    },
    disallowOnWhitespace,
    isVisible: true
  }
}

const hideToolbar = (state, dispatch) => () => {
  updateMouseState({
    isSelecting: true
  })(state, dispatch)
} // Subscribe to updates from consumer

const onResolve = (state, dispatch) => annotationId => {
  updateInlineCommentResolvedState(
    {
      [annotationId]: true
    },
    RESOLVE_METHOD.CONSUMER
  )(state, dispatch)
}

const onUnResolve = (state, dispatch) => annotationId => {
  updateInlineCommentResolvedState({
    [annotationId]: false
  })(state, dispatch)
}

const onMouseUp = (state, dispatch) => e => {
  const {
    mouseData: { isSelecting }
  } = getPluginState(state)

  if (isSelecting) {
    updateMouseState({
      isSelecting: false
    })(state, dispatch)
  }
}

const onSetVisibility = view => isVisible => {
  const { state, dispatch } = view
  setInlineCommentsVisibility(isVisible)(state, dispatch)

  if (isVisible) {
    // PM retains focus when we click away from the editor.
    // This will restore the visual aspect of the selection,
    // otherwise it will seem a floating toolbar will appear
    // for no reason.
    view.focus()
  }
}

export const inlineCommentPlugin = options => {
  const { provider, portalProviderAPI, eventDispatcher } = options
  return new Plugin({
    key: inlineCommentPluginKey,
    state: createPluginState(
      options.dispatch,
      initialState(provider.disallowOnWhitespace)
    ),

    view(editorView) {
      // Get initial state
      // Need to pass `editorView` to mitigate editor state going stale
      fetchState(provider, getAllAnnotations(editorView.state.doc), editorView)

      const resolve = annotationId =>
        onResolve(editorView.state, editorView.dispatch)(annotationId)

      const unResolve = annotationId =>
        onUnResolve(editorView.state, editorView.dispatch)(annotationId)

      const mouseUp = event =>
        onMouseUp(editorView.state, editorView.dispatch)(event)

      const setVisibility = isVisible => onSetVisibility(editorView)(isVisible)

      const { updateSubscriber } = provider

      if (updateSubscriber) {
        updateSubscriber
          .on('resolve', resolve)
          .on('delete', resolve)
          .on('unresolve', unResolve)
          .on('create', unResolve)
          .on('setvisibility', setVisibility)
      }

      editorView.root.addEventListener('mouseup', mouseUp)
      return {
        update(view, _prevState) {
          const { dirtyAnnotations } = getPluginState(view.state)

          if (!dirtyAnnotations) {
            return
          }

          clearDirtyMark()(view.state, view.dispatch)
          fetchState(provider, getAllAnnotations(view.state.doc), view)
        },

        destroy() {
          editorView.root.removeEventListener('mouseup', mouseUp)

          if (updateSubscriber) {
            updateSubscriber
              .off('resolve', resolve)
              .off('delete', resolve)
              .off('unresolve', unResolve)
              .off('create', unResolve)
              .off('setvisibility', setVisibility)
          }
        }
      }
    },

    props: {
      nodeViews: {
        annotation: (node, view, getPos) =>
          new AnnotationNodeView(
            node,
            view,
            getPos,
            portalProviderAPI,
            eventDispatcher
          ).init()
      },
      handleDOMEvents: {
        mousedown: view => {
          const pluginState = getPluginState(view.state)

          if (!pluginState.mouseData.isSelecting) {
            hideToolbar(view.state, view.dispatch)()
          }

          return false
        }
      },

      decorations(state) {
        const { draftDecorationSet } = getPluginState(state)
        return draftDecorationSet
      }
    }
  })
}
