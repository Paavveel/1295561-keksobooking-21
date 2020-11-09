'use strict';

const map = window.data.map;
const KEY_ENTER = window.util.KEY_ENTER;
const KEY_ESCAPE = window.util.KEY_ESCAPE;
const renderFragmentMapPins = window.pin.renderFragmentMapPins;
const guestCapacity = window.data.guestCapacity;
const guestValidation = window.data.guestValidation;
const priceOfType = window.data.priceOfType;
let typeOfHouse = window.data.typeOfHouse;
let typeOfRoom = window.data.typeOfRoom;
const MAIN_ARROW_HEIGHT = window.data.MAIN_ARROW_HEIGHT;
const MIN_NAME_LENGTH = window.data.MIN_NAME_LENGTH;
const MAX_NAME_LENGTH = window.data.MAX_NAME_LENGTH;
const getData = window.backend.getData;
const sendData = window.backend.sendData;
const popUpError = window.data.popUpError;
const popUpSuccess = window.data.popUpSuccess;
let PIN_MAIN_X = window.data.PIN_MAIN_X;
let PIN_MAIN_Y = window.data.PIN_MAIN_Y;
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

function resetForms() {
  const forms = document.querySelectorAll(`form`);
  for (let i = 0; i < forms.length; i++) {
    forms[i].reset();
  }
}

function removePins() {
  const pins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  pins.forEach(function (pin) {
    pin.remove();
  });
}

function setMapPinMainDefault() {
  mapPinMain.style.left = `${PIN_MAIN_X}px`;
  mapPinMain.style.top = `${PIN_MAIN_Y}px`;
  setCoordinates(false);
}

function returnToDefult() {
  resetForms();
  disableElements();
  removePins();
  adForm.classList.add(`ad-form--disabled`);
  map.classList.add(`map--faded`);
  setMapPinMainDefault();

  const prevCard = document.querySelector(`.map__card`);
  mapPinMain.addEventListener(`click`, mapPinMainClick);
  mapPinMain.removeEventListener(`mousedown`, mapPinMainMouseDown);

  if (prevCard) {
    prevCard.remove();
  }
}

resetButton.addEventListener(`click`, returnToDefult);

function onSuccess() {
  returnToDefult();
  showPopUp(popUpSuccess);
}

function onError() {
  showPopUp(popUpError);

  const errorButton = popUpError.querySelector(`.error__button`);
  errorButton.addEventListener(`click`, closePopUp);
}

adForm.addEventListener(`submit`, function (evt) {
  evt.preventDefault();
  sendData(new FormData(adForm), onSuccess, onError);

  document.addEventListener(`keydown`, function (e) {
    if (e.key === KEY_ESCAPE) {
      e.preventDefault();
      closePopUp();
    }
  });
  document.addEventListener(`click`, closePopUp);
});

function showPopUp(popup) {
  popup.classList.remove(`hidden`);
}

function closePopUp() {
  if (!popUpError.classList.contains(`hidden`)) {
    popUpError.classList.add(`hidden`);
  } else if (!popUpSuccess.classList.contains(`hidden`)) {
    popUpSuccess.classList.add(`hidden`);
  }
}

const inputAddress = document.querySelector(`#address`);
inputAddress.setAttribute(`readonly`, ``);

function setCoordinates(isPageActive) {
  const distanceLeft = mapPinMain.offsetLeft;
  const distanseTop = mapPinMain.offsetTop;

  if (!PIN_MAIN_X || !PIN_MAIN_Y) {
    PIN_MAIN_X = distanceLeft;
    PIN_MAIN_Y = distanseTop;
  }
  const height = mapPinMain.clientWidth;
  const width = mapPinMain.clientHeight;
  const mainPinX = Math.round(distanceLeft + width / 2);
  const mainPinY = isPageActive ? Math.round(distanseTop + height + MAIN_ARROW_HEIGHT) : Math.round(distanseTop + height / 2);

  inputAddress.value = `${mainPinX}, ${mainPinY}`;
}

setCoordinates(false);

const activatePage = function () {
  removeAttribute(disabledFormElements, `disabled`);
  adForm.classList.remove(`ad-form--disabled`);
  map.classList.remove(`map--faded`);
  setCoordinates(true);
  getData(`https://21.javascript.pages.academy/keksobooking/data`, renderFragmentMapPins, onErrorGetData);
  mapPinMain.addEventListener(`mousedown`, mapPinMainMouseDown);
  mapPinMain.removeEventListener(`click`, mapPinMainClick);
};

const onErrorGetData = function (message) {
  let node = document.createElement(`div`);
  node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `30px`;

  node.textContent = message;
  document.body.insertAdjacentElement(`afterbegin`, node);

};

function mapPinMainClick(evt) {
  if (evt.button === 0 || evt.key === KEY_ENTER) {
    evt.preventDefault();
    activatePage();
  }
}

const Coordinates = {
  x: {
    min: 0,
    max: map.offsetWidth
  },
  y: {
    min: 130,
    max: 630
  }
};

function mapPinMainMouseDown(evt) {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  let dragged = false;

  const onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    dragged = true;

    let shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + `px`;
    mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + `px`;

    if (mapPinMain.offsetLeft < Coordinates.x.min - mapPinMain.offsetWidth / 2) {
      mapPinMain.style.left = (Coordinates.x.min - mapPinMain.offsetWidth / 2) + `px`;
    } else if (mapPinMain.offsetLeft > Coordinates.x.max - mapPinMain.offsetWidth / 2) {
      mapPinMain.style.left = (Coordinates.x.max - mapPinMain.offsetWidth / 2) + `px`;
    }

    if (mapPinMain.offsetTop < Coordinates.y.min - mapPinMain.offsetHeight - MAIN_ARROW_HEIGHT) {
      mapPinMain.style.top = Coordinates.y.min - mapPinMain.offsetHeight - MAIN_ARROW_HEIGHT + `px`;
    } else if (mapPinMain.offsetTop > Coordinates.y.max - mapPinMain.offsetHeight - MAIN_ARROW_HEIGHT) {
      mapPinMain.style.top = Coordinates.y.max - mapPinMain.offsetHeight - MAIN_ARROW_HEIGHT + `px`;
    }


  };

  const onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
    setCoordinates(true);

    if (dragged) {
      const onClickPreventDefault = function (clickEvt) {
        clickEvt.preventDefault();
        mapPinMain.removeEventListener(`click`, onClickPreventDefault);
      };
      mapPinMain.addEventListener(`click`, onClickPreventDefault);
    }
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
}

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

window.form = {
  adForm,
  mapPinMain,
  setCoordinates,
  mapPinMainClick,
  disableElements,
  inputAddress,
  activatePage,
  removePins
};

