function displayCurrentPagination(currentPage, totalPages) {
  const $pages = document.querySelectorAll('.paginator-page');
  const $navigationButtons = document.querySelectorAll('.paginator-button');
  const $previousButton = $navigationButtons[0];
  const $nextButton = $navigationButtons[1];

  $previousButton.classList.add(currentPage === 1 ? 'disabled' : $previousButton.classList.remove('disabled'));
  $nextButton.classList.add(currentPage === totalPages - 1 ? 'disabled' : $nextButton.classList.remove('disabled'));

  $pages.forEach((page, index) => {
    const pageIndex = index + 1;
    page.classList.remove(pageIndex >= currentPage - 1 && pageIndex <= currentPage + 3 ? 'hidden' : page.classList.add('hidden'));
  });
}

function handlePaginationChanges(POKEMONS_PER_PAGE, pageIndex, currentPage, setNewPage) {
  const $buttons = document.querySelector('#paginator-container');
  let nextPageIndex = POKEMONS_PER_PAGE;
  let previousPageIndex = pageIndex;

  $buttons.onclick = (event) => {
    event.preventDefault();
    const $clickedButton = event.target;

    if ($clickedButton.classList.contains('paginator-page')) {
      const newCurrentPage = Number($clickedButton.innerText);
      const newPageIndex = (newCurrentPage - 1) * POKEMONS_PER_PAGE;

      setNewPage(POKEMONS_PER_PAGE, newPageIndex);
    } else if ($clickedButton.classList.contains('paginator-button')) {
      const clickedButton = $clickedButton.innerText;
      nextPageIndex = currentPage * POKEMONS_PER_PAGE;
      previousPageIndex = (currentPage - 2) * POKEMONS_PER_PAGE;

      if (clickedButton === 'Previous') {
        setNewPage(POKEMONS_PER_PAGE, previousPageIndex);
      } else {
        setNewPage(POKEMONS_PER_PAGE, nextPageIndex);
      }
    }
  };
}

function handleErrorPopUp(message) {
  const $paginatorSearchBox = document.querySelector('#search-page-input');

  // eslint-disable-next-line no-undef
  const $popover = new bootstrap.Popover($paginatorSearchBox, {
    container: 'body',
    html: true,
    content: message,
  });

  $popover.show();

  setTimeout(() => {
    $popover.dispose();
  }, 3000);
}

function handlePaginationSearch(POKEMONS_PER_PAGE, totalPages, setNewPage, pageValidation) {
  const $pageSearcher = document.querySelector('#search-page-input');

  $pageSearcher.onkeydown = (searcher) => {
    const selectedPage = $pageSearcher.value;
    const pageIndex = (selectedPage - 1) * POKEMONS_PER_PAGE;

    if (searcher.key === 'Enter') {
      const validPage = pageValidation(selectedPage, totalPages);
      if (validPage === true) {
        setNewPage(POKEMONS_PER_PAGE, pageIndex);
      } else {
        handleErrorPopUp(validPage);
      }
    }
  };
}

function createPaginator(totalPages) {
  const $pageContainer = document.querySelector('#paginator-container');

  if ($pageContainer.innerHTML !== '') return;

  for (let i = 0; i <= totalPages; i += 1) {
    const $item = document.createElement('li');
    const $page = document.createElement('a');

    $item.className = 'page-item';
    $page.className = 'page-link card-border paginator-text';
    $page.href = '#';

    if (i === 0) {
      $page.textContent = 'Previous';
      $page.dataset.cy = 'previous-page-button';
      $page.classList.add('paginator-button');
    } else if (i === totalPages) {
      $page.textContent = 'Next';
      $page.dataset.cy = 'next-page-button';
      $page.classList.add('paginator-button');
    } else {
      $page.textContent = i;
      $page.dataset.cy = `page-${i}`;
      $page.classList.add('paginator-page');
    }

    $item.appendChild($page);
    $pageContainer.appendChild($item);
  }
}

export default function setupPagination(POKEMONS_PER_PAGE, pageIndex, pageData, pokedexPageValues, setNewPage, pageValidation) {
  const { totalPages, currentPage } = pokedexPageValues(pageData, pageIndex, POKEMONS_PER_PAGE);

  createPaginator(totalPages);
  displayCurrentPagination(currentPage, totalPages);
  handlePaginationChanges(POKEMONS_PER_PAGE, pageIndex, currentPage, setNewPage);
  handlePaginationSearch(POKEMONS_PER_PAGE, totalPages, setNewPage, pageValidation);
}
