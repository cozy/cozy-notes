/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({"@atlaskit-internal_media-viewer-pdf-viewer":"@atlaskit-internal_media-viewer-pdf-viewer"}[chunkId]||chunkId) + "/notes.js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "+7CB":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


var HeaderMenu = function HeaderMenu(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", {
    className: 'page-header-menu ' + (props.className || '')
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "page-header-menu--left"
  }, props.left), props.children, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "page-header-menu--right"
  }, props.right));
};

/* harmony default export */ __webpack_exports__["default"] = (HeaderMenu);

/***/ }),

/***/ "/KVF":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./en": "7dT6",
	"./en.json": "7dT6",
	"./fr": "9pOX",
	"./fr.json": "9pOX"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "/KVF";

/***/ }),

/***/ "/kYV":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("201c");
__webpack_require__("7NIr");
module.exports = __webpack_require__("LiWt");


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "7dT6":
/***/ (function(module) {

module.exports = JSON.parse("{\"Notes\":{\"Add\":{\"add_note\":\"Add a note\"},\"EditorLoading\":{\"back_to_list\":\"Back to the list\"},\"EditorView\":{\"main_placeholder\":\"Write anything…\"},\"Editor\":{\"title_placeholder\":\"Here is your title\"},\"List\":{\"my_notes\":\"My Notes\",\"name\":\"Name\",\"updated_at\":\"Updated at\",\"location\":\"Location\",\"sharings\":\"Sharings\"},\"Empty\":{\"welcome\":\"Welcome on Cozy Notes\",\"after_created\":\"Once your Note is created, you can find it in your Cozy Drive\"}},\"Error\":{\"unshared_title\":\"This share is no longer active\",\"unshared_text\":\"The owner may have revoked this share. You can no longer edit a note at this address.\"}}");

/***/ }),

/***/ "8i3i":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SharingWidget; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_sharing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("UmWK");
/* harmony import */ var cozy_sharing_dist_withLocales__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("AQIY");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var LocalizedSharingProvider = Object(cozy_sharing_dist_withLocales__WEBPACK_IMPORTED_MODULE_2__["default"])(cozy_sharing__WEBPACK_IMPORTED_MODULE_1__["default"]);
function SharingWidget(props) {
  var file = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    var id = props.fileId || props.file.id || props.file._id;
    var type = props.file && (props.file.type || props.file._type) || 'io.cozy.files';
    return _objectSpread({
      _id: id,
      id: id,
      _type: type,
      type: type
    }, props.file || {});
  });

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState2 = _slicedToArray(_useState, 2),
      showModal = _useState2[0],
      setShowModal = _useState2[1];

  var onClick = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function () {
    return setShowModal(!showModal);
  }, []);
  var onClose = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function () {
    return setShowModal(false);
  }, []);
  var docId = file.id;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(LocalizedSharingProvider, {
    doctype: file.type,
    documentType: "Notes"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_sharing__WEBPACK_IMPORTED_MODULE_1__["ShareButton"], {
    theme: "primary",
    docId: docId,
    onClick: onClick,
    label: "",
    extension: "narrow",
    iconOnly: true
  }), showModal && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_sharing__WEBPACK_IMPORTED_MODULE_1__["ShareModal"], {
    document: file,
    onClose: onClose
  }));
}

/***/ }),

/***/ "9pOX":
/***/ (function(module) {

module.exports = JSON.parse("{\"Notes\":{\"Add\":{\"add_note\":\"Ajouter une note\"},\"EditorLoading\":{\"back_to_list\":\"Retour à la liste\"},\"EditorView\":{\"main_placeholder\":\"Écrivez ce que vous souhaitez…\"},\"Editor\":{\"title_placeholder\":\"Ici votre titre\"},\"List\":{\"my_notes\":\"Mes Notes\",\"name\":\"Nom\",\"updated_at\":\"Mise à jour\",\"location\":\"Emplacement\",\"sharings\":\"Partage\"},\"Empty\":{\"welcome\":\"Bienvenue sur Cozy Notes\",\"after_created\":\"Une fois votre note créée, il vous est possible de la retrouver dans Cozy Drive\"}},\"Error\":{\"unshared_title\":\"Le partage n'est plus actif\",\"unshared_text\":\"Le propriétaire a peut-être révoqué ce partage. Vous ne pouvez plus éditer de note à cette adresse.\"}}");

/***/ }),

/***/ "AIob":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _atlaskit_editor_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("ND5g");
/* harmony import */ var cozy_ui_react_Text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("kyGY");
/* harmony import */ var cozy_ui_react_Textarea__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("jWvl");
/* harmony import */ var _editor_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("lu5+");
/* harmony import */ var _back_from_editing__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("nKHk");
/* harmony import */ var _header_menu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("+7CB");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("buk/");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }










function updateTextareaHeight(target) {
  target.style.height = 'inherit';
  target.style.height = "".concat(target.scrollHeight, "px");
}

function EditorView(props) {
  var defaultValue = props.defaultValue,
      onTitleChange = props.onTitleChange,
      onContentChange = props.onContentChange,
      defaultTitle = props.defaultTitle,
      title = props.title,
      collabProvider = props.collabProvider,
      returnUrl = props.returnUrl,
      t = props.t;
  var titleEl = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  var onTitleEvent = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (e) {
    var target = e.target;
    updateTextareaHeight(target);
    if (onTitleChange) onTitleChange(e);
  }, [onTitleChange]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    return updateTextareaHeight(titleEl.current);
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("article", {
    className: "note-article"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("style", null, "#coz-bar ", '{ display: none }'), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_header_menu__WEBPACK_IMPORTED_MODULE_6__["default"], {
    left: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_back_from_editing__WEBPACK_IMPORTED_MODULE_5__["default"], {
      returnUrl: returnUrl
    }),
    className: "note-header-menu--editing",
    right: props.actions
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
    className: "note-editor-container"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_atlaskit_editor_core__WEBPACK_IMPORTED_MODULE_1__["Editor"], _extends({
    collabEdit: collabProvider,
    onChange: onContentChange,
    defaultValue: defaultValue
  }, _editor_config__WEBPACK_IMPORTED_MODULE_4__["default"], {
    appearance: "full-page",
    placeholder: t('Notes.EditorView.main_placeholder'),
    shouldFocus: true,
    contentComponents: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_atlaskit_editor_core__WEBPACK_IMPORTED_MODULE_1__["WithEditorActions"], {
      render: function render() {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Text__WEBPACK_IMPORTED_MODULE_2__["MainTitle"], {
          tag: "h1",
          className: "note-title"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Textarea__WEBPACK_IMPORTED_MODULE_3__["default"], {
          ref: titleEl,
          rows: "1",
          fullwidth: true,
          value: title,
          onChange: onTitleEvent,
          placeholder: defaultTitle,
          className: "note-title-input"
        }));
      }
    })
  }))));
}

/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_7__["translate"])()(EditorView));

/***/ }),

/***/ "BC9o":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getParticipant", function() { return getParticipant; });
var getParticipant = function getParticipant(_ref) {
  var userId = _ref.userId,
      sessionId = _ref.sessionId;
  return {
    userId: sessionId,
    sessionId: sessionId || userId,
    name: userId,
    avatar: "https://api.adorable.io/avatars/80/".concat(userId.replace(/[^a-zA-Z0-9]/g, ''), ".png"),
    email: "".concat(userId.replace(/\s+/g, '.').replace(/[^a-zA-Z0-9.]/g, ''), ".toLocaleLowerCase()}@mycozy.cloud")
  };
};

/***/ }),

/***/ "D2GK":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Channel", function() { return Channel; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var eventemitter2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("cjKa");
/* harmony import */ var eventemitter2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(eventemitter2__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prosemirror_collab__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("O1Kf");
/* harmony import */ var prosemirror_collab__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prosemirror_collab__WEBPACK_IMPORTED_MODULE_2__);


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var minimumBackoff = 128; // 128ms

var maximumBackoff = 1000 * 60 * 5; // Max 5 minutes

