import {
  calcTableWidth,
  getBreakpoint,
  mapBreakpointToLayoutMaxWidth
} from '@atlaskit/editor-common'
import {
  akEditorDefaultLayoutWidth,
  akEditorFullWidthLayoutWidth,
  akEditorGutterPadding,
  akEditorWideLayoutWidth
} from '@atlaskit/editor-shared-styles'
import { containsClassName } from '../../../../../utils'
export const tableLayoutToSize = {
  default: akEditorDefaultLayoutWidth,
  wide: akEditorWideLayoutWidth,
  'full-width': akEditorFullWidthLayoutWidth
} // Translates named layouts in number values.

export function getLayoutSize(tableLayout, containerWidth = 0, options) {
  const { dynamicTextSizing, isFullWidthModeEnabled } = options

  if (isFullWidthModeEnabled) {
    return containerWidth
      ? Math.min(
          containerWidth - akEditorGutterPadding * 2,
          akEditorFullWidthLayoutWidth
        )
      : akEditorFullWidthLayoutWidth
  }

  const calculatedTableWidth = calcTableWidth(tableLayout, containerWidth, true)

  if (calculatedTableWidth.endsWith('px')) {
    return parseInt(calculatedTableWidth, 10)
  }

  if (dynamicTextSizing && tableLayout === 'default') {
    return getDefaultLayoutMaxWidth(containerWidth)
  }

  return tableLayoutToSize[tableLayout] || containerWidth
}
export function getDefaultLayoutMaxWidth(containerWidth) {
  return mapBreakpointToLayoutMaxWidth(getBreakpoint(containerWidth))
} // Does the current position point at a cell.

export function pointsAtCell($pos) {
  return $pos.parent.type.spec.tableRole === 'row' && $pos.nodeAfter
} // Get the current col width, handles colspan.

export function currentColWidth(view, cellPos, { colspan, colwidth }) {
  let width = colwidth && colwidth[colwidth.length - 1]

  if (width) {
    return width
  } // Not fixed, read current width from DOM

  let domWidth = view.domAtPos(cellPos + 1).node.offsetWidth
  let parts = colspan || 0

  if (colwidth) {
    for (let i = 0; i < (colspan || 0); i++) {
      if (colwidth[i]) {
        domWidth -= colwidth[i]
        parts--
      }
    }
  }

  return domWidth / parts
} // Attempts to find a parent TD/TH depending on target element.

export function domCellAround(target) {
  while (target && target.nodeName !== 'TD' && target.nodeName !== 'TH') {
    target = containsClassName(target, 'ProseMirror') ? null : target.parentNode
  }

  return target
}
