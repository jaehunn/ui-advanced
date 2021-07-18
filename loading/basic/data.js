import axios from "axios";

// @see https://xn--xy1bk56a.run/axios/guide/api.html#%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4-%EC%83%9D%EC%84%B1
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
});

// @see https://xn--xy1bk56a.run/axios/guide/interceptors.html
// 요청과 응답 전에 가로채기
api.interceptors.request.use(
  function (config) {
    // 요청 전에 가로채기
    document.querySelector("#loading").style.display = "block";

    console.log(config);

    return config;
  },
  function (error) {
    // 오류 요청 전에 가로채기
    console.log(error);

    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    document.querySelector("#loading").style.display = "none";
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { api };
