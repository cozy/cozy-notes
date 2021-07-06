import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React from 'react'
import AnnotateIcon from '@atlaskit/icon/glyph/media-services/annotate'
import { getMediaClient } from '@atlaskit/media-client'
import Button from '../../floating-toolbar/ui/Button'
import Separator from '../../floating-toolbar/ui/Separator'
import { stateKey } from '../pm-plugins/plugin-key'
import { openMediaEditor } from '../commands/media-editor'
import {
  withAnalytics,
  ACTION_SUBJECT_ID,
  ACTION_SUBJECT,
  ACTION,
  EVENT_TYPE
} from '../../../plugins/analytics'
import { toolbarMessages } from './toolbar-messages'

const annotate = (state, dispatch) => {
  const pluginState = stateKey.getState(state)

  if (!pluginState) {
    return false
  }

  const { mediaSingle } = state.schema.nodes
  const selected = pluginState.selectedMediaContainerNode()

  if (!selected || selected.type !== mediaSingle) {
    return false
  }

  const {
    id,
    collection: collectionName,
    occurrenceKey
  } = selected.firstChild.attrs
  return withAnalytics({
    action: ACTION.CLICKED,
    actionSubject: ACTION_SUBJECT.MEDIA,
    actionSubjectId: ACTION_SUBJECT_ID.ANNOTATE_BUTTON,
    eventType: EVENT_TYPE.UI
  })(
    openMediaEditor(state.selection.from + 1, {
      id,
      collectionName,
      mediaItemType: 'file',
      occurrenceKey
    })
  )(state, dispatch)
}

export class AnnotationToolbar extends React.Component {
  constructor(...args) {
    super(...args)

    _defineProperty(this, 'state', {
      isImage: false
    })

    _defineProperty(this, 'onClickAnnotation', () => {
      const { view } = this.props

      if (view) {
        annotate(view.state, view.dispatch)
      }
    })
  }

  async componentDidMount() {
    await this.checkIsImage()
  }

  async checkIsImage() {
    const mediaClient = getMediaClient(this.props.viewMediaClientConfig)

    if (!this.props.id) {
      return
    }

    try {
      const state = await mediaClient.file.getCurrentState(this.props.id, {
        collectionName: this.props.collection
      })

      if (state && state.status !== 'error' && state.mediaType === 'image') {
        this.setState({
          isImage: true
        })
      }
    } catch (err) {
      // do nothing in case of media-client error
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.setState(
        {
          isImage: false
        },
        () => {
          this.checkIsImage()
        }
      )
    }
  }

  render() {
    if (!this.state.isImage) {
      return null
    }

    const { intl } = this.props
    const title = intl.formatMessage(toolbarMessages.annotate)
    return /*#__PURE__*/ React.createElement(
      React.Fragment,
      null,
      /*#__PURE__*/ React.createElement(Separator, null),
      /*#__PURE__*/ React.createElement(Button, {
        title: title,
        icon: /*#__PURE__*/ React.createElement(AnnotateIcon, {
          label: title
        }),
        onClick: this.onClickAnnotation
      })
    )
  }
}
export const renderAnnotationButton = (pluginState, intl) => {
  return (view, idx) => {
    const selectedContainer = pluginState.selectedMediaContainerNode()

    if (!selectedContainer || !pluginState.mediaClientConfig) {
      return null
    }

    return /*#__PURE__*/ React.createElement(AnnotationToolbar, {
      key: idx,
      viewMediaClientConfig: pluginState.mediaClientConfig,
      id: selectedContainer.firstChild.attrs.id,
      collection: selectedContainer.firstChild.attrs.collection,
      view: view,
      intl: intl
    })
  }
}
