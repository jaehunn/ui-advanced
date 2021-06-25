"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _modules = _interopRequireDefault(require("./modules"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// combine 한 reducer 들을 modules 그 자체로 넣는다.
var store = (0, _toolkit.configureStore)({
  reducer: _modules["default"],
  devTools: true,
  middleware: []
});
exports.store = store;