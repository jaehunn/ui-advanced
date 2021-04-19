import { v4 as uuidv4 } from "uuid";
import { LoremIpsum } from "lorem-ipsum";

const pageLimit = 20;
const list = [];

const lorem = new LoremIpsum({
  wordsPerSentence: { min: 10, max: 30 },
});

const itemBuilder = (no) => ({
  id: uuidv4(),
  no,
  text: lorem.generateWords(),
});

const listBuilder = (pageIndex) =>
  Array.from({ length: pageLimit }).map((_, index) => itemBuilder(pageIndex * pageLimit + index + 1));

export const getList = (pageIndex = 0) => {
  if (!list[pageIndex]) list[pageIndex] = listBuilder(pageIndex);

  return list[pageIndex];
};

const getRandomSeconds = () => (Math.round(Math.random() * 5) + 1) * 250;

export const randomTimer = (func, ...args) => (resolve) => {
  setTimeout(() => resolve(func(...args)), getRandomSeconds());
};

export const dummyFetcher = (method, args) => new Promise(randomTimer(method, args));
