export function displayPokemonCards(pageData) {
  const { pokemonNames, pokemonIds, pokemonSprites } = pageData;
  createCards(pokemonNames, pokemonIds, pokemonSprites);
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
    $card.style.backgroundImage = 'url("img/misc/pokeball.png")';

    $name.className = "card-body text-center";
    $name.textContent = `#${id > 1017 ? id - 8983 : id}  ${pokemon}`;
    $name.style = "font-size: 13px";

    $sprite.className = "card-img-top pokemon-sprite";
    $sprite.src = sprite;
    $sprite.dataset.id = id;
    $sprite.onerror = () => ($sprite.src = "img/misc/404-shocked.png");

    $card.appendChild($name);
    $card.appendChild($sprite);
    $container.appendChild($card);
  });
}
