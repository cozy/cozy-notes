import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React from 'react'
import styled from 'styled-components'
import ButtonGroup from '@atlaskit/button/button-group'
import Button from '@atlaskit/button/custom-theme-button'
import { borderRadius, gridSize } from '@atlaskit/theme/constants'
import { N40 } from '@atlaskit/theme/colors'
import Toolbar from '../Toolbar'
import PluginSlot from '../PluginSlot'
import WithPluginState from '../WithPluginState'
import ContentStyles from '../ContentStyles'
import { pluginKey as maxContentSizePluginKey } from '../../plugins/max-content-size'
import { stateKey as mediaPluginKey } from '../../plugins/media/pm-plugins/plugin-key'
import { ClickAreaBlock } from '../Addon'
import { tableCommentEditorStyles } from '../../plugins/table/ui/common-styles.css'
import WithFlash from '../WithFlash'
import { WidthConsumer } from '@atlaskit/editor-common'
import { akEditorMobileBreakoutPoint } from '@atlaskit/editor-shared-styles'
import WidthEmitter from '../WidthEmitter'
import { GRID_GUTTER } from '../../plugins/grid'
import classnames from 'classnames'
import { injectIntl } from 'react-intl'
import messages from '../../messages'
const CommentEditorMargin = 14
const CommentEditorSmallerMargin = 8
const CommentEditor = styled.div`
  display: flex;
  flex-direction: column;

  .less-margin .ProseMirror {
    margin: 12px ${CommentEditorSmallerMargin}px ${CommentEditorSmallerMargin}px;
  }

  min-width: 272px;
  /* Border + Toolbar + Footer + (Paragraph + ((Parahraph + Margin) * (DefaultLines - 1)) */
  /* calc(2px + 40px + 24px + ( 20px + (32px * 2))) */
  min-height: 150px;
  height: auto;
  ${props =>
    props.maxHeight
      ? 'max-height: ' + props.maxHeight + 'px;'
      : ''} background-color: white;
  border: 1px solid ${N40};
  box-sizing: border-box;
  border-radius: ${borderRadius()}px;

  max-width: inherit;
  word-wrap: break-word;
`
CommentEditor.displayName = 'CommentEditor'
const TableControlsPadding = 20
const MainToolbar = styled.div`
  position: relative;
  align-items: center;
  padding: ${gridSize()}px ${gridSize()}px 0;
  display: flex;
  height: auto;
  background-color: white;

  padding-left: ${TableControlsPadding}px;

  & > div > *:first-child {
    margin-left: 0;
  }

  .block-type-btn {
    padding-left: 0;
  }
`
MainToolbar.displayName = 'MainToolbar'
const MainToolbarCustomComponentsSlot = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
  padding-right: ${TableControlsPadding}px;
  > div {
    display: flex;
    flex-shrink: 0;
  }
`
MainToolbarCustomComponentsSlot.displayName = 'MainToolbar'
const ContentArea = styled(ContentStyles)`
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 24px;

  /** Hack for Bitbucket to ensure entire editorView gets drop event; see ED-3294 **/
  /** Hack for tables controlls. Otherwise marging collapse and controlls are misplaced. **/
  .ProseMirror {
    margin: 12px ${CommentEditorMargin}px ${CommentEditorMargin}px;
  }

  .gridParent {
    margin-left: ${CommentEditorMargin - GRID_GUTTER}px;
    margin-right: ${CommentEditorMargin - GRID_GUTTER}px;
    width: calc(100% + ${CommentEditorMargin - GRID_GUTTER}px);
  }

  padding: ${TableControlsPadding}px;

  ${tableCommentEditorStyles};
`
ContentArea.displayName = 'ContentArea'
const SecondaryToolbar = styled.div`
  box-sizing: border-box;
  justify-content: flex-end;
  align-items: center;
  display: flex;
  padding: 12px 1px;