var failuresBeforeCatchup = 4;
var Channel =
/*#__PURE__*/
function () {
  function Channel(config, serviceClient) {
    _classCallCheck(this, Channel);

    this.config = config;
    this.service = serviceClient;
    this.eventEmitter = new eventemitter2__WEBPACK_IMPORTED_MODULE_1__["EventEmitter2"]();
    this.resetBackoff();
    this.initializeStepsQueue();
    this.isSending = false;
  }
  /**
   * Reset the backoff
   */


  _createClass(Channel, [{
    key: "resetBackoff",
    value: function resetBackoff() {
      this.backoff = 0;
      this.failures = 0;
    }
    /**
     * Increase the backoff
     */

  }, {
    key: "increaseBackoff",
    value: function increaseBackoff() {
      this.failures = this.failures + 1;

      if (this.failures % failuresBeforeCatchup == 0) {
        this.emit('needcatchup', {
          failures: this.failures
        });
      }

      this.backoff = Math.max(Math.min(this.backoff * 2, maximumBackoff), minimumBackoff);
    }
    /**
     * Program something after backoff
     * @returns {Promise}
     */

  }, {
    key: "afterBackoff",
    value: function afterBackoff() {
      var _this = this;

      var fn = function fn(resolve) {
        if (_this.backoff < minimumBackoff) {
          resolve();
        } else {
          window.setTimeout(resolve, _this.backoff);
        }
      };

      return new Promise(fn);
    }
    /**
     * Initialize the steps queue
     */

  }, {
    key: "initializeStepsQueue",
    value: function initializeStepsQueue() {
      this.queuedStep = undefined;
    }
    /**
     * Enqueue steps
     * @param {Function} getState - function to get a current proseMirror state
     * @param {Object} state - proseMirror state
     * @param {Object[]} localSteps - local steps to send
     */

  }, {
    key: "enqueueSteps",
    value: function enqueueSteps(_ref) {
      var getState = _ref.getState,
          state = _ref.state,
          localSteps = _ref.localSteps;
      this.queuedStep = {
        getState: getState,
        state: state,
        localSteps: localSteps
      };
    }
    /**
     * Dequeue steps
     * @returns {getState, state, localSteps}
     */

  }, {
    key: "dequeueSteps",
    value: function dequeueSteps() {
      var queued = this.queuedStep;
      var getState = queued.getState;
      var state = queued.state || getState();
      var localSteps = queued.localSteps || Object(prosemirror_collab__WEBPACK_IMPORTED_MODULE_2__["sendableSteps"])(state) || {
        steps: []
      };
      this.queuedStep = undefined;
      return {
        getState: getState,
        state: state,
        localSteps: localSteps
      };
    }
    /**
     * Test if there is a queued step
     * @returns {boolean}
     */

  }, {
    key: "hasQueuedSteps",
    value: function hasQueuedSteps() {
      return !!this.queuedStep;
    }
    /**
     * Rebase steps in queue
     */

  }, {
    key: "rebaseStepsInQueue",
    value: function rebaseStepsInQueue() {
      if (this.queuedStep) {
        this.queuedStep = {
          getState: this.queuedStep.getState
        };
      }
    }
    /**
     * Program a push for new steps to the service
     * @param {Object} state - state from proseMirror internals
     * @param {Function} getState - returns current proseMirror state
     * @param {Object} localSteps - localSteps object from proseMirror internals
     * Today the provider calling `sendSteps` do not fill the localSteps
     * parameter. This parameter is however provisionned in the demo code from
     * Atlaskit. I prefer not to remove it, in case we need it later.
     */

  }, {
    key: "sendSteps",
    value: function () {
      var _sendSteps = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(getState, state, localSteps) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.enqueueSteps({
                  getState: getState,
                  state: state,
                  localSteps: localSteps
                });
                _context.next = 3;
                return this.processQueue();

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function sendSteps(_x, _x2, _x3) {
        return _sendSteps.apply(this, arguments);
      };
    }()
    /**
     * Send steps in queue
     */

  }, {
    key: "processQueue",
    value: function () {
      var _processQueue = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var _this$dequeueSteps, getState, state, steps, version, docId, response;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.isSending) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:
                if (this.hasQueuedSteps()) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt("return");

              case 4:
                this.isSending = true;
                _context2.next = 7;
                return this.afterBackoff();

              case 7:
                _this$dequeueSteps = this.dequeueSteps(), getState = _this$dequeueSteps.getState, state = _this$dequeueSteps.state, steps = _this$dequeueSteps.localSteps.steps;
                version = Object(prosemirror_collab__WEBPACK_IMPORTED_MODULE_2__["getVersion"])(state); // Don't send any steps before we're ready.

                if (!(_typeof(version) === undefined)) {
                  _context2.next = 11;
                  break;
                }

                return _context2.abrupt("return");

              case 11:
                if (!(steps.length === 0)) {
                  _context2.next = 13;
                  break;
                }

                return _context2.abrupt("return");

              case 13:
                _context2.prev = 13;
                docId = this.config.docId;
                _context2.next = 17;
                return this.service.pushSteps(docId, version, steps);

              case 17:
                response = _context2.sent;
                this.rebaseStepsInQueue();
                this.resetBackoff();
                this.isSending = false;

                if (response && response.steps && response.steps.length > 0) {
                  this.emit('data', response);
                }

                _context2.next = 29;
                break;

              case 24:
                _context2.prev = 24;
                _context2.t0 = _context2["catch"](13);

                if (this.hasQueuedSteps()) {
                  // will retry later with more steps
                  this.rebaseStepsInQueue();
                } else {
                  // send again the current steps
                  this.enqueueSteps({
                    getState: getState
                  });
                }

                this.increaseBackoff();
                this.isSending = false;

              case 29:
                // if ever there was something waiting
                this.processQueue();

              case 30:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[13, 24]]);
      }));

      return function processQueue() {
        return _processQueue.apply(this, arguments);
      };
    }()
    /**
     * Connect to pubsub to start receiving events
     */

  }, {
    key: "connect",
    value: function () {
      var _connect = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(version, doc) {
        var _this2 = this;

        var docId;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                docId = this.config.docId;
                this.service.join(docId);
                this.service.onStepsCreated(docId, function (data) {
                  _this2.emit('data', {
                    version: data.version,
                    steps: [data]
                  });
                });
                this.service.onTelepointerUpdated(docId, function (payload) {
                  _this2.emit('telepointer', payload);
                });
                this.eventEmitter.emit('connected', {
                  doc: doc,
                  version: version
                });

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function connect(_x4, _x5) {
        return _connect.apply(this, arguments);
      };
    }()
    /**
     * Get steps from version x to latest
     */

  }, {
    key: "getSteps",
    value: function () {
      var _getSteps = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(version) {
        var docId;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                docId = this.config.docId;
                _context4.next = 3;
                return this.service.getSteps(docId, version);

              case 3:
                return _context4.abrupt("return", _context4.sent);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function getSteps(_x6) {
        return _getSteps.apply(this, arguments);
      };
    }()
    /**
     * Send telepointer
     */

  }, {
    key: "sendTelepointer",
    value: function () {
      var _sendTelepointer = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5(data) {
        var docId;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                docId = this.config.docId;
                _context5.next = 3;
                return this.service.pushTelepointer(docId, data);

              case 3:
                return _context5.abrupt("return", _context5.sent);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function sendTelepointer(_x7) {
        return _sendTelepointer.apply(this, arguments);
      };
    }()
    /**
     * Subscribe to events emitted by this channel
     */

  }, {
    key: "on",
    value: function on(evt, handler) {
      this.eventEmitter.on(evt, handler);
      return this;
    }
    /**
     * Unsubscribe from events emitted by this channel
     */

  }, {
    key: "off",
    value: function off(evt, handler) {
      this.eventEmitter.off(evt, handler);
      return this;
    }
    /**
     * Emit events to subscribers
     */

  }, {
    key: "emit",
    value: function emit(evt, data) {
      this.eventEmitter.emit(evt, data);
      return this;
    }
  }]);

  return Channel;
}();

/***/ }),

/***/ "DrVd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollabProvider", function() { return CollabProvider; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var eventemitter2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("cjKa");
/* harmony import */ var eventemitter2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(eventemitter2__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prosemirror_collab__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("O1Kf");
/* harmony import */ var prosemirror_collab__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prosemirror_collab__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _atlaskit_editor_json_transformer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("bfWj");
/* harmony import */ var _channel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("D2GK");
/* harmony import */ var _participant__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("BC9o");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var jsonTransformer = new _atlaskit_editor_json_transformer__WEBPACK_IMPORTED_MODULE_3__["JSONTransformer"]();
/**
 * The CollabProvider is called directly by the
 * collaboration plugin of proseMirror.
 * It will then use `Channel` as communication
 * layer with the `ServiceClient`, which itself
 * talk to the server.
 */

var CollabProvider =
/*#__PURE__*/
function () {
  function CollabProvider(config, serviceClient) {
    var _this = this;

    _classCallCheck(this, CollabProvider);

    _defineProperty(this, "processRemoteData", function (data) {
      var version = data.version,
          steps = data.steps;

      if (steps && steps.length) {
        var userIds = steps.map(function (step) {
          return step.sessionId || _this.serviceClient.getUserId(step.sessionId);
        });

        _this.emit('data', {
          json: steps,
          version: version,
          userIds: userIds
        });
      } else {
        // eslint-disable-next-line no-console
        console.warn('Collab.Provider: processRemoteData no steps ? ', steps, data);
      }
    });

    _defineProperty(this, "onReceiveData", function (data) {
      _this.queueData(data);

      _this.processQueue();
    });

    _defineProperty(this, "onReceiveTelepointer", function (data) {
      var sessionId = data.sessionId;

      var userId = _this.serviceClient.getUserId(sessionId);

      if (userId === _this.config.userId) {
        return;
      }

      var participant = _this.participants.get(userId);

      if (participant && participant.lastActive > data.timestamp) {
        return;
      }

      _this.updateParticipant(sessionId, data.timestamp);

      _this.emit('telepointer', data);
    });

    this.config = config;
    this.config['sessionId'] = serviceClient.getSessionId();
    this.config['userId'] = serviceClient.getUserId();
    this.serviceClient = serviceClient;
    this.channel = config.channel || new _channel__WEBPACK_IMPORTED_MODULE_4__["Channel"](config, serviceClient);
    this.eventEmitter = new eventemitter2__WEBPACK_IMPORTED_MODULE_1__["EventEmitter2"]();
    this.queue = [];

    this.getState = function () {};

    this.participants = new Map();
    this.pauseQueue = false;
    this.initialVersion = config.version;
    this.pauseQueue = false;
  }
  /**
   * Initialze the collaboration provider
   * @param {Function} getState - How to get the proseMirror state
   */


  _createClass(CollabProvider, [{
    key: "initialize",
    value: function initialize(getState) {
      var _this2 = this;

      this.getState = getState;
      this.channel.on('connected', function (_ref) {
        var doc = _ref.doc,
            version = _ref.version;
        var sessionId = _this2.config.sessionId;

        _this2.emit('init', {
          sid: sessionId,
          doc: doc,
          version: version
        }); // Set initial document


        _this2.emit('connected', {
          sid: sessionId
        }); // Let the plugin know that we're connected an ready to go

      });
      this.channel.on('data', this.onReceiveData);
      this.channel.on('telepointer', this.onReceiveTelepointer);
      this.channel.on('needcatchup', function () {
        return _this2.catchup();
      });
      var state = getState();
      var doc = jsonTransformer.encode(state.doc);
      var usableVersion = this.initialVersion !== undefined ? this.initialVersion : doc.version;

      var collabDoc = _objectSpread({}, doc, {
        version: usableVersion
      });

      this.channel.connect(usableVersion, collabDoc);
      return this;
    }
    /**
     * Send steps from transaction to other participants
     */

  }, {
    key: "send",
    value: function send(tr, oldState, newState) {
      // Ignore transactions without steps
      if (!tr.steps || !tr.steps.length) {
        return;
      }

      this.channel.sendSteps(this.getState, newState);
    }
    /**
     * Send messages, such as telepointers, to other participants.
     */

  }, {
    key: "sendMessage",
    value: function sendMessage(data) {
      if (!data) {
        return;
      }

      var type = data.type;

      switch (type) {
        case 'telepointer':
          this.channel.sendTelepointer(_objectSpread({}, data, {
            timestamp: new Date().getTime()
          }));
      }
    }
    /**
     * Queue new steps from the server which should
     * be applied to the local editor
     * @param {Object} data - new steps
     */

  }, {
    key: "queueData",
    value: function queueData(data) {
      var orderedQueue = [].concat(_toConsumableArray(this.queue), [data]).sort(function (a, b) {
        // order by starting version
        var aStart = a.version - a.steps.length;
        var bStart = b.version - b.steps.length;
        if (aStart > bStart) return 1;
        if (aStart < bStart) return -1; // for same starting version, keep first the one going further

        if (a.version > b.version) return -1;
        if (a.version > b.version) return 1;
        return 0;
      });
      this.queue = orderedQueue;
    }
    /**
     * Catchup after multiple errors
     * @param {Function} getState - filled when requested from channel
     */

  }, {
    key: "catchup",
    value: function () {
      var _catchup = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var currentVersion, _ref2, doc, version, steps, sessionId, _ref3, _ref3$steps, localSteps;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.pauseQueue = true;
                currentVersion = Object(prosemirror_collab__WEBPACK_IMPORTED_MODULE_2__["getVersion"])(this.getState());
                _context.prev = 2;
                _context.next = 5;
                return this.channel.getSteps(currentVersion);

              case 5:
                _ref2 = _context.sent;
                doc = _ref2.doc;
                version = _ref2.version;
                steps = _ref2.steps;

                if (doc) {
                  // we lag too much, server did send us the whole document
                  sessionId = this.config.sessionId; // get local steps

                  _ref3 = Object(prosemirror_collab__WEBPACK_IMPORTED_MODULE_2__["sendableSteps"])(this.getState()) || {}, _ref3$steps = _ref3.steps, localSteps = _ref3$steps === void 0 ? [] : _ref3$steps; // Replace local document and version number

                  this.emit('init', {
                    sid: sessionId,
                    doc: doc,
                    version: version
                  }); // Re-aply local steps

                  if (localSteps.length) {
                    this.emit('local-steps', {
                      steps: localSteps
                    });
                  }
                } else {
                  // we got steps to apply
                  this.onReceiveData({
                    steps: steps,
                    version: version
                  }, true);
                } // processQueue again


                this.queueTimeout = undefined;
                this.pauseQueue = false;
                this.processQueue();
                _context.next = 19;
                break;

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](2);
                // something got wrong, try to catchup again
                // TODO : maybe try to reinit the full doc ?
                this.pauseQueue = false;
                this.programCatchup();

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 15]]);
      }));

      return function catchup() {
        return _catchup.apply(this, arguments);
      };
    }()
    /**
     * Something got wrong, we program a catchup,
     * waiting 1s in case we receive new message
     * that may resolve our problems
     */

  }, {
    key: "programCatchup",
    value: function programCatchup() {
      var _this3 = this;

      if (!this.queueTimeout) {
        this.queueTimeout = window.setTimeout(function () {
          _this3.catchup();
        }, 1000);
      }
    }
    /**
     * When received new messages that resolve a previous
     * problem: Cancelling the programed catchup
     */

  }, {
    key: "cancelCatchup",
    value: function cancelCatchup() {
      if (this.queueTimeout) {
        window.clearTimeout(this.queueTimeout);
        this.queueTimeout = undefined;
      }
    }
    /**
     * Process the message queue (new steps from the servers)
     */

  }, {
    key: "processQueue",
    value: function processQueue() {
      if (this.queue.length > 0 && !this.pauseQueue) {
        var currentVersion = Object(prosemirror_collab__WEBPACK_IMPORTED_MODULE_2__["getVersion"])(this.getState());

        while (this.queue.length > 0) {
          var first = this.queue[0];
          var firstVersion = first.version;
          var expectedVersion = first.steps.length + currentVersion;

          if (firstVersion == expectedVersion) {
            // process item
            this.cancelCatchup();
            this.queue.shift();
            this.processRemoteData(first);
            currentVersion = firstVersion;
          } else {
            if (firstVersion <= expectedVersion) {
              // item is obsolete, we won't be able to process it
              this.queue.shift();
            }

            if (firstVersion > expectedVersion) {
              // we miss some steps
              this.programCatchup();
              break;
            }
          }
        }
      }
    }
    /**
     * Send new steps from the server to the local proseMirror editor
     * These steps should be previously checked and ordered
     */

  }, {
    key: "updateParticipant",
    value: function updateParticipant(sessionId, timestamp) {
      var _this4 = this;

      var userId = this.serviceClient.getUserId(sessionId);
      var participant = Object(_participant__WEBPACK_IMPORTED_MODULE_5__["getParticipant"])({
        userId: userId,
        sessionId: sessionId
      });
      this.participants.set(userId, _objectSpread({
        name: '',
        email: '',
        avatar: '',
        sessionId: sessionId,
        userId: userId
      }, participant, {
        lastActive: timestamp
      }));
      var joined = [this.participants.get(userId)]; // Filter out participants that's been inactive for
      // more than 5 minutes.

      var now = new Date().getTime();
      var left = Array.from(this.participants.values()).filter(function (p) {
        return (now - p.lastActive) / 1000 > 300;
      });
      left.forEach(function (p) {
        return _this4.participants.delete(p.userId);
      });
      this.emit('presence', {
        joined: joined,
        left: left
      });
    }
    /**
     * Emit events to subscribers
     */

  }, {
    key: "emit",
    value: function emit(evt, data) {
      this.eventEmitter.emit(evt, data);
      return this;
    }
    /**
     * Subscribe to events emitted by this provider
     */

  }, {
    key: "on",
    value: function on(evt, handler) {
      this.eventEmitter.on(evt, handler);
      return this;
    }
    /**
     * Unsubscribe from events emitted by this provider
     */

  }, {
    key: "off",
    value: function off(evt, handler) {
      this.eventEmitter.off(evt, handler);
      return this;
    }
    /**
     * Unsubscribe all listeners for this event
     */

  }, {
    key: "unsubscribeAll",
    value: function unsubscribeAll(evt) {
      this.eventEmitter.removeAllListeners(evt);
    }
  }]);

  return CollabProvider;
}();
/* harmony default export */ __webpack_exports__["default"] = (CollabProvider);

