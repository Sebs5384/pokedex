export function setupPagination(POKEMONS_PER_PAGE, pageIndex, pageData, setNewPage, pageValidation) {
  const { totalPages, currentPage } = pageData;

  createPaginator(totalPages);
  displayCurrentPagination(currentPage, totalPages);
  handlePaginationChanges(POKEMONS_PER_PAGE, pageIndex, currentPage, setNewPage);
  handlePaginationSearch(POKEMONS_PER_PAGE, totalPages, setNewPage, pageValidation);
}

function displayCurrentPagination(currentPage, totalPages) {
  const $pages = document.querySelectorAll(".paginator-page");
  const $navigationButtons = document.querySelectorAll(".paginator-button");
  const $previousButton = $navigationButtons[0];
  const $nextButton = $navigationButtons[1];

  currentPage === 1 ? $previousButton.classList.add("disabled") : $previousButton.classList.remove("disabled");
  currentPage === totalPages - 1 ? $nextButton.classList.add("disabled") : $nextButton.classList.remove("disabled");

  $pages.forEach((page, index) => {
    const pageIndex = index + 1;

    pageIndex >= currentPage - 1 && pageIndex <= currentPage + 3 ? page.classList.remove("hidden") : page.classList.add("hidden");
  });
}

function handlePaginationChanges(POKEMONS_PER_PAGE, pageIndex, currentPage, setNewPage) {
  const $buttons = document.querySelector("#paginator-container");
  let nextPageIndex = POKEMONS_PER_PAGE;
  let previousPageIndex = pageIndex;

  $buttons.onclick = (event) => {
    event.preventDefault();
    const $clickedButton = event.target;

    if ($clickedButton.classList.contains("paginator-page")) {
      const currentPage = Number($clickedButton.innerText);
      const pageIndex = (currentPage - 1) * POKEMONS_PER_PAGE;

      setNewPage(POKEMONS_PER_PAGE, pageIndex);
    } else if ($clickedButton.classList.contains("paginator-button")) {
      nextPageIndex = currentPage * POKEMONS_PER_PAGE;
      previousPageIndex = (currentPage - 2) * POKEMONS_PER_PAGE;

      $clickedButton.innerText === "Previous" ? setNewPage(POKEMONS_PER_PAGE, previousPageIndex) : setNewPage(POKEMONS_PER_PAGE, nextPageIndex);
    }
  };
}

function handlePaginationSearch(POKEMONS_PER_PAGE, totalPages, setNewPage, pageValidation) {
  const $pageSearcher = document.querySelector("#search-page-input");

  $pageSearcher.onkeydown = (searcher) => {
    const selectedPage = $pageSearcher.value;
    const pageIndex = (selectedPage - 1) * POKEMONS_PER_PAGE;

    if (searcher.key === "Enter") {
      const isSuccessful = pageValidation(selectedPage, totalPages);
      isSuccessful === true ? setNewPage(POKEMONS_PER_PAGE, pageIndex) : handleErrorPopUp(isSuccessful);
    }
  };
}

function createPaginator(totalPages) {
  const $pageContainer = document.querySelector("#paginator-container");

  if ($pageContainer.innerHTML !== "") return;

  for (let i = 0; i <= totalPages; i++) {
    const $item = document.createElement("li");
    const $page = document.createElement("a");

    $item.className = "page-item";
    $page.className = "page-link card-border paginator-text";
    $page.href = "#";

    $page.textContent = i === 0 ? "Previous" : i === totalPages ? "Next" : i;
    i !== 0 && i !== totalPages ? $page.classList.add("paginator-page") : $page.classList.add("paginator-button");

    $item.appendChild($page);
    $pageContainer.appendChild($item);
  }
}

function handleErrorPopUp(message) {
  const $paginatorSearchBox = document.querySelector("#search-page-input");

  const $popover = new bootstrap.Popover($paginatorSearchBox, {
    container: "body",
    html: true,
    content: message,
  });

  $popover.show();

  setTimeout(() => {
    $popover.dispose();
  }, 3000);
}
