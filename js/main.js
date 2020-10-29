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
  const currentHotel = HOTELS[index];

  hotelAvatar.src = currentHotel.author.avatar;
  hotelAvatar.alt = currentHotel.offer.title;
  mapPin.style.cssText = `left: ${currentHotel.location.x - MAPPIN_CENTER}px; top: ${currentHotel.location.y - MAPPIN_HEIGHT}px;`;
  mapPin.dataset.id = index;

  return hotelElement;
}

map.addEventListener(`click`, function (evt) {
  const mapPinActive = document.querySelector(`.map__pin--active`);
  const prevCard = document.querySelector(`.map__card`);
  if (evt.target.classList.contains(`map__pin`) && !evt.target.classList.contains(`map__pin--main`)) {
    if (mapPinActive) {
      mapPinActive.classList.remove(`map__pin--active`);
      prevCard.remove();
    }

    renderCard(evt.target.dataset.id);
    evt.target.classList.add(`map__pin--active`);

  } else if (evt.target.parentElement.classList.contains(`map__pin`) && !evt.target.parentElement.classList.contains(`map__pin--main`)) {
    if (mapPinActive) {
      mapPinActive.classList.remove(`map__pin--active`);
      prevCard.remove();
    }

    renderCard(evt.target.parentElement.dataset.id);
    evt.target.parentElement.classList.add(`map__pin--active`);
  }
});

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
  const currentHotel = HOTELS[index];
  let cardElement = cardTemplate.content.querySelector(`.map__card`).cloneNode(true);
  cardElement.querySelector(`.popup__title`).textContent = currentHotel.offer.title;
  cardElement.querySelector(`.popup__text--address`).textContent = currentHotel.offer.address;
  cardElement.querySelector(`.popup__text--price`).textContent = `${currentHotel.offer.price} ₽/ночь`;
  cardElement.querySelector(`.popup__type`).textContent = currentHotel.offer.type;
  cardElement.querySelector(`.popup__text--capacity`).textContent = `${currentHotel.offer.rooms} комнаты для ${currentHotel.offer.guests} гостей`;
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${currentHotel.offer.checkin}, выезд до ${currentHotel.offer.checkout}`;

  const cardFeatures = cardElement.querySelector(`.popup__features`);

  // вывод доступных удобств
  while (cardFeatures.firstChild) {
    cardFeatures.removeChild(cardFeatures.firstChild);
  }

  for (let i = 0; i < currentHotel.offer.features.length; i++) {
    let item = document.createElement(`li`);
    item.classList.add(`popup__feature`);
    item.classList.add(`popup__feature--${currentHotel.offer.features[i]}`);
    cardFeatures.appendChild(item);
  }

  cardElement.querySelector(`.popup__description`).textContent = currentHotel.offer.description;

  const cardPhotos = cardElement.querySelector(`.popup__photos`);

  // добавление фотографий
  const img = cardPhotos.querySelector(`.popup__photo`);
  cardPhotos.removeChild(img);

  let insertedImg;
  for (let j = 0; j < currentHotel.offer.photos.length; j++) {
    insertedImg = img.cloneNode(true);
    insertedImg.src = currentHotel.offer.photos[j];
    cardPhotos.appendChild(insertedImg);
  }

  cardElement.querySelector(`.popup__avatar`).src = currentHotel.author.avatar;

  const buttonClose = cardElement.querySelector(`.popup__close`);


  buttonClose.addEventListener(`click`, function (evt) {
    const mapPinActive = document.querySelector(`.map__pin--active`);
    if (evt.button === 0 || evt.key === KEY_ENTER) {
      cardElement.remove();
      mapPinActive.classList.remove(`map__pin--active`);
    }
  });

  document.addEventListener(`keydown`, function (evt) {
    const mapPinActive = document.querySelector(`.map__pin--active`);
    if (evt.key === KEY_ESCAPE) {
      evt.preventDefault();
      cardElement.remove();
      mapPinActive.classList.remove(`map__pin--active`);
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
  setCoordinates(true);
  mapPinMain.removeEventListener(`click`, mapPinMainClick);
};


function mapPinMainClick(evt) {
  if (evt.button === 0 || evt.key === KEY_ENTER) {
    evt.preventDefault();
    activatePage();
  }
}

mapPinMain.addEventListener(`click`, mapPinMainClick);

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
  mapPinMain.addEventListener(`click`, mapPinMainClick);

  if (prevCard) {
    prevCard.remove();
  }

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

const inputFileAvatar = document.querySelector(`#avatar`);
const inputFileImages = document.querySelector(`#images`);

inputFileAvatar.setAttribute(`accept`, `image/*`);
inputFileImages.setAttribute(`accept`, `image/*`);