/***/ }),

/***/ "LiWt":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("/kYV");
/* harmony import */ var styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styles__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("JRPe");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("i8i4");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("buk/");
/* harmony import */ var components_IsPublic__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("ZNGu");
/* harmony import */ var lib_initFromDom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("X3v2");
/* global cozy */









var manifest = __webpack_require__("pZg0");

var appLocale;
var locales = {
  en: {
    react: __webpack_require__("PTt1"),
    atlaskit: __webpack_require__("eFxx").default
  },
  fr: {
    react: __webpack_require__("Z6Ro"),
    atlaskit: __webpack_require__("XCed").default
  }
};
Object(react_intl__WEBPACK_IMPORTED_MODULE_2__["addLocaleData"])(locales.en.react);
Object(react_intl__WEBPACK_IMPORTED_MODULE_2__["addLocaleData"])(locales.fr.react);

var renderApp = function renderApp(client, isPublic) {
  var App = __webpack_require__("pL5B").default;

  Object(react_dom__WEBPACK_IMPORTED_MODULE_4__["render"])(react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_5__["I18n"], {
    lang: appLocale,
    dictRequire: function dictRequire(appLocale) {
      return __webpack_require__("/KVF")("./".concat(appLocale));
    }
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_2__["IntlProvider"], {
    locale: appLocale,
    messages: locales[appLocale].atlaskit
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_client__WEBPACK_IMPORTED_MODULE_3__["CozyProvider"], {
    client: client
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(components_IsPublic__WEBPACK_IMPORTED_MODULE_6__["default"].Provider, {
    value: isPublic
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(App, {
    isPublic: isPublic
  }))))), document.querySelector('[role=application]'));
}; // initial rendering of the application


document.addEventListener('DOMContentLoaded', function () {
  var data = Object(lib_initFromDom__WEBPACK_IMPORTED_MODULE_7__["getDataset"])();
  var appIcon = Object(lib_initFromDom__WEBPACK_IMPORTED_MODULE_7__["getDataOrDefault"])(data.cozyIconPath, __webpack_require__("ZAKO"));
  var appNamePrefix = Object(lib_initFromDom__WEBPACK_IMPORTED_MODULE_7__["getDataOrDefault"])(data.cozyAppNamePrefix || manifest.name_prefix, '');
  var appName = Object(lib_initFromDom__WEBPACK_IMPORTED_MODULE_7__["getDataOrDefault"])(data.cozyAppName, manifest.name);
  var appSlug = Object(lib_initFromDom__WEBPACK_IMPORTED_MODULE_7__["getDataOrDefault"])(data.cozyAppSlug, manifest.slug);
  var appVersion = Object(lib_initFromDom__WEBPACK_IMPORTED_MODULE_7__["getDataOrDefault"])(data.cozyAppVersion, manifest.version);
  appLocale = Object(lib_initFromDom__WEBPACK_IMPORTED_MODULE_7__["getDataOrDefault"])(data.cozyLocale, 'en');
  var protocol = window.location ? window.location.protocol : 'https:';
  var token = data.cozyToken;
  var isPublic = Object(lib_initFromDom__WEBPACK_IMPORTED_MODULE_7__["hasPublicSharecode"])(); // initialize the client to interact with the cozy stack

  var client = new cozy_client__WEBPACK_IMPORTED_MODULE_3___default.a({
    uri: "".concat(protocol, "//").concat(data.cozyDomain),
    token: token,
    appMetadata: {
      slug: appSlug,
      version: appVersion
    }
  });

  if (!isPublic) {
    // initialize the bar, common of all applications, it allows
    // platform features like apps navigation without doing anything
    cozy.bar.init({
      appName: appName,
      appNamePrefix: appNamePrefix,
      iconPath: appIcon,
      lang: appLocale,
      replaceTitleOnMobile: true,
      cozyClient: client,
      isPublic: isPublic
    });
  }

  renderApp(client, isPublic);
});

/***/ }),

/***/ "Lpk5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _editor_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("AIob");
/* harmony import */ var _editor_loading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("VjyH");
/* harmony import */ var _sharing__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("8i3i");
/* harmony import */ var _IsPublic__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("ZNGu");
/* harmony import */ var _lib_collab_provider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("DrVd");
/* harmony import */ var _lib_collab_stack_client__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("ereM");
/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("snnE");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("buk/");


function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }











var Editor = Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_10__["translate"])()(Object(cozy_client__WEBPACK_IMPORTED_MODULE_2__["withClient"])(function (props) {
  var client = props.client,
      noteId = props.noteId,
      t = props.t;
  var userName = Object(react__WEBPACK_IMPORTED_MODULE_1__["useMemo"])(function () {
    return props.userName || Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_9__["getShortNameFromClient"])(client);
  }, [props.userName]);
  var isPublic = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_IsPublic__WEBPACK_IMPORTED_MODULE_6__["default"]); // alias for later shortcuts

  var docId = noteId;
  var userId = userName;
  var cozyClient = client; // state

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(true),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(undefined),
      _useState4 = _slicedToArray(_useState3, 2),
      doc = _useState4[0],
      setDoc = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(undefined),
      _useState6 = _slicedToArray(_useState5, 2),
      title = _useState6[0],
      setTitle = _useState6[1]; // plugins and config


  var serviceClient = Object(react__WEBPACK_IMPORTED_MODULE_1__["useMemo"])(function () {
    return new _lib_collab_stack_client__WEBPACK_IMPORTED_MODULE_8__["default"]({
      userId: userId,
      userName: userName,
      cozyClient: cozyClient
    });
  }, [noteId]);
  var docVersion = doc && doc.version; //console.log("docVersion", doc, doc && doc.version, docVersion)

  var collabProvider = Object(react__WEBPACK_IMPORTED_MODULE_1__["useMemo"])(function () {
    //console.log("collab provider memo", docVersion)
    if (docVersion !== undefined) {
      //console.log('new collabProvider')
      var provider = new _lib_collab_provider__WEBPACK_IMPORTED_MODULE_7__["default"]({
        version: doc.version,
        docId: docId
      }, serviceClient);
      return {
        useNativePlugin: true,
        provider: Promise.resolve(provider),
        inviteToEditHandler: function inviteToEditHandler() {
          return undefined;
        },
        isInviteToEditButtonSelected: false,
        userId: serviceClient.getSessionId()
      };
    } else {
      return null;
    }
  }, [noteId, docVersion, userName, serviceClient]); //console.log("end collabProviderMemo", collabProvider)
  // fetch the actual note on load

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    var fn =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var _doc;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;

                if (!loading) {
                  setLoading(true);
                }

                _context.next = 4;
                return serviceClient.getDoc(noteId);

              case 4:
                _doc = _context.sent;
                setTitle(_doc.title || '');
                setDoc(_doc);
                _context.next = 13;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                setTitle(false);
                setDoc(false);

              case 13:
                setLoading(false);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 9]]);
      }));

      return function fn() {
        return _ref.apply(this, arguments);
      };
    }();

    fn();
  }, [noteId]); // callbacks

  var onContentChange = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function () {
    return null;
  }, [noteId]);
  var onLocalTitleChange = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function (e) {
    var newTitle = e.target.value;
    var modifiedTitle = newTitle;

    if (title != modifiedTitle) {
      setTitle(modifiedTitle);
      serviceClient.setTitle(noteId, modifiedTitle);
    }
  }, [noteId, setTitle, serviceClient]);
  var onRemoteTitleChange = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function (modifiedTitle) {
    if (title != modifiedTitle) {
      setTitle(modifiedTitle);
    }
  }, [noteId, setTitle]);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useMemo"])(function () {
    serviceClient.onTitleUpdated(noteId, onRemoteTitleChange);
  }, [onRemoteTitleChange, serviceClient]); // Failure in loading the note ?

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    if (!loading && !doc) {
      // eslint-disable-next-line no-console
      console.warn("Could not load note ".concat(noteId));
      props.history.push("/");
    }
  });
  var returnUrl = Object(react__WEBPACK_IMPORTED_MODULE_1__["useMemo"])(function () {
    if (props.returnUrl !== undefined) {
      return props.returnUrl;
    } else if (doc) {
      return Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_9__["getParentFolderLink"])(client, doc.file);
    } else {
      return props.returnUrl;
    }
  }, [props.returnUrl, doc]); // rendering

  if (loading || !doc) {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_editor_loading__WEBPACK_IMPORTED_MODULE_4__["default"], null);
  } else {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_editor_view__WEBPACK_IMPORTED_MODULE_3__["default"], {
      onTitleChange: onLocalTitleChange,
      onContentChange: onContentChange,
      collabProvider: collabProvider,
      defaultTitle: t('Notes.Editor.title_placeholder'),
      defaultValue: _objectSpread({}, doc.doc, {
        version: doc.version
      }),
      title: title && title.length > 0 ? title : undefined,
      returnUrl: returnUrl,
      actions: !isPublic && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_sharing__WEBPACK_IMPORTED_MODULE_5__["default"], {
        fileId: noteId
      })
    });
  }
}));
/* harmony default export */ __webpack_exports__["default"] = (Editor);

/***/ }),

/***/ "NOZu":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("55Ip");
/* harmony import */ var cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("KXWi");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("buk/");
/* harmony import */ var lib_collab_schema__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("hmtS");
/* harmony import */ var lib_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("snnE");


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









