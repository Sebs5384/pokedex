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

    return { pokemonSkills, pokemonHeight, pokemonName, pokemonStats, pokemonTypes, pokemonWeight, previousEvolutionData, pokemonDescription };
  });
}

function calculatePaginationValues(totalItems, pageIndex, itemsPerPage) {
  const totalPages = Math.ceil(totalItems / itemsPerPage + 1);
  const currentPage = pageIndex / itemsPerPage + 1;

  return { totalPages, currentPage };
}

function getPreviousEvolutionData(species) {
  return {
    name: species.evolves_from_species ? species.evolves_from_species.name : "Basic Pokemon",
    id: species.evolves_from_species ? species.evolves_from_species.url.split("/")[6] : "None",
    genus: species.genera[7].genus,
  };
}

function convertGramToLb(grams) {
  return (grams * 0.00220462).toFixed(2);
}

function convertDecimeterToFeet(meters) {
  return (meters * 0.328084).toFixed(2);
}

function getEnglishDescription(entry) {
  const textEntries = entry;
  const englishEntry = textEntries.find((entry) => entry.language.name === "en");

  return englishEntry ? englishEntry.flavor_text : "";
}

function getPokemonSkills(pokemonSkills) {
  return {
    firstSkill: pokemonSkills[0].ability.name,
    secondSkill: pokemonSkills[1].ability.name,
  };
}

function getPokemonNames(list) {
  return list.map((item) => parsePokemonName(item.name));
}

function getPokemonIds(pokemons) {
  return pokemons.map((pokemon) => pokemon.url.split("/")[6]);
}

function getPokemonStats(pokemonStats) {
  return {
    hp: pokemonStats[0].base_stat,
    attack: pokemonStats[1].base_stat,
    defense: pokemonStats[2].base_stat,
    spAtk: pokemonStats[3].base_stat,
    spDef: pokemonStats[4].base_stat,
    speed: pokemonStats[5].base_stat,
  };
}

function getPokemonTypes(pokemonTypes) {
  return {
    mainType: pokemonTypes[0].type.name,
    secondaryType: pokemonTypes[1] ? pokemonTypes[1].type.name : undefined,
  };
}

function parsePokemonName(pokemonName) {
  return pokemonName
    .split("-")
    .map((pokemon) => pokemon.charAt(0).toUpperCase() + pokemon.slice(1))
    .join(" ");
}
