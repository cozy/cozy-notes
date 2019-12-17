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
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + "/notes.js"
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
/******/ 	// The chunk loading function for additional chunks
/******/ 	// Since all referenced chunks are already included
/******/ 	// in this file, this function is empty here.
/******/ 	__webpack_require__.e = function requireEnsure() {
/******/ 		return Promise.resolve();
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
	"./en.json": "7dT6"
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

__webpack_require__("8/wi");
__webpack_require__("iccH");
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

module.exports = JSON.parse("{\"Error\":{\"unshared_title\":\"This share is no longer active\",\"unshared_text\":\"The owner may have revoked this share. You can no longer edit a note at this address.\"}}");

/***/ }),

/***/ "AIob":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EditorView; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _atlaskit_editor_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("ND5g");
/* harmony import */ var cozy_ui_react_Text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("kyGY");
/* harmony import */ var cozy_ui_react_Textarea__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("jWvl");
/* harmony import */ var _editor_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("lu5+");
/* harmony import */ var _back_from_editing__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("nKHk");
/* harmony import */ var _header_menu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("+7CB");
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
      returnUrl = props.returnUrl;
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
    className: "note-header-menu--editing"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
    className: "note-editor-container"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_atlaskit_editor_core__WEBPACK_IMPORTED_MODULE_1__["Editor"], _extends({
    collabEdit: collabProvider,
    onChange: onContentChange,
    defaultValue: defaultValue
  }, _editor_config__WEBPACK_IMPORTED_MODULE_4__["default"], {
    appearance: "full-page",
    placeholder: "Que voulez-vous dire ?",
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



var Channel =
/*#__PURE__*/
function () {
  function Channel(config, serviceClient) {
    _classCallCheck(this, Channel);

    this.config = config;
    this.service = serviceClient;
    this.eventEmitter = new eventemitter2__WEBPACK_IMPORTED_MODULE_1__["EventEmitter2"]();
  }
  /**
   * Connect to pubsub to start receiving events
   */


  _createClass(Channel, [{
    key: "connect",
    value: function () {
      var _connect = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(version, doc) {
        var _this = this;

        var docId;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                docId = this.config.docId;
                this.service.join(docId);
                this.service.onStepsCreated(docId, function (data) {
                  _this.emit('data', {
                    version: data.version,
                    steps: [data]
                  });
                });
                this.service.onTelepointerUpdated(docId, function (payload) {
                  _this.emit('telepointer', payload);
                });
                this.eventEmitter.emit('connected', {
                  doc: doc,
                  version: version
                });

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function connect(_x, _x2) {
        return _connect.apply(this, arguments);
      };
    }()
  }, {
    key: "debounce",
    value: function debounce(getState) {
      var _this2 = this;

      if (this.debounced) {
        clearTimeout(this.debounced);
      }

      this.debounced = window.setTimeout(function () {
        _this2.sendSteps(getState(), getState);
      }, 250);
    }
    /**
     * Send steps to service
     */

  }, {
    key: "sendSteps",
    value: function () {
      var _sendSteps = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(state, getState, localSteps) {
        var docId, version, _ref, steps, response;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                docId = this.config.docId;

                if (!this.isSending) {
                  _context2.next = 4;
                  break;
                }

                this.debounce(getState);
                return _context2.abrupt("return");

              case 4:
                version = Object(prosemirror_collab__WEBPACK_IMPORTED_MODULE_2__["getVersion"])(state); // Don't send any steps before we're ready.

                if (!(_typeof(version) === undefined)) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return");

              case 7:
                _ref = localSteps || Object(prosemirror_collab__WEBPACK_IMPORTED_MODULE_2__["sendableSteps"])(state) || {
                  steps: []
                }, steps = _ref.steps; // sendableSteps can return null..

                if (!(steps.length === 0)) {
                  _context2.next = 10;
                  break;
                }

                return _context2.abrupt("return");

              case 10:
                this.isSending = true;
                _context2.prev = 11;
                _context2.next = 14;
                return this.service.pushSteps(docId, version, steps);

              case 14:
                response = _context2.sent;
                this.isSending = false;

                if (response && response.steps && response.steps.length > 0) {
                  this.emit('data', response);
                }

                _context2.next = 23;
                break;

              case 19:
                _context2.prev = 19;
                _context2.t0 = _context2["catch"](11);
                this.debounce(getState);
                this.isSending = false;

              case 23:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[11, 19]]);
      }));

      return function sendSteps(_x3, _x4, _x5) {
        return _sendSteps.apply(this, arguments);
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
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(version) {
        var docId;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                docId = this.config.docId;
                _context3.next = 3;
                return this.service.getSteps(docId, version);

              case 3:
                return _context3.abrupt("return", _context3.sent);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
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
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(data) {
        var docId;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                docId = this.config.docId;
                _context4.next = 3;
                return this.service.pushTelepointer(docId, data);

              case 3:
                return _context4.abrupt("return", _context4.sent);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
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
  }

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

      this.channel.sendSteps(newState, this.getState);
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
                currentVersion = Object(prosemirror_collab__WEBPACK_IMPORTED_MODULE_2__["getVersion"])(this.getState());
                _context.prev = 1;
                _context.next = 4;
                return this.channel.getSteps(currentVersion);

              case 4:
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
                this.processQueue();
                _context.next = 16;
                break;

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](1);
                // something got wrong, try to catchup again
                // TODO : maybe try to reinit the full doc ?
                this.programCatchup();

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 13]]);
      }));

      return function catchup() {
        return _catchup.apply(this, arguments);
      };
    }()
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
  }, {
    key: "cancelCatchup",
    value: function cancelCatchup() {
      if (this.queueTimeout) {
        window.clearTimeout(this.queueTimeout);
        this.queueTimeout = undefined;
      }
    }
  }, {
    key: "processQueue",
    value: function processQueue() {
      if (this.queue.length > 0) {
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

/***/ "H/IU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _create_cozy_app_packages_cozy_scripts_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("BoOd");
/* harmony import */ var _create_cozy_app_packages_cozy_scripts_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_create_cozy_app_packages_cozy_scripts_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _create_cozy_app_packages_cozy_scripts_node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("gPZP");
/* harmony import */ var _create_cozy_app_packages_cozy_scripts_node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_create_cozy_app_packages_cozy_scripts_node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new _create_cozy_app_packages_cozy_scripts_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-note-32_0b87f187ce7a65cb93dbf28b37a73b8d",
  "use": "icon-note-32_0b87f187ce7a65cb93dbf28b37a73b8d-usage",
  "viewBox": "0 0 32 32",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 32 32\" id=\"icon-note-32_0b87f187ce7a65cb93dbf28b37a73b8d\">\n<style type=\"text/css\">\n\t#icon-note-32_0b87f187ce7a65cb93dbf28b37a73b8d .st0{fill-rule:evenodd;clip-rule:evenodd;fill:#ACF5F7;}\n\t#icon-note-32_0b87f187ce7a65cb93dbf28b37a73b8d .st1{fill-rule:evenodd;clip-rule:evenodd;fill:#0DCBCF;}\n</style>\n<g transform=\"translate(2)\">\n\t<path class=\"st0\" d=\"M0,2c0-1.1,0.9-2,2-2h22c1.1,0,2,0.9,2,2v28c0,1.1-0.9,2-2,2H2c-1.1,0-2-0.9-2-2V2z\" />\n\t<path class=\"st1\" d=\"M6,8h14v2H6V8z M6,12h8v2H6V12z M6,16h14v2H6V16z M6,20h10v2H6V20z\" />\n</g>\n<g transform=\"translate(0 4)\">\n\t<path class=\"st1\" d=\"M1.5,0h2C4.3,0,5,0.7,5,1.5l0,0C5,2.3,4.3,3,3.5,3h-2C0.7,3,0,2.3,0,1.5l0,0C0,0.7,0.7,0,1.5,0z\" />\n\t<path class=\"st1\" d=\"M1.5,7h2C4.3,7,5,7.7,5,8.5l0,0C5,9.3,4.3,10,3.5,10h-2C0.7,10,0,9.3,0,8.5l0,0C0,7.7,0.7,7,1.5,7z\" />\n\t<path class=\"st1\" d=\"M1.5,14h2C4.3,14,5,14.7,5,15.5l0,0C5,16.3,4.3,17,3.5,17h-2C0.7,17,0,16.3,0,15.5l0,0C0,14.7,0.7,14,1.5,14z\" />\n\t<path class=\"st1\" d=\"M1.5,21h2C4.3,21,5,21.7,5,22.5l0,0C5,23.3,4.3,24,3.5,24h-2C0.7,24,0,23.3,0,22.5l0,0C0,21.7,0.7,21,1.5,21z\" />\n</g>\n<g>\n\t<path class=\"st1\" d=\"M31.4,18.4l-2.8-2.8c0.8-0.8,2-0.8,2.8,0S32.2,17.6,31.4,18.4z\" />\n\t<path class=\"st1\" d=\"M30.7,19.1L20.8,29l-2.5,0.9c-0.5,0.2-1.1-0.1-1.3-0.6c-0.1-0.2-0.1-0.5,0-0.7l0.9-2.5l9.9-9.9L30.7,19.1z\" />\n</g>\n</symbol>"
});
var result = _create_cozy_app_packages_cozy_scripts_node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "LiWt":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("/kYV");
/* harmony import */ var styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styles__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("i8i4");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("buk/");
/* harmony import */ var components_notes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("Zlyp");
/* harmony import */ var components_IsPublic__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("ZNGu");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* global cozy */







var appLocale;

var renderApp = function renderApp(client, isPublic) {
  var App = __webpack_require__("pL5B").default;

  Object(react_dom__WEBPACK_IMPORTED_MODULE_3__["render"])(react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_4__["I18n"], {
    lang: appLocale,
    dictRequire: function dictRequire(appLocale) {
      return __webpack_require__("/KVF")("./".concat(appLocale));
    }
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_client__WEBPACK_IMPORTED_MODULE_2__["CozyProvider"], {
    client: client
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(components_IsPublic__WEBPACK_IMPORTED_MODULE_6__["default"].Provider, {
    value: isPublic
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(App, {
    isPublic: isPublic
  })))), document.querySelector('[role=application]'));
}; // return a defaultData if the template hasn't been replaced by cozy-stack


var getDataOrDefault = function getDataOrDefault(toTest, defaultData) {
  var templateRegex = /^\{\{\.[a-zA-Z]*\}\}$/; // {{.Example}}

  return templateRegex.test(toTest) ? defaultData : toTest;
};

var getDataset = function getDataset() {
  var root = document.querySelector('[role=application]');
  return root.dataset;
};

var getToken = function getToken(dataset) {
  if (dataset && dataset.cozyToken && dataset.cozyToken.length > 0 && dataset.cozyToken[0] != '{') {
    return {
      isPublic: false,
      token: dataset.cozyToken
    };
  } else {
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

    var _window$location$sear = window.location.search.substring(1).split('&').map(function (varval) {
      return varval.split('=');
    }).reduce(arrToObj, {}),
        sharecode = _window$location$sear.sharecode;

    return {
      isPublic: true,
      token: sharecode
    };
  }
}; // initial rendering of the application


document.addEventListener('DOMContentLoaded', function () {
  var data = getDataset();
  var appIcon = getDataOrDefault(data.cozyIconPath, __webpack_require__("ZAKO"));
  var appNamePrefix = getDataOrDefault(data.cozyAppNamePrefix || __webpack_require__("pZg0").name_prefix, '');
  var appName = getDataOrDefault(data.cozyAppName, __webpack_require__("pZg0").name);
  var appSlug = getDataOrDefault(data.cozyAppSlug, __webpack_require__("pZg0").slug);
  var appVersion = getDataOrDefault(data.cozyAppVersion, __webpack_require__("pZg0").version);
  appLocale = getDataOrDefault(data.cozyLocale, 'en');
  var protocol = window.location ? window.location.protocol : 'https:';

  var _getToken = getToken(data),
      isPublic = _getToken.isPublic,
      token = _getToken.token; // initialize the client to interact with the cozy stack


  var client = new cozy_client__WEBPACK_IMPORTED_MODULE_2___default.a({
    uri: "".concat(protocol, "//").concat(data.cozyDomain),
    token: token,
    schema: components_notes__WEBPACK_IMPORTED_MODULE_5__["schema"],
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
/* harmony import */ var _lib_collab_provider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("DrVd");
/* harmony import */ var _lib_collab_stack_client__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("ereM");
/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("snnE");


function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








var Editor = Object(cozy_client__WEBPACK_IMPORTED_MODULE_2__["withClient"])(function (props) {
  var client = props.client,
      noteId = props.noteId;
  var userName = Object(react__WEBPACK_IMPORTED_MODULE_1__["useMemo"])(function () {
    return props.userName || Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_7__["getShortNameFromClient"])(client);
  }, [props.userName]); // alias for later shortcuts

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
    return new _lib_collab_stack_client__WEBPACK_IMPORTED_MODULE_6__["default"]({
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
      var provider = new _lib_collab_provider__WEBPACK_IMPORTED_MODULE_5__["default"]({
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
      return Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_7__["getParentFolderLink"])(client, doc.file);
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
      defaultTitle: 'Ici votre titre…',
      defaultValue: _objectSpread({}, doc.doc, {
        version: doc.version
      }),
      title: title && title.length > 0 ? title : undefined,
      returnUrl: returnUrl
    });
  }
});
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
/* harmony import */ var _lib_collab_schema__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("hmtS");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("snnE");


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
                    schema: _lib_collab_schema__WEBPACK_IMPORTED_MODULE_5__["schemaOrdered"]
                  }
                }
              });

            case 4:
              _ref2 = _context.sent;
              doc = _ref2.data;

              _this.setState(function () {
                false;
              });

              window.location.href = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_6__["generateReturnUrlToNotesIndex"])(doc);

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
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
        onClick: this.handleClick,
        type: "submit",
        busy: isWorking,
        icon: "plus",
        label: "ajouter une note",
        extension: "narrow"
      }));
    }
  }]);

  return Add;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]); // get mutations from the client to use createDocument


