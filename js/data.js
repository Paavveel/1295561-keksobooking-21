'use strict';

const map = document.querySelector(`.map`);
const YCOORDINATE_FROM = 130;
const YCOORDINATE_TO = 630;
const XCOORDINATE_TO = map.offsetWidth;

const MAPPIN_HEIGHT = 70;
const MAPPIN_WIDTH = 50;
const MAPPIN_CENTER = MAPPIN_WIDTH / 2;
const MAX_PINS = 5;

const getRandomNumber = window.util.getRandomNumber;

function getCoordinateX() {
  return getRandomNumber(MAPPIN_WIDTH, XCOORDINATE_TO - MAPPIN_WIDTH);
}

function getCoordinateY() {
  return getRandomNumber(YCOORDINATE_FROM, YCOORDINATE_TO);
}

const guestCapacity = {
  '1': [`1`],
  '2': [`1`, `2`],
  '3': [`1`, `2`, `3`],
  '100': [`0`]
};

const guestValidation = {
  '1': `Только на одного гостя`,
  '2': `Только на одного или двух гостей`,
  '3': `Только на одного, двух или трех гостей`,
  '100': `Только не для гостей`
};

const priceOfType = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

let typeOfHouse = `flat`;
let typeOfRoom = `1`;
const MAIN_ARROW_HEIGHT = 16;
const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;

const blockMain = document.querySelector(`main`);

const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`); // шаблон
const popUpSuccess = successTemplate.cloneNode(true); // записываем шаблон в переменную
const fragment = document.createDocumentFragment(); // создаем фрагмент
fragment.appendChild(popUpSuccess);
blockMain.appendChild(fragment); // вставляем фрагмент в html
popUpSuccess.classList.add(`hidden`);


const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
const popUpError = errorTemplate.cloneNode(true);
fragment.appendChild(popUpError);
blockMain.appendChild(fragment);
popUpError.classList.add(`hidden`);

const TIMEOUT = 10000;
const StatusCode = {
  OK: 200,
  BadRequest: 400,
  Unauthorized: 401,
  NotFound: 404
};

let PIN_MAIN_X;
let PIN_MAIN_Y;

window.data = {
  map,
  MAPPIN_HEIGHT,
  MAPPIN_WIDTH,
  MAPPIN_CENTER,
  MAX_PINS,
  guestCapacity,
  guestValidation,
  priceOfType,
  typeOfHouse,
  typeOfRoom,
  MAIN_ARROW_HEIGHT,
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
  getCoordinateX,
  getCoordinateY,
  blockMain,
  popUpSuccess,
  popUpError,
  TIMEOUT,
  StatusCode,
  PIN_MAIN_X,
  PIN_MAIN_Y
};

