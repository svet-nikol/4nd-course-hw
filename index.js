import { renderStartComponent } from "./components/start-page.js";

export const appEl = document.getElementById("app");
export let choosedDifficultyLevel = null;

renderStartComponent({ appEl, choosedDifficultyLevel });
