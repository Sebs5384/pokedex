export function createPokemonModal(pokemonData, pokemonSprite) {
  const $modalContent = document.querySelector("#pokemon-modal-content");
  $modalContent.innerHTML = "";

  const $modalBody = createModalBody();
  const $modalHeader = createModalHeader(pokemonData);
  const $modalCard = createCard(pokemonData, pokemonSprite);
  const $modalBanner = createBanner(pokemonData);
  const $modalSkillsContainer = createSkillsContainer(pokemonData);
  const $modalStatsContainer = createStatsContainer(pokemonData);
  const $modalMiscStats = createMiscStats(pokemonData);
  const $modalFooter = createPokemonDescription(pokemonData);

  $modalBody.appendChild($modalHeader);
  $modalBody.appendChild($modalCard);
  $modalBody.appendChild($modalBanner);
  $modalBody.appendChild($modalSkillsContainer);
  $modalBody.appendChild($modalStatsContainer);
  $modalBody.appendChild($modalMiscStats);
  $modalBody.appendChild($modalFooter);
  $modalContent.appendChild($modalBody);
}

export function showModal(modal) {
  const $modal = document.querySelector(modal);
  const modalInstance = new bootstrap.Modal($modal);
  modalInstance.show();
}

export function changeModalTexture(pokemonData) {
  const { pokemonTypes } = pokemonData;
  const $modalContent = document.querySelector("#pokemon-modal-content");
  $modalContent.style.background = `url(/img/modal-textures/${pokemonTypes.mainType}-texture.png) center/cover`;
}

function createModalBody() {
  const $modalBody = document.createElement("section");
  $modalBody.className = "modal-body";
  $modalBody.id = "pokemon-modal-body";

  return $modalBody;
}

