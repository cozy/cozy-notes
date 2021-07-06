import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React from 'react'
import classnames from 'classnames'
import { Resizable } from 're-resizable'
import { gridTypeForLayout } from '../../plugins/grid'
import { snapTo, handleSides } from './utils'
import { richMediaClassName } from '@atlaskit/editor-common'
import { akRichMediaResizeZIndex } from '@atlaskit/editor-shared-styles'
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  EVENT_TYPE
} from '../../plugins/analytics'

const getResizeAnalyticsEvent = (type, size, layout) => {
  const actionSubject =
    type === 'embed' ? ACTION_SUBJECT.EMBEDS : ACTION_SUBJECT.MEDIA_SINGLE
  return {
    action: ACTION.EDITED,
    actionSubject,
    actionSubjectId: ACTION_SUBJECT_ID.RESIZED,
    attributes: {
      size,
      layout
    },
    eventType: EVENT_TYPE.UI
  }
}

const getWidthFromSnapPoints = (width, snapPoints) => {
  if (snapPoints.length) {
    return Math.min(
      Math.max(width, snapPoints[0]),
      snapPoints[snapPoints.length - 1]
    )
  }

  return width
}

export default class Resizer extends React.Component {
  constructor(...args) {
    super(...args)

    _defineProperty(this, 'resizable', /*#__PURE__*/ React.createRef())

    _defineProperty(this, 'state', {
      isResizing: false
    })

    _defineProperty(this, 'handleResizeStart', event => {
      const {
        handleResizeStart,
        highlights,
        displayGrid,
        layout,
        width,
        snapPoints
      } = this.props // prevent creating a drag event on Firefox

      event.preventDefault()

      if (handleResizeStart && !handleResizeStart(event)) {
        return false
      }

      this.setState(
        {
          isResizing: true
        },
        () => {
          const newHighlights = highlights(width, snapPoints)
          displayGrid(
            newHighlights.length > 0,
            gridTypeForLayout(layout),
            newHighlights
          )
        }
      )
    })

    _defineProperty(
      this,
      'handleResize',
      (_event, _direction, _elementRef, delta) => {
        const {
          highlights,
          calcNewSize,
          scaleFactor,
          snapPoints,
          displayGrid,
          layout,
          updateSize
        } = this.props
        const resizable = this.resizable.current
        const { isResizing } = this.state

        if (!resizable || !resizable.state.original || !isResizing) {
          return
        }

        const newWidth = getWidthFromSnapPoints(
          resizable.state.original.width + delta.width * (scaleFactor || 1),
          snapPoints
        )
        const newSize = calcNewSize(newWidth, false)

        if (newSize.layout !== layout) {
          updateSize(newSize.width, newSize.layout)
        }

        const newHighlights = highlights(newWidth, snapPoints)
        displayGrid(
          newHighlights.length > 0,
          gridTypeForLayout(newSize.layout),
          newHighlights
        )
        resizable.updateSize({
          width: newWidth,
          height: 'auto'
        })
        resizable.setState({
          isResizing: true
        })
      }
    )

    _defineProperty(
      this,
      'handleResizeStop',
      (_event, _direction, _elementRef, delta) => {
        const {
          highlights,
          calcNewSize,
          snapPoints,
          displayGrid,
          layout,
          updateSize,
          dispatchAnalyticsEvent,
          nodeType
        } = this.props
        const resizable = this.resizable.current
        const { isResizing } = this.state

        if (!resizable || !resizable.state.original || !isResizing) {
          return
        }

        const newWidth = getWidthFromSnapPoints(
          resizable.state.original.width + delta.width,
          snapPoints
        )
        const snapWidth = snapTo(newWidth, snapPoints)
        const newSize = calcNewSize(snapWidth, true)
        const newHighlights = highlights(newWidth, snapPoints)

        if (dispatchAnalyticsEvent) {
          dispatchAnalyticsEvent(
            getResizeAnalyticsEvent(nodeType, newSize.width, newSize.layout)
          )
        } // show committed grid size

        displayGrid(
          newHighlights.length > 0,
          gridTypeForLayout(newSize.layout),
          newHighlights
        )
        this.setState(
          {
            isResizing: false
          },
          () => {
            updateSize(newSize.width, newSize.layout)
            displayGrid(false, gridTypeForLayout(layout))
          }
        )
      }
    )
  }

  render() {
    const handleStyles = {}
    const handles = {}
    const {
      innerPadding = 0,
      width,
      pctWidth,
      selected,
      layout,
      enable,
      children
    } = this.props
    const { isResizing } = this.state
    handleSides.forEach(side => {
      handles[side] = `richMedia-resize-handle-${side}`
      handleStyles[side] = {
        width: '24px',
        [side]: `${-13 - innerPadding}px`,
        zIndex: akRichMediaResizeZIndex
      }
    })
    const className = classnames(
      richMediaClassName,
      `image-${layout}`,
      this.props.className,
      {
        'is-resizing': isResizing,
        'not-resized': !pctWidth,
        'richMedia-selected': selected,
        'rich-media-wrapped': layout === 'wrap-left' || layout === 'wrap-right'
      }
    ) // Ideally, Resizable would let you pass in the component rather than
    // the div. For now, we just apply the same styles using CSS

    return /*#__PURE__*/ React.createElement(
      Resizable,
      {
        ref: this.resizable,
        size: {
          width: width - innerPadding,
          height: 'auto'
        },
        className: className,
        handleClasses: handles,
        handleStyles: handleStyles,
        enable: enable,
        onResize: this.handleResize,
        onResizeStop: this.handleResizeStop,
        onResizeStart: this.handleResizeStart
      },
      children
    )
  }
}
