// @see https://developer.mozilla.org/ko/docs/Web/API/FormData/FormData

(function App() {
  // store
  const methodLabel = {
    contact: "연락 수단",
    delivery: "배송 수단",
  };

  // select dom
  const $currentItem = document.querySelector(".currentItem");
  const $form = document.querySelector("form");

  // handler
  const handleFormSubmit = (e) => {
    console.log("submit testing");

    e.preventDefault();

    // Form Element의 submit 한 요소들의 key(name) / value 를 가져온다.
    // console.log(new FormData($form));

    // FormData()
    const formDatas = Array.from(new FormData($form));

    // guard
    if (formDatas.length !== Object.keys(methodLabel).length) {
      $currentItem.innerHTML = "모두 선택해주세요!";

      return;
    }

    $currentItem.innerHTML = formDatas
      .map(([key, value]) => `${methodLabel[key]}: ${[value]}`)
      .join("<br />");
  };

  return (function () {
    // feat def
    // 1. form data 를 current item 에 렌더링

    // event binding
    $form.addEventListener("submit", handleFormSubmit);
  })();
})();
