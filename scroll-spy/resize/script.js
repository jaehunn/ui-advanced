const navEl = document.querySelector("#nav");
const contentsEl = document.querySelector("#contents");

const navItemEls = Array.from(navEl.children);
const contentsItemEls = Array.from(contentsEl.children);

// global 로 관리한다.
let offsetTops = [];
const resizeHandler = () => {
  offsetTops = contentsItemEls.map((contentsEl) => {
    const { offsetTop, clientHeight } = contentsEl;

    // window.innerHeght == clientHeight

    return [offsetTop - clientHeight / 2, offsetTop + clientHeight / 2];
  });
};

// 최초에 한번 호출해 초기 innerHeight 에 대해 offsetTops 값이 초기화되어야한다.
resizeHandler();

window.addEventListener("scroll", (e) => {
  const { scrollTop } = e.target.scrollingElement;

  const targetIndex = offsetTops.findIndex(([from, to]) => from <= scrollTop && scrollTop < to);

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

// resize 에만 국한해 이벤트 핸들러(함수) 를 동작시킨다.
window.addEventListener("resize", resizeHandler);
