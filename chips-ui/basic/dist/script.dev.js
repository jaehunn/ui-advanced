"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Chips =
/*#__PURE__*/
function () {
  function Chips(_ref) {
    var selector = _ref.selector,
        data = _ref.data;

    _classCallCheck(this, Chips);

    this.data = data;
    this.containerElement = document.querySelector(selector);
    this.chipElements = this.initChips(this.containerElement, data);
    this.inputElement = this.initInput(this.containerElement);
    this.eventBinding();
  }

  _createClass(Chips, [{
    key: "initChips",
    value: function initChips(selector, data) {
      var _this = this;

      data.forEach(function (item) {
        var chipElement = _this.createChipElement(item);

        selector.appendChild(chipElement);
      }); // 생성된 chip 요소 리스트를 반환한다.

      return selector.querySelectorAll(".chips-item");
    }
  }, {
    key: "initInput",
    value: function initInput(selector) {
      var inputElement = this.createInputElement();
      selector.appendChild(inputElement);
      return selector.querySelector(".chips-input");
    }
  }, {
    key: "eventBinding",
    value: function eventBinding() {
      var _this2 = this;

      // 1. chipsElements: close 버튼 클릭시 데이터 지우기 (chip 요소리스트와 해당 chip 요소를 둘다 제거하는 로직 필요)
      this.chipElements.forEach(function (chipElement) {
        chipElement.querySelector(".chips-close").addEventListener("click", function () {
          // label 을 찾아내서 데이터를 지운다
          var labelElement = chipElement.querySelector(".chips-label").innerHTML; // 요소 리스트를 순회하면서 인덱스를 찾아 잘라내기

          var targetIndex = _this2.data.findIndex(function (item) {
            return item === labelElement;
          });

          _this2.data.splice(targetIndex, 1); // 요소 제거


          chipElement.remove();
        });
      }); // 2. inputElements: keyup 이벤트로 onChange + enter 로 chip 추가하기

      this.inputElement.addEventListener("keyup", function (_ref2) {
        var key = _ref2.key,
            value = _ref2.target.value;

        // keyCode 는 deprecate 되었습니다.
        if (key === "Enter") {
          var newChipElement = _this2.createChipElement(value); // 생성된 chip 에 삭제 이벤트를 부여한다.


          newChipElement.querySelector(".chips-close").addEventListener("click", function () {
            // label 을 찾아내서 데이터를 지운다
            var labelElement = chipElement.querySelector(".chips-label").innerHTML; // 요소 리스트를 순회하면서 인덱스를 찾아 잘라내기

            var targetIndex = _this2.data.findIndex(function (item) {
              return item === labelElement;
            });

            _this2.data.splice(targetIndex, 1); // 요소 제거


            chipElement.remove();
          }); // container 에 insertAdjacentElement() 를 적용해 붙힌다. + data 요소 리스트에 prepend 한다.
          // @see https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement

          _this2.containerElement.insertAdjacentElement("afterbegin", newChipElement);

          _this2.data.unshift(value); // input text 초기화


          _this2.inputElement.value = "";
        }
      });
    }
  }, {
    key: "createChipElement",
    value: function createChipElement(item) {
      var chipElement = document.createElement("div");
      chipElement.classList.add("chips-item");
      chipElement.innerHTML = "\n          <span class=\"chips-label\">".concat(item, "</span>\n          <img class=\"chips-close\" src=\"./close.svg\" />\n      ");
      return chipElement;
    }
  }, {
    key: "createInputElement",
    value: function createInputElement() {
      var inputElement = document.createElement("input");
      inputElement.classList.add("chips-input");
      inputElement.placeholder = "enter text...";
      return inputElement;
    }
  }]);

  return Chips;
}();

function App() {
  var buttonData = ["#vue", "#react", "#angular"];
  var chips = new Chips({
    selector: "#chips",
    data: buttonData
  }); // 결과 버튼 클릭시 기능을 정의한다.

  document.querySelector(".result-button").addEventListener("click", function () {});
}

App();