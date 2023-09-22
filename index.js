let choosedDifficultyLevel = null;

const renderApp = () => {
  const appEl = document.getElementById("app");
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

renderApp();

const radioInputs = document.querySelectorAll(
  'input[type="radio"][name="difficulty-levels"]',
);

function handleRadioChange(event) {
  choosedDifficultyLevel = event.target.value;
  //   console.log("Выбран уровень сложности:", choosedDifficultyLevel);
  saveLevelToLocalStorage(choosedDifficultyLevel);
}

radioInputs.forEach((input) => {
  input.addEventListener("change", handleRadioChange);
});

function saveLevelToLocalStorage(choosedDifficultyLevel) {
  window.localStorage.setItem(
    "choosedDifficultyLevel",
    JSON.stringify(choosedDifficultyLevel),
  );
}

function getUserFromLocalStorage(choosedDifficultyLevel) {
  try {
    return JSON.parse(window.localStorage.getItem("choosedDifficultyLevel"));
  } catch (error) {
    return null;
  }
}

const startButtonEl = document.querySelector(
  'button[class="window-start-button"]',
);
startButtonEl.addEventListener("click", () => {
  console.log(
    "Теперь из локал сторадж:",
    getUserFromLocalStorage(choosedDifficultyLevel),
  );
  alert(
    `Выбран уровень сложности: ${getUserFromLocalStorage(
      choosedDifficultyLevel,
    )}`,
  );
});
