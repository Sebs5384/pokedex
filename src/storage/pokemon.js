const POKEMON_LIMIT = 20;
const POKEMON_OFFSET = 0;

function getPokemonKey(id) {
  return `pokemon_${id}`;
}

function getPokemonsKey(limit, offset) {
  return `pokemons_${limit}_${offset}`;
}

function getPokemonSpeciesKey(name) {
  return `pokemon_species_${name}`;
}

export function loadPokemon(id) {
  if (id === undefined) {
    throw new Error(`Invalid pokemon id: ${id}`);
  }

  const pokemon = JSON.parse(localStorage.getItem(getPokemonKey(id)));
  if (pokemon === null) {
    throw new Error('Pokemon not found');
  }
}

export function loadPokemons(limit = POKEMON_LIMIT, offset = POKEMON_OFFSET) {
  const pokemons = JSON.parse(localStorage.getItem(getPokemonsKey(limit, offset)));
  if (pokemons === null) {
    throw new Error(`Pokemons with given limit: ${limit} and offset: ${offset} not found`);
  }

  return pokemons;
}

export function loadPokemonSpecies(name) {
  if (name === undefined) {
    throw new Error(`Invalid pokemon species name: ${name}`);
  }

  const species = JSON.parse(localStorage.getItem(getPokemonSpeciesKey(name)));
  if (species === null) {
    throw new Error(`Pokemon species: ${name} not found`);
  }

  return species;
}

export function storePokemon(id, pokemon) {
  if (id === undefined || typeof pokemon !== 'object') {
    throw new Error('Id and pokemon must be defined to be stored in local storage');
  }

  localStorage.setItem(getPokemonKey(id), JSON.stringify(pokemon));
}

export function storePokemons(limit, offset, pokemons) {
  if (limit === undefined || offset === undefined || typeof pokemons !== 'object') {
    throw new Error('Limit, offset and pokemons must be defined to be stored in local storage');
  }

  localStorage.setItem(getPokemonsKey(limit, offset), JSON.stringify(pokemons));
}

export function storeSpecies(name, species) {
  if (name === undefined || typeof species !== 'object') {
    throw new Error('Name and species must be defined to be stored in local storage');
  }

  localStorage.setItem(getPokemonSpeciesKey(name), JSON.stringify(species));
}
