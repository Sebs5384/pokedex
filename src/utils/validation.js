export function validatePageSearchBox(page, totalPages) {
  if (/^$/.test(page)) return "This field cannot be empty";
  if (!/^[^A-Z-a-z]+$/.test(page)) return "Only numeric characters are allowed";
  if (page > totalPages) return `Page Nº${page} does not exist, only ${totalPages - 1} out there`;

  return true;
}
