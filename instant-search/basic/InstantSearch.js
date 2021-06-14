import { debounce } from "./utils";
import { fromEvent } from "rxjs";
import { debounceTime } from "rxjs/operators";

class InstantSearch {
  constructor({ selector, eventHandler }) {
    const { searchContainer } = selector;
    const { onChange } = eventHandler;

    this.onChange = onChange;
    this.delayTime = 300;

    // event subscribe reference
    this.subscription = null;

    const $searchContainer = document.querySelector(searchContainer);
    this.$searchInput = this.createAndRenderSearchInput($searchContainer);

    this.eventBinding();
  }

  createAndRenderSearchInput($container) {
    const $searchInput = document.createElement("input");

    $searchInput.setAttribute("type", "text");
    $searchInput.setAttribute("placeholder", "Please enter...");
    $searchInput.classList.add("search-input");

    $container.appendChild($searchInput);

    return $searchInput;
  }

  eventBinding() {
    // event 를 전파시킨다.
    // debounce 로 keyup 최적화

    // ISSUE) debounce 가 적용이 안된다. -> bind() 를 잘못쓴 것 같다.
    const dispatchEvent = debounce((targetText) => {
      this.onChange(targetText);
    }, this.delayTime);

    // const dispatchEvent = (targetText) => {
    //   this.onChange(targetText);
    // };

    this.$searchInput.addEventListener("keyup", ({ target: { value } }) => {
      dispatchEvent(value);
    });

    // @see https://www.npmjs.com/package/rxjs
    // @see https://www.learnrxjs.io/learn-rxjs/operators/filtering/debouncetime
    // keyup 이벤트에 대한 observer 를 반환한다. pipe() 함수는 이벤트의 흐름을 지정할 수 있다.
    // 이벤트 흐름에 debounceTime 을 설정한다.
    // const eventSource = fromEvent(this.$searchInput, "keyup").pipe(debounceTime(this.delayTime));

    // // 생성한 이벤트 옵저버를 등록(구독)하고 콜백으로 keyup 에서 전달된 이벤트객체를 사용할 수 있다.
    // this.subscription = eventSource.subscribe(({ target: { value } }) => {
    //   dispatchEvent(value);
    // });
  }
}

export default InstantSearch;
