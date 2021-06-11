import AutoComplete from "./AutoComplete";

main();

function main() {
  const autoComplete = new AutoComplete({
    selector: {
      autoCompleteContainer: ".auto-complete-container",
    },
    request: {
      url: "/search",
    },
  });
}
