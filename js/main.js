"use strict";
// Личный проект: больше деталей (часть 1)
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
const TYPES_HOTEL = [`palace`, `flat`, `house`, `bungalow`];
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

const AMOUNT_OF_OBJECTS = 8;
const YCOORDINATE_FROM = 130;
const YCOORDINATE_TO = 630;
const MAPPIN_HEIGHT = 70;
const MAPPIN_WIDTH = 50;
const MAPPIN_CENTER = MAPPIN_WIDTH / 2;
const map = document.querySelector(`.map`);
const XCOORDINATE_TO = map.offsetWidth;

const HOTELS = getHotelArray();

function getRandomNumber(minValue, maxValue) {
  let min = Math.ceil(minValue);
  let max = Math.floor(maxValue);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArr(arr) {
  let randomArrLength = getRandomNumber(1, arr.length);

  return arr.slice(0, randomArrLength);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function returnsRandomData(arr) {
  return arr[getRandomInt(arr.length)];
}

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
      type: returnsRandomData(TYPES_HOTEL),
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

map.classList.remove(`map--faded`);
const hotelTemplate = document.querySelector(`#pin`);
const mapPins = document.querySelector(`.map__pins`);

function renderMapPin(item) {
  const hotelElement = hotelTemplate.content.cloneNode(true);
  const mapPin = hotelElement.querySelector(`.map__pin`);
  const hotelAvatar = mapPin.querySelector(`img`);

  hotelAvatar.src = item.author.avatar;
  hotelAvatar.alt = item.offer.title;
  mapPin.style.cssText = `left: ${item.location.x - MAPPIN_CENTER}px; top: ${item.location.y - MAPPIN_HEIGHT}px;`;
  return hotelElement;
}

function renderFragmentMapPins() {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < HOTELS.length; i++) {
    fragment.appendChild(renderMapPin(HOTELS[i]));
  }
  return mapPins.appendChild(fragment);
}
renderFragmentMapPins();

// Личный проект: больше деталей (часть 2)

const cardTemplate = document.querySelector(`#card`);

const firstCard = HOTELS[0];

function renderCard() {
  let cardElement = cardTemplate.content.cloneNode(true);
  cardElement.querySelector(`.popup__title`).textContent = firstCard.offer.title;
  cardElement.querySelector(`.popup__text--address`).textContent = firstCard.offer.address;
  cardElement.querySelector(`.popup__text--price`).textContent = `${firstCard.offer.price} ₽/ночь`;
  cardElement.querySelector(`.popup__type`).textContent = firstCard.offer.type;
  cardElement.querySelector(`.popup__text--capacity`).textContent = `${firstCard.offer.rooms} комнаты для ${firstCard.offer.guests} гостей`;
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${firstCard.offer.checkin}, выезд до ${firstCard.offer.checkout}`;

  const cardFeatures = cardElement.querySelector(`.popup__features`);

  // вывод доступных удобств
  while (cardFeatures.firstChild) {
    cardFeatures.removeChild(cardFeatures.firstChild);
  }

  for (let i = 0; i < firstCard.offer.features.length; i++) {
    let item = document.createElement(`li`);
    item.classList.add(`popup__feature`);
    item.classList.add(`popup__feature--${firstCard.offer.features[i]}`);
    cardFeatures.appendChild(item);
  }

  cardElement.querySelector(`.popup__description`).textContent =
    firstCard.offer.description;

  const cardPhotos = cardElement.querySelector(`.popup__photos`);

  // добавление фотографий
  const img = cardPhotos.querySelector(`.popup__photo`);
  cardPhotos.removeChild(img);

  let insertedImg;
  for (let j = 0; j < firstCard.offer.photos.length; j++) {
    insertedImg = img.cloneNode(true);
    insertedImg.src = firstCard.offer.photos[j];
    cardPhotos.appendChild(insertedImg);
  }

  cardElement.querySelector(`.popup__avatar`).src = firstCard.author.avatar;

  return cardElement;
}

// функция вставки карточки в DOM
function insertCard() {
  const mapFiltersContainer = map.querySelector(`.map__filters-container`);
  map.insertBefore(renderCard(), mapFiltersContainer);
}
insertCard();
