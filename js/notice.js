'use strict';

const KEY_ENTER = window.util.KEY_ENTER;
const KEY_ESCAPE = window.util.KEY_ESCAPE;
const MAIN_ARROW_HEIGHT = window.data.MAIN_ARROW_HEIGHT;
const MIN_NAME_LENGTH = window.data.MIN_NAME_LENGTH;
const MAX_NAME_LENGTH = window.data.MAX_NAME_LENGTH;
const map = window.data.map;
const main = window.data.main;
const renderFragmentMapPins = window.pin.renderFragmentMapPins;
const guestCapacity = window.data.guestCapacity;
const guestValidation = window.data.guestValidation;
const priceOfType = window.data.priceOfType;
const getData = window.backend.getData;
const sendData = window.backend.sendData;
const onAvatarLoad = window.preview.onAvatarLoad;
const onPhotosLoad = window.preview.onPhotosLoad;
const resetPreviews = window.preview.resetPreviews;
let typeOfHouse = window.data.typeOfHouse;
let typeOfRoom = window.data.typeOfRoom;
let pinMainX = window.data.pinMainX;
let pinMainY = window.data.pinMainY;
const adForm = document.querySelector(`.ad-form`);
const disabledFormElements = document.querySelectorAll(`.ad-form fieldset, .map__filters select, .map__filters fieldset`);
const mapPinMain = document.querySelector(`.map__pin--main`);
const resetButton = document.querySelector(`.ad-form__reset`);
const avatarSelection = adForm.querySelector(`.ad-form-header__input`);
const previewSelection = adForm.querySelector(`.ad-form__input`);
const successMessage = document.querySelector(`#success`);
const errorMessage = document.querySelector(`#error`);


const addAttribute = (elements, attribute) => {
  elements.forEach((element) => {
    element.setAttribute(attribute, ``);
  });
};

const removeAttribute = (elements, attribute) => {
  elements.forEach((element) => {
    element.removeAttribute(attribute, ``);
  });
};

const disableElements = () => {
  addAttribute(disabledFormElements, `disabled`);
};

const resetForms = () => {
  const forms = document.querySelectorAll(`form`);
  forms.forEach((form) => {
    form.reset();
  });
};

const removePins = () => {
  const pins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  pins.forEach((pin) => {
    pin.remove();
  });
};

const setMapPinMainDefault = () => {
  mapPinMain.style.left = `${pinMainX}px`;
  mapPinMain.style.top = `${pinMainY}px`;
  setCoordinates(false);
};

const onReturnToDefult = () => {
  resetForms();
  disableElements();
  removePins();
  adForm.classList.add(`ad-form--disabled`);
  map.classList.add(`map--faded`);
  setMapPinMainDefault();
  inputPrice.placeholder = priceOfType.flat;
  const prevCard = document.querySelector(`.map__card`);
  mapPinMain.addEventListener(`click`, onMapPinMainClick);
  avatarSelection.removeEventListener(`change`, onAvatarLoad);
  previewSelection.removeEventListener(`change`, onPhotosLoad);
  resetPreviews();

  if (prevCard) {
    prevCard.remove();
  }
};

resetButton.addEventListener(`click`, onReturnToDefult);

const showSuccessMessage = () => {
  const message = successMessage.content.cloneNode(true);

  document.addEventListener(`click`, onDeleteSuccessMessage);
  document.addEventListener(`keydown`, onDeleteSuccessMessageByEsc);

  main.appendChild(message);
  onReturnToDefult();
};

const onDeleteSuccessMessage = (evt) => {
  evt.preventDefault();

  const message = main.querySelector(`.success`);

  document.removeEventListener(`click`, onDeleteSuccessMessage);
  document.removeEventListener(`keydown`, onDeleteSuccessMessageByEsc);

  main.removeChild(message);
};

const onDeleteSuccessMessageByEsc = (evt) => {
  if (evt.key === KEY_ESCAPE) {
    onDeleteSuccessMessage(evt);
  }
};

const showErrorMessage = () => {
  const message = errorMessage.content.cloneNode(true);
  const closeButton = message.querySelector(`.error__button`);

  document.addEventListener(`click`, onDeleteErrorMessage);
  document.addEventListener(`keydown`, onDeleteErrorMessageByEsc);

  closeButton.addEventListener(`click`, onDeleteErrorMessage);

  main.appendChild(message);
};

const onDeleteErrorMessage = (evt) => {
  evt.preventDefault();

  const message = main.querySelector(`.error`);
  const closeButton = message.querySelector(`.error__button`);

  document.removeEventListener(`click`, onDeleteErrorMessage);
  document.removeEventListener(`keydown`, onDeleteErrorMessageByEsc);

  closeButton.removeEventListener(`click`, onDeleteErrorMessage);

  main.removeChild(message);
};

const onDeleteErrorMessageByEsc = (evt) => {
  if (evt.key === KEY_ESCAPE) {
    onDeleteErrorMessage(evt);
  }
};

adForm.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  sendData(new FormData(adForm), showSuccessMessage, showErrorMessage);
});

