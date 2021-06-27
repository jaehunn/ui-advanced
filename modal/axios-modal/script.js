import axios from "axios";

// 1. 페이지 마운트시 이미지를 불러와서 렌더링
// 2. 이미지 클릭시 해당 이미지에 대한 모달 open
// 3. 모달 바깥을 누르면 모달을 close

(function () {
  const url = "https://api.unsplash.com/photos/";
  const key = "hPyF-tz9tHnxeaoTwb7q0GTw10Wxwr85cD63lk7d7UE";

  // selectors
  const $imageContainer = document.querySelector(".image-container");
  const $modalContainer = document.querySelector(".modal-container");
  const $profile = document.querySelector(".profile");

  async function initialize() {
    const data = await fetchData();

    renderData(data);
  }

  async function fetchData() {
    const { data } = await axios.get(url, {
      params: {
        client_id: key,
      },
    });

    return data;
  }

  function renderData(data) {
    data.forEach(({ urls, user }) => {
      const { regular } = urls;
      const { name, bio } = user;

      console.log(regular, name, bio);

      const $li = document.createElement("li");

      $li.classList.add("image-item");
      $li.innerHTML = `<img src="${regular} alt="" />`;

      $imageContainer.appendChild($li);

      // event binding
      $li.addEventListener("click", () => {
        // ...
      });
    });
  }

  // handler
  function modalHandler() {
    // ...
  }

  document.addEventListener("DOMContentLoaded", () => {
    initialize();
  });

  // event binding
  $modalContainer.addEventListener("click", modalHandler);
})();
