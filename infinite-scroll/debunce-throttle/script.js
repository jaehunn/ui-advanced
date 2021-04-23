import { renderList } from "./listRenderer";
import { debounce, throttle } from "./utils";

const appEl = document.querySelector("#app");
const fetchMoreTriggerEl = document.querySelector("#fetchMore");

let page = 0;

const fetchMore = async () => {
  const targetEl = page ? fetchMoreTriggerEl : appEl;

  targetEl.classList.add("loading");

  await renderList(page++);

  targetEl.classList.remove("loading");
};

const onScroll = (e) => {
  console.log("Event!");
  const { clientHeight, scrollTop, scrollHeight } = e.target.scrollingElement;

  if (scrollTop + clientHeight === scrollHeight) {
    console.log("Trigger!");

    fetchMore();
  }
};

// 300ms 마다 하나의 이벤트를 채택하면서 스크롤 트리거에 도착했다면 fetchMore한다.
document.addEventListener("scroll", debounce(onScroll, 300));

fetchMore();
