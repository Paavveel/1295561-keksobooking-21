'use strict';

(function () {
  const map = window.data.map;
  const KEY_ENTER = window.util.KEY_ENTER;
  const getHotelArray = window.data.getHotelArray;
  const renderFragmentMapPins = window.map.renderFragmentMapPins;
  const guestCapacity = window.data.guestCapacity;
  const guestValidation = window.data.guestValidation;
  const priceOfType = window.data.priceOfType;
  let typeOfHouse = window.data.typeOfHouse;
  let typeOfRoom = window.data.typeOfRoom;
  const MAIN_ARROW_HEIGHT = window.data.MAIN_ARROW_HEIGHT;
  const MIN_NAME_LENGTH = window.data.MIN_NAME_LENGTH;
  const MAX_NAME_LENGTH = window.data.MAX_NAME_LENGTH;
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

  function setCoordinates(isPageActive) {
    const distanceLeft = mapPinMain.offsetLeft;
    const distanseTop = mapPinMain.offsetTop;
    const height = mapPinMain.clientWidth;
    const width = mapPinMain.clientHeight;
    const mainPinX = Math.round(distanceLeft + width / 2);
    const mainPinY = isPageActive ? Math.round(distanseTop + height + MAIN_ARROW_HEIGHT) : Math.round(distanseTop + height / 2);

    inputAddress.value = `${mainPinX}, ${mainPinY}`;
  }


  const activatePage = function () {
    getHotelArray();
    renderFragmentMapPins();
    showElements();
    adForm.classList.remove(`ad-form--disabled`);
    map.classList.remove(`map--faded`);
    setCoordinates(true);
    mapPinMain.removeEventListener(`click`, mapPinMainClick);

    mapPinMain.addEventListener(`mousedown`, mapPinMainMouseDown);

  };

  function mapPinMainClick(evt) {
    if (evt.button === 0 || evt.key === KEY_ENTER) {
      evt.preventDefault();
      activatePage();
    }
  }


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
    showElements,
    setCoordinates,
    mapPinMainClick,
    disableElements,
    inputAddress
  };
})();