/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_client__WEBPACK_IMPORTED_MODULE_2__["withClient"])(Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["withRouter"])(Add)));

/***/ }),

/***/ "VjyH":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EditorLoading; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("55Ip");
/* harmony import */ var _header_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("+7CB");
/* harmony import */ var cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("V2U0");
/* harmony import */ var cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("KXWi");





function EditorLoading() {
  var left = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
    icon: "back",
    tag: react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"],
    to: "/",
    className: "sto-app-back",
    label: "Retour \xE0 la liste",
    subtle: true
  });
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_header_menu__WEBPACK_IMPORTED_MODULE_2__["default"], {
    left: left
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_3__["default"], {
    size: "xxlarge",
    middle: true
  }));
}

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
/* harmony import */ var cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("V2U0");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("55Ip");
/* harmony import */ var cozy_ui_react_ListItemText__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("vEVt");
/* harmony import */ var cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("KXWi");
/* harmony import */ var cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("y6ex");
/* harmony import */ var cozy_ui_react_Text__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("kyGY");
/* harmony import */ var _add__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("NOZu");
/* harmony import */ var _header_menu_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("+7CB");
/* harmony import */ var _assets_icons_icon_note_32_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("H/IU");











var titleWithDefault = function titleWithDefault() {};

var Item = function Item(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "note-item"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_5__["default"], {
    icon: _assets_icons_icon_note_32_svg__WEBPACK_IMPORTED_MODULE_9__["default"],
    width: 32,
    height: 32,
    className: "note-icon"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
    to: "/n/".concat(props.note.id),
    className: "note-link"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_ListItemText__WEBPACK_IMPORTED_MODULE_3__["default"], {
    primaryText: titleWithDefault(props.note),
    secondaryText: "/Notes/2019/demo"
  })));
};

