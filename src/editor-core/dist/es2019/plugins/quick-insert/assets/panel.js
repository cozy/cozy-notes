import React from 'react';
export default function IconPanel({
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
  }), /*#__PURE__*/React.createElement("rect", {
    fill: "#DEEBFF",
    x: 8,
    y: 12,
    width: 32,
    height: 16,
    rx: 1
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 20a4 4 0 108 0 4 4 0 00-8 0z",
    fill: "#0052CC",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("rect", {
    fill: "#FFF",
    fillRule: "nonzero",
    x: 15.556,
    y: 19.722,
    width: 1,
    height: 2.2,
    rx: 0.5
  }), /*#__PURE__*/React.createElement("circle", {
    fill: "#FFF",
    fillRule: "nonzero",
    cx: 16,
    cy: 18.444,
    r: 1
  })));
}