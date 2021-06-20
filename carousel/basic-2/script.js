(function App() {
  function Carousel($selector) {
    this.$carouselContainer = $selector;
    this.$items = document.querySelectorAll(".carousel-item");
    this.itemsLength = this.$items.length;
    this.currentItemIndex = 0;
    this.itemClassName = "carousel-item";
    this.isMoving = false; // 이벤트 처리시간에 제약을 가한다.
  }

  Carousel.prototype.initialize = function () {
    this.isMoving = false;

    // 초기 세팅
    this.$items[this.itemsLength - 1].classList.add("prev");
    this.$items[0].classList.add("active");
    this.$items[1].classList.add("next");
  };

  Carousel.prototype.eventBindings = function () {
    this.$prevButton = document.querySelector(".carousel-button.prev");
    this.$nextButton = document.querySelector(".carousel-button.next");

    this.$prevButton.addEventListener("click", () => {
      this.movePrev();
    });

    this.$nextButton.addEventListener("click", () => {
      this.moveNext();
    });
  };

  // 1. 움직이고
  // 2. 클래스명(prev, active, next) 를 새롭게 설정한다.
  Carousel.prototype.movePrev = function () {
    if (this.isMoving) return;

    // 1.
    // 첫 item 리면 마지막으로
    this.currentItemIndex = this.currentItemIndex === 0 ? this.itemsLength - 1 : this.currentItemIndex - 1;

    // 2. 실질적으로 움직이지 않았다. 움직이자.
    this.moveCarousel();
  };

  Carousel.prototype.moveNext = function () {
    if (this.isMoving) return;

    // 1.
    // 마지막 item 이라면 다시 처음으로
    this.currentItemIndex = this.currentItemIndex === this.itemsLength - 1 ? 0 : this.currentItemIndex + 1;

    // 2.
    this.moveCarousel();
  };

  Carousel.prototype.moveCarousel = function () {
    // guard
    if (this.isMoving) return;

    this.delay();

    // 바뀐 currentItemIndex 값으로 prev, next 를 설정한다.
    // 일단 기본적으로 적용하고,
    let prevItemIndex = this.currentItemIndex - 1;
    let nextItemIndex = this.currentItemIndex + 1;

    // 예외 케이스를 설정한다.
    if (this.currentItemIndex === 0) prevItemIndex = this.itemsLength - 1;
    else if (this.currentItemIndex === this.itemsLength - 1) nextItemIndex = 0;

    // 루프를 돌리면 초기화와 설정을 한번에 할 수 있다.
    // if-else 가 많아지니 초기화에만 루프를 돌리고, 이후에 따로 설정하자.
    this.$items.forEach(($item) => {
      $item.className = this.itemClassName;
    });

    this.$items[prevItemIndex].className = `${this.itemClassName} prev`;
    this.$items[this.currentItemIndex].className = `${this.itemClassName} active`;
    this.$items[nextItemIndex].className = `${this.itemClassName} next`;
  };

  Carousel.prototype.delay = function () {
    this.isMoving = true;

    setTimeout(() => {
      // 지연 후 다시 풀어준다
      this.isMoving = false;
    }, 500);
  };

  document.addEventListener("DOMContentLoaded", () => {
    const $carouselContainer = document.querySelector(".carouselContainer");
    const carousel = new Carousel($carouselContainer);

    // carousel-item 의 prev, active, next 클래스를 설정한다.
    carousel.initialize();

    // prev, next 버튼의 핸들러를 부착한다.
    carousel.eventBindings();
  });
})();
