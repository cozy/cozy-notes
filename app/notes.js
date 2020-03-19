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

/***/ "/RjM":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useDebugValue", function() { return useDebugValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useFlagSwitcher", function() { return useFlagSwitcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDebugValue", function() { return setDebugValue; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var cozy_flags__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("kdbL");
/* harmony import */ var cozy_flags__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cozy_flags__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_set__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("D1y2");
/* harmony import */ var lodash_set__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_set__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("mwIZ");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var prosemirror_collab__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("O1Kf");
/* harmony import */ var prosemirror_collab__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prosemirror_collab__WEBPACK_IMPORTED_MODULE_6__);








/**
 * Sets a value in a global debug object
 *
 * If the corresponding 'debug.{name}' flag is activated
 * then you'll find the value in 'window.cozy.debug.{name}'
 *
 * @param {string} name
 * @param {object} value
 */

function useDebugValue(name, value) {
  var activated = Object(cozy_flags__WEBPACK_IMPORTED_MODULE_3__["useFlag"])("debug.".concat(name));
  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    if (activated) setDebugValue(name, value);
  }, [activated, name, value]);
}
/**
 * Returns a React component that will show
 * the flag switcher from cozy-flags
 * when the flag 'swicher' is activated
 */

function useFlagSwitcher() {
  Object(cozy_flags__WEBPACK_IMPORTED_MODULE_3__["useFlag"])('switcher');
  return cozy_flags__WEBPACK_IMPORTED_MODULE_3__["FlagSwitcher"];
}
function setDebugValue(name, value) {
  lodash_set__WEBPACK_IMPORTED_MODULE_4___default()(window, "cozy.debug.".concat(name), value);
} // Sets a global 'window.cozy.debug.showSwitcher()'
// that will activate the cozy-flag switcher

lodash_set__WEBPACK_IMPORTED_MODULE_4___default()(window, "cozy.debug.showSwitcher", function () {
  return cozy_flags__WEBPACK_IMPORTED_MODULE_3___default()('switcher', true);
});
lodash_set__WEBPACK_IMPORTED_MODULE_4___default()(window, 'cozy.debug.notes.debugCollab',
/*#__PURE__*/
function () {
  var _debugCollab = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // activate all needed flags
            cozy_flags__WEBPACK_IMPORTED_MODULE_3___default()('debug.client', true);
            cozy_flags__WEBPACK_IMPORTED_MODULE_3___default()('debug.notes.service', true);
            cozy_flags__WEBPACK_IMPORTED_MODULE_3___default()('debug.notes.collabProvider', true);
            cozy_flags__WEBPACK_IMPORTED_MODULE_3___default()('debug.notes.channel', true);
            cozy_flags__WEBPACK_IMPORTED_MODULE_3___default()('debug.notes.noteId', true);
            cozy_flags__WEBPACK_IMPORTED_MODULE_3___default()('debug.notes.doc', true);
            cozy_flags__WEBPACK_IMPORTED_MODULE_3___default()('debug.notes.file', true);
            cozy_flags__WEBPACK_IMPORTED_MODULE_3___default()('debug.notes.returnUrl', true);
            cozy_flags__WEBPACK_IMPORTED_MODULE_3___default()('debug.notes.dirtyRef', true);
            cozy_flags__WEBPACK_IMPORTED_MODULE_3___default()('debug.notes.lastPatchError', true); // then wait and trigger the collab  debug

            _context3.next = 12;
            return new Promise(function (resolve) {
              window.setTimeout(
              /*#__PURE__*/
              _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
              /*#__PURE__*/
              _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
                var collabProvider, channel, data, state, version, _ref2, steps, backoff, failures, isDirty, isSending, hasQueue, queued, queuedState, queuedVersion, queuedSteps, dirtySince, lastRemoteSync, lastLocalSave, serviceClient, realtime, websocket, retryManager, client, error, msg;

                return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        collabProvider = lodash_get__WEBPACK_IMPORTED_MODULE_5___default()(window, 'cozy.debug.notes.collabProvider');
                        channel = lodash_get__WEBPACK_IMPORTED_MODULE_5___default()(window, 'cozy.debug.notes.channel');
                        data = {
                          date: new Date().toISOString()
                        };
                        data.noteId = lodash_get__WEBPACK_IMPORTED_MODULE_5___default()(window, 'cozy.debug.notes.noteId');
                        data.initialVersion = lodash_get__WEBPACK_IMPORTED_MODULE_5___default()(window, 'cozy.debug.notes.initialVersion');
                        data.returnUrl = lodash_get__WEBPACK_IMPORTED_MODULE_5___default()(window, 'cozy.debug.notes.returnUrl');
                        state = collabProvider && collabProvider.getState();
                        version = collabProvider && state && Object(prosemirror_collab__WEBPACK_IMPORTED_MODULE_6__["getVersion"])(state);
                        _ref2 = state && Object(prosemirror_collab__WEBPACK_IMPORTED_MODULE_6__["sendableSteps"])(state) || {
                          steps: []
                        }, steps = _ref2.steps;
                        data.state = {
                          version: version,
                          steps: steps,
                          length: steps && steps.length
                        };
                        backoff = channel && channel.backoff;
                        failures = channel && channel.failures;
                        isDirty = channel && channel.isDirty();
                        isSending = channel && channel.isSending;
                        hasQueue = channel && channel.hasQueuedSteps();
                        queued = channel && channel.queuedStep;
                        queuedState = queued && queued.state;
                        queuedVersion = queuedState && Object(prosemirror_collab__WEBPACK_IMPORTED_MODULE_6__["getVersion"])(queuedState);
                        queuedSteps = queued && queued.localSteps && queued.localSteps.steps;
                        data.queue = {
                          backoff: backoff,
                          failures: failures,
                          isDirty: isDirty,
                          isSending: isSending,
                          hasQueue: hasQueue,
                          version: queuedVersion,
                          steps: queuedSteps,
                          length: queuedSteps && queuedSteps.length
                        };
                        dirtySince = collabProvider.isDirty();
                        lastRemoteSync = collabProvider.getLastRemoteSync();
                        lastLocalSave = collabProvider.getLastLocalSave();
                        data.collabState = {
                          dirtySince: dirtySince,
                          lastRemoteSync: lastRemoteSync,
                          lastLocalSave: lastLocalSave
                        };
                        serviceClient = collabProvider && collabProvider.serviceClient;
                        realtime = serviceClient && serviceClient.realtime;
                        websocket = realtime && realtime.websocket;
                        retryManager = realtime && realtime.retryManager;
                        data.realtime = {
                          hasRealtime: !!realtime,
                          started: realtime && realtime.isStarted,
                          hasWebsocket: realtime && realtime.hasWebSocket(),
                          isOpen: realtime && realtime.isWebSocketOpen(),
                          readyState: websocket && websocket.readyState,
                          bufferedAmount: websocket && websocket.bufferedAmount,
                          url: websocket && websocket.url,
                          retries: retryManager && retryManager.retries,
                          wait: retryManager && retryManager.wait
                        };
                        client = lodash_get__WEBPACK_IMPORTED_MODULE_5___default()(window, 'cozy.debug.client');
                        data.client = {
                          token: client.stackClient.token,
                          credentials: client.stackClient.getCredentials(),
                          authorization: client.stackClient.getAuthorizationHeader(),
                          uri: client.uri
                        };
                        error = lodash_get__WEBPACK_IMPORTED_MODULE_5___default()(window, 'cozy.debug.notes.lastPatchError');

                        if (!(!error && isDirty)) {
                          _context2.next = 43;
                          break;
                        }

                      case 33:
                        if (!channel.isSending) {
                          _context2.next = 38;
                          break;
                        }

                        _context2.next = 36;
                        return new Promise(function (resolve) {
                          return window.setTimeout(resolve, 50);
                        });

                      case 36:
                        _context2.next = 33;
                        break;

                      case 38:
                        channel.resetBackoff();
                        channel.processQueue();
                        _context2.next = 42;
                        return Promise.race([new Promise(function (resolve) {
                          return window.setTimeout(resolve, 2000);
                        }), new Promise(function (resolve) {
                          var fn =
                          /*#__PURE__*/
                          function () {
                            var _ref3 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
                            /*#__PURE__*/
                            _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
                              var err;
                              return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
                                while (1) {
                                  switch (_context.prev = _context.next) {
                                    case 0:
                                      err = lodash_get__WEBPACK_IMPORTED_MODULE_5___default()(window, 'cozy.debug.notes.lastPatchError');

                                    case 1:
                                      if (err) {
                                        _context.next = 7;
                                        break;
                                      }

                                      _context.next = 4;
                                      return new Promise(function (resolve) {
                                        return window.setTimeout(resolve, 50);
                                      });

                                    case 4:
                                      err = lodash_get__WEBPACK_IMPORTED_MODULE_5___default()(window, 'cozy.debug.notes.lastPatchError');
                                      _context.next = 1;
                                      break;

                                    case 7:
                                      error = err;
                                      resolve();

                                    case 9:
                                    case "end":
                                      return _context.stop();
                                  }
                                }
                              }, _callee, this);
                            }));

                            return function fn() {
                              return _ref3.apply(this, arguments);
                            };
                          }();

                          fn();
                        })]);

                      case 42:
                        if (channel.isDirty()) {
                          channel.backoff = backoff;
                          channel.failures = failures;
                        }

                      case 43:
                        msg = error && error.message;

                        try {
                          msg = JSON.parse(error.message);
                        } catch (e) {// nothing
                        }

                        data.lastPatchError = {
                          name: error && error.name,
                          status: error && error.status,
                          message: msg
                        };
                        resolve(data);

                      case 47:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, this);
              })), 250);
            });

          case 12:
            return _context3.abrupt("return", _context3.sent);

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function debugCollab() {
    return _debugCollab.apply(this, arguments);
  };
}());

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

/***/ "2tu+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("J4zp");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var cozy_doctypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("Le8U");
/* harmony import */ var cozy_doctypes__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(cozy_doctypes__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var cozy_sharing__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("UmWK");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("y6ex");
/* harmony import */ var cozy_ui_react_IconButton__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("lEaz");
/* harmony import */ var cozy_ui_react_Alerter__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("67rm");
/* harmony import */ var cozy_ui_react_ActionMenu__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("UxX4");
/* harmony import */ var cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("7YkG");
/* harmony import */ var cozy_ui_react_hooks_useBreakpoints__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("1I/2");
/* harmony import */ var components_notes_List_list_styl__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("RMII");
/* harmony import */ var components_notes_List_list_styl__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(components_notes_List_list_styl__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var lib_utils__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("snnE");
/* harmony import */ var assets_icons_icon_note_32_svg__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("H/IU");


















var NoteRow = function NoteRow(_ref) {
  var note = _ref.note,
      f = _ref.f,
      t = _ref.t,
      client = _ref.client;

  var _CozyFile$splitFilena = cozy_doctypes__WEBPACK_IMPORTED_MODULE_4__["CozyFile"].splitFilename(note),
      filename = _CozyFile$splitFilena.filename,
      extension = _CozyFile$splitFilena.extension;

  var _useBreakpoints = Object(cozy_ui_react_hooks_useBreakpoints__WEBPACK_IMPORTED_MODULE_13__["default"])(),
      isMobile = _useBreakpoints.isMobile;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(false),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState, 2),
      isMenuOpen = _useState2[0],
      setMenuOpen = _useState2[1];

  var openMenu = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (e) {
    setMenuOpen(true);
    e.stopPropagation();
  }, [setMenuOpen]);
  var closeMenu = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function () {
    return setMenuOpen(false);
  }, [setMenuOpen]);
  var deleteNote = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(
  /*#__PURE__*/
  _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return client.destroy(note);

          case 3:
            setMenuOpen(false);
            cozy_ui_react_Alerter__WEBPACK_IMPORTED_MODULE_10__["default"].info(t('Notes.Delete.deleted'));
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            cozy_ui_react_Alerter__WEBPACK_IMPORTED_MODULE_10__["default"].error(t('Notes.Delete.failed'));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 7]]);
  })), [client, note, t, setMenuOpen]);
  var menuTriggerRef = react__WEBPACK_IMPORTED_MODULE_3___default.a.createRef();
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_12__["TableRow"], {
    className: "u-c-pointer ".concat(components_notes_List_list_styl__WEBPACK_IMPORTED_MODULE_14___default.a.tableRow),
    onClick: function onClick() {
      return window.location.href = Object(lib_utils__WEBPACK_IMPORTED_MODULE_15__["generateReturnUrlToNotesIndex"])(note);
    }
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_12__["TableCell"], {
    className: "".concat(components_notes_List_list_styl__WEBPACK_IMPORTED_MODULE_14___default.a.tableCellName, " u-flex u-flex-items-center u-fz-medium")
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_8__["default"], {
    icon: assets_icons_icon_note_32_svg__WEBPACK_IMPORTED_MODULE_16__["default"],
    size: 32,
    className: "u-mr-1 u-flex-shrink-0"
  }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: "u-charcoalGrey u-ellipsis"
  }, filename), !isMobile && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: "u-ellipsis"
  }, extension)), !isMobile && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_12__["TableCell"], {
    className: components_notes_List_list_styl__WEBPACK_IMPORTED_MODULE_14___default.a.tableCell
  }, t('Notes.List.at', {
    date: f(note.updated_at, 'DD MMMM'),
    time: f(note.updated_at, 'HH:mm')
  })), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_12__["TableCell"], {
    className: components_notes_List_list_styl__WEBPACK_IMPORTED_MODULE_14___default.a.tableCell
  }, "\u2014"), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_12__["TableCell"], {
    className: components_notes_List_list_styl__WEBPACK_IMPORTED_MODULE_14___default.a.tableCell
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(cozy_sharing__WEBPACK_IMPORTED_MODULE_6__["SharedRecipients"], {
    docId: note._id,
    size: "small"
  }))), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_12__["TableCell"], {
    className: components_notes_List_list_styl__WEBPACK_IMPORTED_MODULE_14___default.a.tableCell
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    ref: menuTriggerRef
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(cozy_ui_react_IconButton__WEBPACK_IMPORTED_MODULE_9__["default"], {
    onClick: openMenu
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_8__["default"], {
    icon: "dots"
  }))))), isMenuOpen && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(cozy_ui_react_ActionMenu__WEBPACK_IMPORTED_MODULE_11__["default"], {
    onClose: closeMenu,
    anchorElRef: menuTriggerRef,
    placement: "bottom-end"
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(cozy_ui_react_ActionMenu__WEBPACK_IMPORTED_MODULE_11__["ActionMenuItem"], {
    onClick: deleteNote,
    left: react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_8__["default"], {
      icon: "trash"
    })
  }, t('Notes.Delete.delete_note'))));
};

/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_7__["translate"])()(Object(cozy_client__WEBPACK_IMPORTED_MODULE_5__["withClient"])(NoteRow)));

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

