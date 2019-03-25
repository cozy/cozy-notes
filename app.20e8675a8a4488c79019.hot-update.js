webpackHotUpdate("app",{

/***/ "Lpk5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _atlaskit_editor_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("XFEA");
/* harmony import */ var _atlaskit_editor_json_transformer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("4p0z");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("eO8H");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("9/5/");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("zGKU");
/* harmony import */ var cozy_ui_react_Input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("sz63");
/* harmony import */ var cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("VPDz");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _doctype__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("oGRg");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("YuDY");
/* harmony import */ var _lib_collab_provider__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("DrVd");
/* harmony import */ var _lib_collab_client__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("fHK9");
/* harmony import */ var _editor_config__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("lu5+");
/* harmony import */ var _header_menu__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("+7CB");
(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__("0cfB")).enterModule;
  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }












 //import { collabEditProvider } from './collab_provider'





var jsonTransformer = new _atlaskit_editor_json_transformer__WEBPACK_IMPORTED_MODULE_2__["JSONTransformer"]();
var withCollab = true;
var allowPublicCollab = true;

var Form = function Form(props) {
  var readOnlyTitle = props.readOnlyTitle,
      autoSave = props.autoSave; // current state of the note being edited, initialized from the props

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    title: props.note.title,
    content: props.note.content
  }),
      _useState2 = _slicedToArray(_useState, 2),
      note = _useState2[0],
      setNote = _useState2[1]; // first note received in the props, to avoid useless changes in defaultValue


  var firstNote = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    return {
      title: props.note.title,
      content: props.note.content
    };
  }, [props.note._id]); // same with the title placeholder

  var defaultTitleValue = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    return props.note.defaultTitle || Object(_utils__WEBPACK_IMPORTED_MODULE_10__["defaultTitle"])(props.note);
  }, [props.note._id]); // then with the collabProvider to avoid an init at each render

  var userId = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    return "user".concat(Math.floor(Math.random() * 1000));
  }, []);
  var sessionId = userId;
  var url = 'http://localhost:3000';
  var docId = props.note._id;
  var collabProvider = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    return {
      useNativePlugin: true,
      provider: Promise.resolve(new _lib_collab_provider__WEBPACK_IMPORTED_MODULE_11__["default"]({
        docId: docId,
        userId: userId,
        sessionId: sessionId
      }, new _lib_collab_client__WEBPACK_IMPORTED_MODULE_12__["default"]({
        url: url,
        docId: docId,
        userId: userId,
        sessionId: sessionId
      }))),
      inviteToEditHandler: function inviteToEditHandler() {
        return undefined;
      },
      isInviteToEditButtonSelected: true,
      userId: userId
    };
  }, [props.note._id, userId]); // get the previous note in a ref to be able to fetch the last _rev
  // when sending the update to the couch server

  var serverNote = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(props.note);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    serverNote.current = props.note;
  }, [props.note._rev]); // do not save more often than 5000ms
  // it will generate conflict with _rev of couchdb
  // and will overload couch database with useless versions

  var save = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    return lodash_debounce__WEBPACK_IMPORTED_MODULE_4___default()(function (next) {
      return props.saveDocument(_objectSpread({}, serverNote.current, next));
    }, 5000, {
      leading: true,
      trailing: true
    });
  }, [props.note._id]); // fix callbacks

  var onTitleChange = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (e) {
    var newTitle = e.target.value;
    var title = newTitle && newTitle.trim().length > 0 ? newTitle : null;

    if (title != note.title) {
      var newNote = _objectSpread({}, note, {
        title: title
      });

      console.log("save title", title, "with content", note.content);
      setNote(newNote);
      window.setTimeout(function () {
        return save(newNote);
      });
    }
  }, [props.note._id]);
  var onContentChange = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (editorView) {
    console.log(editorView.state);
    var content = JSON.stringify(jsonTransformer.encode(editorView.state.doc), null, 2);

    if (content != note.content) {
      var newNote = _objectSpread({}, note, {
        content: content
      });

      console.log("save content", content, "with title", note.title);
      setNote(newNote);
      window.setTimeout(function () {
        return save(newNote);
      });
    }
  }, [props.note._id]);
  var collabProps = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    return withCollab ? {
      collabEdit: collabProvider
    } : {};
  }, [withCollab, props.note._id]);
  var changeContentProps = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    return autoSave ? {
      onChange: onContentChange
    } : {};
  }, [autoSave, props.note._id]);
  var changeTitleProps = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    return autoSave ? {
      onChange: onTitleChange
    } : {
      readOnly: true
    };
  }, [autoSave, props.note._id]); // then memoize the rendering, the rest is pureComponent

  return Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Input__WEBPACK_IMPORTED_MODULE_6__["default"], _extends({
      fullwidth: true,
      defaultValue: firstNote.title
    }, changeTitleProps, {
      placeholder: defaultTitleValue,
      style: {
        border: 'none',
        fontWeight: 'bold',
        fontSize: '1.5rem',
        marginBottom: '-1rem'
      }
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        flexGrow: '1'
      }
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_atlaskit_editor_core__WEBPACK_IMPORTED_MODULE_1__["Editor"], _extends({}, collabProps, changeContentProps, {
      defaultValue: firstNote.content
    }, _editor_config__WEBPACK_IMPORTED_MODULE_13__["default"], {
      appearance: "full-page",
      placeholder: "Que voulez-vous dire ?",
      shouldFocus: true
    }))));
  }, [props.note._id]);
};

