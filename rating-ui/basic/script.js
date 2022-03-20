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
  function getCalculatedScore(currentTarget, clientX) {
    const { width, left } = currentTarget.getBoundingClientRect();
    const starWidth = clientX - left;
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
      const [e] = [...args]
      const {currentTarget,clientX} = e
      timerId = setTimeout(() => {
        cb(currentTarget,clientX);
      }, delay,e);
    };
  }
  function callbackfunc(currentTarget, clientX) {
    const currentScore = getCalculatedScore(currentTarget, clientX);
    setStarsStatus(currentScore);
    setScore(currentScore);
    
  }
  return (function () {
    // init
    init();

    // event binding
    $stars.addEventListener("click", (e) => {
      const currentScore = getCalculatedScore(e.currentTarget, e.clientX);

      setScore(currentScore);
    });

    $stars.addEventListener(
      "mousemove",

      debounce(callbackfunc, 500)
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
