"use strict";
// Личный проект: больше деталей (часть 1)

const typesHotel = [`palace`, `flat`, `house`, `bungalow`];
const timeCheckIn = [`12:00`, `13:00`, `14:00`];
const timeCheckOut = [`12:00`, `13:00`, `14:00`];
const features = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`,
];
const addressImages = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`,
];
const amountOfObjects = 8;
const yCoordinateFrom = 130;
const yCoordinateTo = 630;
const map = document.querySelector(`.map`);
const xCoordinateTo = map.offsetWidth;
const mapPinHeight = 70;
const mapPinWidth = 50;
const mapPinCenter = mapPinWidth / 2;
const hotels = getHotelArray();

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomArr(arr) {
  let randomArrLength = getRandomNumber(1, arr.length + 1);

  return arr.slice(0, randomArrLength);
}

function returnsRandomData(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getCoordinateX() {
  return getRandomNumber(mapPinWidth, xCoordinateTo - mapPinWidth);
}

function getCoordinateY() {
  return getRandomNumber(yCoordinateFrom, yCoordinateTo);
}

function getHotel(index) {
  let X = getCoordinateX();
  let Y = getCoordinateY();

  return {
    author: {
      avatar: `img/avatars/user0${index}.png`,
    },
    offer: {
      title: `Заголовок объявления`,
      address: `${X}, ${Y}`,
      price: 100,
      type: returnsRandomData(typesHotel),
      rooms: 100,
      guests: 100,
      checkin: returnsRandomData(timeCheckIn),
      checkout: returnsRandomData(timeCheckOut),
      features: getRandomArr(features),
      description: `Описание объявления`,
      photos: returnsRandomData(addressImages),
    },
    location: {
      x: X,
      y: Y,
    },
  };
}

function getHotelArray() {
  const array = [];
  for (let i = 1; i < amountOfObjects + 1; i++) {
    array.push(getHotel(i));
  }
  return array;
}

map.classList.remove(`map--faded`);
const mapPins = document.querySelector(`.map__pins`);
const hotelTemplate = document
  .querySelector(`#pin`)
  .content.querySelector(`.map__pin`);

hotels.forEach(function (item, i) {
  const hotelElement = hotelTemplate.cloneNode(true);
  const hotelAvatar = document.querySelector(`img`);
  hotelElement.style.left = hotels[i].location.x - mapPinCenter + `px`;

  hotelElement.style.top = hotels[i].location.y - mapPinHeight + `px`;
  hotelAvatar.src = hotels[i].author.avatar;
  hotelAvatar.alt = hotels[i].offer.title;

  const hotelFragment = document.createDocumentFragment();
  hotelFragment.appendChild(hotelElement);
  mapPins.appendChild(hotelFragment);
});
