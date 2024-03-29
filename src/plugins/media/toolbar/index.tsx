import React from 'react'
import { InjectedIntl } from 'react-intl'
import { EditorState } from 'prosemirror-state'
import { removeSelectedNode } from 'prosemirror-utils'
import RemoveIcon from '@atlaskit/icon/glyph/editor/remove'
import commonMessages from '@atlaskit/editor-core/messages'
import { Command } from '@atlaskit/editor-core/types'
import {
  FloatingToolbarConfig,
  FloatingToolbarItem
} from '@atlaskit/editor-core/plugins/floating-toolbar/types'
import { stateKey } from '../pm-plugins/plugin-key'
import { hoverDecoration } from '@atlaskit/editor-core/plugins/base/pm-plugins/decoration'
import { renderAnnotationButton } from './annotation'
import { getLinkingToolbar, shouldShowMediaLinkToolbar } from './linking'
import buildLayoutButtons from '@atlaskit/editor-core/ui/MediaAndEmbedsToolbar'
import { MediaLinkingState, getMediaLinkingState } from '../pm-plugins/linking'
import { getPluginState as getMediaAltTextPluginState } from '../pm-plugins/alt-text'
import { altTextButton, getAltTextToolbar } from './alt-text'
import { MediaFloatingToolbarOptions } from '../types'
import { MediaPluginState } from '../pm-plugins/types'
import { showLinkingToolbar } from '../commands/linking'
import { LinkToolbarAppearance } from './linking-toolbar-appearance'
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  addAnalytics,
  EVENT_TYPE
} from '@atlaskit/editor-core/plugins/analytics'

const remove: Command = (state, dispatch) => {
  if (dispatch) {
    dispatch(removeSelectedNode(state.tr))
  }
  return true
}

export const floatingToolbar = (
  state: EditorState,
  intl: InjectedIntl,
  options: MediaFloatingToolbarOptions = {}
): FloatingToolbarConfig | undefined => {
  const {
    providerFactory,
    allowResizing,
    allowAnnotation,
    allowLinking,
    allowAdvancedToolBarOptions,
    allowResizingInTables,
    allowAltTextOnImages,
    altTextValidator
  } = options
  const { mediaSingle } = state.schema.nodes
  const pluginState: MediaPluginState | undefined = stateKey.getState(state)
  const mediaLinkingState: MediaLinkingState = getMediaLinkingState(state)

  if (!mediaSingle || !pluginState) {
    return
  }
  const baseToolbar = {
    title: 'Media floating controls',
    nodeType: mediaSingle,
    getDomRef: () => pluginState.element
  }

  if (
    allowLinking &&
    mediaLinkingState &&
    mediaLinkingState.visible &&
    shouldShowMediaLinkToolbar(state)
  ) {
    const linkingToolbar = getLinkingToolbar(
      baseToolbar,
      mediaLinkingState,
      state,
      intl,
      providerFactory
    )
    if (linkingToolbar) {
      return linkingToolbar
    }
  }

  let toolbarButtons: FloatingToolbarItem<Command>[] = []
  if (allowAdvancedToolBarOptions) {
    toolbarButtons = buildLayoutButtons(
      state,
      intl,
      state.schema.nodes.mediaSingle,
      allowResizing,
      allowResizingInTables
    )
    if (toolbarButtons.length) {
      if (allowAnnotation) {
        toolbarButtons.push({
          type: 'custom',
          render: renderAnnotationButton(pluginState, intl)
        })
      }
    }

    if (allowLinking && shouldShowMediaLinkToolbar(state)) {
      const showSeparatorLeft = toolbarButtons.length > 0

      toolbarButtons.push({
        type: 'custom',
        render: (editorView, idx) => {
          if (editorView?.state) {
            const editLink = () => {
              if (editorView) {
                const { state, dispatch } = editorView
                showLinkingToolbar(state, dispatch)
              }
            }

            const openLink = () => {
              if (editorView) {
                const { state, dispatch } = editorView
                dispatch(
                  addAnalytics(state, state.tr, {
                    eventType: EVENT_TYPE.TRACK,
                    action: ACTION.VISITED,
                    actionSubject: ACTION_SUBJECT.MEDIA,
                    actionSubjectId: ACTION_SUBJECT_ID.LINK
                  })
                )
                return true
              }
            }

            return (
              <LinkToolbarAppearance
                key={idx}
                editorState={editorView.state}
                intl={intl}
                mediaLinkingState={mediaLinkingState}
                onAddLink={editLink}
                onEditLink={editLink}
                onOpenLink={openLink}
                showSeparatorLeft={showSeparatorLeft}
              />
            )
          }
          return null
        }
      })
    }

    if (toolbarButtons.length) {
      toolbarButtons.push({ type: 'separator' })
    }
  }

  if (allowAltTextOnImages) {
    const mediaAltTextPluginState = getMediaAltTextPluginState(state)
    if (mediaAltTextPluginState.isAltTextEditorOpen) {
      return getAltTextToolbar(baseToolbar, {
        altTextValidator
      })
    } else {
      toolbarButtons.push(altTextButton(intl, state), { type: 'separator' })
    }
  }

  const items: Array<FloatingToolbarItem<Command>> = [
    ...toolbarButtons,
    {
      type: 'button',
      appearance: 'danger',
      icon: RemoveIcon,
      onMouseEnter: hoverDecoration(mediaSingle, true),
      onMouseLeave: hoverDecoration(mediaSingle, false),
      title: intl.formatMessage(commonMessages.remove),
      onClick: remove,
      testId: 'media-toolbar-remove-button'
    }
  ]

  return {
    ...baseToolbar,
    items
  }
}
