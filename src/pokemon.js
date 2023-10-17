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

  const pokemons = await getPokemonsData(getPokemons, POKEMONS_PER_PAGE, pageIndex);
  setupPagination(POKEMONS_PER_PAGE, pageIndex, pokemons, getPageData, updatePokedexPage, validatePageSearchBox);
  displayPokemonCards(pokemons, getPokemonSprite);
}

export async function setupPokemonModal() {
  const clickedPokemon = await handleClickedPokemon();
  const pokemonData = await getPokemonData(getPokemon, getPokemonSpecies, getPokemonSprite, clickedPokemon);

  displayPokemonCardModal(pokemonData);
}

export async function setupNavigationBar(limit, offset) {
  const pokemons = await getPokemonsData(getPokemons, limit, offset);
  createPokemonList(pokemons);

  const totalPokemons = await handlePokeballButton();
  const caughtPokemon = catchPokemon(totalPokemons);

  const pokemonData = await getPokemonData(getPokemon, getPokemonSpecies, getPokemonSprite, caughtPokemon);
  displayCaughtPokemonModal(pokemonData, changeCaughtPokemonText);
  displayPokedexRegistrationModal(pokemonData);
  setCaughtPokemonSlot(pokemonData);

  handleSearchInput((searchQuery) => {
    filterPokemonsName(searchQuery);
  });

  searchPokemon((searchQuery) => {
    getPokemonData(getPokemon, getPokemonSpecies, getPokemonSprite, searchQuery).then((pokemonData) => {
      displayPokemonCardModal(pokemonData);
    });
  });
}
