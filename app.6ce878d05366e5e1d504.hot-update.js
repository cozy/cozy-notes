webpackHotUpdate("app",{

/***/ "c+Po":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("zGKU");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("eO8H");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var cozy_ui_react_ListItemText__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("oT9l");
/* harmony import */ var cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("VPDz");
/* harmony import */ var cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("B7OX");
/* harmony import */ var cozy_ui_react_Text__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("2cjP");
/* harmony import */ var _add__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("NOZu");
/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("2aiA");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("YuDY");
/* harmony import */ var _header_menu_jsx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("+7CB");
/* harmony import */ var _assets_icons_icon_note_32_svg__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("H/IU");
(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__("0cfB")).enterModule;
  enterModule && enterModule(module);
})();















var Item = function Item(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "note-item"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_6__["default"], {
    icon: _assets_icons_icon_note_32_svg__WEBPACK_IMPORTED_MODULE_12__["default"],
    width: 32,
    height: 32,
    className: "note-icon"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
    to: "/n/".concat(props.note.id),
    className: "note-link"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_ListItemText__WEBPACK_IMPORTED_MODULE_4__["default"], {
    primaryText: Object(_utils__WEBPACK_IMPORTED_MODULE_10__["titleWithDefault"])(props.note),
    secondaryText: "/Notes/2019/demo"
  })));
};

var Row = function Row(props) {
  console.log(props.note);
  var updatedAt = new Date(props.note.cozyMetadata.updatedAt);
  var options = {
    day: "numeric",
    month: "long",
    year: "numeric"
  };
  var formatedUpdatedAt = updatedAt.toLocaleDateString(undefined, options);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
    class: "c-table-row"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    class: "c-table-cell c-table-cell--primary"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Item, props)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    class: "c-table-cell"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("time", {
    datatime: props.note.cozyMetadata.updatedAt
  }, formatedUpdatedAt)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    class: "c-table-cell"
  }, "\u2014"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    class: "c-table-cell"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_5__["default"], {
    theme: "action",
    extension: "narrow",
    icon: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_6__["default"], {
      icon: "dots",
      color: "coolGrey",
      width: "17",
      height: "17"
    }),
    iconOnly: true,
    label: "actions"
  })));
};

var List = function List(props) {
  var notes = props.notes;
  return !notes || !notes.length ? null : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
    className: "notes-list c-table"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", {
    class: "c-table-head"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
    class: "c-table-row-head"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    class: "c-table-header"
  }, "Nom"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    class: "c-table-header"
  }, "Derni\xE8re mise \xE0 jour"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    class: "c-table-header"
  }, "Partages"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    class: "c-table-header"
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, notes.map(function (note) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Row, {
      key: note._id,
      note: note
    });
  })));
};

var ConnectedList = function ConnectedList(props) {
  var _props$notes = props.notes,
      data = _props$notes.data,
      fetchStatus = _props$notes.fetchStatus; // cozy-client statuses

  var isLoading = fetchStatus === 'loading' || fetchStatus === 'pending';
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "notes notes-list-container"
  }, isLoading ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_1__["default"], {
    size: "xxlarge",
    middle: true
  }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_header_menu_jsx__WEBPACK_IMPORTED_MODULE_11__["default"], {
    left: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Text__WEBPACK_IMPORTED_MODULE_7__["MainTitle"], {
      tag: "h1"
    }, "Mes notes"),
    right: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_add__WEBPACK_IMPORTED_MODULE_8__["default"], null)
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(List, {
    notes: data
  })));
};

var _default = Object(cozy_client__WEBPACK_IMPORTED_MODULE_3__["queryConnect"])({
  notes: {
    query: _query__WEBPACK_IMPORTED_MODULE_9__["default"],
    as: 'notes'
  }
})(ConnectedList);

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__("0cfB")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Item, "Item", "/Users/edas/src/cozy-notes/src/components/notes/list.jsx");
  reactHotLoader.register(Row, "Row", "/Users/edas/src/cozy-notes/src/components/notes/list.jsx");
  reactHotLoader.register(List, "List", "/Users/edas/src/cozy-notes/src/components/notes/list.jsx");
  reactHotLoader.register(ConnectedList, "ConnectedList", "/Users/edas/src/cozy-notes/src/components/notes/list.jsx");
  reactHotLoader.register(_default, "default", "/Users/edas/src/cozy-notes/src/components/notes/list.jsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__("0cfB")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3UD+")(module)))

/***/ })

})
//# sourceMappingURL=app.6ce878d05366e5e1d504.hot-update.js.map