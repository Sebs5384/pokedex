import { getPokemonPaginationData } from "../api/pokemon.js";

export function setupPagination() {
  getPokemonPaginationData().then((data) => {
    const { names, next, previous, count } = data;

    const limit = 20;
    const totalPokemons = count;
    const totalPages = Math.ceil(totalPokemons / limit + 1);
    let currentPage = 1;

    createPaginator(totalPages);
    updatePaginatorPages(currentPage);
    updatePagination();
  });
}

function createPaginator(pages) {
  const $page = document.querySelector("#paginator-container");

  for (let i = 0; i <= pages; i++) {
    const $item = document.createElement("li");
    const $link = document.createElement("a");

    $item.className = "page-item";
    $link.className = "page-link card-border paginator-text";
    $link.href = "#";

    $link.textContent = i === 0 ? "Previous" : i === pages ? "Next" : i;
    i !== 0 && i !== pages ? $link.classList.add("paginator-pages") : null;

    $item.appendChild($link);
    $page.appendChild($item);
  }
}

function updatePaginatorPages(current) {
  const $pages = document.querySelectorAll(".paginator-pages");

  $pages.forEach((page, index) => {
    const pageIndex = index + 1;
    const currentPage = Number(current);

    pageIndex >= currentPage - 2 && pageIndex <= currentPage + 2 ? page.classList.remove("hidden") : page.classList.add("hidden");
  });
}

function handlePaginationClick(event) {
  event.preventDefault();
  const $clickedButton = event.target;
  return $clickedButton.innerText;
}

function updatePagination() {
  const $buttons = document.querySelector("#paginator-container");

  $buttons.onclick = (event) => {
    const $clickedButton = handlePaginationClick(event);
    updatePaginatorPages($clickedButton);
  };
}