module.exports = JSON.parse("{\"Notes\":{\"Add\":{\"add_note\":\"Add a note\"},\"Delete\":{\"delete_note\":\"Delete\",\"deleted\":\"The note has been moved to the trash of your Drive\",\"failed\":\"The note could not be deleted, please try again\"},\"EditorView\":{\"main_placeholder\":\"Write anything…\"},\"Editor\":{\"title_placeholder\":\"Here is your title\",\"exit_confirmation_message\":\"Automatic saving has not taken into account the latest changes in your doc. Please stay on your current note if you want to keep them.\",\"exit_confirmation_title\":\"Abandon your changes?\",\"exit_confirmation_leave\":\"Leave without saving\",\"exit_confirmation_cancel\":\"Cancel\"},\"List\":{\"latest_notes\":\"Latest Notes\",\"name\":\"Name\",\"updated_at\":\"Updated at\",\"location\":\"Location\",\"sharings\":\"Sharings\",\"at\":\"%{date} at %{time}\"},\"Empty\":{\"welcome\":\"Welcome on Cozy Notes\",\"after_created\":\"Once your Note is created, you can find it in your \"},\"SavingIndicator\":{\"saved\":{\"just_now\":\"Up to date\",\"secs_ago\":\"Up to date (saved %{time} sec. ago)\",\"min_ago\":\"Up to date (saved %{time} min. ago)\",\"mins_ago\":\"Up to date (saved %{time} min. ago)\",\"hour_ago\":\"Up to date (saved %{time} hour ago)\",\"hours_ago\":\"Up to date (saved %{time} hours ago)\",\"day_ago\":\"Up to date (saved %{time} day ago)\",\"days_ago\":\"Up to date (saved %{time} days ago)\",\"month_ago\":\"Up to date (saved %{time} month ago)\",\"monthes_ago\":\"Up to date (saved %{time} monthes ago)\",\"year_ago\":\"Up to date (saved %{time} year ago)\",\"years_ago\":\"Up to date (saved %{time} years ago)\"},\"saving\":\"Saving...\",\"still_saving\":\"Saving......\",\"out_of_sync\":{\"just_now\":\"Changes unsaved\",\"secs_ago\":\"Changes unsaved (off-line for %{time} sec.)\",\"min_ago\":\"Changes unsaved (off-line for %{time} min.)\",\"mins_ago\":\"Changes unsaved (off-line for %{time} min.)\",\"hour_ago\":\"Changes unsaved (off-line for %{time} hour)\",\"hours_ago\":\"Changes unsaved (off-line for %{time} hours)\",\"day_ago\":\"Changes unsaved (off-line for %{time} day)\",\"days_ago\":\"Changes unsaved (off-line for %{time} days)\",\"month_ago\":\"Changes unsaved (off-line for %{time} month)\",\"monthes_ago\":\"Changes unsaved (off-line for %{time} monthes)\",\"year_ago\":\"Changes unsaved (off-line for %{time} year)\",\"years_ago\":\"Changes unsaved (off-line for %{time} years)\"}},\"OfflineIndicator\":{\"message\":\"You're not connected to internet anymore. Your changes will be saved once you will be connected again.\"}},\"Error\":{\"unshared_title\":\"This share is no longer active\",\"unshared_text\":\"The owner may have revoked this sharing. You can no longer edit a note at this address.\",\"loading_error_title\":\"The note couldn't be loaded\",\"loading_error_text_noReturnUrl\":\"The note may not exists anymore, or our servers may have a temporary glitch. Please try again later.\",\"loading_error_text_returnUrl\":\"The note may not exists anymore, or our servers may have a temporary glitch. Please go <a href='%{url}'>back</a> and try again later.\"},\"manifest\":{\"short_description\":\"Cozy Notes is your personal and collaborative note-taking application.\",\"long_description\":\"Notes is an online text editor that can already offer you to:\\n\\n* Create your own notes with the essential features (bold, underlined, links, tables...)\\n* Fill and find your notes with you other documents in files of your personal Drive\\n* Edit easily your notes from all your devices\\n* Access your notes offline\\n* For the fans, use shortcuts and input in markdown format ... and even write with contacts together on the same note (coming soon)!\",\"screenshots\":[\"screenshots/en/screenshot01.png\",\"screenshots/en/screenshot02.png\"]}}");

/***/ }),

/***/ "84gJ":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"saving-indicator":"saving-indicator--rzoXB"};

/***/ }),

/***/ "8i3i":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("J4zp");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var cozy_sharing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("UmWK");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var hooks_useFileWithPath__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("oVTz");
/* harmony import */ var components_notes_sharing_styl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("R3/7");
/* harmony import */ var components_notes_sharing_styl__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(components_notes_sharing_styl__WEBPACK_IMPORTED_MODULE_5__);






/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_sharing__WEBPACK_IMPORTED_MODULE_2__["withLocales"])(Object(cozy_client__WEBPACK_IMPORTED_MODULE_3__["withClient"])(function SharingWidget(props) {
  var client = props.client;
  var file = Object(hooks_useFileWithPath__WEBPACK_IMPORTED_MODULE_4__["default"])({
    cozyClient: client,
    file: props.file
  });
  var noteId = file && file.id;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      showModal = _useState2[0],
      setShowModal = _useState2[1];

  var onClick = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function () {
    return setShowModal(!showModal);
  }, [showModal]);
  var onClose = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function () {
    return setShowModal(false);
  }, []);
  return file && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_sharing__WEBPACK_IMPORTED_MODULE_2__["ShareButton"], {
    theme: "primary",
    docId: noteId,
    onClick: onClick,
    extension: "narrow",
    className: components_notes_sharing_styl__WEBPACK_IMPORTED_MODULE_5___default.a['sharing-button']
  }), showModal && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_sharing__WEBPACK_IMPORTED_MODULE_2__["ShareModal"], {
    document: file,
    onClose: onClose
  })) || null;
})));

/***/ }),

/***/ "9pOX":
/***/ (function(module) {

module.exports = JSON.parse("{\"Notes\":{\"Add\":{\"add_note\":\"Ajouter une note\"},\"Delete\":{\"delete_note\":\"Supprimer\",\"deleted\":\"La note a été placée dans la corbeille de votre Drive\",\"failed\":\"La note n'a pas pu être supprimée, merci de re-essayer plus tard\"},\"EditorView\":{\"main_placeholder\":\"Écrivez ce que vous souhaitez…\"},\"Editor\":{\"title_placeholder\":\"Ici votre titre\",\"exit_confirmation_message\":\"La sauvegarde automatique n'a pas encore pris en compte vos dernières modifications. Merci de retourner sur votre note pour ne pas les perdre.\",\"exit_confirmation_title\":\"Abandonner les modifications ?\",\"exit_confirmation_leave\":\"Quitter sans sauvegarder\",\"exit_confirmation_cancel\":\"Retour\"},\"List\":{\"latest_notes\":\"Notes récentes\",\"name\":\"Nom\",\"updated_at\":\"Mise à jour\",\"location\":\"Emplacement\",\"sharings\":\"Partage\",\"at\":\"%{date} à %{time}\"},\"Empty\":{\"welcome\":\"Bienvenue sur Cozy Notes\",\"after_created\":\"Une fois votre note créée, il vous est possible de la retrouver dans \"},\"SavingIndicator\":{\"saved\":{\"just_now\":\"À jour\",\"secs_ago\":\"À jour (enregistré il y a %{time} sec.)\",\"min_ago\":\"À jour (enregistré il y a %{time} min.)\",\"mins_ago\":\"À jour (enregistré il y a %{time} min.)\",\"hour_ago\":\"À jour (enregistré il y a %{time} heure)\",\"hours_ago\":\"À jour (enregistré il y a %{time} heures)\",\"day_ago\":\"À jour (enregistré il y a %{time} jour)\",\"days_ago\":\"À jour (enregistré il y a %{time} jours)\",\"month_ago\":\"À jour (enregistré il y a %{time} mois)\",\"monthes_ago\":\"À jour (enregistré il y a %{time} mois)\",\"year_ago\":\"À jour (enregistré il y a %{time} an)\",\"years_ago\":\"À jour (enregistré il y a %{time} ans)\"},\"saving\":\"Enregistrement en cours...\",\"still_saving\":\"Enregistrement en cours......\",\"out_of_sync\":{\"just_now\":\"Non enregistré (hors ligne)\",\"secs_ago\":\"Non enregistré (hors ligne depuis %{time} sec)\",\"min_ago\":\"Non enregistré (hors ligne depuis %{time} min)\",\"mins_ago\":\"Non enregistré (hors ligne depuis %{time} min)\",\"hour_ago\":\"Non enregistré (hors ligne depuis %{time} h)\",\"hours_ago\":\"Non enregistré (hors ligne depuis %{time} h)\",\"day_ago\":\"Non enregistré (hors ligne depuis %{time} jour)\",\"days_ago\":\"Non enregistré (hors ligne depuis %{time} jours)\",\"month_ago\":\"Non enregistré (hors ligne depuis %{time} mois)\",\"monthes_ago\":\"Non enregistré (hors ligne depuis %{time} mois)\",\"year_ago\":\"Non enregistré (hors ligne depuis %{time} an)\",\"years_ago\":\"Non enregistré (hors ligne depuis %{time} ans)\"}},\"OfflineIndicator\":{\"message\":\"Vous n’êtes plus connecté à internet. Vos modifications seront enregistrées quand vous serez connecté à nouveau.\"}},\"Error\":{\"unshared_title\":\"Le partage n'est plus actif\",\"unshared_text\":\"Le propriétaire a peut-être révoqué ce partage. Vous ne pouvez plus éditer de note à cette adresse.\",\"loading_error_title\":\"La note n'a pas pu être chargée\",\"loading_error_text_noReturnUrl\":\"Cette note n'existe peut-être plus, ou nos serveurs ont peut-être un moment d'égarrement. Merci de retenter plus tard.\",\"loading_error_text_returnUrl\":\"Cette note n'existe peut-être plus, ou nos serveurs ont peut-être un moment d'égarrement. Merci revenir <a href='%{url}'>en arrière</a> et de retenter plus tard.\"},\"manifest\":{\"short_description\":\"Cozy Notes est votre application de prise de notes personnelles et collaboratives.\",\"long_description\":\"Notes est un éditeur de texte en ligne destiné à :\\n\\n* Créer vos propres notes avec les fonctionnalités essentielles (gras, souligné, liens, tableaux...)\\n* Classer et retrouver vos notes avec vos autres documents, dans les répertoires de votre Drive personnel\\n* Éditer facilement vos notes depuis tous vos appareils\\n* Accéder à vos notes, même sans internet, stockées sur votre PC\\n* Pour les aficionados, utiliser les raccourcis et la saisie au format markdown\\n*  ... et même écrire à plusieurs simultanément sur la même note (à venir) ! \",\"screenshots\":[\"screenshots/fr/screenshot01.png\",\"screenshots/fr/screenshot02.png\"]}}");

/***/ }),

/***/ "AIob":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("pVnL");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _atlaskit_editor_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("ND5g");
/* harmony import */ var cozy_ui_react_Text__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("kyGY");
/* harmony import */ var cozy_ui_react_Textarea__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("jWvl");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_hooks_useEventListener__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("KXVJ");
/* harmony import */ var components_notes_editor_config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("lu5+");
/* harmony import */ var components_header_menu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("+7CB");
/* harmony import */ var components_notes_editor_view_styl__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("Q2Eh");
/* harmony import */ var components_notes_editor_view_styl__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(components_notes_editor_view_styl__WEBPACK_IMPORTED_MODULE_9__);











function updateTextareaHeight(target) {
  if (target) target.style.height = "".concat(target.scrollHeight, "px");
}

var nullCallback = function nullCallback() {};

function EditorView(props) {
  var defaultValue = props.defaultValue,
      onTitleChange = props.onTitleChange,
      onTitleBlur = props.onTitleBlur,
      defaultTitle = props.defaultTitle,
      title = props.title,
      collabProvider = props.collabProvider,
      leftComponent = props.leftComponent,
      rightComponent = props.rightComponent,
      onContentChange = props.onContentChange,
      readOnly = props.readOnly,
      bannerRef = props.bannerRef;

  var _useI18n = Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_5__["useI18n"])(),
      t = _useI18n.t;

  var titleEl = Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])(null);
  var onTitleEvent = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function (e) {
    var target = e.target;
    updateTextareaHeight(target);
    if (onTitleChange) onTitleChange(e);
  }, [onTitleChange]); // put the provider in readonly mode if requested and react to changes of values

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useMemo"])(function () {
    return collabProvider && collabProvider.setReadOnly(!!readOnly);
  }, [readOnly, collabProvider]);
  var collabEdit = Object(react__WEBPACK_IMPORTED_MODULE_1__["useMemo"])(function () {
    return collabProvider && {
      useNativePlugin: true,
      provider: Promise.resolve(collabProvider),
      inviteToEditHandler: function inviteToEditHandler() {
        return undefined;
      },
      isInviteToEditButtonSelected: false,
      userId: collabProvider.serviceClient.getSessionId()
    };
  }, [collabProvider]);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    return updateTextareaHeight(titleEl.current);
  }, []);
  Object(cozy_ui_react_hooks_useEventListener__WEBPACK_IMPORTED_MODULE_6__["default"])(titleEl.current, 'blur', onTitleBlur);
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("article", {
    className: components_notes_editor_view_styl__WEBPACK_IMPORTED_MODULE_9___default.a['note-article']
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("style", null, "#coz-bar ", '{ display: none }'), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(components_header_menu__WEBPACK_IMPORTED_MODULE_8__["default"], {
    left: leftComponent,
    className: "note-header-menu--editing",
    right: rightComponent
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("section", {
    className: "note-editor-container"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_atlaskit_editor_core__WEBPACK_IMPORTED_MODULE_2__["Editor"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    disabled: collabProvider ? false : readOnly,
    collabEdit: collabEdit,
    onChange: onContentChange || nullCallback,
    defaultValue: defaultValue
  }, components_notes_editor_config__WEBPACK_IMPORTED_MODULE_7__["default"], {
    appearance: "full-page",
    placeholder: t('Notes.EditorView.main_placeholder'),
    shouldFocus: !readOnly,
    contentComponents: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_atlaskit_editor_core__WEBPACK_IMPORTED_MODULE_2__["WithEditorActions"], {
      render: function render() {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("aside", {
          ref: bannerRef,
          className: components_notes_editor_view_styl__WEBPACK_IMPORTED_MODULE_9___default.a.banner
        }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Text__WEBPACK_IMPORTED_MODULE_3__["MainTitle"], {
          tag: "h1",
          className: components_notes_editor_view_styl__WEBPACK_IMPORTED_MODULE_9___default.a.title
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Textarea__WEBPACK_IMPORTED_MODULE_4__["default"], {
          ref: titleEl,
          rows: "1",
          readOnly: !!readOnly,
          fullwidth: true,
          value: title,
          onChange: readOnly ? nullCallback : onTitleEvent,
          placeholder: defaultTitle,
          className: components_notes_editor_view_styl__WEBPACK_IMPORTED_MODULE_9___default.a.titleInput
        })));
      }
    })
  }))));
}

/* harmony default export */ __webpack_exports__["default"] = (EditorView);

/***/ }),

/***/ "B44c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lib_collab_stack_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("ereM");



function useServiceClient(_ref) {
  var userId = _ref.userId,
      userName = _ref.userName,
      cozyClient = _ref.cozyClient;
  return Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    return new lib_collab_stack_client__WEBPACK_IMPORTED_MODULE_1__["default"]({
      userId: userId,
      userName: userName,
      cozyClient: cozyClient
    });
  }, [cozyClient, userId, userName]);
}

