import React from 'react';
import { MobileAppearance } from '../AppearanceComponents/Mobile';
import WidthEmitter from '../WidthEmitter';
export default function Mobile({
  editorView,
  maxHeight,
  editorDOMElement
}) {
  return /*#__PURE__*/React.createElement(MobileAppearance, {
    editorView: editorView || null,
    maxHeight: maxHeight
  }, editorDOMElement, editorView && /*#__PURE__*/React.createElement(WidthEmitter, {
    editorView: editorView
  }));
}