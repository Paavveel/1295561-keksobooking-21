'use strict';


(function () {
  const housingType = document.querySelector(`#housing-type`);
  const mapForm = document.querySelector(`.map__filters`);

  const renderFragmentMapPins = window.pin.renderFragmentMapPins;
  const removePins = window.form.removePins;
  let housingTypeCurrentValue;


  mapForm.addEventListener(`change`, function () {
    removePins();

    housingTypeCurrentValue = housingType.value;

    if (housingTypeCurrentValue === `any`) {
      renderFragmentMapPins(window.hotels);
    } else {
      updateData();
    }
  });

  const updateData = function () {
    housingTypeCurrentValue = housingType.value;
    const sameTypeHotel = window.hotels.filter(function (hotel) {
      return hotel.offer.type === housingTypeCurrentValue;
    });

    renderFragmentMapPins(sameTypeHotel);
  };
})();
