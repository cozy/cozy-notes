import { closestElement } from '../../utils/dom'
import { createParagraphAtEnd } from '../../commands'
import { setCursorForTopLevelBlocks } from '../../plugins/selection/gap-cursor-selection' // we ignore all of the clicks made inside <div class="ak-editor-content-area" /> (but not clicks on the node itself)

const insideContentArea = ref => {
  while (ref) {
    if (ref.classList && ref.classList.contains('ak-editor-content-area')) {
      return true
    }

    ref = ref.parentNode
  }

  return false
}

const clickAreaClickHandler = (view, event) => {
  const contentArea = event.currentTarget.querySelector(
    '.ak-editor-content-area'
  )
  const editorFocused = !!(view && view.hasFocus())
  const target = event.target // @see https://product-fabric.atlassian.net/browse/ED-4287
  // click event gets triggered twice on a checkbox (on <label> first and then on <input>)
  // by the time it gets triggered on input, PM already re-renders nodeView and detaches it from DOM
  // which doesn't pass the check !contentArea.contains(event.target)

  const isInputClicked = target.nodeName === 'INPUT' // @see ED-5126

  const isPopupClicked = !!closestElement(target, '[data-editor-popup]') // Fixes issue when using a textarea for editor title in full page editor doesn't let user focus it.

  const isTextAreaClicked = target.nodeName === 'TEXTAREA'
  const targetIsNotContentArea = !contentArea
  const tragetIsNotChildOfContentArea = !insideContentArea(target.parentNode)
  const editorIsNotInFocus = editorFocused === false
  const isClickOutsideEditor =
    (targetIsNotContentArea ||
      tragetIsNotChildOfContentArea ||
      editorIsNotInFocus) &&
    !isInputClicked &&
    !isTextAreaClicked &&
    !isPopupClicked

  if (isClickOutsideEditor && view) {
    outsideProsemirrorEditorClickHandler(view, event)
  }
}

const outsideProsemirrorEditorClickHandler = (view, event) => {
  const { dispatch, dom } = view
  const editorFocused = !!(view && view.hasFocus())
  const isParagraphAppended = appendEmptyParagraph(event, dom, view, dispatch)
  const isGapCursorSet = setCursorForTopLevelBlocks(
    event,
    dom,
    view.posAtCoords.bind(view),
    editorFocused
  )(view.state, dispatch)

  if (isParagraphAppended || isGapCursorSet) {
    view.focus()
    event.stopPropagation()
    event.preventDefault()
  }
}

const appendEmptyParagraph = (event, dom, view, dispatch) => {
  const bottomAreaClicked = event.clientY > dom.getBoundingClientRect().bottom

  if (bottomAreaClicked) {
    return createParagraphAtEnd()(view.state, dispatch)
  }

  return false
}

export { clickAreaClickHandler }
