export async function displayPokemonCards(pageData, sprites) {
  const { pokemonNames, pokemonIds } = pageData;

  await createCards(pokemonNames, pokemonIds);
  await loadCardsSprite(sprites);
  await loadCardBackground();
}

async function createCards(pokemons, ids) {
  const $container = document.querySelector("#cards-container");
  const MAX_PREVIOUS_GEN_ID = 1017;
  const LOWEST_NEW_GEN_ID = 8983;

  $container.innerHTML = "";
  pokemons.forEach((pokemon, index) => {
    const id = ids[index];
    const $card = document.createElement("div");
    const $sprite = document.createElement("img");
    const $name = document.createElement("strong");

    $card.className = "card col-3 col-md-2 col-lg-2 pokemon-card";

    $name.className = "card-body text-center pokemon-emerald-font";
    $name.textContent = `#${id > MAX_PREVIOUS_GEN_ID ? id - LOWEST_NEW_GEN_ID : id}  ${pokemon}`;

    $sprite.className = "card-img-top pokemon-sprite";
    $sprite.dataset.cy = `${pokemon}-card`;
    $sprite.dataset.id = id;

    $card.appendChild($name);
    $card.appendChild($sprite);
    $container.appendChild($card);
  });
}

async function loadCardBackground() {
  const $cards = document.querySelectorAll(".pokemon-card");

  return await new Promise((resolve) => {
    const backgroundImg = new Image();
    backgroundImg.src = "img/misc/pokeball.png";

    backgroundImg.onload = () => {
      $cards.forEach(($card) => {
        $card.style.backgroundImage = `url(${backgroundImg.src})`;
      });
      resolve();
    };
  });
}

async function loadCardsSprite(sprites) {
  const $cardsImage = document.querySelectorAll(".pokemon-card img");

  return await new Promise((resolve) => {
    sprites.forEach((sprite, index) => {
      const cardSprite = new Image();
      cardSprite.src = sprite;

      cardSprite.onload = () => {
        $cardsImage[index].src = sprite;
      };

      cardSprite.onerror = () => {
        $cardsImage[index].src = "img/misc/404-shocked.png";
      };
    });

    resolve();
  });
}
