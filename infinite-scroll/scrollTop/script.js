const log = console.log;
// 1. scroll 이벤트를 감지하는 방법

// (1) window.addEventListener("scroll", callback)
// (2) document.addEventListener("scroll", callback)
// (3) window.onscroll = function () {}
// (4) $Element.addEventListener("scroll", callback)

// 2. scroll 이벤트를 감지해서 특정 요소 토글하기

/*
const scrollHandler = (function () {
  const $nav = document.querySelector("nav");

  return () => {
    // (1) (Bad) window scrollY (익스플로러 9 을 지원하지않는다.)
    // @see https://developer.mozilla.org/ko/docs/Web/API/Window/scrollY
    log(`window.scrollY: ${window.scrollY}`);

    // (2) (Good) window pageYOffset (익스플로러 9 을 지원한다. window.scrollY 와 마찬가지로 익스플로러 9 미만을 지원하지않는다.)
    // @see https://developer.mozilla.org/ko/docs/Web/API/Window/pageYOffset
    log(`window.pageYOffset: ${window.pageYOffset}`);

    // (3) document.documentElement.scrollTop
    log(`document.documentElement.scrollTop: ${document.documentElement.scrollTop}`);

    // (4) document.body.scrollTop
    log(`document.body.scrollTop: ${document.body.scrollTop}`);

    // IE9 미만의 브라우저를 고려한다면 다음과 같이 작성합니다. (크롭에서 권장되는 방법입니다.)
    const top = document.documentElement.scrollTop || document.body.scrollTop;

    top >= 50 ? $nav.classList.add("active") : $nav.classList.remove("active");
  };
})();
*/

// 3. scroll up/down 을 감지하기

// (1) 변화량으로 방향성 부여하기
// scroll trigger 포인트를 지정하지않고, scroll 업/다운을 구분할 수 있을까?
// 스크롤좌표의 값을 음수와 양수로 표현하면 방향성을 나타낼 수 있다.

/*
const scrollHandler = (function () {
  const $nav = document.querySelector("nav");
  let beforeScrollTopValue = 0;

  return () => {
    const currentScrollTopValue = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

    const isScrollDown = currentScrollTopValue - beforeScrollTopValue > 0 ? true : false;

    isScrollDown ? $nav.classList.add("active") : $nav.classList.remove("active");

    // update
    beforeScrollTopValue = currentScrollTopValue;
  };
})();
*/

// window.addEventListener("scroll", scrollHandler);

// (2) wheel 이벤트와 DOMMouseScroll 이벤트 사용하기
// @see https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event
// @see https://developer.mozilla.org/en-US/docs/Web/API/Element/DOMMouseScroll_event
// wheel 이벤트는 파이어폭스에서는 동작하지않는다. 따라서 파이어폭스 여부에 따라 DOMMouseScroll 이벤트를 적용해야한다.
// 이런 점에서 변수는 항상 유용하다

const scrollHandler = (function () {
  const $nav = document.querySelector("nav");
  const isFireFox = ~navigator.userAgent.indexOf("Firefox");

  const eventType = isFireFox ? "DOMMouseScroll" : "wheel";

  return [
    eventType,
    (e) => {
      // e.detail 은 파이어폭스에서 유효하다.
      const delta = e.wheelDelta ? e.wheelDelta : -e.detail;
      const isScrollDown = delta < 0;

      isScrollDown ? $nav.classList.add("active") : $nav.classList.remove("active");
    },
  ];
})();

window.addEventListener(...scrollHandler);