const inputAddress = document.querySelector(`#address`);
inputAddress.setAttribute(`readonly`, ``);

const setCoordinates = (isPageActive) => {
  const distanceLeft = mapPinMain.offsetLeft;
  const distanseTop = mapPinMain.offsetTop;

  if (!pinMainX || !pinMainY) {
    pinMainX = distanceLeft;
    pinMainY = distanseTop;
  }
  const height = mapPinMain.clientHeight;
  const width = mapPinMain.clientWidth;
  const mainPinX = Math.round(distanceLeft + width / 2);
  const mainPinY = isPageActive ? Math.round(distanseTop + height + MAIN_ARROW_HEIGHT) : Math.round(distanseTop + height / 2);

  inputAddress.value = `${mainPinX}, ${mainPinY}`;
};

setCoordinates(false);

const activatePage = () => {
  removeAttribute(disabledFormElements, `disabled`);
  adForm.classList.remove(`ad-form--disabled`);
  map.classList.remove(`map--faded`);
  setCoordinates(true);
  getData(renderFragmentMapPins, onErrorGetData);

  mapPinMain.removeEventListener(`click`, onMapPinMainClick);
  avatarSelection.addEventListener(`change`, onAvatarLoad);
  previewSelection.addEventListener(`change`, onPhotosLoad);
};

const onErrorGetData = (message) => {
  const node = document.createElement(`div`);
  node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `30px`;

  node.textContent = message;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

const onMapPinMainClick = (evt) => {
  if (evt.button === 0 || evt.key === KEY_ENTER) {
    evt.preventDefault();
    activatePage();
  }
};

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

const onMapPinMainMouseDown = (evt) => {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  let dragged = false;

  const onMouseMove = (moveEvt) => {
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

    if (mapPinMain.offsetLeft < Coordinates.x.min - Math.round(mapPinMain.offsetWidth / 2)) {
      mapPinMain.style.left = (Coordinates.x.min - Math.round(mapPinMain.offsetWidth / 2)) + `px`;
    } else if (mapPinMain.offsetLeft > Coordinates.x.max - Math.round(mapPinMain.offsetWidth / 2)) {
      mapPinMain.style.left = (Coordinates.x.max - Math.round(mapPinMain.offsetWidth / 2)) + `px`;
    }

    if (mapPinMain.offsetTop < Coordinates.y.min - mapPinMain.offsetHeight - MAIN_ARROW_HEIGHT) {
      mapPinMain.style.top = Coordinates.y.min - mapPinMain.offsetHeight - MAIN_ARROW_HEIGHT + `px`;
    } else if (mapPinMain.offsetTop > Coordinates.y.max - mapPinMain.offsetHeight - MAIN_ARROW_HEIGHT) {
      mapPinMain.style.top = Coordinates.y.max - mapPinMain.offsetHeight - MAIN_ARROW_HEIGHT + `px`;
    }
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
    setCoordinates(true);

    const onClickPreventDefault = (clickEvt) => {
      clickEvt.preventDefault();
      mapPinMain.removeEventListener(`click`, onClickPreventDefault);
    };

    if (dragged) {
      mapPinMain.addEventListener(`click`, onClickPreventDefault);
    }
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
};

const inputTitle = document.querySelector(`#title`);

inputTitle.addEventListener(`input`, (evt) => {
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

const priceValidation = (target) => {
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

inputPrice.addEventListener(`input`, (evt) => {
  priceValidation(evt.target);
});

selectType.addEventListener(`change`, (evt) => {
  typeOfHouse = evt.target.value;
  inputPrice.placeholder = priceOfType[evt.target.value];
  priceValidation(inputPrice);
});

const roomNumber = document.querySelector(`#room_number`);
const capacity = document.querySelector(`#capacity`);

const typeOfCapacity = (target) => {
  const value = target.value;
  const isValid = guestCapacity[typeOfRoom].some((element) => {
    return element === value;
  });
  if (!isValid) {
    target.setCustomValidity(guestValidation[typeOfRoom]);
  } else {
    target.setCustomValidity(``);
  }
  target.reportValidity();
};

roomNumber.addEventListener(`change`, (evt) => {
  typeOfRoom = evt.target.value;
  typeOfCapacity(capacity);
});

capacity.addEventListener(`change`, (evt) => {
  typeOfCapacity(evt.target);
});

const timeIn = document.querySelector(`#timein`);
const timeOut = document.querySelector(`#timeout`);

timeOut.addEventListener(`change`, () => {
  timeIn.value = timeOut.value;
});
timeIn.addEventListener(`change`, () => {
  timeOut.value = timeIn.value;
});

const inputFileAvatar = document.querySelector(`#avatar`);
const inputFileImages = document.querySelector(`#images`);

inputFileAvatar.setAttribute(`accept`, `image/*`);
inputFileImages.setAttribute(`accept`, `image/*`);

window.notice = {
  adForm,
  mapPinMain,
  setCoordinates,
  onMapPinMainClick,
  onMapPinMainMouseDown,
  disableElements,
  inputAddress,
  activatePage,
  removePins
};

