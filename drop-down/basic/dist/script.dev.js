"use strict";

require("./style.css");

var _data = require("./data");

var _DropDownList = _interopRequireDefault(require("./DropDownList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

main();

function main() {
  var dropDownList = new _DropDownList["default"]({
    selector: "#dropdown",
    backdrop: ".back-drop",
    idField: "id",
    labelField: "label",
    data: (0, _data.retrieveOptionData)(),
    // changeEvent 는 selector box 가 선택되면 동작한다.
    //  1. default 로 명시된 label 의 경우에는 모든 리스트를 뿌려준다.
    //  2. 특정 id 에 대하여 뿌려준다.
    changeEvent: function changeEvent(e) {
      displayUserList(document.querySelector("#userlist"), e.id ? displayUserList().filter(function (item) {
        return item.favorites === e.id;
      }) : displayUserList());
    }
  });
  displayUserList(document.querySelector("#userlist"), (0, _data.retrieveUserData)());
} // user 의 favorite 과 option 의 id 가 관계에 놓여있다.


function displayUserList(selector, data) {
  selector.innerHTML = data.reduce(function (result, item) {
    return result += "<div>\n      <span>".concat(item.userName, "</span>\n      <span>favorites: ").concat((0, _data.retrieveOptionItemById)(item["favorites"]).label, "</span>\n    </div>");
  }, "");
}