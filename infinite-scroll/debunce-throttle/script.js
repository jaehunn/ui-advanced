import { v4 as uuidv4 } from "uuid";
import { LoremIpsum } from "lorem-ipsum";

import { dataFetch, debounce } from "./utils";

const containerEl = document.getElementById("container");
const fetchMoreEl = document.getElementById("fetchMore");
const listEl = document.getElementById("list");

const itemsPerPage = 20;
const list = [];
let page = 0;

const lorem = new LoremIpsum({
  wordsPerSentence: { min: 10, max: 30 },
});

const listBuilder = (page) =>
  Array.from({ length: itemsPerPage }).map((_, i) => itemBuilder(page * itemsPerPage + i + 1));

const itemBuilder = (no) => ({
  id: uuidv4(),
  no,
  text: lorem.generateWords(),
});

const getList = (page = 0) => {
  if (!list[page]) list[page] = listBuilder(page);

  return list[page];
};

const render = async (page) => {
  const list = await dataFetch(getList, page);
  const fragEl = document.createDocumentFragment();

  list.forEach(({ no, id, text }) => {
    const liEl = document.createElement("li");

    liEl.insertAdjacentHTML(
      "beforeend",
      `
        <div class="no">${no}</div>
        <div class="content">
          <div class="_id">${id}</div>
          <div class="text">${text}</div>
        </div>
      `
    );

    fragEl.appendChild(liEl);
    listEl.appendChild(fragEl);
  });
};

// TODO) 마운트시 로딩중에 두곳에서 보인다?
const load = async () => {
  const targetEl = page ? fetchMoreEl : containerEl;

  targetEl.classList.add("loading");

  await render(page++);

  targetEl.classList.remove("loading");
};

const onScroll = (e) => {
  const { clientHeight, scrollTop, scrollHeight } = e.target.scrollingElement;

  // 스크롤로 20번째 아이템까지 내린 시점의 scrollTop 값과 clientHeight 값의 합이 전체 스크롤 높이값이 되면 트리거한다.
  if (scrollTop + clientHeight === scrollHeight) load();
};

document.addEventListener("scroll", debounce(onScroll, 300));
load();
