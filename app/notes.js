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
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
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
    className: "page-header-menu"
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

/***/ "2aiA":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _doctype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("oGRg");

/* harmony default export */ __webpack_exports__["default"] = (function (client) {
  return client.find(_doctype__WEBPACK_IMPORTED_MODULE_0__["default"]).where({}).sortBy({
    'cozyMetadata.updatedAt': 'desc'
  });
});

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "5izo":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logger", function() { return logger; });
var logger = function logger(msg) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var style = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'color:blue;font-weight:bold;';
  // eslint-disable-next-line no-console
  console.log("%cCollab-Edit: ".concat(msg), style);

  if (data) {
    // eslint-disable-next-line no-console
    console.log(data);
  }
};

/***/ }),

/***/ "7dT6":
/***/ (function(module) {

module.exports = {};

/***/ }),

/***/ "BC9o":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getParticipant", function() { return getParticipant; });
var getParticipant = function getParticipant(userId) {
  return {
    userId: userId,
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
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("5izo");


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
   * Get initial document from service
   */


  _createClass(Channel, [{
    key: "getDocument",
    value: function () {
      var _getDocument = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(previousVersion, previousDoc) {
        var docId, _ref, doc, version;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                docId = this.config.docId;
                _context.next = 4;
                return this.service.getDoc(docId, previousVersion, previousDoc);

              case 4:
                _ref = _context.sent;
                doc = _ref.doc;
                version = _ref.version;
                console.log("channel getDoc return value", {
                  doc: doc,
                  version: version
                });
                return _context.abrupt("return", {
                  doc: doc,
                  version: version
                });

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](0);
                Object(_logger__WEBPACK_IMPORTED_MODULE_3__["logger"])("Collab-Edit: Document \"".concat(this.config.docId, "\" does not exist. Creating one locally."));
                return _context.abrupt("return", {
                  doc: {
                    "type": "doc",
                    "content": [{
                      "type": "paragraph"
                    }]
                  },
                  version: 1
                });

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 11]]);
      }));

      return function getDocument(_x, _x2) {
        return _getDocument.apply(this, arguments);
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
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(previousVersion, previousDoc) {
        var _this = this;

        var docId, _ref2, doc, version;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                docId = this.config.docId;
                _context2.next = 3;
                return this.getDocument(previousVersion, previousDoc);

              case 3:
                _ref2 = _context2.sent;
                doc = _ref2.doc;
                version = _ref2.version;
                this.service.join(docId);
                this.service.onStepsCreated(docId, function (data) {
                  Object(_logger__WEBPACK_IMPORTED_MODULE_3__["logger"])('Received FPS-payload', data);

                  _this.emit('data', data);
                });
                this.service.onTelepointerUpdated(docId, function (payload) {
                  Object(_logger__WEBPACK_IMPORTED_MODULE_3__["logger"])('Received telepointer-payload', {
                    payload: payload
                  });

                  _this.emit('telepointer', payload);
                });
                this.eventEmitter.emit('connected', {
                  doc: doc,
                  version: version
                });

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function connect(_x3, _x4) {
        return _connect.apply(this, arguments);
      };
    }()
  }, {
    key: "debounce",
    value: function debounce(getState) {
      var _this2 = this;

      Object(_logger__WEBPACK_IMPORTED_MODULE_3__["logger"])("Debouncing steps");

      if (this.debounced) {
        clearTimeout(this.debounced);
      }

      this.debounced = window.setTimeout(function () {
        Object(_logger__WEBPACK_IMPORTED_MODULE_3__["logger"])("Sending debounced");

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
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(state, getState, localSteps) {
        var docId, version, _ref3, steps, response;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                docId = this.config.docId;

                if (!this.isSending) {
                  _context3.next = 4;
                  break;
                }

                this.debounce(getState);
                return _context3.abrupt("return");

              case 4:
                version = Object(prosemirror_collab__WEBPACK_IMPORTED_MODULE_2__["getVersion"])(state); // Don't send any steps before we're ready.

                if (!(_typeof(version) === undefined)) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt("return");

              case 7:
                _ref3 = localSteps || Object(prosemirror_collab__WEBPACK_IMPORTED_MODULE_2__["sendableSteps"])(state) || {
                  steps: [] // sendableSteps can return null..

                }, steps = _ref3.steps;

                if (!(steps.length === 0)) {
                  _context3.next = 11;
                  break;
                }

                Object(_logger__WEBPACK_IMPORTED_MODULE_3__["logger"])("No steps to send. Aborting.");
                return _context3.abrupt("return");

              case 11:
                this.isSending = true;
                _context3.prev = 12;
                this.isSending = false;
                _context3.next = 16;
                return this.service.pushSteps(docId, version, steps);

              case 16:
                response = _context3.sent;
                Object(_logger__WEBPACK_IMPORTED_MODULE_3__["logger"])("Steps sent and accepted by service.");
                this.emit('data', response);
                _context3.next = 26;
                break;

              case 21:
                _context3.prev = 21;
                _context3.t0 = _context3["catch"](12);
                this.debounce(getState);
                this.isSending = false;
                Object(_logger__WEBPACK_IMPORTED_MODULE_3__["logger"])("Error sending steps: \"".concat(_context3.t0, "\""));

              case 26:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[12, 21]]);
      }));

      return function sendSteps(_x5, _x6, _x7) {
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

      return function getSteps(_x8) {
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
                Object(_logger__WEBPACK_IMPORTED_MODULE_3__["logger"])("Sending telepointer", data);
                _context5.next = 4;
                return this.service.pushTelepointer(docId, data);

              case 4:
                return _context5.abrupt("return", _context5.sent);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function sendTelepointer(_x9) {
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
/* harmony import */ var _atlaskit_editor_json_transformer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("4p0z");
/* harmony import */ var _channel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("D2GK");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("5izo");
/* harmony import */ var _participant__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("BC9o");


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

    _defineProperty(this, "processRemoteData", function (data, forceApply) {
      if (_this.pauseQueue && !forceApply) {
        Object(_logger__WEBPACK_IMPORTED_MODULE_5__["logger"])("Queue is paused. Aborting.");
        return;
      }

      var version = data.version,
          steps = data.steps;
      Object(_logger__WEBPACK_IMPORTED_MODULE_5__["logger"])("Processing data. Version: ".concat(version));

      if (steps && steps.length) {
        console.log("applying steps", steps);
        var userIds = steps.map(function (step) {
          return step.userId || step.sessionId;
        });

        _this.emit('data', {
          json: steps,
          version: version,
          userIds: userIds
        });
      }

      _this.processQeueue();
    });

    _defineProperty(this, "onReceiveData", function (data, forceApply) {
      var currentVersion = Object(prosemirror_collab__WEBPACK_IMPORTED_MODULE_2__["getVersion"])(_this.getState());
      var expectedVersion = currentVersion + data.steps.length;

      if (data.version === currentVersion) {
        Object(_logger__WEBPACK_IMPORTED_MODULE_5__["logger"])("Received data we already have. Ignoring.");
      } else if (data.version === expectedVersion) {
        _this.processRemoteData(data, forceApply);
      } else if (data.version > expectedVersion) {
        Object(_logger__WEBPACK_IMPORTED_MODULE_5__["logger"])("Version too high. Expected ".concat(expectedVersion, " but got ").concat(data.version, ". Current local version is ").concat(currentVersion));

        _this.queueData(data);
      }
    });

    _defineProperty(this, "onReceiveTelepointer", function (data) {
      var sessionId = data.sessionId;

      if (sessionId === _this.config.userId) {
        return;
      }

      var participant = _this.participants.get(sessionId);

      if (participant && participant.lastActive > data.timestamp) {
        Object(_logger__WEBPACK_IMPORTED_MODULE_5__["logger"])("Old telepointer event. Ignoring.");
        return;
      }

      _this.updateParticipant(sessionId, data.timestamp);

      Object(_logger__WEBPACK_IMPORTED_MODULE_5__["logger"])("Remote telepointer from ".concat(sessionId));

      _this.emit('telepointer', data);
    });

    this.config = config;
    this.channel = config.channel || new _channel__WEBPACK_IMPORTED_MODULE_4__["Channel"](config, serviceClient);
    this.eventEmitter = new eventemitter2__WEBPACK_IMPORTED_MODULE_1__["EventEmitter2"]();
    this.queue = [];

    this.getState = function () {};

    this.participants = new Map();
    this.pauseQueue = false;
  }

  _createClass(CollabProvider, [{
    key: "initialize",
    value: function initialize(getState) {
      var _this2 = this;

      this.getState = getState;
      this.channel.on('connected', function (_ref) {
        var doc = _ref.doc,
            version = _ref.version;
        var userId = _this2.config.userId;
        Object(_logger__WEBPACK_IMPORTED_MODULE_5__["logger"])("Joined collab-session. The document version is ".concat(version));

        _this2.emit('init', {
          sid: userId,
          doc: doc,
          version: version
        }); // Set initial document


        _this2.emit('connected', {
          sid: userId
        }); // Let the plugin know that we're connected an ready to go

      });
      this.channel.on('data', this.onReceiveData);
      this.channel.on('telepointer', this.onReceiveTelepointer);
      var state = getState();
      console.log(state);
      var doc = jsonTransformer.encode(state.doc);
      var version = doc.version;
      this.channel.connect(version, doc);
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
      var _this3 = this;

      Object(_logger__WEBPACK_IMPORTED_MODULE_5__["logger"])("Queuing data for version ".concat(data.version));
      var orderedQueue = [].concat(_toConsumableArray(this.queue), [data]).sort(function (a, b) {
        return a.version > b.version ? 1 : -1;
      });
      this.queue = orderedQueue;

      if (!this.queueTimeout && !this.pauseQueue) {
        this.queueTimeout = window.setTimeout(function () {
          _this3.catchup();
        }, 1000);
      }
    }
  }, {
    key: "catchup",
    value: function () {
      var _catchup = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var currentVersion, _ref2, doc, version, steps, userId, _ref3, _ref3$steps, localSteps;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.pauseQueue = true;
                Object(_logger__WEBPACK_IMPORTED_MODULE_5__["logger"])("Too far behind - fetching data from service");
                currentVersion = Object(prosemirror_collab__WEBPACK_IMPORTED_MODULE_2__["getVersion"])(this.getState());
                _context.prev = 3;
                _context.next = 6;
                return this.channel.getSteps(currentVersion);

              case 6:
                _ref2 = _context.sent;
                doc = _ref2.doc;
                version = _ref2.version;
                steps = _ref2.steps;

                /**
                 * Remove steps from queue where the version is older than
                 * the version we received from service. Keep steps that might be
                 * newer.
                 */
                this.queue = this.queue.filter(function (data) {
                  return data.version > version;
                }); // We are too far behind - replace the entire document

                if (doc) {
                  Object(_logger__WEBPACK_IMPORTED_MODULE_5__["logger"])("Replacing document.");
                  userId = this.config.userId;
                  _ref3 = Object(prosemirror_collab__WEBPACK_IMPORTED_MODULE_2__["sendableSteps"])(this.getState()) || {}, _ref3$steps = _ref3.steps, localSteps = _ref3$steps === void 0 ? [] : _ref3$steps; // Replace local document and version number

                  this.emit('init', {
                    sid: userId,
                    doc: doc,
                    version: version
                  }); // Re-aply local steps

                  if (localSteps.length) {
                    console.log("apply local steps", localSteps);
                    this.emit('local-steps', {
                      steps: localSteps
                    });
                  }

                  clearTimeout(this.queueTimeout);
                  this.pauseQueue = false;
                  this.queueTimeout = undefined;
                } else if (steps) {
                  Object(_logger__WEBPACK_IMPORTED_MODULE_5__["logger"])("Applying the new steps. Version: ".concat(version), steps);
                  this.onReceiveData({
                    steps: steps,
                    version: version
                  }, true);
                  clearTimeout(this.queueTimeout);
                  this.pauseQueue = false;
                  this.queueTimeout = undefined;
                }

                _context.next = 17;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](3);
                Object(_logger__WEBPACK_IMPORTED_MODULE_5__["logger"])("Unable to get latest steps: ".concat(_context.t0));

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 14]]);
      }));

      return function catchup() {
        return _catchup.apply(this, arguments);
      };
    }()
  }, {
    key: "processQeueue",
    value: function processQeueue() {
      if (this.pauseQueue) {
        Object(_logger__WEBPACK_IMPORTED_MODULE_5__["logger"])("Queue is paused. Aborting.");
        return;
      }

      Object(_logger__WEBPACK_IMPORTED_MODULE_5__["logger"])("Looking for proccessable data");

      if (this.queue.length === 0) {
        return;
      }

      var _this$queue = _slicedToArray(this.queue, 1),
          firstItem = _this$queue[0];

      var currentVersion = Object(prosemirror_collab__WEBPACK_IMPORTED_MODULE_2__["getVersion"])(this.getState());
      console.log("process queue currentVersion", currentVersion);
      var expectedVersion = currentVersion + firstItem.steps.length;

      if (firstItem.version === expectedVersion) {
        Object(_logger__WEBPACK_IMPORTED_MODULE_5__["logger"])("Applying data from queue!");
        this.queue.splice(0, 1);
        this.processRemoteData(firstItem);
      }
    }
  }, {
    key: "updateParticipant",
    value: function updateParticipant(userId, timestamp) {
      var _this4 = this;

      // TODO: Make batch-request to backend to resolve participants
      var _getParticipant = Object(_participant__WEBPACK_IMPORTED_MODULE_6__["getParticipant"])(userId),
          _getParticipant$name = _getParticipant.name,
          name = _getParticipant$name === void 0 ? '' : _getParticipant$name,
          _getParticipant$email = _getParticipant.email,
          email = _getParticipant$email === void 0 ? '' : _getParticipant$email,
          _getParticipant$avata = _getParticipant.avatar,
          avatar = _getParticipant$avata === void 0 ? '' : _getParticipant$avata;

      this.participants.set(userId, {
        name: name,
        email: email,
        avatar: avatar,
        sessionId: userId,
        lastActive: timestamp
      });
      var joined = [this.participants.get(userId)]; // Filter out participants that's been inactive for
      // more than 5 minutes.

      var now = new Date().getTime();
      var left = Array.from(this.participants.values()).filter(function (p) {
        return (now - p.lastActive) / 1000 > 300;
      });
      left.forEach(function (p) {
        return _this4.participants.delete(p.sessionId);
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
  }]);

  return CollabProvider;
}();
/* harmony default export */ __webpack_exports__["default"] = (CollabProvider);

