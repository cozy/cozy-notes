import _extends from '@babel/runtime/helpers/extends'
import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React from 'react'
import {
  findParentNodeOfTypeClosestToPos,
  hasParentNodeOfType
} from 'prosemirror-utils'
import { getMediaClient } from '@atlaskit/media-client'
import {
  calcPctFromPx,
  calcColumnsFromPx,
  wrappedLayouts
} from '@atlaskit/editor-common'
import { akEditorWideLayoutWidth } from '@atlaskit/editor-shared-styles'
import { Wrapper } from './styled'
import Resizer from '../../../../ui/Resizer'
import {
  snapTo,
  handleSides,
  imageAlignmentMap
} from '../../../../ui/Resizer/utils'
import { calcMediaPxWidth } from '../../utils/media-single'
import { getPluginState } from '../../../table/pm-plugins/table-resizing/plugin-factory'
import { calculateSnapPoints } from '../../../../utils/rich-media-utils'
export default class ResizableMediaSingle extends React.Component {
  constructor(...args) {
    super(...args)

    _defineProperty(this, 'state', {
      offsetLeft: calcOffsetLeft(
        this.insideInlineLike,
        this.insideLayout,
        this.props.view.dom,
        undefined
      ),
      // We default to true until we resolve the file type
      isVideoFile: true
    })

    _defineProperty(this, 'calcNewSize', (newWidth, stop) => {
      const {
        layout,
        view: { state }
      } = this.props
      const newPct = calcPctFromPx(newWidth, this.props.lineLength) * 100
      this.setState({
        resizedPctWidth: newPct
      })
      let newLayout = hasParentNodeOfType(state.schema.nodes.table)(
        state.selection
      )
        ? layout
        : this.calcUnwrappedLayout(newPct, newWidth)

      if (newPct <= 100) {
        if (this.wrappedLayout && (stop ? newPct !== 100 : true)) {
          newLayout = layout
        }

        return {
          width: newPct,
          layout: newLayout
        }
      } else {
        return {
          width: this.props.pctWidth || null,
          layout: newLayout
        }
      }
    })

    _defineProperty(this, 'calcUnwrappedLayout', (pct, width) => {
      if (pct <= 100) {
        return 'center'
      }

      if (width <= akEditorWideLayoutWidth) {
        return 'wide'
      }

      return 'full-width'
    })

    _defineProperty(this, 'calcColumnLeftOffset', () => {
      const { offsetLeft } = this.state
      return this.insideInlineLike
        ? calcColumnsFromPx(
            offsetLeft,
            this.props.lineLength,
            this.props.gridSize
          )
        : 0
    })

    _defineProperty(this, 'calcPxWidth', useLayout => {
      const {
        width: origWidth,
        height: origHeight,
        layout,
        pctWidth,
        lineLength,
        containerWidth,
        fullWidthMode,
        getPos,
        view: { state }
      } = this.props
      const { resizedPctWidth } = this.state
      const pos = typeof getPos === 'function' ? getPos() : undefined
      return calcMediaPxWidth({
        origWidth,
        origHeight,
        pctWidth,
        state,
        containerWidth: {
          width: containerWidth,
          lineLength
        },
        isFullWidthModeEnabled: fullWidthMode,
        layout: useLayout || layout,
        pos: pos,
        resizedPctWidth
      })
    })

    _defineProperty(this, 'highlights', (newWidth, snapPoints) => {
      const snapWidth = snapTo(newWidth, snapPoints)
      const {
        layoutColumn,
        table,
        expand,
        nestedExpand
      } = this.props.view.state.schema.nodes

      if (
        this.$pos &&
        !!findParentNodeOfTypeClosestToPos(
          this.$pos,
          [layoutColumn, table, expand, nestedExpand].filter(Boolean)
        )
      ) {
        return []
      }

      if (snapWidth > akEditorWideLayoutWidth) {
        return ['full-width']
      }

      const { layout, lineLength, gridSize } = this.props
      const columns = calcColumnsFromPx(snapWidth, lineLength, gridSize)
      const columnWidth = Math.round(columns)
      const highlight = []

      if (layout === 'wrap-left' || layout === 'align-start') {
        highlight.push(0, columnWidth)
      } else if (layout === 'wrap-right' || layout === 'align-end') {
        highlight.push(gridSize, gridSize - columnWidth)
      } else if (this.insideInlineLike) {
        highlight.push(Math.round(columns + this.calcColumnLeftOffset()))
      } else {
        highlight.push(
          Math.floor((gridSize - columnWidth) / 2),
          Math.ceil((gridSize + columnWidth) / 2)
        )
      }

      return highlight
    })

    _defineProperty(this, 'saveWrapper', wrapper => (this.wrapper = wrapper))
  }

  componentDidUpdate() {
    const offsetLeft = calcOffsetLeft(
      this.insideInlineLike,
      this.insideLayout,
      this.props.view.dom,
      this.wrapper
    )

    if (offsetLeft !== this.state.offsetLeft && offsetLeft >= 0) {
      this.setState({
        offsetLeft
      })
    }

    return true
  }

  get wrappedLayout() {
    return wrappedLayouts.indexOf(this.props.layout) > -1
  }

  async componentDidMount() {
    const { viewMediaClientConfig } = this.props

    if (viewMediaClientConfig) {
      await this.checkVideoFile(viewMediaClientConfig)
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.viewMediaClientConfig !== nextProps.viewMediaClientConfig) {
      this.checkVideoFile(nextProps.viewMediaClientConfig)
    }

    if (this.props.layout !== nextProps.layout) {
      this.checkLayout(this.props.layout, nextProps.layout)
    }
  }