var MutatedForm = Object(cozy_client__WEBPACK_IMPORTED_MODULE_8__["withMutations"])()(Form);

var FormOrSpinner = function FormOrSpinner(props) {
  var _props$notes = props.notes,
      data = _props$notes.data,
      fetchStatus = _props$notes.fetchStatus;
  var isLoading = fetchStatus === 'loading' || fetchStatus === 'pending';
  var couchNote = data && data[0];
  var fakeNote = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    if (allowPublicCollab && withCollab) {
      return {
        _id: props.id,
        id: props.id,
        defaultTitle: "Note collaborative en édition publique"
      };
    } else {
      return undefined;
    }
  }, [props.id, allowPublicCollab]);
  var note = couchNote || fakeNote;

  if (!isLoading && !note) {
    window.setTimeout(function () {
      return props.history.push("/");
    }, 0);
  }

  var showSpinner = isLoading || !note;
  var left = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_7__["default"], {
    icon: "back",
    tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"],
    to: "/",
    className: "sto-app-back",
    label: "Retour \xE0 la liste",
    subtle: true
  });
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("article", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_header_menu__WEBPACK_IMPORTED_MODULE_14__["default"], {
    left: left
  }), showSpinner ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_5__["default"], {
    size: "xxlarge",
    middle: true
  }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MutatedForm, {
    note: note,
    autoSave: couchNote ? true : false
  }));
};

var _default = function _default(_ref) {
  var match = _ref.match;
  var id = match.params.id;

  var query = function query(client) {
    return client.find(_doctype__WEBPACK_IMPORTED_MODULE_9__["default"]).where({
      _id: id
    });
  };

  var Component = Object(cozy_client__WEBPACK_IMPORTED_MODULE_8__["queryConnect"])({
    notes: {
      query: query,
      as: 'notes'
    }
  })(Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["withRouter"])(FormOrSpinner));
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component, {
    id: id
  });
};

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__("0cfB")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(jsonTransformer, "jsonTransformer", "/Users/edas/src/cozy-notes/src/components/notes/editor.jsx");
  reactHotLoader.register(withCollab, "withCollab", "/Users/edas/src/cozy-notes/src/components/notes/editor.jsx");
  reactHotLoader.register(allowPublicCollab, "allowPublicCollab", "/Users/edas/src/cozy-notes/src/components/notes/editor.jsx");
  reactHotLoader.register(Form, "Form", "/Users/edas/src/cozy-notes/src/components/notes/editor.jsx");
  reactHotLoader.register(MutatedForm, "MutatedForm", "/Users/edas/src/cozy-notes/src/components/notes/editor.jsx");
  reactHotLoader.register(FormOrSpinner, "FormOrSpinner", "/Users/edas/src/cozy-notes/src/components/notes/editor.jsx");
  reactHotLoader.register(_default, "default", "/Users/edas/src/cozy-notes/src/components/notes/editor.jsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__("0cfB")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3UD+")(module)))

/***/ })

})
//# sourceMappingURL=app.20e8675a8a4488c79019.hot-update.js.map