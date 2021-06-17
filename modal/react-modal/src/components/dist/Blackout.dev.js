"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  // body \uB97C \uAC00\uB9AC\uACE0, modal \uBCF4\uB2E4\uB294 \uB4A4\uC5D0 \uC788\uC5B4\uC57C\uD55C\uB2E4.\n  z-index: 100;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.65);\n  display: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var BlackoutContainer = _styledComponents["default"].div(_templateObject(), function (_ref) {
  var visible = _ref.visible;
  return visible ? "block" : "none";
});

var Blackout = function Blackout() {
  return;
};

var _default = Blackout;
exports["default"] = _default;