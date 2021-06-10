import AutoComplete from "AutoComplete";

main();

function main() {
  new AutoComplete({
    selector: {
      autoCompleteContainer: ".auto-complete-container",
      autoCompleteInput: ".auto-complete-input",
    },
    request: {
      url: "/search",
    },
  });
}
