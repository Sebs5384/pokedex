export async function displayPokemonCardModal(pokemonData) {
  createLoadingModal();
  await showModal("#loading-modal");
  await setPokemonCardModalContent(pokemonData);
  await changeModalCardTexture(pokemonData);
  await changeModalCardSprite(pokemonData);
  await hideModal("#loading-modal", 500);
  await showModal("#pokemon-modal");
  setupCloseModalButton("#close-modal-button");
}

async function setPokemonCardModalContent(pokemonData) {
  const { skills, height, name, stats, types, weight, previousEvolutionData, description, typeAdvantage, sprite } = pokemonData;
  const $modalContent = document.querySelector("#pokemon-modal-content");
  $modalContent.innerHTML = "";

  const $modalBody = createModalBody();
  const $modalHeader = createModalHeader(name, stats, types, previousEvolutionData);
  const $modalCard = createCard(types);
  const $modalBanner = createBanner(types, height, weight);
  const $modalSkillsContainer = createSkillsContainer(types, skills);
  const $modalStatsContainer = createStatsContainer(stats);
  const $modalMiscStats = createMiscStats(typeAdvantage, previousEvolutionData);
  const $modalFooter = createPokemonDescription(description);

  $modalBody.appendChild($modalHeader);
  $modalBody.appendChild($modalCard);
  $modalBody.appendChild($modalBanner);
  $modalBody.appendChild($modalSkillsContainer);
  $modalBody.appendChild($modalStatsContainer);
  $modalBody.appendChild($modalMiscStats);
  $modalBody.appendChild($modalFooter);
  $modalContent.appendChild($modalBody);
}

function createModalBody() {
  const $modalBody = document.createElement("section");
  $modalBody.className = "modal-body";
  $modalBody.id = "pokemon-modal-body";

  return $modalBody;
}

