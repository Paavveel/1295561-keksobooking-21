'use strict';

(function () {
  const mapPinMain = window.form.mapPinMain;
  const mapPinMainClick = window.form.mapPinMainClick;
  const disableElements = window.form.disableElements;

  mapPinMain.addEventListener(`click`, mapPinMainClick);

  disableElements();


})();
