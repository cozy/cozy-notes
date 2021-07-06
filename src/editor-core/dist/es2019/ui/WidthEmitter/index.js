import React from 'react'
import { pluginKey as widthPluginKey } from '../../plugins/width'
import { WidthConsumer } from '@atlaskit/editor-common'
import { ContextPanelConsumer } from '../ContextPanel/context'

function useCreateWidthCallbacks({ setContextPanelWidth, setContainerWidth }) {
  const contextPanelWidthCallback = React.useCallback(
    ({ width }) => {
      setContextPanelWidth(width)
      return null
    },
    [setContextPanelWidth]
  )
  const containerWidthCallback = React.useCallback(
    ({ width }) => {
      setContainerWidth(width)
      return null
    },
    [setContainerWidth]
  )
  return [contextPanelWidthCallback, containerWidthCallback]
}

const WidthEmitter = ({ editorView }) => {
  const [contextPanelWidth, setContextPanelWidth] = React.useState(0)
  const [containerWidth, setContainerWidth] = React.useState(0)
  const [
    contextPanelWidthCallback,
    containerWidthCallback
  ] = useCreateWidthCallbacks({
    setContextPanelWidth,
    setContainerWidth
  })
  React.useEffect(() => {
    const width = containerWidth - contextPanelWidth

    if (width <= 0 || isNaN(width) || !editorView) {
      return
    }

    const {
      dom,
      state: { tr },
      dispatch
    } = editorView
    tr.setMeta(widthPluginKey, {
      width,
      lineLength: dom ? dom.clientWidth : undefined
    })
    dispatch(tr)
    return () => {}
  }, [editorView, contextPanelWidth, containerWidth])
  return /*#__PURE__*/ React.createElement(
    React.Fragment,
    null,
    /*#__PURE__*/ React.createElement(
      ContextPanelConsumer,
      null,
      contextPanelWidthCallback
    ),
    /*#__PURE__*/ React.createElement(
      WidthConsumer,
      null,
      containerWidthCallback
    )
  )
}

export default WidthEmitter