var Add =
/*#__PURE__*/
function (_Component) {
  _inherits(Add, _Component);

  function Add(props, context) {
    var _this;

    _classCallCheck(this, Add);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Add).call(this, props, context)); // initial component state

    _defineProperty(_assertThisInitialized(_this), "handleClick",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var cozyClient, _ref2, doc;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.setState(function () {
                true;
              });

              cozyClient = _this.props.client;
              _context.next = 4;
              return cozyClient.getStackClient().fetchJSON('POST', '/notes', {
                data: {
                  type: 'io.cozy.notes.documents',
                  attributes: {
                    title: '',
                    schema: lib_collab_schema__WEBPACK_IMPORTED_MODULE_6__["schemaOrdered"]
                  }
                }
              });

            case 4:
              _ref2 = _context.sent;
              doc = _ref2.data;

              _this.setState(function () {
                false;
              });

              window.location.href = Object(lib_utils__WEBPACK_IMPORTED_MODULE_7__["generateReturnUrlToNotesIndex"])(doc);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    })));

    _this.state = {
      isWorking: false
    };
    return _this;
  }

  _createClass(Add, [{
    key: "render",
    value: function render() {
      var isWorking = this.state.isWorking;
      var _this$props = this.props,
          t = _this$props.t,
          className = _this$props.className;
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
        onClick: this.handleClick,
        type: "submit",
        busy: isWorking,
        icon: "plus",
        label: t('Notes.Add.add_note'),
        extension: "narrow",
        className: className
      }));
    }
  }]);

  return Add;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]); // get mutations from the client to use createDocument


/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_5__["translate"])()(Object(cozy_client__WEBPACK_IMPORTED_MODULE_2__["withClient"])(Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["withRouter"])(Add))));

/***/ }),

/***/ "VjyH":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("55Ip");
/* harmony import */ var _header_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("+7CB");
/* harmony import */ var cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("V2U0");
/* harmony import */ var cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("KXWi");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("buk/");







function EditorLoading(props) {
  var t = props.t;
  var left = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
    icon: "back",
    tag: react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"],
    to: "/",
    className: "sto-app-back",
    label: t('Notes.EditorLoading.back_to_list'),
    subtle: true
  });
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_header_menu__WEBPACK_IMPORTED_MODULE_2__["default"], {
    left: left
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_3__["default"], {
    size: "xxlarge",
    middle: true
  }));
}

/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_5__["translate"])()(EditorLoading));

/***/ }),

/***/ "X3v2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataset", function() { return getDataset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataOrDefault", function() { return getDataOrDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasPublicSharecode", function() { return hasPublicSharecode; });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var getDataset = function getDataset() {
  var root = document.querySelector('[role=application]');
  return root.dataset;
}; // return a defaultData if the template hasn't been replaced by cozy-stack

var getDataOrDefault = function getDataOrDefault(toTest, defaultData) {
  var templateRegex = /^\{\{\.[a-zA-Z]*\}\}$/; // {{.Example}}

  return templateRegex.test(toTest) ? defaultData : toTest;
};

var arrToObj = function arrToObj() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _ref = arguments.length > 1 ? arguments[1] : undefined,
      _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      _ref2$ = _ref2[1],
      val = _ref2$ === void 0 ? true : _ref2$;

  obj[key] = val;
  return obj;
};

var hasPublicSharecode = function hasPublicSharecode() {
  var _window$location$sear = window.location.search.substring(1).split('&').map(function (varval) {
    return varval.split('=');
  }).reduce(arrToObj, {}),
      sharecode = _window$location$sear.sharecode;

  return !!sharecode;
};

/***/ }),

/***/ "ZAKO":
/***/ (function(module, exports) {

module.exports = "/img/icon.svg";

/***/ }),

/***/ "ZNGu":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var IsPublic = react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext(false);
/* harmony default export */ __webpack_exports__["default"] = (IsPublic);

/***/ }),

/***/ "Zlyp":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c+Po");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "List", function() { return _list__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("Lpk5");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Editor", function() { return _editor__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _add__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("NOZu");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Add", function() { return _add__WEBPACK_IMPORTED_MODULE_2__["default"]; });



 //



/***/ }),

/***/ "c+Po":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react_Text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("kyGY");
/* harmony import */ var cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("7YkG");
/* harmony import */ var cozy_ui_react_Empty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("GoJ1");
/* harmony import */ var cozy_ui_react_Stack__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("X+Uv");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_transpiled_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("H+Xc");
/* harmony import */ var components_notes_add__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("NOZu");
/* harmony import */ var assets_icons_icon_note_empty_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("tIF1");
/* harmony import */ var components_notes_list_styl__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("j7Bi");
/* harmony import */ var components_notes_list_styl__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(components_notes_list_styl__WEBPACK_IMPORTED_MODULE_9__);










var EmptyComponent = Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_5__["translate"])()(function (_ref) {
  var t = _ref.t;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "empty"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Empty__WEBPACK_IMPORTED_MODULE_3__["default"], {
    id: "empty",
    icon: assets_icons_icon_note_empty_svg__WEBPACK_IMPORTED_MODULE_8__["default"],
    title: t('Notes.Empty.welcome'),
    text: t('Notes.Empty.after_created')
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_notes_add__WEBPACK_IMPORTED_MODULE_7__["default"], {
    className: "u-mt-1"
  })));
});
var List = Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_5__["translate"])()(function (_ref2) {
  var t = _ref2.t;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_2__["Table"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_2__["TableHead"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_2__["TableRow"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_2__["TableHeader"], {
    className: "tableCellName"
  }, t('Notes.List.name')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_2__["TableHeader"], {
    className: "tableCell"
  }, t('Notes.List.updated_at')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_2__["TableHeader"], {
    className: "tableCell"
  }, t('Notes.List.location')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_2__["TableHeader"], {
    className: "tableCell"
  }, t('Notes.List.sharings')))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_2__["TableBody"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_2__["TableRow"], {
    className: "tableRowEmpty"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_2__["TableCell"], {
    className: "tableCellEmpty"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(EmptyComponent, null)))));
}); //We don't not display the Title this way in Mobile.
//We use Bar.centrer

var TitleApp = function TitleApp(_ref3) {
  var t = _ref3.t,
      isMobile = _ref3.breakpoints.isMobile;
  return isMobile ? null : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Text__WEBPACK_IMPORTED_MODULE_1__["MainTitle"], {
    className: "titlePadding u-mt-1"
  }, t('Notes.List.my_notes'));
};

var TitleAppConnected = Object(cozy_ui_transpiled_react__WEBPACK_IMPORTED_MODULE_6__["withBreakpoints"])()(Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_5__["translate"])()(TitleApp));

var EmptyPage = function EmptyPage() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Stack__WEBPACK_IMPORTED_MODULE_4__["default"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TitleAppConnected, null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(List, null));
};

/* harmony default export */ __webpack_exports__["default"] = (EmptyPage);

/***/ }),

/***/ "ereM":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceClient", function() { return ServiceClient; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_realtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("oBqo");
/* harmony import */ var cozy_realtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cozy_realtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _schema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("hmtS");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


 // Warning: sessionID on the server, sessionId on the client

/**
 * This is the communication layer with the server
 */