/* harmony default export */ __webpack_exports__["default"] = (useServiceClient);

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
    avatar: null,
    email: null
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
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("W8MJ");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var eventemitter2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("cjKa");
/* harmony import */ var eventemitter2__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(eventemitter2__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var prosemirror_collab__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("O1Kf");
/* harmony import */ var prosemirror_collab__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prosemirror_collab__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var cozy_flags__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("kdbL");
/* harmony import */ var cozy_flags__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(cozy_flags__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _debug__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("/RjM");








var minimumBackoff = 128; // 128ms

var maximumBackoff = 1000 * 60 * 5; // Max 5 minutes

var failuresBeforeCatchup = 4;
var Channel =
/*#__PURE__*/
function () {
  function Channel(config, serviceClient) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, Channel);

    this.config = config;
    this.service = serviceClient;
    this.eventEmitter = new eventemitter2__WEBPACK_IMPORTED_MODULE_4__["EventEmitter2"]();
    this.resetBackoff();
    this.initializeStepsQueue();
    this.isSending = false;
  }
  /**
   * Reset the backoff
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(Channel, [{
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
     * Checks if something is not fully sent to the server
     *
     * @returns {bool}
     */

  }, {
    key: "isDirty",
    value: function isDirty() {
      return this.hasQueuedSteps() || this.isSending;
    }
    /**
     * Ensures all local steps are sent to the server
     */

  }, {
    key: "ensureEmptyQueue",
    value: function () {
      var _ensureEmptyQueue = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var _this2 = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", new Promise(function (resolve) {
                  function onEmptyQueue() {
                    this.off('emptyQueue', onEmptyQueue);
                    resolve();
                  }

                  if (_this2.isDirty()) {
                    _this2.on('emptyQueue', onEmptyQueue);
                  } else {
                    resolve();
                  }
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function ensureEmptyQueue() {
        return _ensureEmptyQueue.apply(this, arguments);
      };
    }()
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
      var localSteps = queued.localSteps || Object(prosemirror_collab__WEBPACK_IMPORTED_MODULE_5__["sendableSteps"])(state) || {
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
      var _sendSteps = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(getState, state, localSteps) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.emit('enqueueSteps');
                this.enqueueSteps({
                  getState: getState,
                  state: state,
                  localSteps: localSteps
                });
                _context2.next = 4;
                return this.processQueue();

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
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
      var _processQueue = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
        var _this$dequeueSteps, getState, state, steps, version, noteId, response;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.isSending) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return");

              case 2:
                if (this.hasQueuedSteps()) {
                  _context3.next = 5;
                  break;
                }

                this.emit('emptyQueue');
                return _context3.abrupt("return");

              case 5:
                this.isSending = true;
                _context3.next = 8;
                return this.afterBackoff();

              case 8:
                _this$dequeueSteps = this.dequeueSteps(), getState = _this$dequeueSteps.getState, state = _this$dequeueSteps.state, steps = _this$dequeueSteps.localSteps.steps;
                version = Object(prosemirror_collab__WEBPACK_IMPORTED_MODULE_5__["getVersion"])(state); // Don't send any steps before we're ready.

                if (!(typeof version === 'undefined')) {
                  _context3.next = 12;
                  break;
                }

                return _context3.abrupt("return");

              case 12:
                if (!(steps.length === 0)) {
                  _context3.next = 14;
                  break;
                }

                return _context3.abrupt("return");

              case 14:
                _context3.prev = 14;
                noteId = this.config.noteId;
                _context3.next = 18;
                return this.service.pushSteps(noteId, version, steps);

              case 18:
                response = _context3.sent;
                this.rebaseStepsInQueue();
                this.resetBackoff();
                this.emit('successfulPatch');
                this.isSending = false;

                if (response && response.steps && response.steps.length > 0) {
                  this.emit('data', response);
                }

                _context3.next = 32;
                break;

              case 26:
                _context3.prev = 26;
                _context3.t0 = _context3["catch"](14);

                if (cozy_flags__WEBPACK_IMPORTED_MODULE_6___default()('notes.lastPatchError')) {
                  Object(_debug__WEBPACK_IMPORTED_MODULE_7__["setDebugValue"])('notes.lastPatchError', _context3.t0);
                }

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

              case 32:
                _context3.next = 34;
                return this.processQueue();

              case 34:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[14, 26]]);
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
      var _connect = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(_ref2) {
        var _this3 = this;

        var version, doc, updatedAt, noteId;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                version = _ref2.version, doc = _ref2.doc, updatedAt = _ref2.updatedAt;
                noteId = this.config.noteId;
                this.service.join(noteId);
                this.service.onStepsCreated(noteId, function (data) {
                  _this3.emit('data', {
                    version: data.version,
                    steps: [data]
                  });
                });
                this.service.onTelepointerUpdated(noteId, function (payload) {
                  _this3.emit('telepointer', payload);
                });
                this.emit('connected', {
                  version: version,
                  doc: doc,
                  updatedAt: updatedAt
                });

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function connect(_x4) {
        return _connect.apply(this, arguments);
      };
    }()
    /**
     * Get steps from version x to latest
     */

  }, {
    key: "getSteps",
    value: function () {
      var _getSteps = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5(version) {
        var noteId;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                noteId = this.config.noteId;
                _context5.next = 3;
                return this.service.getSteps(noteId, version);

              case 3:
                return _context5.abrupt("return", _context5.sent);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function getSteps(_x5) {
        return _getSteps.apply(this, arguments);
      };
    }()
    /**
     * Send telepointer
     */

  }, {
    key: "sendTelepointer",
    value: function () {
      var _sendTelepointer = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee6(data) {
        var noteId;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                noteId = this.config.noteId;
                _context6.next = 3;
                return this.service.pushTelepointer(noteId, data);

              case 3:
                return _context6.abrupt("return", _context6.sent);

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function sendTelepointer(_x6) {
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
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("RIqP");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("MVZn");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("W8MJ");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("lSNA");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var eventemitter2__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("cjKa");
/* harmony import */ var eventemitter2__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(eventemitter2__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var prosemirror_collab__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("O1Kf");
/* harmony import */ var prosemirror_collab__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prosemirror_collab__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _atlaskit_editor_json_transformer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("bfWj");
/* harmony import */ var _channel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("D2GK");
/* harmony import */ var _participant__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("BC9o");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("mwIZ");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("sEfC");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_13__);














var jsonTransformer = new _atlaskit_editor_json_transformer__WEBPACK_IMPORTED_MODULE_9__["JSONTransformer"](); // Using the jsonTransformer directly introduce a bug for empty documents
// with only one paragraph. The transformed document has no content
// (not even the paragraph) and makes the Editor to always when think
// it is as version=0. This would break the catchup logic.
// This patch fixes this unique case, creating a correct empty document with
// an empty paragraph

var oldEncode = jsonTransformer.encode.bind(jsonTransformer);

jsonTransformer.encode = function (doc) {
  var transformed = oldEncode(doc);

  if (transformed.content.length === 0 && doc.content.length != 0) {
    return {
      content: [{
        type: 'paragraph',
        content: []
      }],
      type: 'doc'
    };
  } else {
    return transformed;
  }
};
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

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default()(this, CollabProvider);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(this, "processRemoteData", function (data) {
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

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(this, "onReceiveData", function (data) {
      _this.queueData(data);

      _this.processQueue();
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(this, "onReceiveTelepointer", function (data) {
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

    this.config = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, config);
    this.config['sessionId'] = serviceClient.getSessionId();
    this.config['userId'] = serviceClient.getUserId(); // this debounce is primary here to introduce a short delay so that
    // the local step is definitively applied in the editor. The debounce
    // is the optional additional value to avoid reseting the state too much

    this.cancelLocalChanges = lodash_debounce__WEBPACK_IMPORTED_MODULE_13___default()(this.cancelLocalChanges.bind(this), 100);
    this.setReadOnly(!!this.config['readOnly']);
    this.serviceClient = serviceClient;
    this.channel = config.channel || new _channel__WEBPACK_IMPORTED_MODULE_10__["Channel"](this.config, serviceClient);
    this.eventEmitter = new eventemitter2__WEBPACK_IMPORTED_MODULE_7__["EventEmitter2"]();
    this.queue = [];

    this.getState = function () {};

    this.participants = new Map();
    this.pauseQueue = false;
    this.initialVersion = config.version;
    this.initialDate = config.updatedAt || new Date();
    this.pauseQueue = false;
  }
  /**
   * Initialze the collaboration provider
   * @param {Function} getState - How to get the proseMirror state
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(CollabProvider, [{
    key: "initialize",
    value: function initialize(getState) {
      var _this2 = this;

      this.getState = getState;
      this.channel.on('connected', function (_ref) {
        var doc = _ref.doc,
            version = _ref.version,
            updatedAt = _ref.updatedAt;
        var sessionId = _this2.config.sessionId;

        _this2.emit('init', {
          sid: sessionId,
          doc: doc,
          version: version
        }); // Set initial document


        _this2.emit('connected', {
          sid: sessionId
        }); // Let the plugin know that we're connected an ready to go


        _this2.listenStateEvents({
          lastRemoteSync: updatedAt
        });
      });
      this.channel.on('data', this.onReceiveData);
      this.channel.on('telepointer', this.onReceiveTelepointer);
      this.channel.on('needcatchup', function () {
        return _this2.catchup();
      });
      var state = getState();
      var doc = jsonTransformer.encode(state.doc);
      var usableVersion = this.initialVersion !== undefined ? this.initialVersion : doc.version;

      var collabDoc = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, doc, {
        version: usableVersion
      });

      this.channel.connect({
        version: usableVersion,
        doc: collabDoc,
        updatedAt: this.initialDate
      });
      return this;
    }
    /**
     * Send steps from transaction to other participants
     */

  }, {
    key: "send",
    value: function send(tr, oldState, newState) {
      // Ignore transactions without steps
      if (!tr.steps || !tr.steps.length) return; // cancel changes on a readonly document

      if (this.isReadOnly()) {
        this.cancelLocalChanges();
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
      if (!data || this.isReadOnly()) {
        return;
      }

      var type = data.type;

      switch (type) {
        case 'telepointer':
          this.channel.sendTelepointer(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, data, {
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
      // If a change couldn't be applied or discarded, it will
      // block the queue, waiting for missing steps
      // Let order changes, putting first the one that could be
      // applied (or discarded) first, and avoir dead-locks
      var orderedQueue = [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default()(this.queue), [data]).sort(function (a, b) {
        // order by document version before applying the change
        var aStart = a.version - a.steps.length;
        var bStart = b.version - b.steps.length;
        if (aStart > bStart) return 1;
        if (aStart < bStart) return -1; // for same starting version, keep first the one going further
        // we could apply the shorter, but then we'd have to discard
        // the longer, and may miss some step contained in it

        if (a.version > b.version) return -1;
        if (a.version < b.version) return 1;
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
      var _catchup = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var currentVersion, _ref2, doc, version, steps, sessionId, _ref3, _ref3$steps, localSteps;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // forbids other changes to be accepted during the catchup
                // we will process them later
                this.pauseQueue = true;
                currentVersion = Object(prosemirror_collab__WEBPACK_IMPORTED_MODULE_8__["getVersion"])(this.getState());
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
                  sessionId = this.config.sessionId; // get local steps and re-emit them after reinit the whole document

                  _ref3 = Object(prosemirror_collab__WEBPACK_IMPORTED_MODULE_8__["sendableSteps"])(this.getState()) || {}, _ref3$steps = _ref3.steps, localSteps = _ref3$steps === void 0 ? [] : _ref3$steps;
                  this.emit('init', {
                    sid: sessionId,
                    doc: doc,
                    version: version
                  });

                  if (localSteps.length && !this.isReadOnly()) {
                    this.emit('local-steps', {
                      steps: localSteps
                    });
                  }
                } else if (steps.length > 0) {
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
        var currentVersion = Object(prosemirror_collab__WEBPACK_IMPORTED_MODULE_8__["getVersion"])(this.getState());

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
      var participant = Object(_participant__WEBPACK_IMPORTED_MODULE_11__["getParticipant"])({
        userId: userId,
        sessionId: sessionId
      });
      this.participants.set(userId, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({
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
    /**
     * Checks if something is not fully sent to the server
     *
     * @returns {bool}
     */

  }, {
    key: "isDirty",
    value: function isDirty() {
      return !!this.dirtySince;
    }
    /**
     * Date since which something is waiting to be sent to the server
     *
     * @returns {Date|undefined} undefined if the state is not dirty
     */

  }, {
    key: "getDirtySince",
    value: function getDirtySince() {
      return this.dirtySince;
    }
    /**
     * Date of the last save of local state to the server
     *
     * @returns {Date|undefined}
     */

  }, {
    key: "getLastLocalSave",
    value: function getLastLocalSave() {
      return this.lastLocalSave;
    }
    /**
     * Date of the last sync with data from the server
     *
     * @returns {Date|undefined}
     */

  }, {
    key: "getLastRemoteSync",
    value: function getLastRemoteSync() {
      return this.lastRemoteSync;
    }
    /**
     * Date of last update with the server (both in or out)
     *
     * @returns {Date|undefined}
     */

  }, {
    key: "getLastSaveOrSync",
    value: function getLastSaveOrSync() {
      return this.lastLocalSave > this.lastRemoteSync ? this.lastLocalSave : this.lastRemoteSync;
    }
    /**
     * When we successfuly save local changes to the server
     *
     * @private
     */

  }, {
    key: "onLocalSave",
    value: function onLocalSave() {
      this.lastLocalSave = new Date();
      this.emit('collab-state-change');
    }
    /**
     * When we successfuly get remote changes from the server
     *
     * @private
     */

  }, {
    key: "onRemoteSync",
    value: function onRemoteSync() {
      this.lastRemoteSync = new Date();
      this.emit('collab-state-change');
    }
    /**
     * When we empty the queue of data to be sent to the server
     * and none is being sent at the moment
     *
     * @private
     */

  }, {
    key: "onChannelEmptyQueue",
    value: function onChannelEmptyQueue() {
      this.dirtySince = undefined;
      this.emit('collab-state-change');
    }
    /**
     * When we add  something to the queue of data to be sent to the server
     *
     * @private
     */

  }, {
    key: "onChannelEnqueue",
    value: function onChannelEnqueue() {
      if (!this.dirtySince) {
        this.dirtySince = new Date();
        this.emit('collab-state-change');
      }
    }
    /**
     * Listen to events from and to the server
     * to update the current dirty state and last save dates
     *
     * @private
     */

  }, {
    key: "listenStateEvents",
    value: function listenStateEvents() {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          lastRemoteSync = _ref4.lastRemoteSync;

      this.channel.on('emptyQueue', this.onChannelEmptyQueue.bind(this));
      this.channel.on('enqueueSteps', this.onChannelEnqueue.bind(this));
      this.channel.on('successfulPatch', this.onLocalSave.bind(this));
      this.on('data', this.onRemoteSync.bind(this));
      this.on('init', this.onRemoteSync.bind(this));
      if (lastRemoteSync) this.lastRemoteSync = lastRemoteSync;
    }
    /**
     * Checks if the editor should be readonly
     *
     * @returns {bool}
     */

  }, {
    key: "isReadOnly",
    value: function isReadOnly() {
      return this.readOnly;
    }
    /**
     * Set the editor readonly or readwrite
     *
     * @param {bool} readOnly - true by default
     */

  }, {
    key: "setReadOnly",
    value: function setReadOnly() {
      var readOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.readOnly = !!readOnly;
      if (this.readOnly) this.cancelLocalChanges();
    }
    /**
     * Remove all local changes  and go back to the server state
     */

  }, {
    key: "cancelLocalChanges",
    value: function cancelLocalChanges() {
      var currentState = this.getState && this.getState();

      if (currentState) {
        var rawDoc = lodash_get__WEBPACK_IMPORTED_MODULE_12___default()(currentState, 'collab$.unconfirmed[0].origin.docs[0]');
        var version = lodash_get__WEBPACK_IMPORTED_MODULE_12___default()(currentState, 'collab$.version');
        var sid = this.config['sessionId'];

        if (rawDoc && version && sid) {
          var doc = rawDoc.toJSON();
          this.emit('init', {
            doc: doc,
            version: version,
            sid: sid
          });
        }
      }
    }
  }]);

  return CollabProvider;
}();
/* harmony default export */ __webpack_exports__["default"] = (CollabProvider);

/***/ }),

/***/ "FPGZ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("J4zp");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);





function useNote(_ref) {
  var serviceClient = _ref.serviceClient,
      noteId = _ref.noteId;

  // `docId` is the id of the note for which we have a state.
  // `noteId` is the id of the requested note.
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(noteId),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState, 2),
      docId = _useState2[0],
      setDocId = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(true),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState3, 2),
      loading = _useState4[0],
      setLoading = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(undefined),
      _useState6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState5, 2),
      doc = _useState6[0],
      setDoc = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(undefined),
      _useState8 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState7, 2),
      title = _useState8[0],
      setTitle = _useState8[1];

  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    function loadNote() {
      return _loadNote.apply(this, arguments);
    }

    function _loadNote() {
      _loadNote = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var _doc;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                if (!loading) setLoading(true);
                _context.next = 4;
                return serviceClient.getDoc(docId);

              case 4:
                _doc = _context.sent;
                setTitle(_doc.title || '');
                setDoc(_doc);
                _context.next = 14;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                setTitle(false);
                setDoc(false); // eslint-disable-next-line no-console

                console.warn("Could not load note ".concat(docId));

              case 14:
                setLoading(false);

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 9]]);
      }));
      return _loadNote.apply(this, arguments);
    }

    if (docId !== noteId) {
      // reload if ever noteId changes
      setLoading(true);
      setTitle(undefined);
      setDoc(undefined);
      setDocId(noteId);
    } else if (serviceClient) {
      // load the note if needed
      if (!doc || doc.file.id !== docId) loadNote();
    }
  }, // `loading` and `doc` are willingly not included in the dependencies
  // eslint-disable-next-line
  [noteId, docId, setDocId, setLoading, serviceClient, setDoc, setTitle]);
  if (docId === noteId) return {
    loading: loading,
    title: title,
    doc: doc,
    setTitle: setTitle
  };else return {
    loading: true,
    title: undefined,
    doc: undefined,
    setTitle: setTitle
  };
}

/* harmony default export */ __webpack_exports__["default"] = (useNote);

/***/ }),

