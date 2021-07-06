import React from 'react'
import { calcBreakoutWidth, overflowShadow } from '@atlaskit/editor-common'
import { Wrapper, Header, Content, ContentWrapper } from './styles'
import { Overlay } from '../styles'
import ExtensionLozenge from '../Lozenge'
import { pluginKey as widthPluginKey } from '../../../../width'
import WithPluginState from '../../../../../ui/WithPluginState'

const Extension = props => {
  const {
    node,
    handleContentDOMRef,
    children,
    view,
    handleRef,
    shadowClassNames
  } = props
  const hasBody = node.type.name === 'bodiedExtension'
  const hasChildren = !!children
  return /*#__PURE__*/ React.createElement(WithPluginState, {
    editorView: view,
    plugins: {
      widthState: widthPluginKey
    },
    render: ({
      widthState = {
        width: 0
      }
    }) => {
      return /*#__PURE__*/ React.createElement(
        Wrapper,
        {
          innerRef: handleRef,
          'data-layout': node.attrs.layout,
          className: `extension-container ${shadowClassNames} ${
            hasBody ? '' : 'with-overlay'
          }`,
          style: {
            width: calcBreakoutWidth(node.attrs.layout, widthState.width)
          }
        },
        /*#__PURE__*/ React.createElement(
          'div',
          {
            className: `extension-overflow-wrapper ${
              hasBody ? 'with-body' : ''
            }`
          },
          /*#__PURE__*/ React.createElement(Overlay, {
            className: 'extension-overlay'
          }),
          /*#__PURE__*/ React.createElement(
            Header,
            {
              contentEditable: false,
              className: hasChildren ? 'with-children' : ''
            },
            /*#__PURE__*/ React.createElement(ExtensionLozenge, {
              node: node
            }),
            children
          ),
          hasBody &&
            /*#__PURE__*/ React.createElement(
              ContentWrapper,
              null,
              /*#__PURE__*/ React.createElement(Content, {
                innerRef: handleContentDOMRef,
                className: 'extension-content'
              })
            )
        )
      )
    }
  })
}

export default overflowShadow(Extension, {
  overflowSelector: '.extension-overflow-wrapper'
})
