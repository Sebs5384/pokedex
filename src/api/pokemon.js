const URL = "https://pokeapi.co/api/v2/pokemon/";

export function getPokemon(id) {
  const pokemonURL = `${URL}${id}`;

  return fetch(pokemonURL)
    .then((response) => {
      return response.json();
    })
    .then((pokemon) => {
      return pokemon;
    });
}

export function getPokemons(limit = "20", offset = "0") {
  const pokemonsURL = `${URL}?limit=${limit}&offset=${offset}`;

  return fetch(pokemonsURL)
    .then((response) => {
      return response.json();
    })
    .then((pokemons) => {
      return pokemons;
    });
}
