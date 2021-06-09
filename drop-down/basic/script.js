import "./style.css";
import { retrieveOptionData, retrieveOptionItemById, retrieveUserData } from "./data";
import DropDownList from "./DropDownList";

main();

function main() {
  const $userList = document.querySelector(".userlist-container");
  const userData = retrieveUserData();

  new DropDownList({
    selector: {
      dropdownContainer: ".dropdown-container",
      backdropContainer: ".backdrop-container"
    },
    field: {
      id: "id",
      label: "label"
    },
    optionData: retrieveOptionData(),
    eventHandler: { 
      onChange: ({ id }) => {
        const newUserData = id ? userData.filter(({ favorites }) => favorites === id) : userData;
  
        renderUserList($userList, newUserData);
      }
    }
  });

  // changeEvent 가 일어나기 전에는 모든 userData 를 표시한다.
  renderUserList($userList, userData);
}

// 특정 요소에 userList 데이터를 렌더링하는 함수로 빼내었다.
function renderUserList($target, userList) {
  $target.innerHTML = userList.reduce((result, { username, favorites}) => {
    const favoriteOption = retrieveOptionItemById(favorites);

    return result +=
      `<div>
        <span>${username}</span>
        <span>favorites: ${favoriteOption.label}</span>
      </div>`;
  }, "");
}
