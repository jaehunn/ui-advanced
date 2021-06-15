(function App() {
  document.addEventListener("DOMContentLoaded", () => {
    const $blackout = document.querySelector(".blackout");
    const $openButton = document.querySelector(".button.open");
    const $closeButton = document.querySelector(".button.close");
    const $modal = document.querySelector(".modal");

    // modal 열기, open 버튼은 .blackout 에 알아서 가려진다.
    $openButton.addEventListener("click", () => {
      $blackout.classList.add("is-blackout");
      $modal.classList.add("is-visible");
    });

    // modal 닫기 1, close 버튼은 .modal 에 포함되므로 알아서 가려진다.
    $closeButton.addEventListener("click", () => {
      $blackout.classList.remove("is-blackout");
      $modal.classList.remove("is-visible");
    });

    // modal 닫기 2, modal 외부를 클릭했을 때 (opacity 로 줬지만, pointer-events 가 이벤트를 제어하므로 괜찮다.)
    $blackout.addEventListener("click", () => {
      $blackout.classList.remove("is-blackout");
      $modal.classList.remove("is-visible");
    });
  });
})();
