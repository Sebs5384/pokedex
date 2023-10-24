export const BASE_URL = 'https://pokeapi.co/api/v2';

export async function getPokemon(id) {
  if (id === undefined) throw new Error(`Invalid pokemon id: ${id}`);

  const pokemonURL = `${BASE_URL}/pokemon/${id}`;
  // eslint-disable-next-line no-return-await
  return await fetch(pokemonURL)
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(`An error occurred while fetching pokemon with id: ${id} ${error}`);
    });
}

export async function getPokemons(limit, offset) {
  if (limit === undefined || offset === undefined) throw new Error('Limit and offset must be defined');

  const pokemonsURL = `${BASE_URL}/pokemon/?limit=${limit}&offset=${offset}`;
  // eslint-disable-next-line no-return-await
  return await fetch(pokemonsURL)
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(`An error occurred while fetching pokemons with limit: ${limit} offset: ${offset} ${error}`);
    });
}

export async function getPokemonSpecies(name) {
  if (name === undefined) throw new Error('Invalid pokemon species, species name must be defined');

  const speciesURL = `${BASE_URL}/pokemon-species/${name}`;
  // eslint-disable-next-line no-return-await
  return await fetch(speciesURL)
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(`An error occurred while fetching pokemon with species-name: ${name} ${error}`);
    });
}

export function getPokemonSprite(pokemonId, artwork = '') {
  if (pokemonId === undefined) throw new Error(`Invalid pokemon id: ${pokemonId}`);

  try {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${artwork}${pokemonId}.png`;
  } catch (error) {
    throw new Error(`An error occurred while returning the desired url with the pokemon id: ${pokemonId} ${error}`);
  }
}
