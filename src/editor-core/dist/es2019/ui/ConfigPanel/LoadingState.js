import React from 'react'
import Spinner from '@atlaskit/spinner'
import styled from 'styled-components'
const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 64px;
`

const LoadingState = () =>
  /*#__PURE__*/ React.createElement(
    SpinnerWrapper,
    null,
    /*#__PURE__*/ React.createElement(Spinner, {
      size: 'small'
    })
  )

export default LoadingState
