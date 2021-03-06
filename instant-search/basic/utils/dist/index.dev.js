"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throttle = exports.debounce = void 0;

var debounce = function debounce(callback, delayTime) {
  var targetTimer = null; // targetTimer 를 자유변수로 가지는 클로저
  // callback 을 대신 실행

  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (targetTimer) clearTimeout(targetTimer);
    targetTimer = setTimeout(function () {
      callback.apply(null, args); // ISSUE) bind() 가 왜 안될까.
      // callback.bind(null, ...args);
      // bind() 반환값은 함수다.
      // call() 과 apply() 와는 다르게 this 만 바인딩하는 역할만 한다.
      // const bindCallbackFn = callback.bind(null, ...args);
      // bindCallbackFn();

      clearTimeout(targetTimer);
    }, delayTime);
  };
}; // throttle 은 일정 주기마다 이벤트를 발생시킨다.
// 따라서 타이머에 대한 타겟팅보다 이벤트 발생시점에 타겟을 조정해야할것같다.
// 지연시간이 흐르고 이벤트 핸들링이 완료되면 다음 이벤트 핸들링을 해도 좋다는 표시를 남긴다.


exports.debounce = debounce;

var throttle = function throttle(callback, delayTime) {
  var throttled = false; // 초기 플래그는 이밴트 핸들링이 적용된다.

  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    // 지연시간이 흐르기전까지 throttled 는 true 로 설정되어있어야한다.
    if (!throttled) {
      throttled = true;
      setTimeout(function () {
        callback.bind.apply(callback, [null].concat(args));
        throttled = false; // 지연시간이 흘렀으니 다음 이벤트를 핸들링해도 좋다.
      }, delayTime);
    }
  };
};

exports.throttle = throttle;