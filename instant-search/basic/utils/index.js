export const debounce = (callback, delay) => {
  let targetTimer = null;

  // targetTimer 를 자유변수로 가지는 클로저
  // callback 을 대신 실행
  return (...args) => {
    if (targetTimer) clearTimeout(targetTimer);

    targetTimer = setTimeout(callback.bind(null, ...args), delay);

    clearTimeout(targetTimer);
  };
};

// throttle 은 일정 주기마다 이벤트를 발생시킨다.
// 따라서 타이머에 대한 타겟팅보다 이벤트 발생시점에 타겟을 조정해야할것같다.
// 지연시간이 흐르고 이벤트 핸들링이 완료되면 다음 이벤트 핸들링을 해도 좋다는 표시를 남긴다.

export const throttle = (callback, delay) => {
  let throttled = false; // 초기 플래그는 이밴트 핸들링이 적용된다.

  return (...args) => {
    // 지연시간이 흐르기전까지 throttled 는 true 로 설정되어있어야한다.
    if (!throttled) {
      throttled = true;

      setTimeout(() => {
        callback.bind(null, ...args);

        throttled = false; // 지연시간이 흘렀으니 다음 이벤트를 핸들링해도 좋다.
      }, delay);
    }
  };
};
