import { updatePokedexPage, setupPokemonModal, setupCatchPokemon, setupPokedexSearchBox } from "./pokemon.js";

function initialize() {
  updatePokedexPage(20, 0);
  setupPokemonModal();
  setupCatchPokemon(100000, 0);
  setupPokedexSearchBox(100000, 0);
}

initialize();
