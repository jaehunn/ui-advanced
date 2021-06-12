import RequestMockDataAdapter from "./data";
import debounce from "./utils/debounce";

class AutoComplete {
  constructor({ selector, request }) {
    const { autoCompleteContainer } = selector;
    const { url } = request;

    this.url = url;

    const defaultDelayTime = 300;
    this.delayTime = defaultDelayTime;

    const $autoCompleteContainer = document.querySelector(autoCompleteContainer);

    // render 하고 참조할 요소를 멤버로 가진다.
    this.$searchList = this.createAndRenderSearchList($autoCompleteContainer);
    this.$searchInput = this.createAndRenderSearchInput($autoCompleteContainer);

    // 요소를 참조해 이벤트를 바인딩
    // 키워드가 생성되고 요소를 맵핑돌며 이벤트를 달아야한다.
    this.eventBinding();
  }

  createAndRenderSearchInput($container) {
    const $searchInput = document.createElement("input");

    $searchInput.setAttribute("type", "text");
    $searchInput.setAttribute("placeholder", "Please enter.");

    $searchInput.classList.add("auto-complete-input");

    $container.appendChild($searchInput);

    return $searchInput;
  }

  createAndRenderSearchList($container) {
    const $searchList = document.createElement("div");

    $searchList.classList.add("auto-complete-list");

    // 일단 보이지않게
    $searchList.style.cssText = "display: none;";

    $container.appendChild($searchList);

    return $searchList;
  }

  eventBinding() {
    // 1. keyup 되면 auto complete 기능을 보인다.
    // 2. focusout 되면 (focus 가 되지않으면) auto complete 요소를 숨긴다.
    // 3. focusin 되면 반대로 결과를 보여야한다.
    // 4. focusout 되어도 mouseover 되있다면 focusout 을 무마한다.
    // 5. focusout 과 mouseout 되면 숨긴다.

    let mouseOver = false;
    const requestAdapter = new RequestMockDataAdapter();

    // 핸들러 자체에 debounce 를 wrapping 한다.
    const renderSearchKeyword = (inputText) => {
      // 1. 만들어둔 adapter 로 data 를 get() 으로 끌어온다.
      // adapter 클래스 인스턴스를 매번 생성시키는 것은 비효율적이므로 렉시컬로 관리하자.

      requestAdapter.get(this.url, inputText).then((resultData) => {
        // auto complete 요소를 렌더링하는 것이 그치지않고, 이벤드를 다는것까지 구현된다.

        !!resultData.length &&
          this.createSearchKeywordList(this.$searchList, resultData).forEach(($element, index) => {
            // ISSUE) 왜 click 이벤트 핸들러가 붙혀지지않을까?
            console.log(index);

            $element.addEventListener("click", (e) => {
              console.log($element, index);
            });
          });
      });
    };

    this.$searchInput.addEventListener("keyup", ({ target: { value } }) => {
      renderSearchKeyword(value);
    });

    this.$searchInput.addEventListener("focusout", () => {
      // focusout 되어도 mouseover 상태라면 hidden 되지않게 하려면 플래그를 mouseover 또는 mouseout 에 의존하도록 설계해야한다.
      // mouseOver 라면 동작하지않는다.
      if (mouseOver) return;

      this.hiddenElement(this.$searchList);
    });

    this.$searchInput.addEventListener("focusin", ({ target: { value } }) => {
      renderSearchKeyword(value);
    });

    this.$searchList.addEventListener("mouseover", () => {
      mouseOver = true;
    });

    this.$searchList.addEventListener("mouseover", () => {
      mouseOver = false;
    });
  }

  createSearchKeywordList($searchList, data) {
    if (!$searchList || !data.length) return;

    $searchList.style.cssText = `display: "";`;

    const searchKeywordHTML = data.reduce((result, { text }) => {
      return (result += `
            <div class="auto-complete-item">
                <span>${text}</span>
            </div>
        `);
    }, "");

    $searchList.innerHTML = searchKeywordHTML;

    // 렌더링 위치 잡기
    // @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
    const searchInputRect = this.$searchInput.getBoundingClientRect();

    const { width, top, height, left } = searchInputRect;

    // 높이를 height 만큼 벌이면 된다.
    $searchList.style.cssText = `
        position: absolute;
        width: ${width}px;
        top: ${top + height}px;
        let: ${left}px;
    `;

    const $searchKeywordList = document.querySelectorAll(".auto-complete-item");

    return $searchKeywordList;
  }

  hiddenElement($element) {
    $element.style.cssText = "display: none;";
  }
}

export default AutoComplete;
