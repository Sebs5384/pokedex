/* eslint-disable */
/// <reference types='Jest' />

import { BASE_URL, getPokemon, getPokemons, getPokemonSpecies, getPokemonSprite } from '../pokemon';

beforeEach(() => {
  global.fetch = jest.fn();
});

test('Gets a pokemon by using its id ', () => {
  const blastoiseId = 9;

  global.fetch.mockImplementationOnce(
    () =>
      new Promise((resolve) => {
        const jsonPromise = new Promise((response) => {
          response({});
        });
        resolve({ json: () => jsonPromise });
      })
  );

  getPokemon(blastoiseId);
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/pokemon/${blastoiseId}`);
});

test('Gets a pokemon by using an undefined id', () => {
  expect(getPokemon()).rejects.toEqual(new Error('Invalid pokemon id: undefined'));

  expect(global.fetch).toHaveBeenCalledTimes(0);
});

test('Gets a pokemon with an incorrect id', () => {
  global.fetch.mockRejectedValueOnce(new Error('Fetch error'));
  expect(getPokemon('1230120301230')).rejects.toThrowError(new Error('An error occurred while fetching pokemon with id: 1230120301230 Error: Fetch error'));

  expect(global.fetch).toHaveBeenCalledTimes(1);
});

test('Gets a list of pokemons by using a limit of 20 and an offset of 0', () => {
  const POKEMONS_PER_PAGE = 20;
  const POKEMON_OFFSET = 0;

  global.fetch.mockImplementationOnce(
    () =>
      new Promise((resolve) => {
        const jsonPromise = new Promise((response) => {
          response({});
        });
        resolve({ json: () => jsonPromise });
      })
  );

  getPokemons(20, 0);
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/pokemon/?limit=${POKEMONS_PER_PAGE}&offset=${POKEMON_OFFSET}`);
});

test('Gets a list of pokemons by using an undefined limit and offset', () => {
  expect(getPokemons()).rejects.toEqual(new Error('Limit and offset must be defined'));

  expect(global.fetch).toHaveBeenCalledTimes(0);
});

test('Gets a list of pokemons by using an incorrect limit and offset', () => {
  global.fetch.mockRejectedValueOnce(new Error('Fetch error'));
  expect(getPokemons('blastoise', 'wartortle')).rejects.toThrowError(new Error('An error occurred while fetching pokemons with limit: blastoise offset: wartortle Error: Fetch error'));

  expect(global.fetch).toHaveBeenCalledTimes(1);
});

test('Gets a pokemon species by using its name', () => {
  global.fetch.mockImplementationOnce(
    () =>
      new Promise((resolve) => {
        const jsonPromise = new Promise((response) => {
          response({});
        });
        resolve({ json: () => jsonPromise });
      })
  );

  getPokemonSpecies('blastoise');
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/pokemon-species/blastoise`);
});

test('Gets a pokemon species by using an undefined name', () => {
  expect(getPokemonSpecies()).rejects.toEqual(new Error('Invalid pokemon species, species name must be defined'));

  expect(global.fetch).toHaveBeenCalledTimes(0);
});

test('Gets a pokemon species by using an incorrect name', () => {
  global.fetch.mockRejectedValueOnce(new Error('Fetch error'));

  expect(getPokemonSpecies('lastoise')).rejects.toThrowError(new Error('An error occurred while fetching pokemon with species-name: lastoise Error: Fetch error'));
  expect(global.fetch).toHaveBeenCalledTimes(1);
});

test('Gets a pokemon sprite by using its id', () => {
  const blastoiseId = 9;
  const blastoiseSpriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${blastoiseId}.png`;

  expect(getPokemonSprite(blastoiseId)).toEqual(blastoiseSpriteUrl);
});

test('Gets a pokemon sprite by using its id and an alternative artwork', () => {
  const blastoiseId = 9;
  const artwork = 'other/official-artwork/';
  const blastoiseSpriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${artwork}${blastoiseId}.png`;

  expect(getPokemonSprite(blastoiseId, artwork)).toEqual(blastoiseSpriteUrl);
});

test('Gets a pokemon sprite by using an undefined id', () => {
  const undefinedPokemonId = undefined;

  expect(() => getPokemonSprite(undefinedPokemonId)).toThrow(new Error(`Invalid pokemon id: undefined`));
});
