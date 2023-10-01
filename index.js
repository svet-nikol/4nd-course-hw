import { renderStartComponent } from "./components/start-page.js";
// import { renderGameComponent } from "./components/game-page.mjs";

// const selectedCard = allCardsResult[10];
// const imageElement = document.createElement("img");
// imageElement.src = selectedCard.image;
// document.body.appendChild(imageElement);

export const appEl = document.getElementById("app");
export let choosedDifficultyLevel = null;

renderStartComponent({ appEl, choosedDifficultyLevel });
