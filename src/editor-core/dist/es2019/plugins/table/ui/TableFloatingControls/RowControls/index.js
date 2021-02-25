import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { clearHoverSelection } from '../../../commands';
import { TableCssClassName as ClassName } from '../../../types';
import { getRowClassNames, getRowHeights, getRowsParams } from '../../../utils';
import { tableControlsSpacing, tableToolbarSize } from '../../consts';
export default class RowControls extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "clearHoverSelection", () => {
      const {
        state,
        dispatch
      } = this.props.editorView;
      clearHoverSelection()(state, dispatch);
    });
  }

  render() {
    const {
      editorView,
      tableRef,
      hoveredRows,
      isInDanger,
      isResizing
    } = this.props;

    if (!tableRef) {
      return null;
    }

    const {
      selection
    } = editorView.state;
    const rowHeights = getRowHeights(tableRef);
    const rowsParams = getRowsParams(rowHeights);
    const firstRow = tableRef.querySelector('tr');
    const hasHeaderRow = firstRow ? firstRow.getAttribute('data-header-row') : false;
    return /*#__PURE__*/React.createElement("div", {
      className: ClassName.ROW_CONTROLS
    }, /*#__PURE__*/React.createElement("div", {
      className: ClassName.ROW_CONTROLS_INNER
    }, rowsParams.map(({
      startIndex,
      endIndex,
      height
    }, index) => {
      // if previous row was header row, add its height to our margin
      let marginTop = -1;

      if (index === 1 && hasHeaderRow && this.props.stickyTop !== undefined) {
        marginTop += rowHeights[index - 1] + tableToolbarSize;
      }

      const thisRowSticky = this.props.stickyTop !== undefined && index === 0 && hasHeaderRow;
      return /*#__PURE__*/React.createElement("div", {
        className: `${ClassName.ROW_CONTROLS_BUTTON_WRAP} ${getRowClassNames(startIndex, selection, hoveredRows, isInDanger, isResizing)} ${thisRowSticky ? 'sticky' : ''}`,
        key: startIndex,
        style: {
          height: height,
          marginTop: `${marginTop}px`,
          top: thisRowSticky ? `${this.props.stickyTop + 3}px` : undefined,
          paddingTop: thisRowSticky ? `${tableControlsSpacing}px` : undefined
        }
      }, /*#__PURE__*/React.createElement("button", {
        type: "button",
        className: `${ClassName.ROW_CONTROLS_BUTTON}
                  ${ClassName.CONTROLS_BUTTON}
                `,
        onClick: event => this.props.selectRow(startIndex, event.shiftKey),
        onMouseOver: () => this.props.hoverRows([startIndex]),
        onMouseOut: this.clearHoverSelection,
        "data-start-index": startIndex,
        "data-end-index": endIndex
      }), /*#__PURE__*/React.createElement("div", {
        className: ClassName.CONTROLS_INSERT_MARKER
      }));
    })));
  }

}