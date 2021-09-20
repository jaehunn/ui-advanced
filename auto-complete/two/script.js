(function App() {
  // constant
  const API_URL = "https://api.thecatapi.com/v1/breeds/search";

  // utils
  const debounce = function (cb, delay = 500) {
    let timerId = null;

    return function (...args) {
      if (timerId) clearTimeout(timerId);

      // 계속 덮어쓰다 마지막 timerId 만 delay 가 지나고 발생한다.
      timerId = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  };

  // target
  const $searchInput = document.querySelector(".search-input");
  const $loadingIndicator = document.querySelector(".loading-indicator");
  const $searchList = document.querySelector(".search-list");
  const $searchInfo = document.querySelector(".search-info");

  return (function () {
    // evnet binding
    $searchInput.addEventListener(
      "keyup",
      debounce((e) => {
        const q = e.target.value;

        if (!q) return;

        $loadingIndicator.style.visibility = "visible";

        const res = await fetch(`${API_URL}?q=${q}`);
        const cats = await res.json();

        $loadingIndicator.style.visibility = "hidden";

        if (!cats.length) {
          $searchList.innerHTML = "";
          $searchList.style.visibility = "hidden";
          $searchInfo.innerHTML = "Result not found.";
        }

        $searchList.innerHTML = cats
          .slice(0, 5)
          .map(({ name }) => `<li>${name}</li>`)
          .join("");

        $searchList.style.visibility = "visible";
        $searchInfo.innerHTML = "";
      })
    );
  })();
})();
