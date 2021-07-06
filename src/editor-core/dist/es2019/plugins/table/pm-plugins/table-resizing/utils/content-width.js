import { unitToNumber } from './unit-to-number' // calculates content width of a cell

export function contentWidth(
  elem,
  container,
  colWidths = [],
  canvas = document.createElement('canvas')
) {
  return calcContentWidth(elem, container || elem, canvas, colWidths)
}

function calcContentWidth(elem, container, canvas, colWidths) {
  const flowWidths = []
  let curWidth = 0

  for (let i = 0; i < elem.childNodes.length; i++) {
    const child = elem.childNodes[i]

    if (child.nodeType === Node.COMMENT_NODE) {
      continue
    }

    if (child.nodeType === Node.TEXT_NODE) {
      const parent = child.parentNode
      const parentStyle = getComputedStyle(parent)
      let contentLength = 0

      if (parent.nodeName === 'CODE' || parent.nodeName === 'PRE') {
        contentLength = handlePreText(
          canvas,
          parent,
          child.textContent,
          parentStyle.font
        )
      } else {
        contentLength = measureText(canvas, child.textContent, parentStyle.font)
      }

      const left = parent.offsetLeft - container.offsetLeft
      flowWidths.push(curWidth)
      curWidth += contentLength + left // If the text isn't meant to wrap, we should set that as a hard limit.

      if (parentStyle.whiteSpace === 'nowrap') {
        // + 3 is for date offset plus cursor
        // TODO There should be a programmatic way to get this.
        colWidths.push(parent.offsetWidth + 3)
      }
    } else {
      // FIXME: doesn't quite work right with spacing
      const style = getComputedStyle(child)

      if (
        style.minWidth &&
        style.minWidth.endsWith('px') &&
        style.minWidth !== '0px'
      ) {
        colWidths.push(unitToNumber(style.minWidth))
      }

      const { width } = contentWidth(child, container, colWidths, canvas)

      if (style.display && style.display.indexOf('inline') > -1) {
        // is inline element, add to curWidth
        curWidth += width
      } else {
        // block element, reset curWidth
        flowWidths.push(curWidth)
        curWidth = width
      }
    }
  }

  flowWidths.push(curWidth)
  return {
    minWidth: colWidths.reduce((oldMax, width) => Math.max(width, oldMax), 0),
    width: flowWidths.reduce((oldMax, width) => Math.max(width, oldMax), 0)
  }
}

function measureText(canvas, text, font) {
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return 0
  }

  if (font) {
    ctx.font = font
  }

  return Math.round(ctx.measureText(text || '').width)
}

function handlePreText(canvas, node, textContent, font) {
  let parent = node

  if (node.nodeName === 'CODE') {
    parent = node.parentNode
  }

  const computedStyle = getComputedStyle(parent)

  if (textContent && computedStyle.whiteSpace === 'pre') {
    // If white space is pre grab the longest line in the block.
    return textContent
      .split('\n')
      .reduce(
        (acc, current) => Math.max(measureText(canvas, current, font), acc),
        0
      )
  }

  return measureText(canvas, textContent, font)
}
