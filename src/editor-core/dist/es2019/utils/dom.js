/**
 * Walks a DOM tree up to the provided `stopElement`, or if falsy before.
 * @param element
 * @param stopElement
 */
export function walkUpTreeUntil(element, shouldStop) {
  let rootElement = element

  while (rootElement && rootElement.parentElement && !shouldStop(rootElement)) {
    rootElement = rootElement.parentElement
  }

  return rootElement
}
/**
 * Takes all children out from wrapped el and puts them directly inside
 * the parent el, at the wrapped el's position
 */

export function unwrap(parent, wrapped) {
  const docsFragment = document.createDocumentFragment()
  Array.from(wrapped.children).forEach(child => {
    docsFragment.appendChild(child)
  })
  parent.replaceChild(docsFragment, wrapped)
}
/**
 * Walks up DOM removing elements if they are empty until it finds
 * one that is not
 */

export function removeNestedEmptyEls(el) {
  while (
    el.parentElement &&
    el.childElementCount === 0 &&
    el.textContent === ''
  ) {
    const parentEl = el.parentElement
    parentEl.removeChild(el)
    el = parentEl
  }
}
/**
 * IE11 doesn't support classList to SVGElements
 **/

export const containsClassName = (node, className) => {
  if (!node) {
    return false
  }

  if (node.classList && node.classList.contains) {
    return node.classList.contains(className)
  }

  if (!node.className) {
    return false
  }

  const classNames =
    typeof node.className.baseVal === 'string'
      ? node.className.baseVal
      : node.className
  return classNames.split(' ').indexOf(className) !== -1
}
export function closest(node, s) {
  if (!node) {
    return null
  }

  let el = node

  if (!document.documentElement || !document.documentElement.contains(el)) {
    return null
  }

  if (el.closest) {
    return el.closest(s)
  }

  do {
    const matchfn = el.matches ? el.matches : el.msMatchesSelector

    if (matchfn && matchfn.call(el, s)) {
      return el
    }

    el = el.parentElement || el.parentNode
  } while (el !== null && el.nodeType === 1)

  return null
}
/**
 * Replacement for Element.closest, until it becomes widely implemented
 * Returns the ancestor element of a particular type if exists or null
 */

export function closestElement(node, s) {
  return closest(node, s)
}
export function parsePx(pxStr) {
  if (!pxStr.endsWith('px')) {
    return undefined
  }

  const maybeNumber = parseInt(pxStr, 10)
  return !Number.isNaN(maybeNumber) ? maybeNumber : undefined
}
// does typescript have function templates yet?
export function mapElem(elem, callback) {
  const array = []

  for (let i = 0; i < elem.childElementCount; i++) {
    array.push(callback(elem.children[i], i, elem))
  }

  return array
}
export function maphElem(elem, callback) {
  return mapElem(elem, callback)
}
