import { getPokemons, getPokemonSprite } from "./api/pokemon.js";
import { setupPagination } from "./ui/pagination.js";
import { displayPokemonCards } from "./ui/cards.js";
import { calculatePaginationValues as getPokedexPaginationValues, getPokemonNames, getPokemonIds } from "./utils/general.js";

export function updatePokedexPage(POKEMONS_PER_PAGE = 20, pageIndex = 0) {
  getPokemons(POKEMONS_PER_PAGE, pageIndex).then((pokemons) => {
    const totalPokemons = pokemons.count;
    const pokemonNames = getPokemonNames(pokemons.results);
    const pokemonIds = getPokemonIds(pokemons.results);
    const pokemonSprites = pokemonIds.map((id) => getPokemonSprite(id));
    const { totalPages, currentPage } = getPokedexPaginationValues(totalPokemons, pageIndex, POKEMONS_PER_PAGE);

    setupPagination(POKEMONS_PER_PAGE, pageIndex, totalPages, currentPage, updatePokedexPage);
    displayPokemonCards(pokemonNames, pokemonIds, pokemonSprites);
  });
}
