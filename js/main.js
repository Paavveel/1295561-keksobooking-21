'use strict';

const mapPinMain = window.form.mapPinMain;
const mapPinMainClick = window.form.mapPinMainClick;
const mapPinMainMouseDown = window.form.mapPinMainMouseDown;
const disableElements = window.form.disableElements;

mapPinMain.addEventListener(`click`, mapPinMainClick);
mapPinMain.addEventListener(`mousedown`, mapPinMainMouseDown);
disableElements();

