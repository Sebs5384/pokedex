export default function validatePageSearchBox(page, totalPages) {
  if (/^$/.test(page)) return 'This field cannot be empty';
  if (!/^[^A-Z-a-z]+$/.test(page)) return 'Only numeric characters are allowed';
  if (page > totalPages - 1) return `Page Nº${page} does not exist, only ${totalPages - 1} out there`;
  if (page === '0') return "There's no such thing as page 0, go catch a pokemon instead !";

  return true;
}
