'use strict';

(function () {
  const map = window.data.map;

  const KEY_ENTER = window.util.KEY_ENTER;
  const KEY_ESCAPE = window.util.KEY_ESCAPE;
  const cardTemplate = document.querySelector(`#card`);
  // функция рендеринга карточки
  function renderCard(index) {
    const currentHotel = window.hotels[index];
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
        if (mapPinActive) {
          mapPinActive.classList.remove(`map__pin--active`);
        }
      }
    });

    map.appendChild(cardElement);

  }

  window.card = {
    renderCard
  };

})();
