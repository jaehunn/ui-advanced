"use strict";

var _data = _interopRequireDefault(require("./data"));

var _InstantSearch = _interopRequireDefault(require("./InstantSearch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

main();

function main() {
  var instantSearch = new _InstantSearch["default"]({
    selector: {
      searchContainer: ".search-container" // searchInput: ".search-input",

    },
    eventHandler: {
      onChange: function onChange(inputText) {
        return renderWordData(inputText);
      }
    }
  }); // 마운트시 기본 호출

  renderWordData();
}

function renderWordData() {
  var targetWord = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var $listContainer = document.querySelector(".list-container");
  (0, _data["default"])(targetWord).then(function (resultWordData) {
    return createAndRenderWordList($listContainer, resultWordData);
  });
}

function createAndRenderWordList($container, wordData) {
  $container.innerHTML = wordData.reduce(function (resultWordHTML, _ref) {
    var word = _ref.word;
    return resultWordHTML += "\n      <div>\n        <span>".concat(word, "</span>\n      </div>");
  }, "");
}