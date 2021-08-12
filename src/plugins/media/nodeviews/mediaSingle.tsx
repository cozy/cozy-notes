import React from 'react'
import { Component } from 'react'
import { Node as PMNode } from 'prosemirror-model'
import { EditorView, Decoration } from 'prosemirror-view'
import {
  RichMediaLayout as MediaSingleLayout,
  MediaADFAttrs
} from '@atlaskit/adf-schema'
import {
  MediaSingle,
  WithProviders,
  browser,
  ProviderFactory,
  ContextIdentifierProvider
} from '@atlaskit/editor-common'
import { CardEvent } from '@atlaskit/media-card'
import { isNodeSelectedOrInRange } from '@atlaskit/editor-core/utils/nodes'
import { MediaClientConfig } from '@atlaskit/media-core'

import {
  getPosHandler,
  getPosHandlerNode,
  ForwardRef,
  ReactNodeView
} from '@atlaskit/editor-core/nodeviews/'
import WithPluginState from '@atlaskit/editor-core/ui/WithPluginState'
import { pluginKey as widthPluginKey } from '@atlaskit/editor-core/plugins/width'
import { setNodeSelection, setTextSelection } from '@atlaskit/editor-core/utils'
import ResizableMediaSingle from '../ui/ResizableMediaSingle'
import { createDisplayGrid } from '@atlaskit/editor-core/plugins/grid'
import { EventDispatcher } from '@atlaskit/editor-core/event-dispatcher'
import { PortalProviderAPI } from '@atlaskit/editor-core/ui/PortalProvider'
import { MediaOptions } from '../types'
import { stateKey as mediaPluginKey } from '../pm-plugins/main'
import { MediaSingleNodeProps, MediaSingleNodeViewProps } from './types'
import { MediaNodeUpdater } from './mediaNodeUpdater'
import { DispatchAnalyticsEvent } from '@atlaskit/editor-core/plugins/analytics'
import { findParentNodeOfTypeClosestToPos } from 'prosemirror-utils'
import { CellSelection } from '@atlaskit/editor-tables/cell-selection'
import { FigureWrapper } from './styles'
import {
  floatingLayouts,
  isRichMediaInsideOfBlockNode
} from '@atlaskit/editor-core/utils/rich-media-utils'
import { cozyMediaOptions } from 'config/cozy-media-options'
import {
  firefoxElement,
  initFirefoxDrag,
  removeFirefoxDrag
} from 'lib/patches/firefox-drag'
import {
  DEFAULT_IMAGE_HEIGHT,
  DEFAULT_IMAGE_WIDTH,
  DEFAULT_LINE_LENGTH,
  DEFAULT_PCT_WIDTH
} from 'constants/media'

export interface MediaSingleNodeState {
  width?: number
  height?: number
  viewMediaClientConfig?: MediaClientConfig
  contextIdentifierProvider?: ContextIdentifierProvider
  isCopying: boolean
}

export default class MediaSingleNode extends Component<
  MediaSingleNodeProps,
  MediaSingleNodeState
