(function App() {
  // target
  const $currentItem = document.querySelector(".current-item");
  const $form = document.querySelector("form");

  return (function () {
    // event binding
    $form.addEventListener("submit", (e) => {
      e.preventDefault();

      const formDatas = Array.from(new FormData($form));

      // filter data
      const foodDatas = formDatas.filter(([key]) => key === "food");
      const interestDatas = formDatas.filter(([key]) => key === "interest");

      // validation
      if (foodDatas.length === 0 || interestDatas.length === 0) {
        $currentItem = `Input all forms.`;

        return;
      }

      $currentItem.innerHTML = `
        Favorite Food: ${foodDatas.map(([value]) => value).join(", ")}
        Interest ThingsL ${interestDatas.map(([value]) => value).join(", ")}
      `;
    });
  })();
})();
