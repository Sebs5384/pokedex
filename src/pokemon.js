import { getPokemons, getPokemon, getPokemonSprite, getPokemonSpecies } from "./api/pokemon.js";
import { setupPagination } from "./ui/pagination.js";
import { displayPokemonCardModal, displayCaughtPokemonModal, displayPokedexRegistrationModal } from "./ui/modal.js";
import { displayPokemonCards } from "./ui/cards.js";
import { handleSearchBoxClick, createPokemonList, handleSearchInput, filterPokemonsName } from "./ui/search-box.js";
import { handlePokeballButton, changeCaughtPokemonText, setCaughtPokemonSlot } from "./ui/catch-pokemon.js";
import { displayLoadingMessage, handleClickedPokemon } from "./ui/general.js";
import { getPageData, getPokemonData, getCaughtPokemonData, getPokemonsData } from "./utils/pokemon.js";
import { validatePageSearchBox } from "./utils/validation.js";

export function updatePokedexPage(POKEMONS_PER_PAGE, pageIndex) {
  displayLoadingMessage();
  getPageData(getPokemons, POKEMONS_PER_PAGE, pageIndex).then((pageData) => {
    const { pokemonNames, pokemonIds, totalPages, currentPage } = pageData;
    const pokemonSprites = pokemonIds.map((id) => getPokemonSprite(id, "other/official-artwork/"));

    setupPagination(POKEMONS_PER_PAGE, pageIndex, totalPages, currentPage, updatePokedexPage, validatePageSearchBox);
    displayPokemonCards(pokemonNames, pokemonIds, pokemonSprites);
  });
}

export function setupPokemonModal() {
  handleClickedPokemon("#cards-container", (clickedPokemon) => {
    getPokemonData(getPokemon, getPokemonSpecies, clickedPokemon).then((pokemonData) => {
      const pokemonId = clickedPokemon;
      const pokemonSprite = getPokemonSprite(pokemonId, "other/official-artwork/");

      displayPokemonCardModal(pokemonData, pokemonSprite);
    });
  });
}

export function setupCatchPokemon(limit, offset) {
  handlePokeballButton(() => {
    getCaughtPokemonData(getPokemons, getPokemon, getPokemonSpecies, limit, offset).then((caughtPokemonData) => {
      const pokemonId = caughtPokemonData.id;
      const pokemonSprite = getPokemonSprite(pokemonId);

      displayCaughtPokemonModal(caughtPokemonData, changeCaughtPokemonText);
      displayPokedexRegistrationModal(caughtPokemonData, pokemonSprite);
      setCaughtPokemonSlot(pokemonId, pokemonSprite);
    });
  });

  handleClickedPokemon("#caught-pokemon-container", (clickedPokemon) => {
    getPokemonData(getPokemon, getPokemonSpecies, clickedPokemon).then((pokemonData) => {
      const pokemonId = clickedPokemon;
      const pokemonSprite = getPokemonSprite(pokemonId, "other/official-artwork/");

      displayPokemonCardModal(pokemonData, pokemonSprite);
    });
  });
}

export function setupPokedexSearchBox(limit, offset) {
  handleSearchBoxClick(() => {
    getPokemonsData(getPokemons, limit, offset).then((pokemons) => {
      const { names, ids } = pokemons;
      createPokemonList(names, ids);
    });
  });

  handleSearchInput(filterPokemonsName, (query) => {
    getPokemonData(getPokemon, getPokemonSpecies, query).then((pokemonData) => {
      const pokemonId = query;
      const pokemonSprite = getPokemonSprite(pokemonId, "other/official-artwork/");
      displayPokemonCardModal(pokemonData, pokemonSprite);
    });
  });

  handleClickedPokemon("#pokedex-search-list", (clickedPokemon) => {
    getPokemonData(getPokemon, getPokemonSpecies, clickedPokemon).then((pokemonData) => {
      const pokemonId = clickedPokemon;
      const pokemonSprite = getPokemonSprite(pokemonId, "other/official-artwork/");
      displayPokemonCardModal(pokemonData, pokemonSprite);
    });
  });
}
