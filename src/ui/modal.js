export function setupPokemonModal(pokemon) {
  const $cards = document.querySelector("#cards-container");

  $cards.onclick = (event) => {
    const clickedPokemon = event.target.dataset.id;

    if (clickedPokemon === undefined) return;

    pokemon(clickedPokemon).then((data) => {
      console.log(data);
      const modal = document.querySelector("#pokemon-modal");
      const modalInstance = new bootstrap.Modal(modal);
      modalInstance.show();
    });
  };
}
