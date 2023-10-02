import { getPokemons, getPokemon, getPokemonSprite, getPokemonSpecies } from "./api/pokemon.js";
import { setupPagination } from "./ui/pagination.js";
import { createPokemonModal, changeModalTexture, showModal } from "./ui/modal.js";
import { displayPokemonCards } from "./ui/cards.js";
import { displayLoadingMessage, handleClickedPokemon } from "./ui/general.js";
import { getPageData, getPokemonData } from "./utils/pokemon.js";

export function updatePokedexPage(POKEMONS_PER_PAGE = 20, pageIndex = 0) {
  displayLoadingMessage();

  getPageData(getPokemons, POKEMONS_PER_PAGE, pageIndex).then((pageData) => {
    const { pokemonNames, pokemonIds, totalPages, currentPage } = pageData;
    const pokemonSprites = pokemonIds.map((id) => getPokemonSprite(id));

    setupPagination(POKEMONS_PER_PAGE, pageIndex, totalPages, currentPage, updatePokedexPage);
    displayPokemonCards(pokemonNames, pokemonIds, pokemonSprites);
  });
}

export function setupPokemonModal() {
  handleClickedPokemon((clickedPokemon) => {
    getPokemonData(getPokemon, getPokemonSpecies, clickedPokemon).then((pokemonData) => {
      const pokemonSprite = getPokemonSprite(clickedPokemon);

      createPokemonModal(pokemonData, pokemonSprite);
      changeModalTexture(pokemonData);
      showModal("#pokemon-modal");
    });
  });
}
