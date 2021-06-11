const debounce = (handler, delay) => {
  let latestTimerTarget = null;

  return (...args) => {
    // 지연시간이 채 되지않았다면 계속 이전의 이벤트가 초기화된다.
    clearTimeout(latestTimerTarget);

    // rest 로 받은 것들은 배열이므로 spread 로 다시 뿌려줘야한다.
    latestTimerTarget = setTimeout(() => {
      handler.bind(null, ...args);

      // 마지막으로 채택된 이벤트 뒤로는 이벤트를 핸들링하지않아서 clearTimeout() 되지않으므로 처리해야한다.
    }, delay);
  };
};

export default debounce;
