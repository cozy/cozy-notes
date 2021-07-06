import React from 'react'
import ReactDOM from 'react-dom'
import { DOMSerializer } from 'prosemirror-model'
import InfoIcon from '@atlaskit/icon/glyph/editor/info'
import SuccessIcon from '@atlaskit/icon/glyph/editor/success'
import NoteIcon from '@atlaskit/icon/glyph/editor/note'
import WarningIcon from '@atlaskit/icon/glyph/editor/warning'
import ErrorIcon from '@atlaskit/icon/glyph/editor/error'
import TipIcon from '@atlaskit/icon/glyph/editor/hint'
import { PanelType } from '@atlaskit/adf-schema'
import { PanelSharedCssClassName } from '@atlaskit/editor-common'
import { Emoji } from '@atlaskit/editor-common'
import { panelAttrsToDom } from '../utils'
export const panelIcons = {
  info: InfoIcon,
  success: SuccessIcon,
  note: NoteIcon,
  tip: TipIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  custom: InfoIcon
}
export const PanelIcon = props => {
  const {
    allowCustomPanel,
    providerFactory,
    panelAttributes: { panelType, panelIcon }
  } = props

  if (allowCustomPanel && panelIcon && panelType === PanelType.CUSTOM) {
    return /*#__PURE__*/ React.createElement(Emoji, {
      providers: providerFactory,
      shortName: panelIcon,
      showTooltip: false,
      allowTextFallback: false,
      fitToHeight: 16
    })
  }

  const Icon = panelIcons[panelType]
  return /*#__PURE__*/ React.createElement(Icon, {
    label: `Panel ${panelType}`
  })
}

class PanelNodeView {
  constructor(node, view, getPos, pluginOptions, providerFactory) {
    this.providerFactory = providerFactory
    this.pluginOptions = pluginOptions
    this.view = view
    this.node = node
    const { dom, contentDOM } = DOMSerializer.renderSpec(
      document,
      panelAttrsToDom(
        node.attrs,
        pluginOptions.UNSAFE_allowCustomPanel || false
      )
    )
    this.getPos = getPos
    this.dom = dom
    this.contentDOM = contentDOM
    this.icon = this.dom.querySelector(`.${PanelSharedCssClassName.icon}`)

    if (!this.icon) {
      return
    }

    ReactDOM.render(
      /*#__PURE__*/ React.createElement(PanelIcon, {
        allowCustomPanel: pluginOptions.UNSAFE_allowCustomPanel,
        panelAttributes: node.attrs,
        providerFactory: this.providerFactory
      }),
      this.icon
    )
  }
}

export const getPanelNodeView = (pluginOptions, providerFactory) => (
  node,
  view,
  getPos
) => {
  return new PanelNodeView(node, view, getPos, pluginOptions, providerFactory)
}