`
SecondaryToolbar.displayName = 'SecondaryToolbar'

class Editor extends React.Component {
  constructor(...args) {
    super(...args)

    _defineProperty(this, 'appearance', 'comment')

    _defineProperty(this, 'containerElement', null)

    _defineProperty(this, 'handleSave', () => {
      if (this.props.editorView && this.props.onSave) {
        this.props.onSave(this.props.editorView)
      }
    })

    _defineProperty(this, 'handleCancel', () => {
      if (this.props.editorView && this.props.onCancel) {
        this.props.onCancel(this.props.editorView)
      }
    })

    _defineProperty(this, 'renderChrome', ({ maxContentSize, mediaState }) => {
      const {
        editorDOMElement,
        editorView,
        editorActions,
        eventDispatcher,
        providerFactory,
        contentComponents,
        customContentComponents,
        customPrimaryToolbarComponents,
        primaryToolbarComponents,
        customSecondaryToolbarComponents,
        popupsMountPoint,
        popupsBoundariesElement,
        popupsScrollableElement,
        maxHeight,
        onSave,
        onCancel,
        disabled,
        dispatchAnalyticsEvent,
        intl
      } = this.props
      const maxContentSizeReached =
        maxContentSize && maxContentSize.maxContentSizeReached
      return /*#__PURE__*/ React.createElement(
        WithFlash,
        {
          animate: maxContentSizeReached
        },
        /*#__PURE__*/ React.createElement(
          CommentEditor,
          {
            maxHeight: maxHeight,
            className: 'akEditor'
          },
          /*#__PURE__*/ React.createElement(
            MainToolbar,
            {
              'data-testid': 'ak-editor-main-toolbar'
            },
            /*#__PURE__*/ React.createElement(Toolbar, {
              editorView: editorView,
              editorActions: editorActions,
              eventDispatcher: eventDispatcher,
              providerFactory: providerFactory,
              appearance: this.appearance,
              items: primaryToolbarComponents,
              popupsMountPoint: popupsMountPoint,
              popupsBoundariesElement: popupsBoundariesElement,
              popupsScrollableElement: popupsScrollableElement,
              disabled: !!disabled,
              dispatchAnalyticsEvent: dispatchAnalyticsEvent,
              containerElement: this.containerElement
            }),
            /*#__PURE__*/ React.createElement(
              MainToolbarCustomComponentsSlot,
              null,
              customPrimaryToolbarComponents
            )
          ),
          /*#__PURE__*/ React.createElement(
            ClickAreaBlock,
            {
              editorView: editorView
            },
            /*#__PURE__*/ React.createElement(
              WidthConsumer,
              null,
              ({ width }) => {
                return /*#__PURE__*/ React.createElement(
                  ContentArea,
                  {
                    innerRef: ref => (this.containerElement = ref),
                    className: classnames('ak-editor-content-area', {
                      'less-margin': width < akEditorMobileBreakoutPoint
                    })
                  },
                  customContentComponents,
                  /*#__PURE__*/ React.createElement(PluginSlot, {
                    editorView: editorView,
                    editorActions: editorActions,
                    eventDispatcher: eventDispatcher,
                    dispatchAnalyticsEvent: dispatchAnalyticsEvent,
                    providerFactory: providerFactory,
                    appearance: this.appearance,
                    items: contentComponents,
                    popupsMountPoint: popupsMountPoint,
                    popupsBoundariesElement: popupsBoundariesElement,
                    popupsScrollableElement: popupsScrollableElement,
                    containerElement: this.containerElement,
                    disabled: !!disabled
                  }),
                  editorDOMElement
                )
              }
            )
          ),
          /*#__PURE__*/ React.createElement(WidthEmitter, {
            editorView: editorView
          })
        ),
        /*#__PURE__*/ React.createElement(
          SecondaryToolbar,
          null,
          /*#__PURE__*/ React.createElement(
            ButtonGroup,
            null,
            !!onSave &&
              /*#__PURE__*/ React.createElement(
                Button,
                {
                  appearance: 'primary',
                  onClick: this.handleSave,
                  testId: 'comment-save-button',
                  isDisabled:
                    disabled || (mediaState && !mediaState.allUploadsFinished)
                },
                intl.formatMessage(messages.saveButton)
              ),
            !!onCancel &&
              /*#__PURE__*/ React.createElement(
                Button,
                {
                  appearance: 'subtle',
                  onClick: this.handleCancel,
                  isDisabled: disabled
                },
                intl.formatMessage(messages.cancelButton)
              )
          ),
          /*#__PURE__*/ React.createElement('span', {
            style: {
              flexGrow: 1
            }
          }),
          customSecondaryToolbarComponents
        )
      )
    })
  }

  render() {
    return /*#__PURE__*/ React.createElement(WithPluginState, {
      plugins: {
        maxContentSize: maxContentSizePluginKey,
        mediaState: mediaPluginKey
      },
      render: this.renderChrome
    })
  }
}

_defineProperty(Editor, 'displayName', 'CommentEditorAppearance')

export default injectIntl(Editor)
