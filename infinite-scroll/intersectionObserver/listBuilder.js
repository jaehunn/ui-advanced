import { v4 as uuidv4 } from "uuid";
import { LoremIpsum } from "lorem-ipsum";

const ITEMS_PER_PAGE = 20;
const list = [];

export const getList = (page = 0) => {
  if (!list[page]) list[page] = listBuilder(page);

  return list[page];
};

const listBuilder = (page) => {
  return Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => itemBuilder(page * ITEMS_PER_PAGE + index + 1));
};

const itemBuilder = (no) => ({
  id: uuidv4(),
  no,
  text: lorem.generateWords(),
});

const lorem = new LoremIpsum({
  wordsPerSentence: { min: 10, max: 30 },
});
