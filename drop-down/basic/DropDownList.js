export default class DropDownList {
  constructor({ selector,field , optionData, eventHandler}) {
    const { dropdownContainer , backdropContainer} = selector;
    const { id, label } = field;
    const { onChange } = eventHandler;

    this.selectedIndex = -1; 

    this.id = id;
    this.label = label;
    this.optionData = optionData;
    this.onChange = onChange;

    const $dropdownContainer = document.querySelector(dropdownContainer);
    this.$dropdownSelectLabelContainer = this.initialize($dropdownContainer);

    // 다시 접근해야하므로 멤버로 설정한다.
    this.$backdropContainer = document.querySelector(backdropContainer);
    this.$dropdownItem = this.displayDropDownItemList(this.$backdropContainer, optionData);

    this.eventBinding();
  }

  // dropdownContainer 에 
  initialize($dropDownContainer, label = "선택해주세요.") {
    const $dropdownSelectLabelContainer = document.createElement("div");
    $dropdownSelectLabelContainer.classList.add("dropdown-select-label-container");

    const dropdownSelectLabelHTML = `
      <span class="dropdown-select-label">${label}</span>
      <div class="dropdown-select-arrow-container">
        <div class="dropdown-select-arrow"></div>
      </div>
    `;

    // @see https://developer.mozilla.org/ko/docs/Web/API/Element/insertAdjacentHTML
    $dropdownSelectLabelContainer.insertAdjacentHTML("afterbegin", dropdownSelectLabelHTML);

    $dropDownContainer.appendChild($dropdownSelectLabelContainer);
    
    return $dropdownSelectLabelContainer;
  }

  displayDropDownItemList($backdropContainer, optionData) {
    if (!$backdropContainer) return;

    $backdropContainer.innerHTML = optionData.reduce((result, option) => {
      return result += 
      `<div class="dropdown-item">
        <span>${option[this.label]}</span>
      </div>`
    }, '<div class="dropdown-list">') + "</div>";

    // @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
    const dropdownSelectLabelContainerRect = this.$dropdownSelectLabelContainer.getBoundingClientRect();
    const $dropdownListEl = document.querySelector(".dropdown-list");

    // 기준좌표 (0, 0)
    // width = content + padding + border-width
    const { width, top, left} = dropdownSelectLabelContainerRect;

    $dropdownListEl.style.cssText = `
      position: absolute;
      width: ${width}px;
      top: ${top + 5}px;
      left: ${left}px;
    `
  }

  eventBinding() {
    // 1. 다시 label 을 펼친다.
    this.$dropdownSelectLabelContainer.addEventListener("click", () => {
      console.log("1") 

      this.$backdropContainer.style.cssText = "display: block;";
    })

    // 2. 바깥을 클릭하면 펼친 label 을 닫는다.
    this.$backdropContainer.addEventListener('click', () => {
      console.log("2") 

      this.$backdropContainer.style.cssText = "display: none;";
    })

    // 3. 펼친 label 들 중 하나를 선택하면 선택한 label 을 뿌린다.
    document.querySelectorAll(".dropdown-item").forEach(($dropdownItem, index) => {
      $dropdownItem.addEventListener("click", () => {
        console.log("3") 

        const currentOption = this.retrieveOptionByIndex(index);
        
        // selectedIndex 가 존재하면 기존 select 클래스를 제거한다.
        if (~this.selectedIndex) this.unSelectedDropdownItem(this.selectedIndex);

        this.selectedIndex = index;

        // 새로운 selectedIndex 에 대해서 존재한다면 select 클래스를 새롭게 추가한다.
        if (~this.selectedIndex) this.selectedDropdownItem(this.selectedIndex);

        // 이벤트를 payload 를 넘겨 발생시킨다.
        this.dispatchEvent({
          id: currentOption[this.id],
          label: currentOption[this.label]
        })
      })
    })
  }

  // utils
  dispatchEvent(payload) {
    const $dropdownSelectLabel = this.$dropdownSelectLabelContainer.querySelector(".dropdown-select-label");

    $dropdownSelectLabel.innerHTML = payload[this.label];
    this.$backdropContainer.style.cssText = "display: none;";

    // changeEvent 
    this.onChange(payload);
  }

  selectedDropdownItem(targetIndex) {
    const $targetSelectedDropdownItem = document.querySelectorAll(".dropdown-item")[targetIndex];

    $targetSelectedDropdownItem.classList.add("selected");
  }

  unSelectedDropdownItem(targetIndex) {
    const $targetSelectedDropdownItem = document.querySelectorAll(".dropdown-item")[targetIndex];

    $targetSelectedDropdownItem.classList.remove("selected");
  }

  retrieveOptionByIndex(index) {
    const targetOption = this.optionData[index];

    return targetOption;
  }
}
