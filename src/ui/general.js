export function displayLoadingMessage() {
  const $container = document.querySelector("#cards-container");

  $container.innerHTML = "";

  const $spinnerContainer = document.createElement("div");
  const $spinner = document.createElement("span");
  const $loadingMessage = document.createElement("div");

  $spinnerContainer.className = "spinner-border text-danger";
  $spinnerContainer.role = "status";
  $spinnerContainer.style = "width: 6rem; height: 6rem;";
  $spinner.className = "visually-hidden";
  $loadingMessage.textContent = "Loading Pokemons...";

  $spinnerContainer.appendChild($spinner);
  $container.appendChild($spinnerContainer);
  $container.appendChild($loadingMessage);
}

export function handleClickedPokemon(clicked) {
  const $cards = document.querySelector("#cards-container");
  $cards.onclick = (event) => {
    const pokemonId = event.target.dataset.id;

    if (pokemonId === undefined) return;

    clicked(pokemonId);
  };
}

export function handlePokeballButton(clicked) {
  const $pokeballButton = document.querySelector("#catch-pokemon-button");

  $pokeballButton.onclick = () => {
    $pokeballButton.disabled = true;
    $pokeballButton.classList.add("poke-shake");
    setTimeout(() => {
      $pokeballButton.classList.remove("poke-shake");
    }, 3000);

    setTimeout(() => {
      $pokeballButton.disabled = false;
    }, 20000);

    clicked();
  };
}

export function changeCaughtPokemonText(pokemonName) {
  const $caughtPokemonTopText = document.querySelector("#caught-pokemon-top-text");
  const $caughtPokemonBottomText = document.querySelector("#caught-pokemon-bottom-text");
  $caughtPokemonTopText.innerText = "Gotcha !";
  $caughtPokemonBottomText.innerText = `${pokemonName.toUpperCase()} was caught`;

  setTimeout(() => {
    $caughtPokemonTopText.innerText = "";
    $caughtPokemonBottomText.innerText = "";

    $caughtPokemonTopText.classList.remove("typewriter-effect");
    $caughtPokemonBottomText.classList.remove("typewriter-effect-delayed");

    setTimeout(() => {
      $caughtPokemonTopText.classList.add("typewriter-effect");
      $caughtPokemonTopText.innerText = `${pokemonName.toUpperCase()}'S data was`;

      $caughtPokemonBottomText.classList.add("typewriter-effect-delayed");
      $caughtPokemonBottomText.innerText = "added to the POKéDEX";
    }, 500);
  }, 2500);
}