var Row = function Row(props) {
  var updatedAt = new Date(props.note.cozyMetadata.updatedAt);
  var options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };
  var formatedUpdatedAt = updatedAt.toLocaleDateString(undefined, options);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
    className: "c-table-row"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    className: "c-table-cell c-table-cell--primary"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Item, props)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    className: "c-table-cell"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("time", {
    datatime: props.note.cozyMetadata.updatedAt
  }, formatedUpdatedAt)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    className: "c-table-cell"
  }, "\u2014"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    className: "c-table-cell"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
    theme: "action",
    extension: "narrow",
    icon: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_5__["default"], {
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
    className: "c-table-head"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
    className: "c-table-row-head"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    className: "c-table-header"
  }, "Nom"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    className: "c-table-header"
  }, "Derni\xE8re mise \xE0 jour"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    className: "c-table-header"
  }, "Partages"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    className: "c-table-header"
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, notes.map(function (note) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Row, {
      key: note._id,
      note: note
    });
  })));
};

var ListHeader = function ListHeader() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_header_menu_jsx__WEBPACK_IMPORTED_MODULE_8__["default"], {
    left: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Text__WEBPACK_IMPORTED_MODULE_6__["MainTitle"], {
      tag: "h1"
    }, "Mes notes"),
    right: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_add__WEBPACK_IMPORTED_MODULE_7__["default"], null)
  }));
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
  }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ListHeader, null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(List, {
    notes: data
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (ListHeader);

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

  _createClass(ServiceClient, [{
    key: "resetCallbacks",
    value: function resetCallbacks() {
      this.callbacks = {};
    }
  }, {
    key: "setCallback",
    value: function setCallback(type, id, callback) {
      this.callbacks[type] = this.callbacks[type] || {};
      this.callbacks[type][id] = callback;
    }
  }, {
    key: "getUserId",
    value: function getUserId(sessionId) {
      return sessionId ? sessionId.match(/[^:]+/)[0] : this.userId;
    }
  }, {
    key: "getSessionId",
    value: function getSessionId() {
      return this.sessionId;
    }
  }, {
    key: "close",
    value: function close() {
      this.realtime.unsubscribeAll();
      this.resetCallbacks();
    }
  }, {
    key: "defaultTitle",
    value: function defaultTitle() {
      return new Date().toISOString();
    }
  }, {
    key: "path",
    value: function path(id, sub) {
      return id ? sub ? "/notes/".concat(id, "/").concat(sub) : "/notes/".concat(id) : '/notes';
    }
  }, {
    key: "client2server",
    value: function client2server(data) {
      return _objectSpread({
        sessionID: data.sessionId || this.sessionId
      }, data);
    }
  }, {
    key: "server2client",
    value: function server2client(data) {
      return _objectSpread({
        sessionId: data.sessionID,
        userId: this.getUserId(data.sessionID)
      }, data);
    }
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

/***/ "iccH":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable import/no-webpack-loader-syntax */
__webpack_require__("jGfk");

__webpack_require__("hDUo");

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
/* harmony import */ var _notes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("Zlyp");
/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("snnE");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }












var RoutedEditor = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["withRouter"])(function (props) {
  var returnUrl = Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_11__["getReturnUrl"])();
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_notes__WEBPACK_IMPORTED_MODULE_10__["Editor"], {
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
    component: _notes__WEBPACK_IMPORTED_MODULE_10__["List"]
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
    return Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_11__["getReturnUrl"])();
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
                return Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_11__["getSharedDocument"])(client);

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
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_notes__WEBPACK_IMPORTED_MODULE_10__["Editor"], {
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
  var isPublic = _ref4.isPublic;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["HashRouter"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Layout__WEBPACK_IMPORTED_MODULE_6__["Layout"], {
    monoColumn: true
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Layout__WEBPACK_IMPORTED_MODULE_6__["Main"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Layout__WEBPACK_IMPORTED_MODULE_6__["Content"], {
    className: "app-content"
  }, isPublic ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(PublicContext, null) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(PrivateContext, null))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_7__["Sprite"], null)));
};
/*
  Enable Hot Module Reload using `react-hot-loader` here
  We enable it here since App is the main root component
  No need to use it anywhere else, it sould work for all
  child components
*/


/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(App));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("PMeO")(module)))

/***/ }),

/***/ "pZg0":
/***/ (function(module, exports) {

module.exports = {"name":"Notes","name_prefix":"Cozy","slug":"notes","icon":"icon.svg","categories":[],"version":"1.0.7","licence":"AGPL-3.0","editor":"","source":"https://github.com/cozy/cozy-notes.git@build","developer":{"name":"edas","url":"https://eric.daspet.name/"},"routes":{"/":{"folder":"/","index":"index.html","public":false},"/public":{"folder":"/","index":"index.html","public":true}},"permissions":{"apps":{"description":"Required by the cozy-bar to display the icons of the apps","type":"io.cozy.apps","verbs":["GET"]},"files":{"description":"Notes as files","type":"io.cozy.files"}}}

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

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

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

/***/ })

/******/ });
//# sourceMappingURL=notes.js.map