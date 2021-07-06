import _extends from '@babel/runtime/helpers/extends'
import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React from 'react'
import { Card as SmartCard } from '@atlaskit/smart-card'
import PropTypes from 'prop-types'
import rafSchedule from 'raf-schd'
import { Card } from './genericCard'
import {
  UnsupportedBlock,
  MediaSingle as RichMediaWrapper,
  browser,
  findOverflowScrollParent
} from '@atlaskit/editor-common'
import {
  DEFAULT_EMBED_CARD_HEIGHT,
  DEFAULT_EMBED_CARD_WIDTH
} from '@atlaskit/editor-shared-styles'
import { SelectionBasedNodeView } from '../../../nodeviews/'
import { registerCard } from '../pm-plugins/actions'
import ResizableEmbedCard from '../ui/ResizableEmbedCard'
import { createDisplayGrid } from '../../../plugins/grid'
import WithPluginState from '../../../ui/WithPluginState'
import { pluginKey as widthPluginKey } from '../../width'
import {
  floatingLayouts,
  isRichMediaInsideOfBlockNode
} from '../../../utils/rich-media-utils'
export class EmbedCardComponent extends React.PureComponent {
  constructor(...args) {
    super(...args)

    _defineProperty(this, 'onClick', () => {})

    _defineProperty(this, 'state', {
      hasPreview: true
    })

    _defineProperty(this, 'onResolve', data => {
      const { getPos, view } = this.props

      if (!getPos || typeof getPos === 'boolean') {
        return
      }

      const { title, url } = data // don't dispatch immediately since we might be in the middle of
      // rendering a nodeview

      rafSchedule(() =>
        view.dispatch(
          registerCard({
            title,
            url,
            pos: getPos()
          })(view.state.tr)
        )
      )()

      try {
        const cardContext = this.context.contextAdapter
          ? this.context.contextAdapter.card
          : undefined
        const hasPreview =
          cardContext &&
          cardContext.value.extractors.getPreview(url, this.props.platform)

        if (!hasPreview) {
          this.setState({
            hasPreview: false
          })
        }
      } catch (e) {}
    })

    _defineProperty(this, 'updateSize', (width, layout) => {
      const { state, dispatch } = this.props.view
      const pos = typeof this.props.getPos === 'function' && this.props.getPos()

      if (typeof pos !== 'number') {
        return
      }

      const tr = state.tr.setNodeMarkup(pos, undefined, {
        ...this.props.node.attrs,
        width,
        layout
      })
      tr.setMeta('scrollIntoView', false)
      dispatch(tr)
      return true
    })

    _defineProperty(this, 'getLineLength', (view, pos, originalLineLength) => {
      if (typeof pos === 'number' && isRichMediaInsideOfBlockNode(view, pos)) {
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

      return originalLineLength
    })
  }

  UNSAFE_componentWillMount() {
    const { view } = this.props
    const scrollContainer = findOverflowScrollParent(view.dom)
    this.scrollContainer = scrollContainer || undefined
  }

  render() {
    const {
      node,
      cardContext,
      platform,
      allowResizing,
      fullWidthMode,
      view,
      getPos,
      dispatchAnalyticsEvent
    } = this.props
    let {
      url,
      width: nodeWidth,
      layout,
      originalHeight: height,
      originalWidth: width
    } = node.attrs

    if (!width || !height) {
      width = DEFAULT_EMBED_CARD_WIDTH
      height = DEFAULT_EMBED_CARD_HEIGHT
    }

    const cardProps = {
      layout,
      width,
      height,
      pctWidth: nodeWidth,
      fullWidthMode: fullWidthMode
    }
    const { hasPreview } = this.state
    const cardInner = /*#__PURE__*/ React.createElement(
      React.Fragment,
      null,
      /*#__PURE__*/ React.createElement(WithPluginState, {
        editorView: view,
        plugins: {
          widthState: widthPluginKey
        },
        render: ({ widthState }) => {
          const pos = typeof getPos === 'function' && getPos()
          const lineLength = this.getLineLength(
            view,
            pos,
            widthState && widthState.lineLength
          )
          const containerWidth = isRichMediaInsideOfBlockNode(view, pos)
            ? lineLength
            : widthState.width
          const smartCard = /*#__PURE__*/ React.createElement(SmartCard, {
            url: url,
            appearance: 'embed',
            onClick: this.onClick,
            onResolve: this.onResolve,
            showActions: platform === 'web',
            isFrameVisible: true,
            inheritDimensions: true,
            platform: platform,
            container: this.scrollContainer
          })

          if (!allowResizing || !hasPreview) {
            return /*#__PURE__*/ React.createElement(
              RichMediaWrapper,
              _extends({}, cardProps, {
                nodeType: 'embedCard',
                hasFallbackContainer: hasPreview,
                lineLength: lineLength
              }),
              smartCard
            )
          }

          return /*#__PURE__*/ React.createElement(
            ResizableEmbedCard,
            _extends({}, cardProps, {
              view: this.props.view,
              getPos: getPos,
              lineLength: lineLength,
              gridSize: 12,
              containerWidth: containerWidth,
              displayGrid: createDisplayGrid(this.props.eventDispatcher),
              updateSize: this.updateSize,
              dispatchAnalyticsEvent: dispatchAnalyticsEvent
            }),
            smartCard
          )
        }
      })
    ) // [WS-2307]: we only render card wrapped into a Provider when the value is ready

    return /*#__PURE__*/ React.createElement(
      React.Fragment,
      null,
      cardContext && cardContext.value
        ? /*#__PURE__*/ React.createElement(
            cardContext.Provider,
            {
              value: cardContext.value
            },
            cardInner
          )
        : null
    )
  }
}

_defineProperty(EmbedCardComponent, 'contextTypes', {
  contextAdapter: PropTypes.object
})

const WrappedBlockCard = Card(EmbedCardComponent, UnsupportedBlock)
export class EmbedCard extends SelectionBasedNodeView {
  viewShouldUpdate(nextNode) {
    if (this.node.attrs !== nextNode.attrs) {
      return true
    }

    return super.viewShouldUpdate(nextNode)
  }

  createDomRef() {
    const domRef = document.createElement('div')

    if (browser.chrome && this.reactComponentProps.platform !== 'mobile') {
      // workaround Chrome bug in https://product-fabric.atlassian.net/browse/ED-5379
      // see also: https://github.com/ProseMirror/prosemirror/issues/884
      domRef.contentEditable = 'true'
      domRef.setAttribute('spellcheck', 'false')
    }

    return domRef
  }

  render() {
    const {
      eventDispatcher,
      allowResizing,
      platform,
      fullWidthMode,
      dispatchAnalyticsEvent
    } = this.reactComponentProps
    return /*#__PURE__*/ React.createElement(WrappedBlockCard, {
      node: this.node,
      view: this.view,
      eventDispatcher: eventDispatcher,
      getPos: this.getPos,
      allowResizing: allowResizing,
      platform: platform,
      fullWidthMode: fullWidthMode,
      dispatchAnalyticsEvent: dispatchAnalyticsEvent
    })
  }
}
