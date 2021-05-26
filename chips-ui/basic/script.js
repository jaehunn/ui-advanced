class Chips {
  constructor({ selector, data }) {
    this.data = data;
    this.containerElement = document.querySelector(selector);
    this.chipElements = this.initChips(this.containerElement, data);
    this.inputElement = this.initInput(this.containerElement);

    this.eventBinding();
  }

  initChips(selector, data) {
    data.forEach((item) => {
      const chipElement = this.createChipElement(item);

      selector.appendChild(chipElement);
    });

    // 생성된 chip 요소 리스트를 반환한다.
    return selector.querySelectorAll(".chips-item");
  }

  initInput(selector) {
    const inputElement = this.createInputElement();

    selector.appendChild(inputElement);

    return selector.querySelector(".chips-input");
  }

  eventBinding() {
    // 1. chipsElements: close 버튼 클릭시 데이터 지우기 (chip 요소리스트와 해당 chip 요소를 둘다 제거하는 로직 필요)
    this.chipElements.forEach((chipElement) => {
      chipElement.querySelector(".chips-close").addEventListener("click", () => {
        // label 을 찾아내서 데이터를 지운다
        const labelElement = chipElement.querySelector(".chips-label").innerHTML;

        // 요소 리스트를 순회하면서 인덱스를 찾아 잘라내기
        const targetIndex = this.data.findIndex((item) => item === labelElement);
        this.data.splice(targetIndex, 1);

        // 요소 제거
        chipElement.remove();
      });
    });

    // 2. inputElements: keyup 이벤트로 onChange + enter 로 chip 추가하기
    this.inputElement.addEventListener("keyup", ({ key, target: { value } }) => {
      // keyCode 는 deprecate 되었습니다.
      if (key === "Enter") {
        const newChipElement = this.createChipElement(value);

        // 생성된 chip 에 삭제 이벤트를 부여한다.
        newChipElement.querySelector(".chips-close").addEventListener("click", () => {
          // label 을 찾아내서 데이터를 지운다
          const labelElement = chipElement.querySelector(".chips-label").innerHTML;

          // 요소 리스트를 순회하면서 인덱스를 찾아 잘라내기
          const targetIndex = this.data.findIndex((item) => item === labelElement);
          this.data.splice(targetIndex, 1);

          // 요소 제거
          chipElement.remove();
        });

        // container 에 insertAdjacentElement() 를 적용해 붙힌다. + data 요소 리스트에 prepend 한다.
        // @see https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement
        this.containerElement.insertAdjacentElement("afterbegin", newChipElement);
        this.data.unshift(value);

        // input text 초기화
        this.inputElement.value = "";
      }
    });
  }

  createChipElement(item) {
    const chipElement = document.createElement("div");
    chipElement.classList.add("chips-item");
    chipElement.innerHTML = `
          <span class="chips-label">${item}</span>
          <img class="chips-close" src="./close.svg" />
      `;

    return chipElement;
  }

  createInputElement() {
    const inputElement = document.createElement("input");
    inputElement.classList.add("chips-input");
    inputElement.placeholder = "enter text...";

    return inputElement;
  }
}

function App() {
  const buttonData = ["#vue", "#react", "#angular"];

  const chips = new Chips({
    selector: "#chips",
    data: buttonData,
  });

  // 결과 버튼 클릭시 기능을 정의한다.
  document.querySelector(".result-button").addEventListener("click", () => {});
}

App();
