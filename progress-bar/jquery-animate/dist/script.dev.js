"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// @see https://api.jquery.com/animate
$(document).ready(function () {
  var currentIndex = 0;
  var lastIndex = 4;
  var widthPerIndex = 100 / (lastIndex - currentIndex);
  $("#prev").click(function () {
    if (currentIndex === 0) return;
    currentIndex -= 1; // setInterval() 대신에 jquery animate 를 사용하면 편하다.
    // ISSUE) css 변수를 설정하는 것은 불가능한가?
    // setInterval() 사용을 하지않으니 interval 중복이 발생하지않는다.

    $(".progress-bar").animate(_defineProperty({}, "width", "".concat(currentIndex * widthPerIndex, "%")), 500);
  });
  $("#next").click(function () {
    if (currentIndex === lastIndex) return;
    currentIndex += 1;
    $(".progress-bar").animate(_defineProperty({}, "width", "".concat(currentIndex * widthPerIndex, "%")), 500);
  });
});