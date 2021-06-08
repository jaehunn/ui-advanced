import "./style.css";
import { retrieveOptionData, retrieveOptionItemById, retrieveUserData } from "./data";
import DropDownList from "./DropDownList";

main();

function main() {
  const userListEl = document.querySelector("#userlist");
  const defaultUserData = retrieveUserData();

  new DropDownList({
    selector: "#dropdown",
    backdrop: ".back-drop",
    idField: "id",
    labelField: "label",
    data: retrieveOptionData(),

    // changeEvent 는 selector box 가 선택되면 동작한다.
    //  1. default 로 명시된 label 의 경우에는 모든 리스트를 뿌려준다.
    //  2. 특정 id 에 대하여 뿌려준다.
    changeEventHandler: ({ id }) => {
      const userData = id ? defaultUserData.filter(({ favorites }) => favorites === id) : defaultUserData;

      renderUserList(userListEl, userData);
    },
  });

  renderUserList(userListEl, defaultUserData);
}

// user 의 favorite 과 option 의 id 가 관계에 놓여있다.
function renderUserList(targetEl, data) {
  targetEl.innerHTML = data.reduce((result, item) => {
    return result +=
      `<div>
        <span>${item.userName}</span>
        <span>favorites: ${retrieveOptionItemById(item["favorites"]).label}</span>
      </div>`;
  }, "");
}