/***/ }),

/***/ "KmRV":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _doctype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("oGRg");

/* harmony default export */ __webpack_exports__["default"] = ({
  notes: {
    doctype: _doctype__WEBPACK_IMPORTED_MODULE_0__["default"],
    doctypeVersion: 1,
    attributes: {},
    relationships: {}
  }
});

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
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("XOpu");
/* harmony import */ var components_notes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("Zlyp");
/* global cozy */






var appLocale;

var renderApp = function renderApp(client) {
  var App = __webpack_require__("pL5B").default;

  Object(react_dom__WEBPACK_IMPORTED_MODULE_3__["render"])(react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_4__["I18n"], {
    lang: appLocale,
    dictRequire: function dictRequire(appLocale) {
      return __webpack_require__("/KVF")("./".concat(appLocale));
    }
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_client__WEBPACK_IMPORTED_MODULE_2__["CozyProvider"], {
    client: client
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(App, null))), document.querySelector('[role=application]'));
}; // return a defaultData if the template hasn't been replaced by cozy-stack


var getDataOrDefault = function getDataOrDefault(toTest, defaultData) {
  var templateRegex = /^\{\{\.[a-zA-Z]*\}\}$/; // {{.Example}}

  return templateRegex.test(toTest) ? defaultData : toTest;
}; // initial rendering of the application


