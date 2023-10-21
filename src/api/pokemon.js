const URL = 'https://pokeapi.co/api/v2';

export async function getPokemon(id) {
  console.log(id);
  const pokemonURL = `${URL}/pokemon/${id}`;

  // eslint-disable-next-line no-return-await
  return await fetch(pokemonURL)
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(error);
    });
}

export async function getPokemons(limit, offset) {
  const pokemonsURL = `${URL}/pokemon/?limit=${limit}&offset=${offset}`;

  // eslint-disable-next-line no-return-await
  return await fetch(pokemonsURL)
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(error);
    });
}

export async function getPokemonSpecies(name) {
  const speciesURL = `${URL}/pokemon-species/${name}`;

  // eslint-disable-next-line no-return-await
  return await fetch(speciesURL)
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(error);
    });
}

export async function getPokemonSprite(pokemonId, sprite = '') {
  try {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${sprite}${pokemonId}.png`;
  } catch (error) {
    throw new Error(error);
  }
}
