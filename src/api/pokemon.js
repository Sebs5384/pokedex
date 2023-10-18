const URL = "https://pokeapi.co/api/v2";

export async function getPokemon(id) {
  const pokemonURL = `${URL}/pokemon/${id}`;

  return await fetch(pokemonURL)
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

export async function getPokemons(limit, offset) {
  const pokemonsURL = `${URL}/pokemon/?limit=${limit}&offset=${offset}`;

  return await fetch(pokemonsURL)
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

export async function getPokemonSpecies(name) {
  const speciesURL = `${URL}/pokemon-species/${name}`;

  return await fetch(speciesURL)
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

export async function getPokemonSprite(pokemonId, sprite = "") {
  try {
    const pokemonSprite = Array.isArray(pokemonId)
      ? pokemonId.map((id) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${sprite}${id}.png`)
      : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${sprite}${pokemonId}.png`;
    return pokemonSprite;
  } catch (error) {
    console.error(error);
  }
}