/***/ "G2JP":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var IsPublicContext = react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext(false);
/* harmony default export */ __webpack_exports__["default"] = (IsPublicContext);

/***/ }),

/***/ "Gwba":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react_Stack__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("X+Uv");
/* harmony import */ var cozy_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("H+Xc");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var components_notes_List_AppTitle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("Q1rQ");
/* harmony import */ var components_notes_List_List__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("txh9");
/* harmony import */ var components_notes_add__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("NOZu");
/* harmony import */ var components_notes_List_list_styl__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("RMII");
/* harmony import */ var components_notes_List_list_styl__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(components_notes_List_list_styl__WEBPACK_IMPORTED_MODULE_7__);
/* global cozy */









var shouldDisplayAddButton = function shouldDisplayAddButton(fetchStatus, notes) {
  return fetchStatus === 'loaded' && notes.length > 0;
};

var ListView = function ListView(_ref) {
  var isMobile = _ref.breakpoints.isMobile;
  var BarRight = cozy.bar.BarRight;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_client__WEBPACK_IMPORTED_MODULE_3__["Query"], {
    query: function query() {
      return Object(cozy_client__WEBPACK_IMPORTED_MODULE_3__["Q"])('io.cozy.notes');
    }
  }, function (_ref2) {
    var notes = _ref2.data,
        fetchStatus = _ref2.fetchStatus;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Stack__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: "u-mt-1 u-mt-0-m"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "".concat(components_notes_List_list_styl__WEBPACK_IMPORTED_MODULE_7___default.a.appHeader, " u-flex u-flex-justify-between u-flex-items-center")
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_notes_List_AppTitle__WEBPACK_IMPORTED_MODULE_4__["default"], null), !isMobile && shouldDisplayAddButton(fetchStatus, notes) && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_notes_add__WEBPACK_IMPORTED_MODULE_6__["default"], null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_notes_List_List__WEBPACK_IMPORTED_MODULE_5__["default"], {
      notes: notes,
      fetchStatus: fetchStatus
    })), isMobile && shouldDisplayAddButton(fetchStatus, notes) && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(BarRight, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_notes_add__WEBPACK_IMPORTED_MODULE_6__["AddMobile"], null)));
  });
};

/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react__WEBPACK_IMPORTED_MODULE_2__["withBreakpoints"])()(ListView));

/***/ }),

/***/ "H/IU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4BeY");
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("IaFt");
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-note-32_0b87f187ce7a65cb93dbf28b37a73b8d",
  "use": "icon-note-32_0b87f187ce7a65cb93dbf28b37a73b8d-usage",
  "viewBox": "0 0 32 32",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 32 32\" id=\"icon-note-32_0b87f187ce7a65cb93dbf28b37a73b8d\">\n<style type=\"text/css\">\n\t#icon-note-32_0b87f187ce7a65cb93dbf28b37a73b8d .st0{fill-rule:evenodd;clip-rule:evenodd;fill:#ACF5F7;}\n\t#icon-note-32_0b87f187ce7a65cb93dbf28b37a73b8d .st1{fill-rule:evenodd;clip-rule:evenodd;fill:#0DCBCF;}\n</style>\n<g transform=\"translate(2)\">\n\t<path class=\"st0\" d=\"M0,2c0-1.1,0.9-2,2-2h22c1.1,0,2,0.9,2,2v28c0,1.1-0.9,2-2,2H2c-1.1,0-2-0.9-2-2V2z\" />\n\t<path class=\"st1\" d=\"M6,8h14v2H6V8z M6,12h8v2H6V12z M6,16h14v2H6V16z M6,20h10v2H6V20z\" />\n</g>\n<g transform=\"translate(0 4)\">\n\t<path class=\"st1\" d=\"M1.5,0h2C4.3,0,5,0.7,5,1.5l0,0C5,2.3,4.3,3,3.5,3h-2C0.7,3,0,2.3,0,1.5l0,0C0,0.7,0.7,0,1.5,0z\" />\n\t<path class=\"st1\" d=\"M1.5,7h2C4.3,7,5,7.7,5,8.5l0,0C5,9.3,4.3,10,3.5,10h-2C0.7,10,0,9.3,0,8.5l0,0C0,7.7,0.7,7,1.5,7z\" />\n\t<path class=\"st1\" d=\"M1.5,14h2C4.3,14,5,14.7,5,15.5l0,0C5,16.3,4.3,17,3.5,17h-2C0.7,17,0,16.3,0,15.5l0,0C0,14.7,0.7,14,1.5,14z\" />\n\t<path class=\"st1\" d=\"M1.5,21h2C4.3,21,5,21.7,5,22.5l0,0C5,23.3,4.3,24,3.5,24h-2C0.7,24,0,23.3,0,22.5l0,0C0,21.7,0.7,21,1.5,21z\" />\n</g>\n<g>\n\t<path class=\"st1\" d=\"M31.4,18.4l-2.8-2.8c0.8-0.8,2-0.8,2.8,0S32.2,17.6,31.4,18.4z\" />\n\t<path class=\"st1\" d=\"M30.7,19.1L20.8,29l-2.5,0.9c-0.5,0.2-1.1-0.1-1.3-0.6c-0.1-0.2-0.1-0.5,0-0.7l0.9-2.5l9.9-9.9L30.7,19.1z\" />\n</g>\n</symbol>"
});
var result = _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "LiWt":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var cozy_ui_transpiled_react_MuiCozyTheme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("xIbs");
/* harmony import */ var cozy_ui_dist_cozy_ui_utils_min_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("llna");
/* harmony import */ var cozy_ui_dist_cozy_ui_utils_min_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cozy_ui_dist_cozy_ui_utils_min_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var cozy_ui_transpiled_react_stylesheet_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("/8/d");
/* harmony import */ var cozy_ui_transpiled_react_stylesheet_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cozy_ui_transpiled_react_stylesheet_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var cozy_sharing_dist_stylesheet_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("3FT0");
/* harmony import */ var cozy_sharing_dist_stylesheet_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cozy_sharing_dist_stylesheet_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("VxdY");
/* harmony import */ var styles__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styles__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("i8i4");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("JRPe");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("buk/");
/* harmony import */ var cozy_doctypes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("Le8U");
/* harmony import */ var cozy_doctypes__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(cozy_doctypes__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var cozy_sharing__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("UmWK");
/* harmony import */ var components_IsPublicContext__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("G2JP");
/* harmony import */ var lib_initFromDom__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("X3v2");
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
Object(react_intl__WEBPACK_IMPORTED_MODULE_7__["addLocaleData"])(locales.en.react);
Object(react_intl__WEBPACK_IMPORTED_MODULE_7__["addLocaleData"])(locales.fr.react);

var renderApp = function renderApp(client, isPublic) {
  var App = __webpack_require__("pL5B").default;

  Object(react_dom__WEBPACK_IMPORTED_MODULE_6__["render"])(react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_9__["I18n"], {
    lang: appLocale,
    dictRequire: function dictRequire(appLocale) {
      return __webpack_require__("/KVF")("./".concat(appLocale));
    }
  }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_7__["IntlProvider"], {
    locale: appLocale,
    messages: locales[appLocale].atlaskit
  }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(cozy_client__WEBPACK_IMPORTED_MODULE_8__["CozyProvider"], {
    client: client
  }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(cozy_ui_transpiled_react_MuiCozyTheme__WEBPACK_IMPORTED_MODULE_0__["default"], null, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(components_IsPublicContext__WEBPACK_IMPORTED_MODULE_12__["default"].Provider, {
    value: isPublic
  }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(cozy_sharing__WEBPACK_IMPORTED_MODULE_11__["default"], {
    doctype: "io.cozy.files",
    documentType: "Notes"
  }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(App, {
    isPublic: isPublic
  }))))))), document.querySelector('[role=application]'));
}; // initial rendering of the application