var ServiceClient =
/*#__PURE__*/
function () {
  function ServiceClient(config) {
    _classCallCheck(this, ServiceClient);

    var userId = config.userId,
        cozyClient = config.cozyClient,
        schema = config.schema;
    var now = new Date();
    var sessionSuffix = now.getTime() + '.' + now.getMilliseconds() + '.' + Math.random();
    this.sessionId = userId + ':' + sessionSuffix;
    this.userId = this.getUserId(userId);
    this.cozyClient = cozyClient;
    this.stackClient = cozyClient.getStackClient();
    this.schema = schema;
    this.onRealtimeEvent = this.onRealtimeEvent.bind(this);
    this.realtime = new cozy_realtime__WEBPACK_IMPORTED_MODULE_1___default.a({
      client: cozyClient
    });
    this.resetCallbacks();
  }
  /**
   * Remove event listeners
   */


  _createClass(ServiceClient, [{
    key: "resetCallbacks",
    value: function resetCallbacks() {
      this.callbacks = {};
    }
    /**
     * Adds event listeners
     */

  }, {
    key: "setCallback",
    value: function setCallback(type, id, callback) {
      this.callbacks[type] = this.callbacks[type] || {};
      this.callbacks[type][id] = callback;
    }
    /**
     * @returns {string} Unique id for the user
     */

  }, {
    key: "getUserId",
    value: function getUserId(sessionId) {
      return sessionId ? sessionId.match(/[^:]+/)[0] : this.userId;
    }
    /**
     * @returns {string} Unique id for the session
     * It contains the user id + some unique part
     */

  }, {
    key: "getSessionId",
    value: function getSessionId() {
      return this.sessionId;
    }
    /**
     * Close communication with the server
     * Remove all events listeners
     */

  }, {
    key: "close",
    value: function close() {
      this.realtime.unsubscribeAll();
      this.resetCallbacks();
    }
    /**
     * Get a default title for the note
     */

  }, {
    key: "defaultTitle",
    value: function defaultTitle() {
      return new Date().toISOString();
    }
    /**
     * @param {uuid} id - id of the note
     * @param {string} sub - sub-path for the server route
     * @returns {string} path for an API route on the cozy-stack
     */

  }, {
    key: "path",
    value: function path(id, sub) {
      return id ? sub ? "/notes/".concat(id, "/").concat(sub) : "/notes/".concat(id) : '/notes';
    }
    /**
     * Convert data from the client format to the server format
     */

  }, {
    key: "client2server",
    value: function client2server(data) {
      return _objectSpread({
        sessionID: data.sessionId || this.sessionId
      }, data);
    }
    /**
     * Convert data from the server format to the client format
     */

  }, {
    key: "server2client",
    value: function server2client(data) {
      return _objectSpread({
        sessionId: data.sessionID,
        userId: this.getUserId(data.sessionID)
      }, data);
    }
    /**
     * Create a new note on the server
     * @param {string} title
     * @param {Object} schema
     */

  }, {
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(title, schema) {
        var doc;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                doc = {
                  data: {
                    type: 'io.cozy.notes.documents',
                    attributes: {
                      title: title || this.defaultTitle(),
                      schema: schema || this.schema || _schema__WEBPACK_IMPORTED_MODULE_2__["schemaOrdered"]
                    }
                  }
                };
                return _context.abrupt("return", this.stackClient.fetchJSON('POST', this.path(), doc));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function create(_x, _x2) {
        return _create.apply(this, arguments);
      };
    }()
    /**
     * Change the title of a note
     * @param {uuid} docId
     * @param {string} title
     */

  }, {
    key: "setTitle",
    value: function () {
      var _setTitle = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(docId, title) {
        var titleDoc;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                titleDoc = {
                  data: {
                    type: 'io.cozy.notes.documents',
                    id: docId,
                    attributes: this.client2server({
                      title: title
                    })
                  }
                };
                _context2.next = 3;
                return this.stackClient.fetchJSON('PUT', this.path(docId, 'title'), titleDoc);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function setTitle(_x3, _x4) {
        return _setTitle.apply(this, arguments);
      };
    }()
    /**
     * Dispatch events from the server
     * @param {Object} doc - received from the realtime of cozy-stack
     */

  }, {
    key: "onRealtimeEvent",
    value: function onRealtimeEvent(doc) {
      var id = doc.id || doc._id;
      var type = doc.doctype;

      if (this.callbacks[type] && this.callbacks[type][id]) {
        return this.callbacks[type][id](doc);
      } else {
        // eslint-disable-next-line no-console
        console.warn('Event not manager', type, id, this.callbacks);
      }
    }
    /**
     * Join a doc - listen to realtime events for this doc
     * @param {uui} docId
     */

  }, {
    key: "join",
    value: function () {
      var _join = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(docId) {
        var onRealtimeCreated;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                onRealtimeCreated = function onRealtimeCreated(doc) {
                  if (doc.id == docId) {
                    return this.onRealtimeEvent(docId);
                  } else {
                    return undefined;
                  }
                };

                _context3.next = 3;
                return Promise.all([this.realtime.subscribe('created', 'io.cozy.notes.events', onRealtimeCreated), this.realtime.subscribe('updated', 'io.cozy.notes.events', docId, this.onRealtimeEvent), this.realtime.subscribe('deleted', 'io.cozy.notes.events', docId, this.onRealtimeEvent)]);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function join(_x5) {
        return _join.apply(this, arguments);
      };
    }()
    /**
     * Listen for new steps from the server
     * @param {uuid} docId
     * @param {Function} callback
     */

  }, {
    key: "onStepsCreated",
    value: function () {
      var _onStepsCreated = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(docId, callback) {
        var _this = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.setCallback('io.cozy.notes.steps', docId, function (data) {
                  return callback(_this.server2client(data));
                });

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function onStepsCreated(_x6, _x7) {
        return _onStepsCreated.apply(this, arguments);
      };
    }()
    /**
     * Listen for new cursors positions from the server
     * @param {uuid} docId
     * @param {Function} callback
     */

  }, {
    key: "onTelepointerUpdated",
    value: function () {
      var _onTelepointerUpdated = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5(docId, callback) {
        var _this2 = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.setCallback('io.cozy.notes.telepointers', docId, function (data) {
                  return callback(_this2.server2client(data));
                });

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function onTelepointerUpdated(_x8, _x9) {
        return _onTelepointerUpdated.apply(this, arguments);
      };
    }()
    /**
     * Listen for title changes in the document
     * @param {uuid} docId
     * @param {Function} callback
     */

  }, {
    key: "onTitleUpdated",
    value: function () {
      var _onTitleUpdated = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee6(docId, callback) {
        var _this3 = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this.setCallback('io.cozy.notes.documents', docId, function (doc) {
                  return !doc.sessionID || doc.sessionID != _this3.sessionId ? callback(doc.title) : null;
                });

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function onTitleUpdated(_x10, _x11) {
        return _onTitleUpdated.apply(this, arguments);
      };
    }()
    /**
     * Get the full document for a note
     * @param {uuid} docId
     */

  }, {
    key: "getDoc",
    value: function () {
      var _getDoc = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee7(docId) {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.stackClient.fetchJSON('GET', this.path(docId));

              case 2:
                res = _context7.sent;
                return _context7.abrupt("return", {
                  doc: res.data.attributes.metadata.content,
                  version: res.data.attributes.metadata.version,
                  title: res.data.attributes.metadata.title,
                  file: res.data
                });

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function getDoc(_x12) {
        return _getDoc.apply(this, arguments);
      };
    }()
    /**
     * Push new local steps to the server
     * @param {uuid} docId
     * @param {integer} version
     * @param {Object[]} steps
     */

  }, {
    key: "pushSteps",
    value: function () {
      var _pushSteps = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee8(docId, version, steps) {
        var _this4 = this;

        var options, stepsDoc;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                options = {
                  headers: {
                    'if-match': version
                  }
                };
                stepsDoc = {
                  data: steps.map(function (step) {
                    return {
                      type: 'io.cozy.notes.steps',
                      attributes: _this4.client2server(step.toJSON())
                    };
                  })
                }; // will throw in case of 409
                // which will occurs if the server has more versions than us

                _context8.next = 4;
                return this.stackClient.fetchJSON('PATCH', this.path(docId), stepsDoc, options);

              case 4:
                return _context8.abrupt("return", null);

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function pushSteps(_x13, _x14, _x15) {
        return _pushSteps.apply(this, arguments);
      };
    }()
    /**
     * Fetch steps from the server since the provided versions
     * @param {uuid} docId
     * @param {integer} version
     * @returns {{version, steps}|{doc, version}}
     * If the server doesn't have all requested steps in memory,
     * it could returns the whole document in its current version
     */

  }, {
    key: "getSteps",
    value: function () {
      var _getSteps = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee9(docId, version) {
        var _this5 = this;

        var res, response, data, meta, doc, ver, ev;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                _context9.next = 3;
                return this.stackClient.fetchJSON('GET', "".concat(this.path(docId, 'steps'), "?Version=").concat(version));

              case 3:
                res = _context9.sent;

                if (!(res.data.length == 0)) {
                  _context9.next = 8;
                  break;
                }

                return _context9.abrupt("return", {
                  steps: [],
                  version: version
                });

              case 8:
                return _context9.abrupt("return", {
                  version: res.data[res.data.length - 1].version,
                  steps: res.data.map(function (step) {
                    return _objectSpread({}, step, {
                      attributes: _this5.client2server(step.attributes)
                    });
                  })
                });

              case 9:
                _context9.next = 25;
                break;

              case 11:
                _context9.prev = 11;
                _context9.t0 = _context9["catch"](0);
                response = _context9.t0.response;
                data = _context9.t0.reason && _context9.t0.reason.data;
                meta = data && data.attributes && data.attributes.metadata;
                doc = meta && meta.content;
                ver = meta && meta.version;

                if (!(response.status == 412 && doc && ver)) {
                  _context9.next = 24;
                  break;
                }

                // server does not have all steps we try to fetch
                // it responds with a full document and a title
                ev = 'io.cozy.notes.documents';

                if (this.callbacks[ev] && this.callbacks[ev][doc.id || doc._id]) {
                  this.callbacks[ev][doc.id || doc._id](doc);
                }

                return _context9.abrupt("return", {
                  doc: doc,
                  version: ver
                });

              case 24:
                throw _context9.t0;

              case 25:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[0, 11]]);
      }));

      return function getSteps(_x16, _x17) {
        return _getSteps.apply(this, arguments);
      };
    }()
    /**
     * Push new local cursor position to the server
     * @param {uuid} docId
     * @param {Object} data
     */

  }, {
    key: "pushTelepointer",
    value: function () {
      var _pushTelepointer = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee10(docId, data) {
        var telepointerDoc;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                telepointerDoc = {
                  data: {
                    type: 'io.cozy.notes.telepointers',
                    id: docId,
                    attributes: this.client2server(data)
                  }
                };
                return _context10.abrupt("return", this.stackClient.fetchJSON('PUT', this.path(docId, 'telepointer'), telepointerDoc));

              case 2:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      return function pushTelepointer(_x18, _x19) {
        return _pushTelepointer.apply(this, arguments);
      };
    }()
  }]);

  return ServiceClient;
}();
/* harmony default export */ __webpack_exports__["default"] = (ServiceClient);

/***/ }),

/***/ "hmtS":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "schemaOrdered", function() { return schemaOrdered; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "schemaObject", function() { return schemaObject; });
/* harmony import */ var prosemirror_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("byeC");
/* harmony import */ var prosemirror_model__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prosemirror_model__WEBPACK_IMPORTED_MODULE_0__);
 // taken from a debug of @atlakit/editor/editor-core/create-editor/create-editor
// L139 (new Schema({nodes ,marks}))
// static because the @atlaskit code base requires a real navigator
// TODO: either find and exclude plugins requiring interaction
//       or running a JSDOM faking a navigator

var nodes = [['doc', {
  content: '(block)+',
  marks: 'link'
}], ['paragraph', {
  content: 'inline*',
  group: 'block',
  marks: 'strong code em link strike subsup textColor typeAheadQuery underline',
  parseDOM: [{
    tag: 'p'
  }]
}], ['text', {
  group: 'inline'
}], ['bulletList', {
  group: 'block',
  content: 'listItem+',
  parseDOM: [{
    tag: 'ul'
  }]
}], ['orderedList', {
  group: 'block',
  content: 'listItem+',
  parseDOM: [{
    tag: 'ol'
  }]
}], ['listItem', {
  content: '(paragraph ) (paragraph | bulletList | orderedList )*',
  defining: true,
  parseDOM: [{
    tag: 'li'
  }]
}], ['heading', {
  attrs: {
    level: {
      default: 1
    }
  },
  content: 'inline*',
  group: 'block',
  defining: true,
  parseDOM: [{
    tag: 'h1',
    attrs: {
      level: 1
    }
  }, {
    tag: 'h2',
    attrs: {
      level: 2
    }
  }, {
    tag: 'h3',
    attrs: {
      level: 3
    }
  }, {
    tag: 'h4',
    attrs: {
      level: 4
    }
  }, {
    tag: 'h5',
    attrs: {
      level: 5
    }
  }, {
    tag: 'h6',
    attrs: {
      level: 6
    }
  }]
}], ['blockquote', {
  content: 'paragraph+',
  group: 'block',
  defining: true,
  selectable: false,
  parseDOM: [{
    tag: 'blockquote'
  }]
}], ['rule', {
  group: 'block',
  parseDOM: [{
    tag: 'hr'
  }]
}], ['panel', {
  group: 'block',
  content: '(paragraph | heading | bulletList | orderedList)+',
  attrs: {
    panelType: {
      default: 'info'
    }
  },
  parseDOM: [{
    tag: 'div[data-panel-type]'
  }]
}], ['confluenceUnsupportedBlock', {
  group: 'block',
  attrs: {
    cxhtml: {
      default: null
    }
  },
  parseDOM: [{
    tag: 'div[data-node-type="confluenceUnsupportedBlock"]'
  }]
}], ['confluenceUnsupportedInline', {
  group: 'inline',
  inline: true,
  atom: true,
  attrs: {
    cxhtml: {
      default: null
    }
  },
  parseDOM: [{
    tag: 'div[data-node-type="confluenceUnsupportedInline"]'
  }]
}], ['unsupportedBlock', {
  inline: false,
  group: 'block',
  atom: true,
  selectable: true,
  attrs: {
    originalValue: {
      default: {}
    }
  },
  parseDOM: [{
    tag: '[data-node-type="unsupportedBlock"]'
  }]
}], ['unsupportedInline', {
  inline: true,
  group: 'inline',
  selectable: true,
  attrs: {
    originalValue: {
      default: {}
    }
  },
  parseDOM: [{
    tag: '[data-node-type="unsupportedInline"]'
  }]
}], ['hardBreak', {
  inline: true,
  group: 'inline',
  selectable: false,
  parseDOM: [{
    tag: 'br'
  }]
}], ['table', {
  content: 'tableRow+',
  attrs: {
    isNumberColumnEnabled: {
      default: false
    },
    layout: {
      default: 'default'
    },
    __autoSize: {
      default: false
    }
  },
  tableRole: 'table',
  isolating: true,
  selectable: false,
  group: 'block',
  parseDOM: [{
    tag: 'table'
  }]
}], ['tableHeader', {
  content: '(paragraph | panel | blockquote | orderedList | bulletList | rule | heading )+',
  attrs: {
    colspan: {
      default: 1
    },
    rowspan: {
      default: 1
    },
    colwidth: {
      default: null
    },
    background: {
      default: null
    }
  },
  tableRole: 'header_cell',
  isolating: true,
  marks: '',
  parseDOM: [{
    tag: 'th'
  }]
}], ['tableRow', {
  content: '(tableCell | tableHeader)+',
  tableRole: 'row',
  parseDOM: [{
    tag: 'tr'
  }]
}], ['tableCell', {
  content: '(paragraph | panel | blockquote | orderedList | bulletList | rule | heading | unsupportedBlock)+',
  attrs: {
    colspan: {
      default: 1
    },
    rowspan: {
      default: 1
    },
    colwidth: {
      default: null
    },
    background: {
      default: null
    }
  },
  tableRole: 'cell',
  marks: '',
  isolating: true,
  parseDOM: [{
    tag: '.ak-renderer-table-number-column',
    ignore: true
  }, {
    tag: 'td'
  }]
}]];
var marks = [['link', {
  excludes: 'color',
  group: 'link',
  attrs: {
    href: {},
    __confluenceMetadata: {
      default: null
    }
  },
  inclusive: false,
  parseDOM: [{
    tag: 'a[href]'
  }]
}], ['em', {
  inclusive: true,
  group: 'fontStyle',
  parseDOM: [{
    tag: 'i'
  }, {
    tag: 'em'
  }, {
    style: 'font-style=italic'
  }]
}], ['strong', {
  inclusive: true,
  group: 'fontStyle',
  parseDOM: [{
    tag: 'strong'
  }, {
    tag: 'b'
  }, {
    style: 'font-weight'
  }]
}], ['textColor', {
  attrs: {
    color: {}
  },
  inclusive: true,
  group: 'color',
  parseDOM: [{
    style: 'color'
  }]
}], ['strike', {
  inclusive: true,
  group: 'fontStyle',
  parseDOM: [{
    tag: 'strike'
  }, {
    tag: 's'
  }, {
    tag: 'del'
  }, {
    style: 'text-decoration'
  }]
}], ['subsup', {
  inclusive: true,
  group: 'fontStyle',
  attrs: {
    type: {
      default: 'sub'
    }
  },
  parseDOM: [{
    tag: 'sub',
    attrs: {
      type: 'sub'
    }
  }, {
    tag: 'sup',
    attrs: {
      type: 'sup'
    }
  }]
}], ['underline', {
  inclusive: true,
  group: 'fontStyle',
  parseDOM: [{
    tag: 'u'
  }, {
    style: 'text-decoration'
  }]
}], ['code', {
  excludes: 'fontStyle link searchQuery color',
  inclusive: true,
  parseDOM: [{
    tag: 'span.code',
    preserveWhitespace: true
  }, {
    tag: 'code',
    preserveWhitespace: true
  }, {
    tag: 'tt',
    preserveWhitespace: true
  }, {
    tag: 'span',
    preserveWhitespace: true
  }]
}], ['typeAheadQuery', {
  excludes: 'searchQuery',
  inclusive: true,
  group: 'searchQuery',
  parseDOM: [{
    tag: 'span[data-type-ahead-query]'
  }],
  attrs: {
    trigger: {
      default: ''
    }
  }
}]];

function orderedToObject(ordered) {
  return ordered.reduce(function (acc, cur) {
    acc[cur[0]] = cur[1];
    return acc;
  }, {});
}

var schemaOrdered = {
  nodes: nodes,
  marks: marks
};
var schemaObject = {
  nodes: orderedToObject(nodes),
  marks: orderedToObject(marks)
};
var schema = new prosemirror_model__WEBPACK_IMPORTED_MODULE_0__["Schema"](schemaObject);
/* harmony default export */ __webpack_exports__["default"] = (schema);

/***/ }),

