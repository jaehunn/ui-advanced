import axios from "axios";

// @see https://xn--xy1bk56a.run/axios/guide/api.html#%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4-%EC%83%9D%EC%84%B1
const api = axios.create({
  baseUrl: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
});

export { api };
