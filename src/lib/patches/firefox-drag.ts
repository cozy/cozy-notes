/**
 * This patch provides a way to handle a prosemirror bug happening in Firefox when dragging images
 * Use initFirefoxDrag(firefoxElement()) when you want to start listening to drag events
 * Use removeFirefoxDrag(firefoxElement()) when you're leaving your drag context
 *
 * Removing the listeners is not mandatory but healthy for the application performance
 * A good place to do it, if using React, is in the componentWillUnmount() method or in a useEffect() return function
 */

const handleDragStart = (): void =>
  document
    .querySelectorAll('.ProseMirror > p')
    .forEach(p => p.setAttribute('contenteditable', 'false'))

const handleDragEnd = (): void =>
  document
    .querySelectorAll('.ProseMirror > p')
    .forEach(p => p.setAttribute('contenteditable', ''))

export const firefoxElement = (): Element | null =>
  document.querySelector('.ua-firefox')

export const initFirefoxDrag = (element: Element | null): void => (
  element?.addEventListener('dragstart', handleDragStart),
  element?.addEventListener('dragend', handleDragEnd)
)

export const removeFirefoxDrag = (element: Element | null): void => (
  element?.removeEventListener('dragstart', handleDragStart),
  element?.removeEventListener('dragend', handleDragEnd)
)
