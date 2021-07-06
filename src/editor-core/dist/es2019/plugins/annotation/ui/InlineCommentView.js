import React from 'react'
import { findDomRefAtPos } from 'prosemirror-utils'
import { AnnotationViewWrapper } from './AnnotationViewWrapper'
import { AnnotationTestIds } from '../types'
import {
  getAnnotationViewKey,
  getSelectionPositions,
  getPluginState
} from '../utils'
import {
  removeInlineCommentNearSelection,
  updateInlineCommentResolvedState,
  setInlineCommentDraftState,
  createAnnotation,
  closeComponent
} from '../commands'
import {
  ACTION,
  ACTION_SUBJECT,
  EVENT_TYPE,
  ACTION_SUBJECT_ID
} from '../../analytics'
import { RESOLVE_METHOD } from '../../analytics/types/inline-comment-events'

const findPosForDOM = sel => {
  const { $from, from } = sel // Retrieve current TextNode

  const index = $from.index()
  const node = index < $from.parent.childCount && $from.parent.child(index) // Right edge of a mark.

  if (
    !node &&
    $from.nodeBefore &&
    $from.nodeBefore.isText &&
    $from.nodeBefore.marks.find(mark => mark.type.name === 'annotation')
  ) {
    return from - 1
  }

  return from
}

export function InlineCommentView({
  providers,
  editorView,
  dispatchAnalyticsEvent
}) {
  // As inlineComment is the only annotation present, this function is not generic
  const { inlineComment: inlineCommentProvider } = providers
  const { state, dispatch } = editorView
  const {
    createComponent: CreateComponent,
    viewComponent: ViewComponent
  } = inlineCommentProvider
  const inlineCommentState = getPluginState(state)
  const { bookmark, selectedAnnotations, annotations } = inlineCommentState
  const selection = getSelectionPositions(state, inlineCommentState)
  const dom = findDomRefAtPos(
    findPosForDOM(selection),
    editorView.domAtPos.bind(editorView)
  ) // Create Component

  if (bookmark) {
    if (!CreateComponent) {
      return null
    } //getting all text between bookmarked positions

    const textSelection = state.doc.textBetween(selection.from, selection.to)
    return /*#__PURE__*/ React.createElement(
      'div',
      {
        'data-testid': AnnotationTestIds.floatingComponent
      },
      /*#__PURE__*/ React.createElement(CreateComponent, {
        dom: dom,
        textSelection: textSelection,
        onCreate: id => {
          createAnnotation(id)(editorView.state, editorView.dispatch)
          !editorView.hasFocus() && editorView.focus()
        },
        onClose: () => {
          setInlineCommentDraftState(false)(
            editorView.state,
            editorView.dispatch
          )
          !editorView.hasFocus() && editorView.focus()
        }
      })
    )
  } // View Component

  const activeAnnotations = selectedAnnotations.filter(
    mark => annotations[mark.id] === false
  )

  if (!ViewComponent || activeAnnotations.length === 0) {
    return null
  }

  const onAnnotationViewed = () => {
    if (!dispatchAnalyticsEvent) {
      return
    } // fire analytics

    const payload = {
      action: ACTION.VIEWED,
      actionSubject: ACTION_SUBJECT.ANNOTATION,
      actionSubjectId: ACTION_SUBJECT_ID.INLINE_COMMENT,
      eventType: EVENT_TYPE.TRACK,
      attributes: {
        overlap: activeAnnotations.length ? activeAnnotations.length - 1 : 0
      }
    }
    dispatchAnalyticsEvent(payload)
  }

  if (!selectedAnnotations) {
    return null
  }

  return /*#__PURE__*/ React.createElement(
    AnnotationViewWrapper,
    {
      'data-testid': AnnotationTestIds.floatingComponent,
      key: getAnnotationViewKey(activeAnnotations),
      onViewed: onAnnotationViewed
    },
    /*#__PURE__*/ React.createElement(ViewComponent, {
      annotations: activeAnnotations,
      dom: dom,
      onDelete: id => removeInlineCommentNearSelection(id)(state, dispatch),
      onResolve: id =>
        updateInlineCommentResolvedState(
          {
            [id]: true
          },
          RESOLVE_METHOD.COMPONENT
        )(editorView.state, editorView.dispatch),
      onClose: () => {
        closeComponent()(editorView.state, editorView.dispatch)
      }
    })
  )
}
