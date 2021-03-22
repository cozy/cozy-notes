import _extends from '@babel/runtime/helpers/extends'
import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React from 'react'
import { Component } from 'react'
import {
  MediaSingle,
  WithProviders,
  DEFAULT_IMAGE_HEIGHT,
  DEFAULT_IMAGE_WIDTH,
  browser
} from '@atlaskit/editor-common'
import { isNodeSelectedOrInRange } from '../../../utils/nodes'
import { ReactNodeView } from '../../../nodeviews/'
import WithPluginState from '../../../ui/WithPluginState'
import { pluginKey as widthPluginKey } from '../../width'
import { setNodeSelection, setTextSelection } from '../../../utils'
import ResizableMediaSingle from '../ui/ResizableMediaSingle'
import { createDisplayGrid } from '../../../plugins/grid'
import { stateKey as mediaPluginKey } from '../pm-plugins/main'
import { MediaNodeUpdater } from './mediaNodeUpdater'
import { findParentNodeOfTypeClosestToPos } from 'prosemirror-utils'
import { CellSelection } from '@atlaskit/editor-tables/cell-selection'
import { FigureWrapper } from './styles'
import {
  floatingLayouts,
  isRichMediaInsideOfBlockNode
} from '../../../utils/rich-media-utils'
import { getAttrsFromUrl } from '@atlaskit/media-client'
import { isMediaBlobUrlFromAttrs } from '../utils/media-common'
import { replaceExternalMedia } from '../commands/helpers'
export default class MediaSingleNode extends Component {
  constructor(...args) {
    super(...args)
    console.log('MediaSingleNode constructor', args)
    _defineProperty(this, 'state', {
      width: undefined,
      height: undefined,
      viewMediaClientConfig: undefined,
      isCopying: false
    })

    _defineProperty(this, 'createMediaNodeUpdater', props => {
      const node = this.props.node.firstChild
      return new MediaNodeUpdater({
        ...props,
        isMediaSingle: true,
        node: node ? node : this.props.node,
        dispatchAnalyticsEvent: this.props.dispatchAnalyticsEvent
      })
    })

    _defineProperty(this, 'setViewMediaClientConfig', async props => {
      const mediaProvider = await props.mediaProvider

      if (mediaProvider) {
        const viewMediaClientConfig = mediaProvider.viewMediaClientConfig
        this.setState({
          viewMediaClientConfig
        })
      }
    })

    _defineProperty(this, 'updateMediaNodeAttributes', async props => {
      console.log('updateMediaNodeAttributes', props)
      const mediaNodeUpdater = this.createMediaNodeUpdater(props)
      const { addPendingTask } = this.props.mediaPluginState // we want the first child of MediaSingle (type "media")
      console.log('addPendingTask', addPendingTask)
      const node = this.props.node.firstChild

      if (!node) {
        console.log('pas de node')
        return
      }

      const updatedDimensions = await mediaNodeUpdater.getRemoteDimensions()

      if (updatedDimensions) {
        mediaNodeUpdater.updateDimensions(updatedDimensions)
      }
      console.log('props.node.firstChild.attrs', props.node.firstChild.attrs)
      if (props.node.firstChild.attrs.collection === 'cozy') {
        console.log('REPLACE !')
        return replaceExternalMedia(props.getPos() + 1, {
          id: node.attrs.id,
          collection: node.attrs.collection,
          url: props.node.firstChild.attrs.url
        })(this.props.view.state, this.props.view.dispatch)
      }
      if (node.attrs.type === 'external' && node.attrs.__external) {
        console.log('node a updated', this.props.getPos)
        console.log('addPendingTask', addPendingTask)
        const updatingNode = mediaNodeUpdater.handleExternalMedia(
          this.props.getPos
        )
        addPendingTask(updatingNode)
        await updatingNode
        return
      }
      console.log('pas external ? ', node)
      const contextId = mediaNodeUpdater.getNodeContextId()
      console.log('contextId', contextId)
      if (!contextId) {
        await mediaNodeUpdater.updateContextId()
      }

      const hasDifferentContextId = await mediaNodeUpdater.hasDifferentContextId()
      console.log('hasDifferentContextId ?', hasDifferentContextId)
      if (hasDifferentContextId) {
        this.setState({
          isCopying: true
        })

        try {
          const copyNode = mediaNodeUpdater.copyNode()
          console.log('copyNode', copyNode)
          addPendingTask(copyNode)
          await copyNode
        } catch (e) {
          // if copyNode fails, let's set isCopying false so we can show the eventual error
          this.setState({
            isCopying: false
          })
        }
      }
    })

    _defineProperty(this, 'selectMediaSingle', ({ event }) => {
      // We need to call "stopPropagation" here in order to prevent the browser from navigating to
      // another URL if the media node is wrapped in a link mark.
      console.log('selectMediaSingle')
      event.stopPropagation()

      const propPos = this.props.getPos()
      const { state } = this.props.view

      if (event.shiftKey) {
        // don't select text if there is current selection in a table (as this would override selected cells)
        if (state.selection instanceof CellSelection) {
          return
        }

        setTextSelection(
          this.props.view,
          state.selection.from < propPos ? state.selection.from : propPos, // + 3 needed for offset of the media inside mediaSingle and cursor to make whole mediaSingle selected
          state.selection.to > propPos ? state.selection.to : propPos + 3
        )
      } else {
        setNodeSelection(this.props.view, propPos)
      }
    })

    _defineProperty(this, 'updateSize', (width, layout) => {
      const { state, dispatch } = this.props.view
      const pos = this.props.getPos()

      if (typeof pos === 'undefined') {
        return
      }

      const tr = state.tr.setNodeMarkup(pos, undefined, {
        ...this.props.node.attrs,
        layout,
        width
      })
      tr.setMeta('scrollIntoView', false)
      return dispatch(tr)
    })

    _defineProperty(this, 'forwardInnerRef', elem => {
      this.props.forwardRef(elem)
    })

    _defineProperty(this, 'getLineLength', (view, pos) => {
      if (isRichMediaInsideOfBlockNode(view, pos)) {
        const $pos = view.state.doc.resolve(pos)
        const domNode = view.nodeDOM($pos.pos)

        if (
          $pos.nodeAfter &&
          floatingLayouts.indexOf($pos.nodeAfter.attrs.layout) > -1 &&
          domNode &&
          domNode.parentElement
        ) {
          return domNode.parentElement.offsetWidth
        }

        if (domNode instanceof HTMLElement) {
          return domNode.offsetWidth
        }
      }

      return null
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log('UNSAFE_componentWillReceiveProps')
    if (nextProps.mediaProvider !== this.props.mediaProvider) {
      this.setViewMediaClientConfig(nextProps)
    } // Forced updates not required on mobile

    if (nextProps.isCopyPasteEnabled === false) {
      return
    } // We need to call this method on any prop change since attrs can get removed with collab editing
    // the method internally checks if we already have all attrs

    this.createMediaNodeUpdater(nextProps).updateFileAttrs()
  }

  async componentDidMount() {
    const { contextIdentifierProvider } = this.props
    console.log('didMount', this.props)
    await Promise.all([
      this.setViewMediaClientConfig(this.props),
      this.updateMediaNodeAttributes(this.props)
    ])
    this.setState({
      contextIdentifierProvider: await contextIdentifierProvider
    })
  }

  fetchImage() {
    const { selected, getPos, node, mediaOptions, fullWidthMode } = this.props

    const childNode = node.firstChild
    const attrs = childNode.attrs

    //!TODO appel à cozy ici
    setTimeout(() => {
      console.log('update de lurl')
      console.log('attrs', attrs)
      const nextProps = {
        ...this.props,
        node: {
          ...this.props.node,
          firstChild: {
            ...this.props.node.firstChild,
            attrs: {
              ...this.props.node.firstChild.attrs,
              type: 'external',
              url:
                'https://d3vn5rg72hh8yg.cloudfront.net/cdn/imagesource/previews/7578/478f058cb01cd128073ce700f540e4c5/3/0e619273cea51f91ce3c0354b6b0c61e/2273376.jpg'
            }
          }
        }
      }

      this.updateMediaNodeAttributes(nextProps)
    }, 100)
  }
  render() {
    const {
      selected,
      getPos,
      node,
      mediaOptions,
      fullWidthMode,
      view: { state },
      view
    } = this.props
    const { layout, width: mediaSingleWidth } = node.attrs
    const childNode = node.firstChild
    const attrs = childNode.attrs
    let { width, height } = attrs
    console.log('renderMediaSingle ! ')
    if (attrs.type === 'external') {
      console.log('type external', attrs)
      if (attrs.collection !== 'cozy' && isMediaBlobUrlFromAttrs(attrs)) {
        console.log('blobed')
        const urlAttrs = getAttrsFromUrl(attrs.url)
        console.log('urlAttrs', urlAttrs)
        if (urlAttrs) {
          const { width: urlWidth, height: urlHeight } = urlAttrs
          width = width || urlWidth
          height = height || urlHeight
        }
      }

      const { width: stateWidth, height: stateHeight } = this.state

      if (width === null) {
        width = stateWidth || DEFAULT_IMAGE_WIDTH
      }

      if (height === null) {
        height = stateHeight || DEFAULT_IMAGE_HEIGHT
      }
    }
    if (attrs.collection === 'cozy') {
      //console.log('subType ok')
      this.fetchImage()
    }
    if (!width || !height) {
      width = DEFAULT_IMAGE_WIDTH
      height = DEFAULT_IMAGE_HEIGHT
    }

    const mediaSingleProps = {
      layout,
      width,
      height,
      containerWidth: this.props.width,
      lineLength: this.props.lineLength,
      pctWidth: mediaSingleWidth,
      fullWidthMode
    }
    const MediaChild = /*#__PURE__*/ React.createElement(FigureWrapper, {
      innerRef: this.forwardInnerRef
    })
    let canResize = !!this.props.mediaOptions.allowResizing

    if (!this.props.mediaOptions.allowResizingInTables) {
      // If resizing not allowed in tables, check parents for tables
      const pos = getPos()

      if (pos) {
        const $pos = state.doc.resolve(pos)
        const { table } = state.schema.nodes
        const disabledNode = !!findParentNodeOfTypeClosestToPos($pos, [table])
        canResize = canResize && !disabledNode
      }
    }
    console.log('canResize', canResize)
    const lineLength =
      this.getLineLength(view, getPos()) || this.props.lineLength
    return canResize
      ? /*#__PURE__*/ React.createElement(
          ResizableMediaSingle,
          _extends({}, mediaSingleProps, {
            lineLength: lineLength,
            view: this.props.view,
            getPos: getPos,
            updateSize: this.updateSize,
            displayGrid: createDisplayGrid(this.props.eventDispatcher),
            gridSize: 12,
            viewMediaClientConfig: this.state.viewMediaClientConfig,
            allowBreakoutSnapPoints:
              mediaOptions && mediaOptions.allowBreakoutSnapPoints,
            selected: selected(),
            dispatchAnalyticsEvent: this.props.dispatchAnalyticsEvent
          }),
          MediaChild
        )
      : /*#__PURE__*/ React.createElement(
          MediaSingle,
          mediaSingleProps,
          MediaChild
        )
  }
}

_defineProperty(MediaSingleNode, 'defaultProps', {
  mediaOptions: {}
})

_defineProperty(MediaSingleNode, 'displayName', 'MediaSingleNode')

class MediaSingleNodeView extends ReactNodeView {
  constructor(...args) {
    super(...args)

    _defineProperty(this, 'lastOffsetLeft', 0)

    _defineProperty(this, 'forceViewUpdate', false)

    _defineProperty(this, 'selectionType', null)

    _defineProperty(this, 'checkAndUpdateSelectionType', () => {
      const getPos = this.getPos
      const { selection } = this.view.state
      const isNodeSelected = isNodeSelectedOrInRange(
        selection.$anchor.pos,
        selection.$head.pos,
        getPos(),
        this.node.nodeSize
      )
      this.selectionType = isNodeSelected
      return isNodeSelected
    })

    _defineProperty(this, 'isNodeSelected', () => {
      this.checkAndUpdateSelectionType()
      return this.selectionType !== null
    })
  }

  createDomRef() {
    const domRef = document.createElement('div')

    if (
      browser.chrome &&
      this.reactComponentProps.mediaOptions &&
      this.reactComponentProps.mediaOptions.allowMediaSingleEditable
    ) {
      // workaround Chrome bug in https://product-fabric.atlassian.net/browse/ED-5379
      // see also: https://github.com/ProseMirror/prosemirror/issues/884
      domRef.contentEditable = 'true'
    }

    return domRef
  }

  getContentDOM() {
    const dom = document.createElement('div')
    return {
      dom
    }
  }

  viewShouldUpdate(nextNode) {
    if (this.forceViewUpdate) {
      this.forceViewUpdate = false
      return true
    }

    if (this.node.attrs !== nextNode.attrs) {
      return true
    }

    if (this.selectionType !== this.checkAndUpdateSelectionType()) {
      return true
    }

    return super.viewShouldUpdate(nextNode)
  }

  getNodeMediaId(node) {
    if (node.firstChild) {
      return node.firstChild.attrs.id
    }

    return undefined
  }

  update(node, decorations, isValidUpdate) {
    console.log('update ? node', node, decorations)
    if (!isValidUpdate) {
      isValidUpdate = (currentNode, newNode) =>
        this.getNodeMediaId(currentNode) === this.getNodeMediaId(newNode)
    }

    return super.update(node, decorations, isValidUpdate)
  }

  render(props, forwardRef) {
    const {
      eventDispatcher,
      fullWidthMode,
      providerFactory,
      mediaOptions,
      dispatchAnalyticsEvent
    } = this.reactComponentProps // getPos is a boolean for marks, since this is a node we know it must be a function
    console.log('render mediaSingle')
    const getPos = this.getPos
    return /*#__PURE__*/ React.createElement(WithProviders, {
      providers: ['mediaProvider', 'contextIdentifierProvider'],
      providerFactory: providerFactory,
      renderNode: ({ mediaProvider, contextIdentifierProvider }) => {
        return /*#__PURE__*/ React.createElement(WithPluginState, {
          editorView: this.view,
          plugins: {
            width: widthPluginKey,
            mediaPluginState: mediaPluginKey
          },
          render: ({ width, mediaPluginState }) => {
            return /*#__PURE__*/ React.createElement(MediaSingleNode, {
              width: width.width,
              lineLength: width.lineLength,
              node: this.node,
              getPos: getPos,
              mediaProvider: mediaProvider,
              contextIdentifierProvider: contextIdentifierProvider,
              mediaOptions: mediaOptions,
              view: this.view,
              fullWidthMode: fullWidthMode,
              selected: this.isNodeSelected,
              eventDispatcher: eventDispatcher,
              mediaPluginState: mediaPluginState,
              dispatchAnalyticsEvent: dispatchAnalyticsEvent,
              forwardRef: forwardRef
            })
          }
        })
      }
    })
  }

  ignoreMutation() {
    // DOM has changed; recalculate if we need to re-render
    if (this.dom) {
      const offsetLeft = this.dom.offsetLeft

      if (offsetLeft !== this.lastOffsetLeft) {
        this.lastOffsetLeft = offsetLeft
        this.forceViewUpdate = true
        this.update(this.node, [], () => true)
      }
    }

    return true
  }
}

export const ReactMediaSingleNode = (
  portalProviderAPI,
  eventDispatcher,
  providerFactory,
  dispatchAnalyticsEvent,
  mediaOptions = {}
) => (node, view, getPos) => {
  return new MediaSingleNodeView(
    node,
    view,
    getPos,
    portalProviderAPI,
    eventDispatcher,
    {
      eventDispatcher,
      fullWidthMode: mediaOptions.fullWidthEnabled,
      providerFactory,
      mediaOptions,
      dispatchAnalyticsEvent,
      isCopyPasteEnabled: mediaOptions.isCopyPasteEnabled
    }
  ).init()
}
