export const dummyFetcher = (cb, args) => new Promise(randomTimer(cb, args));

export const randomTimer = (cb, ...args) => (resolve) => {
  setTimeout(() => resolve(cb(...args)), getRandomSeconds());
};

// Math.round() 0부터 5 까지 나오는 수에서 1 - 6 까지 범위를 설정한다.
// 250 로 범위를 확장하면 250ms 부터 1250ms 까지 랜덤하게 ms 가 설정된다.
const getRandomSeconds = () => (Math.round(Math.random() * 5) + 1) * 250;
