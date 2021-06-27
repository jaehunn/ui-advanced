const url = "https://jsonplaceholder.typicode.com/posts";

// renderPosts();

// 1. fetch() 사용하기

/*
function renderPosts() {
  const $content = document.querySelector(".content");

  // Promise 는 비동기 callback 을 보완하기위해 등장했지만, 연속적인 then() 체인은 어쩔 수 없다.
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const liElementText = data.reduce((result, item) => {
        return (result += `
                <li>
                    <h2>${item.title}</h2>
                    <p>${item.body}</p>
                </li>
            `);
      }, "");

      $content.insertAdjacentHTML("afterbegin", liElementText);
    })
    .catch((err) => console.error(err));
}
*/

// 2. 통신부와 템플릿부 분리하기 -> then() 콜백을 함수로 빼내기

// function renderPosts() {
//   const $content = document.querySelector(".content");

//   fetch(url)
//     .then(fetchData)
//     .then(renderData)
//     .catch((err) => console.log(err));

//   function fetchData(response) {
//     // guard 절, catch 로 던지기
//     if (!response.ok) throw new Error(`Status Code Error: ${response.status}`);

//     return response.json();
//   }

//   function renderData(data) {
// const liElementText = data.reduce((result, item) => {
//   return (result += `
//             <li>
//                 <h2>${item.title}</h2>
//                 <p>${item.body}</p>
//             </li>
//         `);
// }, "");

// $content.insertAdjacentHTML("afterbegin", liElementText);
//   }
// }

// import axios from "axios";

// 3. axios 라이브러리 사용하기
// 내장 api fetch() 와 어떤 차이가 있을까요?

/*
function renderPosts() {
  const $content = document.querySelector(".content");

  axios
    .get(url)
    .then((response) => {
      // 자동으로 response 에 json() 을 적용한다. resposne.data 로 접근
      const { data } = response;

      const liElementText = data.reduce((result, item) => {
        return (result += `
                  <li>
                      <h2>${item.title}</h2>
                      <p>${item.body}</p>
                  </li>
              `);
      }, "");

      $content.insertAdjacentHTML("afterbegin", liElementText);
    })
    .catch((err) => console.log(err));
}
*/

// 4. async/await 을 사용하면 then() 체인을 방지하고, 동기적인 표현으로 비동기를 설명할 수 있다.
// 동기적으로 반응하기때문에, 예외는 try-catch 로 잡을 수 있다.

/*
async function renderPosts() {
  const $content = document.querySelector(".content");

  try {
    const { data } = await fetchData();

    renderData(data);
  } catch (err) {
    console.log(err);
  }

  async function fetchData() {
    return await axios.get(url);
  }

  function renderData(data) {
    const liElementText = data.reduce((result, item) => {
      return (result += `
                  <li>
                      <h2>${item.title}</h2>
                      <p>${item.body}</p>
                  </li>
              `);
    }, "");

    $content.insertAdjacentHTML("afterbegin", liElementText);
  }
}
*/

// 5. JQuery
// @see https://api.jquery.com/jquery.ajax/

import $ from "jquery";

$.ajax({
  url,
  type: "GET",
  timeout: 1000,
  beforeSend() {
    console.log("beforeSend(), 요청 전에 호출되는 함수입니다.");
  },
  success(data) {
    console.log("success(), 요청에 성공했을때 호출되는 함수입니다.");

    const $content = $(".content");

    const liElementText = data.reduce((result, item) => {
      return (result += `
                  <li>
                      <h2>${item.title}</h2>
                      <p>${item.body}</p>
                  </li>
              `);
    }, "");

    // $content.insertAdjacentHTML("afterbegin", liElementText);

    // $() selector 를 사용했으므로 append() 를 사용한다.
    $content.append(liElementText);
  },
  error(err) {
    console.log("error(), 요청에 실패했을때 호출되는 함수입니다.");
    console.log(err);
  },
  complete() {
    console.log("complete(), 요청 성공유무에 상관없이 요청이 끝나면 무조건 호출되는 함수입니다.");
  },
});