document.addEventListener('DOMContentLoaded', function () {
  var root = document.querySelector('[role=application]');
  var data = root.dataset;
  var appIcon = getDataOrDefault(data.cozyIconPath, __webpack_require__("ZAKO"));
  var appNamePrefix = getDataOrDefault(data.cozyAppNamePrefix || __webpack_require__("pZg0").name_prefix, '');
  var appName = getDataOrDefault(data.cozyAppName, __webpack_require__("pZg0").name);
  var appSlug = getDataOrDefault(data.cozyAppSlug, __webpack_require__("pZg0").slug);
  var appVersion = getDataOrDefault(data.cozyAppVersion, __webpack_require__("pZg0").version);
  appLocale = getDataOrDefault(data.cozyLocale, 'en');
  var protocol = window.location ? window.location.protocol : 'https:'; // initialize the client to interact with the cozy stack

  var client = new cozy_client__WEBPACK_IMPORTED_MODULE_2___default.a({
    uri: "".concat(protocol, "//").concat(data.cozyDomain),
    token: data.cozyToken,
    schema: components_notes__WEBPACK_IMPORTED_MODULE_5__["schema"],
    appMetadata: {
      slug: appSlug,
      version: appVersion
    }
  }); // initialize the bar, common of all applications, it allows
  // platform features like apps navigation without doing anything

  cozy.bar.init({
    appName: appName,
    appNamePrefix: appNamePrefix,
    iconPath: appIcon,
    lang: appLocale,
    replaceTitleOnMobile: true
  });
  renderApp(client);
});

