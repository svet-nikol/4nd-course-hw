// import { allCards } from "../cards.mjs";
// import { renderStartComponent } from "./start-page.mjs";
// import { choosedDifficultyLevel } from "../index.js";
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
    console.log("Сгенерированные карты:", getPresetCards());
  }
}
