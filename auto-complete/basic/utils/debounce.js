const debounce = (handler, delay) => {
  let latestTimerTarget = null;

  return (...args) => {
    // 지연시간이 채 되지않았다면 계속 이전의 이벤트가 초기화된다.
    clearTimeout(latestTimerTarget);

    // rest 로 받은 것들은 배열이므로 spread 로 다시 뿌려줘야한다.
    latestTimerTarget = setTimeout(() => {
      handler.bind(null, ...args);

      clearTimeout(latestTimerTarget);
    }, delay);
  };
};

export default debounce;
