'use strict';

(function () {
  const TYPES_HOTEL = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`
  };

  const FEATURES = [
    `wifi`,
    `dishwasher`,
    `parking`,
    `washer`,
    `elevator`,
    `conditioner`,
  ];

  const map = document.querySelector(`.map`);
  const YCOORDINATE_FROM = 130;
  const YCOORDINATE_TO = 630;
  const XCOORDINATE_TO = map.offsetWidth;

  const MAPPIN_HEIGHT = 70;
  const MAPPIN_WIDTH = 50;
  const MAPPIN_CENTER = MAPPIN_WIDTH / 2;

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

  window.data = {
    TYPES_HOTEL,
    FEATURES,
    map,
    MAPPIN_HEIGHT,
    MAPPIN_WIDTH,
    MAPPIN_CENTER,
    guestCapacity,
    guestValidation,
    priceOfType,
    typeOfHouse,
    typeOfRoom,
    MAIN_ARROW_HEIGHT,
    MIN_NAME_LENGTH,
    MAX_NAME_LENGTH,
    getCoordinateX,
    getCoordinateY
  };

})();
