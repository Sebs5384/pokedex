import { getPokemonPaginationData } from "../api/pokemon.js";

export function updatePagination(POKEMONS_PER_PAGE, PAGE_INDEX) {
  getPokemonPaginationData(POKEMONS_PER_PAGE, PAGE_INDEX).then((data) => {
    const { names, next, previous, count } = data;
    const TOTAL_POKEMONS = count;
    const TOTAL_PAGES = Math.ceil(TOTAL_POKEMONS / POKEMONS_PER_PAGE + 1);
    const CURRENT_PAGE = PAGE_INDEX / POKEMONS_PER_PAGE + 1;

    handlePaginationChanges(POKEMONS_PER_PAGE, PAGE_INDEX, CURRENT_PAGE);
    createPaginator(TOTAL_PAGES);
    displayCurrentPagination(CURRENT_PAGE);
  });
}

function displayCurrentPagination(CURRENT_PAGE) {
  const $pages = document.querySelectorAll(".paginator-page");

  $pages.forEach((page, index) => {
    const pageIndex = index + 1;

    pageIndex >= CURRENT_PAGE - 1 && pageIndex <= CURRENT_PAGE + 2 ? page.classList.remove("hidden") : page.classList.add("hidden");
  });
}

function handlePaginationChanges(POKEMONS_PER_PAGE, PAGE_INDEX, CURRENT_PAGE) {
  let NEXT_PAGE_INDEX = POKEMONS_PER_PAGE;
  let PREVIOUS_PAGE_INDEX = PAGE_INDEX;

  const $buttons = document.querySelector("#paginator-container");
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

function createPaginator(totalPages) {
  const $pageContainer = document.querySelector("#paginator-container");

  $pageContainer.innerHTML = "";
  for (let i = 0; i <= totalPages; i++) {
    const $item = document.createElement("li");
    const $link = document.createElement("a");

    $item.className = "page-item";
    $link.className = "page-link card-border paginator-text";
    $link.href = "#";

    $link.textContent = i === 0 ? "Previous" : i === totalPages ? "Next" : i;
    i !== 0 && i !== totalPages ? $link.classList.add("paginator-page") : $link.classList.add("paginator-button");

    $item.appendChild($link);
    $pageContainer.appendChild($item);
  }
}