  async checkVideoFile(viewMediaClientConfig) {
    const $pos = this.$pos

    if (!$pos || !viewMediaClientConfig) {
      return
    }

    const mediaNode = this.props.view.state.doc.nodeAt($pos.pos + 1)

    if (!mediaNode || !mediaNode.attrs.id) {
      return
    }

    const mediaClient = getMediaClient(viewMediaClientConfig)

    try {
      const state = await mediaClient.file.getCurrentState(mediaNode.attrs.id, {
        collectionName: mediaNode.attrs.collection
      })

      if (state && state.status !== 'error' && state.mediaType === 'image') {
        this.setState({
          isVideoFile: false
        })
      }
    } catch (err) {
      this.setState({
        isVideoFile: false
      })
    }
  }
  /**
   * When returning to center layout from a wrapped/aligned layout, it might actually
   * be wide or full-width
   */

  checkLayout(oldLayout, newLayout) {
    const { resizedPctWidth } = this.state

    if (
      wrappedLayouts.indexOf(oldLayout) > -1 &&
      newLayout === 'center' &&
      resizedPctWidth
    ) {
      const layout = this.calcUnwrappedLayout(
        resizedPctWidth,
        this.calcPxWidth(newLayout)
      )
      this.props.updateSize(resizedPctWidth, layout)
    }
  }

  get $pos() {
    if (typeof this.props.getPos !== 'function') {
      return null
    }

    const pos = this.props.getPos()

    if (Number.isNaN(pos) || typeof pos !== 'number') {
      return null
    } // need to pass view because we may not get updated props in time

    return this.props.view.state.doc.resolve(pos)
  }
  /**
   * The maxmimum number of grid columns this node can resize to.
   */

  get gridWidth() {
    const { gridSize } = this.props
    return !(this.wrappedLayout || this.insideInlineLike)
      ? gridSize / 2
      : gridSize
  }

  get insideInlineLike() {
    const $pos = this.$pos

    if (!$pos) {
      return false
    }

    const { listItem } = this.props.view.state.schema.nodes
    return !!findParentNodeOfTypeClosestToPos($pos, [listItem])
  }

  get insideLayout() {
    const $pos = this.$pos

    if (!$pos) {
      return false
    }

    const { layoutColumn } = this.props.view.state.schema.nodes
    return !!findParentNodeOfTypeClosestToPos($pos, [layoutColumn])
  }

  render() {
    const {
      width: origWidth,
      height: origHeight,
      layout,
      pctWidth,
      containerWidth,
      fullWidthMode,
      selected,
      view: { state },
      children
    } = this.props
    const pxWidth = this.calcPxWidth() // scale, keeping aspect ratio

    const height = (origHeight / origWidth) * pxWidth
    const width = pxWidth
    const enable = {}
    handleSides.forEach(side => {
      const oppositeSide = side === 'left' ? 'right' : 'left'
      enable[side] =
        ['full-width', 'wide', 'center']
          .concat(`wrap-${oppositeSide}`)
          .concat(`align-${imageAlignmentMap[oppositeSide]}`)
          .indexOf(layout) > -1

      if (side === 'left' && this.insideInlineLike) {
        enable[side] = false
      }
    })
    const snapPointsProps = {
      $pos: this.$pos,
      akEditorWideLayoutWidth: akEditorWideLayoutWidth,
      allowBreakoutSnapPoints: this.props.allowBreakoutSnapPoints,
      containerWidth: this.props.containerWidth,
      gridSize: this.props.gridSize,
      gridWidth: this.gridWidth,
      insideInlineLike: this.insideInlineLike,
      insideLayout: this.insideLayout,
      isVideoFile: this.state.isVideoFile,
      lineLength: this.props.lineLength,
      offsetLeft: this.state.offsetLeft,
      wrappedLayout: this.wrappedLayout
    }
    return /*#__PURE__*/ React.createElement(
      Wrapper,
      {
        ratio: ((height / width) * 100).toFixed(3),
        layout: layout,
        isResized: !!pctWidth,
        containerWidth: containerWidth || origWidth,
        innerRef: this.saveWrapper,
        fullWidthMode: fullWidthMode
      },
      /*#__PURE__*/ React.createElement(
        Resizer,
        _extends({}, this.props, {
          width: width,
          height: height,
          selected: selected,
          enable: enable,
          calcNewSize: this.calcNewSize,
          snapPoints: calculateSnapPoints(snapPointsProps),
          scaleFactor: !this.wrappedLayout && !this.insideInlineLike ? 2 : 1,
          highlights: this.highlights,
          handleResizeStart: () => {
            const columResizingPluginState = getPluginState(state)
            return columResizingPluginState
              ? !columResizingPluginState.dragging
              : true
          },
          nodeType: 'media',
          dispatchAnalyticsEvent: this.props.dispatchAnalyticsEvent
        }),
        children
      )
    )
  }
}
export function calcOffsetLeft(
  insideInlineLike,
  insideLayout,
  pmViewDom,
  wrapper
) {
  let offsetLeft = 0

  if (wrapper && insideInlineLike && !insideLayout) {
    const currentNode = wrapper
    const boundingRect = currentNode.getBoundingClientRect()
    offsetLeft = boundingRect.left - pmViewDom.getBoundingClientRect().left
  }

  return offsetLeft
}
