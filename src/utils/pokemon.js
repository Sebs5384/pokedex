/* eslint-disable object-curly-newline */
import {
  getPokemonNames,
  getPokemonMainName,
  getPokemonIds,
  getPokemonSkills,
  getPokemonStats,
  getPokemonTypes,
  getPokemonAdvantage,
  getPreviousEvolutionData,
  getEnglishDescription,
  convertGramToLb,
  convertDecimeterToFeet,
  advantageChart,
  calculatePaginationValues,
} from './general.js';

export async function getPokemonsData(pokemons) {
  const totalPokemons = pokemons.count;
  const pokemonNames = getPokemonNames(pokemons.results);
  const pokemonIds = getPokemonIds(pokemons.results);

  return {
    pokemonNames,
    pokemonIds,
    totalPokemons,
  };
}

export async function getPokemonData(pokemon, species, sprite) {
  const id = pokemon.id;
  const name = getPokemonMainName(pokemon.name);
  const skills = getPokemonSkills(pokemon.abilities);
  const stats = getPokemonStats(pokemon.stats);
  const types = getPokemonTypes(pokemon.types);
  const height = convertDecimeterToFeet(pokemon.height);
  const weight = convertGramToLb(pokemon.weight);
  const typeAdvantage = getPokemonAdvantage(types.mainType, advantageChart);
  const previousEvolutionData = getPreviousEvolutionData(species);
  const description = getEnglishDescription(species.flavor_text_entries);

  return {
    skills,
    height,
    name,
    id,
    stats,
    types,
    weight,
    previousEvolutionData,
    description,
    typeAdvantage,
    sprite,
  };
}

export function getPageData(pageData, pageIndex, itemsPerPage) {
  const { totalPages, currentPage } = calculatePaginationValues(pageData, pageIndex, itemsPerPage);

  return {
    totalPages,
    currentPage,
  };
}

export function getSpriteList(pokemonIds, getPokemonSprite) {
  const sprites = pokemonIds.map((id) => getPokemonSprite(id));
  return sprites;
}
