export function displayPokemonCards(pageData, pokemonSprite) {
  const { pokemonNames, pokemonIds } = pageData;
  const pokemonSprites = pokemonIds.map((id) => pokemonSprite(id, "other/official-artwork/"));

  createCards(pokemonNames, pokemonIds, pokemonSprites);
}

function createCards(pokemons, ids, sprites) {
  const $container = document.querySelector("#cards-container");
  const MAX_PREVIOUS_GEN_ID = 1017;
  const LOWEST_NEW_GEN_ID = 8983;

  $container.innerHTML = "";
  pokemons.forEach((pokemon, index) => {
    const id = ids[index];
    const sprite = sprites[index];
    const $card = document.createElement("div");
    const $sprite = document.createElement("img");
    const $name = document.createElement("strong");

    $card.className = "card col-3 col-md-2 col-lg-2 card-border pokemon-card";
    $card.style.backgroundImage = 'url("img/misc/pokeball.png")';

    $name.className = "card-body text-center";
    $name.textContent = `#${id > MAX_PREVIOUS_GEN_ID ? id - LOWEST_NEW_GEN_ID : id}  ${pokemon}`;

    $sprite.className = "card-img-top pokemon-sprite";
    $sprite.src = sprite;
    $sprite.dataset.id = id;
    $sprite.onerror = () => ($sprite.src = "img/misc/404-shocked.png");

    $card.appendChild($name);
    $card.appendChild($sprite);
    $container.appendChild($card);
  });
}
