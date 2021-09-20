(function App() {
  // constant
  const API_URL = `https://api.thecatapi.com/v1/breeds/search`;

  // target
  const $searchInput = document.querySelector(".search-input");
  const $searchList = document.querySelector(".search-list");
  const $loadingIndicator = document.querySelector(".loading-indicator");
  const $searchInfo = document.querySelector(".search-info");

  return (function () {
    // event binding
    $searchInput.addEventListener("keyup", async (e) => {
      // async, data request
      const q = e.target.value;

      // guard
      if (!q) return;

      $loadingIndicator.style.visibility = "visible";

      const res = await fetch(`${API_URL}?q=${q}`);
      const cats = await res.json();

      $loadingIndicator.style.visibility = "hidden";

      // guard
      if (!cats.length) {
        $searchList.innerHTML = "";
        $searchList.style.visibility = "hidden";
        $searchInfo.innerHTML = "Result not found.";

        return;
      }

      $searchList.innerHTML = cats
        .slice(0, 5)
        .map(({ name }) => `<li>${name}</li>`)
        .join("");
      $searchList.style.visibility = "visible";
      $searchInfo.innerHTML = "";
    });
  })();
})();
