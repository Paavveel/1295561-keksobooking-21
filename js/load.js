'use strict';

(function () {
  const TIMEOUT = window.data.TIMEOUT;
  const statusCode = {
    OK: 200,
    BadRequest: 400,
    Unauthorized: 401,
    NotFound: 404
  };
  const getData = function (url, onSuccess, onError) {
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

    xhr.open(`GET`, url);
    xhr.send();
  };


  window.load = {
    getData
  };
})();
