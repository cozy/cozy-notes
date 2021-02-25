import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import styled from 'styled-components';
import { Popup } from '@atlaskit/editor-common';
import { akEditorFloatingDialogZIndex } from '@atlaskit/editor-shared-styles';
import { borderRadius, gridSize } from '@atlaskit/theme/constants';
import { N0, N60A, N50A } from '@atlaskit/theme/colors';
import { divide } from '@atlaskit/theme/math';
import { selectByIndex } from '../commands/select-item';
import { setCurrentIndex } from '../commands/set-current-index';
import { TypeAheadItemsList } from './TypeAheadItemsList';
export const TypeAheadContent = styled.div`
  background: ${N0};
  border-radius: ${borderRadius()}px;
  box-shadow: 0 0 1px ${N60A}, 0 4px 8px -2px ${N50A};
  padding: ${divide(gridSize, 2)}px 0;
  width: 320px;
  max-height: 380px; /* ~5.5 visibile items */
  overflow-y: auto;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  position: relative;
`;
export class TypeAhead extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "composing", false);

    _defineProperty(this, "handleKeyPress", () => {
      // When user starts typing, they are not using their mouse
      // Marks as composing, to prevent false positive mouse events
      this.composing = true;
    });

    _defineProperty(this, "handleMouseMove", () => {
      // User is actively moving mouse, hence can enable mouse events again
      this.composing = false;
    });

    _defineProperty(this, "componentDidMount", () => {
      window.addEventListener('keypress', this.handleKeyPress);
      window.addEventListener('mousemove', this.handleMouseMove);
    });

    _defineProperty(this, "componentWillUnmount", () => {
      window.removeEventListener('keypress', this.handleKeyPress);
      window.removeEventListener('mousemove', this.handleMouseMove);
    });

    _defineProperty(this, "insertByIndex", index => {
      selectByIndex(index)(this.props.editorView.state, this.props.editorView.dispatch);
    });

    _defineProperty(this, "setCurrentIndex", index => {
      if (this.composing) {
        // User is typing, mouse events are false positives
        return;
      }

      if (index !== this.props.currentIndex) {
        setCurrentIndex(index)(this.props.editorView.state, this.props.editorView.dispatch);
      }
    });
  }

  render() {
    const {
      active,
      items,
      isLoading,
      anchorElement,
      currentIndex,
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
      highlight
    } = this.props;

    if (!active || !anchorElement || !items || !items.length) {
      return null;
    }

    return /*#__PURE__*/React.createElement(Popup, {
      zIndex: akEditorFloatingDialogZIndex,
      target: anchorElement,
      mountTo: popupsMountPoint,
      boundariesElement: popupsBoundariesElement,
      scrollableElement: popupsScrollableElement,
      fitHeight: 300,
      fitWidth: 340,
      offset: [0, 8]
    }, /*#__PURE__*/React.createElement(TypeAheadContent, {
      className: "fabric-editor-typeahead"
    }, highlight, Array.isArray(items) ? /*#__PURE__*/React.createElement(TypeAheadItemsList, {
      insertByIndex: this.insertByIndex,
      setCurrentIndex: this.setCurrentIndex,
      items: items,
      currentIndex: currentIndex
    }) : !items && isLoading ? 'loading...' : 'no items'));
  }

}

_defineProperty(TypeAhead, "displayName", 'TypeAhead');