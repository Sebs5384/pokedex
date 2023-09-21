export function calculatePaginationValues(totalItems, pageIndex, itemsPerPage) {
  const totalPages = Math.ceil(totalItems / itemsPerPage + 1);
  const currentPage = pageIndex / itemsPerPage + 1;

  return { totalPages, currentPage };
}

export function getPokemonNames(list) {
  return list.map((item) => parsePokemonName(item.name));
}

export function getPokemonIds(pokemons) {
  return pokemons.map((pokemon) => pokemon.url.split("/")[6]);
}

function parsePokemonName(pokemonName) {
  return pokemonName
    .split("-")
    .map((pokemon) => pokemon.charAt(0).toUpperCase() + pokemon.slice(1))
    .join(" ");
}
