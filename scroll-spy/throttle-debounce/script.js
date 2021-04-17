import { debounce, throttle } from "./utils";

// wip
const navEl = document.querySelector("#nav");
const contentsEl = document.querySelector("#contents");

const navItemEls = Array.from(navEl.children);
const contentsItemEls = Array.from(contentsEl.children);

let offsetTops = [];
const resizeHandler = () => {
  offsetTops = contentsItemEls.map((contentsEl) => {
    const { offsetTop, clientHeight } = contentsEl;

    return [offsetTop - clientHeight / 2, offsetTop + clientHeight / 2];
  });
};

resizeHandler();

// 스크롤 이벤트를 일정 주기마다 실행하기 위해 throttle 을 사용한다.
window.addEventListener(
  "scroll",
  throttle((e) => {
    const { scrollTop } = e.target.scrollingElement;

    const targetIndex = offsetTops.findIndex(([from, to]) => from <= scrollTop && scrollTop < to);

    navItemEls.forEach((navItemEl, index) => {
      if (index !== targetIndex) navItemEl.classList.remove("on");
      else navItemEl.classList.add("on");
    });
  }, 300)
);

// resize 는 최종 발생이벤트에 적용하는 것이 적합하므로 debounce 를 사용한다.
// 300ms 는 사용자가 인위적인 느낌이 들지않는 시간대다.
window.addEventListener("resize", debounce(resizeHandler, 300));

navEl.addEventListener("click", (e) => {
  const targetEl = e.target;

  if (targetEl.tagName === "BUTTON") {
    const targetIndex = navItemEls.indexOf(targetEl.parentElement);

    contentsItemEls[targetIndex].scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }
});

// 이슈: resize 했을때 item 하이라이트가 바로 반영되지않는다. 약간의 스크롤이 필요하다.
