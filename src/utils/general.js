export function calculatePaginationValues(totalItems, pageIndex, itemsPerPage) {
  const totalPages = Math.ceil(totalItems / itemsPerPage + 1);
  const currentPage = pageIndex / itemsPerPage + 1;

  return { totalPages, currentPage };
}

export function getPokemonNames(list) {
  return list.map((item) => firstLetterToUpperCase(item.name));
}

export function getPokemonIds(list) {
  return list.map((item) => item.url.split("/")[6]);
}

function firstLetterToUpperCase(string) {
  return string
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("-");
}
