import { getPokemonPaginationData } from "../api/pokemon.js";

export function updatePagination(POKEMONS_PER_PAGE, PAGE_INDEX) {
  getPokemonPaginationData(POKEMONS_PER_PAGE, PAGE_INDEX).then((data) => {
    const { names, next, previous, count } = data;
    const TOTAL_POKEMONS = count;
    const TOTAL_PAGES = Math.ceil(TOTAL_POKEMONS / POKEMONS_PER_PAGE + 1);
    const CURRENT_PAGE = PAGE_INDEX / POKEMONS_PER_PAGE + 1;

    console.log(data);
    handlePaginationChanges(POKEMONS_PER_PAGE);
    createPaginator(TOTAL_PAGES);
    displayCurrentPagination(CURRENT_PAGE);
  });
}

function displayCurrentPagination(currentPage) {
  const $pages = document.querySelectorAll(".paginator-page");

  $pages.forEach((page, index) => {
    const pageIndex = index + 1;

    pageIndex >= currentPage - 1 && pageIndex <= currentPage + 2 ? page.classList.remove("hidden") : page.classList.add("hidden");
  });
}

function handlePaginationChanges(POKEMONS_PER_PAGE) {
  const $buttons = document.querySelector("#paginator-container");

  $buttons.onclick = (event) => {
    event.preventDefault();
    const $clickedPage = event.target;

    if ($clickedPage.classList.contains("paginator-page")) {
      const CURRENT_PAGE = Number($clickedPage.innerText);
      const NEXT_PAGE_INDEX = (CURRENT_PAGE - 1) * POKEMONS_PER_PAGE;

      updatePagination(POKEMONS_PER_PAGE, NEXT_PAGE_INDEX);
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
    i !== 0 && i !== totalPages ? $link.classList.add("paginator-page") : null;

    $item.appendChild($link);
    $pageContainer.appendChild($item);
  }
}
