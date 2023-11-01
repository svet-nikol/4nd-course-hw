import { renderStartComponent } from "./components/start-page.js";

export const appEl: HTMLElement = document.getElementById("app");
export let choosedDifficultyLevel: string = '';

renderStartComponent({ appEl, choosedDifficultyLevel });
