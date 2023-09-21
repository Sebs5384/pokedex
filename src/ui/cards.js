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
    $card.style.backgroundImage = 'url("img/pokeball.png"';
    $name.className = "card-body text-center";
    $name.style = "font-size: 13px";
    $name.textContent = `#${id}  ${pokemon}`;

    $sprite.className = "card-img-top";
    $sprite.src = sprite;
    $sprite.onerror = () => ($sprite.src = "img/404-shocked.png");

    $card.appendChild($name);
    $card.appendChild($sprite);
    $container.appendChild($card);
  });
}