> {
  static defaultProps: Partial<MediaSingleNodeProps> = {
    mediaOptions: {}
  }
  static displayName = 'MediaSingleNode'

  state: MediaSingleNodeState = {
    width: undefined,
    height: undefined,
    viewMediaClientConfig: undefined,
    isCopying: false
  }

  createMediaNodeUpdater = (props: MediaSingleNodeProps): MediaNodeUpdater => {
    const node = this.props.node.firstChild

    return new MediaNodeUpdater({
      ...props,
      isMediaSingle: true,
      node: node ? (node as PMNode) : this.props.node,
      dispatchAnalyticsEvent: this.props.dispatchAnalyticsEvent
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps: MediaSingleNodeProps) {
    if (nextProps.mediaProvider !== this.props.mediaProvider) {
      this.setViewMediaClientConfig(nextProps)
    }

    // Forced updates not required on mobile
    if (nextProps.isCopyPasteEnabled === false) {
      return
    }

    // We need to call this method on any prop change since attrs can get removed with collab editing
    // the method internally checks if we already have all attrs
    this.createMediaNodeUpdater(nextProps).updateFileAttrs()
  }

  setViewMediaClientConfig = async (props: MediaSingleNodeProps) => {
    const mediaProvider = await props.mediaProvider
    if (mediaProvider) {
      const viewMediaClientConfig = mediaProvider.viewMediaClientConfig

      this.setState({
        viewMediaClientConfig
      })
    }
  }

  updateMediaNodeAttributes = async (props: MediaSingleNodeProps) => {
    const mediaNodeUpdater = this.createMediaNodeUpdater(props)
    const { addPendingTask } = this.props.mediaPluginState

    // we want the first child of MediaSingle (type "media")
    const node = this.props.node.firstChild
    if (!node) {
      return
    }

    const updatedDimensions = await mediaNodeUpdater.getRemoteDimensions()
    if (updatedDimensions) {
      mediaNodeUpdater.updateDimensions(updatedDimensions)
    }

    if (node.attrs.type === 'external' && node.attrs.__external) {
      const updatingNode = mediaNodeUpdater.handleExternalMedia(
        this.props.getPos
      )
      addPendingTask(updatingNode)
      await updatingNode
      return
    }

    const contextId = mediaNodeUpdater.getNodeContextId()
    if (!contextId) {
      await mediaNodeUpdater.updateContextId()
    }

    const hasDifferentContextId = await mediaNodeUpdater.hasDifferentContextId()

    if (hasDifferentContextId) {
      this.setState({ isCopying: true })
      try {
        const copyNode = mediaNodeUpdater.copyNode()
        addPendingTask(copyNode)
        await copyNode
      } catch (e) {
        // if copyNode fails, let's set isCopying false so we can show the eventual error
        this.setState({ isCopying: false })
      }
    }
  }

  async componentDidMount() {
    const { contextIdentifierProvider } = this.props

    await Promise.all([
      this.setViewMediaClientConfig(this.props),
      this.updateMediaNodeAttributes(this.props)
    ])

    this.setState({
      contextIdentifierProvider: await contextIdentifierProvider
    })

    // ❗ If we're not in a Firefox context, this will not throw but return undefined
    // This patch is necessary or images can disappear when dropping them on paragraphs
    initFirefoxDrag(firefoxElement())
  }

  componentWillUnmount() {
    // Good memory management requires that we opt for removing the Firefox listeners when unmounting
    removeFirefoxDrag(firefoxElement())
  }

  selectMediaSingle = ({ event }: CardEvent) => {
    // We need to call "stopPropagation" here in order to prevent the browser from navigating to
    // another URL if the media node is wrapped in a link mark.
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
        state.selection.from < propPos ? state.selection.from : propPos,
        // + 3 needed for offset of the media inside mediaSingle and cursor to make whole mediaSingle selected
        state.selection.to > propPos ? state.selection.to : propPos + 3
      )
    } else {
      setNodeSelection(this.props.view, propPos)
    }
  }

  updateSize = (width: number | null, layout: MediaSingleLayout) => {
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
  }

  forwardInnerRef = (elem: HTMLElement) => {
    this.props.forwardRef(elem)
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
    const childNode = node.firstChild!
    const attrs = childNode.attrs as MediaADFAttrs
    let { width, height } = attrs

    if (!width || !height) {
      width = DEFAULT_IMAGE_WIDTH
      height = DEFAULT_IMAGE_HEIGHT
    }

    const mediaSingleProps = {
      layout,
      width,
      height,
      containerWidth: this.props.width,
      lineLength: this.props.lineLength || DEFAULT_LINE_LENGTH,
      pctWidth: mediaSingleWidth || DEFAULT_PCT_WIDTH,
      fullWidthMode
    }

    const MediaChild = <FigureWrapper innerRef={this.forwardInnerRef} />

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

    const lineLength =
      this.getLineLength(view, getPos()) || mediaSingleProps.lineLength

    return canResize ? (
      <ResizableMediaSingle
        {...mediaSingleProps}
        lineLength={lineLength}
        view={this.props.view}
        getPos={getPos}
        updateSize={this.updateSize}
        displayGrid={createDisplayGrid(this.props.eventDispatcher)}
        gridSize={12}
        viewMediaClientConfig={this.state.viewMediaClientConfig}
        allowBreakoutSnapPoints={
          mediaOptions && mediaOptions.allowBreakoutSnapPoints
        }
        selected={selected()}
        dispatchAnalyticsEvent={this.props.dispatchAnalyticsEvent}
      >
        {MediaChild}
      </ResizableMediaSingle>
    ) : (
      <MediaSingle {...mediaSingleProps}>{MediaChild}</MediaSingle>
    )
  }

  private getLineLength = (view: EditorView, pos: number): number | null => {
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
  }
}

