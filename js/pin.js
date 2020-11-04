'use strict';

(function () {
  const MAPPIN_CENTER = window.data.MAPPIN_CENTER;
  const MAPPIN_HEIGHT = window.data.MAPPIN_HEIGHT;
  const map = window.data.map;
  const renderCard = window.card.renderCard;
  const hotelTemplate = document.querySelector(`#pin`);
  const mapPins = document.querySelector(`.map__pins`);

  // функция рендеринга метки объявления
  function renderPins(currentHotel, index) {
    const hotelElement = hotelTemplate.content.cloneNode(true);
    const mapPin = hotelElement.querySelector(`.map__pin`);
    const hotelAvatar = mapPin.querySelector(`img`);

    hotelAvatar.src = currentHotel.author.avatar;
    hotelAvatar.alt = currentHotel.offer.title;
    mapPin.style.cssText = `left: ${currentHotel.location.x - MAPPIN_CENTER}px; top: ${currentHotel.location.y - MAPPIN_HEIGHT}px;`;
    mapPin.dataset.id = index;

    return hotelElement;
  }

  function renderFragmentMapPins(pinsArray) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < pinsArray.length; i++) {
      fragment.appendChild(renderPins(pinsArray[i], i));
    }
    return mapPins.appendChild(fragment);
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

  window.pin = {
    renderPins,
    mapPins,
    renderFragmentMapPins
  };

})();
