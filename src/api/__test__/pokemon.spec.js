/// <reference types="Jest" />

import { BASE_URL, getPokemon, getPokemons, getPokemonSpecies, getPokemonSprite } from '../pokemon';

beforeEach(() => {
  global.fetch = jest.fn();
});

test('Gets one pokemon', () => {
  global.fetch.mockImplementationOnce(
    () =>
      new Promise((resolve) => {
        const jsonPromise = new Promise((response) => {
          response({});
        });
        resolve({ json: () => jsonPromise });
      })
  );

  getPokemon(1);
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/pokemon/1`);
});
