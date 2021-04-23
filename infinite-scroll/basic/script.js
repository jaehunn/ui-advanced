import { renderList } from "./listRenderer";

const appEl = document.querySelector("#app");
const fetchMoreTriggerEl = document.querySelector("#fetchMore");

let page = 0; // 로드 횟수

const fetchMore = async () => {
  // page 가 0 이면 appEl 에 loading 클래스를 토글한다.
  const targetEl = page ? fetchMoreTriggerEl : appEl;

  // display: block
  targetEl.classList.add("loading");

  // 데이터를 렌더링한다.
  await renderList(page++);

  // display: none
  targetEl.classList.remove("loading");
};

const onScroll = (e) => {
  const { clientHeight, scrollTop, scrollHeight } = e.target.scrollingElement;

  // scrollHeight 스크롤 전체 높이에 대해서
  // 스크롤시 scrollTop 이 증가한다.
  // 현재 뷰포트의 높이와 scrollTop 의 합이 scrollHeight 가 되는 순간 리스트를 렌더링한다.
  if (scrollTop + clientHeight === scrollHeight) fetchMore();
};

document.addEventListener("scroll", onScroll);

fetchMore(); // 마운트시 로딩

// onScroll 이벤트를 아주 많이 발생한다. 따라서 핸들링을 최적화할 필요가 있다.
