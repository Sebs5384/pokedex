export function calculatePaginationValues(totalItems, pageIndex, itemsPerPage) {
  const totalPages = Math.ceil(totalItems / itemsPerPage + 1);
  const currentPage = pageIndex / itemsPerPage + 1;

  return { totalPages, currentPage };
}

export function getPokemonNames(list) {
  return list.map((item) => item.name);
}

export function getPokemonIds(list) {
  return list.map((item) => item.url.split("/")[6]);
}
