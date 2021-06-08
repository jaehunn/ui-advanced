export default class DropDownList {
  constructor({ selector, idField, labelField, data, changeEventHandler}) {
    this.targetIndex = -1; // 선택된 item

    // 설정값 인자로 커스터마이징될 수 있다.
    this.idField = idField || "id"; //
    this.labelField = labelField || "label";
    this.data = data;
    this.callback = changeEventHandler;

    const dropDownContainerEl = document.querySelector(selector);
    this.dropDownSelectLabelContainerEl = this.initialize(dropDownContainerEl);

    // option 이 선택되면 backdrop 에 표시한다.
    this.backDropContainerEl = document.querySelector(backDrop);
    this.dropDownItemEl = this.displayDropDownItemList(this.backDropContainerEl, data);

    this.eventBinding();
  }

  // 초기 동작, 마운트 시 option 들을 렌더링한다.
  initialize(dropDownContainerEl, label = "선택해주세요.") {
    const dropDownSelectLabelContainerEl = document.createElement("div");
    dropDownSelectLabelContainerEl.classList.add("dropdown-select-label-container");

    const dropDownSelectLabelHTML = `
      <span class="dropdown-select-label">${label}</span>
      <div class="dropdown-select-arrow-container">
        <div class="dropdown-select-arrow"></div>
      </div>
    `;

    // 요소 시작 부분(begin) 안쪽(after)
    dropDownSelectLabelContainerEl.insertAdjacentHTML("afterbegin", dropDownSelectLabelHTML);

    dropDownContainerEl.appendChild(dropDownSelectLabelContainerEl);
    
    return dropDownSelectLabelContainerEl;
  }

  displayDropDownItemList(backDropContainerEl, data) {
    if (!backDropContainerEl) return;

    backDropContainerEl.innerHTML = data.reduce((result, item) => {
      return result += 
      `<div class="dropdown-item">
        <span>${item[this.labelField]}</span>
      </div>`
    }, '<div class="dropdown-list">') + "</div>";

    // 요소 좌표 가져오기
    // @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
    const dropDownSelectLabelContainerRect = this.dropDownSelectLabelContainerEl.getBoundingClientRect();
    const dropDownListEl = document.querySelector(".dropdown-list");

    const { width, top, left} = dropDownSelectLabelContainerRect;

    dropDownListEl.style.cssText = `
      position: absolute;
      width: ${width}px;
      top: ${top + 5}px;
      left: ${left}px;
    `
  }

  eventBinding() {
    // 1. backDrop 클릭 이벤트 -> backDrop 숨기기
    this.backDropContainerEl.addEventListener('click', () => {
      this.backDropContainerEl.style.cssText = "display: none;";
    })

    // 2. dropdown label 클릭 이벤트 -> backDrop 나타내기
    this.dropDownSelectLabelContainerEl.addEventListener("click", () => {
      this.backDropContainerEl.style.cssText = "display: block;";
    })

    // 3. dropdown item 을 돌면서 
    document.querySelectorAll("dropdown-item").forEach((dropDownItemEl, index) => {
      dropDownItemEl.addEventListener("click", () => {
        const currentOption = this.retrieveOptionByIndex(index);
        
        // remove active
        if (~this.targetIndex) this.unselectedDropDownItem(this.targetIndex)

        // add active
        if (~this.targetIndex) this.selectedDropDownItem(this.targetIndex);

        // dispatch 이용하기
        this.dispatchEvent({
          id: currentOption[this.idField],
          label: currentOption[this.labelField]
        })
      })
    })
  }

  // utils
  dispatchEvent(payload) {
    this.dropDownSelectLabelContainerEl.querySelector(".dropdown-select-label").innerHTML = payload[this.labelField];
    this.backDropContainerEl.style.cssText = "display: none;";

    // changeEvent 
    this.callback(payload);
  }

  selectedDropDownItem(index) {
    document.querySelectAll(".dropdown-item")[index].classList.add("selected");
  }

  unSelectedDropDownItem(index) {
    document.querySelectAll(".dropdown-item")[index].classList.remove("selected");
  }

  retrieveOptionByIndex(index) {
    const targetOption = this.data[index];

    return targetOption;
  }
}