document.addEventListener('DOMContentLoaded', function () {
  var data = Object(lib_initFromDom__WEBPACK_IMPORTED_MODULE_13__["getDataset"])();
  var appIcon = Object(lib_initFromDom__WEBPACK_IMPORTED_MODULE_13__["getDataOrDefault"])(data.cozyIconPath, __webpack_require__("ZAKO"));
  var appNamePrefix = Object(lib_initFromDom__WEBPACK_IMPORTED_MODULE_13__["getDataOrDefault"])(data.cozyAppNamePrefix || manifest.name_prefix, '');
  var appName = Object(lib_initFromDom__WEBPACK_IMPORTED_MODULE_13__["getDataOrDefault"])(data.cozyAppName, manifest.name);
  var appSlug = Object(lib_initFromDom__WEBPACK_IMPORTED_MODULE_13__["getDataOrDefault"])(data.cozyAppSlug, manifest.slug);
  var appVersion = Object(lib_initFromDom__WEBPACK_IMPORTED_MODULE_13__["getDataOrDefault"])(data.cozyAppVersion, manifest.version);
  appLocale = Object(lib_initFromDom__WEBPACK_IMPORTED_MODULE_13__["getDataOrDefault"])(data.cozyLocale, 'en');
  var protocol = window.location ? window.location.protocol : 'https:';
  var shareCode = Object(lib_initFromDom__WEBPACK_IMPORTED_MODULE_13__["getPublicSharecode"])();
  var token = shareCode || data.cozyToken;
  var isPublic = shareCode || !token || token == ''; // initialize the client to interact with the cozy stack

  var client = new cozy_client__WEBPACK_IMPORTED_MODULE_8___default.a({
    uri: "".concat(protocol, "//").concat(data.cozyDomain),
    token: token,
    appMetadata: {
      slug: appSlug,
      version: appVersion
    }
  });

  if (!cozy_doctypes__WEBPACK_IMPORTED_MODULE_10__["Document"].cozyClient) {
    cozy_doctypes__WEBPACK_IMPORTED_MODULE_10__["Document"].registerClient(client);
  }

  if (!isPublic) {
    // initialize the bar, common of all applications, it allows
    // platform features like apps navigation without doing anything
    // necessary to initialize the bar with the correct React instance
    window.React = react__WEBPACK_IMPORTED_MODULE_5___default.a;
    window.ReactDOM = react_dom__WEBPACK_IMPORTED_MODULE_6___default.a;
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
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("MVZn");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var components_notes_editor_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("AIob");
/* harmony import */ var components_notes_editor_loading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("VjyH");
/* harmony import */ var components_notes_editor_loading_error__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("YPHs");
/* harmony import */ var components_notes_sharing__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("8i3i");
/* harmony import */ var components_notes_saving_indicator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("czPt");
/* harmony import */ var components_notes_back_from_editing__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("nKHk");
/* harmony import */ var components_IsPublicContext__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("G2JP");
/* harmony import */ var hooks_useNote__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("FPGZ");
/* harmony import */ var hooks_useServiceClient__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("B44c");
/* harmony import */ var hooks_useCollabProvider__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("h5QC");
/* harmony import */ var hooks_useTitleChanges__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("ld+i");
/* harmony import */ var hooks_useForceSync__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("nMfT");
/* harmony import */ var hooks_useReturnUrl__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("k02W");
/* harmony import */ var hooks_useUser__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("ZugS");
/* harmony import */ var lib_debug__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("/RjM");
/* harmony import */ var cozy_ui_react_hooks_useConfirmExit__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("5ViJ");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("buk/");




















var Editor = Object(cozy_client__WEBPACK_IMPORTED_MODULE_2__["withClient"])(function (props) {
  // base parameters
  var cozyClient = props.client,
      noteId = props.noteId,
      readOnly = props.readOnly;

  var _useI18n = Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_19__["useI18n"])(),
      t = _useI18n.t;

  var bannerRef = Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])(); // where to display banners
  // plugins and config

  var isPublic = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(components_IsPublicContext__WEBPACK_IMPORTED_MODULE_9__["default"]);

  var _useUser = Object(hooks_useUser__WEBPACK_IMPORTED_MODULE_16__["default"])({
    userName: props.userName,
    cozyClient: cozyClient
  }),
      userName = _useUser.userName,
      userId = _useUser.userId;

  var serviceClient = Object(hooks_useServiceClient__WEBPACK_IMPORTED_MODULE_11__["default"])({
    userId: userId,
    userName: userName,
    cozyClient: cozyClient
  });

  var _useNote = Object(hooks_useNote__WEBPACK_IMPORTED_MODULE_10__["default"])({
    serviceClient: serviceClient,
    noteId: noteId
  }),
      loading = _useNote.loading,
      title = _useNote.title,
      doc = _useNote.doc,
      setTitle = _useNote.setTitle;

  var returnUrl = Object(hooks_useReturnUrl__WEBPACK_IMPORTED_MODULE_15__["default"])({
    returnUrl: props.returnUrl,
    cozyClient: cozyClient,
    doc: doc
  });
  var collabProvider = Object(hooks_useCollabProvider__WEBPACK_IMPORTED_MODULE_12__["default"])({
    noteId: noteId,
    serviceClient: serviceClient,
    doc: doc
  }); // callbacks

  var _useTitleChanges = Object(hooks_useTitleChanges__WEBPACK_IMPORTED_MODULE_13__["default"])({
    noteId: noteId,
    title: title,
    setTitle: setTitle,
    serviceClient: serviceClient
  }),
      onLocalTitleChange = _useTitleChanges.onLocalTitleChange;

  var _useForceSync = Object(hooks_useForceSync__WEBPACK_IMPORTED_MODULE_14__["default"])({
    doc: doc,
    collabProvider: collabProvider
  }),
      forceSync = _useForceSync.forceSync,
      emergencySync = _useForceSync.emergencySync; // when leaving the component or changing doc


  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    return forceSync;
  }, [noteId, doc, forceSync]); // when quitting the webpage

  var activate = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function () {
    return collabProvider.isDirty();
  }, [collabProvider]);

  var _useConfirmExit = Object(cozy_ui_react_hooks_useConfirmExit__WEBPACK_IMPORTED_MODULE_18__["default"])({
    activate: activate,
    onLeave: emergencySync,
    title: t('Notes.Editor.exit_confirmation_title'),
    message: t('Notes.Editor.exit_confirmation_message'),
    leaveLabel: t('Notes.Editor.exit_confirmation_leave'),
    cancelLabel: t('Notes.Editor.exit_confirmation_cancel')
  }),
      exitConfirmationModal = _useConfirmExit.exitConfirmationModal,
      requestToLeave = _useConfirmExit.requestToLeave;

  Object(lib_debug__WEBPACK_IMPORTED_MODULE_17__["useDebugValue"])('client', cozyClient);
  Object(lib_debug__WEBPACK_IMPORTED_MODULE_17__["useDebugValue"])('notes.service', serviceClient);
  Object(lib_debug__WEBPACK_IMPORTED_MODULE_17__["useDebugValue"])('notes.collabProvider', collabProvider);
  Object(lib_debug__WEBPACK_IMPORTED_MODULE_17__["useDebugValue"])('notes.channel', collabProvider && collabProvider.channel);
  Object(lib_debug__WEBPACK_IMPORTED_MODULE_17__["useDebugValue"])('notes.noteId', noteId);
  Object(lib_debug__WEBPACK_IMPORTED_MODULE_17__["useDebugValue"])('notes.doc', doc && _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, doc.doc, {
    version: doc.version
  }));
  Object(lib_debug__WEBPACK_IMPORTED_MODULE_17__["useDebugValue"])('notes.file', doc && doc.file);
  Object(lib_debug__WEBPACK_IMPORTED_MODULE_17__["useDebugValue"])('notes.returnUrl', returnUrl); // rendering

  if (loading) {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(components_notes_editor_loading__WEBPACK_IMPORTED_MODULE_4__["default"], null);
  } else if (doc) {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(components_notes_editor_view__WEBPACK_IMPORTED_MODULE_3__["default"], {
      bannerRef: bannerRef,
      readOnly: readOnly,
      onTitleChange: onLocalTitleChange,
      onTitleBlur: emergencySync,
      collabProvider: collabProvider,
      defaultTitle: t('Notes.Editor.title_placeholder'),
      defaultValue: _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, doc.doc, {
        version: doc.version
      }),
      title: title && title.length > 0 ? title : undefined,
      leftComponent: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(components_notes_back_from_editing__WEBPACK_IMPORTED_MODULE_8__["default"], {
        returnUrl: returnUrl,
        file: doc.file,
        requestToLeave: requestToLeave
      }),
      rightComponent: !isPublic && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(components_notes_sharing__WEBPACK_IMPORTED_MODULE_6__["default"], {
        file: doc.file
      })
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(components_notes_saving_indicator__WEBPACK_IMPORTED_MODULE_7__["default"], {
      collabProvider: collabProvider,
      bannerRef: bannerRef
    }), exitConfirmationModal);
  } else {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(components_notes_editor_loading_error__WEBPACK_IMPORTED_MODULE_5__["default"], {
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddMobile", function() { return AddMobile; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("J4zp");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("KXWi");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_BarButton__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("780l");
/* harmony import */ var lib_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("snnE");










var Add = function Add(_ref) {
  var t = _ref.t,
      className = _ref.className,
      client = _ref.client;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(false),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState, 2),
      isWorking = _useState2[0],
      setIsWorking = _useState2[1];

  var handleClick = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(
  /*#__PURE__*/
  _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
    var _ref3, doc;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            setIsWorking(true);
            _context.next = 3;
            return Object(lib_utils__WEBPACK_IMPORTED_MODULE_8__["createNoteDocument"])(client);

          case 3:
            _ref3 = _context.sent;
            doc = _ref3.data;
            window.location.href = Object(lib_utils__WEBPACK_IMPORTED_MODULE_8__["generateReturnUrlToNotesIndex"])(doc);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  })), [client]);
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_5__["default"], {
    onClick: handleClick,
    type: "submit",
    busy: isWorking,
    icon: "plus",
    label: t('Notes.Add.add_note'),
    extension: "narrow",
    className: className
  });
};

var AddMobile = Object(cozy_client__WEBPACK_IMPORTED_MODULE_4__["withClient"])(function (_ref4) {
  var client = _ref4.client;
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(cozy_ui_react_BarButton__WEBPACK_IMPORTED_MODULE_7__["default"], {
    onClick:
    /*#__PURE__*/
    _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
      var _ref6, doc;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return Object(lib_utils__WEBPACK_IMPORTED_MODULE_8__["createNoteDocument"])(client);

            case 2:
              _ref6 = _context2.sent;
              doc = _ref6.data;
              window.location.href = Object(lib_utils__WEBPACK_IMPORTED_MODULE_8__["generateReturnUrlToNotesIndex"])(doc);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })),
    icon: "plus",
    className: "u-c-pointer"
  });
});
/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_6__["translate"])()(Object(cozy_client__WEBPACK_IMPORTED_MODULE_4__["withClient"])(Add)));

/***/ }),

/***/ "Q1rQ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react_Text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("kyGY");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("H+Xc");



 //We don't not display the Title this way in Mobile.
//We use Bar.centrer

var AppTitle = function AppTitle(_ref) {
  var t = _ref.t,
      isMobile = _ref.breakpoints.isMobile;
  return !isMobile && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Text__WEBPACK_IMPORTED_MODULE_1__["MainTitle"], null, t('Notes.List.latest_notes'));
};

var ConnectedAppTitle = Object(cozy_ui_react__WEBPACK_IMPORTED_MODULE_3__["withBreakpoints"])()(Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_2__["translate"])()(AppTitle));
/* harmony default export */ __webpack_exports__["default"] = (ConnectedAppTitle);

/***/ }),

/***/ "Q2Eh":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"note-article":"note-article--2yQdC","banner":"banner--1nSEd","title":"title--2DQ8I","titleInput":"titleInput--2ERlh"};

/***/ }),

/***/ "R3/7":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"sharing-button":"sharing-button--nzFli"};

/***/ }),

/***/ "RMII":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"empty":"empty--FqnXy","appHeader":"appHeader--2ilS0","tableSpecialRow":"tableSpecialRow--4oekp","tableCellEmpty":"tableCellEmpty--21fZ1","tableCellName":"tableCellName--2Jak9","tableCell":"tableCell--3-jDP","tableRow":"tableRow--3SicR"};

/***/ }),

/***/ "VjyH":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("V2U0");



function EditorLoading() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "u-mv-3"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_1__["default"], {
    size: "xxlarge",
    middle: true
  }));
}

/* harmony default export */ __webpack_exports__["default"] = (EditorLoading);

/***/ }),

/***/ "VxdY":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "X3v2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataset", function() { return getDataset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataOrDefault", function() { return getDataOrDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPublicSharecode", function() { return getPublicSharecode; });
/* harmony import */ var url_search_params_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("dasq");
/* harmony import */ var url_search_params_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(url_search_params_polyfill__WEBPACK_IMPORTED_MODULE_0__);

var getDataset = function getDataset() {
  var root = document.querySelector('[role=application]');
  return root.dataset;
}; // return a defaultData if the template hasn't been replaced by cozy-stack

var getDataOrDefault = function getDataOrDefault(toTest, defaultData) {
  var templateRegex = /^\{\{\.[a-zA-Z]*\}\}$/; // {{.Example}}

  return templateRegex.test(toTest) ? defaultData : toTest;
};
var getPublicSharecode = function getPublicSharecode() {
  var search = new URLSearchParams(window.location.search);
  return search.get('sharecode');
};

/***/ }),

/***/ "YPHs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("H+Xc");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("buk/");




function EditorLoadingError(props) {
  var t = props.t,
      returnUrl = props.returnUrl;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react__WEBPACK_IMPORTED_MODULE_1__["Empty"], {
    icon: 'cross-small',
    title: t("Error.loading_error_title"),
    text: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "u-mb-half",
      dangerouslySetInnerHTML: {
        __html: returnUrl ? t("Error.loading_error_text_returnUrl", {
          url: returnUrl
        }) : t("Error.loading_error_text_noReturnUrl")
      }
    })
  });
}

/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_2__["translate"])()(EditorLoadingError));

/***/ }),

/***/ "ZAKO":
/***/ (function(module, exports) {

module.exports = "/img/icon.svg";

/***/ }),

/***/ "Zlyp":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var components_notes_List__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("Gwba");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "List", function() { return components_notes_List__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var components_notes_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("Lpk5");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Editor", function() { return components_notes_editor__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var components_notes_add__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("NOZu");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Add", function() { return components_notes_add__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var components_notes_sharing__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("8i3i");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Sharing", function() { return components_notes_sharing__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var components_notes_unshared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("hxs5");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Unshared", function() { return components_notes_unshared__WEBPACK_IMPORTED_MODULE_4__["default"]; });





 //



/***/ }),

/***/ "ZugS":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var components_IsPublicContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("G2JP");
/* harmony import */ var lib_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("snnE");




function useUser(_ref) {
  var providedUserName = _ref.userName,
      cozyClient = _ref.cozyClient;
  var isPublic = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(components_IsPublicContext__WEBPACK_IMPORTED_MODULE_1__["default"]);
  var userName = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    return providedUserName || Object(lib_utils_js__WEBPACK_IMPORTED_MODULE_2__["getUserNameFromUrl"])() || (isPublic ? '?' : Object(lib_utils_js__WEBPACK_IMPORTED_MODULE_2__["getShortNameFromClient"])(cozyClient));
  }, [cozyClient, providedUserName]);
  var userId = userName;
  return {
    userId: userId,
    userName: userName
  };
}

/* harmony default export */ __webpack_exports__["default"] = (useUser);

/***/ }),

/***/ "czPt":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("J4zp");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Text__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("kyGY");
/* harmony import */ var cozy_ui_react_hooks_usePeriodicRender__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("h+bj");
/* harmony import */ var cozy_ui_react_hooks_useEventListener__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("KXVJ");
/* harmony import */ var cozy_ui_react_hooks_useBreakpoints__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("1I/2");
/* harmony import */ var components_notes_saving_indicator_styl__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("84gJ");
/* harmony import */ var components_notes_saving_indicator_styl__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(components_notes_saving_indicator_styl__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var lodash_throttle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("DzJC");
/* harmony import */ var lodash_throttle__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash_throttle__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var lib_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("snnE");
/* harmony import */ var components_notes_offline_indicator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("nwX3");










 // constants

var sec = 1000;
var keepOfflineOpenFor = 5 * sec;
var outOfSyncAfter = 30 * sec;
/**
 * @typedef {object} SavingIndicatorProps
 * @property {CollabProviderDate} collabProvider
 * @property {Ref} bannerRef - Where to display banners
 */

/**
 * Displays a saving indicator in the bottom right
 * and an offline indicator if needed
 *
 * @param {SavingIndicatorProps} props
 */

function SavingIndicator(props) {
  var _useI18n = Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_2__["useI18n"])(),
      t = _useI18n.t;

  var now = new Date();

  var _useBreakpoints = Object(cozy_ui_react_hooks_useBreakpoints__WEBPACK_IMPORTED_MODULE_6__["default"])(),
      isMobile = _useBreakpoints.isMobile;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(undefined),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      setLastChange = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(undefined),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState3, 2),
      offlineSince = _useState4[0],
      setOfflineSince = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(window && window.navigator && window.navigator.onLine === false),
      _useState6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState5, 2),
      isNavigatorOffline = _useState6[0],
      setIsNavigatorOffline = _useState6[1];

  var setNavigatorOffline = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function () {
    return setIsNavigatorOffline(true);
  }, [setIsNavigatorOffline]);
  var setNavigatorOnline = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function () {
    return setIsNavigatorOffline(false);
  }, [setIsNavigatorOffline]);
  Object(cozy_ui_react_hooks_useEventListener__WEBPACK_IMPORTED_MODULE_5__["default"])(window, 'online', setNavigatorOnline);
  Object(cozy_ui_react_hooks_useEventListener__WEBPACK_IMPORTED_MODULE_5__["default"])(window, 'offline', setNavigatorOffline);
  var collabProvider = props.collabProvider;
  var isDirty = collabProvider.isDirty();
  var dirtySince = collabProvider.getDirtySince();
  var lastSave = collabProvider.getLastSaveOrSync();
  var message;
  var savedAge = now - (lastSave || now);
  var dirtyAge = now - dirtySince;
  var outOfSync = isDirty && dirtyAge && dirtyAge > outOfSyncAfter;

  var _relativeAge = Object(lib_utils__WEBPACK_IMPORTED_MODULE_9__["relativeAge"])(savedAge),
      key = _relativeAge.key,
      time = _relativeAge.time,
      interval = _relativeAge.interval;

  if (isDirty) {
    if (outOfSync) {
      message = t("Notes.SavingIndicator.out_of_sync.".concat(key), {
        time: time
      });
    } else if (dirtyAge > 5 * sec) {
      message = t('Notes.SavingIndicator.still_saving');
    } else {
      message = t('Notes.SavingIndicator.saving');
    }
  } else {
    message = t("Notes.SavingIndicator.saved.".concat(key), {
      time: time
    });
  }

  var isOffline = isNavigatorOffline || outOfSync;
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    setOfflineSince(isOffline && now);
  }, [isOffline]);
  var offlineAge = isOffline && offlineSince && now - offlineSince;
  var isOfflineIndicatorOpen = !offlineSince || offlineAge && offlineAge < keepOfflineOpenFor;
  var offlineInterval = isOfflineIndicatorOpen && offlineSince && offlineSince + keepOfflineOpenFor - now;
  Object(cozy_ui_react_hooks_usePeriodicRender__WEBPACK_IMPORTED_MODULE_4__["default"])(offlineInterval && Math.min(offlineInterval, interval) || interval);
  var onCollabStateChange = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(lodash_throttle__WEBPACK_IMPORTED_MODULE_8___default()(function () {
    return setLastChange(new Date());
  }, 200), [setLastChange]);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    collabProvider.on('collab-state-change', onCollabStateChange);
  }, [collabProvider, onCollabStateChange]);
  var text = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Text__WEBPACK_IMPORTED_MODULE_3__["Text"], {
    className: components_notes_saving_indicator_styl__WEBPACK_IMPORTED_MODULE_7___default.a['saving-indicator']
  }, message);

  if (isOffline) {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(components_notes_offline_indicator__WEBPACK_IMPORTED_MODULE_10__["default"], {
      open: isOfflineIndicatorOpen,
      bannerRef: props.bannerRef
    }, text);
  } else {
    if (isMobile) {
      return null;
    } else {
      return text;
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (SavingIndicator);

/***/ }),

