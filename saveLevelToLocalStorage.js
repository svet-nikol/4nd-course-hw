export function saveLevelToLocalStorage(choosedDifficultyLevel) {
  window.localStorage.setItem(
    "choosedDifficultyLevel",
    JSON.stringify(choosedDifficultyLevel),
  );
}
