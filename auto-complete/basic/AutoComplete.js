import RequestMockDataAdapter from "./data";
import { debounce } from "./utils";

export class AutoComplete {
  constructor({ selector, request }) {
    const { autoCompleteContainer, autoCompleteInput } = selector;
    const { url } = request;

    this.url = url;

    const defaultDelayTime = 500;
    this.delayTime = defaultDelayTime;

    const $autoCompleteContainer = querySelector(autoCompleteContainer);
    const $autoCompleteInput = querySelector(autoCompleteInput);

    // render 하고 참조할 요소를 멤버로 가진다.
    this.$searchList = this.createAndRenderSearchList($autoCompleteContainer);
    this.$textInput = this.createAndRenderSearchInput($autoCompleteInput);

    // 요소를 참조해 이벤트를 바인딩
    this.eventBinding();
  }

  createAndRenderSearchList() {
    // ...
  }

  createAndRenderSearchInput() {
    // ...
  }

  eventBinding() {
    // ...
  }
}
