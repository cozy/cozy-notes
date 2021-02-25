import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { R100 } from '@atlaskit/theme/colors';
const pulseBackground = keyframes`
  50% {
    background-color: ${R100};
  }
`;
const pulseBackgroundReverse = keyframes`
  0% {
    background-color: ${R100};
  }
  50% {
    background-color: auto;
  }
  100% {
    background-color: ${R100};
  }
`;
const Wrapper = styled.div`
  &.-flash > div {
    animation: 0.25s ease-in-out ${pulseBackgroundReverse};
  }

  & > div {
    animation: ${props => props.animate ? `.25s ease-in-out ${pulseBackground}` : 'none'};
  }
`;
export default class WithFlash extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "toggle", false);
  }

  render() {
    const {
      animate,
      children
    } = this.props;
    this.toggle = animate && !this.toggle;
    return /*#__PURE__*/React.createElement(Wrapper, {
      className: this.toggle ? '-flash' : '',
      animate: animate
    }, children);
  }

}