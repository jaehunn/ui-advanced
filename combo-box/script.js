// 기능 리스트
// 1. input 에 텍스트를 입력하고 엔터를 누르면 아이템이 리스트에 생성된다.
// 2. 리스트에서 아이템을 클릭하면 라벨에 텍스트가 생성되고 리스트가 사라진다.
// 3. arrow 아이콘을 클릭하면 리스트가 보여진다.

// store
const itemList = [
  {
    id: 1,
    label: "item A",
  },
  {
    id: 2,
    label: "item B",
  },
  {
    id: 3,
    label: "item C",
  },
];

const currentTargetItem = null;

const ITEM_ADDED = "ITEM_ADDED";

(function App() {
  // select dom
  const $currentItemInfo = document.querySelector("h3");
  const $searchInput = document.querySelector("input");
  const $arrowDownIcon = document.querySelector("img");
  const $notification = document.querySelector(".noti");
  const $comboList = document.querySelector(".combo-list");

  const handleSearchInputChange = ({ target: { value }, key }) => {
    if (!value) return;

    // 엔터를 감지한다.
    if (key === "Enter") {
      const nextId = itemList.length;
      itemList.push({
        id: nextId,
        label: value,
      });

      // 아이템이 추가됬을때 커스텀 이벤트를 발생시킨다.
      document.dispatchEvent(new CustomEvent(ITEM_ADDED));

      $comboList.innerHTML = itemList.map(
        (({ id, label }) => `<li class="item_${id}">${label}</li>`).join("")
      );
    }
  };

  const handleComboListClick = ({ target: { nodeName, innerText } }) => {
    if (nodeName !== "LI") return;

    // 아이템이 클릭되면 input 과 현재 아이템의 라벨을 보인다.
    $searchInput.value = innerText;
    $currentItemInfo.textContent = `현재 선택된 아이템은 ${innerText} 입니다.`;

    // 동시에 리스트를 hide 한다.
    toggleComboList(); // 현재 상태를 고려할 필요없이 호출만한다.
  };

  const handleArrowDownIconClick = () => {
    toggleComboList();
  };

  // event handler
  const toggleComboList = () => {
    const isVisible = $comboList.style.visibility === "visible";

    $comboList.style.visibility = isVisible ? "hidden" : "visible";
  };

  return function () {
    // event binding
    // 아이템 생성 시 발생하는 custom 이벤트
    document.addEventListener(ITEM_ADDED, () => {
      $notification.classList.add("noti.show");
      $notification.classList.remove("noti.remove");

      // timeout 을 설정해서 notification 이 닫히도록 한다.
      window.setTimeout(() => {
        $notification.classList.add("noti.remove");
        $notification.classList.remove("noti.show");
      }, 3000);
    });

    $arrowDownIcon.addEventListener("click", handleArrowDownIconClick);

    $comboList.addEventListener("click", handleComboListClick);

    $searchInput.addEventListener("keyup", handleSearchInputChange);
  };
})();
