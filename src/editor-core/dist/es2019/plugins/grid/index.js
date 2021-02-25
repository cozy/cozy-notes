import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import classnames from 'classnames';
import { withTheme } from 'styled-components';
import { PluginKey } from 'prosemirror-state';
import { breakoutWideScaleRatio, akEditorFullPageMaxWidth, akEditorBreakoutPadding } from '@atlaskit/editor-shared-styles';
import { pluginKey as widthPlugin } from '../width/index';
import WithPluginState from '../../ui/WithPluginState';
import { createDispatch } from '../../event-dispatcher';
export const stateKey = new PluginKey('gridPlugin');
export const GRID_SIZE = 12;
export const createDisplayGrid = eventDispatcher => {
  const dispatch = createDispatch(eventDispatcher);
  return (show, type, highlight = []) => {
    return dispatch(stateKey, {
      visible: show,
      gridType: type,
      highlight: highlight
    });
  };
};
export const gridTypeForLayout = layout => layout === 'wrap-left' || layout === 'wrap-right' ? 'wrapped' : 'full';
const sides = ['left', 'right'];

const overflowHighlight = (highlights, side, start, size) => {
  if (!highlights.length) {
    return false;
  }

  const minHighlight = highlights.reduce((prev, cur) => Math.min(prev, cur));
  const maxHighlight = highlights.reduce((prev, cur) => Math.max(prev, cur));

  if (side === 'left') {
    return minHighlight < 0 && minHighlight <= -start && (typeof size === 'number' ? minHighlight >= -(start + size) : true);
  } else {
    return maxHighlight > GRID_SIZE && maxHighlight >= GRID_SIZE + start && (typeof size === 'number' ? maxHighlight <= GRID_SIZE + size : true);
  }
};

const gutterGridLines = (editorMaxWidth, editorWidth, highlights, shouldCalcBreakoutGridLines) => {
  const gridLines = [];

  if (!shouldCalcBreakoutGridLines) {
    return gridLines;
  }

  const wideSpacing = (editorMaxWidth * breakoutWideScaleRatio - editorMaxWidth) / 2;
  sides.forEach(side => {
    gridLines.push( /*#__PURE__*/React.createElement("div", {
      key: side,
      className: classnames('gridLine', overflowHighlight(highlights, side, 0, 4) ? 'highlight' : ''),
      style: {
        position: 'absolute',
        [side]: `-${wideSpacing}px`
      }
    }));
    gridLines.push( /*#__PURE__*/React.createElement("div", {
      key: side + '-bk',
      className: classnames('gridLine', highlights.indexOf('full-width') > -1 ? 'highlight' : ''),
      style: {
        position: 'absolute',
        [side]: `-${(editorWidth - editorMaxWidth - akEditorBreakoutPadding) / 2}px`
      }
    }));
  });
  return gridLines;
};

const lineLengthGridLines = highlights => {
  const gridLines = [];
  const gridSpacing = 100 / GRID_SIZE;

  for (let i = 0; i <= GRID_SIZE; i++) {
    const style = {
      paddingLeft: `${gridSpacing}%`
    };
    gridLines.push( /*#__PURE__*/React.createElement("div", {
      key: i,
      className: classnames('gridLine', highlights.indexOf(i) > -1 ? 'highlight' : ''),
      style: i < GRID_SIZE ? style : undefined
    }));
  }

  return gridLines;
};

class Grid extends React.Component {
  render() {
    const {
      highlight,
      shouldCalcBreakoutGridLines,
      theme,
      containerElement,
      editorWidth,
      gridType,
      visible
    } = this.props;
    const editorMaxWidth = theme.layoutMaxWidth;
    let gridLines = [...lineLengthGridLines(highlight), ...gutterGridLines(editorMaxWidth, editorWidth, highlight, shouldCalcBreakoutGridLines)];
    return /*#__PURE__*/React.createElement("div", {
      className: "gridParent"
    }, /*#__PURE__*/React.createElement("div", {
      className: classnames('gridContainer', gridType),
      style: {
        height: `${containerElement.scrollHeight}px`,
        display: visible ? 'block' : 'none'
      }
    }, gridLines));
  }

}

const ThemedGrid = withTheme(Grid);

const gridPlugin = options => ({
  name: 'grid',
  contentComponent: ({
    editorView
  }) => {
    return /*#__PURE__*/React.createElement(WithPluginState, {
      plugins: {
        grid: stateKey,
        widthState: widthPlugin
      },
      render: ({
        grid,
        widthState = {
          width: akEditorFullPageMaxWidth
        }
      }) => {
        if (!grid) {
          return null;
        }

        return /*#__PURE__*/React.createElement(ThemedGrid, _extends({
          shouldCalcBreakoutGridLines: options && options.shouldCalcBreakoutGridLines,
          editorWidth: widthState.width,
          containerElement: editorView.dom
        }, grid));
      }
    });
  }
});

export default gridPlugin;
export { GRID_GUTTER } from './styles';