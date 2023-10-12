export function createPokemonList(pokemons) {
  const { pokemonNames, pokemonIds } = pokemons;
  const $pokemonList = document.querySelector("#pokedex-search-list");

  pokemonNames.forEach((name, index) => {
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
  const $searchBox = document.querySelector("#pokedex-search-box input");

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

export function searchPokemon(search) {
  const $searchBox = document.querySelector("#pokedex-search-box input");

  $searchBox.onkeydown = (searcher) => {
    const pokemonQuery = $searchBox.value.toLowerCase();
    const $pokemonList = document.querySelectorAll("#pokedex-search-list li a");

    if (searcher.key === "Enter") {
      searcher.preventDefault();

      $pokemonList.forEach((pokemon) => {
        const pokemonName = pokemon.textContent.toLowerCase();

        if (pokemonName === pokemonQuery) {
          const pokemonId = pokemon.dataset.id;

          search(pokemonId);
        }
      });
    }
  };
}
