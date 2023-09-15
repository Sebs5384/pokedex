const URL = "https://pokeapi.co/api/v2/pokemon/";

function getPokemon(pokemon) {
  const pokemonURL = `${URL}${pokemon}`;

  return fetch(pokemonURL)
    .then((response) => {
      return response.json();
    })
    .then((pokemon) => {
      return pokemon;
    });
}

function getPokemons(limit = "20", offset = "0") {
  const pokemonsURL = `${URL}?limit=${limit}&offset=${offset}`;

  return fetch(pokemonsURL)
    .then((response) => {
      return response.json();
    })
    .then((pokemons) => {
      return pokemons;
    });
}

export function getPokemonPaginationData(limit, offset) {
  return getPokemons(limit, offset).then((pokemons) => {
    return {
      names: pokemons.results.map((pokemon) => pokemon.name),
      next: pokemons.next,
      previous: pokemons.previous,
      count: pokemons.count,
    };
  });
}