function createModalHeader(name, stats, types, previousEvolutionData) {
  const $modalHeader = document.createElement("section");
  $modalHeader.className = "container-fluid capitalize-text";

  $modalHeader.innerHTML = `
    <div class="row modal-font">
      ${previousEvolutionData.name === "Basic Pokemon" ? `<div class="col-2 col-md-2"></div>` : ` <strong class="col-2 align-self-end">P. STAGE</strong>`}
      <strong class="col-5 col-md-5 col-lg-5 align-self-end text-start" data-cy="previous-evolution-name">${previousEvolutionData.name}</strong>
      <strong class="col-4 col-md-4 col-lg-4 align-self-end text-end" data-cy="pokemon-genus">${previousEvolutionData.genus}</strong>
      <div class="col-1 col-md-1">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="close-modal-button" data-cy="pokemon-modal-close-button"></button>
      </div>
    </div>

    <div class="row justify-content-center">
      <hr class="border col-11 col-md-11 col-lg-11 border-warning border-1 opacity-50" />
    </div>

    <div class="row" id="pokemon-main-info">
      ${
        previousEvolutionData.id === "None"
          ? `<div class="col-2"></div>`
          : `<img class="col-2 col-md-2 align-self-center stage-icon" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${previousEvolutionData.id}.png" data-id="${previousEvolutionData.id}" data-cy="previous-evolution-sprite" />`
      }
      <strong class="col-4 col-md-4 align-self-center" data-cy="pokemon-name">${name}</strong>
      <strong class="col-4 col-md-4 align-self-center text-end main-status" data-cy="pokemon-hp">${stats.hp} HP</strong>
      <img class="mt-1 mb-md-0 col-2 col-md-2 align-self-center type-icon" src="img/pokemon-types/icons/${types.mainType}-type-icon.png" data-id="${name}-main-type" data-cy="pokemon-main-type-icon" />
    </div>
  `;

  return $modalHeader;
}

function createCard(types) {
  const $modalCardContainer = document.createElement("section");
  $modalCardContainer.className = "container-fluid";
  $modalCardContainer.id = "pokemon-modal-image";
  $modalCardContainer.innerHTML = `
    <div class="card main-image-container ${types.mainType}-background" data-cy="type-texture">
      <div class="row card-body justify-content-center">
        <img id="pokemon-card-sprite" class="col-11 col-md-6 col-lg-8" src="" onerror="this.src='img/misc/404-shocked.png'" data-cy="pokemon-sprite" />
      </div>
    </div>
  `;

  return $modalCardContainer;
}

function createBanner(types, height, weight) {
  const $modalBanner = document.createElement("section");
  $modalBanner.className = "row col-11 mt-2 mx-auto modal-banner";
  $modalBanner.id = "pokemon-modal-banner";

  $modalBanner.innerHTML = `
    <img class="col-2 col-md-2" src="img/pokemon-types/logos/${types.mainType}-type.png" data-cy="pokemon-main-type-logo" />
    <img class="col-2 col-md-2" src="img/pokemon-types/logos/${types.secondaryType}-type.png" data-cy="pokemon-secondary-type-logo" />
    <strong class="col-4 col-md-4 text-end" data-cy="pokemon-height">Length: ${height}" </strong>
    <strong class="col-4 col-md-4" data-cy="pokemon-weight">Weight: ${weight} lbs</strong>
  `;

  return $modalBanner;
}

function createSkillsContainer(types, skills) {
  const $modalSkillContainer = document.createElement("section");
  $modalSkillContainer.className = "container-fluid capitalize-text mt-2";

  $modalSkillContainer.innerHTML = `
    <div class="row modal-font">
      <div class="col-12">
        <img src="img/pokemon-stats/skill-icon-png.png" class="status-icon mb-1" />
        <strong>Pokemon Skills</strong>
      </div>
      <hr class="col-12 modal-horizontal-rule" />
      <div class="col-6">
        <img src="img/pokemon-types/icons/${types.mainType}-type-icon.png" class="status-icon mb-2 mb-md-1" data-cy="first-skill-icon"/>
        <strong class="skill-font" data-cy="first-skill">${skills.firstSkill}</strong>
      </div>
      <div class="col-6">
        <img src="img/pokemon-types/icons/${types.mainType}-type-icon.png" class="status-icon mb-2 mb-md-1" data-cy="second-skill-icon" />
        <strong class="skill-font" data-cy="second-skill">${skills.secondSkill}</strong>
      </div>
    </div>
  `;

  return $modalSkillContainer;
}

function createStatsContainer(stats) {
  const $modalStatsContainer = document.createElement("section");
  $modalStatsContainer.className = "container-fluid mt-2";

  $modalStatsContainer.innerHTML = `
    <div class="row modal-font">
      <div class="text-start col-12">
        <img src="img/pokemon-stats/status-icon.png" class="status-icon" />
        <strong>Pokemon Status</strong>
      </div>
      <hr class="col-12 modal-horizontal-rule" />
      <div class="col-4">
        <img src="img/pokemon-stats/atk-icon.png" class="status-icon" />
        <strong data-cy="pokemon-attack">ATTACK: ${stats.attack}</strong>
      </div>
      <div class="col-4">
      <img src="img/pokemon-stats/def-icon.png" class="status-icon" />
      <strong data-cy="pokemon-defense">DEFENSE: ${stats.defense}</strong>
    </div>
    <div class="col-4">
      <img src="img/pokemon-stats/speed-icon.png" class="status-icon" />
      <strong data-cy="pokemon-speed">SPEED: ${stats.speed}</strong>
    </div>
    <div class="col-4 mt-1">
      <img src="img/pokemon-stats/sp-atk-icon.png" class="status-icon" />
      <strong data-cy="pokemon-sp-attack">SP ATK: ${stats.spAtk}</strong>
    </div>
    <div class="col-4 mt-1">
      <img src="img/pokemon-stats/sp-def-icon.png" class="status-icon" />
      <strong data-cy="pokemon-sp-defense">SP DEF: ${stats.spDef}</strong>
    </div>
  </div>  
  `;

  return $modalStatsContainer;
}

function createMiscStats(typeAdvantage, previousEvolutionData) {
  const $modalMiscStats = document.createElement("section");
  $modalMiscStats.className = "container-fluid mt-2";

  $modalMiscStats.innerHTML = `
  <div class="row modal-font">
    <hr class="col-12 modal-horizontal-rule" />
    <strong class="col-4 text-start">Weakness</strong>
    <strong class="col-4 text-center">Resistance</strong>
    <strong class="col-4 text-end">Retreat Cost</strong>
    <div class="col-4 text-start">
      <img src="img/pokemon-types/icons/${typeAdvantage.weakness}-type-icon.png" class="status-icon" data-cy="weakness-icon"/>
    </div>
    <div class="col-4 text-center">
      <img src="img/pokemon-types/icons/${typeAdvantage.resistance}-type-icon.png" class="status-icon" data-cy="resistance-icon" />
    </div>
    <div class="col-4 text-end" data-cy="retreat-icon">
      ${
        previousEvolutionData.name === "Basic Pokemon"
          ? `<img src="img/pokemon-types/icons/retreat-icon.png" class="status-icon" />`
          : `<img src="img/pokemon-types/icons/retreat-icon.png" class="status-icon" />
        <img src="img/pokemon-types/icons/retreat-icon.png" class="status-icon" />
        <img src="img/pokemon-types/icons/retreat-icon.png" class="status-icon" />
      `
      }
    </div>
  </div>
  `;

  return $modalMiscStats;
}

function createPokemonDescription(description) {
  const $modalDescription = document.createElement("section");
  $modalDescription.className = "container-fluid mt-2";

  $modalDescription.innerHTML = `
    <div class="card text-center modal-footer-description">
      <strong data-cy="pokemon-description">${description}</strong>
    </div>
  `;

  return $modalDescription;
}

export function displayCaughtPokemonModal(caughtPokemonData, changeModalText) {
  setCaughtPokemonModalContent();
  changeModalText(caughtPokemonData);
  showModal("#caught-pokemon-modal");
  hideModal("#caught-pokemon-modal", 10000);
}

function setCaughtPokemonModalContent() {
  const $caughtPokemonContent = document.querySelector("#caught-pokemon-content");

  $caughtPokemonContent.innerHTML = "";

  const $caughtPokemonBody = createCaughtModalBody();
  $caughtPokemonContent.appendChild($caughtPokemonBody);
}

function createCaughtModalBody() {
  const $caughtModalBody = document.createElement("section");

  $caughtModalBody.className = "modal-body pokedex-message-body";
  $caughtModalBody.innerHTML = `
    <div class="pokedex-message-background">
      <div class="container pokemon-emerald-font pokedex-message">
        <div class="row">
          <div class="typewriter-effect col-12" id="caught-pokemon-top-text"></div>
          <div class="typewriter-effect-delayed col-12" id="caught-pokemon-bottom-text"></div>
        </div>
      </div>
    </div>
  `;

  return $caughtModalBody;
}

export function displayPokedexRegistrationModal(caughtPokemonData) {
  setPokedexRegistrationModalContent(caughtPokemonData);
  showModal("#pokedex-registration-modal", 9000);
  hideModal("#pokedex-registration-modal", 25000);
}

function setPokedexRegistrationModalContent(caughtPokemonData) {
  const { id, name, height, weight, description, previousEvolutionData, sprite } = caughtPokemonData;
  const $registrationModalContent = document.querySelector("#registration-content");
  $registrationModalContent.innerHTML = "";

  const $registrationText = createRegistrationText();
  const $modalBody = createRegistrationBody();
  const $registrationContent = createRegistrationContent(id, name, height, weight, sprite, previousEvolutionData);
  const $registrationDescription = createRegistrationDescription(description);

  $registrationModalContent.appendChild($registrationText);
  $registrationModalContent.appendChild($modalBody);
  $modalBody.appendChild($registrationContent);
  $registrationModalContent.appendChild($modalBody);
  $registrationModalContent.appendChild($registrationDescription);
}

function createRegistrationText() {
  const $registrationText = document.createElement("section");
  $registrationText.className = "registration-text modal-title w-100 text-center h2";
  $registrationText.innerText = "POKÉDEX registration completed.";

  return $registrationText;
}

function createRegistrationBody() {
  const $modalBody = document.createElement("section");
  $modalBody.className = "modal-body row justify-content-center registration-screen-background";
  $modalBody.style = "text-transform: uppercase";

  return $modalBody;
}

function createRegistrationContent(id, name, height, weight, sprite, previousEvolutionData) {
  const $registrationContent = document.createElement("div");
  $registrationContent.className = "col-11 registration-details-background";

  $registrationContent.innerHTML = `
  <div class="row justify-content-center registration-screen">
    <div class="col-4 registration-image-background">
      <img class="registration-image" src=${sprite} onerror="this.src='img/misc/404-shocked.png'"  />
    </div>

    <div class="col-8 mt-1 registration-info">
      <div class="row">
        <div class="col-11 registration-info-background">
          <div class="row">
            <div class="mt-2 col-12 text-start h3">Nº ${id > 1017 ? id - 8983 : id} ${name}</div>
            <div class="mb-2 col-12 h3 genus-registration-font" > ${previousEvolutionData.genus}</div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-8">
          <div class="row">
            <div class="mt-2 col-3 col-md-3 h3 text-center description-underline">HT</div>
            <div class="mt-2 col-7 col-md-7 h3 text-end description-underline">${height}"</div>
            <div class="col-3 col-md-3 h3 text-center description-underline">WT</div>
            <div class="col-7 col-md-7 h3 text-end description-underline">${weight} lbs.</div>
          </div>
        </div>

        <div class="col-3 d-flex justify-content-end align-items-center">
          <div class="row">
            <div class="text-center d-flex justify-content-center align-items-center footprint-background"></div>
          </div>
        </div>
      </div>
      
    </div>
  </div>`;

  return $registrationContent;
}

function createRegistrationDescription(description) {
  const $descriptionContainer = document.createElement("section");
  $descriptionContainer.className = "registration-text modal-title w-100 text-center h1";

  $descriptionContainer.innerHTML = `
    <div>${description ? description : "Uknown pokemon description"}</div>
  `;

  return $descriptionContainer;
}

function createLoadingModal() {
  const $loadingModalContent = document.querySelector("#loading-modal-content");
  const $loadingModalBody = document.createElement("section");

  $loadingModalBody.className = "modal-body pokedex-message-body";
  $loadingModalBody.innerHTML = `
  <div class="pokedex-message-background">
    <div class="pokemon-emerald-font pokedex-message">
      <div class="row">
        <div class="col-12 text-center">Loading....</div>
      </div>
    </div>
  </div>`;

  $loadingModalContent.appendChild($loadingModalBody);
}

async function showModal(modal, timer = 0) {
  const $modal = new bootstrap.Modal(modal);

  return await new Promise((resolve) => {
    setTimeout(() => {
      $modal.show();
      resolve();
    }, timer);
  });
}

async function hideModal(modal, timer = 0) {
  const $modal = bootstrap.Modal.getInstance(modal);

  return await new Promise((resolve) => {
    setTimeout(() => {
      $modal.hide();
      resolve();
    }, timer);
  });
}

function removeModals() {
  const $modals = document.querySelectorAll(".modal-backdrop");
  $modals.forEach(($modal) => {
    $modal.remove();
  });
}

async function changeModalCardTexture(pokemonData) {
  const { types } = pokemonData;
  const $modalContent = document.querySelector("#pokemon-modal-content");
  const modalTexture = `img/modal-textures/${types.mainType}-texture.png`;

  return await new Promise((resolve) => {
    const img = new Image();
    img.src = modalTexture;
    img.onload = () => {
      $modalContent.style.background = `url(${modalTexture}) center/cover`;
      resolve();
    };
  });
}

async function changeModalCardSprite(pokemonData) {
  const { sprite } = pokemonData;
  const $modalCard = document.querySelector("#pokemon-card-sprite");

  return await new Promise((resolve) => {
    const img = new Image();
    img.src = sprite;
    img.onload = () => {
      $modalCard.src = sprite;
      resolve();
    };
  });
}

function setupCloseModalButton(button) {
  const $closeButton = document.querySelector(button);

  $closeButton.onclick = () => {
    removeModals();
  };
}
