export const dummyFetcher = (cb, args) => new Promise(randomTimer(cb, args));

export const randomTimer = (cb, ...args) => (resolve) => {
  setTimeout(() => resolve(cb(...args)), getRandomSeconds());
};

const getRandomSeconds = () => (Math.round(Math.random() * 5) + 1) * 250;