/***/ "ereM":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceClient", function() { return ServiceClient; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("MVZn");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("W8MJ");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var cozy_realtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("oBqo");
/* harmony import */ var cozy_realtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(cozy_realtime__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _schema__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("hmtS");






 // Warning: sessionID on the server, sessionId on the client

/**
 * This is the communication layer with the server
 */

var ServiceClient =
/*#__PURE__*/
function () {
  function ServiceClient(config) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, ServiceClient);

    var userId = config.userId,
        cozyClient = config.cozyClient,
        schema = config.schema,
        realtime = config.realtime;
    var now = new Date();
    var sessionSuffix = now.getTime() + '.' + now.getMilliseconds() + '.' + Math.random();
    this.sessionId = userId + ':' + sessionSuffix;
    this.userId = this.getUserId(userId);
    this.cozyClient = cozyClient;
    this.stackClient = cozyClient.getStackClient();
    this.schema = schema;
    this.onRealtimeEvent = this.onRealtimeEvent.bind(this);
    this.realtime = realtime || new cozy_realtime__WEBPACK_IMPORTED_MODULE_5___default.a({
      client: cozyClient
    });
    this.resetCallbacks();
  }
  /**
   * Remove event listeners
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(ServiceClient, [{
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
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_2___default()({
        sessionID: data.sessionId || this.sessionId
      }, data);
    }
    /**
     * Convert data from the server format to the client format
     */

  }, {
    key: "server2client",
    value: function server2client(data) {
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_2___default()({
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
      var _create = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
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
                      schema: schema || this.schema || _schema__WEBPACK_IMPORTED_MODULE_6__["schemaOrdered"]
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
     * Force the note to be written to the io.cozy.files now
     * @param {uuid} noteId - note id
     */

  }, {
    key: "sync",
    value: function () {
      var _sync = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(noteId) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.stackClient.fetchJSON('POST', this.path(noteId, 'sync'));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function sync(_x3) {
        return _sync.apply(this, arguments);
      };
    }()
    /**
     * Change the title of a note
     * @param {uuid} noteId
     * @param {string} title
     */

  }, {
    key: "setTitle",
    value: function () {
      var _setTitle = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(noteId, title) {
        var titleDoc;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                titleDoc = {
                  data: {
                    type: 'io.cozy.notes.documents',
                    id: noteId,
                    attributes: this.client2server({
                      title: title
                    })
                  }
                };
                _context3.next = 3;
                return this.stackClient.fetchJSON('PUT', this.path(noteId, 'title'), titleDoc);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function setTitle(_x4, _x5) {
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
        console.warn('Event not managed', type, id, this.callbacks);
      }
    }
    /**
     * Join a doc - listen to realtime events for this doc
     * @param {uui} noteId
     */

  }, {
    key: "join",
    value: function () {
      var _join = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(noteId) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return Promise.all([this.realtime.subscribe(null, // all events
                'io.cozy.notes.events', noteId, this.onRealtimeEvent)]);

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function join(_x6) {
        return _join.apply(this, arguments);
      };
    }()
    /**
     * Listen for new steps from the server
     * @param {uuid} noteId
     * @param {Function} callback
     */

  }, {
    key: "onStepsCreated",
    value: function () {
      var _onStepsCreated = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5(noteId, callback) {
        var _this = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.setCallback('io.cozy.notes.steps', noteId, function (data) {
                  return callback(_this.server2client(data));
                });

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function onStepsCreated(_x7, _x8) {
        return _onStepsCreated.apply(this, arguments);
      };
    }()
    /**
     * Listen for new cursors positions from the server
     * @param {uuid} noteId
     * @param {Function} callback
     */

  }, {
    key: "onTelepointerUpdated",
    value: function () {
      var _onTelepointerUpdated = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee6(noteId, callback) {
        var _this2 = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this.setCallback('io.cozy.notes.telepointers', noteId, function (data) {
                  return callback(_this2.server2client(data));
                });

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function onTelepointerUpdated(_x9, _x10) {
        return _onTelepointerUpdated.apply(this, arguments);
      };
    }()
    /**
     * Listen for title changes in the document
     * @param {uuid} noteId
     * @param {Function} callback - function that get a title as paramerer
     */

  }, {
    key: "onTitleUpdated",
    value: function () {
      var _onTitleUpdated = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee7(noteId, callback) {
        var _this3 = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                this.setCallback('io.cozy.notes.documents', noteId, function (doc) {
                  return !doc.sessionID || doc.sessionID != _this3.sessionId ? callback(doc.title) : null;
                });

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function onTitleUpdated(_x11, _x12) {
        return _onTitleUpdated.apply(this, arguments);
      };
    }()
    /**
     * Get the full document for a note
     * @param {uuid} noteId
     */

  }, {
    key: "getDoc",
    value: function () {
      var _getDoc = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee8(noteId) {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.stackClient.fetchJSON('GET', this.path(noteId));

              case 2:
                res = _context8.sent;
                return _context8.abrupt("return", {
                  doc: res.data.attributes.metadata.content,
                  version: res.data.attributes.metadata.version,
                  title: res.data.attributes.metadata.title,
                  updatedAt: new Date(res.data.attributes.updated_at),
                  file: res.data
                });

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function getDoc(_x13) {
        return _getDoc.apply(this, arguments);
      };
    }()
    /**
     * Push new local steps to the server
     * @param {uuid} noteId
     * @param {integer} version
     * @param {Object[]} steps
     */

  }, {
    key: "pushSteps",
    value: function () {
      var _pushSteps = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee9(noteId, version, steps) {
        var _this4 = this;

        var options, stepsDoc;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
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

                _context9.next = 4;
                return this.stackClient.fetchJSON('PATCH', this.path(noteId), stepsDoc, options);

              case 4:
                return _context9.abrupt("return", null);

              case 5:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      return function pushSteps(_x14, _x15, _x16) {
        return _pushSteps.apply(this, arguments);
      };
    }()
    /**
     * Fetch steps from the server since the provided versions
     * @param {uuid} noteId
     * @param {integer} version
     * @returns {{version, steps}|{doc, version}}
     * If the server doesn't have all requested steps in memory,
     * it could returns the whole document in its current version
     */

  }, {
    key: "getSteps",
    value: function () {
      var _getSteps = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee10(noteId, version) {
        var _this5 = this;

        var res, steps, _version, response, data, meta, doc, ver, ev, realtimeDoc;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                _context10.next = 3;
                return this.stackClient.fetchJSON('GET', "".concat(this.path(noteId, 'steps'), "?Version=").concat(version));

              case 3:
                res = _context10.sent;

                if (!(res.data.length == 0)) {
                  _context10.next = 8;
                  break;
                }

                return _context10.abrupt("return", {
                  steps: [],
                  version: version
                });

              case 8:
                steps = res.data.map(function (step) {
                  return _this5.server2client(step.attributes);
                });
                _version = res.data[res.data.length - 1].attributes.version;
                return _context10.abrupt("return", {
                  version: _version,
                  steps: steps
                });

              case 11:
                _context10.next = 28;
                break;

              case 13:
                _context10.prev = 13;
                _context10.t0 = _context10["catch"](0);
                response = _context10.t0.response;
                data = _context10.t0.reason && _context10.t0.reason.data;
                meta = data && data.attributes && data.attributes.metadata;
                doc = meta && meta.content;
                ver = meta && meta.version;

                if (!(response.status == 412 && doc && ver)) {
                  _context10.next = 27;
                  break;
                }

                // server does not have all steps we try to fetch
                // it responds with a full document and a title
                ev = 'io.cozy.notes.documents';
                realtimeDoc = {
                  _id: noteId,
                  _type: 'io.cozy.notes.events',
                  doctype: ev,
                  title: meta.title
                };

                if (this.callbacks[ev] && this.callbacks[ev][noteId]) {
                  this.callbacks[ev][noteId](realtimeDoc);
                }

                return _context10.abrupt("return", {
                  doc: doc,
                  version: ver
                });

              case 27:
                throw _context10.t0;

              case 28:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this, [[0, 13]]);
      }));

      return function getSteps(_x17, _x18) {
        return _getSteps.apply(this, arguments);
      };
    }()
    /**
     * Push new local cursor position to the server
     * @param {uuid} noteId
     * @param {Object} data
     */

  }, {
    key: "pushTelepointer",
    value: function () {
      var _pushTelepointer = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee11(noteId, data) {
        var telepointerDoc;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                telepointerDoc = {
                  data: {
                    type: 'io.cozy.notes.telepointers',
                    id: noteId,
                    attributes: this.client2server(data)
                  }
                };
                return _context11.abrupt("return", this.stackClient.fetchJSON('PUT', this.path(noteId, 'telepointer'), telepointerDoc));

              case 2:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      return function pushTelepointer(_x19, _x20) {
        return _pushTelepointer.apply(this, arguments);
      };
    }()
  }]);

  return ServiceClient;
}();
/* harmony default export */ __webpack_exports__["default"] = (ServiceClient);

/***/ }),

/***/ "es/D":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("J4zp");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var cozy_doctypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("Le8U");
/* harmony import */ var cozy_doctypes__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(cozy_doctypes__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lib_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("snnE");






var notesFolderDocument = {
  _type: 'io.cozy.apps',
  _id: 'io.cozy.apps/notes'
};

var useReferencedFolderForNote = function useReferencedFolderForNote(client) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(Object(lib_utils__WEBPACK_IMPORTED_MODULE_5__["getDriveLink"])(client)),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState, 2),
      notesFolder = _useState2[0],
      setNotesFolder = _useState2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    var fetchData =
    /*#__PURE__*/
    function () {
      var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var referencedFolder, folderUrl;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return cozy_doctypes__WEBPACK_IMPORTED_MODULE_4__["CozyFolder"].getReferencedFolders(notesFolderDocument);

              case 3:
                referencedFolder = _context.sent;
                folderUrl = Object(lib_utils__WEBPACK_IMPORTED_MODULE_5__["getDriveLink"])(client, referencedFolder[0]._id);
                setNotesFolder(folderUrl);
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                setNotesFolder(Object(lib_utils__WEBPACK_IMPORTED_MODULE_5__["getDriveLink"])(client));

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      return function fetchData() {
        return _ref.apply(this, arguments);
      };
    }();

    fetchData();
  }, [client]);
  return {
    notesFolder: notesFolder
  };
};

/* harmony default export */ __webpack_exports__["default"] = (useReferencedFolderForNote);

/***/ }),

/***/ "h5QC":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lib_collab_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("DrVd");


/**
 * @typedef {object} useCollabProviderParams
 * @property {integer|undefined} docVersion - current version of the doc
 * @property {string} noteId - uuid of the io.cozy.files for the note
 * @property {ServiceClient|undefined} serviceClient - ServiceClient instance
 */

/**
 * Initialize a CollabProvider
 *
 * @param {useCollabProviderParams} params
 * @returns {CollabProvider|undefined}
 */

function useCollabProvider(_ref) {
  var doc = _ref.doc,
      noteId = _ref.noteId,
      serviceClient = _ref.serviceClient;
  return Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    var version = doc && doc.version;
    var updatedAt = doc && doc.updatedAt;

    if (serviceClient && doc !== undefined) {
      var provider = new lib_collab_provider__WEBPACK_IMPORTED_MODULE_1__["default"]({
        version: version,
        noteId: noteId,
        updatedAt: updatedAt
      }, serviceClient);
      return provider;
    }
  }, [noteId, doc, serviceClient]);
}

/* harmony default export */ __webpack_exports__["default"] = (useCollabProvider);

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

/***/ "hxs5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("H+Xc");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("buk/");



var Unshared = Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_2__["translate"])()(function (_ref) {
  var t = _ref.t;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react__WEBPACK_IMPORTED_MODULE_1__["Empty"], {
    icon: 'unlink',
    title: t("Error.unshared_title"),
    text: t("Error.unshared_text")
  });
});
/* harmony default export */ __webpack_exports__["default"] = (Unshared);

/***/ }),

/***/ "k02W":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var components_IsPublicContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("G2JP");
/* harmony import */ var lib_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("snnE");




function useReturnUrl(_ref) {
  var returnUrl = _ref.returnUrl,
      cozyClient = _ref.cozyClient,
      doc = _ref.doc;
  var isPublic = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(components_IsPublicContext__WEBPACK_IMPORTED_MODULE_1__["default"]);
  return Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    if (returnUrl !== undefined) {
      return returnUrl;
    } else if (doc) {
      return Object(lib_utils_js__WEBPACK_IMPORTED_MODULE_2__["getParentFolderLink"])(cozyClient, doc.file);
    } else if (!isPublic) {
      return '/';
    } else {
      return undefined;
    }
  }, [returnUrl, doc, isPublic, cozyClient]);
}

/* harmony default export */ __webpack_exports__["default"] = (useReturnUrl);

/***/ }),

/***/ "l0Ks":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Empty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("GoJ1");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var components_notes_add__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("NOZu");
/* harmony import */ var assets_icons_icon_note_empty_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("tIF1");
/* harmony import */ var hooks_useReferencedFolderForNote__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("es/D");
/* harmony import */ var cozy_ui_react_AppLinker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("sCMN");









var EmptyComponent = function EmptyComponent(_ref) {
  var t = _ref.t,
      client = _ref.client;

  var _useReferencedFolderF = Object(hooks_useReferencedFolderForNote__WEBPACK_IMPORTED_MODULE_6__["default"])(client),
      notesFolder = _useReferencedFolderF.notesFolder;

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "empty"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Empty__WEBPACK_IMPORTED_MODULE_2__["default"], {
    id: "empty",
    icon: assets_icons_icon_note_empty_svg__WEBPACK_IMPORTED_MODULE_5__["default"],
    title: t('Notes.Empty.welcome'),
    text: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_AppLinker__WEBPACK_IMPORTED_MODULE_7__["default"], {
      href: notesFolder,
      slug: "drive"
    }, function (_ref2) {
      var href = _ref2.href,
          onClick = _ref2.onClick;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "u-mb-half"
      }, t('Notes.Empty.after_created'), ' ', react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: href,
        onClick: onClick
      }, "Cozy Drive"), ".");
    })
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_notes_add__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: "u-mt-1"
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__["translate"])()(Object(cozy_client__WEBPACK_IMPORTED_MODULE_3__["withClient"])(EmptyComponent)));

