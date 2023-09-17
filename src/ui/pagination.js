import { getPokemonPaginationData } from "../api/pokemon.js";

export function updatePagination(POKEMONS_PER_PAGE, NEXT_PAGE) {
  getPokemonPaginationData(POKEMONS_PER_PAGE, NEXT_PAGE).then((data) => {
    const { names, next, previous, count } = data;
    const TOTAL_POKEMONS = count;
    const TOTAL_PAGES = Math.ceil(TOTAL_POKEMONS / POKEMONS_PER_PAGE + 1);
    const CURRENT_PAGE = NEXT_PAGE / POKEMONS_PER_PAGE;

    console.log(data);
    handlePaginationChanges(POKEMONS_PER_PAGE);
    createPaginator(TOTAL_PAGES);
    setCurrentPages(CURRENT_PAGE);
  });
}

function setCurrentPages(current) {
  const $pages = document.querySelectorAll(".paginator-page");

  $pages.forEach((page, index) => {
    const pageIndex = index + 1;

    const currentPage = Number(current);
    pageIndex >= currentPage - 1 && pageIndex <= currentPage + 2 ? page.classList.remove("hidden") : page.classList.add("hidden");
  });
}

function handlePaginationChanges(POKEMONS_PER_PAGE) {
  const $buttons = document.querySelector("#paginator-container");

  $buttons.onclick = (event) => {
    event.preventDefault();
    const $clickedElement = event.target;

    if ($clickedElement.classList.contains("paginator-page")) {
      const CURRENT_PAGE = Number(event.target.innerText);
      console.log(CURRENT_PAGE, "currentpage");
      const NEXT_PAGE = (CURRENT_PAGE - 1) * POKEMONS_PER_PAGE;

      updatePagination(POKEMONS_PER_PAGE, NEXT_PAGE);
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
