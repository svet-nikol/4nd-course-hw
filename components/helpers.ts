import * as _ from "lodash";
import { Card } from "../types";
import { presetCards } from "./game-page";

export const getPresetCards = ({
  allCards,
  choosedDifficultyLevel,
}: {
  allCards: Card[];
  choosedDifficultyLevel: string;
}) => {
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

export const turnFaceDownCards = (choosedDifficultyLevel: string) => {
  const cardEls = document.querySelectorAll('button[class="cards"]');
  cardEls.forEach((card) => {
    const element = card as HTMLButtonElement;
    element.innerHTML = `
    <img src="./static/images/face-down.svg" class="cards-image-level-${choosedDifficultyLevel}">
    `;
    element.disabled = false;
  });
  return true;
};

export const turnFaceUpCards = () => {
  const cardEls = document.querySelectorAll('button[class="cards"]');
  cardEls.forEach((card) => {
    const element = card as HTMLButtonElement;
    const dataIndex = (element as HTMLElement).getAttribute("data-index");
    if (dataIndex !== null) {
      const index: number = parseInt(dataIndex, 10);
      const theCard = presetCards[index];
      element.innerHTML = `
      <img src="./static/images/cards/${theCard.suit}/${theCard.rank}-${theCard.suit}.svg" class="cards-image">
      `;
      element.disabled = true;
    }
    return true;
  });
};

export const timerElRender = (timerContent: string) => {
  const timerEl = document.getElementById("timer");
  if (timerEl !== null) {
    timerEl.textContent = `${timerContent}`;
    return true;
  }
  return false;
};

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const remainingSeconds = time % 60;
  const formattedMinutes = _.padStart(minutes.toString(), 2, "0");
  const formattedSeconds = _.padStart(remainingSeconds.toString(), 2, "0");
  return `${formattedMinutes}.${formattedSeconds}`;
};
