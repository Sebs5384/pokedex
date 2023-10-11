export function handleSearchBoxClick(clicked) {
  const $searchBox = document.querySelector("#pokedex-search-box");
  const $pokemonList = document.querySelector("#pokedex-search-list");

  $searchBox.onclick = () => {
    if ($pokemonList.innerHTML !== "") return;

    clicked();
  };
}

export function createPokemonList(pokemons, pokemonIds) {
  const $pokemonList = document.querySelector("#pokedex-search-list");

  pokemons.forEach((name, index) => {
    const $list = document.createElement("li");
    const $item = document.createElement("a");

    $item.className = "dropdown-item";
    $item.textContent = `${name}`;
    $item.dataset.id = pokemonIds[index];

    $list.appendChild($item);
    $pokemonList.appendChild($list);
  });
}

export function handleSearchInput(search) {
  const $searchBox = document.querySelector("#pokedex-search-box");

  $searchBox.oninput = () => {
    const pokemonQuery = $searchBox.value.toLowerCase();

    search(pokemonQuery);
  };
}

export function filterPokemonsName(pokemonQuery) {
  const $pokemonList = document.querySelectorAll("#pokedex-search-list li a");

  $pokemonList.forEach((pokemon) => {
    const pokemonName = pokemon.textContent.toLowerCase();
    pokemon.style.display = pokemonName.includes(pokemonQuery) ? "block" : "none";
  });
}
