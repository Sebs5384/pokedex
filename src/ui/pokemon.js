import { updatePagination } from "./pagination.js";

export function setupPokedex() {
  const POKEMONS_PER_PAGE = 20;
  const CURRENT_PAGE = 0;
  updatePagination(POKEMONS_PER_PAGE, CURRENT_PAGE);
}
