export function renderFinalComponent({
  appEl,
  timerContent,
  userWin,
  renderStartComponent,
  choosedDifficultyLevel,
}: {
  appEl: HTMLElement;
  timerContent: string;
  userWin: boolean;
  renderStartComponent: (args: {
    appEl: HTMLElement;
    choosedDifficultyLevel: string;
  }) => void;
  choosedDifficultyLevel: string;
}) {
  if (appEl) {
    const renderFinaltApp = () => {
      const windowResultGame = document.createElement("div");
      appEl.appendChild(windowResultGame);
      windowResultGame.className = "window-final";
      windowResultGame.innerHTML = `
        <img src="./static/images/${userWin ? "celebration-pic.svg" : "fail-pic.svg"}" class="window-final-message-image">
        <p class="window-final-message">${userWin ? 'Вы выиграли!' : 'Вы проиграли!'}</p>
        <p class="window-final-text">Затраченное время:</p>
        <p class="window-final-time">${timerContent}</p>
        <button class="button-window-final">Играть снова</button>
      `;
      const windowResultBcg = document.createElement("div");
      appEl.appendChild(windowResultBcg);
      windowResultBcg.className = "window-final-bcg";
    };
    renderFinaltApp();
    const startAgainButtonEl = document.querySelector(
      'button[class="button-window-final"]'
    ) as HTMLButtonElement;;
    if (startAgainButtonEl !== null) {
      startAgainButtonEl.addEventListener("click", () => {
        renderStartComponent({ appEl, choosedDifficultyLevel });
      });
    }
  } else {
    console.error("Элемент не найден");
  }
}
