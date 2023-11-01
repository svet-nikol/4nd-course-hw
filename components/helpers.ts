import * as _ from "lodash";
import { Card } from "../types";

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

export const turnFaceDownCards = () => {
  const cardEls = document.querySelectorAll('button[class="cards"]');
  cardEls.forEach((card) => {
    const element = card as HTMLButtonElement;
    element.innerHTML = `
    <img src="./static/images/face-down.svg" class="cards-image">
    `;
    element.disabled = false;
  })
  // for (let cardEl of document.querySelectorAll('button[class="cards"]')) {
  //   cardEl.innerHTML = `
  //   <img src="./static/images/face-down.svg" class="cards-image">
  //   `;
  //   cardEl.disabled = false;
  // }
  return true;
};

export const timerElRender = (timerContent: string) => {
  const timerEl = document.getElementById("timer");
  timerEl.textContent = `${timerContent}`;
  return true;
};

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const remainingSeconds = time % 60;
  const formattedMinutes = _.padStart(minutes.toString(), 2, "0");
  const formattedSeconds = _.padStart(remainingSeconds.toString(), 2, "0");
  return `${formattedMinutes}.${formattedSeconds}`;
};
