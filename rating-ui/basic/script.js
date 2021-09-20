(function App() {
  // constant
  const MAX_SCORE = 5;

  // store
  const state = {
    score: 0,
  };

  // target
  const $stars = document.querySelector(".stars");
  const $score = document.querySelector(".score");
  const $resetButton = document.querySelector(".reset-button");

  // function
  function getCalculatedScore(e) {
    const { width, left } = e.currentTarget.getBoundingClientRect();
    const starWidth = e.clientX - left;
    const scaleHalf = width / MAX_SCORE / 2; // half scale
    const result = Math.ceil(starWidth / scaleHalf) / 2;

    return result;
  }

  function setScore(score) {
    setStarsStatus(score);

    $score.textContent = score;

    state.score = score;
  }

  function setStarsStatus(score) {
    // normalize -> array
    const stars = [...$stars.children];

    stars.forEach(($star, index) => {
      // ex) score: 2 -> fill index 0, 1
      if (score <= index) {
        $star.className = "star empty";
      } else {
        // fill

        // half check, has decimal?
        score - index === 0.5
          ? ($star.className = "star half")
          : ($star.className = "star full");
      }
    });
  }

  function init() {
    Array(MAX_SCORE)
      .fill(null)
      .forEach(() => {
        const $star = document.createElement("div");
        $star.className = "star empty";

        $stars.appendChild($star);
      });
  }

  // utils
  function debounce(cb, delay = 500) {
    let timerId = null;

    return (...args) => {
      if (timerId) clearTimeout(timerId);

      timerId = setTimeout(() => {}, delay);
    };
  }

  return (function () {
    // init
    init();

    // event binding
    $stars.addEventListener("click", (e) => {
      const currentScore = getCalculatedScore(e);

      setScore(currentScore);
    });

    $stars.addEventListener(
      "mousemove",

      debounce((e) => {
        // ISSUE) debounce 를 적용하면, e.currentTarget 을 잃어버린다. 어떻게 해결할까?

        // @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
        const currentScore = getCalculatedScore(e);

        setStarsStatus(currentScore);
      }, 500)
    );

    $stars.addEventListener("mouseleave", () => {
      const previousScore = state.score;

      setStarsStatus(previousScore);
    });

    $resetButton.addEventListener("click", () => {
      setScore(0);
    });
  })();
})();
