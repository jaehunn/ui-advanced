"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var mockData = [{
  word: "서울"
}, {
  word: "부산"
}, {
  word: "대전"
}, {
  word: "태권브이"
}, {
  word: "서쪽"
}, {
  word: "부모님"
}, {
  word: "대한민국"
}, {
  word: "서쪽마을"
}];

var retrieveWordData = function retrieveWordData(targetWord) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      return resolve(mockData.filter(function (_ref) {
        var word = _ref.word;
        return ~word.indexOf(targetWord);
      }));
    }, 300);
  });
};

var _default = retrieveWordData;
exports["default"] = _default;