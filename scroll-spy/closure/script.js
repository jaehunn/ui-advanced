const navEl = document.querySelector("#nav");
const contentsEl = document.querySelector("#contents");

const navItemEls = Array.from(navEl.children);
const contentsItemEls = Array.from(contentsEl.children);

// 최초에 한번 호출해야한다.
const getOffsetTops = (() => {
  // 최근에 감지된 innerHeight, 결과값을 클로저로 보관한다.
  let offset = 0;
  let result = [];

  return () => {
    // 현재 innerHeight 값을 판단한다.
    if (window.innerHeight === offset) return result;

    // window 크기가 달라졌다.
    offset = window.innerHeight;
    result = contentsItemEls.map((contentsItemEl) => {
      const { offsetTop, clientHeight } = contentsItemEl;

      return [offsetTop - clientHeight / 2, offsetTop + clientHeight / 2];
    });

    return result;
  };
})();

// offsetTops 를 매번 호출해 최신 상태로 가져와 targetIndex 를 가져올 수 있다.
// 하지만, 스크롤이벤트는 아주 많이 발생하는데, 많이 발생하는 이벤트에 맞춰 같은 횟수의 함수를 호출해야한다.
// 플래그로서 window.innerHeight 를 사용하고, 클로저로 특정 값을 저장하면 최적화시킬 수 있다.
window.addEventListener("scroll", (e) => {
  const { scrollTop } = e.target.scrollingElement;

  const targetIndex = getOffsetTops().findIndex(([from, to]) => from <= scrollTop && scrollTop < to);

  navItemEls.forEach((navItemEl, index) => {
    if (index !== targetIndex) navItemEl.classList.remove("on");
    else navItemEl.classList.add("on");
  });
});

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

// resize 를 최적화헀다. 그러나 리사이즈 스크롤에만 의미가 있다. 리사이즈가 없는 스크롤에 함수가 호출되는 이슈는 여전하다.
