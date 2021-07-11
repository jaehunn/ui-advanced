import axios from "axios";

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
    console.log(data);
    data.forEach(({ urls, user }) => {
      const { small } = urls;
      const {
        username,
        bio,
        profile_image: { medium },
      } = user;

      const $li = document.createElement("li");

      $li.classList.add("image-item");

      // @see https://developer.mozilla.org/ko/docs/Web/API/HTMLOrForeignElement/dataset
      $li.dataset["user"] = JSON.stringify({ username, bio, medium });
      $li.dataset["image"] = `${small}`; // url 은 이미 문자열
      $li.innerHTML = `<img src="${small}" alt="" />`;

      $imageContainer.appendChild($li);

      // 이미지를 클릭하면 관련 정보를 모달로 뿌려서 렌더링
      // 관련정보를 보내기위해 정보를 일반 객체로 정의하는 것이 아니라 JSON 객체로 통신의 의미를 부여한다.
      // 객체는 엔진에 있는 데이터 구조를 말하지만, JSON 은 객체의 내용을 기술하는 text 파일로써 구분된다.

      // 일반 객체로 구조화하고 문자열로 보낸다. 그리고 JSON 으로 파싱한다.
      // 변수로 저장하면 어떤일이 벌어질까. 변수로 저장하면 최신의 정보만을 계속해서 덮어쓰며 기억하게 될 것이다.
      // 따라서 각 요소마다 dataset 으로 메모해두어야한다.
      // 요소 dataset 으로 저장하는 이유는 click 시 this 로 참조할 수 있기 때문이다.

      // event binding
      $li.addEventListener("click", function () {
        // addEventListener 함수의 콜백 함수를 화살표 함수로 정의하면 this가 상위 컨택스트인 전역 객체 window를 가리킨다.
        const userInfoObj = {
          imageUrl: this.dataset.image,
          ...JSON.parse(this.dataset.user),
        };

        const { imageUrl, name, bio, medium } = userInfoObj;

        // active 되면 display: block 을 활성화 되는 것으로 css 에 설정했다.
        $modalContainer.classList.add("active");

        // ISSUE) 산택자를 Tag 로 잡았을때 attribute 에 접근할 수 없다.
        $profile.querySelector(".profile-thumbnail").src = imageUrl;
        $profile.querySelector(".profile-img").src = medium;

        // @see https://developer.mozilla.org/ko/docs/Web/API/Node/textContent
        $profile.querySelector(".profile-name").textContent = name;
        $profile.querySelector(".profile-bio").textContent = bio;
      });
    });
  }

  function modalHandler({ target }) {
    const isImageItem = target.classList.contains("image-item");

    isImageItem && $modalContainer.classList.remove("active");
  }

  document.addEventListener("DOMContentLoaded", () => {
    initialize();
  });

  // event binding
  $modalContainer.addEventListener("click", modalHandler);
})();
