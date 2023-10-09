export function displayPokemonCardModal(pokemonData, pokemonSprite) {
  setPokemonCardModalContent(pokemonData, pokemonSprite);
  changeModalTexture(pokemonData);
  showModal("#pokemon-modal");
}

function setPokemonCardModalContent(pokemonData, pokemonSprite) {
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

function createModalBody() {
  const $modalBody = document.createElement("section");
  $modalBody.className = "modal-body";
  $modalBody.id = "pokemon-modal-body";

  return $modalBody;
}

function createModalHeader(pokemonData) {
  const { pokemonName, pokemonStats, pokemonTypes, previousEvolutionData } = pokemonData;
  const $modalHeader = document.createElement("section");
  $modalHeader.className = "container-fluid capitalize-text";

  $modalHeader.innerHTML = `
    <div class="row modal-font">
      ${previousEvolutionData.name === "Basic Pokemon" ? `<div class="col-2"></div>` : ` <strong class="col-2 align-self-end">P. STAGE</strong>`}
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
      ${previousEvolutionData.id === "None" ? `<div class="col-2"></div>` : `<img class="col-2 align-self-center stage-icon" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${previousEvolutionData.id}.png" alt="" />`}
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
        <img class="col-8" src=${pokemonSprite} onerror="this.src='img/misc/404-shocked.png'" />
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
  $modalSkillContainer.className = "container-fluid capitalize-text mt-2";

  $modalSkillContainer.innerHTML = `
    <div class="row modal-font">
      <div class="col-12">
        <img src="img/pokemon-stats/skill-icon-png.png" class="status-icon mb-1" />
        <strong>Pokemon Skills</strong>
      </div>
      <hr class="col-12 modal-horizontal-rule" />
      <div class="col-6">
        <img src="img/pokemon-types/icons/${pokemonTypes.mainType}-type-icon.png" class="status-icon" />
        <strong class="skill-font">${pokemonSkills.firstSkill}</strong>
      </div>
      <div class="col-6">
        <img src="img/pokemon-types/icons/${pokemonTypes.mainType}-type-icon.png" class="status-icon" />
        <strong class="skill-font">${pokemonSkills.secondSkill}</strong>
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
    <div class="row modal-font">
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
  const { pokemonTypeAdvantage, previousEvolutionData } = pokemonData;
  const $modalMiscStats = document.createElement("section");
  $modalMiscStats.className = "container-fluid mt-2";

  $modalMiscStats.innerHTML = `
  <div class="row modal-font">
    <hr class="col-12 modal-horizontal-rule" />
    <strong class="col-4 text-start">Weakness</strong>
    <strong class="col-4 text-center">Resistance</strong>
    <strong class="col-4 text-end">Retreat Cost</strong>
    <div class="col-4 text-start">
      <img src="img/pokemon-types/icons/${pokemonTypeAdvantage.weakness}-type-icon.png" class="status-icon" />
    </div>
    <div class="col-4 text-center">
      <img src="img/pokemon-types/icons/${pokemonTypeAdvantage.resistance}-type-icon.png" class="status-icon" />
    </div>
    <div class="col-4 text-end">
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

export function displayCaughtPokemonModal(pokemonData, changeModalText) {
  setCaughtPokemonModalContent(pokemonData);
  changeModalText(pokemonData.caughtPokemonName);
  showModal("#caught-pokemon-modal");
  hideModal("#caught-pokemon-modal", 10000);
}

function setCaughtPokemonModalContent(pokemonData) {
  const $caughtPokemonContent = document.querySelector("#caught-pokemon-content");

  $caughtPokemonContent.innerHTML = "";

  const $caughtPokemonBody = createCaughtModalBody(pokemonData);
  $caughtPokemonContent.appendChild($caughtPokemonBody);
}

function createCaughtModalBody(pokemonData) {
  const $caughtModalBody = document.createElement("section");

  $caughtModalBody.className = "modal-body caught-pokemon-body";
  $caughtModalBody.innerHTML = `
    <div class="caught-pokemon-description-background">
      <div class="container pokemon-emerald-font caught-pokemon-description-container">
        <div class="row">
          <div class="typewriter-effect col-12" id="caught-pokemon-top-text"></div>
          <div class="typewriter-effect-delayed col-12" id="caught-pokemon-bottom-text"></div>
        </div>
      </div>
    </div>
  `;

  return $caughtModalBody;
}

export function displayPokedexRegistrationModal(pokemonData, pokemonSprite) {
  setPokedexRegistrationModalContent(pokemonData, pokemonSprite);
  showModal("#pokedex-registration-modal", 9000);
  hideModal("#pokedex-registration-modal", 25000);
}

function setPokedexRegistrationModalContent(pokemonData, pokemonSprite) {
  const $registrationModalContent = document.querySelector("#registration-content");
  $registrationModalContent.innerHTML = "";

  const $registrationText = createRegistrationText();
  const $modalBody = createRegistrationBody();
  const $registrationContent = createRegistrationContent(pokemonData, pokemonSprite);
  const $registrationDescription = createRegistrationDescription(pokemonData);

  $registrationModalContent.appendChild($registrationText);
  $registrationModalContent.appendChild($modalBody);
  $modalBody.appendChild($registrationContent);
  $registrationModalContent.appendChild($modalBody);
  $registrationModalContent.appendChild($registrationDescription);
}

function createRegistrationText() {
  const $registrationText = document.createElement("section");
  $registrationText.className = "modal-title w-100 text-center h2";
  $registrationText.innerText = "POKÉDEX registration completed.";

  return $registrationText;
}

function createRegistrationBody() {
  const $modalBody = document.createElement("section");
  $modalBody.className = "modal-body row justify-content-center registration-screen-background";
  $modalBody.style = "text-transform: uppercase";

  return $modalBody;
}

function createRegistrationContent(pokemonData, pokemonSprite) {
  const { caughtPokemonId, caughtPokemonName, caughtPokemonEvolutionData, caughtPokemonHeight, caughtPokemonWeight } = pokemonData;
  const $registrationContent = document.createElement("div");
  $registrationContent.className = "col-11 registration-details-background";

  $registrationContent.innerHTML = `
  <div class="row justify-content-center registration-screen">
    <div class="container col-4 registration-image-background">
      <img class="registration-image" src=${pokemonSprite} onerror="this.src='img/misc/404-shocked.png'"  />
    </div>

    <div class="container col-8 mt-1">
      <div class="row">
        <div class="col-11 registration-info-background">
          <div class="row">
            <div class="mt-2 col-12 text-start h3">Nº ${caughtPokemonId > 1017 ? caughtPokemonId - 8983 : caughtPokemonId} ${caughtPokemonName}</div>
            <div class="mb-2 col-12 h3 genus-registration-font" > ${caughtPokemonEvolutionData.genus}</div>
          
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-8">
          <div class="row">
            <div class="mt-2 col-3 h3 text-center description-underline">HT</div>
            <div class="mt-2 col-7 h3 text-end description-underline">${caughtPokemonHeight}"</div>
            <div class="col-3 h3 text-center description-underline">WT</div>
            <div class="col-7 h3 text-end description-underline">${caughtPokemonWeight} lbs.</div>
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

function createRegistrationDescription(pokemonData) {
  const { caughtPokemonDescription } = pokemonData;
  const $descriptionContainer = document.createElement("section");
  $descriptionContainer.className = "modal-title w-100 text-center h1";

  $descriptionContainer.innerHTML = `
    <div>${caughtPokemonDescription}</div>
  `;

  return $descriptionContainer;
}

function showModal(modal, timer = 0) {
  const modalInstance = new bootstrap.Modal(modal);
  setTimeout(() => {
    modalInstance.show();
  }, timer);
}

function hideModal(modal, timer = 0) {
  const $modal = bootstrap.Modal.getInstance(modal);
  setTimeout(() => {
    $modal.hide();
  }, timer);
}

function changeModalTexture(pokemonData) {
  const { pokemonTypes } = pokemonData;
  const $modalContent = document.querySelector("#pokemon-modal-content");
  $modalContent.style.background = `url(/img/modal-textures/${pokemonTypes.mainType}-texture.png) center/cover`;
}
