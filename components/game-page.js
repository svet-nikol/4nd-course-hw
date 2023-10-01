import _ from "lodash";

export function renderGameComponent({
  appEl,
  allCards,
  renderStartComponent,
  choosedDifficultyLevel,
}) {
  if (renderStartComponent) {
    const getPresetCards = () => {
      let amount;
      let difficultyLevelInt = parseFloat(choosedDifficultyLevel);
      if (difficultyLevelInt === 1) {
        amount = 3;
      } else if (difficultyLevelInt === 2) {
        amount = 6;
      } else if (difficultyLevelInt === 3) {
        amount = 9;
      }

      const resultPresetCards = [];
      const maxIndex = allCards.length - 1;

      if (amount !== undefined) {
        for (let i = 0; i < amount; i++) {
          const randomIndex = Math.floor(Math.random() * (maxIndex + 1));
          const selectedCard = allCards[randomIndex];
          if (selectedCard) {
            resultPresetCards.push(selectedCard, selectedCard);
          }
        }
      }
      let shuffledPresetCards = _.shuffle(resultPresetCards);
      return shuffledPresetCards;
    };
    const presetCards = getPresetCards();
    console.log("Сгенерированные карты:", presetCards);

    const renderGameApp = () => {
      const presetCardsHtml = presetCards
        .map((card) => {
          return `
            <button class="cards">
                <img src="${card.image}" class="cards-image">
            </button>
            `;
        })
        .join("");

      const appHtml = `
        <div class="window-game">
            <div class="header-bar">
                <div class="timer-box">
                    <div class="time-box-up-line">
                        <p class="min-sec">min</p>
                        <p class="min-sec">sek</p>
                    </div>
                    <p class="timer">00.00</p>
                </div>
                <button class="button-start-again">Начать заново</button>
            </div>
            <div class="card-field -level-${choosedDifficultyLevel}">
                ${presetCardsHtml}
            </div>
        </div>
        `;

      appEl.innerHTML = appHtml;
    };
    renderGameApp();

    const startAgainButtonEl = document.querySelector(
      'button[class="button-start-again"]'
    );
    startAgainButtonEl.addEventListener("click", () => {
      renderStartComponent({ appEl, choosedDifficultyLevel });
    });

    const turnFaceDownCards = () => {
      for (let cardEl of document.querySelectorAll('button[class="cards"]')) {
        cardEl.innerHTML = `
        <img src="./assets/images/face-down.svg" class="cards-image">
        `;
      }
      return true;
    };
    setTimeout(turnFaceDownCards, 5000);
  }
}
