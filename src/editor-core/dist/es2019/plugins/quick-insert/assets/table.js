import React from 'react';
export default function IconTable({
  label = ''
}) {
  return /*#__PURE__*/React.createElement("svg", {
    "aria-label": label,
    width: 40,
    height: 40
  }, /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#FFF",
    d: "M0 0h40v40H0z"
  }), /*#__PURE__*/React.createElement("g", {
    stroke: "#C1C7D0"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#FFF",
    d: "M20 16h14v8H20z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20 8h13a1 1 0 011 1v7H20V8z",
    fill: "#DFE1E6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20 24h14v7a1 1 0 01-1 1H20v-8zM6 16h14v8H6z",
    fill: "#FFF"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 8h13v8H6V9a1 1 0 011-1z",
    fill: "#DFE1E6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 24h14v8H7a1 1 0 01-1-1v-7z",
    fill: "#FFF"
  }))));
}