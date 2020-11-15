'use strict';

const mapPinMain = window.notice.mapPinMain;
const onMapPinMainClick = window.notice.onMapPinMainClick;
const onMapPinMainMouseDown = window.notice.onMapPinMainMouseDown;
const disableElements = window.notice.disableElements;

mapPinMain.addEventListener(`click`, onMapPinMainClick);
mapPinMain.addEventListener(`mousedown`, onMapPinMainMouseDown);
disableElements();

