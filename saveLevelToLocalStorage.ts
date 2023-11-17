export function saveLevelToLocalStorage(choosedDifficultyLevel: string) {
  window.localStorage.setItem(
    "choosedDifficultyLevel",
    JSON.stringify(choosedDifficultyLevel),
  );
}