function createModalHeader(pokemonData) {
  const { pokemonName, pokemonStats, pokemonTypes, previousEvolutionData } = pokemonData;
  const $modalHeader = document.createElement("section");
  $modalHeader.className = "container-fluid";

  $modalHeader.innerHTML = `
    <div class="row modal-fs">
      ${previousEvolutionData.name === "Basic Pokemon" ? `<div class="col-2"></div>` : ` <strong class="col-2 align-self-end">STAGE</strong>`}
      <strong class="col-5 align-self-end text-start">${previousEvolutionData.name}</strong>
      <strong class="col-4 align-self-end text-end">${previousEvolutionData.genus}</strong>
      <div class="col-1">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="close-modal-button"></button>
      </div>
    </div>

    <div class="row justify-content-center">
      <hr class="border col-11 border-warning border-1 opacity-50" />
    </div>

    <div class="row" id="pokemon-main-info">
      ${previousEvolutionData.id === "None" ? `<div class="col-2"></div>` : `<img class="col-2 align-self-center stage-icon" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${previousEvolutionData.id}.png" />`}
      <strong class="col-4 align-self-center"> ${pokemonName}</strong>
      <strong class="col-4 align-self-center text-end main-status">${pokemonStats.hp} HP</strong>
      <img class="col-2 align-self-center type-icon" src="img/pokemon-types/icons/${pokemonTypes.mainType}-type-icon.png" />
    </div>
  `;

  return $modalHeader;
}

function createCard(pokemonData, pokemonSprite) {
  const { pokemonTypes } = pokemonData;

  const $modalCardContainer = document.createElement("section");
  $modalCardContainer.className = "container-fluid";
  $modalCardContainer.id = "pokemon-modal-image";
  $modalCardContainer.innerHTML = `
    <div class="card main-image-container ${pokemonTypes.mainType}-background">
      <div class="row card-body justify-content-center">
        <img class="col-8" src=${pokemonSprite} />
      </div>
    </div>
  `;

  return $modalCardContainer;
}

function createBanner(pokemonData) {
  const { pokemonTypes, pokemonHeight, pokemonWeight } = pokemonData;

  const $modalBanner = document.createElement("section");
  $modalBanner.className = "row col-11 mt-2 mx-auto modal-banner";
  $modalBanner.id = "pokemon-modal-banner";

  $modalBanner.innerHTML = `
    <img class="col-2" src="img/pokemon-types/logos/${pokemonTypes.mainType}-type.png" />
    <img class="col-2" src="img/pokemon-types/logos/${pokemonTypes.secondaryType}-type.png" />
    <strong class="col-4 text-end">Length: ${pokemonHeight}" </strong>
    <strong class="col-4">Weight: ${pokemonWeight} lbs</strong>
  `;

  return $modalBanner;
}

function createSkillsContainer(pokemonData) {
  const { pokemonTypes, pokemonSkills } = pokemonData;

  const $modalSkillContainer = document.createElement("section");
  $modalSkillContainer.className = "container-fluid mt-2";
  $modalSkillContainer.id = "pokemon-skills";

  $modalSkillContainer.innerHTML = `
    <div class="row modal-fs">
      <div class="col-12">
        <img src="img/pokemon-stats/skill-icon-png.png" class="status-icon mb-1" />
        <strong>Pokemon Skills</strong>
      </div>
      <hr class="col-12 modal-horizontal-rule" />
      <div class="col-6 skill-font">
        <img src="img/pokemon-types/icons/${pokemonTypes.mainType}-type-icon.png" class="status-icon" />
        <strong>${pokemonSkills.firstSkill}</strong>
      </div>
      <div class="col-6 skill-font">
        <img src="img/pokemon-types/icons/${pokemonTypes.mainType}-type-icon.png" class="status-icon" />
        <strong>${pokemonSkills.secondSkill}</strong>
      </div>
    </div>
  `;

  return $modalSkillContainer;
}

function createStatsContainer(pokemonData) {
  const { pokemonStats } = pokemonData;
  const $modalStatsContainer = document.createElement("section");
  $modalStatsContainer.className = "container-fluid mt-2";

  $modalStatsContainer.innerHTML = `
    <div class="row modal-fs">
      <div class="text-start col-12">
        <img src="img/pokemon-stats/status-icon.png" class="status-icon" />
        <strong>Pokemon Status</strong>
      </div>
      <hr class="col-12 modal-horizontal-rule" />
      <div class="col-4">
        <img src="img/pokemon-stats/atk-icon.png" class="status-icon" />
        <strong>ATTACK: ${pokemonStats.attack}</strong>
      </div>
      <div class="col-4">
      <img src="img/pokemon-stats/def-icon.png" class="status-icon" />
      <strong>DEFENSE: ${pokemonStats.defense}</strong>
    </div>
    <div class="col-4">
      <img src="img/pokemon-stats/speed-icon.png" class="status-icon" />
      <strong>SPEED: ${pokemonStats.speed}</strong>
    </div>
    <div class="col-4 mt-1">
      <img src="img/pokemon-stats/sp-atk-icon.png" class="status-icon" />
      <strong>SP ATK: ${pokemonStats.spAtk}</strong>
    </div>
    <div class="col-4 mt-1">
      <img src="img/pokemon-stats/sp-def-icon.png" class="status-icon" />
      <strong>SP DEF: ${pokemonStats.spDef}</strong>
    </div>
  </div>  
  `;

  return $modalStatsContainer;
}

function createMiscStats(pokemonData) {
  const $modalMiscStats = document.createElement("section");
  $modalMiscStats.className = "container-fluid mt-2";

  $modalMiscStats.innerHTML = `
  <div class="row modal-fs">
    <hr class="col-12 modal-horizontal-rule" />
    <strong class="col-4 text-start">Weakness</strong>
    <strong class="col-4 text-center">Resistance</strong>
    <strong class="col-4 text-end">Retreat Cost</strong>
    <div class="col-4 text-start">
      <img src="img/pokemon-types/icons/electric-type-icon.png" class="status-icon" />
    </div>
    <div class="col-4 text-center"></div>
    <div class="col-4 text-end">
      <img src="img/pokemon-types/icons/retreat-icon.png" class="status-icon" />
      <img src="img/pokemon-types/icons/retreat-icon.png" class="status-icon" />
      <img src="img/pokemon-types/icons/retreat-icon.png" class="status-icon" />
    </div>
  </div>
  `;

  return $modalMiscStats;
}

function createPokemonDescription(pokemonData) {
  const { pokemonDescription } = pokemonData;
  const $modalDescription = document.createElement("section");
  $modalDescription.className = "container-fluid mt-2";

  $modalDescription.innerHTML = `
    <div class="card text-center modal-footer-description">
      <strong>${pokemonDescription}</strong>
    </div>
  `;

  return $modalDescription;
}
