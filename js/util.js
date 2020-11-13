'use strict';

const KEY_ENTER = `Enter`;
const KEY_ESCAPE = `Escape`;


function processingRequests(url, onSuccess, onError, requestMethod, data) {
  const StatusCode = window.data.StatusCode;
  const TIMEOUT = window.data.TIMEOUT;
  const xhr = new XMLHttpRequest();

  xhr.responseType = `json`;

  xhr.addEventListener(`load`, function () {
    let error;
    switch (xhr.status) {
      case StatusCode.OK:
        window.hotels = xhr.response;
        window.sortedHotels = xhr.response;
        onSuccess(window.hotels);
        break;
      case StatusCode.BAD_REQUEST:
        error = `Неверный запрос`;
        break;
      case StatusCode.UNAUTHORIZED:
        error = `Пользователь не авторизован`;
        break;
      case StatusCode.NOT_FOUND:
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

  xhr.timeout = TIMEOUT;

  xhr.open(requestMethod, url);

  if (requestMethod === `GET`) {
    xhr.send();
  } else if (requestMethod === `POST`) {
    xhr.send(data);
  }
}


window.util = {
  KEY_ENTER,
  KEY_ESCAPE,
  processingRequests
};