/***/ "j7Bi":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "lu5+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// if you change something here,
// you should update /lib/collab/schema.js
// otherwise the server part won't work
var editorConfig = {
  allowTables: true,
  allowRule: true,
  allowLists: true,
  allowTextColor: true,
  allowPanel: true
};
/* harmony default export */ __webpack_exports__["default"] = (editorConfig);

/***/ }),

/***/ "nKHk":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BackFromEditing; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("55Ip");
/* harmony import */ var cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("KXWi");
/* harmony import */ var _IsPublic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("ZNGu");




function BackFromEditing(_ref) {
  var returnUrl = _ref.returnUrl;
  var isPublic = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_IsPublic__WEBPACK_IMPORTED_MODULE_3__["default"]);

  if (returnUrl) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_2__["ButtonLink"], {
      icon: "previous",
      href: returnUrl,
      className: "sto-app-back",
      subtle: true
    });
  } else if (!isPublic) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_2__["Button"], {
      icon: "previous",
      tag: react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"],
      to: "/",
      className: "sto-app-back",
      subtle: true
    });
  } else {
    return null;
  }
}

/***/ }),

/***/ "nw0P":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./_lib/build_formatting_tokens_reg_exp/index.js": "kOWh",
	"./ar/build_distance_in_words_locale/index.js": "XxX6",
	"./ar/build_format_locale/index.js": "alis",
	"./ar/index.js": "EDRf",
	"./be/build_distance_in_words_locale/index.js": "LQ09",
	"./be/build_format_locale/index.js": "kj7F",
	"./be/index.js": "YEhR",
	"./bg/build_distance_in_words_locale/index.js": "7K3h",
	"./bg/build_format_locale/index.js": "RrdL",
	"./bg/index.js": "isx8",
	"./ca/build_distance_in_words_locale/index.js": "wqqj",
	"./ca/build_format_locale/index.js": "qcV0",
	"./ca/index.js": "Vwa+",
	"./cs/build_distance_in_words_locale/index.js": "ZKDM",
	"./cs/build_format_locale/index.js": "ipyF",
	"./cs/index.js": "dvhP",
	"./da/build_distance_in_words_locale/index.js": "2Mgc",
	"./da/build_format_locale/index.js": "Gned",
	"./da/index.js": "7ur/",
	"./de/build_distance_in_words_locale/index.js": "5IWf",
	"./de/build_format_locale/index.js": "THCn",
	"./de/index.js": "bgw5",
	"./el/build_distance_in_words_locale/index.js": "o/GB",
	"./el/build_format_locale/index.js": "8T9h",
	"./el/index.js": "dH0v",
	"./en/build_distance_in_words_locale/index.js": "LZbM",
	"./en/build_format_locale/index.js": "6DAA",
	"./en/index.js": "Us+F",
	"./eo/build_distance_in_words_locale/index.js": "qrnn",
	"./eo/build_format_locale/index.js": "Bl15",
	"./eo/index.js": "UB7v",
	"./es/build_distance_in_words_locale/index.js": "GEfZ",
	"./es/build_format_locale/index.js": "O+zC",
	"./es/index.js": "/S0t",
	"./fi/build_distance_in_words_locale/index.js": "VHtQ",
	"./fi/build_format_locale/index.js": "Oydx",
	"./fi/index.js": "ndVD",
	"./fil/build_distance_in_words_locale/index.js": "uq4p",
	"./fil/build_format_locale/index.js": "d7hw",
	"./fil/index.js": "pNfm",
	"./fr/build_distance_in_words_locale/index.js": "IzMR",
	"./fr/build_format_locale/index.js": "I3Zg",
	"./fr/index.js": "LKA2",
	"./hr/build_distance_in_words_locale/index.js": "DPvn",
	"./hr/build_format_locale/index.js": "puw3",
	"./hr/index.js": "L9Jq",
	"./hu/build_distance_in_words_locale/index.js": "w2RQ",
	"./hu/build_format_locale/index.js": "/0iD",
	"./hu/index.js": "Nm+E",
	"./id/build_distance_in_words_locale/index.js": "JbvB",
	"./id/build_format_locale/index.js": "0wlw",
	"./id/index.js": "A6C3",
	"./is/build_distance_in_words_locale/index.js": "qzMC",
	"./is/build_format_locale/index.js": "S3yD",
	"./is/index.js": "N4bE",
	"./it/build_distance_in_words_locale/index.js": "MDEp",
	"./it/build_format_locale/index.js": "aUJd",
	"./it/index.js": "hmb4",
	"./ja/build_distance_in_words_locale/index.js": "nNvt",
	"./ja/build_format_locale/index.js": "buui",
	"./ja/index.js": "uAXs",
	"./ko/build_distance_in_words_locale/index.js": "oEw+",
	"./ko/build_format_locale/index.js": "9SQf",
	"./ko/index.js": "iW8+",
	"./mk/build_distance_in_words_locale/index.js": "nmwZ",
	"./mk/build_format_locale/index.js": "htxJ",
	"./mk/index.js": "GzBU",
	"./nb/build_distance_in_words_locale/index.js": "SL1f",
	"./nb/build_format_locale/index.js": "CJ5F",
	"./nb/index.js": "73vv",
	"./nl/build_distance_in_words_locale/index.js": "Uyu0",
	"./nl/build_format_locale/index.js": "doCD",
	"./nl/index.js": "hCQt",
	"./pl/build_distance_in_words_locale/index.js": "FUBD",
	"./pl/build_format_locale/index.js": "nOYf",
	"./pl/index.js": "B6yL",
	"./pt/build_distance_in_words_locale/index.js": "aTPA",
	"./pt/build_format_locale/index.js": "TTT0",
	"./pt/index.js": "gdks",
	"./ro/build_distance_in_words_locale/index.js": "gI+A",
	"./ro/build_format_locale/index.js": "njjO",
	"./ro/index.js": "r2yp",
	"./ru/build_distance_in_words_locale/index.js": "KmPx",
	"./ru/build_format_locale/index.js": "UUBw",
	"./ru/index.js": "nz/o",
	"./sk/build_distance_in_words_locale/index.js": "q2Bs",
	"./sk/build_format_locale/index.js": "9sxn",
	"./sk/index.js": "Wqan",
	"./sl/build_distance_in_words_locale/index.js": "mlv2",
	"./sl/build_format_locale/index.js": "vHkZ",
	"./sl/index.js": "KYSo",
	"./sr/build_distance_in_words_locale/index.js": "LlkS",
	"./sr/build_format_locale/index.js": "RhjJ",
	"./sr/index.js": "7mU3",
	"./sv/build_distance_in_words_locale/index.js": "UNBN",
	"./sv/build_format_locale/index.js": "zTNB",
	"./sv/index.js": "hxgj",
	"./th/build_distance_in_words_locale/index.js": "XAGa",
	"./th/build_format_locale/index.js": "We2s",
	"./th/index.js": "Pk+z",
	"./tr/build_distance_in_words_locale/index.js": "aFZF",
	"./tr/build_format_locale/index.js": "jh7A",
	"./tr/index.js": "3ZWG",
	"./zh_cn/build_distance_in_words_locale/index.js": "KdB7",
	"./zh_cn/build_format_locale/index.js": "l4EP",
	"./zh_cn/index.js": "8tMq",
	"./zh_tw/build_distance_in_words_locale/index.js": "vyyr",
	"./zh_tw/build_format_locale/index.js": "uYH7",
	"./zh_tw/index.js": "QPlQ"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "nw0P";

/***/ }),

/***/ "pL5B":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("0cfB");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("55Ip");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var cozy_ui_transpiled_react_I18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("Bh3+");
/* harmony import */ var cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("y6ex");
/* harmony import */ var cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("V2U0");
/* harmony import */ var cozy_ui_transpiled_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("H+Xc");
/* harmony import */ var cozy_ui_react_AppTitle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("vYzF");
/* harmony import */ var components_notes__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("Zlyp");
/* harmony import */ var lib_utils_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("snnE");
/* harmony import */ var lib_initFromDom__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("X3v2");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* global cozy */











var manifest = __webpack_require__("pZg0");




var RoutedEditor = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["withRouter"])(function (props) {
  var returnUrl = Object(lib_utils_js__WEBPACK_IMPORTED_MODULE_12__["getReturnUrl"])();
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(components_notes__WEBPACK_IMPORTED_MODULE_11__["Editor"], {
    noteId: props.match.params.id,
    returnUrl: returnUrl
  });
});

var PrivateContext = function PrivateContext() {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Switch"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], {
    path: "/n/:id",
    component: RoutedEditor
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], {
    path: "/",
    component: components_notes__WEBPACK_IMPORTED_MODULE_11__["List"]
  }));
};

