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
const TYPES_HOTEL = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};
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

const KEY_ENTER = `Enter`;
const KEY_ESCAPE = `Escape`;

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


const hotelTemplate = document.querySelector(`#pin`);
const mapPins = document.querySelector(`.map__pins`);

// функция рендеринга метки объявления
function renderPins(index) {
  const hotelElement = hotelTemplate.content.cloneNode(true);
  const mapPin = hotelElement.querySelector(`.map__pin`);
  const hotelAvatar = mapPin.querySelector(`img`);

  hotelAvatar.src = HOTELS[index].author.avatar;
  hotelAvatar.alt = HOTELS[index].offer.title;
  mapPin.style.cssText = `left: ${HOTELS[index].location.x - MAPPIN_CENTER}px; top: ${HOTELS[index].location.y - MAPPIN_HEIGHT}px;`;

  mapPin.addEventListener(`click`, function () {
    const prevCard = document.querySelector(`.map__card`);
    if (prevCard) {
      prevCard.remove(); // удаляем модальное окно с информацией об объявлении, если есть
    }
    renderCard(index); // передаем данные, конкретного блока которые можно отрисовать

  });

  return hotelElement;
}

function renderFragmentMapPins() {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < HOTELS.length; i++) {
    fragment.appendChild(renderPins(i));
  }
  return mapPins.appendChild(fragment);
}


// Личный проект: больше деталей (часть 2)

