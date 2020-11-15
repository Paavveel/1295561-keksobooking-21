'use strict';

const MAX_PINS = window.data.MAX_PINS;
const mapForm = document.querySelector(`.map__filters`);
const housingType = document.querySelector(`#housing-type`);
const housingPrice = document.querySelector(`#housing-price`);
const housingRooms = document.querySelector(`#housing-rooms`);
const housingGuests = document.querySelector(`#housing-guests`);

const renderFragmentMapPins = window.pin.renderFragmentMapPins;
const debounce = window.helpers.debounce(renderFragmentMapPins);
const removePins = window.notice.removePins;
const removeCard = window.pin.removeCard;

const priceToRoom = {
  low: {
    min: 0,
    max: 9999
  },
  middle: {
    min: 10000,
    max: 49999
  },
  high: {
    min: 50000,
    max: Infinity
  }
};


mapForm.addEventListener(`change`, () => {
  removePins();
  removeCard();
  const hotels = window.hotels;
  debounce(updateData(hotels));

});

const checkHousingType = (pin) => {
  return housingType.value === `any` ? true : pin.offer.type === housingType.value;
};

const checkHousingRooms = (pin) => {
  return housingRooms.value === `any` ? true : pin.offer.rooms.toString() === housingRooms.value;
};

const checkHousingGuests = (pin) => {
  return housingGuests.value === `any` ? true : pin.offer.guests.toString() === housingGuests.value;
};

const checkHousingPrice = (pin) => {
  if (housingPrice.value === `any`) {
    return true;
  }
  return pin.offer.price >= priceToRoom[housingPrice.value].min && pin.offer.price <= priceToRoom[housingPrice.value].max;
};

const checkHousingFeatures = (pin) => {
  let housingCheckbox = document.querySelectorAll(`.map__checkbox:checked`);

  return Array.from(housingCheckbox).every((feature) => {
    return pin.offer.features.indexOf(feature.value) >= 0;
  });
};

const getAmountOfPins = (hotelsFilter) => {
  const sortedHotels = hotelsFilter.slice(0, MAX_PINS);
  window.sortedHotels = sortedHotels;
  return sortedHotels;
};

const updateData = (hotels) => {
  const hotelsFilter = hotels.filter((hotel) => {
    return checkHousingType(hotel) & checkHousingPrice(hotel) & checkHousingFeatures(hotel) & checkHousingRooms(hotel) & checkHousingGuests(hotel);
  });
  return getAmountOfPins(hotelsFilter);
};

