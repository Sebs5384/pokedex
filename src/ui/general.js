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

export function handleClickedPokemon(clicked, selector) {
  const $pokemon = document.querySelector(selector);
  $pokemon.onclick = (event) => {
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

export function changeCaughtPokemonText(pokemonData) {
  const name = pokemonData.name.toUpperCase();
  const $caughtPokemonTopText = document.querySelector("#caught-pokemon-top-text");
  const $caughtPokemonBottomText = document.querySelector("#caught-pokemon-bottom-text");

  $caughtPokemonTopText.innerText = "Gotcha !";
  $caughtPokemonBottomText.innerText = `${name} was caught`;

  setTimeout(() => {
    $caughtPokemonTopText.innerText = "";
    $caughtPokemonBottomText.innerText = "";

    $caughtPokemonTopText.classList.remove("typewriter-effect");
    $caughtPokemonBottomText.classList.remove("typewriter-effect-delayed");

    setTimeout(() => {
      $caughtPokemonTopText.classList.add("typewriter-effect");
      $caughtPokemonBottomText.classList.add("typewriter-effect-delayed");

      $caughtPokemonTopText.innerText = `${name}'S data was`;
      $caughtPokemonBottomText.innerText = "added to the POKéDEX";
    }, 500);
  }, 2500);
}

export function setCaughtPokemonSlot(pokemonId, pokemonSprite) {
  const pokemonSlots = document.querySelectorAll("#caught-pokemon-container img");

  for (let i = 0; i < pokemonSlots.length; i++) {
    const slot = pokemonSlots[i];

    if (!slot.dataset.id) {
      slot.dataset.id = pokemonId;
      slot.src = pokemonSprite;
      slot.style = "background-image: url('')";
      slot.onerror = () => (slot.src = "img/misc/404-shocked.png");
      return;
    }
  }
}
