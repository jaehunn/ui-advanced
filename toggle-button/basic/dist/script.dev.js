"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ToggleButton =
/*#__PURE__*/
function () {
  function ToggleButton(_ref) {
    var selector = _ref.selector,
        data = _ref.data,
        changeEvent = _ref.changeEvent;

    _classCallCheck(this, ToggleButton);

    this.selectedIndex = -1; // 선택된 button

    this.callback = changeEvent;
    this.buttonElements = this.initialize(document.querySelector(selector), data);
    this.eventBinding();
  }

  _createClass(ToggleButton, [{
    key: "initialize",
    value: function initialize(selector, data) {
      // reduce 에서 acc(result) 가 반환되므로 += 나 = 같은 결과를 보인다.
      selector.innerHTML = data.reduce(function (result, item, index) {
        return result + "<button class=\"toggle-button\">\n            <span class=\"".concat(index ? "border" : "", "\">").concat(item, "</span>\n        </button>");
      }, ""); // 버튼 요소들을 반환한다.

      return document.querySelectorAll(".toggle-button");
    }
  }, {
    key: "eventBinding",
    value: function eventBinding() {
      var _this = this;

      // 버튼요소들을 돌면서 핸들러를 부착한다.
      this.buttonElements.forEach(function (buttonElement, index) {
        buttonElement.addEventListener("click", function () {
          // click 이벤트가 발생하면, active 를 적용한다.
          if (_this.selectedIndex === index) return; // active 를 적용하기 전에 모두 active 를 지운다.

          if (_this.selectedIndex > -1) _this.buttonElements[_this.selectedIndex].classList.remove("select"); // 선택된 버튼을 업데이트한다.

          _this.selectedIndex = index;

          _this.buttonElements[_this.selectedIndex].classList.add("select");

          _this.callback(_this.selectedIndex);
        });
      });
    }
  }]);

  return ToggleButton;
}();

function App() {
  var buttonData = ["Bold", "Italic", "Underline"];
  var toggleButton = new ToggleButton({
    selector: "#toggle-button",
    data: buttonData,
    changeEvent: function changeEvent(selectedIndex) {
      // 추가적인 기능 정의
      console.log(selectedIndex);
    }
  });
}

App();