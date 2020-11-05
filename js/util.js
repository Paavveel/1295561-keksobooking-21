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
    const TIMEOUT = 10000;
    const statusCode = {
      OK: 200,
      BadRequest: 400,
      Unauthorized: 401,
      NotFound: 404
    };

    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      let error;
      switch (xhr.status) {
        case statusCode.OK:
          window.hotels = xhr.response; onSuccess(window.hotels);
          break;
        case statusCode.BadRequest:
          error = `Неверный запрос`;
          break;
        case statusCode.Unauthorized:
          error = `Пользователь не авторизован`;
          break;
        case statusCode.NotFound:
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
