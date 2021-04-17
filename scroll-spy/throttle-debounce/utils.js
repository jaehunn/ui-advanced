export const throttle = (func, delay) => {
  // delay 간격동안 true 로 설정되면 func 를 실행할 수 없다.
  // func 가 실행되고 delay 만큼 지나면 false 로 세팅된다.
  let throttled = false;

  return (...args) => {
    if (!throttled) {
      throttled = true;

      setTimeout(() => {
        // 대신 실행한다.
        func(...args);

        throttled = false;
      }, delay);
    }
  };
};

export const debounce = (func, delay) => {
  let timeoutId = null;
  return (...arg) => {
    // 이벤트가 발생했으면 이전 이벤트를 지운다.
    clearTimeout(timeoutId);

    // 이벤트마다 계속 지연된다.
    timeoutId = setTimeout(func.bind(null, ...arg), delay);
  };
};

// 체계적으로 이용하고 싶다면 라이브러리를 사용하자.
