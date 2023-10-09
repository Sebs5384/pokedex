import { getPokemons, getPokemon, getPokemonSprite, getPokemonSpecies } from "./api/pokemon.js";
import { setupPagination } from "./ui/pagination.js";
import { displayPokemonCardModal, displayCaughtPokemonModal, displayPokedexRegistrationModal } from "./ui/modal.js";
import { displayPokemonCards } from "./ui/cards.js";
import { displayLoadingMessage, handleClickedPokemon, handlePokeballButton, changeCaughtPokemonText } from "./ui/general.js";
import { getPageData, getPokemonData, getCaughtPokemonData } from "./utils/pokemon.js";
import { validatePageSearchBox } from "./utils/validation.js";

export function updatePokedexPage(POKEMONS_PER_PAGE = 20, pageIndex = 0) {
  displayLoadingMessage();

  getPageData(getPokemons, POKEMONS_PER_PAGE, pageIndex).then((pageData) => {
    const { pokemonNames, pokemonIds, totalPages, currentPage } = pageData;
    const pokemonSprites = pokemonIds.map((id) => getPokemonSprite(id));

    setupPagination(POKEMONS_PER_PAGE, pageIndex, totalPages, currentPage, updatePokedexPage, validatePageSearchBox);
    displayPokemonCards(pokemonNames, pokemonIds, pokemonSprites);
  });
}

export function setupPokemonModal() {
  handleClickedPokemon((clickedPokemon) => {
    getPokemonData(getPokemon, getPokemonSpecies, clickedPokemon).then((pokemonData) => {
      const pokemonSprite = getPokemonSprite(clickedPokemon);

      displayPokemonCardModal(pokemonData, pokemonSprite);
    });
  });
}

export function setupCatchPokemon() {
  handlePokeballButton(() => {
    getCaughtPokemonData(getPokemons, getPokemon, getPokemonSpecies, 100000, 0).then((caughtPokemonData) => {
      displayCaughtPokemonModal(caughtPokemonData, changeCaughtPokemonText);
      displayPokedexRegistrationModal(caughtPokemonData);
    });
  });
}
