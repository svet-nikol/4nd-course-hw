export function saveLevelToLocalStorage(choosedDifficultyLevel: string) {
  window.localStorage.setItem(
    "choosedDifficultyLevel",
    JSON.stringify(choosedDifficultyLevel),
  );
}

// export function getLevelFromLocalStorage(choosedDifficultyLevel) {
//   try {
//     return JSON.parse(window.localStorage.getItem("choosedDifficultyLevel"));
//   } catch (error) {
//     return null;
//   }
// }
