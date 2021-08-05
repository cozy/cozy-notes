import {
  ContextIdentifierProvider,
  ImageLoaderProps,
  MediaProvider,
  withImageLoader
} from '@atlaskit/editor-common'
import {
  Card,
  CardDimensions,
  CardEvent,
  CardLoading,
  CardOnClickCallback,
  NumericalCardDimensions
} from '@atlaskit/media-card'
import { Identifier } from '@atlaskit/media-client'
import { MediaClientConfig } from '@atlaskit/media-core'
import { Node as PMNode } from 'prosemirror-model'
import { CellSelection } from '@atlaskit/editor-tables/cell-selection'
import { EditorView } from 'prosemirror-view'
import React, { Component } from 'react'
import {
  ProsemirrorGetPosHandler,
  ReactNodeProps
} from '@atlaskit/editor-core/nodeviews'
import { setNodeSelection, setTextSelection } from '@atlaskit/editor-core/utils'
import { stateKey as mediaStateKey } from '../../pm-plugins/plugin-key'
import { MediaPluginState } from '../../pm-plugins/types'
import { MediaCardWrapper } from '../styles'
import { MediaOptions } from '../../types'
import { RealTimeEvent, CozyDoctypes, Errors } from 'constants/strings'
import CollabProvider from 'lib/collab/provider'
import { Q } from 'cozy-client'

// This is being used by DropPlaceholder now
export const MEDIA_HEIGHT = 125
export const FILE_WIDTH = 156

export interface MediaNodeProps extends ReactNodeProps, ImageLoaderProps {
  view: EditorView
  node: PMNode
  getPos: ProsemirrorGetPosHandler
  contextIdentifierProvider?: Promise<ContextIdentifierProvider>
  collabEditProvider?: Promise<CollabProvider>
  originalDimensions: NumericalCardDimensions
  maxDimensions: CardDimensions
  isMediaSingle?: boolean
  onClick?: CardOnClickCallback
  mediaProvider?: Promise<MediaProvider>
  uploadComplete?: boolean
  isLoading?: boolean
  mediaOptions?: MediaOptions
}

interface MediaNodeState {
  viewMediaClientConfig?: MediaClientConfig
  contextIdentifierProvider?: ContextIdentifierProvider
  collabEditProvider?: CollabProvider
  imageUrl: string
  imageError: any
  imageLoading: boolean
}

export class MediaNode extends Component<MediaNodeProps, MediaNodeState> {
  private mediaPluginState: MediaPluginState

  state: MediaNodeState = {
    imageUrl: '',
    imageError: '',
    imageLoading: true,
  }

  realtimeSubscription?: any

  constructor(props: MediaNodeProps) {
    super(props)
    const { view } = this.props
    this.mediaPluginState = mediaStateKey.getState(view.state)
  }

