(function App() {
  const $startButton = document.getElementById("start");
  const $stopButton = document.getElementById("stop");
  const $resetButton = document.getElementById("reset");

  const Timer = {
    isPending: true,
    $minutes: document.getElementById("minutes"),
    $seconds: document.getElementById("seconds"),
    timerId: null,
    currentSeconds: 0,
    currentMinutes: 0,

    // arrow function 을 쓰면 this 로 Timer 속성을 참조할 수 없다.
    // arrow function 을 메서드에 쓰지말 것
    start: function () {
      // ISSUE) setInterval() 이 계속 생성된다.
      // setInterval() 의 레퍼런스를 등록하고, stop 시 clearInterval() 해주는 식으로 짠다.
      this.timerId = setInterval(() => {
        if (!this.isPending) {
          // state
          this.currentSeconds += 1;

          if (this.currentSeconds === 60) {
            this.currentSeconds = 0;
            this.currentMinutes += 1;
          }

          // view
          // 앞에 0 을 붙히고, 뒤에서 두자리를 끊는 방식으로 로직을 통일시킬 수 있다.
          this.$minutes.innerHTML = `0${this.currentMinutes}`.slice(-2);
          this.$seconds.innerHTML = `0${this.currentSeconds}`.slice(-2);
        }
      }, 1000);
    },
    stop: function () {
      this.isPending = true;

      // this.timerId = null 로는 interval 을 풀 수 없다.
      clearInterval(this.timerId);
    },
    reset: function () {
      this.isPending = true;
      clearInterval(this.timerId);

      // state
      this.currentMinutes = 0;
      this.currentSeconds = 0;

      // view
      this.$minutes.innerHTML = `00`;
      this.$seconds.innerHTML = `00`;
    },
  };

  document.addEventListener("DOMContentLoaded", () => {
    $startButton.addEventListener("click", () => {
      if (Timer.isPending) {
        Timer.isPending = false;

        Timer.start();
      }
    });
    $stopButton.addEventListener("click", () => {
      Timer.stop();
    });
    $resetButton.addEventListener("click", () => {
      Timer.reset();
    });
  });
})();
