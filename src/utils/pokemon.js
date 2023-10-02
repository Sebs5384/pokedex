import { getPokemonNames, getPokemonIds, getPokemonSkills, getPokemonStats, getPokemonTypes, getPokemonAdvantage, getPreviousEvolutionData, getEnglishDescription, convertGramToLb, convertDecimeterToFeet, calculatePaginationValues, advantageChart } from "./general.js";
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
  return Promise.all([pokemon(selectedPokemon), species(selectedPokemon)]).then(([pokemon, species]) => {
    const pokemonName = pokemon.name;
    const pokemonSkills = getPokemonSkills(pokemon.abilities);
    const pokemonStats = getPokemonStats(pokemon.stats);
    const pokemonTypes = getPokemonTypes(pokemon.types);
    const pokemonHeight = convertDecimeterToFeet(pokemon.height);
    const pokemonWeight = convertGramToLb(pokemon.weight);
    const previousEvolutionData = getPreviousEvolutionData(species);
    const pokemonDescription = getEnglishDescription(species.flavor_text_entries);
    const pokemonTypeAdvantage = getPokemonAdvantage(pokemonTypes.mainType, advantageChart);

    return { pokemonSkills, pokemonHeight, pokemonName, pokemonStats, pokemonTypes, pokemonWeight, previousEvolutionData, pokemonDescription, pokemonTypeAdvantage };
  });
}
