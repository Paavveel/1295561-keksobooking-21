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


  const processingRequests = function (url, onSuccess, onError, requestMethod, data) {
    const MAX_PINS = window.data.MAX_PINS;
    const StatusCode = window.data.StatusCode;
    const TIMEOUT = window.data.TIMEOUT;
    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      let error;
      switch (xhr.status) {
        case StatusCode.OK:
          window.hotels = xhr.response;
          window.sortedHotels = xhr.response.slice(0, MAX_PINS);
          onSuccess(window.hotels);
          break;
        case StatusCode.BadRequest:
          error = `Неверный запрос`;
          break;
        case StatusCode.Unauthorized:
          error = `Пользователь не авторизован`;
          break;
        case StatusCode.NotFound:
          error = `Ничего не найдено`;
          break;

        default:
          error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT; // 10s

    xhr.open(requestMethod, url);
    xhr.send(data);
  };

  window.util = {
    KEY_ENTER,
    KEY_ESCAPE,
    getRandomNumber,
    getRandomArr,
    getRandomInt,
    returnsRandomData,
    processingRequests
  };
})();
