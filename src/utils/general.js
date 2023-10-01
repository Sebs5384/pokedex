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
    const pokemonSkills = pokemon.abilities.map((ability) => ability.ability.name);
    const pokemonStats = pokemon.stats.map((stat) => stat.base_stat);
    const pokemonTypes = pokemon.types.map((type) => type.type.name);
    const pokemonHeight = convertDecimeterToFeet(pokemon.height);
    const pokemonWeight = convertGramToLb(pokemon.weight);
    const pokemonName = pokemon.name;
    const pokemonSprite = pokemon.sprites.other["official-artwork"].front_default;
    const previousEvolutionName = species.evolves_from_species ? `Evolves from ${species.evolves_from_species.name}` : "Basic Pokemon";
    const previousEvolutionId = species.evolves_from_species ? species.evolves_from_species.url.split("/")[6] : "None";
    const pokemonText = species.flavor_text_entries[0].flavor_text;
    const pokemonGenus = species.genera[7].genus;

    return { pokemonSkills, pokemonHeight, pokemonName, pokemonSprite, pokemonStats, pokemonTypes, pokemonWeight, previousEvolutionName, previousEvolutionId, pokemonText, pokemonGenus };
  });
}

function calculatePaginationValues(totalItems, pageIndex, itemsPerPage) {
  const totalPages = Math.ceil(totalItems / itemsPerPage + 1);
  const currentPage = pageIndex / itemsPerPage + 1;

  return { totalPages, currentPage };
}

function convertGramToLb(grams) {
  return (grams * 0.00220462).toFixed(2);
}

function convertDecimeterToFeet(meters) {
  return (meters * 0.328084).toFixed(2);
}

function getPokemonNames(list) {
  return list.map((item) => parsePokemonName(item.name));
}

function getPokemonIds(pokemons) {
  return pokemons.map((pokemon) => pokemon.url.split("/")[6]);
}

function parsePokemonName(pokemonName) {
  return pokemonName
    .split("-")
    .map((pokemon) => pokemon.charAt(0).toUpperCase() + pokemon.slice(1))
    .join(" ");
}
