// 1] 개별 item 에 리스너 붙히기

const itemEls = document.querySelectorAll(".item");

itemEls.forEach((currentItemEl) => {
  currentItemEl.addEventListener("click", (e) => {
    currentItemEl.classList.toggle("open");

    // 현재 item 이 click 될 때, 그 외 item 들의 active 를 끈다.
    itemEls.forEach((itemEl) => {
      if (itemEl !== currentItemEl) itemEl.classList.remove("open");
    });
  });
});

// item 이 새로 추가되었을 때 이벤트 리스너가 없어 감지하지못한다.
// item 마다 감지를 하기때문에 감지 리스너가 많아져 메모리에 부담이 된다.

// 2] 이벤트 버블링 이용하기 (상위 DOM 에서 하위 DOM 이벤트를 감지한다.)
const wrapperEl = document.querySelector(".wrapper");
const itemEls = document.querySelectorAll(".item");

// 상위 DOM 으로 추가되는 item 을 모두 감지하도록한다.
wrapperEl.addEventListener("click", (e) => {
  // 엘리먼트를 변수로 잡아 로직에서 사용하기 쉽도록 한다.
  const targetEl = e.target;
  e.stopPropagation();

  // 감지된 요소가 item 아니면 핸들러를 동작시키지 않는다.
  if (!targetEl.classList.contains("item")) return;

  targetEl.classList.toggle("open");

  // 현재 item 을 제외한 다른 item 들에 대해 active 를 제거한다.
  itemEls.forEach((itemEl) => {
    if (itemEl !== targetEl) itemEl.classList.remove("open");
  });
});

// 외부에 대해 이벤트를 감지한다.
document.body.addEventListener("click", (e) => {
  // 감지된 요소가 context 라면 핸들러를 동작하지 않는다. (다르게 item 을 toggle 하면 꺼져야하므로 동작한다.)
  if (e.target.classList.contains("context")) return;

  // 외부 요소를 클릭하면 모든 active 가 제거된다.
  itemEls.forEach((itemEl) => {
    itemEl.classList.remove("open");
  });
});

// 이벤트 버블링과 캡쳐링으로 이벤트 핸들링을 최적화할 수 있다. (e.stopPropagation(), e.preventDefault())
// e.stopPropagation() 을 쓰지않으면, wrapper 에서 감지된 이벤트가 body 로 전파되어 context 가 바로 꺼진다.

// 3] 최상위 DOM 에서 감지하기
const wrapperEl = document.querySelector(".wrapper");
const itemEls = document.querySelectorAll(".item");

document.body.addEventListener("click", (e) => {
  // 변수로 간추리기
  const currentEl = e.target;
  const targetClassList = currentEl.classList;

  // 1. context -> 무반응
  // 2. item -> 토글
  // 3. 그외 -> 모든 active 제거

  if (targetClassList.contains("context")) return;
  if (targetClassList.contains("item")) {
    targetClassList.toggle("open");

    itemEls.forEach((itemEl) => {
      if (itemEl !== currentEl) itemEl.classList.remove("open");
    });

    return;
  }

  itemEls.forEach((itemEl) => {
    itemEl.classList.remove("open");
  });
});

// 상대적으로 리스너가 줄었지만, 리스너 안에서 복잡한 분기 처리가 늘어나고, 개별 요소에 대해 리스너를 등록, 해제하는 유연성이 부족해진다.
