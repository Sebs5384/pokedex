import { getPokemonPaginationData } from "../api/pokemon.js";
import { pokedexPaginationValues } from "../utils/general.js";

export function updatePagination(POKEMONS_PER_PAGE, PAGE_INDEX) {
  getPokemonPaginationData(POKEMONS_PER_PAGE, PAGE_INDEX).then((pokemons) => {
    const { names, TOTAL_POKEMONS } = pokemons;
    const { TOTAL_PAGES, CURRENT_PAGE } = pokedexPaginationValues(TOTAL_POKEMONS, POKEMONS_PER_PAGE, PAGE_INDEX);

    createPaginator(TOTAL_PAGES);
    displayCurrentPagination(CURRENT_PAGE, TOTAL_PAGES);
    handlePaginationChanges(POKEMONS_PER_PAGE, PAGE_INDEX, CURRENT_PAGE);
  });
}

function displayCurrentPagination(CURRENT_PAGE, TOTAL_PAGES) {
  const $pages = document.querySelectorAll(".paginator-page");
  const $navigationButtons = document.querySelectorAll(".paginator-button");
  const $previousButton = $navigationButtons[0];
  const $nextButton = $navigationButtons[1];

  CURRENT_PAGE === 1 ? $previousButton.classList.add("disabled") : $previousButton.classList.remove("disabled");
  CURRENT_PAGE === TOTAL_PAGES - 1 ? $nextButton.classList.add("disabled") : $nextButton.classList.remove("disabled");

  $pages.forEach((page, index) => {
    const pageIndex = index + 1;

    pageIndex >= CURRENT_PAGE - 1 && pageIndex <= CURRENT_PAGE + 2 ? page.classList.remove("hidden") : page.classList.add("hidden");
  });
}

function handlePaginationChanges(POKEMONS_PER_PAGE, PAGE_INDEX, CURRENT_PAGE) {
  const $buttons = document.querySelector("#paginator-container");
  let NEXT_PAGE_INDEX = POKEMONS_PER_PAGE;
  let PREVIOUS_PAGE_INDEX = PAGE_INDEX;

  $buttons.onclick = (event) => {
    event.preventDefault();
    const $clickedButton = event.target;

    if ($clickedButton.classList.contains("paginator-page")) {
      const CURRENT_PAGE = Number($clickedButton.innerText);
      const PAGE_INDEX = (CURRENT_PAGE - 1) * POKEMONS_PER_PAGE;

      updatePagination(POKEMONS_PER_PAGE, PAGE_INDEX);
    } else if ($clickedButton.classList.contains("paginator-button")) {
      NEXT_PAGE_INDEX = CURRENT_PAGE * POKEMONS_PER_PAGE;
      PREVIOUS_PAGE_INDEX = (CURRENT_PAGE - 2) * POKEMONS_PER_PAGE;

      $clickedButton.innerText === "Previous" ? updatePagination(POKEMONS_PER_PAGE, PREVIOUS_PAGE_INDEX) : updatePagination(POKEMONS_PER_PAGE, NEXT_PAGE_INDEX);
    }
  };
}

function createPaginator(TOTAL_PAGES) {
  const $pageContainer = document.querySelector("#paginator-container");

  if ($pageContainer.innerHTML !== "") return;

  for (let i = 0; i <= TOTAL_PAGES; i++) {
    const $item = document.createElement("li");
    const $page = document.createElement("a");

    $item.className = "page-item";
    $page.className = "page-link card-border paginator-text";
    $page.href = "#";

    $page.textContent = i === 0 ? "Previous" : i === TOTAL_PAGES ? "Next" : i;
    i !== 0 && i !== TOTAL_PAGES ? $page.classList.add("paginator-page") : $page.classList.add("paginator-button");

    $item.appendChild($page);
    $pageContainer.appendChild($item);
  }
}
