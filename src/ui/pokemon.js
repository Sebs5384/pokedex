import { updatePagination } from "./pagination.js";

export function setupPokedex() {
  const limit = 20;
  const offset = 0;

  updatePagination(limit, offset);
}
