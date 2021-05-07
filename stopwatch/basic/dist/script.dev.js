"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// start 버튼은 stop 으로 바뀔 수 있고, reset 버튼은 laps 로 바뀔 수 있다.
// stopwatch 요소에 이벤트를 핸들링한다 (버블링)
// 1. stopwatch 요소 안의 start 와 reset 버튼을 잡는다.
// 2. start, reset 에 대한 핸들링을 정의한다. 그외 요소에 대해 가드절로 거른다.
var stopwatchEl = document.querySelector(".stopwatch"); // 핸들러를 스코프로 가둔 이유는? IIFE 로 왜 정의 했을까 -> 상태 및 함수 캡슐화

stopwatchEl.onclick = function () {
  var runningFlag = false; // start, stop 또는 laps, reset 의 판단 기준이 된다.

  var elapsedTime = {
    mm: 0,
    ss: 0,
    ms: 0
  }; // 업데이트 된다. -> let

  var laps = []; // 초기화가능성이 있다. -> let

  var _document$querySelect = document.querySelectorAll(".stopwatch > .control"),
      _document$querySelect2 = _slicedToArray(_document$querySelect, 2),
      startStopButtonEl = _document$querySelect2[0],
      resetLapsButtonEl = _document$querySelect2[1];

  var startStopButtonHandler = function () {
    var timerId = null; // stop 시 setInterval 을 풀어줘야한다.

    var start = function start() {
      var _elapsedTime = elapsedTime,
          mm = _elapsedTime.mm,
          ss = _elapsedTime.ss,
          ms = _elapsedTime.ms; // ms 두자리까지 표현되므로, 10ms 까지 표현된다.

      timerId = setInterval(function () {
        ms += 1;

        if (ms >= 100) {
          ss += 1;
          ms = 0;
        }

        if (ss >= 60) {
          mm += 1;
          ss = 0;
        } // 경과된 시간으로 reset 버튼의 활성화 상태를 판단한다.


        resetLapsButtonEl.disabled = mm + ss + ms === 0;
        elapsedTime = {
          mm: mm,
          ss: ss,
          ms: ms
        }; // 시간 렌더링 함수 호출

        renderElapsedTime();
      }, 10);
    }; // timerId 를 clear 한다.


    var stop = function stop() {
      return clearInterval(timerId);
    }; // 1. runningFlag 로


    return function () {
      runningFlag ? stop() : start();
      runningFlag = !runningFlag; // 반전
      // 컨텐츠 내용

      startStopButtonEl.textContent = runningFlag ? "STOP" : "START";
      resetLapsButtonEl.textContent = runningFlag ? "LAPS" : "RESET";
    };
  }();

  var resetLapsButtonHandler = function () {
    // reset 되면, 지난 시간이 0ms 로 초기화되므로 더이상 reset 할 수 없다.
    var reset = function reset() {
      resetLapsButtonEl.disabled = true;
      elapsedTime = {
        mm: 0,
        ss: 0,
        ms: 0
      }; // elapsed 렌더링

      renderElapsedTime(); // laps 초기화

      laps = [];
      renderLaps();
    };

    var addLap = function addLap() {
      laps = [].concat(_toConsumableArray(laps), [elapsedTime]); // 캡쳐한 시간을 붙힌다.
      // laps 를 render 한다.

      renderLaps();
    }; // runningFlag 가 true 임은 start 상태임을 뜻하고 laps 를 찍을 수 있음을 뜻한다.


    return function () {
      runningFlag ? addLap() : reset();
    };
  }();

  var renderElapsedTime = function () {
    var displayEl = document.querySelector(".stopwatch > .display");
    return function () {
      displayEl.textContent = formatElapsedTime(elapsedTime);
    };
  }();

  var renderLaps = function () {
    var lapsEl = document.querySelector(".stopwatch > .laps"); // laps 를 잡고 컴포넌트를 생성하고 붙힌다.

    var createLapElement = function createLapElement(newLap, no) {
      var fragEl = document.createDocumentFragment();
      var noEl = document.createElement("div");
      noEl.textContent = no;
      fragEl.appendChild(noEl);
      var newLapEl = document.createElement("div");
      newLapEl.textContent = formatElapsedTime(newLap);
      fragEl.appendChild(newLapEl);
      lapsEl.appendChild(fragEl);
      lapsEl.style.display = "grid";
    };

    var removeAllLapElement = function removeAllLapElement() {
      // lap-title 이 아닌 laps 에 대해 모두 삭제한다.
      document.querySelector(".laps > div:not(.lap-title)").forEach(function (lapEl) {
        return lapEl.remove();
      });
      lapsEl.style.display = "none";
    }; // renderLaps 는 reset 파트, addLaps 파트에 반응한다.
    // laps 길이가 판단 기준이 된다.


    return function () {
      var _laps = laps,
          length = _laps.length;

      if (length) {
        var newLap = laps[length - 1]; // 마지막 laps 정보를 렌더링한다.

        createLapElement(newLap, length);
      } else {
        removeAllLapElement();
      }
    };
  }();

  var formatElapsedTime = function () {
    // 각 시간이 일의 자리로 표현되면 0이 앞에 추가되어야한다
    var format = function format(n) {
      return n < 10 ? "0" + n : n + "";
    };

    return function (_ref) {
      var mm = _ref.mm,
          ss = _ref.ss,
          ms = _ref.ms;
      return "".concat(format(mm), ":").concat(format(ss), ":").concat(format(ms), "}");
    };
  }(); // 핸들러 부, 버블링으로 잡힌 요소를 컨트롤한다.


  return function (_ref2) {
    var target = _ref2.target;
    if (!target.classList.contains("control")) return; // 가드절로 필터하면, 둘 중하나로 범위를 좁힐 수 있다. (start 버튼 또는 reset 버튼)

    target === startStopButtonEl ? startStopButtonHandler() : resetLapsButtonHandler();
  };
}();