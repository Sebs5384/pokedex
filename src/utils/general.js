export function calculatePaginationValues(totalItems, pageIndex, itemsPerPage) {
  const totalPages = Math.ceil(totalItems / itemsPerPage + 1);
  const currentPage = pageIndex / itemsPerPage + 1;

  return { totalPages, currentPage };
}

export function getPreviousEvolutionData(species) {
  return {
    name: species.evolves_from_species ? `Evolves from ${species.evolves_from_species.name}` : "Basic Pokemon",
    id: species.evolves_from_species ? species.evolves_from_species.url.split("/")[6] : "None",
    genus: species.genera[7].genus,
  };
}

export function convertGramToLb(grams) {
  return (grams * 0.00220462).toFixed(2);
}

export function convertDecimeterToFeet(meters) {
  return (meters * 0.328084).toFixed(2).replace(".", "'");
}

export function getEnglishDescription(entry) {
  const textEntries = entry;
  const englishEntry = textEntries.find((entry) => entry.language.name === "en");

  return englishEntry ? englishEntry.flavor_text.replace(/\u000c/g, " ") : "";
}

export function getPokemonSkills(pokemonSkills) {
  return {
    firstSkill: pokemonSkills[0].ability.name,
    secondSkill: pokemonSkills[1] ? pokemonSkills[1].ability.name : "",
  };
}

export function getPokemonNames(list) {
  return list.map((item) => parsePokemonName(item.name));
}

export function getPokemonIds(pokemons) {
  return pokemons.map((pokemon) => pokemon.url.split("/")[6]);
}

export function getPokemonStats(pokemonStats) {
  return {
    hp: pokemonStats[0].base_stat,
    attack: pokemonStats[1].base_stat,
    defense: pokemonStats[2].base_stat,
    spAtk: pokemonStats[3].base_stat,
    spDef: pokemonStats[4].base_stat,
    speed: pokemonStats[5].base_stat,
  };
}

export function getPokemonTypes(pokemonTypes) {
  return {
    mainType: pokemonTypes[0].type.name,
    secondaryType: pokemonTypes[1] ? pokemonTypes[1].type.name : undefined,
  };
}

export function parsePokemonName(pokemonName) {
  return pokemonName
    .split("-")
    .map((pokemon) => pokemon.charAt(0).toUpperCase() + pokemon.slice(1))
    .join(" ");
}

export function getPokemonAdvantage(pokemonType, advantageChart) {
  return advantageChart[pokemonType];
}

export const advantageChart = {
  fire: { resistance: "grass", weakness: "water" },
  water: { resistance: "fire", weakness: "electric" },
  grass: { resistance: "water", weakness: "fire" },
  electric: { resistance: "water", weakness: "ground" },
  normal: { resistance: "ghost", weakness: "fighting" },
  fighting: { resistance: "normal", weakness: "flying" },
  flying: { resistance: "fighting", weakness: "rock" },
  poison: { resistance: "fairy", weakness: "ground" },
  ground: { resistance: "electric", weakness: "grass" },
  rock: { resistance: "fire", weakness: "water" },
  bug: { resistance: "grass", weakness: "fire" },
  ghost: { resistance: "normal", weakness: "dark" },
  steel: { resistance: "fairy", weakness: "fire" },
  psychic: { resistance: "fighting", weakness: "dark" },
  ice: { resistance: "ice", weakness: "fire" },
  dragon: { resistance: "dragon", weakness: "fairy" },
  fairy: { resistance: "dark", weakness: "poison" },
  dark: { resistance: "ghost", weakness: "fairy" },
};
