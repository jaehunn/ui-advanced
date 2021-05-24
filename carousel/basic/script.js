// carousel() 는 타겟요소와 image path 정보를 통해 기능을 수행한다.
carousel(document.querySelector(".carousel"), ["images/movie-1.jpg", "images/movie-2.jpg", "images/movie-3.jpg", "images/movie-4.jpg"]);

function carousel($container, images) {
  // 프로세스
  // 1. .carousel 내부에 이미지들을 렌더링하고, 슬라이드 형식으로 만들기 위해 이미지 하나에 대한 사이즈만큼만 보이도록 한다.
  // 2. 해당 프로젝트 기능에서 슬라이딩의 타이머를 설정하지않고, 버튼 클릭 시에만 슬라이딩되도록 만든다. (슬라이딩 함수, 핸들러 부착)
  // 3. 끝단에서 슬라이딩시 사이클이 되도록 만들것이다. -> ontransitionend 이벤트를 참조한다.

  // 이미지 인덱스를 만들어서 관리한다.
  let currentSlide = 0;

  // transition 여부에 대한 플래그를 설정한다.
  let isMoving = false;
  const DURATION = 500;

  // window 로 선택이미지만을 보이게 한다.
  let $carouselWindow = null;

  function sliding(currentSlide, duration = 0) {
    // 마운트는 제외한다.
    if (duration) isMoving = true;

    console.log(currentSlide);

    // css 변수를 활용한다.
    $carouselWindow.style.setProperty("--duration", duration);
    $carouselWindow.style.setProperty("--currentSlide", currentSlide);
  }

  // DOM 이 로드된 후 이미지와 버튼을 렌더링한다.
  document.addEventListener("DOMContentLoaded", () => {
    // 슬라이드가 사이클이 되도록 만드려면, 끝 단에 다음 이미지를 클론해야한다.
    // "3" 0 1 2 3 "0"

    // 내부에 이미지와 버튼을 렌더링한다.
    $container.innerHTML = `
        <div class="carousel-slides">
          ${[images[images.length - 1], ...images, images[0]].map((url) => `<img src="${url}" />`).join("")}
        </div>
        <button class="carousel-control prev">&laquo;</button>
        <button class="carousel-control next">&raquo;</button>
      `;

    // window 를 다른 함수들이 렉시컬로 접근가능하도록 한다.
    $carouselWindow = document.querySelector(".carousel-slides");
  });

  // 이미지와 버튼이 렌더링된 다음의 작업들을  window.onload() 안에 정의한다.
  // carouselWindow 의 너비를 설정한다.
  window.onload = () => {
    // @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth
    const { offsetWidth } = $carouselWindow.querySelector("img");

    $container.style.width = `${offsetWidth}px`;
    $container.style.opacity = 1; // 창문

    sliding(++currentSlide); // 1부터 보여야한다. 사이클을 만들기 위해 끝단에 클론한 것을 기억, 마운트 시에는 지연없이 진행합니다.

    // 만약 슬라이딩에 타이머를 설정하고 싶다면 이곳에!
  };

  // 버블링으로 버튼 클릭을 관리한다.
  $container.onclick = ({ target }) => {
    // 가드: 버튼에 한하며, transition 되고 있다면, 동작하지않는다.
    if (!target.classList.contains("carousel-control") || isMoving) return;

    // 변수가 두개(prev, next)이기 때문에 이진플래그로 관리할 수 있다.
    const delta = target.classList.contains("prev") ? -1 : 1;
    currentSlide += delta;

    sliding(currentSlide, DURATION);
  };

  // 사이클 설정
  // @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/transitionend_event
  $container.ontransitionend = () => {
    // transition 이 끝나고 발동한다.
    isMoving = false;

    // img:  3 0 1 2 3 0
    // index:0 1 2 3 4 5
    // 3 -> 0
    // 0 <- 3

    // 끝단의 클론에 도달하면 원본으로 이동시킨다.
    const delta = currentSlide === 0 ? 1 : currentSlide === images.length + 1 ? -1 : 0;

    // currensSlide 가 0(선두) 면, images.length (마지막) 로
    // currentSlide 가 images.length - 1(후위) 면, 1 로

    // 0 이면 사이클이 필요없는 슬라이딩입니다.
    if (delta === 0) return;

    // delta 를 중간에 걸친다음 실질적으로 설정하는 부분
    currentSlide += images.length * delta;

    sliding(currentSlide);
  };
}