/***/ }),

/***/ "Lpk5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
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
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












 //import { collabEditProvider } from './collab_provider'





var jsonTransformer = new _atlaskit_editor_json_transformer__WEBPACK_IMPORTED_MODULE_2__["JSONTransformer"]();
var withCollab = true;
var collabUrl = 'https://poc-collab.cozycloud.cc/';
var allowPublicCollab = true;

var Form = function Form(props) {
  var readOnlyTitle = props.readOnlyTitle,
      autoSave = props.autoSave; // first note received in the props, to avoid useless changes in defaultValue

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
  var docId = props.note._id;
  var collabProvider = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    return {
      useNativePlugin: true,
      provider: Promise.resolve(new _lib_collab_provider__WEBPACK_IMPORTED_MODULE_11__["default"]({
        docId: docId,
        userId: userId,
        sessionId: sessionId
      }, new _lib_collab_client__WEBPACK_IMPORTED_MODULE_12__["default"]({
        url: collabUrl,
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
  }, [props.note._rev]); // we do note use the state in our callbacks to
  // avoid a capture of an old {note} variable

  var currentNote = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])({
    title: props.note.title,
    content: props.note.content
  }); // do not save more often than 5000ms
  // it will generate conflict with _rev of couchdb
  // and will overload couch database with useless versions

  var save = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    return lodash_debounce__WEBPACK_IMPORTED_MODULE_4___default()(function () {
      return props.saveDocument(_objectSpread({}, serverNote.current, currentNote.current));
    }, 5000, {
      leading: true,
      trailing: true
    });
  }, [props.note._id]); // always save immediatly when leaving the editor

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    return function () {
      return save.flush();
    };
  }, [props.note._id]); // fix callbacks

  var onTitleChange = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (e) {
    var newTitle = e.target.value;
    var title = newTitle && newTitle.trim().length > 0 ? newTitle : null;

    if (title != currentNote.current.title) {
      console.log("save title", title, "with content", currentNote.current.content);
      currentNote.current = _objectSpread({}, currentNote.current, {
        title: title
      });
      window.setTimeout(function () {
        return save();
      });
    }
  }, [props.note._id]);
  var onContentChange = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (editorView) {
    console.log(editorView.state);
    var content = JSON.stringify(jsonTransformer.encode(editorView.state.doc), null, 2);

    if (content != currentNote.current.content) {
      console.log("save content", content, "with title", currentNote.current.title);
      currentNote.current = _objectSpread({}, currentNote.current, {
        content: content
      });
      window.setTimeout(function () {
        return save();
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

/* harmony default export */ __webpack_exports__["default"] = (function (_ref) {
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
});

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
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("eO8H");
/* harmony import */ var cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("VPDz");
/* harmony import */ var _doctype__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("oGRg");


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
      var createDocument, _ref2, doc;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.setState(function () {
                true;
              });

              createDocument = _this.props.createDocument;
              _context.next = 4;
              return createDocument(_doctype__WEBPACK_IMPORTED_MODULE_5__["default"], {});

            case 4:
              _ref2 = _context.sent;
              doc = _ref2.data;

              _this.setState(function () {
                false;
              });

              _this.props.history.push("/n/".concat(doc.id));

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
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
        onClick: this.handleClick,
        type: "submit",
        busy: isWorking,
        label: "ajouter une note",
        size: "large",
        extension: "narrow"
      });
    }
  }]);

  return Add;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]); // get mutations from the client to use createDocument


