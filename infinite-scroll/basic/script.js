import { getList, dummyFetcher } from "./utils";

const appEl = document.querySelector("#app");
const fetchMoreTriggerEl = document.querySelector("#fetchMore");
const listEl = document.querySelector("#list");

const renderList = async (pageIndex) => {
  const list = await dummyFetcher(getList, pageIndex);

  const fragEl = document.createDocumentFragment();

  list.forEach((item) => fragEl.appendChild(renderItem(item)));

  listEl.appendChild(fragEl);
};

const renderItem = ({ id, no, text }) => {
  const liEl = document.createElement("li");

  liEl.insertAdjacentHTML(
    "beforeend",
    `
      <div class="no>${no}</div>
      <div class="content">
        <div class="_id">${id}</div>
        <div class="text">${text}</div>
      </div>
    `
  );
};

let pageIndex = 0;

const loadMore = async () => {
  const targetEl = pageIndex ? fetchMoreTriggerEl : appEl;

  targetEl.classList.add("loading");

  await renderList(pageIndex);

  pageIndex += 1;

  targetEl.classList.remove("loading");
};

// scroll 시 loadMore 실행
const onScroll = (e) => {
  const {
    clientHeight, // 현재 뷰포트 높이
    scrollTop, // 현재 스크롤 높이
    scrollHeight, // 전체 스크롤 높이
  } = e.target.scrollingElement;

  if (scrollTop + clientHeight === scrollHeight) loadMore();
};

document.addEventListener("scroll", onScroll);

loadMore(); // 마운트
