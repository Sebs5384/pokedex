export function createPokemonModal(pokemon) {
  const { pokemonSkills, pokemonHeight, pokemonId, pokemonName, pokemonSprite, pokemonStats, pokemonTypes, pokemonWeight, previousEvolutionName, previousEvolutionId, pokemonText, pokemonGenus } = pokemon;

  const $modalContent = document.querySelector("#pokemon-modal-content");
  const $modalBody = createModalBody(pokemonSprite, pokemonTypes, pokemonHeight, pokemonWeight, pokemonSkills, pokemonStats, pokemonName, previousEvolutionName, previousEvolutionId, pokemonGenus, pokemonText);

  $modalContent.innerHTML = "";
  $modalContent.appendChild($modalBody);
  displayModal("#pokemon-modal");
}

function createModalBody(pokemonSprite, pokemonTypes, pokemonHeight, pokemonWeight, pokemonSkills, pokemonStats, pokemonName, previousEvolutionName, previousEvolutionId, pokemonGenus, pokemonText) {
  const $modalBody = document.createElement("section");
  $modalBody.className = "modal-body";
  $modalBody.id = "pokemon-modal-body";

  const $modalHeader = createModalHeader(pokemonName, pokemonStats, pokemonTypes, previousEvolutionName, previousEvolutionId, pokemonGenus);
  const $modalCard = createCard(pokemonSprite);
  const $modalBanner = createBanner(pokemonTypes, pokemonHeight, pokemonWeight);
  const $modalSkillsContainer = createSkillsContainer(pokemonTypes, pokemonSkills);
  const $modalStatsContainer = createStatsContainer(pokemonStats);
  const $modalMiscStats = createMiscStats();
  const $modalFooter = createPokemonDescription(pokemonText);

  $modalBody.appendChild($modalHeader);
  $modalBody.appendChild($modalCard);
  $modalBody.appendChild($modalBanner);
  $modalBody.appendChild($modalSkillsContainer);
  $modalBody.appendChild($modalStatsContainer);
  $modalBody.appendChild($modalMiscStats);
  $modalBody.appendChild($modalFooter);

  return $modalBody;
}

function createModalHeader(pokemonName, pokemonStats, pokemonTypes, previousEvolution, previousEvolutionId, pokemonGenus) {
  const $modalHeader = document.createElement("section");
  $modalHeader.className = "container-fluid";

  $modalHeader.innerHTML = `
    <div class="row modal-fs">
      <strong class="col-2 align-self-end">STAGE</strong>
      <strong class="col-5 align-self-end text-start">Evolves from ${previousEvolution}</strong>
      <strong class="col-4 align-self-end text-end">${pokemonGenus}</strong>
      <div class="col-1">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
    </div>

    <div class="row justify-content-center">
      <hr class="border col-11 border-warning border-1 opacity-50" />
    </div>

    <div class="row" id="pokemon-main-info">
      <img class="col-2 align-self-center stage-icon" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${previousEvolutionId}.png" />
      <strong class="col-4 align-self-center"> ${pokemonName}</strong>
      <strong class="col-4 align-self-center text-end main-status">${pokemonStats[0]} HP</strong>
      <img class="col-2 align-self-center type-icon" src="img/pokemon-types/${pokemonTypes[0]}-type-icon.png" />
    </div>
  `;

  return $modalHeader;
}

function createCard(pokemonSprite) {
  const $modalCardContainer = document.createElement("section");
  $modalCardContainer.className = "container-fluid";
  $modalCardContainer.id = "pokemon-modal-image";
  $modalCardContainer.innerHTML = `
    <div class="card main-image-container">
      <div class="row card-body justify-content-center">
        <img class="col-8" src=${pokemonSprite} />
      </div>
    </div>
  `;

  return $modalCardContainer;
}

function createBanner(pokemonTypes, pokemonHeight, pokemonWeight) {
  const $modalBanner = document.createElement("section");
  $modalBanner.className = "row col-11 mt-2 mx-auto modal-banner";
  $modalBanner.id = "pokemon-modal-banner";

  $modalBanner.innerHTML = `
    <img class="col-2" src="img/pokemon-types/${pokemonTypes[0]}-type.png" />
    <img class="col-2" src="img/pokemon-types/${pokemonTypes[1]}-type.png" />
    <strong class="col-4 text-end">Length: ${pokemonHeight}</strong>
    <strong class="col-4">Weight: ${pokemonWeight}</strong>
  `;

  return $modalBanner;
}

function createSkillsContainer(pokemonTypes, pokemonSkills) {
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
        <img src="img/pokemon-types/${pokemonTypes[0]}-type-icon.png" class="status-icon" />
        <strong>${pokemonSkills[0]}</strong>
      </div>
      <div class="col-6 skill-font">
        <img src="img/pokemon-types/${pokemonTypes[0]}-type-icon.png" class="status-icon" />
        <strong>${pokemonSkills[1]}</strong>
      </div>
    </div>
  `;

  return $modalSkillContainer;
}

function createStatsContainer(pokemonStats) {
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
        <strong>ATTACK: ${pokemonStats[1]}</strong>
      </div>
      <div class="col-4">
      <img src="img/pokemon-stats/def-icon.png" class="status-icon" />
      <strong>DEFENSE: ${pokemonStats[2]}</strong>
    </div>
    <div class="col-4">
      <img src="img/pokemon-stats/speed-icon.png" class="status-icon" />
      <strong>SPEED: ${pokemonStats[5]}</strong>
    </div>
    <div class="col-4 mt-1">
      <img src="img/pokemon-stats/sp-atk-icon.png" class="status-icon" />
      <strong>SP ATK: ${pokemonStats[3]}</strong>
    </div>
    <div class="col-4 mt-1">
      <img src="img/pokemon-stats/sp-def-icon.png" class="status-icon" />
      <strong>SP DEF: ${pokemonStats[4]}</strong>
    </div>
  </div>  
  `;

  return $modalStatsContainer;
}

function createMiscStats() {
  const $modalMiscStats = document.createElement("section");
  $modalMiscStats.className = "container-fluid mt-2";

  $modalMiscStats.innerHTML = `
  <div class="row modal-fs">
    <hr class="col-12 modal-horizontal-rule" />
    <strong class="col-4 text-start">Weakness</strong>
    <strong class="col-4 text-center">Resistance</strong>
    <strong class="col-4 text-end">Retreat Cost</strong>
    <div class="col-4 text-start">
      <img src="img/pokemon-types/electric-type-icon.png" class="status-icon" />
    </div>
    <div class="col-4 text-center"></div>
    <div class="col-4 text-end">
      <img src="img/pokemon-types/normal-type-icon.png" class="status-icon" />
      <img src="img/pokemon-types/normal-type-icon.png" class="status-icon" />
      <img src="img/pokemon-types/normal-type-icon.png" class="status-icon" />
    </div>
  </div>
  `;

  return $modalMiscStats;
}

function createPokemonDescription(pokemonText) {
  const $modalDescription = document.createElement("section");
  $modalDescription.className = "container-fluid mt-2";

  $modalDescription.innerHTML = `
    <div class="card text-center modal-footer-description">
      <strong>${pokemonText}</strong>
    </div>
  `;

  return $modalDescription;
}

function displayModal(modal) {
  const $modal = document.querySelector(modal);
  const modalInstance = new bootstrap.Modal($modal);
  modalInstance.show();
}
