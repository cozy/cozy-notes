import _defineProperty from '@babel/runtime/helpers/defineProperty'
import { withImageLoader } from '@atlaskit/editor-common'
import { Card, CardLoading } from '@atlaskit/media-card'
import { CellSelection } from '@atlaskit/editor-tables/cell-selection'
import React, { Component } from 'react'
import { setNodeSelection, setTextSelection } from '../../../../utils'
import { stateKey as mediaStateKey } from '../../pm-plugins/plugin-key'
import { MediaCardWrapper } from '../styles'
// This is being used by DropPlaceholder now
export const MEDIA_HEIGHT = 125
export const FILE_WIDTH = 156
export class MediaNode extends Component {
  constructor(_props) {
    super(_props)

    _defineProperty(this, 'state', {})

    _defineProperty(this, 'setViewMediaClientConfig', async () => {
      const mediaProvider = await this.props.mediaProvider

      if (mediaProvider) {
        const viewMediaClientConfig = mediaProvider.viewMediaClientConfig
        this.setState({
          viewMediaClientConfig
        })
      }
    })

    _defineProperty(this, 'selectMediaSingleFromCard', ({ event }) => {
      this.selectMediaSingle(event)
    })

    _defineProperty(this, 'selectMediaSingle', event => {
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
          state.selection.from < propPos ? state.selection.from : propPos - 1, // + 3 needed for offset of the media inside mediaSingle and cursor to make whole mediaSingle selected
          state.selection.to > propPos ? state.selection.to : propPos + 2
        )
      } else {
        setNodeSelection(this.props.view, propPos - 1)
      }
    })

    _defineProperty(this, 'handleNewNode', props => {
      const { node } = props
      this.mediaPluginState.handleMediaNodeMount(node, () =>
        this.props.getPos()
      )
    })

    const { view } = this.props
    this.mediaPluginState = mediaStateKey.getState(view.state)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const hasNewViewMediaClientConfig =
      !this.state.viewMediaClientConfig && nextState.viewMediaClientConfig

    if (
      this.props.selected !== nextProps.selected ||
      this.props.uploadComplete !== nextProps.uploadComplete ||
      this.props.node.attrs.id !== nextProps.node.attrs.id ||
      this.props.node.attrs.collection !== nextProps.node.attrs.collection ||
      this.props.maxDimensions.height !== nextProps.maxDimensions.height ||
      this.props.maxDimensions.width !== nextProps.maxDimensions.width ||
      this.props.contextIdentifierProvider !==
        nextProps.contextIdentifierProvider ||
      this.props.isLoading !== nextProps.isLoading ||
      this.props.mediaProvider !== nextProps.mediaProvider ||
      hasNewViewMediaClientConfig
    ) {
      return true
    }

    return false
  }

  async componentDidMount() {
    this.handleNewNode(this.props)
    const { contextIdentifierProvider } = this.props
    this.setState({
      contextIdentifierProvider: await contextIdentifierProvider
    })
    await this.setViewMediaClientConfig()
  }

  componentWillUnmount() {
    const { node } = this.props
    this.mediaPluginState.handleMediaNodeUnmount(node)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.node.attrs.id !== this.props.node.attrs.id) {
      this.mediaPluginState.handleMediaNodeUnmount(prevProps.node)
      this.handleNewNode(this.props)
    }

    this.mediaPluginState.updateElement()
    this.setViewMediaClientConfig()
  }

  render() {
    const {
      node,
      selected,
      uploadComplete,
      originalDimensions,
      isLoading,
      maxDimensions,
      mediaOptions
    } = this.props
    const { viewMediaClientConfig, contextIdentifierProvider } = this.state
    const { id, type, collection, url, alt } = node.attrs

    if (
      isLoading ||
      (type !== 'external' &&
        (!viewMediaClientConfig ||
          (typeof uploadComplete === 'boolean' && !uploadComplete)))
    ) {
      return /*#__PURE__*/ React.createElement(
        MediaCardWrapper,
        {
          dimensions: originalDimensions
        },
        /*#__PURE__*/ React.createElement(CardLoading, null)
      )
    }

    const contextId =
      contextIdentifierProvider && contextIdentifierProvider.objectId
    const identifier =
      type === 'external'
        ? {
            dataURI: url,
            name: url,
            mediaItemType: 'external-image'
          }
        : {
            id,
            mediaItemType: 'file',
            collectionName: collection
          } // mediaClientConfig is not needed for "external" case. So we have to cheat here.
    // there is a possibility mediaClientConfig will be part of a identifier,
    // so this might be not an issue

    const mediaClientConfig = viewMediaClientConfig || {
      authProvider: () => ({})
    }
    return /*#__PURE__*/ React.createElement(
      MediaCardWrapper,
      {
        dimensions: originalDimensions,
        onContextMenu: this.selectMediaSingle
      },
      /*#__PURE__*/ React.createElement(Card, {
        mediaClientConfig: mediaClientConfig,
        resizeMode: 'stretchy-fit',
        dimensions: maxDimensions,
        originalDimensions: originalDimensions,
        identifier: identifier,
        selectable: true,
        selected: selected,
        disableOverlay: true,
        onClick: this.selectMediaSingleFromCard,
        useInlinePlayer: mediaOptions && mediaOptions.allowLazyLoading,
        isLazy: mediaOptions && mediaOptions.allowLazyLoading,
        featureFlags: mediaOptions && mediaOptions.featureFlags,
        contextId: contextId,
        alt: alt
      })
    )
  }
}
export default withImageLoader(MediaNode)
