/* eslint-disable object-curly-newline */
import { getPokemon as getPokemonFromApi, getPokemons as getPokemonsFromApi, getPokemonSpecies as getPokemonSpeciesFromApi, getPokemonSprite as getPokemonSpriteFromAssets } from '../api/pokemon.js';
import {
  loadPokemon as loadPokemonFromStorage,
  loadPokemons as loadPokemonsFromStorage,
  loadSpecies as loadSpeciesFromStorage,
  loadPokemonSprite as loadPokemonSpriteFromStorage,
  storePokemon,
  storePokemons,
  storeSpecies,
  storePokemonSprite,
} from '../storage/pokemon.js';

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

export async function getPokemons(limit = POKEMON_LIMIT, offset = POKEMON_OFFSET) {
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

export function getPokemonSprite(id, artwork = '') {
  try {
    return loadPokemonSpriteFromStorage(id, artwork);
  } catch (error) {
    const sprite = getPokemonSpriteFromAssets(id, artwork);
    storePokemonSprite(id, sprite, artwork);
    return sprite;
  }
}