/***/ }),

/***/ "ld+i":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lib_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("snnE");



function useTitleChanges(_ref) {
  var noteId = _ref.noteId,
      title = _ref.title,
      setTitle = _ref.setTitle,
      serviceClient = _ref.serviceClient;
  // Title change because of a local change from the editor
  var onLocalTitleChange = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(serviceClient ? function (e) {
    var modifiedTitle = e.target.value;

    if (title != modifiedTitle) {
      setTitle(modifiedTitle);
      serviceClient.setTitle(noteId, modifiedTitle);
    }
  } : function () {}, [noteId, title, setTitle, serviceClient]); // Title change because of a remote change from the stack

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    serviceClient && serviceClient.onTitleUpdated(noteId, function (modifiedTitle) {
      if (title != modifiedTitle) {
        setTitle(modifiedTitle);
      }
    });
  }, [title, setTitle, serviceClient, noteId]); // whatever the change is, keep the tab title updated

  var appFullName = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(lib_utils_js__WEBPACK_IMPORTED_MODULE_1__["getAppFullName"], []);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    document.title = title && title != '' ? "".concat(title, " - ").concat(appFullName) : appFullName;
  }, [appFullName, title]);
  return {
    onLocalTitleChange: onLocalTitleChange
  };
}

/* harmony default export */ __webpack_exports__["default"] = (useTitleChanges);

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
  allowPanel: true,
  allowCodeBlocks: false,
  allowHelpDialog: false,
  allowBlockTypes: {
    exclude: ['codeBlocks']
  }
};
/* harmony default export */ __webpack_exports__["default"] = (editorConfig);

/***/ }),

/***/ "nKHk":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BackFromEditing; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lwsE");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("W8MJ");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("KXWi");
/* harmony import */ var components_IsPublicContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("G2JP");
/* harmony import */ var cozy_ui_react_AppLinker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("sCMN");
/* harmony import */ var lib_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("snnE");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_7__);








/**
 * Simple fake event to detect if the handler
 * tries to prevent the default action
 */

var FakeEvent =
/*#__PURE__*/
function () {
  function FakeEvent() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, FakeEvent);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(FakeEvent, [{
    key: "preventDefault",
    value: function preventDefault() {
      this.prevented = true;
    }
  }]);

  return FakeEvent;
}();
/**
 * Create a click handler for a link or button
 *
 * Always call requestToLeave, with a function
 * that should mimic the original behaviour (onClick +  href)
 * @param {function} requestToLeave - as  in useConfirmExit in cozy-ui
 * @param {string} href - URL to go to
 * @param {function} onClick -  regular onClick handler for the button or link
 */


function createOnClick(requestToLeave, href, onClick) {
  var go = function go() {
    var ev = new FakeEvent();
    if (onClick) onClick(ev);
    if (!ev.prevented) document.location = href;
  };

  return function (ev) {
    ev.preventDefault();
    requestToLeave(go);
  };
}
/**
 * React component, draws a button to go back, outside of the editor
 *
 * Default is going back to the root of the app if in a private view
 * or do nothing if in a public view
 * @param {string|null} returnUrl - URL to go back to
 * @param {object|null} file - io.cozy.file object to generate a folder link
 * @param {function|null} requestToLeave - function, if present, it should
 * wrap any regular action that should have taken place when clicking the button
 */


function BackFromEditing(_ref) {
  var returnUrl = _ref.returnUrl,
      file = _ref.file,
      requestToLeave = _ref.requestToLeave;
  var isPublic = Object(react__WEBPACK_IMPORTED_MODULE_2__["useContext"])(components_IsPublicContext__WEBPACK_IMPORTED_MODULE_4__["default"]);

  if (returnUrl) {
    var folderId = cozy_client__WEBPACK_IMPORTED_MODULE_7__["models"].file.getParentFolderId(file);
    var nativePath = Object(lib_utils__WEBPACK_IMPORTED_MODULE_6__["getFolderLink"])(folderId);
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(cozy_ui_react_AppLinker__WEBPACK_IMPORTED_MODULE_5__["default"], {
      slug: "drive",
      href: returnUrl,
      nativePath: nativePath
    }, function (_ref2) {
      var onClick = _ref2.onClick,
          href = _ref2.href;
      return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_3__["ButtonLink"], {
        icon: "previous",
        onClick: createOnClick(requestToLeave, href, onClick),
        href: href,
        className: "sto-app-back",
        subtle: true
      });
    });
  } else if (!isPublic) {
    var href = '#/';
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      icon: "previous",
      href: href,
      onClick: createOnClick(requestToLeave, href),
      className: "sto-app-back",
      subtle: true
    });
  } else {
    return null;
  }
}

/***/ }),

/***/ "nMfT":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);




function useForceSync(_ref) {
  var doc = _ref.doc,
      collabProvider = _ref.collabProvider;
  var noteId = doc && doc.file.id;
  var serviceClient = collabProvider && collabProvider.serviceClient;
  var channel = collabProvider && collabProvider.channel; // Be sure to save everything before leaving
  // and force sync with the io.cozy.file

  var forceSync = Object(react__WEBPACK_IMPORTED_MODULE_2__["useCallback"])(
  /*#__PURE__*/
  function () {
    var _forceSync = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(doc && channel && serviceClient)) {
                _context.next = 5;
                break;
              }

              _context.next = 3;
              return channel.ensureEmptyQueue();

            case 3:
              _context.next = 5;
              return serviceClient.sync(noteId);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function forceSync() {
      return _forceSync.apply(this, arguments);
    };
  }(), [doc, channel, serviceClient, noteId]); // Sync on unload will probably be stopped by the browser,
  // as most async code on unload, but let's try anyway

  var emergencySync = Object(react__WEBPACK_IMPORTED_MODULE_2__["useCallback"])(function () {
    if (noteId && serviceClient) {
      serviceClient.sync(noteId); // force a server sync
    }
  }, [noteId, serviceClient]);
  return {
    forceSync: forceSync,
    emergencySync: emergencySync
  };
}

/* harmony default export */ __webpack_exports__["default"] = (useForceSync);

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

/***/ "nwX3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OfflineIndicator; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("i8i4");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("DvoB");
/* harmony import */ var cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("y6ex");
/* harmony import */ var cozy_ui_react_Chip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("tNlo");
/* harmony import */ var cozy_ui_react_Tooltip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("SOfb");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_hooks_useBreakpoints__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("1I/2");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("SUMQ");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var components_notes_offline_indicator_styl__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("yWSb");
/* harmony import */ var components_notes_offline_indicator_styl__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(components_notes_offline_indicator_styl__WEBPACK_IMPORTED_MODULE_9__);










var tooltipStyles = {
  tooltipPlacementBottom: {
    margin: '12px 24px'
  },
  tooltipPlacementTop: {
    margin: '12px 24px'
  }
};
var StyledTooltip = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8__["withStyles"])(tooltipStyles, {
  name: 'MuiTooltip'
})(cozy_ui_react_Tooltip__WEBPACK_IMPORTED_MODULE_5__["default"]);
/**
 * Large tooltip, for browser view
 *
 * @param {object} props
 * @param {boolean} props.open - true if we should force the tooltip to be opened
 * @param {*} props.content - what to display inside the banner
 * @param {*} props.children - the saving indicator
 */

function Balloon(props) {
  // We add a dynamic `key`property to throw the old
  // instance and get a new one if the `open` property changes.
  // This is because we want to force the tooltip to be open
  // for a few seconds (and MUI initializes the component to
  // a controlled one) but we want the automatic (no-controlled)
  // mode afterwards
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledTooltip, {
    title: props.content,
    open: props.open || undefined,
    key: props.open ? 'open' : 'auto'
  }, props.children);
}
/**
 * Banner on top of the editor, for mobile view
 *
 * @param {object} props
 * @param {Ref} props.bannerRef - where to display the banner
 * @param {*} props.content - what to display inside the banner
 * @param {*} props.children - the saving indicator
 */


function Banner(props) {
  var ref = props.bannerRef && props.bannerRef.current;

  if (ref) {
    return react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.createPortal(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: components_notes_offline_indicator_styl__WEBPACK_IMPORTED_MODULE_9___default.a.banner
    }, props.content), ref);
  }

  return null;
}
/**
 * Adds an indicator when offline
 *
 * It's mapped to a tooltip for browser views
 * and to a banner for mobile views
 * @param {object} props
 * @param {boolean} props.open - true if we should force the tooltip to be opened
 * @param {Ref} props.bannerRef - where to display the banner
 * @param {*} props.children - the saving indicator
 */


function OfflineIndicator(props) {
  var _useI18n = Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_6__["useI18n"])(),
      t = _useI18n.t;

  var _useBreakpoints = Object(cozy_ui_react_hooks_useBreakpoints__WEBPACK_IMPORTED_MODULE_7__["default"])(),
      isMobile = _useBreakpoints.isMobile;

  var content = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grid"], {
    direction: "row",
    container: true,
    wrap: "nowrap",
    spacing: 16,
    className: components_notes_offline_indicator_styl__WEBPACK_IMPORTED_MODULE_9___default.a.grid
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grid"], {
    item: true
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Chip__WEBPACK_IMPORTED_MODULE_4__["default"].Round, {
    className: components_notes_offline_indicator_styl__WEBPACK_IMPORTED_MODULE_9___default.a.chip
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_3__["default"], {
    icon: "offline",
    color: "var(--black)"
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grid"], {
    item: true
  }, t('Notes.OfflineIndicator.message')));
  var Component = isMobile ? Banner : Balloon;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component, {
    open: props.open,
    content: content,
    bannerRef: props.bannerRef
  }, props.children);
}

/***/ }),

/***/ "oVTz":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("J4zp");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_4__);






function useFileWithPath(_ref) {
  var cozyClient = _ref.cozyClient,
      file = _ref.file;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(undefined),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState, 2),
      fileWithPath = _useState2[0],
      setFileWithPath = _useState2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    function getParent(_x) {
      return _getParent.apply(this, arguments);
    }

    function _getParent() {
      _getParent = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(rawFile) {
        var file, parent;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                file = cozy_client__WEBPACK_IMPORTED_MODULE_4__["models"].file.normalize(rawFile);
                _context.prev = 1;
                _context.next = 4;
                return cozyClient.query(cozyClient.get('io.cozy.files', file.attributes.dir_id));

              case 4:
                parent = _context.sent;
                setFileWithPath(cozy_client__WEBPACK_IMPORTED_MODULE_4__["models"].file.ensureFilePath(file, parent.data));
                _context.next = 12;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);
                // eslint-disable-next-line no-console
                console.warn("Request failed when try to fetch the parent ".concat(file.attributes.dir_id, " of io.cozy.files ").concat(file.id));
                setFileWithPath(null); // nothing to do here
                // @TODO send a sentry event

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 8]]);
      }));
      return _getParent.apply(this, arguments);
    }

    getParent(file);
  }, [cozyClient, file, file.attributes.dir_id]);

  if (fileWithPath && fileWithPath.id == file.id) {
    return fileWithPath;
  } else {
    return undefined;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (useFileWithPath);

/***/ }),

/***/ "pL5B":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("J4zp");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("0cfB");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("55Ip");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var cozy_ui_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("H+Xc");
/* harmony import */ var cozy_ui_react_Layout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("Bh3+");
/* harmony import */ var cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("y6ex");
/* harmony import */ var cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("V2U0");
/* harmony import */ var cozy_ui_react_AppTitle__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("vYzF");
/* harmony import */ var cozy_ui_react_hooks_useBreakpoints__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("1I/2");
/* harmony import */ var components_notes__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("Zlyp");
/* harmony import */ var lib_utils__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("snnE");
/* harmony import */ var lib_debug__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("/RjM");
/* harmony import */ var lib_initFromDom__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("X3v2");




/* global cozy */











var manifest = __webpack_require__("pZg0");






var RoutedEditor = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["withRouter"])(function (props) {
  var returnUrl = Object(lib_utils__WEBPACK_IMPORTED_MODULE_14__["getReturnUrl"])();
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_notes__WEBPACK_IMPORTED_MODULE_13__["Editor"], {
    noteId: props.match.params.id,
    returnUrl: returnUrl
  });
});

var PrivateContext = function PrivateContext() {
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["Switch"], null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["Route"], {
    path: "/n/:id",
    component: RoutedEditor
  }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["Route"], {
    path: "/",
    component: components_notes__WEBPACK_IMPORTED_MODULE_13__["List"]
  }));
};

var PublicContext = Object(cozy_client__WEBPACK_IMPORTED_MODULE_6__["withClient"])(function (_ref) {
  var client = _ref.client;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(null),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState, 2),
      sharedDocumentId = _useState2[0],
      setSharedDocumentId = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(false),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState3, 2),
      readOnly = _useState4[0],
      setReadOnly = _useState4[1];

  var returnUrl = Object(react__WEBPACK_IMPORTED_MODULE_3__["useMemo"])(function () {
    return Object(lib_utils__WEBPACK_IMPORTED_MODULE_14__["getReturnUrl"])();
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    var fetchData =
    /*#__PURE__*/
    function () {
      var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var searchParams, id, _readOnly, _ref3, _id, _readOnly2;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                searchParams = new URLSearchParams(window.location.search);

                if (!searchParams.has('id')) {
                  _context.next = 11;
                  break;
                }

                // public route = /public/?sharecode=xxxx&id=xxxxx
                // The id of the note is necessary because the sharecode
                // may be about a folder and not a specific note.
                id = searchParams.get('id');
                _context.next = 6;
                return Object(lib_utils__WEBPACK_IMPORTED_MODULE_14__["fetchIfIsNoteReadOnly"])(client, id);

              case 6:
                _readOnly = _context.sent;
                setReadOnly(_readOnly);
                setSharedDocumentId(id);
                _context.next = 18;
                break;

              case 11:
                _context.next = 13;
                return Object(lib_utils__WEBPACK_IMPORTED_MODULE_14__["getSharedDocument"])(client);

              case 13:
                _ref3 = _context.sent;
                _id = _ref3.id;
                _readOnly2 = _ref3.readOnly;
                setReadOnly(_readOnly2);
                setSharedDocumentId(_id);

              case 18:
                _context.next = 23;
                break;

              case 20:
                _context.prev = 20;
                _context.t0 = _context["catch"](0);
                setSharedDocumentId(false);

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 20]]);
      }));

      return function fetchData() {
        return _ref2.apply(this, arguments);
      };
    }();

    fetchData();
  }, [client]);

  if (sharedDocumentId) {
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_notes__WEBPACK_IMPORTED_MODULE_13__["Editor"], {
      readOnly: readOnly,
      noteId: sharedDocumentId,
      returnUrl: returnUrl || false
    });
  } else if (sharedDocumentId !== null) {
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_notes__WEBPACK_IMPORTED_MODULE_13__["Unshared"], null);
  } else {
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_10__["default"], {
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
    appName = Object(lib_initFromDom__WEBPACK_IMPORTED_MODULE_16__["getDataOrDefault"])(data.cozyAppName, manifest.name);
  }

  var BarCenter = cozy.bar.BarCenter;
  var FlagSwitcher = Object(lib_debug__WEBPACK_IMPORTED_MODULE_15__["useFlagSwitcher"])();
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(cozy_ui_react_hooks_useBreakpoints__WEBPACK_IMPORTED_MODULE_12__["BreakpointsProvider"], null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["HashRouter"], null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(cozy_ui_react_Layout__WEBPACK_IMPORTED_MODULE_8__["Layout"], {
    monoColumn: true
  }, !isPublic && isMobile && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(BarCenter, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(cozy_ui_react_AppTitle__WEBPACK_IMPORTED_MODULE_11__["default"], null, appName)), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(cozy_ui_react_Layout__WEBPACK_IMPORTED_MODULE_8__["Main"], null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(cozy_ui_react_Layout__WEBPACK_IMPORTED_MODULE_8__["Content"], null, isPublic ? react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(PublicContext, null) : react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(PrivateContext, null))), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_9__["Sprite"], null), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(cozy_ui_react__WEBPACK_IMPORTED_MODULE_7__["Alerter"], null), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(FlagSwitcher, null))));
};
/*
  Enable Hot Module Reload using `react-hot-loader` here
  We enable it here since App is the main root component
  No need to use it anywhere else, it sould work for all
  child components
*/


