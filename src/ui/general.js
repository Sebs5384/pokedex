export function displayLoadingMessage() {
  const $container = document.querySelector("#cards-container");

  $container.innerHTML = "";

  const $spinnerContainer = document.createElement("div");
  const $spinner = document.createElement("span");
  const $loadingMessage = document.createElement("div");

  $spinnerContainer.className = "spinner-border text-danger";
  $spinnerContainer.dataset.cy = "spinner";
  $spinnerContainer.role = "status";
  $spinnerContainer.style = "width: 6rem; height: 6rem;";
  $spinner.className = "visually-hidden";
  $loadingMessage.textContent = "Loading Pokemons...";

  $spinnerContainer.appendChild($spinner);
  $container.appendChild($spinnerContainer);
  $container.appendChild($loadingMessage);
}

export function handleClickedPokemon(clicked) {
  const $pokemons = document.querySelector("body");
  $pokemons.onclick = (event) => {
    const pokemonId = event.target.dataset.id;

    if (pokemonId === undefined) return;

    clicked(pokemonId);
  };
}
