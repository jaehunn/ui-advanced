const scrollHandler = (function () {
  const $scrollBar = document.querySelector("#scroll-bar");

  return () => {
    // compatibility: <= IE9
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

    // scrollTop: 아래로 길어진다.
    // scorllHeight: 전체 스크롤 높이 (고정)
    // clientHeight: 뷰포트 스크롤 높이 (고정)

    // 전체 스크롤 높이에 대해 뷰포트 스크롤의 높이는 비율이 어떻게 될까?
    const contentHeight = scrollHeight - clientHeight;
    const percentage = +((scrollTop / contentHeight) * 100).toFixed(0);

    // 상단 scrollTop 은 전체 스크롤 높이까지 못가죠.
    // 상단에서 현재 보이는 뷰포트 높이를 뺀 만큼의 높이까지만 도달할거에요 그러니까 비율을 contentHeight 를 기준으로 재는것이죠.
    console.log(contentHeight, percentage);

    // dynamic 하게 style 을 주입할거에요. transfrom translateX 로 증가시킵시다.
    $scrollBar.style.transform = `translateX(-${100 - percentage}%)`;

    // 왜 percentage 를 translateX(pecentage) 하면 안될까요?
    // css 에 width 를 100% 잡아놓고 translateX(-100%) 로 설정했기때문에 -(100 - percentage)% 로 움직여야합니다.

    $scrollBar.style.transition = `transform 0.3s ease-out`;
  };
})();

// scroll 이벤트를 최적화시키면 기능이 이상해질까?
// debouncing 은 적합하지않고, throttling 시간을 짧게 가져가면 기능에 차질은 없어보인다.
const throttling = (callback, delay) => {
  let throttled = false;
  return (...args) => {
    // setTimeout() delay 만큼이 지나지않았다면 여전히 throttled 는 true 가 된다.
    if (!throttled) {
      throttled = true;

      setTimeout(() => {
        callback(...args);

        throttled = false;
      }, delay);
    }
  };
};

const debouncing = (callback, delay) => {
  let timerId = null;
  return (...args) => {
    // 계속 clear 시키면 마지막 timerId 에 대해서만 진행될 것이다.
    clearTimeout(timerId);

    timerId = setTimeout(callback.bind(null, ...args), delay);
  };
};

window.addEventListener("scroll", throttling(scrollHandler, 100));
