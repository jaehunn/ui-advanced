const navEl = document.querySelector("#nav");
const contentsEl = document.querySelector("#contents");

// nav 의 li 들, contents 의 div 들 컬렉션 생성
const navItemEls = Array.from(navEl.children);
const contentsItemEls = Array.from(contentsEl.children);

// offsetTop: 화면 최상단, 0부터 시작
// clientHeight: 뷰포트 높이
// scrollTop: 현재 scroll 최상단, 0부터 시작

const offsetTops = contentsItemEls.map((contentsEl) => {
  const { offsetTop, clientHeight } = contentsEl;

  // 스크롤시 보여질 div 가 절반쯤 보이는 범위에서 li 하이라이트 처리
  return [offsetTop - clientHeight / 2, offsetTop + clientHeight / 2];
});

window.addEventListener("scroll", (e) => {
  // 현재 스크롤 높이 가져오기
  const { scrollTop } = e.target.scrollingElement;

  const targetIndex = offsetTops.findIndex(
    ([from, to]) =>
      //    범위 안에 들었을떄
      from <= scrollTop && scrollTop < to
  );

  // 요소잡고 하이라이트 주기
  navItemEls.forEach((navItemEl, index) => {
    // 모든 하이라이트 제거 및 targetIndex 하이라이트 추가
    if (index !== targetIndex) navItemEl.classList.remove("on");
    else navItemEl.classList.add("on");
  });
});

// nav item 클릭시 해당 div 로 이동
navEl.addEventListener("click", (e) => {
  const targetEl = e.target;

  // tagName == nodeName
  if (targetEl.tagName === "BUTTON") {
    // 해당 li 의 인덱스를 찾는다.
    const targetIndex = navItemEls.indexOf(targetEl.parentElement);

    // scrollIntoView 함수로 해당 div 로 이동, block start 로 div 의 시작점부터 보인다.
    contentsItemEls[targetIndex].scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }
});

// 윈도우 사이즈가 줄었을때 스크롤에 대한 하이라이트가 이상해진다. (최초에 offsetTops 을 한번 설정해 정적이다.)
