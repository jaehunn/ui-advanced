class ToggleButton {
  constructor({ selector, data, changeEvent }) {
    this.selectedIndex = -1; // 선택된 button
    this.callback = changeEvent;
    this.buttonElements = this.initialize(document.querySelector(selector), data);
    this.eventBinding();
  }

  initialize(selector, data) {
    // reduce 에서 acc(result) 가 반환되므로 += 나 = 같은 결과를 보인다.
    selector.innerHTML = data.reduce(
      (result, item, index) =>
        result +
        `<button class="toggle-button">
            <span class="${index ? "border" : ""}">${item}</span>
        </button>`,
      ""
    );

    // 버튼 요소들을 반환한다.
    return document.querySelectorAll(".toggle-button");
  }

  eventBinding() {
    // 버튼요소들을 돌면서 핸들러를 부착한다.
    this.buttonElements.forEach((buttonElement, index) => {
      buttonElement.addEventListener("click", () => {
        // click 이벤트가 발생하면, active 를 적용한다.
        if (this.selectedIndex === index) return;

        // active 를 적용하기 전에 모두 active 를 지운다.
        if (this.selectedIndex > -1) this.buttonElements[this.selectedIndex].classList.remove("select");

        // 선택된 버튼을 업데이트한다.
        this.selectedIndex = index;
        this.buttonElements[this.selectedIndex].classList.add("select");

        this.callback(this.selectedIndex);
      });
    });
  }
}

function App() {
  const buttonData = ["Bold", "Italic", "Underline"];
  const toggleButton = new ToggleButton({
    selector: "#toggle-button",
    data: buttonData,
    changeEvent: (selectedIndex) => {
      // 추가적인 기능 정의
      console.log(selectedIndex);
    },
  });
}

App();