var Unshared = Object(cozy_ui_transpiled_react_I18n__WEBPACK_IMPORTED_MODULE_5__["translate"])()(function (_ref) {
  var t = _ref.t;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_transpiled_react__WEBPACK_IMPORTED_MODULE_9__["Empty"], {
    icon: 'warning-circle',
    title: t("Error.unshared_title"),
    text: t("Error.unshared_text")
  });
});
var PublicContext = Object(cozy_client__WEBPACK_IMPORTED_MODULE_4__["withClient"])(function (_ref2) {
  var client = _ref2.client;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      _useState2 = _slicedToArray(_useState, 2),
      sharedDocumentId = _useState2[0],
      setSharedDocumentId = _useState2[1];

  var returnUrl = Object(react__WEBPACK_IMPORTED_MODULE_1__["useMemo"])(function () {
    return Object(lib_utils_js__WEBPACK_IMPORTED_MODULE_12__["getReturnUrl"])();
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    var fetchData =
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var id;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return Object(lib_utils_js__WEBPACK_IMPORTED_MODULE_12__["getSharedDocument"])(client);

              case 3:
                id = _context.sent;
                setSharedDocumentId(id);
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                setSharedDocumentId(false);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7]]);
      }));

      return function fetchData() {
        return _ref3.apply(this, arguments);
      };
    }();

    fetchData();
  }, []);

  if (sharedDocumentId) {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(components_notes__WEBPACK_IMPORTED_MODULE_11__["Editor"], {
      noteId: sharedDocumentId,
      returnUrl: returnUrl || false
    });
  } else if (sharedDocumentId !== null) {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Unshared, null);
  } else {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_8__["default"], {
      size: "xxlarge",
      middle: true
    });
  }
});

var App = function App(_ref4) {
  var isPublic = _ref4.isPublic,
      isMobile = _ref4.breakpoints.isMobile,
      client = _ref4.client;
  var appName = '';

  if (isMobile) {
    var data = client.getInstanceOptions();
    appName = Object(lib_initFromDom__WEBPACK_IMPORTED_MODULE_13__["getDataOrDefault"])(data.cozyAppName, manifest.name);
  }

  var BarCenter = cozy.bar.BarCenter;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["HashRouter"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Layout__WEBPACK_IMPORTED_MODULE_6__["Layout"], {
    monoColumn: true
  }, isMobile && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(BarCenter, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_AppTitle__WEBPACK_IMPORTED_MODULE_10__["default"], null, appName)), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Layout__WEBPACK_IMPORTED_MODULE_6__["Main"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Layout__WEBPACK_IMPORTED_MODULE_6__["Content"], {
    className: "app-content"
  }, isPublic ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(PublicContext, null) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(PrivateContext, null))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_7__["Sprite"], null)));
};
/*
  Enable Hot Module Reload using `react-hot-loader` here
  We enable it here since App is the main root component
  No need to use it anywhere else, it sould work for all
  child components
*/


/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(Object(cozy_ui_transpiled_react__WEBPACK_IMPORTED_MODULE_9__["withBreakpoints"])()(Object(cozy_client__WEBPACK_IMPORTED_MODULE_4__["withClient"])(App))));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3UD+")(module)))

/***/ }),

/***/ "pZg0":
/***/ (function(module, exports) {

module.exports = {"name":"Notes","name_prefix":"Cozy","slug":"notes","icon":"icon.svg","categories":[],"version":"1.0.7","licence":"AGPL-3.0","editor":"Cozy","source":"https://github.com/cozy/cozy-notes.git@build","developer":{"name":"Cozy Cloud","url":"https://cozy.io"},"locales":{"en":{"short_description":"Cozy Notes is the application for saving, editing and managing all your notes in your Cozy.","long_description":"Create your notes, save them and find them in one click in your Cozy. Share ideas with anyone you want in a private and secure space. \n\nWith Cozy Notes, you can easily:\n\n-- Create your own notes\n-- Easily edit your notes\n-- Access your notes directly from your Cozy Drive application."},"fr":{"short_description":"Cozy Notes est l’application de sauvegarde, d’édition et de gestion de tous vos notes dans votre Cozy.","long_description":"Créez vos notes, sauvegardez-les et retrouvez-les en un clin d’oeil dans votre Cozy. Partagez des idées avec qui vous voulez dans un espace privé et sécurisé. \n\nAvec Cozy Notes, vous pouvez facilement :\n\n- Créer vos propres notes\n- Éditer facilement vos notes\n- Accéder à vos notes directement depuis votre application Cozy Drive."}},"screenshots":["screenshots/fr/screenshot01.png","screenshots/fr/screenshot02.png"],"langs":["en","fr"],"routes":{"/":{"folder":"/","index":"index.html","public":false},"/public":{"folder":"/","index":"index.html","public":true}},"permissions":{"apps":{"description":"Required by the cozy-bar to display the icons of the apps","type":"io.cozy.apps","verbs":["GET"]},"files":{"description":"Notes as files","type":"io.cozy.files"}}}

/***/ }),

