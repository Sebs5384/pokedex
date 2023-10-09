const URL = "https://pokeapi.co/api/v2";

export function getPokemon(id) {
  const pokemonURL = `${URL}/pokemon/${id}`;

  return fetch(pokemonURL)
    .then((response) => {
      return response.json();
    })
    .then((pokemon) => {
      return pokemon;
    })
    .catch((error) => {
      console.error(error);
    });
}

export function getPokemons(limit, offset) {
  const pokemonsURL = `${URL}/pokemon/?limit=${limit}&offset=${offset}`;

  return fetch(pokemonsURL)
    .then((response) => {
      return response.json();
    })
    .then((pokemons) => {
      return pokemons;
    })
    .catch((error) => {
      console.error(error);
    });
}

export function getPokemonSpecies(id) {
  const speciesURL = `${URL}/pokemon-species/${id}`;

  return fetch(speciesURL)
    .then((response) => {
      return response.json();
    })
    .then((species) => {
      return species;
    })
    .catch((error) => {
      console.error(error);
    });
}

export function getPokemonSprite(id, sprite = "") {
  try {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${sprite}${id}.png`;
  } catch (error) {
    console.error(error);
  }
}
