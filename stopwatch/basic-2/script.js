// TODO) Closure 를 완벽하게 적용하면서 Stopwatch 를 작성해봅시다.

(function App() {
  const $startButton = document.getElementById("start");
  const $stopButton = document.getElementById("stop");
  const $resetButton = document.getElementById("reset");

  const Timer = (() => {
    const start = () => {};
    const stop = () => {};
    const reset = () => {};

    // ...
  })();

  document.addEventListener("DOMContentLoaded", () => {
    $startButton.addEventListener("click", TImer.start);
    $stopButton.addEventListener("click", Timer.stop);
    $resetButton.addEventListener("click", Timer.reset);
  });
})();
