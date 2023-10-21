/* eslint-disable no-undef */
describe('Pokedex testing', () => {
  const localhost = 'http://127.0.0.1:8080/';
  const firstPage = 'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0';
  const secondPage = 'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20';
  const lastPage = 'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=1280';
  const pokemonListURL = 'https://pokeapi.co/api/v2/pokemon/?limit=100000&offset=0';
  const blastoiseURL = 'https://pokeapi.co/api/v2/pokemon/9';
  const blastoiseSpeciesURL = 'https://pokeapi.co/api/v2/pokemon-species/blastoise';
  const POKEMONS_PER_PAGE = 20;

  beforeEach(() => {
    cy.visit(localhost);

    cy.intercept('GET', firstPage, {
      fixture: 'pokedexFirstPage',
    }).as('getFirstPage');

    cy.intercept('GET', pokemonListURL, {
      fixture: 'pokemonList',
    }).as('getAllPokemons');
  });

  it('Should load the first page cards', () => {
    cy.get("[data-cy='pokemon-cards-container']").children().should('have.length', POKEMONS_PER_PAGE);
    cy.get("[data-cy='previous-page-button']").should('have.class', 'disabled');
    cy.get("[data-cy='next-page-button']").should('have.not.class', 'disabled');

    cy.get("[data-cy='page-1']").should('be.visible');
    cy.get("[data-cy='page-2']").should('be.visible');
    cy.get("[data-cy='page-3']").should('be.visible');
    cy.get("[data-cy='page-4']").should('be.visible');
  });

  it('Search for pokemons by name and then clicks on the filtered list to open the card', () => {
    const totalPokemons = 1292;

    cy.intercept('GET', blastoiseURL, {
      fixture: 'blastoise',
    }).as('getBlastoise');

    cy.intercept('GET', blastoiseSpeciesURL, {
      fixture: 'blastoiseSpecies',
    }).as('getBlastoiseSpecies');

    cy.get("[data-cy='pokemon-search-box']").click();
    cy.get("[data-cy='pokemon-search-box-list']").children().should('have.length', totalPokemons);
    cy.get("[data-cy='pokemon-search-box-list']").should('be.visible');

    cy.get("[data-cy='pokemon-search-box']").type('Wartortle');
    cy.get("[data-cy='Wartortle']").should('be.visible');

    cy.get("[data-cy='pokemon-search-box']").clear();
    cy.get("[data-cy='pokemon-search-box']").type('Blastoise');
    cy.get("[data-cy='Blastoise']").should('be.visible');

    cy.get("[data-cy='Blastoise']").click();
    cy.get("[data-cy='pokemon-card-modal']").should('be.visible');
  });

  it("Should click on Blastoise's card and open the card with its details", () => {
    cy.intercept('GET', blastoiseURL, {
      fixture: 'blastoise',
    }).as('getBlastoise');

    cy.intercept('GET', blastoiseSpeciesURL, {
      fixture: 'blastoiseSpecies',
    }).as('getBlastoiseSpecies');

    cy.get("[data-cy='Blastoise-card']").click();
    cy.get("[data-cy='pokemon-card-modal']").should('be.visible');

    cy.get("[data-cy='previous-evolution-name']").should('have.text', 'Evolves from wartortle');
    cy.get("[data-cy='pokemon-genus']").should('have.text', 'Shellfish Pokémon');

    cy.get("[data-cy='previous-evolution-sprite']").should('have.attr', 'src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png');
    cy.get("[data-cy='pokemon-name']").should('have.text', 'blastoise');
    cy.get("[data-cy='pokemon-hp']").should('have.text', '79 HP');
    cy.get("[data-cy='pokemon-main-type-icon']").should('have.attr', 'src', 'img/pokemon-types/icons/water-type-icon.png');

    cy.get("[data-cy='pokemon-sprite']").should('have.attr', 'src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png');

    cy.get("[data-cy='pokemon-main-type-logo']").should('have.attr', 'src', 'img/pokemon-types/logos/water-type.png');
    cy.get("[data-cy='pokemon-secondary-type-logo']").should('have.attr', 'src', 'img/pokemon-types/logos/undefined-type.png');
    cy.get("[data-cy='pokemon-height']").should('have.text', 'Length: 5\'25" ');
    cy.get("[data-cy='pokemon-weight']").should('have.text', 'Weight: 1.88 lbs');

    cy.get("[data-cy='first-skill-icon']").should('have.attr', 'src', 'img/pokemon-types/icons/water-type-icon.png');
    cy.get("[data-cy='first-skill']").should('have.text', 'torrent');
    cy.get("[data-cy='second-skill-icon']").should('have.attr', 'src', 'img/pokemon-types/icons/water-type-icon.png');
    cy.get("[data-cy='second-skill']").should('have.text', 'rain-dish');

    cy.get("[data-cy='pokemon-attack']").should('have.text', 'ATTACK: 83');
    cy.get("[data-cy='pokemon-defense']").should('have.text', 'DEFENSE: 100');
    cy.get("[data-cy='pokemon-speed']").should('have.text', 'SPEED: 78');
    cy.get("[data-cy='pokemon-sp-attack']").should('have.text', 'SP ATK: 85');
    cy.get("[data-cy='pokemon-sp-defense']").should('have.text', 'SP DEF: 105');

    cy.get("[data-cy='weakness-icon']").should('have.attr', 'src', 'img/pokemon-types/icons/electric-type-icon.png');
    cy.get("[data-cy='resistance-icon']").should('have.attr', 'src', 'img/pokemon-types/icons/fire-type-icon.png');
    cy.get("[data-cy='retreat-icon']").children().should('have.length', 3);

    cy.get("[data-cy='pokemon-description']").should('have.text', 'A brutal POKéMON\nwith pressurized\nwater jets on its shell. They are\nused for high\nspeed tackles.');
  });

  it('Uses the paginator buttons to navigate through the pages', () => {
    cy.intercept('GET', secondPage, {
      fixture: 'pokedexSecondPage',
    }).as('getSecondPage');

    cy.get("[data-cy='page-2']").click();

    cy.get("[data-cy='previous-page-button']").should('have.not.class', 'disabled');
    cy.get("[data-cy='pokemon-cards-container']").children().should('have.length', POKEMONS_PER_PAGE);

    cy.get("[data-cy='previous-page-button']").click();

    cy.get("[data-cy='previous-page-button']").should('have.class', 'disabled');
    cy.get("[data-cy='pokemon-cards-container']").children().should('have.length', POKEMONS_PER_PAGE);

    cy.get('[data-cy="next-page-button"]').click();

    cy.get("[data-cy='previous-page-button']").should('have.not.class', 'disabled');
    cy.get("[data-cy='pokemon-cards-container']").children().should('have.length', POKEMONS_PER_PAGE);
  });

  it('Should make use of the paginator search box and navigate to the last page', () => {
    const LAST_PAGE_POKEMONS_PER_PAGE = 12;

    cy.intercept('GET', lastPage, {
      fixture: 'pokedexLastPage',
    }).as('getLastPage');

    cy.get("[data-cy='paginator-search-box']").click();
    cy.get("[data-cy='paginator-search-box']").type(65);
    cy.get("[data-cy='paginator-search-box']").type('{enter}');

    cy.get("[data-cy='next-page-button']").should('have.class', 'disabled');
    cy.get("[data-cy='pokemon-cards-container']").children().should('have.length', LAST_PAGE_POKEMONS_PER_PAGE);
  });

  it('Should make use of the paginator search box and input an invalid page', () => {
    cy.get("[data-cy='paginator-search-box']").click();
    cy.get("[data-cy='paginator-search-box']").type(0);
    cy.get("[data-cy='paginator-search-box']").type('{enter}');

    cy.get('.popover').should('be.visible');
    cy.get('.popover').should('have.text', "There's no such thing as page 0, go catch a pokemon instead !");
  });

  it('Should close the pokemon card upon clicking on the close button', () => {
    cy.intercept('GET', blastoiseURL, {
      fixture: 'blastoise',
    }).as('getBlastoise');

    cy.intercept('GET', blastoiseSpeciesURL, {
      fixture: 'blastoiseSpecies',
    }).as('getBlastoiseSpecies');

    cy.get("[data-cy='Blastoise-card']").click();
    cy.get("[data-cy='pokemon-card-modal']").should('be.visible');

    cy.wait(1000);
    cy.get("[data-cy='pokemon-modal-close-button']").click();
    cy.get("[data-cy='pokemon-card-modal']").should('not.be.visible');
  });
});
