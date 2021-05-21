"use strict";

// 시간표시하기: 시, 분, 초침을 1000ms 마다 회전시켜 위치시키기 (--deg css 변수 이용하기)
// 핸들러를 클로져형태로 작성하기, 요소를 타겟하는 과정을 10ms 마다 계속하는 것을 최적화
var renderTime = function () {
  // 타겟요소: 회전시킬 시, 분, 초침
  // $<?> === <?>El
  var $hourHand = document.querySelector('.hand.hour');
  var $minuteHand = document.querySelector('.hand.minute');
  var $secondHand = document.querySelector('.hand.second'); // closure(=handler)

  return function () {
    // 1. 현재 시간을 가져온다.
    // 2. 위치 계산: 현재 시간을 deg 로 환산해야하므로 각 시, 분, 초당 deg 값을 구한다.
    // 시, 분, 초침은 동시에 움직인다. (초침이 60초를 달려서 분침이 한칸 움직이는 방식이 아니다.)
    var currentTime = new Date();
    var currentHours = currentTime.getHours();
    var currentMinutes = currentTime.getMinutes();
    var currentSeconds = currentTime.getSeconds(); // @see https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty
    // 시침: 1시간은 30deg 씩 움직인다. + 1분당 0.5deg(=30 / 60) + 1초당 약 0.0083deg(=0.5 / 60)

    $hourHand.style.setProperty('--deg', currentHours * 30 + currentMinutes * 0.5 + currentSeconds * (0.5 / 60)); // 분침: 1분은 6deg(360 / 60) = 1초당 0.1deg(6 / 60)

    $minuteHand.style.setProperty('--deg', currentMinutes * 6 + currentSeconds * 0.1); // 초침: 1초는 초당 6deg(360 / 60)

    $secondHand.style.setProperty('--deg', currentSeconds * 6);
  };
}();

document.addEventListener('DOMContentLoaded', function () {
  setInterval(renderTime, 1000); // 1초마다 핸들러를 발생시킨다.
});