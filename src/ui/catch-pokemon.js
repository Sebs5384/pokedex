export function handlePokeballButton(clicked) {
  const $pokeballButton = document.querySelector('#catch-pokemon-button');

  $pokeballButton.onclick = () => {
    $pokeballButton.disabled = true;
    $pokeballButton.classList.add('poke-shake');

    setTimeout(() => {
      $pokeballButton.classList.remove('poke-shake');
    }, 3000);

    setTimeout(() => {
      $pokeballButton.disabled = false;
    }, 20000);

    clicked();
  };
}

export function changeCaughtPokemonText(pokemonData) {
  const name = pokemonData.name.toUpperCase();
  const $caughtPokemonTopText = document.querySelector('#caught-pokemon-top-text');
  const $caughtPokemonBottomText = document.querySelector('#caught-pokemon-bottom-text');

  $caughtPokemonTopText.innerText = 'Gotcha !';
  $caughtPokemonBottomText.innerText = `${name} was caught`;

  setTimeout(() => {
    $caughtPokemonTopText.innerText = '';
    $caughtPokemonBottomText.innerText = '';

    $caughtPokemonTopText.classList.remove('typewriter-effect');
    $caughtPokemonBottomText.classList.remove('typewriter-effect-delayed');

    setTimeout(() => {
      $caughtPokemonTopText.classList.add('typewriter-effect');
      $caughtPokemonBottomText.classList.add('typewriter-effect-delayed');

      $caughtPokemonTopText.innerText = `${name}'S data was`;
      $caughtPokemonBottomText.innerText = 'added to the POKéDEX';
    }, 500);
  }, 2500);
}

export function setCaughtPokemonSlot(pokemonData) {
  const pokemonSlots = document.querySelectorAll('#caught-pokemon-container img');
  const { id, sprite } = pokemonData;

  for (let i = 0; i < pokemonSlots.length; i += 1) {
    const slot = pokemonSlots[i];

    if (!slot.dataset.id) {
      slot.dataset.id = id;
      slot.src = sprite;
      slot.style = 'background-image: url("");';
      slot.onerror = () => {
        slot.src = 'img/misc/404-shocked.png';
      };
      return;
    }
  }
}