class MediaSingleNodeView extends ReactNodeView<MediaSingleNodeViewProps> {
  lastOffsetLeft = 0
  forceViewUpdate = false
  selectionType: number | null = null

  createDomRef(): HTMLElement {
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
    return { dom }
  }

  viewShouldUpdate(nextNode: PMNode) {
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

  checkAndUpdateSelectionType = () => {
    const getPos = this.getPos as getPosHandlerNode
    const { selection } = this.view.state
    const isNodeSelected = isNodeSelectedOrInRange(
      selection.$anchor.pos,
      selection.$head.pos,
      getPos(),
      this.node.nodeSize
    )

    this.selectionType = isNodeSelected

    return isNodeSelected
  }

  isNodeSelected = () => {
    this.checkAndUpdateSelectionType()
    return this.selectionType !== null
  }

  getNodeMediaId(node: PMNode): string | undefined {
    if (node.firstChild) {
      return node.firstChild.attrs.id
    }
    return undefined
  }

  update(
    node: PMNode,
    decorations: Decoration[],
    isValidUpdate?: (currentNode: PMNode, newNode: PMNode) => boolean
  ) {
    if (!isValidUpdate) {
      isValidUpdate = (currentNode, newNode) =>
        this.getNodeMediaId(currentNode) === this.getNodeMediaId(newNode)
    }
    return super.update(node, decorations, isValidUpdate)
  }

  render(props: MediaSingleNodeViewProps, forwardRef?: ForwardRef) {
    const {
      eventDispatcher,
      fullWidthMode,
      providerFactory,
      mediaOptions,
      dispatchAnalyticsEvent
    } = this.reactComponentProps

    // getPos is a boolean for marks, since this is a node we know it must be a function
    const getPos = this.getPos as getPosHandlerNode

    return (
      <WithProviders
        providers={['mediaProvider', 'contextIdentifierProvider']}
        providerFactory={providerFactory}
        renderNode={({ mediaProvider, contextIdentifierProvider }) => {
          return (
            <WithPluginState
              editorView={this.view}
              plugins={{
                width: widthPluginKey,
                mediaPluginState: mediaPluginKey
              }}
              render={({ width, mediaPluginState }) => {
                return (
                  <MediaSingleNode
                    width={width.width}
                    lineLength={width.lineLength}
                    node={this.node}
                    getPos={getPos}
                    mediaProvider={mediaProvider}
                    contextIdentifierProvider={contextIdentifierProvider}
                    mediaOptions={{ ...mediaOptions, ...cozyMediaOptions }}
                    view={this.view}
                    fullWidthMode={fullWidthMode}
                    selected={this.isNodeSelected}
                    eventDispatcher={eventDispatcher}
                    mediaPluginState={mediaPluginState}
                    dispatchAnalyticsEvent={dispatchAnalyticsEvent}
                    forwardRef={forwardRef}
                  />
                )
              }}
            />
          )
        }}
      />
    )
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
  portalProviderAPI: PortalProviderAPI,
  eventDispatcher: EventDispatcher,
  providerFactory: ProviderFactory,
  dispatchAnalyticsEvent?: DispatchAnalyticsEvent,
  mediaOptions: MediaOptions = {}
) => (node: PMNode, view: EditorView, getPos: getPosHandler) => {
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
