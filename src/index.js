import { updatePokedexPage, setupPokemonModal, setupNavigationBar } from './pokemon.js';

function initialize() {
  const MAX_LIMIT = 100000;
  const POKEMONS_PER_PAGE = 20;
  const OFFSET = 0;

  updatePokedexPage(POKEMONS_PER_PAGE, OFFSET);
  setupPokemonModal();
  setupNavigationBar(MAX_LIMIT, OFFSET);
}

initialize();
