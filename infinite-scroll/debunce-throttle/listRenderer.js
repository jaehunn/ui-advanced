import { getList } from "./listBuilder";
import { dummyFetcher } from "./utils";

const listEl = document.getElementById("list");

export const renderList = async (page) => {
  const list = await dummyFetcher(getList, page);

  const fragEl = document.createDocumentFragment();

  list.forEach((item) => fragEl.appendChild(renderItem(item)));

  listEl.appendChild(fragEl);
};

const renderItem = ({ id, no, text }) => {
  const liEl = document.createElement("li");

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