/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_4__["hot"])(module)(Object(cozy_ui_react__WEBPACK_IMPORTED_MODULE_7__["withBreakpoints"])()(Object(cozy_client__WEBPACK_IMPORTED_MODULE_6__["withClient"])(App))));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3UD+")(module)))

/***/ }),

/***/ "pZg0":
/***/ (function(module, exports) {

module.exports = {"name":"Notes","name_prefix":"Cozy","slug":"notes","icon":"icon.svg","categories":["cozy"],"version":"1.11.0","licence":"AGPL-3.0","editor":"Cozy","source":"https://github.com/cozy/cozy-notes.git@build","developer":{"name":"Cozy Cloud","url":"https://cozy.io"},"screenshots":["screenshots/fr/screenshot01.png","screenshots/fr/screenshot02.png"],"langs":["en","fr"],"routes":{"/":{"folder":"/","index":"index.html","public":false},"/public":{"folder":"/","index":"index.html","public":true}},"permissions":{"apps":{"description":"Required by the cozy-bar to display the icons of the apps","type":"io.cozy.apps","verbs":["GET"]},"files":{"description":"Notes as files","type":"io.cozy.files"},"contacts":{"type":"io.cozy.contacts","verbs":["GET","POST"]},"groups":{"type":"io.cozy.contacts.groups","verbs":["GET"]},"settings":{"description":"Required by the cozy-bar to display Claudy and know which applications are coming soon","type":"io.cozy.settings","verbs":["GET"]}}}

/***/ }),

/***/ "snnE":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getShortNameFromClient", function() { return getShortNameFromClient; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getReturnUrl", function() { return getReturnUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateReturnUrlToNotesIndex", function() { return generateReturnUrlToNotesIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchIfIsNoteReadOnly", function() { return fetchIfIsNoteReadOnly; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSharedDocument", function() { return getSharedDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFolderLink", function() { return getFolderLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDriveLink", function() { return getDriveLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getParentFolderLink", function() { return getParentFolderLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAppFullName", function() { return getAppFullName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNoteDocument", function() { return createNoteDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "relativeAge", function() { return relativeAge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUserNameFromUrl", function() { return getUserNameFromUrl; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("J4zp");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("mwIZ");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var cozy_ui_transpiled_react_AppLinker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("sCMN");
/* harmony import */ var _initFromDom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("X3v2");
/* harmony import */ var lib_collab_schema__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("hmtS");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _manifest_webapp__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("pZg0");
/* harmony import */ var _manifest_webapp__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_manifest_webapp__WEBPACK_IMPORTED_MODULE_8__);









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
      var _step$value = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_step.value, 2),
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
  url.searchParams.set(returnUrlKey, '#/');
  url.hash = "#/n/".concat(doc.id);
  return url;
};
/**
 * Get permissions on io.cozy.files for current context
 * @private
 * @param {CozyClient} client
 * @returns {object}
 */

function getFilesOwnPermissions(_x) {
  return _getFilesOwnPermissions.apply(this, arguments);
}
/**
 * Get a file by it's id
 * @private
 * @param {CozyClient} client
 * @param {string} id
 */


function _getFilesOwnPermissions() {
  _getFilesOwnPermissions = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(client) {
    var permissionsData, permissionObject, permissions;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return client.collection('io.cozy.permissions').getOwnPermissions();

          case 2:
            permissionsData = _context.sent;
            permissionObject = lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(permissionsData, 'data.attributes.permissions');

            if (permissionObject) {
              _context.next = 6;
              break;
            }

            throw "can't get self permissions";

          case 6:
            permissions = Object.values(permissionObject);
            return _context.abrupt("return", permissions.filter(function (perm) {
              return cozy_client__WEBPACK_IMPORTED_MODULE_7__["models"].permission.isForType(perm, 'io.cozy.files');
            }));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _getFilesOwnPermissions.apply(this, arguments);
}

function getFile(_x2, _x3) {
  return _getFile.apply(this, arguments);
}
/**
 * Checks if the note is read-only or read-write
 *
 * @param {CozyClient} client
 * @param {string} fileId - io.cozy.files id
 * @returns {bool}
 */


function _getFile() {
  _getFile = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(client, id) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", client.query(client.find('io.cozy.files').getById(id)).then(function (data) {
              return data && data.data;
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _getFile.apply(this, arguments);
}

function fetchIfIsNoteReadOnly(_x4, _x5) {
  return _fetchIfIsNoteReadOnly.apply(this, arguments);
}
/**
 * Get the first shared document for the current shared token
 *
 * @param {CozyClient} client
 * @returns {{id, readOnly}} id of the document and the readOnly status
 */

function _fetchIfIsNoteReadOnly() {
  _fetchIfIsNoteReadOnly = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(client, fileId) {
    var document;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return getFile(client, fileId);

          case 2:
            document = _context3.sent;
            return _context3.abrupt("return", cozy_client__WEBPACK_IMPORTED_MODULE_7__["models"].permission.isDocumentReadOnly({
              document: document,
              client: client,
              writability: ['PATCH']
            }));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return _fetchIfIsNoteReadOnly.apply(this, arguments);
}

function getSharedDocument(_x6) {
  return _getSharedDocument.apply(this, arguments);
}

function _getSharedDocument() {
  _getSharedDocument = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(client) {
    var permissions, perm, sharedDocumentId, readOnly;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return getFilesOwnPermissions(client);

          case 2:
            _context4.t0 = function (p) {
              return cozy_client__WEBPACK_IMPORTED_MODULE_7__["models"].permission.isForType(p, 'io.cozy.files') && p.values && p.values.length > 0;
            };

            permissions = _context4.sent.filter(_context4.t0);

            if (!(permissions.length < 1)) {
              _context4.next = 8;
              break;
            }

            throw new Error('No individual io.cozy.files permissions in current context');

          case 8:
            if (permissions.length > 1 || permissions[0].values.length > 1) {
              // eslint-disable-next-line no-console
              console.warn("There are more than one permission for a file in current context. Let's take the first one, but it may not be the one you expect");
            }

          case 9:
            perm = permissions[0];
            sharedDocumentId = perm.values[0];
            readOnly = cozy_client__WEBPACK_IMPORTED_MODULE_7__["models"].permission.isReadOnly(perm, {
              writability: ['PATCH']
            });
            return _context4.abrupt("return", {
              id: sharedDocumentId,
              readOnly: readOnly
            });

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));
  return _getSharedDocument.apply(this, arguments);
}

function getFolderLink(id) {
  return "/folder/".concat(id);
}
function getDriveLink(client) {
  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var cozyURL = new URL(client.getStackClient().uri);

  var _client$getInstanceOp = client.getInstanceOptions(),
      cozySubdomainType = _client$getInstanceOp.cozySubdomainType;

  var driveSlug = 'drive';
  var pathForDrive = id !== null ? getFolderLink(id) : '';
  var webUrl = Object(cozy_ui_transpiled_react_AppLinker__WEBPACK_IMPORTED_MODULE_4__["generateWebLink"])({
    cozyUrl: cozyURL.origin,
    slug: driveSlug,
    subDomainType: cozySubdomainType,
    nativePath: pathForDrive
  });
  return webUrl;
}
function getParentFolderLink(client, file) {
  return getDriveLink(client, cozy_client__WEBPACK_IMPORTED_MODULE_7__["models"].file.getParentFolderId(file));
}
function getAppFullName() {
  var dataset = Object(_initFromDom__WEBPACK_IMPORTED_MODULE_5__["getDataset"])();
  var appNamePrefix = Object(_initFromDom__WEBPACK_IMPORTED_MODULE_5__["getDataOrDefault"])(dataset.cozyAppNamePrefix || _manifest_webapp__WEBPACK_IMPORTED_MODULE_8___default.a.name_prefix, '');
  var appName = Object(_initFromDom__WEBPACK_IMPORTED_MODULE_5__["getDataOrDefault"])(dataset.cozyAppName, _manifest_webapp__WEBPACK_IMPORTED_MODULE_8___default.a.name);
  return appNamePrefix != '' ? "".concat(appNamePrefix, " ").concat(appName) : appName;
}
function createNoteDocument(client) {
  return client.getStackClient().fetchJSON('POST', '/notes', {
    data: {
      type: 'io.cozy.notes.documents',
      attributes: {
        title: '',
        schema: lib_collab_schema__WEBPACK_IMPORTED_MODULE_6__["schemaOrdered"]
      }
    }
  });
} // constants

var sec = 1000;
var min = 60 * sec;
var hour = 60 * min;
var day = 24 * hour;
var month = 31 * day;
var year = 365 * day; // differents steps for message formating
// [age, key, unit, coef] :
// - `age`: the line applies only if the last saved
// was done less than this `age` ago
// (only the first match will apply)
// - `key` is the traduction key for the message
// - `unit` is the unit in which we will send the time
// to the translated message
// - `coef` is  the granularity in which we will send
// the time (`min, 5` is "by 5 minutes slices")

var defaultSteps = [[10 * sec, 'just_now', sec, 1], [1 * min, 'secs_ago', sec, 10], [2 * min, 'min_ago', min, 1], [5 * min, 'mins_ago', min, 1], [20 * min, 'mins_ago', min, 5], [1 * hour, 'mins_ago', min, 10], [2 * hour, 'hour_ago', hour, 1], [1 * day, 'hours_ago', hour, 1], [2 * day, 'day_ago', day, 1], [1 * month, 'days_ago', day, 1], [2 * month, 'month_ago', month, 1], [1 * year, 'monthes_ago', month, 1], [2 * year, 'year_ago', year, 1], [Infinity, 'years_ago', year, 1]];
/**
 * @typedef {object} RelativeAge
 * @property {string} key - translation (sub) key
 * @property {unit} unit - unit (minute, second, hour…) in which the age will be displayed
 * @property {integer} coef - in how much values of this unit do we count (like every 10 minutes)
 * @property {integer} time - age to be inserted in the translation message
 * @property {integer} interval - `unit * coef`: compute again in that timeframe (in milliseconds)
 */

/**
 * Gets raw data to display a relative age in human words
 * @param {integer} age - age in milliseconds
 * @param {array} steps - array of [max_age, key, unit, coef]
 * @returns {RelativeAge}
 */

function relativeAge(age, steps) {
  var step = (steps || defaultSteps).find(function (el) {
    return age < el[0];
  });

  var _step2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(step, 4),
      key = _step2[1],
      unit = _step2[2],
      coef = _step2[3];

  return {
    key: key,
    unit: unit,
    coef: coef,
    time: Math.floor(age / unit / coef) * coef,
    interval: unit * coef
  };
}
/**
 * Gets the username defined by the current URL, if any
 *
 * @returns {string|null} username
 */

function getUserNameFromUrl() {
  var searchParams = new URLSearchParams(window.location.search);

  if (searchParams.has('username')) {
    return searchParams.get('username');
  } else {
    return null;
  }
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

/***/ }),

/***/ "txh9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("7YkG");
/* harmony import */ var cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("V2U0");
/* harmony import */ var cozy_ui_react_hooks_useBreakpoints__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("1I/2");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("buk/");
/* harmony import */ var components_notes_List_EmptyComponent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("l0Ks");
/* harmony import */ var components_notes_List_NoteRow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("2tu+");
/* harmony import */ var components_notes_List_list_styl__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("RMII");
/* harmony import */ var components_notes_List_list_styl__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(components_notes_List_list_styl__WEBPACK_IMPORTED_MODULE_7__);









var EmptyTableRow = function EmptyTableRow() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_1__["TableRow"], {
    className: components_notes_List_list_styl__WEBPACK_IMPORTED_MODULE_7___default.a.tableSpecialRow
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_1__["TableCell"], {
    className: components_notes_List_list_styl__WEBPACK_IMPORTED_MODULE_7___default.a.tableCellEmpty
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_notes_List_EmptyComponent__WEBPACK_IMPORTED_MODULE_5__["default"], null)));
};

var LoadingTableRow = function LoadingTableRow() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_1__["TableRow"], {
    className: components_notes_List_list_styl__WEBPACK_IMPORTED_MODULE_7___default.a.tableSpecialRow
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_1__["TableCell"], {
    className: "".concat(components_notes_List_list_styl__WEBPACK_IMPORTED_MODULE_7___default.a.tableCellEmpty, " u-ta-center")
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_2__["default"], {
    size: "xxlarge"
  })));
};

var List = function List(_ref) {
  var t = _ref.t,
      notes = _ref.notes,
      fetchStatus = _ref.fetchStatus;

  var _useBreakpoints = Object(cozy_ui_react_hooks_useBreakpoints__WEBPACK_IMPORTED_MODULE_3__["default"])(),
      isMobile = _useBreakpoints.isMobile;

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_1__["Table"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_1__["TableHead"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_1__["TableRow"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_1__["TableHeader"], {
    className: components_notes_List_list_styl__WEBPACK_IMPORTED_MODULE_7___default.a.tableCellName
  }, t('Notes.List.name')), !isMobile && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_1__["TableHeader"], {
    className: components_notes_List_list_styl__WEBPACK_IMPORTED_MODULE_7___default.a.tableCell
  }, t('Notes.List.updated_at')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_1__["TableHeader"], {
    className: components_notes_List_list_styl__WEBPACK_IMPORTED_MODULE_7___default.a.tableCell
  }, t('Notes.List.location')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_1__["TableHeader"], {
    className: components_notes_List_list_styl__WEBPACK_IMPORTED_MODULE_7___default.a.tableCell
  }, t('Notes.List.sharings'))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_1__["TableHeader"], {
    className: components_notes_List_list_styl__WEBPACK_IMPORTED_MODULE_7___default.a.tableCell
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_1__["TableBody"], null, fetchStatus === 'loading' ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(LoadingTableRow, null) : notes.length === 0 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(EmptyTableRow, null) : notes.map(function (note) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_notes_List_NoteRow__WEBPACK_IMPORTED_MODULE_6__["default"], {
      note: note,
      key: note._id
    });
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_4__["translate"])()(List));

/***/ }),

/***/ "yWSb":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"grid":"grid--1HNmF","banner":"banner--MWCHK","chip":"chip--3hU4-"};

/***/ })

/******/ });
//# sourceMappingURL=notes.js.map