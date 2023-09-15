import { getPokemonPaginationData } from "./api/pokemon.js";
function initialize() {
  getPokemonPaginationData().then((data) => {
    const { names, next, previous, count } = data;

    const limit = "20";
    const totalPokemons = count;
    const pages = Math.ceil(totalPokemons / limit + 1);
    let currentPage = 1;

    createPaginator(pages);
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

    if (i === 0) {
      $link.textContent = "Previous";
    } else if (i === pages) {
      $link.textContent = "Next";
    } else {
      $link.textContent = i;
    }

    $item.appendChild($link);
    $page.appendChild($item);
  }
}

initialize();
