import { renderList } from "./listRenderer";

const appEl = document.querySelector("#app");
const fetchMoreTriggerEl = document.querySelector("#fetchMore");

let page = 0;

const fetchMore = async () => {
  const targetEl = page ? fetchMoreTriggerEl : appEl;

  targetEl.classList.add("loading");

  await renderList(page++);

  targetEl.classList.remove("loading");
};

const fetchMoreTriggerObserver = new IntersectionObserver(([{ isIntersecting }]) => {
  if (isIntersecting) fetchMore();
});

// observe 할 수 있도록 style.css 에서 fetchMore 를 초기에 display none 을 풀어야한다.
fetchMoreTriggerObserver.observe(fetchMoreTriggerEl);

fetchMore();
