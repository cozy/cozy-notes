import _extends from '@babel/runtime/helpers/extends'
import React from 'react'
import { DOMSerializer } from 'prosemirror-model'
import ReactNodeView from '../../../nodeviews/ReactNodeView'
import WithPluginState from '../../../ui/WithPluginState'
import { pluginKey as widthPluginKey } from '../../width'
import { pluginConfig as getPluginConfig } from '../create-plugin-config'
import { getPluginState, pluginKey } from '../pm-plugins/plugin-factory'
import { pluginKey as tableResizingPluginKey } from '../pm-plugins/table-resizing'
import { generateColgroup } from '../pm-plugins/table-resizing/utils'
import TableComponent from './TableComponent'

const tableAttributes = node => {
  return {
    'data-number-column': node.attrs.isNumberColumnEnabled,
    'data-layout': node.attrs.layout,
    'data-autosize': node.attrs.__autoSize
  }
}

const toDOM = (node, props) => {
  let colgroup = ''

  if (props.allowColumnResizing) {
    colgroup = ['colgroup', {}, ...generateColgroup(node)]
  }

  return ['table', tableAttributes(node), colgroup, ['tbody', 0]]
}

export default class TableView extends ReactNodeView {
  constructor(props) {
    super(
      props.node,
      props.view,
      props.getPos,
      props.portalProviderAPI,
      props.eventDispatcher,
      props
    )
    this.getPos = props.getPos
  }

  getContentDOM() {
    const rendered = DOMSerializer.renderSpec(
      document,
      toDOM(this.node, this.reactComponentProps)
    )

    if (rendered.dom) {
      this.table = rendered.dom
    }

    return rendered
  }

  setDomAttrs(node) {
    if (!this.table) {
      return
    }

    const attrs = tableAttributes(node)
    Object.keys(attrs).forEach(attr => {
      this.table.setAttribute(attr, attrs[attr])
    })
  }

  render(props, forwardRef) {
    return /*#__PURE__*/ React.createElement(WithPluginState, {
      plugins: {
        containerWidth: widthPluginKey,
        pluginState: pluginKey,
        tableResizingPluginState: tableResizingPluginKey
      },
      editorView: props.view,
      render: pluginStates =>
        /*#__PURE__*/ React.createElement(
          TableComponent,
          _extends({}, props, pluginStates, {
            node: this.node,
            width: pluginStates.containerWidth.width,
            contentDOM: forwardRef
          })
        )
    })
  }

  ignoreMutation() {
    return true
  }
}
export const createTableView = (
  node,
  view,
  getPos,
  portalProviderAPI,
  eventDispatcher,
  options
) => {
  const { pluginConfig } = getPluginState(view.state)
  const { allowColumnResizing } = getPluginConfig(pluginConfig)
  return new TableView({
    node,
    view,
    allowColumnResizing,
    portalProviderAPI,
    eventDispatcher,
    getPos: getPos,
    options
  }).init()
}
