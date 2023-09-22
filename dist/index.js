/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ (() => {

eval("let choosedDifficultyLevel = null;\nconst renderApp = () => {\n  const appEl = document.getElementById(\"app\");\n  const appHtml = `<div class=\"window-start\">\n    <p class=\"window-start-message\">Выбери сложность</p>\n    <div class=\"window-start-checkbox\">\n      <div class=\"choose-difficulty-toolbar\">\n        <input\n          type=\"radio\"\n          id=\"difficulty-level-1\"\n          name=\"difficulty-levels\"\n          value=\"1\"\n        />\n        <label for=\"difficulty-level-1\">1</label>\n        <input\n          type=\"radio\"\n          id=\"difficulty-level-2\"\n          name=\"difficulty-levels\"\n          value=\"2\"\n        />\n        <label for=\"difficulty-level-2\">2</label>\n        <input\n          type=\"radio\"\n          id=\"difficulty-level-3\"\n          name=\"difficulty-levels\"\n          value=\"3\"\n        />\n        <label for=\"difficulty-level-3\">3</label>\n      </div>\n    </div>\n    <button class=\"window-start-button\">Старт</button>\n  </div>`;\n  appEl.innerHTML = appHtml;\n};\n\nrenderApp();\n\nconst radioInputs = document.querySelectorAll(\n  'input[type=\"radio\"][name=\"difficulty-levels\"]',\n);\n\nfunction handleRadioChange(event) {\n  choosedDifficultyLevel = event.target.value;\n  //   console.log(\"Выбран уровень сложности:\", choosedDifficultyLevel);\n  saveLevelToLocalStorage(choosedDifficultyLevel);\n}\n\nradioInputs.forEach((input) => {\n  input.addEventListener(\"change\", handleRadioChange);\n});\n\nfunction saveLevelToLocalStorage(choosedDifficultyLevel) {\n  window.localStorage.setItem(\n    \"choosedDifficultyLevel\",\n    JSON.stringify(choosedDifficultyLevel),\n  );\n}\n\nfunction getUserFromLocalStorage(choosedDifficultyLevel) {\n  try {\n    return JSON.parse(window.localStorage.getItem(\"choosedDifficultyLevel\"));\n  } catch (error) {\n    return null;\n  }\n}\n\nconst startButtonEl = document.querySelector(\n  'button[class=\"window-start-button\"]',\n);\nstartButtonEl.addEventListener(\"click\", () => {\n  console.log(\n    \"Теперь из локал сторадж:\",\n    getUserFromLocalStorage(choosedDifficultyLevel),\n  );\n  alert(\n    `Выбран уровень сложности: ${getUserFromLocalStorage(\n      choosedDifficultyLevel,\n    )}`,\n  );\n});\n\n\n//# sourceURL=webpack://4nd-course-hw/./index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./index.js"]();
/******/ 	
/******/ })()
;