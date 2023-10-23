export const BASE_URL = 'https://pokeapi.co/api/v2';

export async function getPokemon(id) {
  console.log(id);
  const pokemonURL = `${BASE_URL}/pokemon/${id}`;

  // eslint-disable-next-line no-return-await
  return await fetch(pokemonURL)
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(error);
    });
}

export async function getPokemons(limit, offset) {
  const pokemonsURL = `${BASE_URL}/pokemon/?limit=${limit}&offset=${offset}`;

  // eslint-disable-next-line no-return-await
  return await fetch(pokemonsURL)
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(error);
    });
}

export async function getPokemonSpecies(name) {
  const speciesURL = `${BASE_URL}/pokemon-species/${name}`;

  // eslint-disable-next-line no-return-await
  return await fetch(speciesURL)
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(error);
    });
}

export function getPokemonSprite(pokemonId, artwork = '') {
  try {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${artwork}${pokemonId}.png`;
  } catch (error) {
    throw new Error(error);
  }
}