/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_client__WEBPACK_IMPORTED_MODULE_2__["withMutations"])()(Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["withRouter"])(Add)));

/***/ }),

/***/ "YuDY":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultTitle", function() { return defaultTitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "titleWithDefault", function() { return titleWithDefault; });
var defaultTitle = function defaultTitle(note) {
  var createdAt = note && note.cozyMetadata && note.cozyMetadata.createdAt;
  return createdAt ? "Note sans titre du ".concat(new Date(createdAt).toLocaleString()) : null;
};
var titleWithDefault = function titleWithDefault(note) {
  var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultTitle;
  return note.title || (fallback instanceof Function ? fallback(note) : fallback);
};
/* harmony default export */ __webpack_exports__["default"] = ({
  defaultTitle: defaultTitle,
  titleWithDefault: titleWithDefault
});

/***/ }),

/***/ "ZAKO":
/***/ (function(module, exports) {

module.exports = "/img/icon.svg";

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

/* harmony import */ var _doctype__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("oGRg");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "doctype", function() { return _doctype__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("2aiA");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "query", function() { return _query__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _schema__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("KmRV");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schema", function() { return _schema__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("YuDY");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultTitle", function() { return _utils__WEBPACK_IMPORTED_MODULE_6__["defaultTitle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "titleWithDefault", function() { return _utils__WEBPACK_IMPORTED_MODULE_6__["titleWithDefault"]; });







 //



/***/ }),

/***/ "c+Po":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("zGKU");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("eO8H");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var cozy_ui_react_ListItemText__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("oT9l");
/* harmony import */ var _add__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("NOZu");
/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("2aiA");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("YuDY");
/* harmony import */ var _header_menu_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("+7CB");










var Item = function Item(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
    to: "/n/".concat(props.note.id)
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_ListItemText__WEBPACK_IMPORTED_MODULE_4__["default"], {
    primaryText: Object(_utils__WEBPACK_IMPORTED_MODULE_7__["titleWithDefault"])(props.note)
  })));
};

var List = function List(props) {
  var notes = props.notes;
  return !notes || !notes.length ? null : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    type: "none"
  }, notes.map(function (note) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Item, {
      key: note._id,
      note: note
    });
  }));
};

