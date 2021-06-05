import "./style.css";
import { retrieveOptionData, retrieveOptionItemById, retrieveUserData } from "./data";
import DropDownList from "./DropDownList";

const renderUserList = ($element, data) => {
  $element.innerHTML = data.reduce(
    (result, item) =>
      result +
      `<div>
            <span>User: ${item.userName}</span>,
            <span>favorites: ${retrieveOptionItemById(item["favorites"]).label}</span>
      </div>`,
    ""
  );
};

const main = () => {
  new DropDownList({
    selector: "#dropdown",
    backdrop: ".back-drop",
    idField: "id",
    labelField: "label",
    data: retrieveOptionData(),
    changeEvent: (e) => {
      // select box 에서 change 가 발생하면 renderUserList() 로 선택 data 를 렌더링한다.
      // id 가 없음은 default 하게 모든 리스트를 보여주는 것을 의미한다.
      renderUserList(document.querySelector("#userlist"), e.id ? retrieveUserData().filter((item) => item.favorites === e.id) : retrieveUserData());
    },
  });

  // mount
  renderUserList(document.querySelector("#userlist"), retrieveUserData());
};

main();
