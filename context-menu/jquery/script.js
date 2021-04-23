import $ from "jquery";

// 1] 리스너를 적당히 분리하기
const $wrapperEl = $(".wrapper");
const $itemEls = $wrapperEl.find(".item");

// 두번째 인자로 하위 요소를 다이렉트로 잡을 수 있다.
// 화살표함수로 작성하면 this 를 .item 으로 잡지 못한다.
$wrapperEl.on("click", ".item", function (e) {
  // body 로 전파되지 않도록한다.
  e.stopPropagation();

  // this 는 정의한 .item 이다. siblings() 로 형제 요소들을 모두 잡아 active 를 제거한다.
  // 체이닝으로 코드를 많이 줄일 수 있다.
  $(this).toggleClass("open").siblings().removeClass("open");
});

$("body").on("click", () => {
  // forEach 를 돌릴 필요가없다.
  $itemEls.removeClass("open");
});

// 2] 리스너 하나로 감지하기
const $itemEls = $(".wrapper .item");

$("body").on("click", function (e) {
  // 현재 감지된 요소를 잡는다.
  const itemEl = $(e.target);

  // 1. contex -> 무반응
  // 2. item -> 토글, 그외 item 들 active 제거
  // 3. 그외 -> 모든 active 제거

  if (itemEl.is(".context")) return;
  if (itemEl.is(".item")) {
    itemEl.toggleClass("open").siblings().removeClass("open");

    return;
  }

  $itemEls.removeClass("open");
});