var ConnectedList = function ConnectedList(props) {
  var _props$notes = props.notes,
      data = _props$notes.data,
      fetchStatus = _props$notes.fetchStatus; // cozy-client statuses

  var isLoading = fetchStatus === 'loading' || fetchStatus === 'pending';
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "notes"
  }, isLoading ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_1__["default"], {
    size: "xxlarge",
    middle: true
  }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_header_menu_jsx__WEBPACK_IMPORTED_MODULE_8__["default"], {
    right: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_add__WEBPACK_IMPORTED_MODULE_5__["default"], null)
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(List, {
    notes: data
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_client__WEBPACK_IMPORTED_MODULE_3__["queryConnect"])({
  notes: {
    query: _query__WEBPACK_IMPORTED_MODULE_6__["default"],
    as: 'notes'
  }
})(ConnectedList));

/***/ }),

/***/ "fHK9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceClient", function() { return ServiceClient; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("gFX4");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_1__);


function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var ServiceClient =
/*#__PURE__*/
function () {
  function ServiceClient(config) {
    _classCallCheck(this, ServiceClient);

    var url = config.url,
        sessionId = config.sessionId;
    console.log("construct service Client with", config);
    console.log("init config with client ".concat(sessionId));
    this.sessionId = sessionId;
    this.socket = socket_io_client__WEBPACK_IMPORTED_MODULE_1___default.a.connect(url);
  }

  _createClass(ServiceClient, [{
    key: "join",
    value: function () {
      var _join = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(docId) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.socket.emit('join', this.sessionId, docId);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function join(_x) {
        return _join.apply(this, arguments);
      };
    }()
  }, {
    key: "onStepsCreated",
    value: function () {
      var _onStepsCreated = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(docId, callback) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.socket.on("steps:created:".concat(docId), function (data) {
                  return callback(data);
                });

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function onStepsCreated(_x2, _x3) {
        return _onStepsCreated.apply(this, arguments);
      };
    }()
  }, {
    key: "onTelepointerUpdated",
    value: function () {
      var _onTelepointerUpdated = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(docId, callback) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.socket.on("telepointer:updated:".concat(docId), function (data) {
                  return callback(data);
                });

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function onTelepointerUpdated(_x4, _x5) {
        return _onTelepointerUpdated.apply(this, arguments);
      };
    }()
  }, {
    key: "getDoc",
    value: function () {
      var _getDoc = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(docId, version, doc) {
        var _this = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", new Promise(function (resolve) {
                  _this.socket.emit('doc:get', _this.sessionId, docId, 1, doc, function (data) {
                    return resolve(_objectSpread({}, data, {
                      docId: docId
                    }));
                  });
                }));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function getDoc(_x6, _x7, _x8) {
        return _getDoc.apply(this, arguments);
      };
    }()
  }, {
    key: "getSteps",
    value: function () {
      var _getSteps = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5(docId, version) {
        var _this2 = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", new Promise(function (resolve) {
                  _this2.socket.emit('steps:get', _this2.sessionId, docId, version, function (data) {
                    return resolve(_objectSpread({}, data, {
                      docId: docId
                    }));
                  });
                }));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function getSteps(_x9, _x10) {
        return _getSteps.apply(this, arguments);
      };
    }()
  }, {
    key: "pushSteps",
    value: function () {
      var _pushSteps = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee6(docId, version, steps) {
        var _this3 = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", new Promise(function (resolve, reject) {
                  _this3.socket.emit('steps:push', _this3.sessionId, docId, version, steps, function (data) {
                    if (data) {
                      resolve(_objectSpread({}, data, {
                        docId: docId
                      }));
                    } else {
                      reject('Probable conflict');
                    }
                  });
                }));

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function pushSteps(_x11, _x12, _x13) {
        return _pushSteps.apply(this, arguments);
      };
    }()
  }, {
    key: "pushTelepointer",
    value: function () {
      var _pushTelepointer = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee7(docId, data) {
        var _this4 = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.abrupt("return", new Promise(function (resolve) {
                  _this4.socket.emit('telepointer:push', _this4.sessionId, docId, data, function (data) {
                    return resolve(_objectSpread({}, data, {
                      docId: docId
                    }));
                  });
                }));

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function pushTelepointer(_x14, _x15) {
        return _pushTelepointer.apply(this, arguments);
      };
    }()
  }]);

  return ServiceClient;
}();
/* harmony default export */ __webpack_exports__["default"] = (ServiceClient);