const cardTemplate = document.querySelector(`#card`);
// функция рендеринга карточки
function renderCard(index) {
  let cardElement = cardTemplate.content.querySelector(`.map__card`).cloneNode(true);
  cardElement.querySelector(`.popup__title`).textContent = HOTELS[index].offer.title;
  cardElement.querySelector(`.popup__text--address`).textContent = HOTELS[index].offer.address;
  cardElement.querySelector(`.popup__text--price`).textContent = `${HOTELS[index].offer.price} ₽/ночь`;
  cardElement.querySelector(`.popup__type`).textContent = HOTELS[index].offer.type;
  cardElement.querySelector(`.popup__text--capacity`).textContent = `${HOTELS[index].offer.rooms} комнаты для ${HOTELS[index].offer.guests} гостей`;
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${HOTELS[index].offer.checkin}, выезд до ${HOTELS[index].offer.checkout}`;

  const cardFeatures = cardElement.querySelector(`.popup__features`);

  // вывод доступных удобств
  while (cardFeatures.firstChild) {
    cardFeatures.removeChild(cardFeatures.firstChild);
  }

  for (let i = 0; i < HOTELS[index].offer.features.length; i++) {
    let item = document.createElement(`li`);
    item.classList.add(`popup__feature`);
    item.classList.add(`popup__feature--${HOTELS[index].offer.features[i]}`);
    cardFeatures.appendChild(item);
  }

  cardElement.querySelector(`.popup__description`).textContent = HOTELS[index].offer.description;

  const cardPhotos = cardElement.querySelector(`.popup__photos`);

  // добавление фотографий
  const img = cardPhotos.querySelector(`.popup__photo`);
  cardPhotos.removeChild(img);

  let insertedImg;
  for (let j = 0; j < HOTELS[index].offer.photos.length; j++) {
    insertedImg = img.cloneNode(true);
    insertedImg.src = HOTELS[index].offer.photos[j];
    cardPhotos.appendChild(insertedImg);
  }

  cardElement.querySelector(`.popup__avatar`).src = HOTELS[index].author.avatar;

  const buttonClose = cardElement.querySelector(`.popup__close`); // закрытие по нажатию иконки закрытия

  buttonClose.addEventListener(`click`, function () {
    cardElement.remove();
  });

  buttonClose.addEventListener(`keydown`, function (evt) { // закрытие окна по нажатию кнопки ENTER, когда кнопка закрытия в фокусе
    if (evt.key === KEY_ENTER) {
      cardElement.remove();
    }
  });

  document.addEventListener(`keydown`, function (evt) { // закрытие окна по нажатию кнопки ESCAPE
    if (evt.key === KEY_ESCAPE) {
      evt.preventDefault();
      cardElement.remove();
    }
  });

  map.appendChild(cardElement);
}


// Личный проект: доверяй, но проверяй (часть 1)

const adForm = document.querySelector(`.ad-form`);
const disabledFormElements = document.querySelectorAll(`.ad-form fieldset, .map__filters select, .map__filters fieldset`);

const mapPinMain = document.querySelector(`.map__pin--main`);
const resetButton = document.querySelector(`.ad-form__reset`);

const addAttribute = function (elements, attribute) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].setAttribute(attribute, ``);
  }
};

const removeAttribute = function (elements, attribute) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].removeAttribute(attribute, ``);
  }
};

const disableElements = function () {
  addAttribute(disabledFormElements, `disabled`);
};

const showElements = function () {
  removeAttribute(disabledFormElements, `disabled`);
  renderCard(0);
};

function resetForms() {
  const forms = document.querySelectorAll(`form`);
  for (let i = 0; i < forms.length; i++) {
    forms[i].reset();
  }
}

disableElements(); // по дефолту запущена

// Активация страницы
const activatePage = function () {
  getHotelArray();
  renderFragmentMapPins();
  showElements();
  adForm.classList.remove(`ad-form--disabled`);
  map.classList.remove(`map--faded`);
  mapPinMain.setAttribute(`disabled`, ``);
  setCoordinates(true);
};


function mapPinMainClick(evt) {
  if (evt.button === 0 || evt.key === KEY_ENTER) {
    evt.preventDefault();
    activatePage();
  }
}

mapPinMain.addEventListener(`click`, function (evt) {
  mapPinMainClick(evt);
});

function removePins() {
  const pins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  pins.forEach(function (pin) {
    pin.remove();
  });
}

resetButton.addEventListener(`click`, function () {
  resetForms();
  disableElements();
  removePins();
  adForm.classList.add(`ad-form--disabled`);
  map.classList.add(`map--faded`);
  setCoordinates(false);
  const prevCard = document.querySelector(`.map__card`);
  if (prevCard) {
    prevCard.remove(); // удаляем модальное окно с информацией об объявлении, если есть
  }
  mapPinMain.removeAttribute(`disabled`, ``);
});

// Заполнение поля адреса
const inputAddress = document.querySelector(`#address`);

const MAIN_ARROW_HEIGHT = 16;


function setCoordinates(isPageActive) {
  const distanceLeft = mapPinMain.offsetLeft;
  const distanseTop = mapPinMain.offsetTop;
  const height = mapPinMain.clientWidth;
  const width = mapPinMain.clientHeight;
  const mainPinX = Math.round(distanceLeft + width / 2);
  const mainPinY = isPageActive ? Math.round(distanseTop + height + MAIN_ARROW_HEIGHT) : Math.round(distanseTop + height / 2);

  inputAddress.value = `${mainPinX}, ${mainPinY}`;
}

setCoordinates(false);

// Непростая валидация

const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const inputTitle = document.querySelector(`#title`);

inputTitle.addEventListener(`input`, function (evt) {
  const valueLength = evt.target.value.length;
  if (evt.target.validity.valueMissing) {
    evt.target.setCustomValidity(`Обязательное поле`);
  } else if (valueLength < MIN_NAME_LENGTH) {
    evt.target.setCustomValidity(`Ещё ${MIN_NAME_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    evt.target.setCustomValidity(`Удалите лишние ${valueLength - MAX_NAME_LENGTH} симв.`);
  } else {
    evt.target.setCustomValidity(``);
  }
  evt.target.reportValidity();
});

const inputPrice = document.querySelector(`#price`);
const selectType = document.querySelector(`#type`);
let typeOfHouse = `flat`;

const priceOfType = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

let priceValidation = function (target) {
  const value = target.value;
  if (target.validity.valueMissing) {
    target.setCustomValidity(`Обязательное поле`);
  } else if (value < priceOfType[typeOfHouse]) {
    target.setCustomValidity(`Минимальная цена ${priceOfType[typeOfHouse]}`);
  } else if (value > 1000000) {
    target.setCustomValidity(`Максимальная цена 1000000`);
  } else {
    target.setCustomValidity(``);
  }
  target.reportValidity();
};

inputPrice.addEventListener(`input`, function (evt) {
  priceValidation(evt.target);
});

selectType.addEventListener(`change`, function (evt) {
  typeOfHouse = evt.target.value;
  inputPrice.placeholder = priceOfType[evt.target.value];
  priceValidation(inputPrice);
});

const roomNumber = document.querySelector(`#room_number`);
const capacity = document.querySelector(`#capacity`);

const guestCapacity = {
  '1': [`1`],
  '2': [`1`, `2`],
  '3': [`1`, `2`, `3`],
  '100': [`0`]
};

let typeOfRoom = `1`;

const guestValidation = {
  '1': `Только на одного гостя`,
  '2': `Только на одного или двух гостей`,
  '3': `Только на одного, двух или трех гостей`,
  '100': `Только не для гостей`
};

const typeOfCapacity = function (target) {
  const value = target.value;
  const isValid = guestCapacity[typeOfRoom].some(function (element) {
    return element === value;
  });
  if (!isValid) {
    target.setCustomValidity(guestValidation[typeOfRoom]);
  } else {
    target.setCustomValidity(``);
  }
  target.reportValidity();
};

roomNumber.addEventListener(`change`, function (evt) {
  typeOfRoom = evt.target.value;
  typeOfCapacity(capacity);
});

capacity.addEventListener(`change`, function (evt) {
  typeOfCapacity(evt.target);
});

const timeIn = document.querySelector(`#timein`);
const timeOut = document.querySelector(`#timeout`);

timeOut.addEventListener(`change`, function () {
  timeIn.value = timeOut.value;
});
timeIn.addEventListener(`change`, function () {
  timeOut.value = timeIn.value;
});
