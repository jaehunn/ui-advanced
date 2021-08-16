import axios from "axios";
import _ from "lodash";

// @see https://unsplash.com/developers
const accessKey = "hPyF-tz9tHnxeaoTwb7q0GTw10Wxwr85cD63lk7d7UE";

(function () {
  const $input = document.querySelector(".input-container > input");
  const $dropdownMenu = document.querySelector(".dropdown-menu");
  const $imageInfo = document.querySelector(".image-container > img");

  // api
  // auto-complete
  const searchImages = async (search) => {
    const { data } = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        client_id: accessKey,
        query: search,
      },
    });

    return data?.results;
  };

  // click keyword
  const fetchImageById = async (id) => {
    const { data } = await axios.get(`https://api.unsplash.com/photos/${id}`, {
      params: {
        client_id: accessKey,
      },
    });

    return data;
  };

  // render function
  const handleSearch = async ({ target: { value } }) => {
    const images = await searchImages(value);

    // guard
    if (images.length === 0) {
      $dropdownMenu.classList.remove("show");

      return;
    }

    $dropdownMenu.classList.add("show");
    $dropdownMenu.innerHTML = ""; // reset
    renderDropdownList(images); // update

    console.log(images);
  };

  const renderDropdownList = (images) => {
    images.forEach(({ id, alt_description, urls }) => {
      const $li = document.createElement("li");
      $li.classList.add("dropdown-item");
      $li.innerHTML = `
        <img src="${urls.regular}" alt="${alt_description}">
        <span>${alt_description}</span>
      `;

      // fetch image
      $li.addEventListener("click", async () => {
        $dropdownMenu.classList.remove("show");
        $input.value = alt_description;

        // inline variable
        renderResultImage(await fetchImageById(id));
      });

      $dropdownMenu.appendChild($li);
    }, `<ul class="dropdown-list">`) + "</ul>";
  };

  const renderResultImage = ({ urls, alt_description }) => {
    $imageInfo.src = urls.regular;
    $imageInfo.alt = alt_description;
  };

  // event handling
  // optimization: debounce
  $input.addEventListener("input", _.debounce(handleSearch, 300));
})();