/***/ }),

/***/ "lu5+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var editorConfig = {
  allowTables: true,
  allowRule: true,
  allowLists: true
};
/* harmony default export */ __webpack_exports__["default"] = (editorConfig);

/***/ }),

/***/ "nY3O":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./_lib/build_formatting_tokens_reg_exp/index": "kOWh",
	"./ar/build_distance_in_words_locale/index": "XxX6",
	"./ar/build_format_locale/index": "alis",
	"./ar/index": "EDRf",
	"./be/build_distance_in_words_locale/index": "LQ09",
	"./be/build_format_locale/index": "kj7F",
	"./be/index": "YEhR",
	"./bg/build_distance_in_words_locale/index": "7K3h",
	"./bg/build_format_locale/index": "RrdL",
	"./bg/index": "isx8",
	"./ca/build_distance_in_words_locale/index": "wqqj",
	"./ca/build_format_locale/index": "qcV0",
	"./ca/index": "Vwa+",
	"./cs/build_distance_in_words_locale/index": "ZKDM",
	"./cs/build_format_locale/index": "ipyF",
	"./cs/index": "dvhP",
	"./da/build_distance_in_words_locale/index": "2Mgc",
	"./da/build_format_locale/index": "Gned",
	"./da/index": "7ur/",
	"./de/build_distance_in_words_locale/index": "5IWf",
	"./de/build_format_locale/index": "THCn",
	"./de/index": "bgw5",
	"./el/build_distance_in_words_locale/index": "o/GB",
	"./el/build_format_locale/index": "8T9h",
	"./el/index": "dH0v",
	"./en/build_distance_in_words_locale/index": "LZbM",
	"./en/build_format_locale/index": "6DAA",
	"./en/index": "Us+F",
	"./eo/build_distance_in_words_locale/index": "qrnn",
	"./eo/build_format_locale/index": "Bl15",
	"./eo/index": "UB7v",
	"./es/build_distance_in_words_locale/index": "GEfZ",
	"./es/build_format_locale/index": "O+zC",
	"./es/index": "/S0t",
	"./fi/build_distance_in_words_locale/index": "VHtQ",
	"./fi/build_format_locale/index": "Oydx",
	"./fi/index": "ndVD",
	"./fil/build_distance_in_words_locale/index": "uq4p",
	"./fil/build_format_locale/index": "d7hw",
	"./fil/index": "pNfm",
	"./fr/build_distance_in_words_locale/index": "IzMR",
	"./fr/build_format_locale/index": "I3Zg",
	"./fr/index": "LKA2",
	"./hr/build_distance_in_words_locale/index": "DPvn",
	"./hr/build_format_locale/index": "puw3",
	"./hr/index": "L9Jq",
	"./hu/build_distance_in_words_locale/index": "w2RQ",
	"./hu/build_format_locale/index": "/0iD",
	"./hu/index": "Nm+E",
	"./id/build_distance_in_words_locale/index": "JbvB",
	"./id/build_format_locale/index": "0wlw",
	"./id/index": "A6C3",
	"./is/build_distance_in_words_locale/index": "qzMC",
	"./is/build_format_locale/index": "S3yD",
	"./is/index": "N4bE",
	"./it/build_distance_in_words_locale/index": "MDEp",
	"./it/build_format_locale/index": "aUJd",
	"./it/index": "hmb4",
	"./ja/build_distance_in_words_locale/index": "nNvt",
	"./ja/build_format_locale/index": "buui",
	"./ja/index": "uAXs",
	"./ko/build_distance_in_words_locale/index": "oEw+",
	"./ko/build_format_locale/index": "9SQf",
	"./ko/index": "iW8+",
	"./mk/build_distance_in_words_locale/index": "nmwZ",
	"./mk/build_format_locale/index": "htxJ",
	"./mk/index": "GzBU",
	"./nb/build_distance_in_words_locale/index": "SL1f",
	"./nb/build_format_locale/index": "CJ5F",
	"./nb/index": "73vv",
	"./nl/build_distance_in_words_locale/index": "Uyu0",
	"./nl/build_format_locale/index": "doCD",
	"./nl/index": "hCQt",
	"./pl/build_distance_in_words_locale/index": "FUBD",
	"./pl/build_format_locale/index": "nOYf",
	"./pl/index": "B6yL",
	"./pt/build_distance_in_words_locale/index": "aTPA",
	"./pt/build_format_locale/index": "TTT0",
	"./pt/index": "gdks",
	"./ro/build_distance_in_words_locale/index": "gI+A",
	"./ro/build_format_locale/index": "njjO",
	"./ro/index": "r2yp",
	"./ru/build_distance_in_words_locale/index": "KmPx",
	"./ru/build_format_locale/index": "UUBw",
	"./ru/index": "nz/o",
	"./sk/build_distance_in_words_locale/index": "q2Bs",
	"./sk/build_format_locale/index": "9sxn",
	"./sk/index": "Wqan",
	"./sl/build_distance_in_words_locale/index": "mlv2",
	"./sl/build_format_locale/index": "vHkZ",
	"./sl/index": "KYSo",
	"./sr/build_distance_in_words_locale/index": "LlkS",
	"./sr/build_format_locale/index": "RhjJ",
	"./sr/index": "7mU3",
	"./sv/build_distance_in_words_locale/index": "UNBN",
	"./sv/build_format_locale/index": "zTNB",
	"./sv/index": "hxgj",
	"./th/build_distance_in_words_locale/index": "XAGa",
	"./th/build_format_locale/index": "We2s",
	"./th/index": "Pk+z",
	"./tr/build_distance_in_words_locale/index": "aFZF",
	"./tr/build_format_locale/index": "jh7A",
	"./tr/index": "3ZWG",
	"./zh_cn/build_distance_in_words_locale/index": "KdB7",
	"./zh_cn/build_format_locale/index": "l4EP",
	"./zh_cn/index": "8tMq",
	"./zh_tw/build_distance_in_words_locale/index": "vyyr",
	"./zh_tw/build_format_locale/index": "uYH7",
	"./zh_tw/index": "QPlQ"
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
webpackContext.id = "nY3O";

