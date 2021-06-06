// @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect

// DropDownList 클래스

export default class DropDownList {
  constructor(config) {
    this.rowHeight = 27;
    this.emptyLabel = "선택해주세요."; // option 의 default label
    this.currentIndex = -1; // null 대신 -1 로 초기설정

    // 설정값 인자로 커스터마이징될 수 있다.
    this.idField = config.idField || "id"; //
    this.labelField = config.labelField || "label";
    this.data = config.data;
    this.callback = config.changeEvent;

    this.dropDownLabel = this.initialize(document.querySelector(config.selector), this.emptyLabel);

    // // option 이 선택되면 backdrop 에 표시한다.
    // this.backDrop = document.querySelector(config.backDrop);
    // this.dropDownItem = this.displayDropDownItemList(this.backDrop, config.data);

    // // 마지막은 event bind
    // this.eventBinding();
  }

  // 초기 동작, 마운트 시 option 들을 렌더링한다.
  initialize(selector, emptyLabel) {
    // wrapper
    let dropDownLabel = document.createElement("div");
    dropDownLabel.classList.add("dropdown-select-label-container");

    const renderText = `
      <span class="dropdown-select-label">${emptyLabel}</span>
      <div class="dropdown-select-arrow-container">
        <div class="dropdown-select-arrow"></div>
      </div>
    `;

    // 요소 시작 부분(begin) 안쪽(after)
    dropDownLabel.insertAdjacentHTML("afterbegin", renderText);

    // wrapper 통째를 자식으로 붙히기
    selector.appendChild(dropDownLabel);

    return dropDownLabel;
  }

  // selector box 의 option 들을 렌더링하는 메서드
  displayDropDownItemList(selector, data) {
    // ...
  }

  // 요소에 이벤트 핸들러를 부착하는 메서드
  eventBinding() {
    // ...
  }
}
