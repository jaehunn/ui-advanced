// debounce 는 설정된 시간동안에 실행된 이벤트 중 마지막 이벤트만을 채택하는 기법이다.
// throttle 은 설정된 시간마다 이벤트 하나를 핸들링한다.

// 여기서는 debounce 로 무한스크롤을 최적화시켰지만, throttle 이 적합하다.
// debounce 의 경우 맨 아래 스크롤를 내리고 지연시간이 흐른뒤 이벤트를 핸들링한다.
// throttle 은 일정시간마다 이벤트를 핸들링하므로 delay 가 길수록 무한스크롤에는 throttle 이 적합하다.

// debounce 는 연속적이고 많은 이벤트가 발생하면 이벤트가 끝나기를 무한정 기다린다.
// throttle 은 이벤트가 발생하고 주기적으로 핸들링을 동작시킨다.
// 지연시간을 짧게 가져가면 debounce 는 throttle 과 비슷한 효과를 낸다.

export const debounce = (cb, delay) => {
  // 핸들링 변수를 생성한다.
  let timeoutId = null;

  // closure 로 timeoutId 를 기억한다.
  return (...args) => {
    clearTimeout(timeoutId); // delay 동안 다른 이벤트가 발생하면 덮어쓴다.

    timeoutId = setTimeout(cb.bind(null, ...args), delay);
  };
};

export const throttle = (cb, delay) => {
  let throttled = false;

  // throttled 를 기억하는 클로저 반환한다.
  return (...args) => {
    if (!throttled) {
      throttled = true;

      // 이벤트가 발생하고 지연시간 동안 발생한 이벤트들을 핸들링한다.
      setTimeout(() => {
        cb(...args);

        throttled = false;
      }, delay);
    }
  };
};

export const dummyFetcher = (cb, args) => new Promise(randomTimer(cb, args));

export const randomTimer = (cb, ...args) => (resolve) => {
  setTimeout(() => resolve(cb(...args)), getRandomSeconds());
};

const getRandomSeconds = () => (Math.round(Math.random() * 5) + 1) * 250;
