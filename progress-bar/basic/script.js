(function App() {
  document.addEventListener("DOMContentLoaded", function () {
    const $progressBar = document.querySelector(".progress-bar");
    const progressBar = new ProgressBar($progressBar);

    const $prevButton = document.getElementById("prev");

    // callback 을 간추리려고 prototype 메서드 그자체를 progressBar.movePrev 처럼 넣으면 this 를 정상적으로 잡지 못한다.
    $prevButton.addEventListener("click", () => progressBar.movePrev());

    const $nextButton = document.getElementById("next");
    $nextButton.addEventListener("click", () => progressBar.moveNext());
  });

  function ProgressBar($element) {
    this.$progressBar = $element;
    this.currentIndex = 0;
    this.lastIndex = 4;
    this.animationSpeed = 40;
    this.widthPerIndex = 100 / (this.lastIndex - this.currentIndex);
    // this.intervalTarget = null 멤버로 등록해서 중복되는 interval 을 제어할 수 없다 어떻게 해결할까?
  }

  // currentIndex 를 증감하면서 width 를 설정하면 될 것 같다. (증감시 범위체크를 해준다.)
  // 어떻게하면 speed 를 조절할 수 있을까? -> setInterval() 로 지연시간을 주고 width 를 조절하는 로직을 콜백으로 쓰면 될 것같다.

  ProgressBar.prototype.movePrev = function () {
    // 가드절로 버린다.
    if (this.currentIndex === 0) return;
    // setInterval() 을 기억시켜서 범위를 벗어나면 해제시켜야한다.
    // 범위에 대한 부분을 어떻게 처리할까?
    let currentWidth = this.currentIndex * this.widthPerIndex; // width size

    this.currentIndex -= 1;
    let nextWidth = this.currentIndex * this.widthPerIndex;

    const intervalTarget = setInterval(() => {
      // 콜백에서 범위를 체크하고,
      if (currentWidth >= nextWidth) {
        currentWidth -= 1; // 지연시간동안 꾸준히 감소된다.
        this.$progressBar.style.setProperty("--width", currentWidth);
      } else clearInterval(intervalTarget); // 벗어난 범위에 대해서 타게팅에 접근해 해제한다.
    }, this.animationSpeed);
  };

  ProgressBar.prototype.moveNext = function () {
    if (this.currentIndex >= this.lastIndex) return;

    let currentWidth = this.currentIndex * this.widthPerIndex; // width size

    this.currentIndex += 1;
    let nextWidth = this.currentIndex * this.widthPerIndex;

    const intervarTarget = setInterval(() => {
      if (currentWidth <= nextWidth) {
        currentWidth += 1;
        this.$progressBar.style.setProperty("--width", currentWidth);
      } else clearInterval(intervarTarget);
    }, this.animationSpeed);
  };
})();
