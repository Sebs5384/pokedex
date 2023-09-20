export function displayPokemonCards(pokemons, ids, sprites) {
  createCards(pokemons, ids, sprites);
}

function createCards(pokemons, ids, sprites) {
  const $container = document.querySelector("#cards-container");

  $container.innerHTML = "";
  pokemons.forEach((pokemon, index) => {
    const id = ids[index];
    const sprite = sprites[index];
    const $card = document.createElement("div");
    const $sprite = document.createElement("img");
    const $name = document.createElement("strong");

    $card.className = "card col-2 card-border";
    $sprite.className = "card-img-top";
    $name.className = "card-body text-center";

    $sprite.src = sprite;
    $name.textContent = `#${id} - ${pokemon}`;
    $card.appendChild($sprite);
    $card.appendChild($name);
    $container.appendChild($card);
  });
}
