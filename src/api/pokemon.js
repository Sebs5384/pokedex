const URL = 'https://pokeapi.co/api/v2';

export async function getPokemon(id) {
  const pokemonURL = `${URL}/pokemon/${id}`;

  // eslint-disable-next-line no-return-await
  return await fetch(pokemonURL)
    .then((response) => response.json())
    .then((pokemon) => pokemon)
    .catch((error) => {
      throw new Error(error);
    });
}

export async function getPokemons(limit, offset) {
  const pokemonsURL = `${URL}/pokemon/?limit=${limit}&offset=${offset}`;

  // eslint-disable-next-line no-return-await
  return await fetch(pokemonsURL)
    .then((response) => response.json())
    .then((pokemons) => pokemons)
    .catch((error) => {
      throw new Error(error);
    });
}

export async function getPokemonSpecies(name) {
  const speciesURL = `${URL}/pokemon-species/${name}`;

  // eslint-disable-next-line no-return-await
  return await fetch(speciesURL)
    .then((response) => response.json())
    .then((species) => species)
    .catch((error) => {
      throw new Error(error);
    });
}

export async function getPokemonSprite(pokemonId, sprite = '') {
  try {
    const pokemonSprite = Array.isArray(pokemonId)
      ? pokemonId.map((id) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${sprite}${id}.png`)
      : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${sprite}${pokemonId}.png`;
    return pokemonSprite;
  } catch (error) {
    throw new Error(error);
  }
}
