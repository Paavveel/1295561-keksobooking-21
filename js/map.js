'use strict';

(function () {
  const HOTELS = window.data.HOTELS;
  const mapPins = window.pin.mapPins;
  const renderPins = window.pin.renderPins;

  function renderFragmentMapPins() {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < HOTELS.length; i++) {
      fragment.appendChild(renderPins(i));
    }
    return mapPins.appendChild(fragment);
  }

  window.map = {
    renderFragmentMapPins
  };
})();
