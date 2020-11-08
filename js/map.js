'use strict';


(function () {
  const housingType = document.querySelector(`#housing-type`);
  const mapForm = document.querySelector(`.map__filters`);
  const MAX_PINS = window.data.MAX_PINS;
  const renderFragmentMapPins = window.pin.renderFragmentMapPins;
  const debounce = window.debounce.debounce(renderFragmentMapPins);
  const removePins = window.form.removePins;
  const removeCard = window.pin.removeCard;


  mapForm.addEventListener(`change`, function () {
    removePins();
    removeCard();
    const hotels = window.hotels;
    debounce(updateData(hotels));

  });

  function checkType(pin) {
    return housingType.value === `any` ? true : pin.offer.type === housingType.value;
  }
  function getAmountOfPins(hotels) {
    const sortedHotels = hotels.slice(0, MAX_PINS);
    window.sortedHotels = sortedHotels;
    return sortedHotels;
  }
  const updateData = function (hotels) {
    const hotelsFilter = hotels.filter(function (hotel) {
      return checkType(hotel);
    });
    return getAmountOfPins(hotelsFilter);
  };
})();