/***/ "snnE":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getShortNameFromClient", function() { return getShortNameFromClient; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getReturnUrl", function() { return getReturnUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateReturnUrlToNotesIndex", function() { return generateReturnUrlToNotesIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSharedDocument", function() { return getSharedDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getParentFolderId", function() { return getParentFolderId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getParentFolderLink", function() { return getParentFolderLink; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("mwIZ");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var cozy_device_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("snfs");
/* harmony import */ var cozy_device_helper__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cozy_device_helper__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var cozy_ui_transpiled_react_AppLinker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("sCMN");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




function getShortNameFromClient(client) {
  var url = new URL(client.getStackClient().uri);
  return url.hostname + Math.floor(Math.random() * 100);
}
var returnUrlKey = 'returnUrl';
function getReturnUrl() {
  var searchParams = new URLSearchParams(window.location.search);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = searchParams[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2),
          key = _step$value[0],
          value = _step$value[1];

      if (key === returnUrlKey) {
        return value;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return undefined;
}
var generateReturnUrlToNotesIndex = function generateReturnUrlToNotesIndex(doc) {
  var url = new URL(window.location);
  url.searchParams.append(returnUrlKey, window.location.origin);
  url.hash = "#/n/".concat(doc.id);
  return url;
};
function getSharedDocument(_x) {
  return _getSharedDocument.apply(this, arguments);
}

function _getSharedDocument() {
  _getSharedDocument = _asyncToGenerator(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(client) {
    var _ref, permissionsData, permissions, sharedDocumentId;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return client.collection('io.cozy.permissions').getOwnPermissions();

          case 2:
            _ref = _context.sent;
            permissionsData = _ref.data;
            permissions = permissionsData.attributes.permissions; // permissions contains several named keys, but the one to use depends on the situation. Using the first one is what we want in all known cases.

            sharedDocumentId = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(Object.values(permissions), '0.values.0');
            return _context.abrupt("return", sharedDocumentId);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _getSharedDocument.apply(this, arguments);
}

function getParentFolderId(file) {
  return file.relationships.parent.data.id;
}

function getFolderLink(id) {
  return "/folder/".concat(id.replace(/-/g, ''));
}

function getFullLink(client, id) {
  var cozyURL = new URL(client.getStackClient().uri);

  var _client$getInstanceOp = client.getInstanceOptions(),
      cozySubdomainType = _client$getInstanceOp.cozySubdomainType;

  var driveSlug = 'drive';
  var pathForDrive = getFolderLink(id);
  var webUrl = Object(cozy_ui_transpiled_react_AppLinker__WEBPACK_IMPORTED_MODULE_3__["generateWebLink"])({
    cozyUrl: cozyURL.origin,
    slug: driveSlug,
    subDomainType: cozySubdomainType,
    nativePath: pathForDrive
  });
  /** If no mobile, then return the fallback directly. No need
   * for the universal link
   */

  if (!Object(cozy_device_helper__WEBPACK_IMPORTED_MODULE_2__["isMobile"])()) {
    return webUrl;
  }

  var urlWithUL = Object(cozy_ui_transpiled_react_AppLinker__WEBPACK_IMPORTED_MODULE_3__["generateUniversalLink"])({
    slug: driveSlug,
    fallbackUrl: webUrl,
    nativePath: pathForDrive,
    subDomainType: cozySubdomainType
  });
  return urlWithUL;
}

function getParentFolderLink(client, file) {
  return getFullLink(client, getParentFolderId(file));
}

/***/ }),

/***/ "tIF1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4BeY");
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("IaFt");
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon_note_empty_77efa79dd615f19897a8ed6ec9097298",
  "use": "icon_note_empty_77efa79dd615f19897a8ed6ec9097298-usage",
  "viewBox": "0 0 171 168",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 171 168\" id=\"icon_note_empty_77efa79dd615f19897a8ed6ec9097298\">\n    <defs>\n        <path id=\"icon_note_empty_77efa79dd615f19897a8ed6ec9097298_a\" d=\"M.02.12h36.532v20.674H.02z\" />\n    </defs>\n    <g fill=\"none\" fill-rule=\"evenodd\">\n        <path fill=\"#0DCBCF\" d=\"M48.367 47.28c3.795-4.135 9.702 2.27 5.938 6.374-8.105 8.832-11.21 22.848-5.617 33.864 6.83 13.453 25.138 8.377 36.387 4.37 5.26-1.871 7.054 6.655 1.834 8.515-15.343 5.464-37.282 8.714-45.942-8.858-7.276-14.767-3.455-32.433 7.4-44.265\" />\n        <path fill=\"#D6FAFB\" d=\"M59.57 16.922c.739-4.162 1.797-8.167 3.764-11.417C66.807-.21 73.009-.675 79.69.561c3.047.47 76.99 11.012 78.873 11.76 6.957 2.843 7.343 8.129 5.837 14.148-.141.971-20.067 84.443-21.43 88.854-1.852 5.978-4.906 11.375-10.609 11.973-5.714.623-75.27-18.403-78.5-19.534-3.954-1.39-5.72-3.632-6.159-6.323-.603-1.443-.376-3.088-.067-5.144.8-5.412 8.228-69.79 11.935-79.373\" />\n        <path fill=\"#FFF\" d=\"M65.047 19.073S64.561 3.301 79.004 5.122c14.443 1.819 89.593 13.951 89.593 13.951v9.972l-15.17 7.281-88.38-17.253z\" />\n        <path fill=\"#ACF5F7\" d=\"M53.622 31.458c.246-4.25.829-8.372 2.413-11.844 2.795-6.122 8.927-7.314 15.747-6.87 3.103.105 6.245.706 8.959 1.155 13.33 2.21 60.933 9.536 62.437 9.936.853.239 3.242 1.012 3.93 1.337 5.173 2.422 4.26 6.643 3.56 12.102-.023.988-10.066 86.694-10.903 91.263-1.155 6.187-3.561 11.933-9.185 13.21-5.636 1.297-77.342-9.496-80.695-10.235-4.111-.928-6.143-2.958-6.897-5.597-.781-1.368-.738-3.034-.675-5.12.157-5.506 8.735-79.333 11.309-89.337\" />\n        <path fill=\"#79ECEE\" d=\"M134.818 99.416c4.069-24.17 8.504-48.43 11.948-72.677.037-.293.209-1.305.35-1.515-.04-.744 2.317.264 4.506.067.068 0 .925-.114.992-.114.716-.138 1.42-.29 2.149-.552 3.554-1.285 4.98-4.27 4.938-7.584-.046-2.971-2.376-4.28-2.285-5.071.047-.427 2.619.902 2.915 1 .405.133 3.131 1.892 4.372 4.065 1.249 2.19.856 5.296.785 8.049-.244 9.277-8.008 66.518-9.51 78.49.026.153-.358 3.1-.546 4.417-.38 2.901-.772 5.807-1.182 8.707-.319 2.271-1.653 15.153-1.929 15.747-3.391 7.361-12.892 9.872-20.513 9.34-.434.025-.851-.016-1.524-.102-.844-.108-2.024.034-3.35-.235.145-2.458 5.937-30.472 7.884-42.032\" />\n        <path fill=\"#FFF\" d=\"M98.24 56.354c3.65-6.425 11.472-9.96 18.354-7.212a10.488 10.488 0 0 1 4.359 2.129c.117.074.22.173.33.253.099.086.2.171.29.253a10.141 10.141 0 0 1 3.012 3.703c.14.243.285.483.408.733.028.087.095.136.12.22.089.233.126.462.208.7.4 1.024.667 2.088.785 3.213.399 2.397.348 4.8-.468 7.371-1.431 4.512-6.871 6.769-11.066 7.466-3.062.503-6.549-.22-9.546-1.52-4.286-1.86-5.61-4.269-6.733-7.469-1.146-3.274-1.878-6.632-.054-9.84M57.875 49.863c1.7-3.323 4.417-5.416 7.697-6.62.072-.048.117-.104.197-.162 2.037-1.45 4.806-2 7.4-1.642 6.076.399 11.603 5.645 13.426 11.64.926 3.055.816 6.827-.747 9.66-2.345 4.249-6.24 6.338-10.86 7.305-7.715 1.625-16.183-3.686-18.103-11.22-.745-2.904-.38-6.293.99-8.961\" />\n        <path fill=\"#FFF\" d=\"M97.573 60.005c.542 1.111 2.285 1.832 3.325 1.161 1.116-.715 1.315-2.42.479-3.462-.451-.557-1.063-.82-1.666-.79a.296.296 0 0 0-.235-.062c-1.392.108-2.635 1.68-1.903 3.153M82.511 58.042c.543 1.11 2.287 1.83 3.325 1.159 1.12-.72 1.318-2.42.479-3.46-.453-.558-1.059-.82-1.668-.791a.295.295 0 0 0-.227-.065c-1.4.11-2.637 1.679-1.909 3.157\" />\n        <path fill=\"#FFF\" d=\"M83.12 55.648c.916-3.33 5.387-5.305 8.553-5.085 3.765.266 8.59 3.494 9.277 7.454.373 2.132-3.201 2.492-3.554.466-.782-4.47-8.893-6.614-10.702-2.003-.036.357-.226.713-.675 1.002-.022.023-.05.037-.07.05-1.412.921-3.292-.203-2.83-1.884\" />\n        <path fill=\"#79ECEE\" d=\"M130.887 48.194c1.972 3.09 7.333 4.648 10.183 2.337 3.064-2.497 3.1-7.587.281-10.373-1.511-1.495-3.399-2.072-5.16-1.798a1.058 1.058 0 0 0-.718-.108c-4.064.775-7.221 5.81-4.586 9.942M127.85 77.94c1.733 2.724 6.45 4.093 8.956 2.058 2.697-2.199 2.723-6.673.244-9.122-1.327-1.316-2.985-1.825-4.536-1.582a.938.938 0 0 0-.63-.094c-3.578.679-6.353 5.109-4.034 8.74M123.467 106.767c1.607 2.793 6.26 4.374 8.854 2.454 2.796-2.074 3.021-6.54.654-9.102-1.267-1.375-2.901-1.949-4.46-1.781a.948.948 0 0 0-.627-.127c-3.603.52-6.573 4.823-4.42 8.556\" />\n        <path fill=\"#D6FAFB\" d=\"M134.92 71.16l.384-.004c3.34-.056 4.832 2.564 4.435 4.87.819 3.035 6.732 4.083 9.188 4.55 3.327.638 6.204.138 7.935-1.695a5.354 5.354 0 0 0 .518-.67c.964-1.44 1.663-2.972 2.485-4.46.207-1.606.413-3.208.626-4.844 1.045.01 7.44.93 7.404 5.085-.061 7.397-4.113 11.963-9.873 13.901.007-.076.018-.156.03-.233a.106.106 0 0 0-.042.013l.012.22c-2.516.844-5.377 1.193-8.431 1.044-7.434-.364-19.518-4.398-19.253-13.56.07-2.467 2.191-4.176 4.582-4.217M155.979 103.575c.026.15-.358 3.097-.548 4.415-.379 2.903-.77 5.807-1.182 8.708-.04.298-.1.792-.173 1.41-.423.111-.846.232-1.267.325-9.933 2.216-23.748-2.264-26.83-12.978-1.387-4.823 5.737-6.845 8.28-3.535 3.25 3.006 6.375 4.279 10.726 4.987 2.315.378 9.589 1.174 10.133-1.001l.86-2.331z\" />\n        <path fill=\"#D6FAFB\" d=\"M155.43 107.99c.19-1.318.575-4.264.549-4.415.141-1.139.343-2.691.587-4.57 1.43-.943 3.35-1.181 4.91-.156 4.028 2.644 5.269 6.247 3.534 10.833-1.791 4.722-6.312 7.18-10.936 8.425.075-.617.134-1.11.175-1.409.412-2.901.803-5.805 1.182-8.708\" />\n        <path fill=\"#0DCBCF\" d=\"M97.295 86.818c.143-.42-.082-.821-.543-.907l-15.969-2.926c-.445-.086-.826.224-.826.667 0 0-.792 8.124 7.2 9.59 7.994 1.46 10.138-6.424 10.138-6.424M106.717 66.413a2.628 2.628 0 0 0 2.9-2.325c.148-1.137.803-3.051 3.438-2.757 2.873.313 2.836 2.714 2.758 3.44a2.632 2.632 0 0 0 2.32 2.906 2.635 2.635 0 0 0 2.902-2.328c.367-3.341-1.301-8.563-7.404-9.24-6.1-.67-8.868 4.061-9.233 7.399a2.623 2.623 0 0 0 2.319 2.905M65.97 60.55a2.618 2.618 0 0 0 2.898-2.323c.154-1.135.809-3.045 3.444-2.756 2.873.32 2.836 2.715 2.758 3.446a2.628 2.628 0 0 0 2.324 2.898 2.633 2.633 0 0 0 2.896-2.326c.369-3.336-1.295-8.561-7.399-9.232-6.107-.682-8.87 4.055-9.24 7.395a2.62 2.62 0 0 0 2.319 2.898M7.328 107.186s-4.037-2.086 6.805-8.374c10.108-5.864 7.278 10.253 7.278 10.253l-14.083-1.88z\" />\n        <path fill=\"#DFFCFC\" d=\"M77.122 128.065c-3.962-7.31-6.318-14.535-8.397-21.528-3.496-11.78-4.837-23.725-10.418-35.926-.384-.842-1.51-1.893-2.359-2.092a1247.17 1247.17 0 0 1-45.203-11.481C5.086 55.485.713 55.304.083 59.109c-.007.039-.016.076-.022.12-.14.995-.046 2.243.353 3.81.19.754.696 1.372 1.281 1.841C4.793 75.29 6.898 85.406 10.32 95.907c3.831 11.75 8.712 23.72 12.591 35.483.415 1.26 1.806 2.668 3.07 2.721.323.013.648.028.971.04 3.006 1.149 30.837 7.319 41.229 8.583 4.412.538 18.182 5.133 17.55-.856-.335-3.168-7.048-10.931-8.61-13.813\" />\n        <path fill=\"#0DCBCF\" d=\"M24.169 106.068c-4.748.862-9.072.078-13.23-2.376-3.782-2.232-6.633 3.978-2.878 6.194a24.375 24.375 0 0 0 16.752 2.983c4.29-.779 3.694-7.587-.644-6.801\" />\n        <path fill=\"#0DCBCF\" d=\"M26.43 113.925c-4.822.208-9-1.152-12.787-4.147-3.445-2.725-7.11 3.043-3.69 5.747a24.362 24.362 0 0 0 16.193 5.225c4.356-.19 4.689-7.017.284-6.825\" />\n        <path fill=\"#0DCBCF\" d=\"M27.7 121.497c-4.773-.725-8.608-2.867-11.746-6.535-2.856-3.338-7.566 1.615-4.73 4.929a24.372 24.372 0 0 0 14.88 8.249c4.313.653 5.952-5.982 1.595-6.643\" />\n        <path fill=\"#D6FAFB\" d=\"M56.82 163.387c2.634 1.707 9.394 3.19 14.841 3.785 14.866 1.625 35.651.773 44.451-2.186 8.875-2.98 9.27-7.505-13.293-9.77-19.21-1.926-41.628.772-46.423 4.818-1.286 1.083-1.211 2.293.423 3.353\" />\n        <path fill=\"#FFF\" d=\"M85.93 121.501l-8.872-2.495 5.144-7.99 53.966-19.197a4.453 4.453 0 0 1 5.686 2.7l.746 2.099a4.45 4.45 0 0 1-2.702 5.686L85.93 121.5z\" />\n        <path fill=\"#0DCBCF\" d=\"M154.388 66.712c-4.389-3.498-9.232 3.746-4.877 7.216 9.374 7.469 14.612 20.835 10.794 32.583-4.663 14.35-23.538 12.171-35.273 9.956-5.483-1.035-5.935 7.667-.492 8.695 16.003 3.021 38.184 2.835 44.015-15.867 4.9-15.715-1.61-32.577-14.167-42.583\" />\n        <path fill=\"#0DCBCF\" d=\"M117.57 120.966c-.858-.505-1.8-.82-2.724-.954.007-.692-.294-1.44-.896-2.045a5.36 5.36 0 0 0-1.042-.795c.604-.217 1.24-.4 1.767-.57 4.603-1.484-.888-7.006-5.49-5.523-4.248 1.372-8.193 3.504-7.248 7.418.244 1.01 1.247 2.234 2.773 2.788.09.031.177.056.268.09.235 1.784 2.018 3.698 4.6 4.72.32.126.656.225.99.326.556 1.45 2.692 2.89 4.895 2.99 5.026.234 8.746-1.607 9.6-4.766.4-1.491-1.568-3.332-3.883-3.906-1.418-.35-2.69-.218-3.61.227\" />\n        <path fill=\"#0DCBCF\" d=\"M116.74 108.083c-2.338-.522-12.208 2.855-5.111 5.063 1.627.505 1.248.814 2.754 1.558-.564.2-1.05.473-1.4.824-2.277.728-2.681 3.583-1.654 5.93 1.48 3.38 2.415 7.939 7.426 7.805 5.597-.148 12.373-6.007 12.023-9.417-.211-2.065-1.65-5.025-4.013-6.767-1.204-.887-7.684-4.475-10.024-4.996\" />\n        <path fill=\"#0DCBCF\" d=\"M118.038 108.505s-11.852-4.477-13.846-1.858c-1.799 2.363-5.817 10.49-3.131 10.95 2.683.463 10.129-2.62 10.129-2.62l6.848-6.472z\" />\n        <g transform=\"translate(134.244 38.595)\">\n            <mask id=\"icon_note_empty_77efa79dd615f19897a8ed6ec9097298_b\" fill=\"#fff\">\n                <use xlink:href=\"#icon_note_empty_77efa79dd615f19897a8ed6ec9097298_a\" />\n            </mask>\n            <path fill=\"#D6FAFB\" d=\"M9.325 7.036c.397 5.93 8.7 6.329 13.777 4.795.42-.158.845-.317 1.23-.505a9.225 9.225 0 0 0 1.389-.872c.082-.06.995-.824 1.133-.954 1.086-1.008 2.065-2.238 2.415-3.433.248-2.072.485-4.087.695-5.947a8.54 8.54 0 0 1 2.63 1.137C34 2.191 34.869 3.2 35.499 4.768c.088.213.125.438.17.665.332.608.553 1.271.557 1.963 1.55 5.622-2.602 9.814-8.58 11.908.032-.244.058-.477.09-.717-.01.004-.02.011-.029.015-.018.233-.03.458-.061.702C17.12 22.994.906 20.164.03 7.036c-.365-5.393 8.932-5.393 9.294 0\" mask=\"url(#icon_note_empty_77efa79dd615f19897a8ed6ec9097298_b)\" />\n        </g>\n        <path fill=\"#ACF5F7\" d=\"M67.018 83.907a4.967 4.967 0 1 1-9.935 0 4.966 4.966 0 0 1 4.967-4.967 4.967 4.967 0 0 1 4.968 4.967M73.57 105.824a4.967 4.967 0 1 1-9.935 0 4.966 4.966 0 0 1 4.966-4.966 4.967 4.967 0 0 1 4.969 4.966M80.564 124.544a4.967 4.967 0 0 1-4.968 4.966 4.966 4.966 0 0 1-4.967-4.966 4.967 4.967 0 1 1 9.935 0\" />\n    </g>\n</symbol>"
});
var result = _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ })

/******/ });
//# sourceMappingURL=notes.js.map