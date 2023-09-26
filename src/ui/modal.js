export function setupPokemonModal(pokemon, species, handleClickedPokemon) {
  handleClickedPokemon((clickedPokemon) => {
    createPokemonModal(pokemon, species, clickedPokemon);
    displayModal("#pokemon-modal");
  });
}

function createPokemonModal(pokemon, species, clickedPokemon) {
  pokemon(clickedPokemon).then((data) => {
    console.log(data);
    console.log(data.name);
    console.log(data.stats[0].base_stat);
    console.log(data.types[0].type.name);
    console.log(data.sprites.other["official-artwork"].front_default);
    console.log(data.height);
    console.log(data.weight);
    console.log(data.abilities[0].ability.name);
    console.log(data.abilities[1].ability.name);
    console.log(data.stats[1].base_stat);
    console.log(data.stats[2].base_stat);
    console.log(data.stats[5].base_stat);
    console.log(data.stats[3].base_stat);
    console.log(data.stats[4].base_stat);
    console.log(data.types[0].type.name);
    console.log(data.id);
  });

  species(clickedPokemon).then((data) => {
    console.log(data);
    console.log(data.evolves_from_species.name);
    console.log(data.flavor_text_entries[0].flavor_text);
    console.log(data.genera[7].genus);
  });
}

function displayModal(modal) {
  const $modal = document.querySelector(modal);
  const modalInstance = new bootstrap.Modal($modal);
  modalInstance.show();
}
