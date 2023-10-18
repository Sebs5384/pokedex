import { getPokemons, getPokemon, getPokemonSprite, getPokemonSpecies } from "./api/pokemon.js";
import { setupPagination } from "./ui/pagination.js";
import { displayPokemonCardModal, displayCaughtPokemonModal, displayPokedexRegistrationModal } from "./ui/modal.js";
import { displayPokemonCards } from "./ui/cards.js";
import { handleSearchInput, searchPokemon, createPokemonList, filterPokemonsName } from "./ui/search-box.js";
import { handlePokeballButton, changeCaughtPokemonText, setCaughtPokemonSlot } from "./ui/catch-pokemon.js";
import { displayLoadingMessage, handleClickedPokemon } from "./ui/general.js";
import { getPokemonsData, getPokemonData, getPageData } from "./utils/pokemon.js";
import { validatePageSearchBox } from "./utils/validation.js";
import { catchPokemon } from "./utils/general.js";

export async function updatePokedexPage(POKEMONS_PER_PAGE, pageIndex) {
  displayLoadingMessage();

  const pokemons = await getPokemons(POKEMONS_PER_PAGE, pageIndex);
  const pokemonsData = await getPokemonsData(pokemons);
  const sprites = await getPokemonSprite(pokemonsData.pokemonIds);

  setupPagination(POKEMONS_PER_PAGE, pageIndex, pokemonsData, getPageData, updatePokedexPage, validatePageSearchBox);
  displayPokemonCards(pokemonsData, sprites);
}

export async function setupPokemonModal() {
  handleClickedPokemon(async (clickedPokemon) => {
    const pokemon = await getPokemon(clickedPokemon);
    const specie = await getPokemonSpecies(pokemon.species.name);
    const sprite = await getPokemonSprite(clickedPokemon, "other/official-artwork/");
    const pokemonData = await getPokemonData(pokemon, specie, sprite);

    displayPokemonCardModal(pokemonData);
  });
}

export async function setupNavigationBar(limit, offset) {
  const pokemons = await getPokemons(limit, offset);
  const pokemonsData = await getPokemonsData(pokemons);
  createPokemonList(pokemonsData);

  handlePokeballButton(async () => {
    const caughtPokemon = catchPokemon(pokemons.count);
    const pokemon = await getPokemon(caughtPokemon);
    const species = await getPokemonSpecies(pokemon.species.name);
    const sprite = await getPokemonSprite(caughtPokemon, "other/official-artwork/");
    const pokemonData = await getPokemonData(pokemon, species, sprite);

    displayCaughtPokemonModal(pokemonData, changeCaughtPokemonText);
    displayPokedexRegistrationModal(pokemonData);
    setCaughtPokemonSlot(pokemonData);
  });

  handleSearchInput((searchQuery) => {
    filterPokemonsName(searchQuery);
  });

  searchPokemon(async (searchQuery) => {
    const pokemon = await getPokemon(searchQuery);
    const species = await getPokemonSpecies(pokemon.species.name);
    const sprite = await getPokemonSprite(searchQuery, "other/official-artwork/");
    const pokemonData = await getPokemonData(pokemon, species, sprite);

    displayPokemonCardModal(pokemonData);
  });
}