/***/ }),

/***/ "oGRg":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ('io.cozy.notes');

/***/ }),

/***/ "pL5B":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("0cfB");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("eO8H");
/* harmony import */ var cozy_ui_react_Layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("e2oC");
/* harmony import */ var cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("B7OX");
/* harmony import */ var _notes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("Zlyp");







var App = function App() {
  return (//
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["HashRouter"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Layout__WEBPACK_IMPORTED_MODULE_3__["Layout"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Layout__WEBPACK_IMPORTED_MODULE_3__["Main"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Layout__WEBPACK_IMPORTED_MODULE_3__["Content"], {
      className: "app-content"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Switch"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
      path: "/n/:id",
      component: _notes__WEBPACK_IMPORTED_MODULE_5__["Editor"]
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
      path: "/",
      component: _notes__WEBPACK_IMPORTED_MODULE_5__["List"]
    })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_4__["Sprite"], null)))
  );
};
/*
  Enable Hot Module Reload using `react-hot-loader` here
  We enable it here since App is the main root component
  No need to use it anywhere else, it sould work for all
  child components
*/


/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__["hot"])(module)(App));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3UD+")(module)))

/***/ }),

/***/ "pZg0":
/***/ (function(module, exports) {

module.exports = {"name":"Cozy Notes","slug":"notes","icon":"icon-notes.svg","categories":[],"version":"1.0.1","licence":"AGPL-3.0","editor":"","source":"https://github.com/cozy/cozy-notes.git@build","developer":{"name":"edas","url":"https://eric.daspet.name/"},"routes":{"/":{"folder":"/","index":"index.html","public":false}},"permissions":{"apps":{"description":"Required by the cozy-bar to display the icons of the apps","type":"io.cozy.apps","verbs":["GET"]},"notes":{"description":"Notes","type":"io.cozy.notes"}}}

/***/ })

/******/ });
//# sourceMappingURL=notes.js.map