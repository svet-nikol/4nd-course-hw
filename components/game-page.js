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
      'button[class="button-start-again"]',
    );
    startAgainButtonEl.addEventListener("click", () => {
      renderStartComponent({ appEl, choosedDifficultyLevel });
    });

    const turnFaceDownCards = () => {
      for (let cardEl of document.querySelectorAll('button[class="cards"]')) {
        cardEl.innerHTML = `
        <img src="./static/images/face-down.svg" class="cards-image">
        `;
      }
      return true;
    };
    setTimeout(turnFaceDownCards, 5000);

    let clickedPairCards = [];
    let clickedAllCards = [];

    const pairCardsClick = (event) => {
      const clickedButton = event.target.parentNode;
      const index = clickedButton.getAttribute("data-index");
      const clickedCard = presetCards[index];
      console.log(clickedButton, clickedCard);

      // Если карта уже открыта, игнорируем нажатие
      if (clickedPairCards.includes(index)) {
        return;
      }

      // Открываем выбранную карту
      clickedButton.innerHTML = `
      <img src="./static/images/cards/${clickedCard.suit}/${clickedCard.rank}-${clickedCard.suit}.svg" class="cards-image">
      `;
      clickedPairCards.push(index);
      clickedAllCards.push(index);
      console.log(clickedPairCards, clickedAllCards);

      // Если открыто две карты, сравниваем их
      if (clickedPairCards.length === 2) {
        const firstCard = presetCards[clickedPairCards[0]];
        const secondCard = presetCards[clickedPairCards[1]];

        if (
          firstCard.suit === secondCard.suit &&
          firstCard.rank === secondCard.rank
        ) {
          // Карты совпали, можно обнулить массив пары и продолжать игру
          clickedPairCards = [];
        } else {
          // clickedPairCards = [];
          alert("Вы проиграли!"); // вторая карта не совпадает, выводится алерт и после вторая карта переворачивается
          // Карты не совпали, показываем вторую карту и через три секунды вызываем стартовое окно
          setTimeout(() => {
            renderStartComponent({ appEl, choosedDifficultyLevel });
          }, 1000); // через 3 секунды показываем экран старта
        }
      }

      if (clickedAllCards.length === presetCards.length) {
        alert("Вы победили!");
        renderStartComponent({ appEl, choosedDifficultyLevel });
      }
    };

    // Добавляем обработчик события для каждой кнопки
    const cardButtons = document.querySelectorAll('button[class="cards"]');
    cardButtons.forEach((button, index) => {
      button.dataset.index = index; // Сохраняем индекс карты в data-атрибут
      // console.log("кнопка с data-атрибутом:", button);
      button.addEventListener("click", pairCardsClick);
    });
  }
}
