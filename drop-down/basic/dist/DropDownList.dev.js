"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
// DropDownList 클래스
var DropDownList =
/*#__PURE__*/
function () {
  function DropDownList(config) {
    _classCallCheck(this, DropDownList);

    this.rowHeight = 27;
    this.emptyLabel = "선택해주세요."; // option 의 default label

    this.currentIndex = -1; // null 대신 -1 로 초기설정
    // 설정값 인자로 커스터마이징될 수 있다.

    this.idField = config.idField || "id"; //

    this.labelField = config.labelField || "label";
    this.data = config.data;
    this.callback = config.changeEvent;
    this.dropDownLabel = this.initialize(document.querySelector(config.selector), this.emptyLabel); // // option 이 선택되면 backdrop 에 표시한다.
    // this.backDrop = document.querySelector(config.backDrop);
    // this.dropDownItem = this.displayDropDownItemList(this.backDrop, config.data);
    // // 마지막은 event bind
    // this.eventBinding();
  } // 초기 동작, 마운트 시 option 들을 렌더링한다.


  _createClass(DropDownList, [{
    key: "initialize",
    value: function initialize(selector, emptyLabel) {
      // wrapper
      var dropDownLabel = document.createElement("div");
      dropDownLabel.classList.add("dropdown-select-label-container");
      var renderText = "\n      <span class=\"dropdown-select-label\">".concat(emptyLabel, "</span>\n      <div class=\"dropdown-select-arrow-container\">\n        <div class=\"dropdown-select-arrow\"></div>\n      </div>\n    "); // 요소 시작 부분(begin) 안쪽(after)

      dropDownLabel.insertAdjacentHTML("afterbegin", renderText); // wrapper 통째를 자식으로 붙히기

      selector.appendChild(dropDownLabel);
      return dropDownLabel;
    } // selector box 의 option 들을 렌더링하는 메서드

  }, {
    key: "displayDropDownItemList",
    value: function displayDropDownItemList(selector, data) {} // ...
    // 요소에 이벤트 핸들러를 부착하는 메서드

  }, {
    key: "eventBinding",
    value: function eventBinding() {// ...
    }
  }]);

  return DropDownList;
}();

exports["default"] = DropDownList;