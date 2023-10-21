import { getPokemon as getPokemonFromApi, getPokemons as getPokemonsFromApi, getPokemonSpecies as getPokemonSpeciesFromApi } from '../api/pokemon.js';
import { loadPokemon as loadPokemonFromStorage, loadPokemons as loadPokemonsFromStorage, loadSpecies as loadSpeciesFromStorage, storePokemon, storePokemons, storeSpecies } from '../storage/pokemon.js';

const POKEMON_LIMIT = 20;
const POKEMON_OFFSET = 0;

export async function getPokemon(id) {
  try {
    return loadPokemonFromStorage(id);
  } catch (error) {
    const pokemon = await getPokemonFromApi(id);
    storePokemon(id, pokemon);
    return pokemon;
  }
}

export async function getPokemons(pokemon, limit = POKEMON_LIMIT, offset = POKEMON_OFFSET) {
  try {
    return loadPokemonsFromStorage(limit, offset);
  } catch (error) {
    const pokemons = await getPokemonsFromApi(limit, offset);
    storePokemons(limit, offset, pokemons);
    return pokemons;
  }
}

export async function getPokemonSpecies(name) {
  try {
    return loadSpeciesFromStorage(name);
  } catch (error) {
    const species = await getPokemonSpeciesFromApi(name);
    storeSpecies(name, species);
    return species;
  }
}
