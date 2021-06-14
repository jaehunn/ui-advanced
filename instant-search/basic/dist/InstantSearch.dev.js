"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = require("./utils");

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var InstantSearch =
/*#__PURE__*/
function () {
  function InstantSearch(_ref) {
    var selector = _ref.selector,
        eventHandler = _ref.eventHandler;

    _classCallCheck(this, InstantSearch);

    var searchContainer = selector.searchContainer;
    var onChange = eventHandler.onChange;
    this.onChange = onChange;
    this.delayTime = 300; // event subscribe reference

    this.subscription = null;
    var $searchContainer = document.querySelector(searchContainer);
    this.$searchInput = this.createAndRenderSearchInput($searchContainer);
    this.eventBinding();
  }

  _createClass(InstantSearch, [{
    key: "createAndRenderSearchInput",
    value: function createAndRenderSearchInput($container) {
      var $searchInput = document.createElement("input");
      $searchInput.setAttribute("type", "text");
      $searchInput.setAttribute("placeholder", "Please enter...");
      $searchInput.classList.add("search-input");
      $container.appendChild($searchInput);
      return $searchInput;
    }
  }, {
    key: "eventBinding",
    value: function eventBinding() {
      var _this = this;

      // event 를 전파시킨다.
      // debounce 로 keyup 최적화
      // ISSUE) debounce 가 적용이 안된다. -> bind() 를 잘못쓴 것 같다.
      var dispatchEvent = (0, _utils.debounce)(function (targetText) {
        _this.onChange(targetText);
      }, this.delayTime); // const dispatchEvent = (targetText) => {
      //   this.onChange(targetText);
      // };

      this.$searchInput.addEventListener("keyup", function (_ref2) {
        var value = _ref2.target.value;
        dispatchEvent(value);
      }); // @see https://www.npmjs.com/package/rxjs
      // @see https://www.learnrxjs.io/learn-rxjs/operators/filtering/debouncetime
      // keyup 이벤트에 대한 observer 를 반환한다. pipe() 함수는 이벤트의 흐름을 지정할 수 있다.
      // 이벤트 흐름에 debounceTime 을 설정한다.
      // const eventSource = fromEvent(this.$searchInput, "keyup").pipe(debounceTime(this.delayTime));
      // // 생성한 이벤트 옵저버를 등록(구독)하고 콜백으로 keyup 에서 전달된 이벤트객체를 사용할 수 있다.
      // this.subscription = eventSource.subscribe(({ target: { value } }) => {
      //   dispatchEvent(value);
      // });
    }
  }]);

  return InstantSearch;
}();

var _default = InstantSearch;
exports["default"] = _default;