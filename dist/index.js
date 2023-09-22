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

eval("let choosedDifficultyLevel = null;\r\n\r\nconst renderApp = () => {\r\n  const appEl = document.getElementById(\"app\");\r\n  const appHtml = `<div class=\"window-start\">\r\n    <p class=\"window-start-message\">Выбери сложность</p>\r\n\r\n    <div class=\"window-start-checkbox\">\r\n      <div class=\"choose-difficulty-toolbar\">\r\n        <input\r\n          type=\"radio\"\r\n          id=\"difficulty-level-1\"\r\n          name=\"difficulty-levels\"\r\n          value=\"1\"\r\n        />\r\n        <label for=\"difficulty-level-1\">1</label>\r\n\r\n        <input\r\n          type=\"radio\"\r\n          id=\"difficulty-level-2\"\r\n          name=\"difficulty-levels\"\r\n          value=\"2\"\r\n        />\r\n        <label for=\"difficulty-level-2\">2</label>\r\n\r\n        <input\r\n          type=\"radio\"\r\n          id=\"difficulty-level-3\"\r\n          name=\"difficulty-levels\"\r\n          value=\"3\"\r\n        />\r\n        <label for=\"difficulty-level-3\">3</label>\r\n      </div>\r\n    </div>\r\n\r\n    <button class=\"window-start-button\">Старт</button>\r\n  </div>`;\r\n  appEl.innerHTML = appHtml;\r\n};\r\n\r\nrenderApp();\r\n\r\nconst radioInputs = document.querySelectorAll(\r\n  'input[type=\"radio\"][name=\"difficulty-levels\"]'\r\n);\r\n\r\nfunction handleRadioChange(event) {\r\n  choosedDifficultyLevel = event.target.value;\r\n  //   console.log(\"Выбран уровень сложности:\", choosedDifficultyLevel);\r\n  saveLevelToLocalStorage(choosedDifficultyLevel);\r\n}\r\n\r\nradioInputs.forEach((input) => {\r\n  input.addEventListener(\"change\", handleRadioChange);\r\n});\r\n\r\nfunction saveLevelToLocalStorage(choosedDifficultyLevel) {\r\n  window.localStorage.setItem(\r\n    \"choosedDifficultyLevel\",\r\n    JSON.stringify(choosedDifficultyLevel)\r\n  );\r\n}\r\n\r\nfunction getUserFromLocalStorage(choosedDifficultyLevel) {\r\n  try {\r\n    return JSON.parse(window.localStorage.getItem(\"choosedDifficultyLevel\"));\r\n  } catch (error) {\r\n    return null;\r\n  }\r\n}\r\n\r\nconst startButtonEl = document.querySelector(\r\n  'button[class=\"window-start-button\"]'\r\n);\r\nstartButtonEl.addEventListener(\"click\", () => {\r\n  console.log(\r\n    \"Теперь из локал сторадж:\",\r\n    getUserFromLocalStorage(choosedDifficultyLevel)\r\n  );\r\n  alert(\r\n    `Выбран уровень сложности: ${getUserFromLocalStorage(\r\n      choosedDifficultyLevel\r\n    )}`\r\n  );\r\n});\r\n\n\n//# sourceURL=webpack://4nd-course-hw/./index.js?");

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