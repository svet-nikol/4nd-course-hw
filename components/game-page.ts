import {
  getPresetCards,
  turnFaceDownCards,
  turnFaceUpCards,
  timerElRender,
  formatTime,
} from "./helpers";
import { renderFinalComponent } from "./final-page";
import { Card } from "../types";

export let presetCards: Card[] = [];

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
    presetCards = getPresetCards({ allCards, choosedDifficultyLevel });
    let time = 0;
    let timeCountdown = 5;
    let timerContent = formatTime(time);
    let userWin: boolean = false;

    const renderGameApp = () => {
      const presetCardsHtml = presetCards
        .map((card: Card) => {
          return `
            <button class="cards" disabled="true">
                <img src="${card.image}" class="cards-image-level-${choosedDifficultyLevel}">
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
                    <p class="timer" id="timer">${formatTime(timeCountdown)}</p>
                </div>
                <button id="button-start-again" class="button-start-again-disabled" disabled="true">Начать заново</button>
            </div>
            <div class="card-field -level-${choosedDifficultyLevel}">
                ${presetCardsHtml}
            </div>
        </div>
        `;

      appEl.innerHTML = appHtml;
    };
    renderGameApp();

    const startAgainButtonEl = document.getElementById("button-start-again") as HTMLButtonElement;
    if (startAgainButtonEl !== null) {
      startAgainButtonEl.addEventListener("click", () => {
        clearInterval(intervalIdGame);
        renderStartComponent({ appEl, choosedDifficultyLevel });
      });
    }

    let intervalIdPregame: NodeJS.Timeout;
    const timerCountdown = () => {
      intervalIdPregame = setInterval(() => {
        timeCountdown -= 1;
        timerContent = formatTime(time=timeCountdown);
        timerElRender(timerContent);
      }, 1000);      
    }
    timerCountdown();

    let intervalIdGame: NodeJS.Timeout;
    const timer = () => {
      intervalIdGame = setInterval(() => {
        time += 1;
        timerContent = formatTime(time);
        timerElRender(timerContent);
      }, 1000);
    }

    setTimeout(() => {
      clearInterval(intervalIdPregame);
      turnFaceDownCards(choosedDifficultyLevel);
      timer();
      if (startAgainButtonEl !== null) {
        startAgainButtonEl.disabled = false;
        startAgainButtonEl.className = "button-start-again";
      }
    }, timeCountdown*1000);

    let clickedPairCards: number[] = [];
    let clickedAllCards: number[] = [];

    const pairCardsClick = (event: MouseEvent | TouchEvent) => {
      const clickedButton = (event.target as HTMLElement).parentNode as Element;
      const dataIndex = (clickedButton as HTMLElement).getAttribute(
        "data-index",
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
        <img src="./static/images/cards/${clickedCard.suit}/${clickedCard.rank}-${clickedCard.suit}.svg" class="cards-image-level-${choosedDifficultyLevel}">
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
            // Карты не совпали, переворачиваем все карты и через одну секунду вызываем окно с результатами
            clearInterval(intervalIdGame);
            turnFaceUpCards(choosedDifficultyLevel);
            setTimeout(() => {
              renderFinalComponent({
                appEl: appEl,
                timerContent: timerContent,
                userWin: userWin,
                renderStartComponent: renderStartComponent,
                choosedDifficultyLevel: choosedDifficultyLevel,
              });
            }, 1000);
          }
        }

        if (clickedAllCards.length === presetCards.length) {
          clearInterval(intervalIdGame);
          userWin = true;
          setTimeout(() => {
            renderFinalComponent({
              appEl: appEl,
              timerContent: timerContent,
              userWin: userWin,
              renderStartComponent: renderStartComponent,
              choosedDifficultyLevel: choosedDifficultyLevel,
            });
          }, 100);
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
