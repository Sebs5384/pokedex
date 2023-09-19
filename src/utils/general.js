function calculatePaginationValues(TOTAL_ITEMS, ITEMS_PER_PAGE, PAGE_INDEX) {
  const TOTAL_PAGES = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE + 1);
  const CURRENT_PAGE = PAGE_INDEX / ITEMS_PER_PAGE + 1;

  return { TOTAL_PAGES, CURRENT_PAGE };
}

export { calculatePaginationValues as pokedexPaginationValues };
