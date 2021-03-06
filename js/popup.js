'use strict';

const KEY_ENTER = window.util.KEY_ENTER;
const KEY_ESCAPE = window.util.KEY_ESCAPE;
const map = window.data.map;
const hotelType = window.data.hotelType;
const cardTemplate = document.querySelector(`#card`);

const renderCard = (index) => {
  const currentHotel = window.sortedHotels[index];
  let cardElement = cardTemplate.content.querySelector(`.map__card`).cloneNode(true);
  cardElement.querySelector(`.popup__title`).textContent = currentHotel.offer.title;
  cardElement.querySelector(`.popup__text--address`).textContent = currentHotel.offer.address;
  cardElement.querySelector(`.popup__text--price`).textContent = `${currentHotel.offer.price} ₽/ночь`;
  cardElement.querySelector(`.popup__type`).textContent = hotelType[currentHotel.offer.type];
  cardElement.querySelector(`.popup__text--capacity`).textContent = `${currentHotel.offer.rooms} комнаты для ${currentHotel.offer.guests} гостей`;
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${currentHotel.offer.checkin}, выезд до ${currentHotel.offer.checkout}`;

  const cardFeatures = cardElement.querySelector(`.popup__features`);

  while (cardFeatures.firstChild) {
    cardFeatures.removeChild(cardFeatures.firstChild);
  }

  if (currentHotel.offer.features.length === 0) {
    cardFeatures.remove();
  } else {
    currentHotel.offer.features.forEach((feature) => {
      let item = document.createElement(`li`);
      item.classList.add(`popup__feature`);
      item.classList.add(`popup__feature--${feature}`);
      cardFeatures.appendChild(item);
    });
  }

  const cardPhotos = cardElement.querySelector(`.popup__photos`);

  if (currentHotel.offer.photos.length === 0) {
    cardPhotos.remove();
  } else {
    const img = cardPhotos.querySelector(`.popup__photo`);
    cardPhotos.removeChild(img);

    let insertedImg;
    currentHotel.offer.photos.forEach((photo) => {
      insertedImg = img.cloneNode(true);
      insertedImg.src = photo;
      cardPhotos.appendChild(insertedImg);
    });
  }

  cardElement.querySelector(`.popup__description`).textContent = currentHotel.offer.description;
  cardElement.querySelector(`.popup__avatar`).src = currentHotel.author.avatar;

  const buttonClose = cardElement.querySelector(`.popup__close`);

  buttonClose.addEventListener(`click`, (evt) => {
    const mapPinActive = document.querySelector(`.map__pin--active`);
    if (evt.button === 0 || evt.key === KEY_ENTER) {
      cardElement.remove();
      mapPinActive.classList.remove(`map__pin--active`);
    }
  });

  document.addEventListener(`keydown`, (evt) => {
    const mapPinActive = document.querySelector(`.map__pin--active`);
    if (evt.key === KEY_ESCAPE) {
      evt.preventDefault();
      cardElement.remove();
      if (mapPinActive) {
        mapPinActive.classList.remove(`map__pin--active`);
      }
    }
  });

  map.appendChild(cardElement);

};

window.popup = {
  renderCard
};

