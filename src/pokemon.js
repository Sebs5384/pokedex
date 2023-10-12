import { getPokemons, getPokemon, getPokemonSprite, getPokemonSpecies } from "./api/pokemon.js";
import { setupPagination } from "./ui/pagination.js";
import { displayPokemonCardModal, displayCaughtPokemonModal, displayPokedexRegistrationModal } from "./ui/modal.js";
import { displayPokemonCards } from "./ui/cards.js";
import { handlePokemonSearch } from "./ui/search-box.js";
import { handlePokeballButton, changeCaughtPokemonText, setCaughtPokemonSlot } from "./ui/catch-pokemon.js";
import { displayLoadingMessage, handleClickedPokemon } from "./ui/general.js";
import { getPageData, getPokemonData, getCaughtPokemonData, getPokemonsData } from "./utils/pokemon.js";
import { validatePageSearchBox } from "./utils/validation.js";

export function updatePokedexPage(POKEMONS_PER_PAGE, pageIndex) {
  displayLoadingMessage();
  getPageData(getPokemons, getPokemonSprite, POKEMONS_PER_PAGE, pageIndex).then((pageData) => {
    setupPagination(POKEMONS_PER_PAGE, pageIndex, pageData, updatePokedexPage, validatePageSearchBox);
    displayPokemonCards(pageData);
  });
}

export function setupPokemonModal() {
  handleClickedPokemon("#cards-container", (clickedPokemon) => {
    getPokemonData(getPokemon, getPokemonSpecies, getPokemonSprite, clickedPokemon).then((pokemonData) => {
      displayPokemonCardModal(pokemonData);
    });
  });
}

export function setupCatchPokemon(limit, offset) {
  handlePokeballButton(() => {
    getCaughtPokemonData(getPokemons, getPokemon, getPokemonSpecies, getPokemonSprite, limit, offset).then((caughtPokemonData) => {
      displayCaughtPokemonModal(caughtPokemonData, changeCaughtPokemonText);
      displayPokedexRegistrationModal(caughtPokemonData);
      setCaughtPokemonSlot(caughtPokemonData);
    });
  });

  handleClickedPokemon("#caught-pokemon-container", (clickedPokemon) => {
    getPokemonData(getPokemon, getPokemonSpecies, getPokemonSprite, clickedPokemon).then((pokemonData) => {
      displayPokemonCardModal(pokemonData);
    });
  });
}

export function setupPokedexSearchBox(limit, offset) {
  handlePokemonSearch((search) => {
    getPokemonData(getPokemons, getPokemonSpecies, search).then((pokemonData) => {
      const pokemonId = pokemonData.id;
      const pokemonSprite = getPokemonSprite(pokemonId);

      displayPokemonCardModal(pokemonData, pokemonSprite);
    });
  });
}
