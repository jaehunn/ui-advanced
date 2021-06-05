"use strict";

require("./style.css");

var _data = require("./data");

var _DropDownList = _interopRequireDefault(require("./DropDownList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var renderUserList = function renderUserList($element, data) {
  $element.innerHTML = data.reduce(function (result, item) {
    return result + "<div>\n            <span>User: ".concat(item.userName, "</span>,\n            <span>favorites: ").concat((0, _data.retrieveOptionItemById)(item["favorites"]).label, "</span>\n      </div>");
  }, "");
};

var main = function main() {
  new _DropDownList["default"]({
    selector: "#dropdown",
    backdrop: ".back-drop",
    idField: "id",
    labelField: "label",
    data: (0, _data.retrieveOptionData)(),
    changeEvent: function changeEvent(e) {
      // select box 에서 change 가 발생하면 renderUserList() 로 선택 data 를 렌더링한다.
      // id 가 없음은 default 하게 모든 리스트를 보여주는 것을 의미한다.
      renderUserList(document.querySelector("#userlist"), e.id ? (0, _data.retrieveUserData)().filter(function (item) {
        return item.favorites === e.id;
      }) : (0, _data.retrieveUserData)());
    }
  }); // mount

  renderUserList(document.querySelector("#userlist"), (0, _data.retrieveUserData)());
};

main();