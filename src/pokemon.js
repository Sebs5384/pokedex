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

export function updatePokedexPage(POKEMONS_PER_PAGE, pageIndex) {
  displayLoadingMessage();

  getPokemonsData(getPokemons, POKEMONS_PER_PAGE, pageIndex).then((pokemons) => {
    setupPagination(POKEMONS_PER_PAGE, pageIndex, pokemons, getPageData, updatePokedexPage, validatePageSearchBox);
    displayPokemonCards(pokemons, getPokemonSprite);
  });
}

export function setupPokemonModal() {
  handleClickedPokemon((clickedPokemon) => {
    getPokemonData(getPokemon, getPokemonSpecies, getPokemonSprite, clickedPokemon).then((pokemonData) => {
      displayPokemonCardModal(pokemonData);
    });
  });
}

export function setupNavigationBar(limit, offset) {
  getPokemonsData(getPokemons, limit, offset).then((pokemons) => {
    createPokemonList(pokemons);
  });

  handlePokeballButton((pokemons) => {
    const caughtPokemon = catchPokemon(pokemons);

    getPokemonData(getPokemon, getPokemonSpecies, getPokemonSprite, caughtPokemon).then((pokemonData) => {
      displayCaughtPokemonModal(pokemonData, changeCaughtPokemonText);
      displayPokedexRegistrationModal(pokemonData);
      setCaughtPokemonSlot(pokemonData);
    });
  });

  handleSearchInput((searchQuery) => {
    filterPokemonsName(searchQuery);
  });

  searchPokemon((searchQuery) => {
    getPokemonData(getPokemon, getPokemonSpecies, getPokemonSprite, searchQuery).then((pokemonData) => {
      displayPokemonCardModal(pokemonData);
    });
  });
}
