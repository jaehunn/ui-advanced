"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropDownList = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect

/*
options
    idField: 해당 row의 id로 활용할 key
    labelField: 해당 row의 label로 활용할 key
    data: 표현될 리스트
    changeEvent: 선택된 데이터를 받을 수 있는 callback
    selector: 선택된 데이터를 표시할 라벨 영역
    backdrop: dropdown list를 출력할 영역
*/
var DropDownList = function DropDownList(config) {
  _classCallCheck(this, DropDownList);
};

exports.DropDownList = DropDownList;