import retrieveWordData from "./data";
import InstantSearch from "./InstantSearch";

main();

function main() {
  const instantSearch = new InstantSearch({
    selector: {
      searchContainer: ".search-container",
      // searchInput: ".search-input",
    },
    eventHandler: {
      onChange: (inputText) => renderWordData(inputText),
    },
  });

  // 마운트시 기본 호출
  renderWordData();
}

function renderWordData(targetWord = "") {
  const $listContainer = document.querySelector(".list-container");
  retrieveWordData(targetWord).then((resultWordData) => createAndRenderWordList($listContainer, resultWordData));
}

function createAndRenderWordList($container, wordData) {
  $container.innerHTML = wordData.reduce((resultWordHTML, { word }) => {
    return (resultWordHTML += `
      <div>
        <span>${word}</span>
      </div>`);
  }, "");
}
