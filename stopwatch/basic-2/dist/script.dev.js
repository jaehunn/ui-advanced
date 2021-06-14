"use strict";

// TODO) Closure 를 완벽하게 적용하면서 Stopwatch 를 작성해봅시다.
(function App() {
  var $startButton = document.getElementById("start");
  var $stopButton = document.getElementById("stop");
  var $resetButton = document.getElementById("reset");

  var Timer = function () {
    var start = function start() {};

    var stop = function stop() {};

    var reset = function reset() {}; // ...

  }();

  document.addEventListener("DOMContentLoaded", function () {
    $startButton.addEventListener("click", TImer.start);
    $stopButton.addEventListener("click", Timer.stop);
    $resetButton.addEventListener("click", Timer.reset);
  });
})();