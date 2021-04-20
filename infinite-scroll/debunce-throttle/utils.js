// [250 ~ 1500]
const getRandomSeconds = () => (Math.round(Math.random() * 5) + 1) * 250;

export const randomTimer = (func, ...args) => (resolve) => {
  setTimeout(() => resolve(func(...args)), getRandomSeconds());
};

export const dataFetch = (method, args) => new Promise(randomTimer(method, args));

// scroll 이벤트는 과도하게 발생하기 때문에 그때마다 핸들링하는 것은 비용이 많이든다.
// throttle 과 debounce 기법은 이벤트핸들링에 제약을 걸어 효율을 높인다.
// throttle 은 일정 주기마다 이벤트를 실행한다.
// debounce 는 이벤트가 발생하고 일정 간격동안 발생하지않으면 마지막 이벤트에 대해서만 채택하는 것을 말한다.

// 화면의 크기를 조절하는 리사이징 이벤트의 경우 보통 주기적으로 체크하지않고 마지막 리사이즈에 대해서만 작동하는 것이 효율적이므로 debounce 를 사용한다.
// 무한 스크롤의 경우 스크롤이 최하단에 이르렀을때 이벤트를 발생하는 debounce 를 생각하기 쉽지만,
// debounce 는 최하단으로 일단 이동한뒤 지연이 발생하므로 주기적인 throttling 으로 핸들링을 관리하는 것이 좋다.

export const debounce = (func, delay) => {
  let timeoutId = null;
  // do something
  return (...args) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(func.bind(null, ...args), delay);
  };
};
