import { renderStartComponent } from "./components/start-page";

export const appEl: HTMLElement | null = document.getElementById("app");
export let choosedDifficultyLevel: string = "";

if (appEl !== null) {
  renderStartComponent({ appEl, choosedDifficultyLevel });
}
