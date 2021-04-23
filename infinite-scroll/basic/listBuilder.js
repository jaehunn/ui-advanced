import { v4 as uuidv4 } from "uuid";
import { LoremIpsum } from "lorem-ipsum";

const ITEMS_PER_PAGE = 20;
const list = [];

// list[page] 에 랜더링 시킬 dummy 데이터정보 20개를 저장한다.
export const getList = (page = 0) => {
  // 여기서는 가드절을 피하는 방법이 좋다.
  if (!list[page]) list[page] = listBuilder(page);

  return list[page];
};

const listBuilder = (page) => {
  // page * ITEMS_PER_PAGE 부터 20개의 data 를 만든다.
  return Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => itemBuilder(page * ITEMS_PER_PAGE + index + 1));
};

//
const itemBuilder = (no) => ({
  id: uuidv4(),
  no,
  text: lorem.generateWords(),
});

// lorem text 를 범위에 해당하는 길이만큼 동적으로 생성한다.
const lorem = new LoremIpsum({
  wordsPerSentence: { min: 10, max: 30 },
});
