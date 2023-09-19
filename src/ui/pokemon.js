import { getPokemons } from "../api/pokemon.js";
import { updatePagination } from "./pagination.js";
import { pokedexPaginationValues } from "../utils/general.js";

export function updatePokedexPage(POKEMONS_PER_PAGE = 20, pageIndex = 0) {
  getPokemons(POKEMONS_PER_PAGE, pageIndex).then((pokemons) => {
    const totalPokemons = pokemons.count;
    const { totalPages, currentPage } = pokedexPaginationValues(totalPokemons, pageIndex, POKEMONS_PER_PAGE);
    updatePagination(POKEMONS_PER_PAGE, pageIndex, totalPages, currentPage, updatePokedexPage);
  });
}
