import { getPokemonNames, getPokemonMainName, getPokemonIds, getPokemonSkills, getPokemonStats, getPokemonTypes, getPokemonAdvantage, getPreviousEvolutionData, getEnglishDescription, convertGramToLb, convertDecimeterToFeet, calculatePaginationValues, advantageChart } from "./general.js";
export function getPageData(getPokemons, POKEMONS_PER_PAGE, pageIndex) {
  return getPokemons(POKEMONS_PER_PAGE, pageIndex).then((pokemons) => {
    const totalPokemons = pokemons.count;
    const pokemonNames = getPokemonNames(pokemons.results);
    const pokemonIds = getPokemonIds(pokemons.results);
    const { totalPages, currentPage } = calculatePaginationValues(totalPokemons, pageIndex, POKEMONS_PER_PAGE);

    return { pokemonNames, pokemonIds, totalPages, currentPage };
  });
}

export function getPokemonData(pokemon, species, selectedPokemon) {
  return pokemon(selectedPokemon).then((pokemon) => {
    const pokemonName = getPokemonMainName(pokemon.name);
    const pokemonSkills = getPokemonSkills(pokemon.abilities);
    const pokemonStats = getPokemonStats(pokemon.stats);
    const pokemonTypes = getPokemonTypes(pokemon.types);
    const pokemonHeight = convertDecimeterToFeet(pokemon.height);
    const pokemonWeight = convertGramToLb(pokemon.weight);
    const pokemonTypeAdvantage = getPokemonAdvantage(pokemonTypes.mainType, advantageChart);
    const pokemonSpeciesName = pokemon.species.name;

    return species(pokemonSpeciesName).then((species) => {
      const previousEvolutionData = getPreviousEvolutionData(species);
      const pokemonDescription = getEnglishDescription(species.flavor_text_entries);

      return { pokemonSkills, pokemonHeight, pokemonName, pokemonStats, pokemonTypes, pokemonWeight, previousEvolutionData, pokemonDescription, pokemonTypeAdvantage };
    });
  });
}
