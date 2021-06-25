"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _items = require("./items");

// combineReducers() 로 reducer 들을 묶어 다시 export 한다.
var _default = (0, _redux.combineReducers)({
  items: _items.items
});

exports["default"] = _default;