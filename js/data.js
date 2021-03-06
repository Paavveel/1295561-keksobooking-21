'use strict';

const MAPPIN_HEIGHT = 70;
const MAPPIN_WIDTH = 50;
const MAPPIN_CENTER = MAPPIN_WIDTH / 2;
const MAX_PINS = 5;
const MAIN_ARROW_HEIGHT = 16;
const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
let pinMainX;
let pinMainY;
let typeOfHouse = `flat`;
let typeOfRoom = `1`;
const map = document.querySelector(`.map`);
const main = document.querySelector(`main`);

const hotelType = {
  'bungalow': `Бунгало`,
  'flat': `Квартира`,
  'house': `Дом`,
  'palace': `Дворец`
};

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

const StatusCode = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404
};


window.data = {
  map,
  main,
  hotelType,
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
  StatusCode,
  pinMainX,
  pinMainY
};

