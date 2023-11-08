import {
  getPresetCards,
  turnFaceDownCards,
  timerElRender,
  formatTime,
} from "./helpers";
import { Card } from "../types";

export function renderGameComponent({
  appEl,
  allCards,
  renderStartComponent,
  choosedDifficultyLevel,
}: {
  appEl: HTMLElement;
  allCards: Card[];
  renderStartComponent: (args: {
    appEl: HTMLElement;
    choosedDifficultyLevel: string;
  }) => void;
  choosedDifficultyLevel: string;
}) {
  if (renderStartComponent) {
    const presetCards = getPresetCards({ allCards, choosedDifficultyLevel });
    let time = 0;
    let timerContent = formatTime(time);

    const renderGameApp = () => {
      const presetCardsHtml = presetCards
        .map((card: Card) => {
          return `
            <button class="cards" disabled="true">
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
                    <p class="timer" id="timer">00.00</p>
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
    if (startAgainButtonEl !== null) {
      startAgainButtonEl.addEventListener("click", () => {
        renderStartComponent({ appEl, choosedDifficultyLevel }); // { appEl, choosedDifficultyLevel }
      });
    }

    let intervalId: NodeJS.Timeout;
    const timer = () => {
      intervalId = setInterval(() => {
        time += 1;
        timerContent = formatTime(time);
        timerElRender(timerContent);
      }, 1000);
    };

    setTimeout(() => {
      turnFaceDownCards();
      timer();
    }, 5000);

    let clickedPairCards: number[] = [];
    let clickedAllCards: number[] = [];

    const pairCardsClick = (event: MouseEvent | TouchEvent) => {
      const clickedButton = (event.target as HTMLElement).parentNode as Element;
      const dataIndex = (clickedButton as HTMLElement).getAttribute(
        "data-index"
      );
      if (dataIndex !== null) {
        const index: number = parseInt(dataIndex, 10);
        const clickedCard = presetCards[index];

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

        // Если открыто две карты, сравниваем их
        if (clickedPairCards.length === 2) {
          const firstCard = presetCards[clickedPairCards[0]];
          const secondCard = presetCards[clickedPairCards[1]];

          if (
            firstCard.suit === secondCard.suit &&
            firstCard.rank === secondCard.rank
          ) {
            clickedPairCards = [];
            // Карты совпали, можно обнулить массив пары и продолжать игру
          } else {
            // Карты не совпали, показываем вторую карту и через одну секунду вызываем стартовое окно
            clearInterval(intervalId);
            setTimeout(() => {
              alert(`Вы проиграли! затраченное время: ${timerContent}`); // вторая карта не совпадает, выводится алерт и после вторая карта переворачивается
              renderStartComponent({ appEl, choosedDifficultyLevel }); // { appEl, choosedDifficultyLevel }
            }, 10); // через 1 секунду показываем экран старта
          }
        }

        if (clickedAllCards.length === presetCards.length) {
          clearInterval(intervalId);
          setTimeout(() => {
            alert(`Вы победили! затраченное время: ${timerContent}`);
            renderStartComponent({ appEl, choosedDifficultyLevel }); // { appEl, choosedDifficultyLevel }
          }, 1000);
        }
      }
    };

    // Добавляем обработчик события для каждой карты-кнопки чтобы карты переворачивались лицом вверх
    const cardButtons = document.querySelectorAll('button[class="cards"]');
    cardButtons.forEach((button, index) => {
      const element = button as HTMLButtonElement;
      element.dataset.index = index.toString(); // Сохраняем индекс карты в data-атрибут
      button.addEventListener("click", (event: Event) => {
        pairCardsClick(event as MouseEvent | TouchEvent);
      });
    });
  }
}
