"use strict";

require("./style.css");

var _data = require("./data");

var _DropDownList = _interopRequireDefault(require("./DropDownList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

main();

function main() {
  var $userList = document.querySelector(".userlist-container");
  var userData = (0, _data.retrieveUserData)();
  new _DropDownList["default"]({
    selector: {
      dropdownContainer: ".dropdown-container",
      backdropContainer: ".backdrop-container"
    },
    field: {
      id: "id",
      label: "label"
    },
    optionData: (0, _data.retrieveOptionData)(),
    eventHandler: {
      onChange: function onChange(_ref) {
        var id = _ref.id;
        var newUserData = id ? userData.filter(function (_ref2) {
          var favorites = _ref2.favorites;
          return favorites === id;
        }) : userData;
        renderUserList($userList, newUserData);
      }
    }
  }); // changeEvent 가 일어나기 전에는 모든 userData 를 표시한다.

  renderUserList($userList, userData);
} // 특정 요소에 userList 데이터를 렌더링하는 함수로 빼내었다.


function renderUserList($target, userList) {
  $target.innerHTML = userList.reduce(function (result, _ref3) {
    var username = _ref3.username,
        favorites = _ref3.favorites;
    var favoriteOption = (0, _data.retrieveOptionItemById)(favorites);
    return result += "<div>\n        <span>".concat(username, "</span>\n        <span>favorites: ").concat(favoriteOption.label, "</span>\n      </div>");
  }, "");
}