// @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect

/*
options
    idField: 해당 row의 id로 활용할 key
    labelField: 해당 row의 label로 활용할 key
    data: 표현될 리스트
    changeEvent: 선택된 데이터를 받을 수 있는 callback
    selector: 선택된 데이터를 표시할 라벨 영역
    backdrop: dropdown list를 출력할 영역
*/

export class DropDownList {
  constructor(config) {
    this.rowHeight = 27;
    this.labelText = "선택해주세요!";
    this.currentIndex = -1;

    this.idField = config.idField || "id";
    this.labelField = config.labelField || "label";
    this.data = config.data;

    this.dropdownLabel = this.init(document.querySelector(config.selector), this.labelText);
    this.backdrop = document.querySelector(config.backdrop);
    this.dropdownItem = this.renderDropDownList(this.backdrop, config.data);

    this.eventBinding();
  }

  // 1. init: 최초 렌더링에 대해 select box 라벨 영역을 렌더링한다.
  init($element, labelText) {
    const dropdownLabel = document.createElement("div");
    dropdownLabel.classList.add("dropdown-select-label-container");
    
    const render = `
    `
  }

  // 2. renderDropDownList
  renderDropDownList() {
    // ...
  }

  // 3. eventBinding
  eventBinding() {
    // ...
  }
}
