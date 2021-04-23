"use strict";

// 1] item 토글처리를 html 로 해결했으므로, 외부 요소 감지와 item 토글처리 이벤트에 기능을 더한다.
var itemEls = document.querySelectorAll("details");
document.body.addEventListener("click", function (e) {
  var targetEl = e.target; // context(<p/>) 가 아니고 item(summary 태그) 이 아니면 즉 외부 요소라면, item 들의 모든 active 를 제거한다.

  if (targetEl.nodeName !== "P" && targetEl.nodeName !== "SUMMARY") {
    // 클래스명으로 open 이 설정되지않고 속성으로 open 이 붙으므로 속성을 제거해야한다.
    itemEls.forEach(function (itemEl) {
      itemEl.removeAttribute("open");
    });
    return;
  } // item 이자만 현재 감지된 item 이 아니라면 active 를 꺼준다.


  itemEls.forEach(function (itemEl) {
    if (itemEl !== targetEl.parentElement) {
      itemEl.removeAttribute("open");
    }
  });
});