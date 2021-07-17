import { api } from "./data";

document.addEventListener("DOMContentLoaded", App);

const App = (function () {
  const $form = document.querySelector("form");
  const $title = document.querySelector("#title");
  const $contents = document.querySelector("#contents");
  const $user = document.querySelector("#user");
  const $loading = document.querySelector("#loading");

  const log = console.log;

  // extends api()
  const postApi = (data) => {
    return api({
      method: "post",
      url: "/posts",
      data,
    });
  };

  const logger = (...args = [, , msg]) => {
    log(msg);
  };

  const post = async (data, api, cb) => {
    try {
      const res = await api(data);

      cb(true, res.data, `성공했습니다.`);
    } catch (err) {
      cb(false, null, `실패했어요.`);

      console.error(err);
    }
  };

  // @see https://xn--xy1bk56a.run/axios/guide/interceptors.html

  return () => {
    // event binding
    // feature logic
  };
})();
