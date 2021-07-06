import { findSelectedNodeOfType, findParentNodeOfType } from 'prosemirror-utils'
import { PanelType } from '@atlaskit/adf-schema'
import { PanelSharedCssClassName } from '@atlaskit/editor-common'
export const findPanel = (state, selection) => {
  const { panel } = state.schema.nodes
  return (
    findSelectedNodeOfType(panel)(selection || state.selection) ||
    findParentNodeOfType(panel)(selection || state.selection)
  )
}
export const panelAttrsToDom = (attrs, allowCustomPanel) => {
  const { panelColor, panelType, panelIcon } = attrs
  const isCustomPanel = panelType === PanelType.CUSTOM && allowCustomPanel
  const style =
    panelColor && isCustomPanel ? `background-color: ${panelColor}` : ''
  const hasIcon = !isCustomPanel || !!panelIcon
  const panelAttrs = {
    class: PanelSharedCssClassName.prefix,
    'data-panel-type': panelType || PanelType.INFO,
    style
  }
  const iconSpan = [
    'span',
    {
      class: PanelSharedCssClassName.icon
    }
  ]
  const contentDiv = [
    'div',
    {
      class: PanelSharedCssClassName.content
    },
    0
  ]

  if (hasIcon) {
    return ['div', panelAttrs, iconSpan, contentDiv]
  } else {
    return ['div', panelAttrs, contentDiv]
  }
}
