"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var formatElapsedTime = function () {
  var format = function format(n) {
    return n < 10 ? "0" + n : n + "";
  };

  return function (_ref) {
    var mm = _ref.mm,
        ss = _ref.ss,
        ms = _ref.ms;
    return "".concat(format(mm), ":").concat(format(ss), ":").concat(format(ms));
  };
}();

var useStopwatch = function useStopwatch() {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isRunning = _useState2[0],
      setIsRunning = _useState2[1];

  var _useState3 = (0, _react.useState)({
    mm: 0,
    ss: 0,
    ms: 0
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      elapsedTime = _useState4[0],
      setElapsedTime = _useState4[1];

  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      laps = _useState6[0],
      setLaps = _useState6[1]; // elapsedTime 변경 함수


  var updateElapsedTime = function updateElapsedTime() {
    setElapsedTime(function (_ref2) {
      var mm = _ref2.mm,
          ss = _ref2.ss,
          ms = _ref2.ms;
      ms += 1;

      if (ms >= 100) {
        ss += 1;
        ms = 0;
      }

      if (ss >= 60) {
        mm += 1;
        ss = 0;
      }

      return {
        mm: mm,
        ss: ss,
        ms: ms
      };
    });
  };

  (0, _react.useEffect)(function () {
    var targetTimer = null;
    if (isRunning) targetTimer = setInterval(updateElapsedTime, 10);
    return function () {
      clearInterval(targetTimer);
    };
  }, [isRunning]);

  var reset = function reset() {
    setElapsedTime({
      mm: 0,
      ss: 0,
      ms: 0
    });
    setLaps([]);
  };

  var addLap = function addLap() {
    return setLaps([].concat(_toConsumableArray(laps), [elapsedTime]));
  };

  return {
    isRunning: isRunning,
    elapsedTime: formatElapsedTime(elapsedTime),
    laps: laps.map(function (lap) {
      return formatElapsedTime(lap);
    }),
    setIsRunning: setIsRunning,
    addLap: addLap,
    reset: reset
  };
};

var _default = useStopwatch;
exports["default"] = _default;