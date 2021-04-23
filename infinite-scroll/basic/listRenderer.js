import { getList } from "./listBuilder";
import { dummyFetcher } from "./utils";

const listEl = document.getElementById("list");

export const renderList = async (page) => {
  // dummy data 정보 리스트를 가져온다.
  const list = await dummyFetcher(getList, page);

  const fragEl = document.createDocumentFragment();

  // frag wrapper 요소를 만들어서 dummy data 를 각각 돌면서 DOM 맵핑하고 자식요소로 붙힌다.
  // frag wrapper 요소는 요소들을 묶는 역할만하고 DOM 에 직접적으로 나타나지않는다.
  list.forEach((item) => fragEl.appendChild(renderItem(item)));

  // frag wrapper 를 다시 listEl 에 붙힌다.
  listEl.appendChild(fragEl);
};

const renderItem = ({ id, no, text }) => {
  const liEl = document.createElement("li");

  // li 요소를 만들어서 요소 안, 끝에 붙힌다. -> li 는 wrapper 가 된다.
  liEl.insertAdjacentHTML(
    "beforeend",
    `
    <div class="no">${no}</div>
    <div class="content">
        <div class="_id">${id}</div>
        <div calss="text">${text}</div>
    </div>
  `
  );

  return liEl;
};
