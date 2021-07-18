import { api } from "./data";

(function App() {
  const $form = document.querySelector("form");
  const $title = document.querySelector("#title");
  const $body = document.querySelector("#body");
  const $user = document.querySelector("#user");

  $form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
      title: $title.value,
      body: $body.value,
      user: $user.value,
    };

    post(data, postApi, logger);
  });

  // post 요청 메서드
  async function post(data, api, cb) {
    try {
      const res = await api(data);

      cb(true, res.data, "성공하셨습니다. :)");
    } catch (err) {
      cb(false, null, "실패하셨습니다. :(");

      console.error(err);
    }
  }

  // api() 확장
  function postApi(data) {
    return api({
      method: "post",
      url: "/posts",
      data,
    });
  }

  function logger(...args) {
    const [, , msg] = args;

    console.log(msg);
  }
})();
