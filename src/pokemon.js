import { getPokemons, getPokemon, getPokemonSprite, getPokemonSpecies } from "./api/pokemon.js";
import { setupPagination } from "./ui/pagination.js";
import { displayPokemonCardModal, displayCaughtPokemonModal, displayPokedexRegistrationModal } from "./ui/modal.js";
import { displayPokemonCards } from "./ui/cards.js";
import { displayLoadingMessage, handleClickedPokemon, handlePokeballButton, changeCaughtPokemonText, setCaughtPokemonSlot } from "./ui/general.js";
import { getPageData, getPokemonData, getCaughtPokemonData } from "./utils/pokemon.js";
import { validatePageSearchBox } from "./utils/validation.js";

export function updatePokedexPage(POKEMONS_PER_PAGE = 20, pageIndex = 0) {
  displayLoadingMessage();

  getPageData(getPokemons, POKEMONS_PER_PAGE, pageIndex).then((pageData) => {
    const { pokemonNames, pokemonIds, totalPages, currentPage } = pageData;
    const pokemonSprites = pokemonIds.map((id) => getPokemonSprite(id, "other/official-artwork/"));

    setupPagination(POKEMONS_PER_PAGE, pageIndex, totalPages, currentPage, updatePokedexPage, validatePageSearchBox);
    displayPokemonCards(pokemonNames, pokemonIds, pokemonSprites);
  });
}

export function setupPokemonModal() {
  handleClickedPokemon((clickedPokemon) => {
    getPokemonData(getPokemon, getPokemonSpecies, clickedPokemon).then((pokemonData) => {
      const pokemonId = clickedPokemon;
      const pokemonSprite = getPokemonSprite(pokemonId, "other/official-artwork/");

      displayPokemonCardModal(pokemonData, pokemonSprite);
    });
  }, "#cards-container");
}

export function setupCatchPokemon() {
  handlePokeballButton(() => {
    getCaughtPokemonData(getPokemons, getPokemon, getPokemonSpecies, 100000, 0).then((caughtPokemonData) => {
      const pokemonId = caughtPokemonData.id;
      const pokemonSprite = getPokemonSprite(pokemonId);

      displayCaughtPokemonModal(caughtPokemonData, changeCaughtPokemonText);
      displayPokedexRegistrationModal(caughtPokemonData, pokemonSprite);
      setCaughtPokemonSlot(pokemonId, pokemonSprite);
    });
  });

  handleClickedPokemon((clickedPokemon) => {
    getPokemonData(getPokemon, getPokemonSpecies, clickedPokemon).then((pokemonData) => {
      const pokemonId = clickedPokemon;
      const pokemonSprite = getPokemonSprite(pokemonId, "other/official-artwork/");

      displayPokemonCardModal(pokemonData, pokemonSprite);
    });
  }, "#caught-pokemon-container");
}

export function setupPokedexSearchBox() {}