  shouldComponentUpdate(nextProps: MediaNodeProps, nextState: MediaNodeState) {
    const hasNewViewMediaClientConfig =
      !this.state.viewMediaClientConfig && nextState.viewMediaClientConfig
    if (
      this.state.imageUrl !== nextState.imageUrl ||
      this.state.imageError !== nextState.imageError ||
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

    const { contextIdentifierProvider, collabEditProvider } = this.props

    this.setState({
      contextIdentifierProvider: await contextIdentifierProvider,
      collabEditProvider: await collabEditProvider
    })

    // Subscribe as soon as we have collabEditProvider
    // This will allow realtime management of the image during the lifecycle of the component
    this.realtimeSubscription = this.subscribeToImageUpdate()

    // In any case we can try to fetch the image ASAP because it might be ready (page refresh/load)
    await this.fetchCozyImage()

    await this.setViewMediaClientConfig()
  }

  componentWillUnmount() {
    const { node } = this.props
    this.realtimeSubscription?.unsubscribe()
    this.mediaPluginState.handleMediaNodeUnmount(node)
  }

  componentDidUpdate(prevProps: Readonly<MediaNodeProps>) {
    if (prevProps.node.attrs.id !== this.props.node.attrs.id) {
      this.mediaPluginState.handleMediaNodeUnmount(prevProps.node)
      this.handleNewNode(this.props)
    }
    this.mediaPluginState.updateElement()
    this.setViewMediaClientConfig()
  }

  private setViewMediaClientConfig = async () => {
    const mediaProvider = await this.props.mediaProvider
    if (mediaProvider) {
      const viewMediaClientConfig = mediaProvider.viewMediaClientConfig

      this.setState({
        viewMediaClientConfig
      })
    }
  }

  private selectMediaSingleFromCard = ({ event }: CardEvent) => {
    this.selectMediaSingle(event)
  }

  private selectMediaSingle = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
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
        state.selection.from < propPos ? state.selection.from : propPos - 1,
        // + 3 needed for offset of the media inside mediaSingle and cursor to make whole mediaSingle selected
        state.selection.to > propPos ? state.selection.to : propPos + 2
      )
    } else {
      setNodeSelection(this.props.view, propPos - 1)
    }
  }

  // We will display the node image only if the server has finished converting it
  fetchCozyImage = async (): Promise<void> => {
    this.setState({imageError: ''})

    if (!this.state.collabEditProvider) throw Error(Errors.MissingCollabEdit)

    const {
      serviceClient,
      config: { noteId }
    } = this.state.collabEditProvider

    try {
      // Type casting the response inline is not the best solution
      // It still has to be improved upon asap
      // Maybe the best way here is to create an interface from scratch
      // for the collabEditProvider specific to the Cozy-Notes application
      const res: {
        included: {
          attributes: {
            willBeResized: boolean
          }
          id: string
          links: { self: string }
        }[]
      } = await serviceClient.cozyClient.query(
        Q(CozyDoctypes.Files).getById(noteId)
      )

      if (!res) throw Error(Errors.CouldNotGetNoteImages)

      const imageObject = res.included.find(
        ({ id }) => id === this.props.node.attrs.url
      )

      if (!imageObject) throw Error(Errors.CouldNotFindFileInCurrentNote)

      !imageObject.attributes.willBeResized &&
        this.setState({
          imageUrl: `${serviceClient.stackClient.uri}${imageObject.links.self}`,
          imageLoading: false
        })
    } catch (error) {
      this.setState({ imageError: error.message })
    }
  }

  // Should create a type for CC WebSocket subscriptions
  // Void is kinda correct for now
  subscribeToImageUpdate = (): void =>
    this.state.collabEditProvider?.serviceClient.realtime.subscribe(
      RealTimeEvent.Updated,
      CozyDoctypes.NoteEvents,
      this.state.collabEditProvider.config.noteId,
      ({ image_id }: { image_id: string }) =>{
        this.props.node.attrs.url.includes(image_id) &&
        this.setState({ imageLoading: true }, this.fetchCozyImage)}
    )

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
      this.state.imageLoading ||
      !this.state.imageUrl ||
      this.state.imageError ||
      isLoading ||
      (type !== 'external' &&
        (!viewMediaClientConfig ||
          (typeof uploadComplete === 'boolean' && !uploadComplete)))
    ) {
      return (
        <MediaCardWrapper dimensions={originalDimensions}>
          <CardLoading />
        </MediaCardWrapper>
      )
    }

    const contextId =
      contextIdentifierProvider && contextIdentifierProvider.objectId
    const identifier: Identifier =
      type === 'external'
        ? {
            dataURI: this.state.imageUrl,
            name: url,
            mediaItemType: 'external-image'
          }
        : {
            id,
            mediaItemType: 'file',
            collectionName: collection!
          }

    // mediaClientConfig is not needed for "external" case. So we have to cheat here.
    // there is a possibility mediaClientConfig will be part of a identifier,
    // so this might be not an issue
    const mediaClientConfig: MediaClientConfig = viewMediaClientConfig || {
      authProvider: () => ({} as any)
    }

    return (
      <MediaCardWrapper
        dimensions={originalDimensions}
        onContextMenu={this.selectMediaSingle}
      >
        <Card
          mediaClientConfig={mediaClientConfig}
          resizeMode="stretchy-fit"
          dimensions={maxDimensions}
          originalDimensions={originalDimensions}
          identifier={identifier}
          selectable={true}
          selected={selected}
          disableOverlay={true}
          onClick={this.selectMediaSingleFromCard}
          useInlinePlayer={mediaOptions && mediaOptions.allowLazyLoading}
          isLazy={mediaOptions && mediaOptions.allowLazyLoading}
          featureFlags={mediaOptions && mediaOptions.featureFlags}
          contextId={contextId}
          alt={alt}
        />
      </MediaCardWrapper>
    )
  }

  private handleNewNode = (props: MediaNodeProps) => {
    const { node } = props

    this.mediaPluginState.handleMediaNodeMount(node, () => this.props.getPos())
  }
}

export default withImageLoader<MediaNodeProps>(MediaNode)
