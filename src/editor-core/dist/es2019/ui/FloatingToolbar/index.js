import React from 'react';
import { PureComponent } from 'react';
import { Popup } from '@atlaskit/editor-common';
import { Container } from './styles';
export { handlePositionCalculatedWith, getOffsetParent, getNearestNonTextNode } from './utils';
export default class FloatingToolbar extends PureComponent {
  render() {
    const {
      containerRef,
      children,
      target,
      offset,
      fitWidth,
      fitHeight = 40,
      onPositionCalculated,
      popupsMountPoint,
      popupsBoundariesElement,
      className,
      alignX,
      alignY,
      zIndex
    } = this.props;

    if (!target) {
      return null;
    }

    return /*#__PURE__*/React.createElement(Popup, {
      alignX: alignX,
      alignY: alignY,
      target: target,
      zIndex: zIndex,
      mountTo: popupsMountPoint,
      boundariesElement: popupsBoundariesElement,
      offset: offset,
      fitWidth: fitWidth,
      fitHeight: fitHeight,
      onPositionCalculated: onPositionCalculated
    }, /*#__PURE__*/React.createElement(Container, {
      height: fitHeight,
      className: className,
      innerRef: containerRef
    }, children));
  }

}