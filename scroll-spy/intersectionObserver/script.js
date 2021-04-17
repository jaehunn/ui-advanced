// @see https://heropy.blog/2019/10/27/intersection-observer/

const navEl = document.querySelector("#nav");
const contentsEl = document.querySelector("#contents");

const navItemEls = Array.from(navEl.children);
const contentsItemEls = Array.from(contentsEl.children);

const scrollSpyObserver = new IntersectionObserver(
  (entries) => {
    // intersecting 의 target 으로 요소를 가져와서
    const { target } = entries.find((entry) => entry.isIntersecting) || {};

    // contents 의 items 들 중 몇번째 item 인지 찾는다.
    const targetIndex = contentsItemEls.indexOf(target);

    // nav items 를 돌면서 하이라이트 처리한다.
    navItemEls.forEach((navItemEl, index) => {
      if (index === targetIndex) navItemEl.classList.add("on");
      else navItemEl.classList.remove("on");
    });
  },
  { root: null, rootMargin: "0px", threshold: 0.5 } // threshold: intersection 되는 비율을 나타낸다.
);

// scrollTop 이나 clientHeight 를 따로 계산하지않아도 된다.

// contentsItemEl 들을 observe 한다.
contentsItemEls.forEach((contentsItemEl) => scrollSpyObserver.observe(contentsItemEl));

// nav item 클릭시 scrollIntoView 한다.
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
