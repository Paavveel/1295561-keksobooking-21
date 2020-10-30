'use strict';

(function () {
  const TYPES_HOTEL = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`
  };

  const TITLES = [
    `Живописное место в центре города`,
    `Уютное место для всей семьи`,
    `Отличное жилье в спокойном районе`,
    `Комфортабельное место в самом сердце города`,
  ];
  const PRICES = [2500, 3000, 3500, 4000];
  const ROOMS = [1, 2, 3];
  const GUESTS = [1, 2, 3, 5];
  const DESCRIPTIONS = [
    `Прекрасный вариант для путешественников, любящих природу, но при этом желающих находиться в комфортной близости от достопримечательностей`,
    `Апартаменты находятся на втором этаже двухэтажного жилого модуля, со своим отдельным входом.`,
    `Есть все необходимое для отличного времяпрепровождения`,
  ];

  const TIME_CHECK_IN = [`12:00`, `13:00`, `14:00`];
  const TIME_CHECK_OUT = [`12:00`, `13:00`, `14:00`];
  const FEATURES = [
    `wifi`,
    `dishwasher`,
    `parking`,
    `washer`,
    `elevator`,
    `conditioner`,
  ];
  const ADRESS_IMAGES = [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`,
  ];
  const map = document.querySelector(`.map`);
  const AMOUNT_OF_OBJECTS = 8;
  const YCOORDINATE_FROM = 130;
  const YCOORDINATE_TO = 630;
  const XCOORDINATE_TO = map.offsetWidth;

  const MAPPIN_HEIGHT = 70;
  const MAPPIN_WIDTH = 50;
  const MAPPIN_CENTER = MAPPIN_WIDTH / 2;

  const getRandomNumber = window.util.getRandomNumber;
  const returnsRandomData = window.util.returnsRandomData;
  const getRandomArr = window.util.getRandomArr;

  const HOTELS = getHotelArray();

  function getCoordinateX() {
    return getRandomNumber(MAPPIN_WIDTH, XCOORDINATE_TO - MAPPIN_WIDTH);
  }

  function getCoordinateY() {
    return getRandomNumber(YCOORDINATE_FROM, YCOORDINATE_TO);
  }

  function getHotel(index) {
    let X = getCoordinateX();
    let Y = getCoordinateY();

    return {
      author: {
        avatar: `img/avatars/user0${index}.png`,
      },
      offer: {
        title: returnsRandomData(TITLES),
        address: `${X}, ${Y}`,
        price: returnsRandomData(PRICES),
        type: returnsRandomData(Object.values(TYPES_HOTEL)),
        rooms: returnsRandomData(ROOMS),
        guests: returnsRandomData(GUESTS),
        checkin: returnsRandomData(TIME_CHECK_IN),
        checkout: returnsRandomData(TIME_CHECK_OUT),
        features: getRandomArr(FEATURES),
        description: returnsRandomData(DESCRIPTIONS),
        photos: getRandomArr(ADRESS_IMAGES),
      },
      location: {
        x: X,
        y: Y,
      },
    };
  }

  function getHotelArray() {
    const array = [];
    for (let i = 0; i < AMOUNT_OF_OBJECTS; i++) {
      array.push(getHotel(i + 1));
    }
    return array;
  }

  window.data = {
    TYPES_HOTEL,
    TITLES,
    PRICES,
    ROOMS,
    GUESTS,
    DESCRIPTIONS,
    TIME_CHECK_IN,
    TIME_CHECK_OUT,
    FEATURES,
    ADRESS_IMAGES,
    HOTELS,
    getHotel,
    getHotelArray,
    map,
    MAPPIN_HEIGHT,
    MAPPIN_WIDTH,
    MAPPIN_CENTER
  };

})();