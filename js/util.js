'use strict';

(function () {
  const KEY_ENTER = `Enter`;
  const KEY_ESCAPE = `Escape`;


  function getRandomNumber(minValue, maxValue) {
    let min = Math.ceil(minValue);
    let max = Math.floor(maxValue);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomArr(arr) {
    let randomArrLength = getRandomNumber(1, arr.length);

    return arr.slice(0, randomArrLength);
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function returnsRandomData(arr) {
    return arr[getRandomInt(arr.length)];
  }

  window.util = {
    KEY_ENTER,
    KEY_ESCAPE,
    getRandomNumber,
    getRandomArr,
    getRandomInt,
    returnsRandomData
  };
})();
