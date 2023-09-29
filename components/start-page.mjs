import {
  saveLevelToLocalStorage,
  getLevelFromLocalStorage,
} from "../localStorage.mjs";
import { renderGameComponent } from "./game-page.mjs";
import { allCards } from "../cards.mjs";

export function renderStartComponent({ appEl, choosedDifficultyLevel }) {
  const renderStartApp = () => {
    const appHtml = `<div class="window-start">
          <p class="window-start-message">Выбери сложность</p>
          <div class="window-start-checkbox">
            <div class="choose-difficulty-toolbar">
              <input
                type="radio"
                id="difficulty-level-1"
                name="difficulty-levels"
                value="1"
              />
              <label for="difficulty-level-1">1</label>
              <input
                type="radio"
                id="difficulty-level-2"
                name="difficulty-levels"
                value="2"
              />
              <label for="difficulty-level-2">2</label>
              <input
                type="radio"
                id="difficulty-level-3"
                name="difficulty-levels"
                value="3"
              />
              <label for="difficulty-level-3">3</label>
            </div>
          </div>
          <button class="window-start-button">Старт</button>
        </div>`;
    appEl.innerHTML = appHtml;
  };

  renderStartApp();

  const radioInputs = document.querySelectorAll(
    'input[type="radio"][name="difficulty-levels"]'
  );

  function handleRadioChange(event) {
    choosedDifficultyLevel = event.target.value;
    saveLevelToLocalStorage(choosedDifficultyLevel);
  }

  radioInputs.forEach((input) => {
    input.addEventListener("change", handleRadioChange);
  });

  const startButtonEl = document.querySelector(
    'button[class="window-start-button"]'
  );

  startButtonEl.addEventListener("click", () => {
    // console.log(
    //   "уровень сложности из start-page:",
    //   getLevelFromLocalStorage(choosedDifficultyLevel)
    // );
    if (choosedDifficultyLevel !== null) {
        renderGameComponent({ appEl, allCards, renderStartComponent, choosedDifficultyLevel });
    }
    else {
        console.log("Выберите уровень сложности перед началом игры.");
    }
    // return getLevelFromLocalStorage(choosedDifficultyLevel);
  });
}
