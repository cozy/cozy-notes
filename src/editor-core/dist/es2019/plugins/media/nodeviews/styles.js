import React from 'react'
import styled from 'styled-components'
export const FigureWrapper = styled.figure`
  margin: 0;
`
FigureWrapper.displayName = 'FigureWrapper'
const AbsoluteDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`
const ForcedDimensions = styled.div`
  width: 100%;
  position: relative;
  padding-bottom: ${props =>
    (props.dimensions.height / props.dimensions.width) * 100}%;
`
export const MediaCardWrapper = ({ dimensions, children, onContextMenu }) => {
  return /*#__PURE__*/ React.createElement(
    ForcedDimensions,
    {
      dimensions: dimensions,
      onContextMenuCapture: onContextMenu
    },
    /*#__PURE__*/ React.createElement(AbsoluteDiv, null, children)
  )
}
