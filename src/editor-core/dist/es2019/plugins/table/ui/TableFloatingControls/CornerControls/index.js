import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import classnames from 'classnames';
import { TableMap } from '@atlaskit/editor-tables/table-map';
import { findTable, isTableSelected, selectTable } from '@atlaskit/editor-tables/utils';
import { clearHoverSelection, hoverTable } from '../../../commands';
import { TableCssClassName as ClassName } from '../../../types';
export default class CornerControls extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "isActive", () => {
      const {
        editorView,
        hoveredRows,
        isResizing
      } = this.props;
      const {
        selection
      } = editorView.state;
      const table = findTable(selection);

      if (!table) {
        return false;
      }

      return isTableSelected(selection) || hoveredRows && hoveredRows.length === TableMap.get(table.node).height && !isResizing;
    });

    _defineProperty(this, "clearHoverSelection", () => {
      const {
        state,
        dispatch
      } = this.props.editorView;
      clearHoverSelection()(state, dispatch);
    });

    _defineProperty(this, "selectTable", () => {
      const {
        state,
        dispatch
      } = this.props.editorView;
      dispatch(selectTable(state.tr).setMeta('addToHistory', false));
    });

    _defineProperty(this, "hoverTable", () => {
      const {
        state,
        dispatch
      } = this.props.editorView;
      hoverTable()(state, dispatch);
    });
  }

  render() {
    const {
      isInDanger,
      tableRef,
      isHeaderColumnEnabled,
      isHeaderRowEnabled
    } = this.props;

    if (!tableRef) {
      return null;
    }

    const isActive = this.isActive();
    return /*#__PURE__*/React.createElement("div", {
      className: classnames(ClassName.CORNER_CONTROLS, {
        active: isActive,
        sticky: this.props.stickyTop !== undefined
      }),
      style: {
        top: this.props.stickyTop !== undefined ? `${this.props.stickyTop}px` : undefined
      }
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: classnames(ClassName.CONTROLS_CORNER_BUTTON, {
        danger: isActive && isInDanger
      }),
      onClick: this.selectTable,
      onMouseOver: this.hoverTable,
      onMouseOut: this.clearHoverSelection
    }), !isHeaderRowEnabled && /*#__PURE__*/React.createElement("div", {
      className: ClassName.CORNER_CONTROLS_INSERT_ROW_MARKER
    }, /*#__PURE__*/React.createElement("div", {
      className: ClassName.CONTROLS_INSERT_MARKER
    })), !isHeaderColumnEnabled && /*#__PURE__*/React.createElement("div", {
      className: ClassName.CORNER_CONTROLS_INSERT_COLUMN_MARKER
    }, /*#__PURE__*/React.createElement("div", {
      className: ClassName.CONTROLS_INSERT_MARKER
    })));
  }

}