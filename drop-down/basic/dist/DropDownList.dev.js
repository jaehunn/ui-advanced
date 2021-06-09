"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DropDownList =
/*#__PURE__*/
function () {
  function DropDownList(_ref) {
    var selector = _ref.selector,
        field = _ref.field,
        optionData = _ref.optionData,
        eventHandler = _ref.eventHandler;

    _classCallCheck(this, DropDownList);

    var dropdownContainer = selector.dropdownContainer,
        backdropContainer = selector.backdropContainer;
    var id = field.id,
        label = field.label;
    var onChange = eventHandler.onChange;
    this.selectedIndex = -1;
    this.id = id;
    this.label = label;
    this.optionData = optionData;
    this.onChange = onChange;
    var $dropdownContainer = document.querySelector(dropdownContainer);
    this.$dropdownSelectLabelContainer = this.initialize($dropdownContainer); // 다시 접근해야하므로 멤버로 설정한다.

    this.$backdropContainer = document.querySelector(backdropContainer);
    this.$dropdownItem = this.displayDropDownItemList(this.$backdropContainer, optionData);
    this.eventBinding();
  } // dropdownContainer 에 


  _createClass(DropDownList, [{
    key: "initialize",
    value: function initialize($dropDownContainer) {
      var label = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "선택해주세요.";
      var $dropdownSelectLabelContainer = document.createElement("div");
      $dropdownSelectLabelContainer.classList.add("dropdown-select-label-container");
      var dropdownSelectLabelHTML = "\n      <span class=\"dropdown-select-label\">".concat(label, "</span>\n      <div class=\"dropdown-select-arrow-container\">\n        <div class=\"dropdown-select-arrow\"></div>\n      </div>\n    "); // @see https://developer.mozilla.org/ko/docs/Web/API/Element/insertAdjacentHTML

      $dropdownSelectLabelContainer.insertAdjacentHTML("afterbegin", dropdownSelectLabelHTML);
      $dropDownContainer.appendChild($dropdownSelectLabelContainer);
      return $dropdownSelectLabelContainer;
    }
  }, {
    key: "displayDropDownItemList",
    value: function displayDropDownItemList($backdropContainer, optionData) {
      var _this = this;

      if (!$backdropContainer) return;
      $backdropContainer.innerHTML = optionData.reduce(function (result, option) {
        return result += "<div class=\"dropdown-item\">\n        <span>".concat(option[_this.label], "</span>\n      </div>");
      }, '<div class="dropdown-list">') + "</div>"; // @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect

      var dropdownSelectLabelContainerRect = this.$dropdownSelectLabelContainer.getBoundingClientRect();
      var $dropdownListEl = document.querySelector(".dropdown-list"); // 기준좌표 (0, 0)
      // width = content + padding + border-width

      var width = dropdownSelectLabelContainerRect.width,
          top = dropdownSelectLabelContainerRect.top,
          left = dropdownSelectLabelContainerRect.left;
      $dropdownListEl.style.cssText = "\n      position: absolute;\n      width: ".concat(width, "px;\n      top: ").concat(top + 5, "px;\n      left: ").concat(left, "px;\n    ");
    }
  }, {
    key: "eventBinding",
    value: function eventBinding() {
      var _this2 = this;

      // 1. 다시 label 을 펼친다.
      this.$dropdownSelectLabelContainer.addEventListener("click", function () {
        console.log("1");
        _this2.$backdropContainer.style.cssText = "display: block;";
      }); // 2. 바깥을 클릭하면 펼친 label 을 닫는다.

      this.$backdropContainer.addEventListener('click', function () {
        console.log("2");
        _this2.$backdropContainer.style.cssText = "display: none;";
      }); // 3. 펼친 label 들 중 하나를 선택하면 선택한 label 을 뿌린다.

      document.querySelectorAll(".dropdown-item").forEach(function ($dropdownItem, index) {
        $dropdownItem.addEventListener("click", function () {
          console.log("3");

          var currentOption = _this2.retrieveOptionByIndex(index); // selectedIndex 가 존재하면 기존 select 클래스를 제거한다.


          if (~_this2.selectedIndex) _this2.unSelectedDropdownItem(_this2.selectedIndex);
          _this2.selectedIndex = index; // 새로운 selectedIndex 에 대해서 존재한다면 select 클래스를 새롭게 추가한다.

          if (~_this2.selectedIndex) _this2.selectedDropdownItem(_this2.selectedIndex); // 이벤트를 payload 를 넘겨 발생시킨다.

          _this2.dispatchEvent({
            id: currentOption[_this2.id],
            label: currentOption[_this2.label]
          });
        });
      });
    } // utils

  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(payload) {
      var $dropdownSelectLabel = this.$dropdownSelectLabelContainer.querySelector(".dropdown-select-label");
      $dropdownSelectLabel.innerHTML = payload[this.label];
      this.$backdropContainer.style.cssText = "display: none;"; // changeEvent 

      this.onChange(payload);
    }
  }, {
    key: "selectedDropdownItem",
    value: function selectedDropdownItem(targetIndex) {
      var $targetSelectedDropdownItem = document.querySelectorAll(".dropdown-item")[targetIndex];
      $targetSelectedDropdownItem.classList.add("selected");
    }
  }, {
    key: "unSelectedDropdownItem",
    value: function unSelectedDropdownItem(targetIndex) {
      var $targetSelectedDropdownItem = document.querySelectorAll(".dropdown-item")[targetIndex];
      $targetSelectedDropdownItem.classList.remove("selected");
    }
  }, {
    key: "retrieveOptionByIndex",
    value: function retrieveOptionByIndex(index) {
      var targetOption = this.optionData[index];
      return targetOption;
    }
  }]);

  return DropDownList;
}();

exports["default"] = DropDownList;