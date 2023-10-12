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
  calculatePaginationValues,
  advantageChart,
  catchPokemon,
} from "./general.js";

export function getPageData(getPokemons, getPokemonSprite, POKEMONS_PER_PAGE, pageIndex) {
  return getPokemons(POKEMONS_PER_PAGE, pageIndex).then((pokemons) => {
    const totalPokemons = pokemons.count;
    const pokemonNames = getPokemonNames(pokemons.results);
    const pokemonIds = getPokemonIds(pokemons.results);
    const pokemonSprites = pokemonIds.map((id) => getPokemonSprite(id, "other/official-artwork/"));
    const { totalPages, currentPage } = calculatePaginationValues(totalPokemons, pageIndex, POKEMONS_PER_PAGE);

    return { pokemonNames, pokemonIds, totalPages, currentPage, pokemonSprites };
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

export function getCaughtPokemonData(getPokemons, pokemon, species, getPokemonSprite, limit, offset) {
  return getPokemons(limit, offset).then((pokemons) => {
    const caughtPokemon = catchPokemon(pokemons);

    return pokemon(caughtPokemon).then((caughtPokemon) => {
      const id = caughtPokemon.id;
      const name = getPokemonMainName(caughtPokemon.name);
      const height = convertDecimeterToFeet(caughtPokemon.height);
      const weight = convertGramToLb(caughtPokemon.weight);
      const pokemonSprite = getPokemonSprite(id);
      const speciesName = caughtPokemon.species.name;

      return species(speciesName).then((caughtPokemonSpecies) => {
        const evolutionData = getPreviousEvolutionData(caughtPokemonSpecies);
        const description = getEnglishDescription(caughtPokemonSpecies.flavor_text_entries);

        return { id, name, height, weight, description, evolutionData, pokemonSprite };
      });
    });
  });
}

export function getPokemonsData(getPokemons, limit, offset) {
  return getPokemons(limit, offset).then((pokemons) => {
    const names = getPokemonNames(pokemons.results);
    const ids = getPokemonIds(pokemons.results);

    return { names, ids };
  });
}
