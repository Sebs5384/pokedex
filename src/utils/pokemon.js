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
  catchPokemon,
} from "./general.js";

export function getPokemonsData(getPokemons, POKEMONS_PER_PAGE, pageIndex) {
  return getPokemons(POKEMONS_PER_PAGE, pageIndex).then((pokemons) => {
    const totalPokemons = pokemons.count;
    const pokemonNames = getPokemonNames(pokemons.results);
    const pokemonIds = getPokemonIds(pokemons.results);

    return { pokemonNames, pokemonIds, totalPokemons };
  });
}

export function getPokemonData(pokemon, species, getSprite, selectedPokemon) {
  return pokemon(selectedPokemon).then((pokemon) => {
    const name = getPokemonMainName(pokemon.name);
    const id = pokemon.id;
    const skills = getPokemonSkills(pokemon.abilities);
    const stats = getPokemonStats(pokemon.stats);
    const types = getPokemonTypes(pokemon.types);
    const height = convertDecimeterToFeet(pokemon.height);
    const weight = convertGramToLb(pokemon.weight);
    const typeAdvantage = getPokemonAdvantage(types.mainType, advantageChart);
    const sprite = getSprite(id, "other/official-artwork/");
    const speciesName = pokemon.species.name;

    return species(speciesName).then((species) => {
      const previousEvolutionData = getPreviousEvolutionData(species);
      const description = getEnglishDescription(species.flavor_text_entries);

      return { skills, height, name, id, stats, types, weight, previousEvolutionData, description, typeAdvantage, sprite };
    });
  });
}

export function getPageData(pageData, pageIndex, itemsPerPage) {
  const { totalPages, currentPage } = calculatePaginationValues(pageData, pageIndex, itemsPerPage);

  return { totalPages, currentPage };
}
